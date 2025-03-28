"use client";

import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };
  const {
    messages,
    sendMessage,
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useWebSocket("ws://localhost:8000/ws");

  if (!browserSupportsSpeechRecognition) {
    return <p>⚠️ Speech recognition is not supported in this browser.</p>;
  }

  return (
    <div className='chat-container'>
      {/* 📜 Chat Messages */}
      <div className='messages'>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      {/* 🎤 Voice Input & Send */}
      <div className='input-container'>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          className={`mic-button ${listening ? "active" : ""}`}>
          <FaMicrophone />
        </button>

        <input
          type='text'
          value={transcript || input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder='Type a message...'
        />

        <button onClick={handleSend} className='send-button'>
          <FaPaperPlane />
        </button>
      </div>

      <button onClick={resetTranscript} className='reset-button'>
        Reset Voice
      </button>
    </div>
  );
};

export default Chat;
