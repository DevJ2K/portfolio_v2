import { Chat } from "@/types/Chat";
import MessageChatbotUser from "./MessageChatbotUser";
import MessageChatbotSystem from "./MessageChatbotSystem";

const ChatbotContent = ({ messages }: {messages: Chat[]}) => {
return (
  <div id="chatbotContainer" className="px-6 h-full min-h-full py-4 overflow-y-auto">

    {/* <div v-for="(chat, index) in messages" :key="index" class="mb-2"> */}
    <div className="mb-2">
      {
        messages.map((chat, index) => {
          if (chat.role === "user") {
            return <MessageChatbotUser key={index} message={chat.content} />;
          } else if (chat.role === "assistant") {
            return <MessageChatbotSystem key={index} message={chat.content} />;
          }
        })
      }
      {/* <ChatbotUserMessage v-if="chat.role === 'user'" :message="chat.content" />
      <ChatbotSystemMessage
        v-else-if="chat.role === 'assistant'"
        :message="chat.content"
      /> */}
    </div>
    <div id="bottomChatbotMarker"/>
  </div>
)
}

export default ChatbotContent;
