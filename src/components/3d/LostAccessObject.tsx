import { useRef } from 'react';
import { Float, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LostAccessObject() {
  const rootRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (rootRef.current) {
      rootRef.current.rotation.y = Math.sin(time * 0.25) * 0.14;
      rootRef.current.rotation.x = Math.sin(time * 0.18) * 0.06;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }

    if (keyRef.current) {
      keyRef.current.position.y = 1.35 + Math.sin(time * 0.9) * 0.08;
      keyRef.current.rotation.z = -0.72 + Math.sin(time * 0.7) * 0.07;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.22} rotationIntensity={0.06}>
      <group ref={rootRef}>
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.55, 0.035, 18, 120]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.14} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.05, 0.018, 14, 96]} />
            <meshBasicMaterial color="#93c5fd" transparent opacity={0.26} />
          </mesh>
        </group>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.28, 1.28, 0.26, 96]} />
          <meshPhysicalMaterial
            color="#111827"
            metalness={0.78}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.08, 96]} />
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.18} />
        </mesh>

        <mesh position={[0, 0.05, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.035, 18, 72]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.08} />
        </mesh>

        <mesh position={[0, -0.22, 0.31]}>
          <capsuleGeometry args={[0.08, 0.32, 8, 18]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.75} roughness={0.22} />
        </mesh>

        <Line
          points={[[-0.62, 0.82, 0.38], [-0.16, 0.28, 0.4], [0.12, 0.05, 0.4], [0.7, -0.78, 0.38]]}
          color="#ef4444"
          transparent
          opacity={0.72}
          lineWidth={2.2}
        />

        <group ref={keyRef} position={[1.65, 1.35, 0.2]} rotation={[0.1, -0.18, -0.72]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 1.18, 28]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.32} metalness={0.96} roughness={0.08} />
          </mesh>
          <mesh position={[-0.7, 0, 0]}>
            <torusGeometry args={[0.24, 0.055, 18, 48]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.32} metalness={0.96} roughness={0.08} />
          </mesh>
          <mesh position={[0.5, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.09, 0.32, 0.09]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        <mesh rotation={[Math.PI / 2.18, 0, 0]}>
          <torusGeometry args={[2.05, 0.009, 12, 120]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.16} />
        </mesh>

        <pointLight color="#ef4444" intensity={2.1} distance={6} position={[1.2, 0.2, 2.4]} />
        <pointLight color="#fbbf24" intensity={1.3} distance={5} position={[1.8, 1.4, 1.8]} />
        <pointLight color="#93c5fd" intensity={0.9} distance={5} position={[-1.6, 0.8, 1.8]} />
      </group>
    </Float>
  );
}
