import Card from './Card';
import { ReactNode, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: { value: number; label: string; positive: boolean };
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function StatCard({ title, value, icon, trend, prefix = '', suffix = '', className }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setDisplayValue(Math.round((value / steps) * currentStep));
        if (currentStep >= steps) {
          setDisplayValue(value);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <Card className={cn("flex flex-col space-y-4", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-muted font-medium">{title}</h3>
        <div className="p-2 bg-surface rounded-lg border border-border text-primary flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-text">
          {prefix}{displayValue}{suffix}
        </div>
        {trend && (
          <p className="mt-2 text-sm flex items-center space-x-1">
            <span className={trend.positive ? "text-accent" : "text-danger"}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted">{trend.label}</span>
          </p>
        )}
      </div>
    </Card>
  );
}
