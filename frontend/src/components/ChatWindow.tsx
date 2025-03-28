"use client";
import { motion } from "framer-motion";
import ChatInput from "./ChatInput";
import AiAvatar from "./AiAvatar";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({
  messages,
}: {
  messages: { text: string; isUser: boolean }[];
}) => {
  return (
    <motion.div
      className='w-full h-full flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg shadow-lg'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}>
      <motion.h1
        className='text-white text-2xl font-bold mb-4'
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        🤖 AI Assistant
      </motion.h1>

      <motion.div
        className='chat-box bg-gray-800 text-white p-4 rounded-md w-full h-96 overflow-y-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}>
        <AiAvatar
          message={
            messages.length > 0 ? messages[messages.length - 1].text : ""
          }
        />

        <div className='flex-1 overflow-y-auto space-y-3'>
          {messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
          ))}
        </div>
      </motion.div>

      <ChatInput />
    </motion.div>
  );
};

export default ChatWindow;
