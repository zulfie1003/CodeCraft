import React from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  glow?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  glow = true,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-black",
    secondary: "bg-secondary/10 text-secondary border border-secondary hover:bg-secondary hover:text-white",
    outline: "bg-transparent text-foreground border border-white/20 hover:border-primary hover:text-primary",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg",
    icon: "p-2"
  };

  const glowStyles = glow ? {
    primary: "hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]",
    secondary: "hover:shadow-[0_0_20px_rgba(188,19,254,0.5)]",
    outline: "",
    ghost: ""
  } : {};

  return (
    <button 
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size],
        glow && glowStyles[variant as keyof typeof glowStyles],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default NeonButton;
