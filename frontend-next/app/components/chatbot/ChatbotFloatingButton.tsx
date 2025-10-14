import Image from "next/image";

const ChatbotFloatingButton = ({
  isOpen,
  openChatbot,
}: {
  isOpen: boolean;
  openChatbot: () => void;
}) => {
  return (
    <div
      className={`absolute rounded-full flex items-center justify-center border-2 border-zinc-300 transition-all duration-300 ease-in-out ${
        isOpen
          ? "top-3 left-6 size-16 min-w-16"
          : "top-0 left-0 hover:scale-105 cursor-pointer size-18 min-w-18"
      }`}
      onClick={openChatbot}
    >
      <Image
        src="/images/j2klogo.png"
        alt="Assistant J2K"
        width="400"
        height="400"
        className="rounded-full"
      />
    </div>
  );
};

export default ChatbotFloatingButton;
