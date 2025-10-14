"use client";

import useChatbotStore from "@/stores/chatbot";
import Image from "next/image";
import { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ChatbotContent from "./ChatbotContent";
import PromptChatbot from "./PromptChatbot";

const Chatbot = () => {
  const chatSendMessage = useChatbotStore((state) => state.sendMessage);
  const messages = useChatbotStore((state) => state.messages);
  const clearConversation = useChatbotStore((state) => state.clearConversation);

  const [prompt, setPrompt] = useState<string>("");
  const suggestions: Array<string> = [
    // "What are DevJ2K's main programming skills?",
    // "What technologies is DevJ2K passionate about?",
    "How fast did DevJ2K complete the 42 common core?",
    "How did Theo get into coding?",
    "Talk about Theo’s experience.",
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);

  const sendMessage = (message: string) => {
    if (message.trim().length === 0) {
      message = prompt.trim();
    }
    if (message.trim().length === 0) return;
    setPrompt("");
    chatSendMessage(message);
  };

  const openChatbot = () => {
    setIsFirstOpen(false);
    setIsOpen(true);
  };
  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed min-h-22 group flex items-end justify-end transition-all duration-300 ease-in-out z-50  md:bottom-8 md:right-8 ${
        isOpen ? "bottom-0 right-0" : "bottom-4 right-4"
      }`}
    >
      {/* <!-- Integral Box --> */}
      <div
        className={`relative flex flex-col z-50 bg-zinc-100 chat-box-shadow rounded-4xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "w-screen h-screen md:h-[max(65vh,550px)] md:w-[max(30vw,500px)] rounded-none md:rounded-4xl"
            : "size-18"
        } ${isFirstOpen ? "animate-bounce group-hover:animate-none" : ""}`}
      >
        {/* <!-- Floating Button --> */}
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

        {/* <!-- Header --> */}
        <div className="flex items-center gap-2 chatbot-header-shadow px-6 py-3 transition-all duration-500 ease-in-out">
          {/* <!-- Placeholder Icon --> */}
          <div className="size-16 min-w-16" />
          {/* <!-- Badge --> */}
          <div className={`flex flex-col ${isOpen ? "" : "opacity-0"}`}>
            <span className="text-sm font-bold text-zinc-800">
              Assistant J2K
            </span>
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
