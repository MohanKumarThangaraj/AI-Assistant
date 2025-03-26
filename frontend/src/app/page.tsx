import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);

  const handleTTS = async () => {
    const response = await axios.post("http://localhost:8000/tts", { text });
    setAudio(response.data.audio_file);
  };

  return (
    <div>
      <h1>Chi-Chi v2.0</h1>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleTTS}>Convert to Speech</button>
      {audio && <audio controls src={`http://localhost:8000/${audio}`} />}
    </div>
  );
}
