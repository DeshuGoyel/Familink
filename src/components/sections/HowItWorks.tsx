import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Line, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function VaultScene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group scale={0.5}>
          {/* Key body */}
          <Box args={[1, 0.5, 0.2]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </Box>
          <Cylinder args={[0.2, 0.2, 1.5]} position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#D4AF37" metalness={1} />
          </Cylinder>
          <Box args={[0.3, 0.4, 0.1]} position={[1.2, -0.3, 0]}>
            <meshStandardMaterial color="#D4AF37" metalness={1} />
          </Box>
        </group>
      </Float>
      {/* Floating docs */ }
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Box args={[0.3, 0.4, 0.05]} position={[-1, 0.5, 0.5]} rotation={[0.2, 0.5, 0.1]}>
           <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={0.5}/>
        </Box>
      </Float>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Box args={[0.3, 0.4, 0.05]} position={[-0.8, -0.5, -0.2]} rotation={[-0.2, 0.1, 0.4]}>
           <meshStandardMaterial color="#ffffff" opacity={0.8} transparent/>
        </Box>
      </Float>
    </group>
  );
}

function AvatarNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const nodes = [
    [0, 0.8, 0],
    [-0.8, -0.4, 0],
    [0.8, -0.4, 0]
  ];

  return (
    <group ref={groupRef}>
      <Line points={[nodes[0], nodes[1]] as any} color="#4F5CFF" transparent opacity={0.6} />
      <Line points={[nodes[1], nodes[2]] as any} color="#4F5CFF" transparent opacity={0.6} />
      <Line points={[nodes[2], nodes[0]] as any} color="#4F5CFF" transparent opacity={0.6} />
      {nodes.map((pos, i) => (
        <Sphere key={i} args={[0.15, 16, 16]} position={pos as [number, number, number]}>
          <meshStandardMaterial color="#ffffff" emissive="#4F5CFF" emissiveIntensity={i === 0 ? 1 : 0.2} />
        </Sphere>
      ))}
    </group>
  );
}

function FamilyTree() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      const activeNodeIndex = Math.floor(state.clock.elapsedTime * 2) % 6;
      groupRef.current.children.forEach((child: any, i) => {
        if (child.type === 'Mesh') { // Spheres
           child.material.emissiveIntensity = i === activeNodeIndex ? 2 : 0.2;
        }
      });
    }
  });

  const nodes = [
    [0, 0.8, 0],
    [-0.5, 0, 0],
    [0.5, 0, 0],
    [-0.8, -0.8, 0],
    [-0.2, -0.8, 0],
    [0.8, -0.8, 0]
  ];

  return (
    <group scale={0.8} position={[0, 0.2, 0]}>
      <Line points={[nodes[0], nodes[1]] as any} color="#D4AF37" transparent opacity={0.4} />
      <Line points={[nodes[0], nodes[2]] as any} color="#D4AF37" transparent opacity={0.4} />
      <Line points={[nodes[1], nodes[3]] as any} color="#D4AF37" transparent opacity={0.4} />
      <Line points={[nodes[1], nodes[4]] as any} color="#D4AF37" transparent opacity={0.4} />
      <Line points={[nodes[2], nodes[5]] as any} color="#D4AF37" transparent opacity={0.4} />
      
      <group ref={groupRef}>
        {nodes.map((pos, i) => (
          <Sphere key={i} args={[0.12, 16, 16]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.2} />
          </Sphere>
        ))}
      </group>
    </group>
  );
}



const steps = [
  {
    number: '1',
    title: 'Store Everything Securely',
    desc: 'Add your seed phrases, passwords, exchange accounts, and documents to your zero-knowledge encrypted vault.',
    Scene: VaultScene,
  },
  {
    number: '2',
    title: 'Choose Your Guardians',
    desc: 'Select trusted people who receive different pieces of the puzzle. No single person holds everything.',
    Scene: AvatarNetwork,
  },
  {
    number: '3',
    title: 'Your Legacy Transfers Automatically',
    desc: 'If you become inactive, your vault unlocks and your chosen guardians receive exactly what they need.',
    Scene: FamilyTree,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-[#020409]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="inline-block text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC]">
            3 Steps. 3 Minutes. Protected Forever.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-between gap-8 relative">
          
          {steps.map((step, i) => {
            const Scene = step.Scene;
            return (
              <div key={i} className="flex flex-col items-center lg:flex-1 relative w-full">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="w-full bg-[#0D1117] border border-white/5 rounded-3xl p-8 h-full flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(79,92,255,0.15)] hover:border-indigo-500/40 relative z-10"
                >
                  <div className="absolute top-6 left-6 text-6xl font-display font-bold text-transparent flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(79,92,255,1)] text-stroke text-stroke-indigo-400" 
                       style={{ WebkitTextStroke: '2px #4F5CFF' }}>
                    {step.number}
                  </div>
                  
                  {/* Icon Area (3D Scene) */}
                  <div className="h-48 w-full mb-8 relative pointer-events-none mt-4">
                     <Canvas camera={{ position: [0, 0, 4] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[5, 5, 5]} intensity={1} />
                        <Scene />
                     </Canvas>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-4 mt-auto">
                    {step.title}
                  </h3>
                  <p className="text-[#8B949E] leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Animated Arrow Connector */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-8 translate-x-1/2 -translate-y-1/2 z-0 w-16 h-4 items-center justify-center pointer-events-none">
                     <div className="w-full h-px bg-white/10 relative">
                        <motion.div 
                          className="absolute w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]"
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          style={{ top: '50%', transform: 'translateY(-50%)' }}
                        />
                     </div>
                     <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white/20 border-b-[4px] border-b-transparent absolute right-0" />
                  </div>
                )}
                {/* Mobile version connector */}
                {i < steps.length - 1 && (
                  <div className="flex lg:hidden w-1 h-8 my-4 relative">
                     <div className="w-px h-full bg-white/10 mx-auto relative relative">
                        <motion.div 
                          className="absolute w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]"
                          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          style={{ left: '50%', transform: 'translateX(-50%)' }}
                        />
                     </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
