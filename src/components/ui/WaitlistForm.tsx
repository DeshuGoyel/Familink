import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { waitlistSchema, WaitlistFormData } from '../../lib/validations';
import Button from './Button';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

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
        // Mock success if no supabase configured
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setPosition(Math.floor(Math.random() * 1000) + 2400);
          triggerConfetti();
        }, 1000);
        return;
      }

      // Check existing
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

      // Insert new and return the auto-incremented position
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

      // Send confirmation email via Resend
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

  if (isSuccess) {
    return (
      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(79,92,255,0.2)]">
        <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
           ✓
        </div>
        <h3 className="text-xl font-bold text-text mb-2">You're on the list!</h3>
        <p className="text-muted mb-4">
          Status: <strong className="text-gold">#{position?.toLocaleString()}</strong>
        </p>
        <div className="text-sm text-muted">
          We'll email you when beta access opens.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto relative group z-10">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-surface/50 border border-border focus:border-primary rounded-xl px-5 py-4 text-text placeholder-muted outline-none transition-all focus:shadow-[0_0_15px_rgba(79,92,255,0.3)] backdrop-blur-sm"
          />
          {errors.email && (
            <p className="text-danger text-sm absolute -bottom-6 left-2 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-4 text-lg font-bold bg-gold hover:bg-[#ebc449] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all ${isSubmitting ? 'opacity-70' : ''}`}
        >
          {isSubmitting ? 'Securing Spot...' : 'Claim Your Spot'}
        </Button>
      </div>
      <p className="text-xs text-muted mt-4 text-center">
        Zero spam. Cancel anytime. Join 2,400+ people already on the waitlist.
      </p>
    </form>
  );
}
