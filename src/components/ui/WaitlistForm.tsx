import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { waitlistSchema, WaitlistFormData } from '../../lib/validations';
import Button from './Button';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { Lock, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);
  const rotateX = useTransform(mouseY, [0, 400], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 400], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(200);
    mouseY.set(200);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#4F5CFF', '#ffffff']
    });
  };

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setPosition(result.position);
      setIsSuccess(true);
      triggerConfetti();
      
      if (result.isNew) {
        toast.success('Successfully joined waitlist!');
      } else {
        toast('You are already on the list!', { icon: '👋' });
      }

    } catch (error: any) {
      console.error('Waitlist error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full max-w-md mx-auto relative z-10">
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full"
      >
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transform: "translateZ(30px)" }}
            className="bg-primary/20 border border-primary/40 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(79,92,255,0.3)] backdrop-blur-md"
          >
            <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
               <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white font-display mb-2">You're on the list!</h3>
            <p className="text-[#8B949E] mb-6 text-lg">
              Status: <strong className="text-gold text-xl">#{position?.toLocaleString()}</strong>
            </p>
            <div className="text-sm text-[#8B949E]">
              We'll email you when beta access opens.
            </div>
          </motion.div>
        ) : (
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            style={{ transform: "translateZ(30px)" }}
            className="w-full bg-[#0D1117]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] group relative overflow-hidden"
          >
            <motion.div 
              animate={{ opacity: isFocused ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none transition-opacity duration-300"
            />
            
            <div className="flex flex-col gap-5 relative z-10">
              <div className="relative">
                <motion.input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email address"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{ transform: "translateZ(20px)" }}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full bg-black/60 border border-white/10 focus:border-indigo-500 rounded-xl px-5 py-4 text-white placeholder-[#8B949E] outline-none transition-all focus:shadow-[0_0_20px_rgba(79,92,255,0.4)] block"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-red-400 text-sm pl-2 mt-2 font-medium"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 text-lg font-bold bg-gold hover:bg-[#ebc449] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-90' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Securing Spot...
                  </>
                ) : (
                  <>
                    <Lock size={18} className="opacity-80" />
                    Claim Your Spot
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-3 relative z-10">
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#8B949E] uppercase tracking-wider">
                <div className="flex items-center gap-1.5 border border-white/10 bg-white/5 rounded-full px-2.5 py-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  AES-256 Encrypted
                </div>
                <div className="flex items-center gap-1.5 border border-white/10 bg-white/5 rounded-full px-2.5 py-1">
                  <Lock size={12} className="text-indigo-400" />
                  Zero-Knowledge
                </div>
              </div>
              <p className="text-xs text-[#8B949E] text-center">
                Zero spam. Cancel anytime. Join 2,400+ protected families.
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
