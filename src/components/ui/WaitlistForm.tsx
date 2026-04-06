import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { waitlistSchema, WaitlistFormData } from '../../lib/validations';
import Button from './Button';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  // 3D Tilt Logic
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
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setPosition(Math.floor(Math.random() * 1000) + 2400);
          triggerConfetti();
        }, 1000);
        return;
      }

      const { data: existing } = await supabase
        .from('waitlist')
        .select('position')
        .eq('email', data.email)
        .single();

      if (existing) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setPosition(existing.position);
        toast('You are already on the list!', { icon: '👋' });
        return;
      }

      const { data: insertedData, error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email: data.email }])
        .select('position')
        .single();

      if (insertError) throw insertError;

      const finalPosition = insertedData?.position || 1;
      setPosition(finalPosition);
      setIsSuccess(true);
      triggerConfetti();
      toast.success('Successfully joined waitlist!');

      const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
      if (resendApiKey && resendApiKey !== 'your_key') {
        const emailHtml = `
          <div style="font-family: sans-serif; color: #111;">
            <p>Hi,</p>
            <p>You're <strong>#${finalPosition}</strong> on the Transfer Legacy waitlist.</p>
            <p>We'll notify you the moment beta opens.</p>
            <p>Share your referral link to move up: <a href="https://transferlegacy.com?ref=${finalPosition}">https://transferlegacy.com?ref=${finalPosition}</a></p>
            <br/>
            <p>— The Transfer Legacy Team</p>
          </div>
        `;
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Transfer Legacy <waitlist@transferlegacy.com>',
            to: [data.email],
            subject: "You're on the Transfer Legacy waitlist 🔑",
            html: emailHtml
          })
        }).catch(err => console.error("Email send failed", err));
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
          <div 
            style={{ transform: "translateZ(30px)" }}
            className="bg-primary/20 border border-primary/40 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(79,92,255,0.3)] backdrop-blur-md"
          >
            <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
               ✓
            </div>
            <h3 className="text-2xl font-bold text-white font-display mb-2">You're on the list!</h3>
            <p className="text-[#8B949E] mb-6 text-lg">
              Status: <strong className="text-gold text-xl">#{position?.toLocaleString()}</strong>
            </p>
            <div className="text-sm text-[#8B949E]">
              We'll email you when beta access opens.
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            style={{ transform: "translateZ(30px)" }}
            className="w-full bg-[#0D1117]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex flex-col gap-5">
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email address"
                  style={{ transform: "translateZ(20px)" }}
                  className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 rounded-xl px-5 py-4 text-white placeholder-[#8B949E] outline-none transition-all focus:shadow-[0_0_20px_rgba(79,92,255,0.4)] block"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm absolute -bottom-6 left-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 text-lg font-bold bg-gold hover:bg-[#ebc449] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? 'Securing Spot...' : 'Claim Your Spot'}
              </Button>
            </div>
            <p className="text-xs text-[#8B949E] mt-6 text-center">
              Zero spam. Cancel anytime. Join 2,400+ people already on the waitlist.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
