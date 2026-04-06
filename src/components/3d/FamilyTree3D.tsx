import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export function FamilyTree3D() {
  const dotsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!dotsRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Pulse gently
    const scale = 1 + Math.sin(t * 3) * 0.2;
    dotsRef.current.children.forEach((child) => {
      child.scale.set(scale, scale, scale);
    });
  });

  const nodes = [
    [0, 0, 0], // root
    [-0.3, 0.4, 0], // left child
    [0.3, 0.4, 0], // right child
    [-0.5, 0.8, 0], // left-left
    [-0.1, 0.8, 0], // left-right
    [0.5, 0.8, 0], // right-right
  ];

  return (
    <group position={[0, -2, 0]}>
      {/* Emerald glow light */}
      <pointLight color="#22C55E" intensity={2} distance={3} />
      
      {/* Connections (Lines) */}
      <Line points={[nodes[0], nodes[1]] as any} color="#22C55E" opacity={0.5} transparent lineWidth={2} />
      <Line points={[nodes[0], nodes[2]] as any} color="#22C55E" opacity={0.5} transparent lineWidth={2} />
      <Line points={[nodes[1], nodes[3]] as any} color="#22C55E" opacity={0.5} transparent lineWidth={2} />
      <Line points={[nodes[1], nodes[4]] as any} color="#22C55E" opacity={0.5} transparent lineWidth={2} />
      <Line points={[nodes[2], nodes[5]] as any} color="#22C55E" opacity={0.5} transparent lineWidth={2} />

      {/* Nodes (Dots) */}
      <group ref={dotsRef}>
        {nodes.map((pos, i) => (
          <Sphere key={i} args={[0.04, 16, 16]} position={pos as [number, number, number]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
        ))}
      </group>
    </group>
  );
}
