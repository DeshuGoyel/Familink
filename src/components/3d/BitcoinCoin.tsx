import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

export function BitcoinCoin() {
  const groupRef = useRef<THREE.Group>(null);
  const coinRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Sine-wave descent, looping between y=0.5 and y=-2.5
    // let's do a repeating linear descent with a smooth reset
    const yPos = 1 - (t % 4); 
    groupRef.current.position.y = yPos;
    
    if (coinRef.current) {
      coinRef.current.rotation.y += 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic light moving with coin */}
      <pointLight intensity={2} color="#D4AF37" distance={3} decay={2} />
      
      {/* Coin Mesh */}
      <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={coinRef}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshPhysicalMaterial color="#FFD700" metalness={1} roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} emissive="#D4AF37" emissiveIntensity={0.5} />
          
          <Text 
            position={[0, 0, 0.026]} 
            fontSize={0.2} 
            color="#FFD700" 
            anchorX="center" 
            anchorY="middle"
          >
            ₿
          </Text>
          <Text 
            position={[0, 0, -0.026]} 
            rotation={[0, Math.PI, 0]}
            fontSize={0.2} 
            color="#FFD700" 
            anchorX="center" 
            anchorY="middle"
          >
            ₿
          </Text>
        </mesh>
      </Float>
    </group>
  );
}
