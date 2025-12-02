import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  gradient?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hoverEffect = false,
  gradient = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        hoverEffect && "hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,243,255,0.1)] hover:border-white/20",
        gradient && "bg-gradient-to-br from-white/5 to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
