import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function VaultScene({ score = 100 }: { score?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const isSecure = score >= 80;
  const isWarning = score < 80 && score >= 50;
  
  const coreColor = isSecure ? '#4F5CFF' : isWarning ? '#F59E0B' : '#EF4444';
  const glowColor = isSecure ? '#22C55E' : isWarning ? '#F59E0B' : '#EF4444';

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (groupRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
    if (sphereRef.current) {
      const targetScale = hovered ? 1.2 : 0.8;
      sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial 
            color="#0A0B1A" 
            wireframe={true} 
            emissive={coreColor}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent
            opacity={0.8}
          />
        </mesh>

        <mesh ref={sphereRef} scale={0.8}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <MeshDistortMaterial
            color={coreColor}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </mesh>

        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2} distance={10} />
      </group>
    </Float>
  );
}
