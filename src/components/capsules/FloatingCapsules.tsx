import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Capsule, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCapsuleProps {
  position: [number, number, number];
  color: string;
  speed: number;
  offset: number;
}

function SingleCapsule({ position, color, speed, offset }: FloatingCapsuleProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.y = position[1] + Math.sin(t) * 1.5;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.5;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <Capsule ref={meshRef} args={[0.4, 0.8, 4, 16]} position={position}>
      <MeshTransmissionMaterial 
        color={color}
        transmission={0.9}
        thickness={0.5}
        roughness={0.1}
        ior={1.5}
      />
      <pointLight distance={3} intensity={0.5} color={color} />
    </Capsule>
  );
}

export function FloatingCapsules({ capsules }: { capsules: any[] }) {
  // Generate a steady array of visual capsules based on actual data
  // Or just decorative if empty
  const visualItems = capsules.length > 0 ? capsules : [{}, {}, {}];

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {visualItems.map((c, i) => {
        const isLocked = c.isLocked ?? true;
        const color = isLocked ? '#f59e0b' : '#10b981'; // Gold if locked, Green if unlocked
        
        // Distribute them horizontally
        const x = (i % 5) * 2 - 4;
        const z = -Math.random() * 3;
        
        return (
          <SingleCapsule 
            key={c.id || i}
            position={[x, -1, z]}
            color={color}
            speed={0.5 + Math.random() * 0.5}
            offset={Math.random() * Math.PI * 2}
          />
        );
      })}
    </group>
  );
}
