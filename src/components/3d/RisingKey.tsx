import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function RisingKey() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.38;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.22;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.22;
    }
  });

  return (
    <Float floatIntensity={1} speed={1.5}>
      <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.1, 0.012, 12, 96]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, 0.3, 0.2]}>
            <torusGeometry args={[1.45, 0.01, 12, 80]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.35} />
          </mesh>
        </group>

        <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 2.7, 36]} />
          <meshStandardMaterial color="#f8fafc" emissive="#4F5CFF" emissiveIntensity={0.32} metalness={1} roughness={0.08} />
        </mesh>
        
        <mesh position={[0, 2, 0]}>
          <torusGeometry args={[0.56, 0.13, 20, 64]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} metalness={0.95} roughness={0.08} />
        </mesh>

        <mesh position={[0.4, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.72, 18]} />
          <meshStandardMaterial color="#f8fafc" emissive="#4F5CFF" emissiveIntensity={0.28} metalness={1} roughness={0.08} />
        </mesh>

        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.58, 18]} />
          <meshStandardMaterial color="#f8fafc" emissive="#4F5CFF" emissiveIntensity={0.28} metalness={1} roughness={0.08} />
        </mesh>
        
        <pointLight color="#22C55E" intensity={2.4} distance={5} />
        <pointLight color="#FBBF24" intensity={1.6} distance={4} position={[0, 2.2, 1.4]} />
      </group>
    </Float>
  );
}
