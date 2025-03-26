"use client";
import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  return (
    <div className='p-4  backdrop-blur-md'>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message...'
        className='w-full p-3 rounded-lg bg-transparent border border-white/30 text-white focus:ring-2 focus:ring-neon'
      />
    </div>
  );
}
