"use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { fetchBackendData } from "../utils/api";

export default function Home() {
  // const [text, setText] = useState("");
  // const [audio, setAudio] = useState(null);
  // const [message, setMessage] = useState<string>("");
  // useEffect(() => {
  //   const getMessage = async () => {
  //     const data = await fetchBackendData();
  //     if (data) {
  //       setMessage(data.message);
  //     }
  //   };
  //   getMessage();
  // }, []);
  // const handleTTS = async () => {
  //   const response = await axios.post("http://localhost:8000/tts", { text });
  //   setAudio(response.data.audio_file);
  // };

  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-5xl font-bold text-neon mb-4'>
          Welcome to Chi-Chi v2.0
        </h1>
        <p className='text-lg text-white/80'>
          Your AI Companion for everything.
        </p>
        <a
          href='/chat'
          className='mt-6 px-6 py-3 bg-neon text-black font-bold rounded-lg shadow-neon hover:bg-cyan-400 transition'>
          Start Chatting 🚀
        </a>
      </div>
      {/* <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleTTS}>Convert to Speech</button>
      {audio && <audio controls src={`http://localhost:8000/${audio}`} />} */}
    </div>
  );
}
