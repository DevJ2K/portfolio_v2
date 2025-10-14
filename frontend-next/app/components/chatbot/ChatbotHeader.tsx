import { RiChatNewLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const ChatbotHeader = ({
  isOpen,
  clearConversation,
  closeChatbot,
}: {
  isOpen: boolean;
  clearConversation: () => void;
  closeChatbot: () => void;
}) => {
  return (
    <div className="flex items-center gap-2 chatbot-header-shadow px-6 py-3 transition-all duration-500 ease-in-out">
      {/* <!-- Placeholder Icon --> */}
      <div className="size-16 min-w-16" />
      {/* <!-- Badge --> */}
      <div className={`flex flex-col ${isOpen ? "" : "opacity-0"}`}>
        <span className="text-sm font-bold text-zinc-800">Assistant J2K</span>
        <span className="text-xs text-zinc-500">
          Powered by a{" "}
          <span className="text-orange-500 font-semibold">Mistral LLM</span>
        </span>
      </div>
      <div className="flex ml-auto gap-5">
        <button
          className="cursor-pointer ml-auto flex items-center justify-center text-zinc-500 hover:text-zinc-800"
          onClick={clearConversation}
        >
          <RiChatNewLine className="text-xl" />
        </button>
        <button
          className="cursor-pointer ml-auto flex items-center justify-center text-zinc-500 hover:text-zinc-800"
          onClick={closeChatbot}
        >
          <RxCross2 className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotHeader;
