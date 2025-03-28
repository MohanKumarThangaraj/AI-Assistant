import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AvatarFace = ({
  emotion,
  viseme,
}: {
  emotion: string;
  viseme: number;
}) => {
  const faceRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  // 🎭 **Facial Expression Mapping**
  const expressions = {
    happy: { mouth: 0.2, eyes: 0.05, eyebrows: 0.1 },
    sad: { mouth: -0.2, eyes: -0.05, eyebrows: -0.1 },
    excited: { mouth: 0.3, eyes: 0.1, eyebrows: 0.2 },
    angry: { mouth: -0.3, eyes: -0.1, eyebrows: 0.3 },
    confused: { mouth: 0, eyes: 0, eyebrows: 0.2 },
    love: { mouth: 0.3, eyes: 0.15, eyebrows: 0.05 },
    neutral: { mouth: 0, eyes: 0, eyebrows: 0 },
  };

  useFrame(() => {
    if (faceRef.current && mouthRef.current) {
      // 😃 **Animate Facial Expressions**
      faceRef.current.position.y =
        expressions[emotion as keyof typeof expressions].eyes;
      mouthRef.current.scale.y =
        expressions[emotion as keyof typeof expressions].mouth + viseme * 0.2;
    }
  });

  return (
    <group ref={faceRef}>
      {/* 😊 Face Sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color='cyan' />
      </mesh>
      {/* 👄 Mouth (Lip-Sync Enabled) */}
      <mesh ref={mouthRef} position={[0, -0.5, 0.9]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color='black' />
      </mesh>
      {/* 👀 Eyes */}
      <mesh position={[-0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color='black' />
      </mesh>
      <mesh position={[0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color='black' />
      </mesh>
    </group>
  );
};

export default AvatarFace;
