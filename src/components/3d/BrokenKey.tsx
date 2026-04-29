import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function BrokenKey() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.16;
    }
  });

  return (
    <Float floatIntensity={1.4} speed={1.7}>
      <group ref={groupRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.25, -1.15, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 2.25, 32]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.92} roughness={0.16} />
        </mesh>
        
        <mesh position={[-1.35, 0.65, 0]} rotation={[0.2, 0, -0.2]}>
          <torusGeometry args={[0.58, 0.14, 20, 56]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.95} roughness={0.1} />
        </mesh>

        <mesh position={[0.92, -0.42, 0.03]} rotation={[0.18, 0.08, 0.72]}>
          <boxGeometry args={[0.26, 0.96, 0.12]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.35} roughness={0.28} />
        </mesh>

        <mesh position={[0.35, -0.36, -0.02]} rotation={[0.05, -0.12, -0.3]}>
          <boxGeometry args={[0.22, 0.7, 0.12]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.86} roughness={0.2} />
        </mesh>

        {[
          [-0.15, -0.15, 0.18, 0.22],
          [0.16, 0.08, -0.16, 0.16],
          [0.48, -0.1, 0.2, 0.13],
        ].map(([x, y, z, size], index) => (
          <mesh key={index} position={[x, y, z]} rotation={[index * 0.7, 0.4, index * 0.45]}>
            <tetrahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={index === 1 ? '#ef4444' : '#e5e7eb'} emissive={index === 1 ? '#ef4444' : '#000000'} emissiveIntensity={index === 1 ? 0.8 : 0} metalness={0.8} roughness={0.18} />
          </mesh>
        ))}

        <pointLight color="#ef4444" intensity={2.2} distance={4} position={[1.1, -0.3, 1.2]} />
      </group>
    </Float>
  );
}
