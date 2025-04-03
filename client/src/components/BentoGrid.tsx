import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  delay?: number;
  className?: string;
  href?: string;
}

interface BentoGridProps {
  title?: string;
  subtitle?: string;
  items: BentoItemProps[];
  className?: string;
}

const BentoItem: React.FC<BentoItemProps> = ({
  title,
  description,
  icon,
  image,
  size = 'medium',
  color = '#4338ca',
  delay = 0,
  className,
  href
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Determine height based on size
  const heights = {
    small: 'h-60 md:h-80',
    medium: 'h-80 md:h-96',
    large: 'h-96 md:h-[500px]'
  };

  // Create a gradient with the provided color
  const gradient = `linear-gradient(to bottom right, ${color}15, ${color}30)`;

  const itemContent = (
    <motion.div
      className={cn(
        'group relative flex flex-col p-6 overflow-hidden rounded-3xl bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl',
        heights[size],
        className
      )}
      style={{ background: gradient }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: 0.1 + delay }}
      variants={variants}
    >
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30" 
        style={{ 
          background: `radial-gradient(circle at center, ${color}70 0%, transparent 70%)`,
          transform: 'translate(0%, 0%)' 
        }}
      />

      {/* Image */}
      {image && (
        <div 
          className="absolute inset-0 z-0 opacity-20 transition-opacity duration-500 group-hover:opacity-25"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {icon && <div className="text-3xl mb-4">{icon}</div>}
        
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-white">
          {title}
        </h3>
        
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto">
          <div 
            className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white"
          >
            Learn more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {itemContent}
      </a>
    );
  }

  return itemContent;
};

const BentoGrid: React.FC<BentoGridProps> = ({
  title,
  subtitle,
  items,
  className
}) => {
  // Determine the grid classes based on the number of items
  const getGridClass = () => {
    const count = items.length;
    
    if (count <= 3) return 'grid-cols-1 md:grid-cols-3';
    if (count === 4) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-3';
  };

  return (
    <section className={cn('py-20 px-4 md:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}
            
            {subtitle && (
              <motion.p 
                className="max-w-3xl mx-auto text-slate-600 dark:text-slate-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className={cn('grid gap-4 md:gap-8', getGridClass())}>
          {items.map((item, i) => {
            // Custom layout for more visual interest: first item is larger on larger screens if we have 5 or more items
            let customProps = {};
            
            if (items.length >= 5 && i === 0) {
              customProps = { className: 'md:col-span-2 md:row-span-2' };
            }
            
            return (
              <BentoItem 
                key={i} 
                {...item} 
                delay={i * 0.05} 
                {...customProps} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;