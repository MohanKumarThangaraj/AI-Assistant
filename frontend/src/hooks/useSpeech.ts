import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";

export const useSpeech = () => {
  const speech = useRef(new Speech());
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 🎙️ Speech-to-Text (STT)
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    speech.current
      .init({
        volume: 1,
        lang: "en-US",
        rate: 1,
        pitch: 1,
        voice: "Google UK English Male",
      })
      .catch((error) => console.error("Speech init error:", error));
  }, []);

  const speak = (text: string) => {
    if (speech.current && text) {
      setIsSpeaking(true);
      speech.current.speak({ text });
      setTimeout(() => setIsSpeaking(false), text.length * 100); // Estimate speaking time
    }
  };

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };

  const stopListening = () => SpeechRecognition.stopListening();
  const resetSpeech = () => resetTranscript();

  return {
    transcript,
    listening,
    isSpeaking,
    speak,
    startListening,
    stopListening,
    resetSpeech,
  };
};
