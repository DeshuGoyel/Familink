import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({ count = 200, isMobile = false }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();
  const dummy = new THREE.Object3D();
  
  const actualCount = isMobile ? Math.min(count, 60) : count;

  // Generate random positions and colors
  const particles = useRef(
    Array.from({ length: Math.max(actualCount, 200) }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ],
      speed: 0.01 + Math.random() * 0.02,
      scale: 0.2 + Math.random() * 1.5,
      color: Math.random() > 0.5 ? new THREE.Color('#ffffff') : new THREE.Color('#4F5CFF'),
    }))
  );



  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Parallax effect mapped to mouse
    const targetX = (mouse.x * viewport.width) / 20;
    const targetY = (mouse.y * viewport.height) / 20;

    for (let i = 0; i < actualCount; i++) {
      const p = particles.current[i];
      
      // Drift slowly upwards and rotate
      const y = (p.position[1] + time * p.speed) % 10;
      
      dummy.position.set(
        p.position[0] + targetX * 0.5,
        y - 5 + targetY * 0.5,
        p.position[2]
      );
      
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
      mesh.current.setColorAt(i, p.color);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) {
      mesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, actualCount]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial transparent opacity={0.6} emissive="#4F5CFF" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
    </instancedMesh>
  );
}
