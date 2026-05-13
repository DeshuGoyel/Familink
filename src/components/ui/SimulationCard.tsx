import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SimulationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function SimulationCard({ 
  title, 
  description, 
  icon, 
  children, 
  className 
}: SimulationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-base bg-surface/50 backdrop-blur-xl p-8 lg:p-12",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-8 text-brand-primary/10">
        {React.cloneElement(icon as React.ReactElement, { size: 120, strokeWidth: 0.5 })}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary">{title}</h3>
            <p className="text-muted text-sm">{description}</p>
          </div>
        </div>

        <div className="bg-page/50 rounded-2xl border border-base p-6 lg:p-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
