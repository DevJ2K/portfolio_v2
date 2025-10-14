"use client";

import useChatbotStore from "@/stores/chatbot";
import Image from "next/image";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

const ChatbotMessageSystem = ({
  message,
  isLastMessage,
}: {
  message: string;
  isLastMessage: boolean;
}) => {
  // Typing state from the store
  const isTyping = useChatbotStore((state) => state.isTyping);

  // State to hold the sanitized HTML message
  const [sanitizedMessage, setSanitizedMessage] = useState<string>("");

  // Sanitize and convert markdown to HTML whenever the message changes
  useEffect(() => {
    if (message != null) {
      setSanitizedMessage(DOMPurify.sanitize(marked(message).toString()));
    } else {
      setSanitizedMessage(
        "Je m'excuse, je rencontre des <span class='text-red-500'>difficultés</span> pour répondre à votre demande."
      );
    }
  }, [message]);

  return (
    <div className="flex w-full gap-2 py-2 px-3">
      <div className="min-w-6 max-w-6 md:max-w-7 md:min-w-7">
        <div className="h-fit min-w-fit rounded-full shadow-md -translate-y-0.5">
          <Image
            src="/images/j2klogo.png"
            alt="Assistant J2K"
            width="400"
            height="400"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="text-sm md:text-base">
        {isTyping && sanitizedMessage.length == 0 && isLastMessage ? (
          <div>
            <span className="gradient-text pulse-animation">Thinking...</span>
          </div>
        ) : (
          <div
            className="prose max-w-none break-words text-sm md:text-base [&_code]:break-words [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
            dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ChatbotMessageSystem;
