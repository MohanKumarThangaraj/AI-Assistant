"use client";
import { motion } from "framer-motion";
import { useSpeech } from "../hooks/useSpeech";
import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
const ChatInput = () => {
  const {
    transcript,
    listening,
    speak,
    startListening,
    stopListening,
    resetSpeech,
  } = useSpeech();
  const [input, setInput] = useState("");
  const { sendMessage } = useWebSocket("ws://localhost:8000/ws");
  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input);
      speak(input); // Speak the message after sending
      setInput("");
    }
  };

  return (
    <motion.div
      className='w-full flex flex-col items-center mt-4 space-y-2'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <input
        type='text'
        className='flex-1 p-2 rounded-md bg-gray-700 text-white border-none outline-none w-full'
        placeholder='Type your message...'
        value={input || transcript}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className='flex space-x-2'>
        <motion.button
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}>
          Send
        </motion.button>

        <motion.button
          className='px-4 py-2 bg-green-500 text-white rounded-md'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startListening}>
          🎙️ Start
        </motion.button>

        <motion.button
          className='px-4 py-2 bg-red-500 text-white rounded-md'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={stopListening}>
          ⏹️ Stop
        </motion.button>

        <motion.button
          className='px-4 py-2 bg-yellow-500 text-white rounded-md'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetSpeech}>
          🔄 Reset
        </motion.button>
      </div>

      <p className='text-white mt-2'>{listening ? "🎤 Listening..." : ""}</p>
    </motion.div>
  );
};

export default ChatInput;
