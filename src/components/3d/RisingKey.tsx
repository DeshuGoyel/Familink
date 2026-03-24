import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function RisingKey() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Float floatIntensity={1} speed={1.5}>
      <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
        <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 2.5, 32]} />
          <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
        
        <mesh position={[0, 2, 0]}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0.4, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
          <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
          <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
        
        <pointLight color="#22C55E" intensity={2} distance={5} />
      </group>
    </Float>
  );
}
