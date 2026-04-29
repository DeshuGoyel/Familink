import { useMemo, useRef } from 'react';
import { Float, Line, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const guardianNodes: [number, number, number][] = [
  [0, 2.4, 0],
  [2.2, 0.8, 0.2],
  [1.35, -1.9, -0.1],
  [-1.35, -1.9, 0.1],
  [-2.2, 0.8, -0.2],
];

export default function LandingVaultObject() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const guardianLines = useMemo(
    () => guardianNodes.map((node) => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node)]),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.35) * 0.22;
      groupRef.current.rotation.x = Math.sin(time * 0.22) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.16;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 1.8) * 0.025;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Float speed={1.4} floatIntensity={0.45} rotationIntensity={0.15}>
      <group ref={groupRef}>
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.25, 0.012, 12, 120]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.38} />
          </mesh>
          <mesh rotation={[Math.PI / 2.7, 0.18, 0.4]}>
            <torusGeometry args={[1.72, 0.01, 12, 96]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.48} />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, -0.36, -0.3]}>
            <torusGeometry args={[2.85, 0.008, 12, 120]} />
            <meshBasicMaterial color="#c4b5fd" transparent opacity={0.25} />
          </mesh>
        </group>

        {guardianLines.map((points, index) => (
          <Line key={index} points={points} color="#ffffff" transparent opacity={0.22} lineWidth={1} />
        ))}

        {guardianNodes.map((position, index) => (
          <group key={index} position={position}>
            <Sphere args={[0.14, 20, 20]}>
              <meshStandardMaterial
                color={index === 0 ? '#fbbf24' : '#ffffff'}
                emissive={index === 0 ? '#f59e0b' : '#818cf8'}
                emissiveIntensity={index === 0 ? 1.3 : 0.75}
                roughness={0.18}
                metalness={0.15}
              />
            </Sphere>
            <mesh>
              <torusGeometry args={[0.26, 0.008, 8, 40]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.32} />
            </mesh>
          </group>
        ))}

        <mesh ref={coreRef} castShadow receiveShadow>
          <octahedronGeometry args={[1.05, 2]} />
          <meshPhysicalMaterial
            color="#eef2ff"
            emissive="#4f46e5"
            emissiveIntensity={0.18}
            metalness={0.2}
            roughness={0.08}
            transmission={0.4}
            thickness={0.9}
            transparent
            opacity={0.92}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        <mesh position={[0, -0.02, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.92, 0.92, 0.16]} />
          <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.16} />
        </mesh>

        <mesh position={[0, 0.22, 0.11]}>
          <torusGeometry args={[0.34, 0.055, 14, 48, Math.PI]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.08} />
        </mesh>

        <mesh position={[0, -0.02, 0.18]}>
          <boxGeometry args={[0.18, 0.46, 0.08]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.45} />
        </mesh>

        <pointLight position={[0, 0, 2.4]} color="#fef3c7" intensity={2.2} distance={6} />
        <pointLight position={[-2.4, 2.2, 1.4]} color="#a78bfa" intensity={1.4} distance={7} />
        <pointLight position={[2.8, -1.2, 1.8]} color="#fb7185" intensity={1.1} distance={7} />
      </group>
    </Float>
  );
}
