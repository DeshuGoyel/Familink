import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function BrokenKey() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float floatIntensity={2} speed={2}>
      <group ref={groupRef}>
        <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 3, 32]} />
          <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[-2, 0, 0]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[1.5, -0.4, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.2, 0.8, 0.1]} />
          <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={1} />
        </mesh>

        <mesh position={[0.5, -0.4, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.2, 0.6, 0.1]} />
          <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}
