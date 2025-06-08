import type { Chat } from "~/types/Chat";

const LOCAL_STORAGE_KEY = "conversation";

const { fetchAiResponse } = useApi();

const scrollDown = async (force: boolean = true) => {
  if (force) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const container = document.getElementById("chatbotContainer");
  const bottom = document.getElementById("bottomChatbotMarker");

  if (!container || !bottom) return;

  const threshold = 40; // px

  const distanceToBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;
  console.log("Distance to bottom:", distanceToBottom);

  if ((0 < distanceToBottom && distanceToBottom < threshold) || force) {
    bottom.scrollIntoView({ behavior: "smooth", block: "end" });
  }
};

const getConversation = () => {
  const messages = localStorage.getItem(LOCAL_STORAGE_KEY);
  let conversations = [] as Array<Chat>;
  if (messages) {
    conversations = JSON.parse(messages) as Array<Chat>;
  }
  console.log("Conversations loaded:", conversations);
  return conversations;
};

const saveConversation = (messages: Array<Chat>) => {
  const stringifiedMessages = JSON.stringify(messages);
  if (stringifiedMessages.length < 3000000) {
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedMessages);
    console.log("Conversations saved:", messages);
  } else {
    console.warn("Conversation too large to store. Please clear it.");
  }
}

export const useChatbotStore = defineStore("chatbot", {
  state: () => ({
    messages: getConversation(),
    isTyping: false,
  }),
  actions: {
    async sendMessage(message: string) {
      if (!message.trim()) return;

      this.isTyping = true;
      scrollDown(true);

      this.messages.push({ content: message, role: "user", context: [] });

      const response = await fetch("/api/chat/enrich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: this.messages.slice(0, -1),
          prompt: message.trim(),
         }),
      });
      if (!response.ok) {
        console.error("Error response:", await response.json());
        throw new Error("An error occurred while sending the message.");
      }
      const responseJson = await response.json();

      this.messages = responseJson.conversation as Array<Chat>;
      saveConversation(this.messages);

      this.messages.push({ content: "", role: "assistant", context: null });

      const { abort, done } = await fetchAiResponse(
				`/api/chat/ask`, {
				method: 'POST',
				body: JSON.stringify({
          conversation: this.messages.slice(0, -1),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
			},
				(token: string) => {
					if (this.messages[this.messages.length - 1] != null) {
						this.messages[this.messages.length - 1].content += token;
					} else {
						abort();
						return;
					}
					scrollDown(false);
				}
			);
			await done;
      this.isTyping = false;
      saveConversation(this.messages);
    },
    clearConversation() {
      this.messages = [];
      saveConversation(this.messages);
    }
  },
});
