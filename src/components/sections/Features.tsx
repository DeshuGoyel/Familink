import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Torus, Sphere } from '@react-three/drei';
import { Shield, Users, Bitcoin, Wallet, Key } from 'lucide-react';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function OrbitRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={ringsRef}>
      <Torus args={[1.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#4F5CFF" transparent opacity={0.5} wireframe />
      </Torus>
      <Torus args={[2, 0.05, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshBasicMaterial color="#4F5CFF" transparent opacity={0.3} wireframe />
      </Torus>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#4F5CFF" emissive="#4F5CFF" emissiveIntensity={2} />
      </Sphere>
    </group>
  );
}

export default function Features() {
  return (
    <section className="py-28 bg-[#020409]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="inline-block text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-5">
            Everything Your Family Needs.<br/>
            <span className="text-[#8B949E]">Nothing They Don't.</span>
          </h2>
        </motion.div>

        {/* ASYMMETRIC BENTO GRID */}
        {/*
          Row 1: 1 large card (60%) + 1 tall card (40%)
          Row 2: 1 wide card (40%) + 1 large card (60%)
          We can achieve this with a 5-column grid on desktop:
          R1: span 3 + span 2 (tall)
          R2: span 2 + span 3
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 auto-rows-[300px]">

          {/* Feature 1: ZERO-KNOWLEDGE SECURITY (Large = span 3, row 1) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-3 bg-[#0D1117] border border-indigo-500/20 hover:border-indigo-500/40 rounded-3xl p-8 flex flex-col md:flex-row relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,92,255,0.1)]"
          >
            <div className="flex-1 flex flex-col z-10">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest w-fit mb-5 bg-indigo-500/20 text-indigo-300">
                LIVE AT LAUNCH
              </div>
              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-2 uppercase tracking-wide">
                Zero-Knowledge Security
              </h3>
              <p className="text-[#8B949E] text-base leading-relaxed max-w-sm">
                We can't see your secrets. Not even us.
              </p>
            </div>
            {/* Visual: Animated lock with orbit rings */}
            <div className="flex-1 h-48 md:h-full relative pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitRings />
              </Canvas>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                 <Shield size={48} className="text-[#F0F6FC] opacity-90 drop-shadow-[0_0_15px_rgba(79,92,255,0.8)]" />
              </div>
            </div>
          </motion.div>

          {/* Feature 2: MULTI-GUARDIAN RECOVERY (Tall = span 2, spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2 bg-[#0D1117] border border-gold/20 hover:border-gold/40 rounded-3xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            <div className="z-10 mb-8">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest w-fit mb-5 bg-yellow-500/20 text-yellow-300">
                LIVE AT LAUNCH
              </div>
              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-2 uppercase tracking-wide">
                Multi-Guardian Recovery
              </h3>
              <p className="text-[#8B949E] text-base leading-relaxed">
                Split secret architecture. No single point of failure.
              </p>
            </div>
            
            {/* Visual: Network of avatar nodes */}
            <div className="flex-1 mt-auto flex justify-center items-center relative min-h-[250px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#020409] border-2 border-gold rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                   <Key size={24} className="text-gold" />
                </div>
                {/* Connecting lines and nodes */}
                {[0, 120, 240].map((deg, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-24 h-px origin-left flex justify-end"
                    style={{ transform: `translateY(-50%) rotate(${deg}deg)` }}
                  >
                    <div className="w-full h-px bg-gradient-to-r from-gold/50 to-transparent absolute inset-0" />
                    <motion.div 
                       animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                       className="w-10 h-10 bg-[#0D1117] border border-white/20 rounded-full flex items-center justify-center -translate-y-1/2 mt-[0.5px] z-10"
                       style={{ transform: `translateX(50%) translateY(-50%) rotate(-${deg}deg)` }}
                    >
                      <Users size={16} className="text-[#F0F6FC]" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature 3: BITCOIN & CRYPTO NATIVE (Wide = span 2, row 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 bg-[#0D1117] border border-amber-500/20 hover:border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]"
          >
            <div className="z-10">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest w-fit mb-5 bg-amber-500/20 text-amber-300">
                COMING IN BETA
              </div>
              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-2 uppercase tracking-wide">
                Bitcoin & Crypto Native
              </h3>
              <p className="text-[#8B949E] text-sm leading-relaxed mb-6">
                Supports BTC, ETH, SOL, seed phrases, and hardware wallets.
              </p>
            </div>
            
            {/* Visual: Row of crypto logos with gold glow treatment */}
            <div className="flex gap-4 items-center">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                 <Bitcoin size={24} className="text-amber-400" />
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform delay-75">
                 <Wallet size={24} className="text-[#F0F6FC]" />
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform delay-150">
                 <Key size={24} className="text-[#F0F6FC]" />
               </div>
            </div>
          </motion.div>

          {/* Feature 4: DEAD MAN'S SWITCH (Large = span 3, row 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3 bg-[#0D1117] border border-red-500/20 hover:border-red-500/40 rounded-3xl p-8 flex flex-col md:flex-row items-center relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.08)]"
          >
            <div className="flex-1 z-10 w-full mb-6 md:mb-0 pr-0 md:pr-8">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest w-fit mb-5 bg-red-500/20 text-red-300">
                LIVE AT LAUNCH
              </div>
              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-2 uppercase tracking-wide">
                Dead Man's Switch
              </h3>
              <p className="text-[#8B949E] text-base leading-relaxed">
                Smart activity detection. Your vault self-activates exactly when your family needs it.
              </p>
            </div>
            
            {/* Visual: Timeline bar with pulse animation */}
            <div className="flex-1 w-full flex flex-col items-center justify-center px-4">
               <div className="w-full flex items-center justify-between text-xs text-[#8B949E] font-bold uppercase mb-3 px-1">
                 <span>Active</span>
                 <span className="text-red-400 animate-pulse">Inactive</span>
                 <span>Transfer</span>
               </div>
               <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative">
                 <motion.div 
                   className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-500 max-w-[66%] min-w-[33%]"
                   animate={{ width: ['33%', '66%', '100%'], backgroundColor: ['#4F5CFF', '#EF4444', '#D4AF37'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 />
                 <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_20%,rgba(255,255,255,0.1)_50%,transparent_80%)] animate-[shimmer_2s_infinite]" />
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
