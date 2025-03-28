// src/components/ChatMessage.tsx
"use client";
import { motion } from "framer-motion";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";

const ChatMessage = ({ text, isUser }: { text: string; isUser: boolean }) => {
  const { speak } = useSpeechSynthesis();

  return (
    <motion.div
      className={`p-3 rounded-lg max-w-xs ${
        isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-700 text-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>
      {text}
      {!isUser && <button onClick={() => speak(text)}>🔊</button>}
    </motion.div>
  );
};

export default ChatMessage;
