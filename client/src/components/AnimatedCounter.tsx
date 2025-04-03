import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Delay the counter animation if needed
      const delayTimer = setTimeout(() => {
        let start = 0;
        const step = end / (duration * 60); // 60fps approx
        
        const timer = setInterval(() => {
          start += step;
          setCount(Math.min(Math.floor(start), end));
          
          if (start >= end) {
            clearInterval(timer);
          }
        }, 1000 / 60);
        
        return () => clearInterval(timer);
      }, delay * 1000);
      
      return () => clearTimeout(delayTimer);
    }
  }, [isInView, end, duration, delay, hasAnimated]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.span 
        className="inline-block"
        animate={hasAnimated ? { 
          scale: [1, 1.2, 1],
          textShadow: [
            '0 0 0px rgba(255,255,255,0)',
            '0 0 8px rgba(255,255,255,0.5)',
            '0 0 0px rgba(255,255,255,0)'
          ]
        } : {}}
        transition={{ duration: 0.4, delay: duration }}
      >
        {prefix}{count}{suffix}
      </motion.span>
    </motion.div>
  );
};

export default AnimatedCounter;