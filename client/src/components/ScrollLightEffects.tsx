import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface ScrollLightEffectsProps {
  children: React.ReactNode;
  intensity?: number;
  lightColor?: string;
  shadowColor?: string;
  lightCount?: number;
  interactive?: boolean;
  className?: string;
}

const ScrollLightEffects: React.FC<ScrollLightEffectsProps> = ({
  children,
  intensity = 1,
  lightColor = 'rgba(255, 255, 255, 0.7)',
  shadowColor = 'rgba(0, 0, 0, 0.2)',
  lightCount = 3,
  interactive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovering, setHovering] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Calculate dimensions for positioning lights
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse movements for interactive lighting
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Generate random positions for lights
  const lightPositions = Array.from({ length: lightCount }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 2,
  }));

  // Scroll-based transformations
  const scrollRotate = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, intensity * 45]
  );
  
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  // Smooth transformations
  const springScrollRotate = useSpring(scrollRotate, {
    stiffness: 400,
    damping: 90
  });

  // Interactive light animation
  const generateLightStyle = (index: number) => {
    if (interactive && hovering) {
      // When hovering, position based on mouse
      return {
        left: `calc(${mouseX.get() / dimensions.width * 100}% - ${lightPositions[index].size / 2}px)`,
        top: `calc(${mouseY.get() / dimensions.height * 100}% - ${lightPositions[index].size / 2}px)`,
        width: `${lightPositions[index].size * 2}px`,
        height: `${lightPositions[index].size * 2}px`,
        opacity: 0.8,
        filter: `blur(${lightPositions[index].size}px)`,
        transition: 'left 0.1s, top 0.1s'
      };
    } else {
      // When not hovering, animate based on scroll
      return {
        left: `${lightPositions[index].x}%`,
        top: `${lightPositions[index].y}%`,
        width: `${lightPositions[index].size * 1.5}px`,
        height: `${lightPositions[index].size * 1.5}px`,
        opacity: 0.6,
        filter: `blur(${lightPositions[index].size / 2}px)`,
        transition: 'left 2s, top 2s, width 1s, height 1s, opacity 1s'
      };
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        boxShadow: `0 10px 30px ${shadowColor}`
      }}
      whileInView={{
        boxShadow: `0 15px 45px ${shadowColor}`
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Light effects */}
      {lightPositions.map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full pointer-events-none"
          style={{
            background: lightColor,
            ...generateLightStyle(index),
            zIndex: 1
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 5 + lightPositions[index].delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Interactive light beam */}
      {interactive && (
        <motion.div 
          className="absolute w-full h-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, ${lightColor} 0%, transparent 70%)`,
            opacity: hovering ? 0.4 : 0,
            zIndex: 2
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Subtle shadow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${shadowColor})`,
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.5]),
          zIndex: 3
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10"
        style={{
          rotateX: useTransform(scrollYProgress, [0, 1], [-intensity * 3, intensity * 3]),
          rotateY: springScrollRotate,
          opacity: scrollOpacity,
        }}
      >
        {children}
      </motion.div>

      {/* Highlight at top when scrolling */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-[2px] origin-left"
        style={{
          background: `linear-gradient(to right, transparent, ${lightColor}, transparent)`,
          scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
          zIndex: 4
        }}
      />
    </motion.div>
  );
};

export default ScrollLightEffects;