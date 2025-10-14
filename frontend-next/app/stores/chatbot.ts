import { create } from "zustand";
import type { Chat } from "@/types/Chat";
import fetchAiResponse from "@/functions/fetchAiResponse";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_CHATBOT_CONVERSATION_KEY } from "@/utils/constants";

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

type ChatbotStore = {
  messages: Array<Chat>;
  isTyping: boolean;
  sendMessage: (message: string) => Promise<{ ok: boolean; message?: string }>;
  clearConversation: () => void;
};

const useChatbotStore = create<ChatbotStore>()(
  persist(
    (set, get: () => any) => ({
      messages: [] as Array<Chat>,
      isTyping: false,

      sendMessage: async (message: string) => {
        if (!message.trim()) return;

        set({ isTyping: true });
        scrollDown(true);

        set((state: any) => ({
          messages: [
            ...state.messages,
            { content: message, role: "user", context: [] },
            { content: "", role: "assistant", context: null },
          ],
        }));

        const response = await fetch("/api/chat/enrich", {
          method: "POST",
          body: JSON.stringify({
            conversation: get().messages.slice(0, -2),
            prompt: message.trim(),
          }),
        }).catch(() => {
          set({ isTyping: false });
          return null;
        });

        if (!response || !response.ok) {
          set({ isTyping: false });
          return {
            ok: false,
            message: `An error occurred while sending the message. Please try again later.`,
          };
        }
        const responseData = (await response.json()) as {
          conversation: Array<Chat>;
        };

        set({
          messages: [
            ...responseData.conversation,
            { content: "", role: "assistant", context: null },
          ],
        });

        try {
          const { abort, done } = await fetchAiResponse(
            {
              conversation: get().messages.slice(0, -1),
            },
            (token: string) => {
              const currentMessages = get().messages;
              if (currentMessages[currentMessages.length - 1] != null) {
                set((state: any) => ({
                  messages: state.messages.map((msg: any, idx: number) =>
                    idx === state.messages.length - 1
                      ? { ...msg, content: msg.content + token }
                      : msg
                  ),
                }));
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
        } catch (error) {
          console.error("Error during fetchAiResponse:", error);
          set({ isTyping: false });
          return {
            ok: false,
            message: error instanceof Error ? error.message : String(error),
          };
        }
      },
      clearConversation() {
        set({ messages: [] });
      },
    }),
    {
      name: LOCAL_STORAGE_CHATBOT_CONVERSATION_KEY,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["isTyping"].includes(key))
        ),
    }
  )
);

export default useChatbotStore;
