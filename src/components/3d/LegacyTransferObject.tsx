import { useMemo, useRef } from 'react';
import { Float, Line, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const heirs: [number, number, number][] = [
  [-2.05, 0.72, 0],
  [2.05, 0.72, 0],
  [0, -1.8, 0],
];

export default function LegacyTransferObject() {
  const rootRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const packetRefs = useRef<THREE.Mesh[]>([]);

  const lines = useMemo(
    () => heirs.map((heir) => [new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(...heir)]),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (rootRef.current) {
      rootRef.current.rotation.y = Math.sin(time * 0.24) * 0.18;
      rootRef.current.position.y = Math.sin(time * 0.82) * 0.06;
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.16;
      orbitRef.current.rotation.x = Math.sin(time * 0.32) * 0.16;
    }

    packetRefs.current.forEach((packet, index) => {
      const start = new THREE.Vector3(0, 0.2, 0.15);
      const end = new THREE.Vector3(...heirs[index]).add(new THREE.Vector3(0, 0, 0.15));
      const progress = (Math.sin(time * 0.85 + index * 1.7) + 1) / 2;
      packet.position.copy(start.lerp(end, progress * 0.62 + 0.18));
      packet.rotation.y += delta * 1.4;
    });
  });

  return (
    <Float speed={1.05} floatIntensity={0.25} rotationIntensity={0.08}>
      <group ref={rootRef}>
        <group ref={orbitRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.35, 0.012, 12, 120]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.28} />
          </mesh>
          <mesh rotation={[Math.PI / 2.5, 0.24, -0.44]}>
            <torusGeometry args={[1.48, 0.009, 12, 96]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.36} />
          </mesh>
        </group>

        <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            color="#ecfeff"
            emissive="#22c55e"
            emissiveIntensity={0.24}
            transmission={0.3}
            thickness={0.8}
            transparent
            opacity={0.92}
            metalness={0.2}
            roughness={0.08}
            clearcoat={1}
          />
        </mesh>

        <mesh position={[0, 0.25, 0.45]}>
          <boxGeometry args={[0.26, 0.68, 0.1]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.55} metalness={0.55} roughness={0.16} />
        </mesh>

        {lines.map((points, index) => (
          <Line key={index} points={points} color="#bbf7d0" transparent opacity={0.45} lineWidth={1.8} />
        ))}

        {heirs.map((_, index) => (
          <mesh
            key={`packet-${index}`}
            ref={(node) => {
              if (node) packetRefs.current[index] = node;
            }}
          >
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#86efac" emissive="#22c55e" emissiveIntensity={0.82} metalness={0.4} roughness={0.18} />
          </mesh>
        ))}

        {heirs.map((position, index) => (
          <group key={index} position={position}>
            <Sphere args={[0.28, 28, 28]}>
              <meshStandardMaterial
                color={index === 2 ? '#fbbf24' : '#ffffff'}
                emissive={index === 2 ? '#f59e0b' : '#22c55e'}
                emissiveIntensity={index === 2 ? 0.75 : 0.55}
                roughness={0.16}
              />
            </Sphere>
            <mesh position={[0, -0.52, 0]}>
              <capsuleGeometry args={[0.19, 0.42, 6, 18]} />
              <meshStandardMaterial color="#e5e7eb" roughness={0.24} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.5, 0.01, 8, 56]} />
              <meshBasicMaterial color="#bbf7d0" transparent opacity={0.36} />
            </mesh>
          </group>
        ))}

        <pointLight color="#22c55e" intensity={2.1} distance={6} position={[0, 0.5, 2.6]} />
        <pointLight color="#fbbf24" intensity={1.4} distance={5} position={[1.8, 1.6, 1.8]} />
      </group>
    </Float>
  );
}
