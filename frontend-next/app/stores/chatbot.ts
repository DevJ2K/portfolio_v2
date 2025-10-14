import { create } from "zustand";
import type { Chat } from "@/types/Chat";
import { stat } from "fs";
import fetchAiResponse from "@/functions/fetchAiResponse";

const LOCAL_STORAGE_KEY = "conversation";

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

const useChatbotStore = create((set, get: () => any) => ({
  messages: getConversation(),
  isTyping: false,

  sendMessage: async (message: string) => {
    if (!message.trim()) return;

    set({ isTyping: true });
    scrollDown(true);

    // this.messages.push({ content: message, role: "user", context: [] });
    // this.messages.push({ content: "", role: "assistant", context: null });

    set((state: any) => ({
      messages: [
        ...state.messages,
        { content: message, role: "user", context: [] },
        { content: "", role: "assistant", context: null },
      ]
    }));

    const response = await fetch("/api/chat/enrich", {
      method: "POST",
      body: JSON.stringify({
        conversation: get().messages.slice(0, -2),
        prompt: message.trim(),
      }),
    }).catch((_) => {
      set({ isTyping: false });
      throw new Error("An error occurred while sending the message.");
    }); //  as { conversation: Array<Chat> }

    const responseData = await response.json();

    //  as { conversation: Array<Chat> }
    // this.messages = response.conversation.concat({
    //   content: "",
    //   role: "assistant",
    //   context: null,
    // }) as Array<Chat>;

    set({
      messages: [
        ...responseData.conversation,
        { content: "", role: "assistant", context: null }
      ]
    });

    saveConversation(responseData.conversation);

    const { abort, done } = await fetchAiResponse(
      {
        conversation: get().messages.slice(0, -1),
      },
      (token: string) => {
        const currentMessages = get().messages;
        if (currentMessages[currentMessages.length - 1] != null) {
          currentMessages[currentMessages.length - 1].content += token;
        } else {
          abort();
          set({ isTyping: false });
          return;
        }
        scrollDown(false);
      }
    );
    await done;
    scrollDown(false);
    set({ isTyping: false });
    saveConversation(get().messages);
  },
}));

export default useChatbotStore;
