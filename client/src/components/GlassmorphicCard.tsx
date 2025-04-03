import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: ReactNode;
  variant?: 'default' | 'vibrant' | 'subtle';
  className?: string;
  glowColor?: string;
  hoverEffect?: boolean;
  borderWidth?: number;
  blurStrength?: number;
}

const GlassmorphicCard = ({
  children,
  variant = 'default',
  className,
  glowColor = 'rgba(59, 130, 246, 0.5)',
  hoverEffect = true,
  borderWidth = 1,
  blurStrength = 12
}: GlassmorphicCardProps) => {
  // Base styles
  const baseStyles = 'relative overflow-hidden rounded-2xl';
  
  // Border styles
  const borderStyles = `border-[${borderWidth}px]`;
  
  // Variant styles
  const variantStyles = {
    default: `bg-white/15 backdrop-blur-[${blurStrength}px] border-white/20 shadow-lg`,
    vibrant: `bg-white/20 backdrop-blur-[${blurStrength}px] border-white/30 shadow-xl`,
    subtle: `bg-white/10 backdrop-blur-[${blurStrength}px] border-white/10 shadow-md`
  };
  
  // Dark mode styles
  const darkStyles = {
    default: 'dark:bg-slate-900/40 dark:border-slate-700/30',
    vibrant: 'dark:bg-slate-900/50 dark:border-indigo-500/20',
    subtle: 'dark:bg-slate-900/30 dark:border-slate-800/20'
  };
  
  // Hover effect styles
  const hoverStyles = hoverEffect 
    ? 'transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]' 
    : '';
  
  // Glow effect
  const glowStyles = `before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-br before:from-transparent before:to-[${glowColor}] before:blur-xl before:z-[-1] hover:before:opacity-30`;

  return (
    <div 
      className={cn(
        baseStyles,
        borderStyles,
        variantStyles[variant],
        darkStyles[variant],
        hoverEffect && hoverStyles,
        hoverEffect && glowStyles,
        className
      )}
      style={{ 
        '--glow-color': glowColor 
      } as React.CSSProperties}
    >
      {/* Inner content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle grain effect overlay */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default GlassmorphicCard;