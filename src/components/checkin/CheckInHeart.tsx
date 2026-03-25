import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Edges } from '@react-three/drei';
import * as THREE from 'three';

export function CheckInHeart({ isAlert = false }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = isAlert ? '#ef4444' : '#10b981'; // red for alert, emerald/green for active
  
  // Pulse animation: 60bpm = 1 beat/sec => fast wave when active. Slower if alert.
  const speed = isAlert ? 0.5 : 1.5;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      
      // Heartbeat scale
      const t = state.clock.elapsedTime * speed * Math.PI;
      const scale = 1 + Math.sin(t) * 0.05 + Math.sin(t * 2) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={color} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F5CFF" />
      
      <Icosahedron ref={meshRef} args={[1.5, 2]}>
        <MeshDistortMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={speed}
          transparent
          opacity={0.8}
        />
        <Edges color="white" threshold={15} opacity={0.5} transparent />
      </Icosahedron>
    </group>
  );
}
