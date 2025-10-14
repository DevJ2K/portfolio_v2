import { Chat } from "@/types/Chat";
import ChatbotMessageUser from "./ChatbotMessageUser";
import ChatbotMessageSystem from "./ChatbotMessageSystem";
import { Toaster } from "react-hot-toast";

const ChatbotContent = ({ messages }: { messages: Chat[] }) => {
  return (
    <div
      id="chatbotContainer"
      className="px-6 h-full min-h-full py-4 overflow-y-auto relative"
    >
      <Toaster
        toasterId="chatbot-toast"
        containerStyle={{ position: "sticky" }}
      />

      <div className="mb-2">
        {messages.map((chat, index) => {
          if (chat.role === "user") {
            return <ChatbotMessageUser key={index} message={chat.content} />;
          } else if (chat.role === "assistant") {
            return (
              <ChatbotMessageSystem
                key={index}
                message={chat.content}
                isLastMessage={index === messages.length - 1}
              />
            );
          }
        })}
      </div>
      <div id="bottomChatbotMarker" />
    </div>
  );
};

export default ChatbotContent;
