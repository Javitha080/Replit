import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const rotate = useMotionValue(0);
  const y = useMotionValue(0);

  // Enhanced visibility detection with scroll percentage
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      // Make button visible after scrolling down 300px
      if (scrollTop > 300) {
        setIsVisible(true);
        // Update the rotation based on scroll percentage
        rotate.set(scrollPercentage * 360);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [rotate]);

  // Optimized smooth scroll with animation
  const scrollToTop = useCallback(() => {
    // Prevent multiple clicks during animation
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the button before scrolling
    y.set(0);
    const animation = { y: [-5, 0, -15] };
    
    // Use requestAnimationFrame for smoother animation
    let start: number | null = null;
    const duration = 800; // Animation duration in ms
    const initialPosition = window.pageYOffset;
    
    const animateScroll = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation (ease-out-cubic)
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      window.scrollTo({
        top: initialPosition * (1 - easedProgress),
        behavior: "auto" // We're manually animating, so use "auto"
      });
      
      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      } else {
        // Animation complete
        setTimeout(() => setIsAnimating(false), 300);
      }
    };
    
    window.requestAnimationFrame(animateScroll);
  }, [isAnimating, y]);

  // Button variants for enhanced animation
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.5, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      y: 20,
      transition: { duration: 0.3 } 
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0 0 15px 3px rgba(59, 130, 246, 0.4)"
    },
    tap: { scale: 0.9 }
  };

  // Arrow icon animation variants
  const arrowVariants = {
    initial: { y: 0 },
    hover: { 
      y: -3,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.6
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate={isAnimating ? { y: [-5, 0, -15, -100] } : "animate"}
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          style={{ y }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-indigo-500 dark:to-purple-600 text-white flex items-center justify-center shadow-lg z-50 neo-glass border border-white/10"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <motion.div 
            className="relative w-6 h-6 flex items-center justify-center"
            style={{ rotate }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.i 
              className="fas fa-arrow-up"
              variants={arrowVariants}
              initial="initial"
              whileHover="hover"
            />
          </motion.div>
          
          {/* Animated ring effect */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ 
              opacity: [0.6, 0.2, 0.6], 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
