"use client";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";

export default function ChatPage() {
  return (
    <div className='flex flex-col h-screen'>
      <ChatWindow />
      <ChatInput />
    </div>
  );
}
