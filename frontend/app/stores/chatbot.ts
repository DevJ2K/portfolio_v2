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

  const threshold = 128; // px

  const distanceToBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;

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
  return conversations;
};

const saveConversation = (messages: Array<Chat>) => {
  const stringifiedMessages = JSON.stringify(messages);
  if (stringifiedMessages.length < 3000000) {
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedMessages);
  } else {
    console.warn("Conversation too large to store. Please clear it.");
  }
};

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
      this.messages.push({ content: "", role: "assistant", context: null });

      const response = (await $fetch("/api/chat/enrich", {
        method: "POST",
        body: {
          conversation: this.messages.slice(0, -2),
          prompt: message.trim(),
        },
      }).catch((_) => {
        this.isTyping = false;
        throw new Error("An error occurred while sending the message.");
      })) as { conversation: Array<Chat> };

      this.messages = response.conversation.concat({ content: "", role: "assistant", context: null }) as Array<Chat>;
      saveConversation(response.conversation);

      const { abort, done } = await fetchAiResponse(
        {
          conversation: this.messages.slice(0, -1),
        },
        (token: string) => {
          if (this.messages[this.messages.length - 1] != null) {
            this.messages[this.messages.length - 1].content += token;
          } else {
            abort();
            this.isTyping = false;
            return;
          }
          scrollDown(false);
        }
      );
      await done;
      scrollDown(false);
      this.isTyping = false;
      saveConversation(this.messages);
    },
    clearConversation() {
      this.messages = [];
      saveConversation(this.messages);
    },
  },
});
