"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import AvatarFace from "./AvatarFace";

const AiAvatar = ({ message }: { message: string }) => {
  const { detectEmotion, viseme } = useSpeechSynthesis();
  const [emotion, setEmotion] = useState<
    "happy" | "sad" | "neutral" | "excited" | "angry" | "confused" | "love"
  >("neutral");

  useEffect(() => {
    setEmotion(detectEmotion(message));
  }, [message]);

  return (
    <motion.div
      className='avatar-container'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} />
        <AvatarFace emotion={emotion} viseme={viseme} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </motion.div>
  );
};

export default AiAvatar;
