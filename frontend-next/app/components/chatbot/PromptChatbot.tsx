import useChatbotStore from "@/stores/chatbot";
import { LuSend } from "react-icons/lu";

const PromptChatbot = ({
  prompt,
  setPrompt,
  sendMessage,
}: {
  prompt: string;
  setPrompt: (prompt: string) => void;
  sendMessage: (message: string) => void;
}) => {
  const chatbotIsTyping = useChatbotStore((state) => state.isTyping);

  const handleEnter = async (event: Event) => {
    if (prompt.trim().length > 0 && !chatbotIsTyping) {
      sendMessage(prompt);
      if (event && event.target) {
        (event.target as HTMLInputElement).blur();
      }
    }
  };
  return (
    <div className="flex gap-1 bg-zinc-50 border border-zinc-300 items-center justify-center p-2 w-full min-h-min rounded-xl">
      <label className="sr-only" htmlFor="prompt">
        prompt
      </label>
      <input
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={chatbotIsTyping}
        type="text"
        className="w-full p-2 border h-10 border-transparent ring-0 focus:outline-none focus:ring-0 selection:bg-orange-500 selection:text-white"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleEnter(e as unknown as Event);
          }
        }}
      />
      <button
        className={`p-2 flex items-center justify-center size-10 text-white rounded-lg ${
          prompt.trim().length > 0 && !chatbotIsTyping
            ? "bg-black hover:bg-zinc-900 cursor-pointer"
            : ""
        } ${
          prompt.trim().length === 0 || chatbotIsTyping ? "bg-zinc-400" : ""
        }`}
        disabled={chatbotIsTyping}
        onClick={() => sendMessage("")}
      >
        <LuSend className="text-xl" />
      </button>
    </div>
  );
};

export default PromptChatbot;
