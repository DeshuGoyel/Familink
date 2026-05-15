import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const PINS = [
  { position: [2.5, 1.5, 0], label: 'London, UK', users: '1,428 Families' },
  { position: [-2.2, 2.0, 1.2], label: 'New York, US', users: '2,120 Families' },
  { position: [0.5, -2.8, 1.5], label: 'São Paulo, BR', users: '850 Families' },
  { position: [2.0, -1.8, -1.5], label: 'Dubai, UAE', users: '1,500 Families' },
  { position: [-1.5, 0.5, -2.8], label: 'Singapore, SG', users: '2,100 Families' },
  { position: [0.8, 2.5, -1.2], label: 'Berlin, DE', users: '940 Families' },
  { position: [2.8, 0.5, 1.2], label: 'Mumbai, IN', users: '3,200 Families' },
  { position: [-2.5, -1.0, -1.8], label: 'Sydney, AU', users: '610 Families' },
  { position: [-1.0, -2.5, -2.0], label: 'Cape Town, ZA', users: '420 Families' },
];

function Pin({ position, label, users }: { position: [number, number, number], label: string, users: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#f97316" : "#D4AF37"} />
      </mesh>
      <Html distanceFactor={10} position={[0, 0.2, 0]}>
        <div className={`pointer-events-none transition-all duration-300 transform ${hovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-2'}`}>
          <div className="bg-surface/95 backdrop-blur-md border border-brand-gold/30 p-3 rounded-xl shadow-2xl whitespace-nowrap">
            <p className="text-primary font-bold text-xs">{label}</p>
            <p className="text-brand-gold font-bold font-digits text-[10px] mt-0.5">{users}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Earth Sphere */}
      <Sphere ref={meshRef} args={[3, 64, 64]}>
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.4}
          emissive="#D4AF37"
          emissiveIntensity={0.05}
          wireframe
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[3.2, 64, 64]}>
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.03} side={THREE.BackSide} />
      </Sphere>

      {/* Pins */}
      {PINS.map((pin, i) => (
        <Pin key={i} {...pin} />
      ))}
    </group>
  );
}
