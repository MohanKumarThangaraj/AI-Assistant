import { useRef, useState } from "react";

const detectEmotion = (
  text: string
): "happy" | "sad" | "neutral" | "excited" | "angry" | "confused" | "love" => {
  const lowerText = text.toLowerCase();
  if (/amazing|great|awesome|wonderful|fantastic/.test(lowerText))
    return "happy";
  if (/sad|terrible|bad|depressed|cry|pain/.test(lowerText)) return "sad";
  if (/wow|incredible|unbelievable|shocked/.test(lowerText)) return "excited";
  if (/angry|furious|mad|annoyed/.test(lowerText)) return "angry";
  if (/huh|confused|what\?|how\?/.test(lowerText)) return "confused";
  if (/love|beautiful|heart|romantic/.test(lowerText)) return "love";
  return "neutral";
};

const useSpeechSynthesis = () => {
  const synthRef = useRef<SpeechSynthesis | null>(window.speechSynthesis);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const [viseme, setViseme] = useState(0);
  const speak = (text: string) => {
    if (!synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const emotion = detectEmotion(text);

    switch (emotion) {
      case "happy":
        utterance.pitch = 1.4;
        utterance.rate = 1.2;
        break;
      case "sad":
        utterance.pitch = 0.8;
        utterance.rate = 0.9;
        break;
      case "excited":
        utterance.pitch = 1.6;
        utterance.rate = 1.3;
        break;
      case "angry":
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
        break;
      case "confused":
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
        break;
      case "love":
        utterance.pitch = 1.3;
        utterance.rate = 1.1;
        break;
      default:
        utterance.pitch = 1;
        utterance.rate = 1;
        break;
    }
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        setViseme(Math.random());
      }
    };

    utterance.onend = () => setViseme(0);
    utterance.voice = voiceRef.current;
    synthRef.current.speak(utterance);
  };

  return { speak, detectEmotion, viseme };
};

export { detectEmotion };
export default useSpeechSynthesis;
