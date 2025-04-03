import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
  };
  animation?: 'fadeIn' | 'slideUp' | 'slideRight' | 'slideLeft' | 'zoom' | 'flip';
  once?: boolean;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.2,
  animation = 'fadeIn',
  once = true,
  transition = { duration: 0.8 },
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Define animations
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 }
    },
    flip: {
      initial: { opacity: 0, rotateX: 80 },
      animate: { opacity: 1, rotateX: 0 }
    }
  };
  
  const selectedAnimation = animations[animation];
  
  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;