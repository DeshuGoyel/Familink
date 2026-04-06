import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Cylinder, Box, Octahedron, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function KeyModel() {
  const humanRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Slow rotation of the key
    if (keyRef.current) {
      keyRef.current.rotation.y = t * 0.2; // 2rpmish
    }
    
    // Human pulse (solid to translucent)
    if (humanRef.current) {
      const opacity = Math.abs(Math.sin(t)); // 0 to 1 loop (approx 2s)
      humanRef.current.children.forEach((child: any) => {
        if (child.material) {
          child.material.opacity = 0.4 + (opacity * 0.6); // 40% to 100%
        }
      });
    }
  });

  return (
    <group ref={keyRef}>
      {/* Key Bow (Upward Arrow Shape) in Silver */}
      <group position={[0, 2.5, 0]}>
        {/* Arrow point */}
        <Cone args={[0.8, 1, 4]} position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <meshPhysicalMaterial color="#E0E0E0" metalness={1} roughness={0.05} clearcoat={1} clearcoatRoughness={0.1} />
        </Cone>
        {/* Arrow base (cutout around human) */}
        <Box args={[1.13, 1, 0.4]} position={[0, -0.5, 0]}>
          <meshPhysicalMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} transmission={0.9} thickness={0.5} ior={1.5} transparent opacity={0.8} />
        </Box>
        
        {/* Human Silhouette inside the bow */}
        <group ref={humanRef} position={[0, -0.5, 0]}>
          <Sphere args={[0.15]} position={[0, 0.3, 0]}>
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} transparent />
          </Sphere>
          <Cylinder args={[0.15, 0.2, 0.4]} position={[0, -0.1, 0]}>
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} transparent />
          </Cylinder>
        </group>
      </group>

      {/* Key Shaft in Gold */}
      <Cylinder args={[0.15, 0.15, 3]} position={[0, 0.5, 0]}>
        <meshPhysicalMaterial color="#D4AF37" metalness={1} roughness={0.1} clearcoat={0.5} />
      </Cylinder>

      {/* Two Silver 3D hands in V-Shape Cupped Gesture */}
      <group position={[0, 1, 0]}>
         {/* Left Hand approximation */}
         <Box args={[0.8, 0.2, 0.4]} position={[-0.4, -0.4, 0]} rotation={[0, 0, Math.PI / 6]}>
            <meshPhysicalMaterial color="#C0C0C0" metalness={1} roughness={0.2} />
         </Box>
         {/* Right Hand approximation */}
         <Box args={[0.8, 0.2, 0.4]} position={[0.4, -0.4, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <meshPhysicalMaterial color="#C0C0C0" metalness={1} roughness={0.2} />
         </Box>
      </group>

      {/* Key Base (Shield shape / Diamond) */}
      <Octahedron args={[0.8, 0]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.4} />
      </Octahedron>
    </group>
  );
}
