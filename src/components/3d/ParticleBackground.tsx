import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const count = useMemo(() => {
    if (typeof window === 'undefined') return 500;
    return window.innerWidth < 768 ? 160 : 500;
  }, []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const speed = 0.01 + Math.random() * 0.02;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    particles.forEach((particle, i) => {
      particle.y += particle.speed;
      if (particle.y > 20) particle.y = -20;

      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0 && dist < 3) {
        const force = (3 - dist) / 3;
        particle.x += (dx / dist) * force * 0.15;
        particle.y += (dy / dist) * force * 0.15;
      }
      
      // gently pull back to bounds if they drift too far out (optional, mostly they drift horizontally)
      if (particle.x > 30) particle.x = 30;
      if (particle.x < -30) particle.x = -30;
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-secondary/80">
      <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 15], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
