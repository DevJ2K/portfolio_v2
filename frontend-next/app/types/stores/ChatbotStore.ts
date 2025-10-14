import { Chat } from "../Chat";

export type ChatbotStore = {
  messages: Array<Chat>;
  isTyping: boolean;
  sendMessage: (message: string) => Promise<{ ok: boolean; message?: string }>;
  clearConversation: () => void;
};
