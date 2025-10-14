const MessageChatbotUser = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end">
      <span className="inline-block px-3 py-2 rounded-lg rounded-br-none bg-transparent border border-zinc-300 text-zinc-800 chat-user-shadow text-sm md:text-base">
        {message}
      </span>
    </div>
  )
};

export default MessageChatbotUser;
