"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Speech from "speak-tts";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const speech = useRef<Speech | null>(null);

  // 🎤 Speech-to-Text Hook (Voice Recognition)
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // 🔊 AI Voice Output (Text-to-Speech)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ Ensure Speech API only initializes in the browser
      import("speak-tts").then((module) => {
        speech.current = new module.default();
        speech.current
          .init({
            volume: 1,
            lang: "en-US",
            rate: 1,
            pitch: 1,
            voice: "Google UK English Male",
          })
          .catch(console.error);
      });
    }
  }, []);

  // 📡 WebSocket Connection
  useEffect(() => {
    if (typeof window === "undefined") return;
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setIsConnected(true);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { sender: "AI", text: data.message }]);

      // 🔊 Speak AI Response
      if (speech.current) {
        speech.current.speak({ text: data.message });
      } else {
        console.warn("⏳ Speech not ready yet!");
      }
    };

    ws.current.onclose = () => setIsConnected(false);

    return () => ws.current?.close();
  }, [url]);

  // ✉️ Send User Message
  const sendMessage = useCallback(
    (message: string) => {
      if (ws.current && isConnected) {
        ws.current.send(JSON.stringify({ message }));
        setMessages((prev) => [...prev, { sender: "You", text: message }]);
      }
    },
    [isConnected]
  );

  // ✅ Fix: Use `SpeechRecognition` directly
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return {
    messages,
    sendMessage,
    isConnected,
    transcript, // 🎤 Live voice transcription
    listening, // 🎙 Detects if voice recognition is active
    startListening, // 🟢 Start listening (fixed)
    stopListening, // 🔴 Stop listening (fixed)
    resetTranscript, // 🔄 Clear transcript
    browserSupportsSpeechRecognition,
  };
};

export default useWebSocket;
