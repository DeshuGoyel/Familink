import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Sphere, Trail } from '@react-three/drei';

interface GuardianNetworkProps {
  guardians: { id: string; status: string }[];
}

export default function GuardianNetwork3D({ guardians }: GuardianNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3;

  const nodes = useMemo(() => {
    return guardians.map((g, i) => {
      const angle = (i / guardians.length) * Math.PI * 2;
      return {
        id: g.id,
        status: g.status,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.5,
          Math.sin(angle) * radius
        ),
      };
    });
  }, [guardians]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={2} />
      </Sphere>
      <pointLight color="#4F5CFF" intensity={5} distance={10} />

      {nodes.map((node) => {
        const color = node.status === 'Confirmed' ? '#22C55E' : '#F59E0B';
        return (
          <group key={node.id}>
            <Line
              points={[[0, 0, 0], node.position.toArray()]}
              color={color}
              lineWidth={2}
              transparent
              opacity={0.4}
            />
            <Trail
              width={2}
              color={color}
              length={4}
              decay={1}
              local={false}
              stride={0}
              interval={1}
            >
              <mesh position={node.position}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
              </mesh>
            </Trail>
          </group>
        );
      })}
    </group>
  );
}
