"use client";

import useChatbotStore from "@/stores/chatbot";
import { useEffect, useState } from "react";
import ChatbotContent from "./ChatbotContent";
import PromptChatbot from "./PromptChatbot";
import toast from "react-hot-toast";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotFloatingButton from "./ChatbotFloatingButton";

const Chatbot = () => {
  // Chatbot state management
  const chatSendMessage = useChatbotStore((state) => state.sendMessage);
  const messages = useChatbotStore((state) => state.messages);
  const clearConversation = useChatbotStore((state) => state.clearConversation);

  // Popup state management
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);

  // Prompt management
  const [prompt, setPrompt] = useState<string>("");
  const suggestions: Array<string> = [
    "How fast did DevJ2K complete the 42 common core?",
    "How did Theo get into coding?",
    "Talk about Theo’s experience.",
  ];

  // Popup handlers
  const openChatbot = () => {
    setIsFirstOpen(false);
    setIsOpen(true);
  };
  const closeChatbot = () => {
    setIsOpen(false);
  };

  const sendMessage = async (message: string = "") => {
    // If no message is provided, use the current prompt (useful for enter key)
    if (message.trim().length === 0) {
      message = prompt.trim();
    }
    if (message.trim().length === 0) return;
    setPrompt("");
    const response = await chatSendMessage(message);
    if (response.ok === false) {
      toast.error(
        response.message ||
          "An error occurred while sending the message. Please try again later.",
        {
          toasterId: "chatbot-toast",
        }
      );
    }
  };

  // Disable body scroll when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed min-h-22 group flex items-end justify-end transition-all duration-300 ease-in-out z-50  md:bottom-8 md:right-8 ${
        isOpen ? "bottom-0 right-0" : "bottom-4 right-4"
      }`}
    >
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="absolute md:translate-x-8 md:translate-y-8 h-screen w-screen bg-black/25"
          onClick={closeChatbot}
        ></div>
      )}

      {/* <!-- Integral Box --> */}
      <div
        className={`relative flex flex-col z-50 bg-zinc-100 chat-box-shadow rounded-4xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "w-screen h-screen md:h-[max(65vh,550px)] md:w-[max(30vw,500px)] rounded-none md:rounded-4xl"
            : "size-18"
        } ${isFirstOpen ? "animate-bounce group-hover:animate-none" : ""}`}
      >
        {/* <!-- Floating Button --> */}
        <ChatbotFloatingButton isOpen={isOpen} openChatbot={openChatbot} />

        {/* <!-- Header --> */}
        <ChatbotHeader
          isOpen={isOpen}
          clearConversation={clearConversation}
          closeChatbot={closeChatbot}
        />

        {/* <!-- Chat Window --> */}
        <div
          className={`overflow-y-auto transition-all duration-500 ease-in-out h-full ${
            !isOpen ? "opacity-0" : ""
          }`}
        >
          {messages.length > 0 ? (
            <ChatbotContent messages={messages} />
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center h-full text-zinc-500">
              <p className="text-sm md:text-base text-zinc-600">
                Ask me anything about Théo — also known as DevJ2K.
              </p>
              {suggestions.map((suggestion) => (
                <button
                  className="cursor-pointer text-sm md:text-base hover:text-zinc-600 hover:bg-gray-200 px-2 py-1 rounded-lg border border-purple-300"
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* <!-- Chat bar --> */}
        <div
          className={`py-6 px-6 chatbot-prompt-shadow transition-all duration-500 ease-in-out ${
            !isOpen ? "opacity-0" : ""
          }`}
        >
          <PromptChatbot
            prompt={prompt}
            setPrompt={setPrompt}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
