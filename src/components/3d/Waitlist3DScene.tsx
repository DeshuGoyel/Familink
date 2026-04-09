import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { KeyModel } from './KeyModel';
import { BitcoinCoin } from './BitcoinCoin';
import { FamilyTree3D } from './FamilyTree3D';
import { ParticleField } from './ParticleField';

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth interpolation for parallax
      const targetX = (state.mouse.x * Math.PI) / 15;
      const targetY = (state.mouse.y * Math.PI) / 15;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export function Waitlist3DScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Environment Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#e0e7ff" />
        <pointLight position={[-10, 10, 10]} intensity={4} color="#4F5CFF" />
        <pointLight position={[10, -10, 5]} intensity={3} color="#a855f7" />
        
        {/* Floating Particles */}
        <ParticleField count={200} isMobile={isMobile} />

        <ParallaxGroup>
          <KeyModel />
          <BitcoinCoin />
          <FamilyTree3D />
        </ParallaxGroup>

        {/* Circuit board grid on ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
          <planeGeometry args={[50, 50, 50, 50]} />
          <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.15} transparent />
        </mesh>

        {/* Minimal interaction to prevent breaking the layout, but allow slight view change */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI/2} 
          minPolarAngle={Math.PI/2 - 0.2} 
          maxAzimuthAngle={0.2}
          minAzimuthAngle={-0.2}
        />
      </Canvas>
    </div>
  );
}
