import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const addZero = (num: number) => num < 10 ? `0${num}` : num;

  if (+new Date(targetDate) - +new Date() <= 0) return null;

  return (
    <div className="flex gap-2 sm:gap-4 justify-center items-center">
      <TimeUnit value={addZero(timeLeft.days)} label="Days" />
      <span className="text-xl sm:text-2xl font-bold text-muted pb-6">:</span>
      <TimeUnit value={addZero(timeLeft.hours)} label="Hours" />
      <span className="text-xl sm:text-2xl font-bold text-muted pb-6">:</span>
      <TimeUnit value={addZero(timeLeft.minutes)} label="Minutes" />
      <span className="text-xl sm:text-2xl font-bold text-muted pb-6">:</span>
      <TimeUnit value={addZero(timeLeft.seconds)} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: string | number, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-surface border border-border/50 text-text font-display text-2xl sm:text-3xl font-bold w-12 sm:w-16 h-16 sm:h-20 flex items-center justify-center rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {value}
      </div>
      <span className="text-xs text-muted mt-2 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}
