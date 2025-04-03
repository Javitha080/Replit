import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import schoolLogo from '@assets/1000160383-removebg-preview.png'; // Using transparent school logo

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const animationControls = useAnimation();
  const mouseRef = useRef({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Welcome screen content
  const screens = [
    {
      title: "Welcome to",
      subtitle: "H.M.V.",
      description: "Homagama Maha Vidyalaya - A center of educational excellence since 1962"
    },
    {
      title: "Our Mission",
      subtitle: "Excellence in Education",
      description: "Nurturing minds, building character, shaping futures"
    },
    {
      title: "Discover",
      subtitle: "Our School",
      description: "Explore our programs, facilities, and achievements"
    }
  ];

  // Start intro animation immediately
  useEffect(() => {
    // Start background animation
    animationControls.start({
      scale: [1, 1.02, 1],
      filter: ['brightness(0.9)', 'brightness(1.1)', 'brightness(1)'],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
    });
    
    // Handle mouse movement for interactive light effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animationControls]);
  
  // Auto advance through screens with smooth timing
  useEffect(() => {
    if (currentScreen < screens.length - 1) {
      const timer = setTimeout(() => {
        setCurrentScreen(prev => prev + 1);
      }, 6000); // Longer display time for better readability
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen, screens.length]);
  
  // Auto-complete welcome screen after all screens are shown
  useEffect(() => {
    if (currentScreen === screens.length - 1) {
      // After showing the last screen for a certain time, auto-complete
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800);
      }, 12000); // 12 seconds on last screen then auto-complete
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen, screens.length, onComplete]);
  
  // Handle skip button click
  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800);
  };

  // Text reveal variants for letter animations with smoother timing
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.025, // Faster timing for more natural flow
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    })
  };
  
  // Improved animated text with optimized rendering
  const AnimatedText = ({ text, className }: { text: string, className: string }) => {
    // For longer text, animate words instead of individual characters for better performance
    const shouldAnimateByWord = text.length > 25;
    
    if (shouldAnimateByWord) {
      const words = text.split(' ');
      return (
        <div className={className}>
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              custom={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }
                })
              }}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
      );
    }
    
    // For shorter text, animate each character for more detailed effect
    return (
      <div className={className}>
        {Array.from(text).map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Advanced gradient background with noise and depth effect */}
          <motion.div 
            className="absolute inset-0 bg-noise"
            animate={animationControls}
          >
            {/* Base gradient layer with school colors - dark red and golden yellow theme */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at ${mouseRef.current.x * 100}% ${mouseRef.current.y * 100}%, 
                  rgba(31, 31, 31, 0.9) 0%,
                  rgba(20, 20, 20, 0.95) 40%,
                  rgba(10, 10, 10, 1) 70%)`
              }}
            />
            
            {/* Advanced interactive illumination based on school colors (red and yellow) */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at ${mouseRef.current.x * 100}% ${mouseRef.current.y * 100}%, 
                  rgba(225, 29, 72, 0.3) 0%, 
                  rgba(220, 38, 38, 0.2) 20%, 
                  rgba(245, 158, 11, 0.15) 40%, 
                  rgba(252, 211, 77, 0.1) 60%, 
                  rgba(0, 0, 0, 0) 80%)`
              }}
            />
            
            {/* Cinematic light rays in school colors (red and yellow) */}
            <div className="absolute inset-0 overflow-hidden opacity-70">
              {[...Array(15)].map((_, i) => {
                // Alternate between red and yellow colors for rays
                const isRed = i % 2 === 0;
                const rayColor = isRed ? "via-red-400/60" : "via-yellow-300/60";
                
                return (
                  <motion.div
                    key={i}
                    className={`absolute h-px bg-gradient-to-r from-transparent ${rayColor} to-transparent`}
                    style={{
                      width: `${Math.random() * 40 + 30}%`,
                      left: `${Math.random() * 70}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: 0,
                      rotate: Math.random() * 45 - 22.5,
                      height: `${Math.random() * 2 + 1}px`,
                      filter: 'blur(1px)',
                    }}
                    animate={{
                      opacity: [0, 0.7, 0],
                      x: ['-100%', '200%'],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: Math.random() * 8 + 12,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
            
            {/* Dynamic light spots in school colors (red and yellow) */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => {
                // Alternate between red and yellow colors for light spots
                const isRed = i % 2 === 0;
                const r = isRed ? 225 : 234; // Red or yellow R value
                const g = isRed ? 29 : 179;  // Red or yellow G value
                const b = isRed ? 72 : 8;    // Red or yellow B value
                
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full blur-3xl"
                    style={{
                      width: `${100 + i * 70}px`,
                      height: `${100 + i * 70}px`,
                      background: `rgba(${r}, ${g}, ${b}, ${0.15 - i * 0.02})`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      left: `calc(${mouseRef.current.x * 100}% + ${Math.sin(Date.now() * 0.001 + i) * 30}px)`,
                      top: `calc(${mouseRef.current.y * 100}% + ${Math.cos(Date.now() * 0.001 + i) * 30}px)`,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  />
                );
              })}
            </div>
            
            {/* Improved floating particles with school colors */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(40)].map((_, i) => {
                const size = Math.random() * 6 + 1;
                const depth = Math.random();
                
                // Random selection of school colors (red/yellow) with slight variations
                const isRed = Math.random() > 0.5;
                const r = isRed ? Math.random() * 30 + 220 : Math.random() * 20 + 230; // Red or yellow R value
                const g = isRed ? Math.random() * 30 + 20 : Math.random() * 50 + 170;  // Red or yellow G value
                const b = isRed ? Math.random() * 30 + 40 : Math.random() * 20;        // Red or yellow B value
                
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.6 + 0.2})`,
                      filter: `blur(${Math.random() * 1.5}px)`,
                      zIndex: Math.floor(depth * 10),
                    }}
                    animate={{
                      y: [0, Math.random() * -400 - 100],
                      x: [0, (Math.random() * 200 - 100) * depth],
                      opacity: [0, 0.8, 0],
                      scale: [1, Math.random() * 0.5 + 0.8],
                    }}
                    transition={{
                      duration: Math.random() * 20 + 15,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
            
            {/* Advanced noise overlay for texture */}
            <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none bg-noise"></div>
          </motion.div>
          
          {/* School logo and name - completely redesigned for proper alignment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-[20%] left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs md:max-w-sm"
          >
            <div className="flex flex-col items-center justify-center">
              {/* Logo with glowing effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mb-3"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
                  <img 
                    src={schoolLogo} 
                    alt="Homagama Maha Vidyalaya" 
                    className="w-full h-full object-contain filter brightness-110 drop-shadow-lg"
                  />
                  
                  {/* Animated glow effect with school colors */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 15px 2px rgba(225, 29, 72, 0.3)',
                        '0 0 30px 8px rgba(234, 179, 8, 0.5)',
                        '0 0 15px 2px rgba(225, 29, 72, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
              
              {/* School name with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-white font-bold tracking-wider text-lg md:text-xl mb-1">
                  H.M.V. - HOMAGAMA MAHA VIDYALAYA
                </h2>
                <div className="h-0.5 w-28 md:w-36 mx-auto bg-gradient-to-r from-yellow-300/50 via-red-500/70 to-yellow-300/50 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content screens positioned below school logo */}
          <div ref={contentRef} className="w-full max-w-4xl px-4 z-10 relative mt-52 md:mt-64 lg:mt-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Title text with enhanced glow effect using school colors */}
                <motion.h2 
                  className="text-xl md:text-2xl text-yellow-200 mb-3 tracking-wide drop-shadow-lg"
                  initial={{ opacity: 0, textShadow: "0 0 0px rgba(254, 240, 138, 0)" }}
                  animate={{ 
                    opacity: 1, 
                    textShadow: "0 0 10px rgba(254, 240, 138, 0.6)" 
                  }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {screens[currentScreen].title}
                </motion.h2>
                
                {/* Main heading with enhanced animation */}
                <motion.div 
                  className="relative mb-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white drop-shadow-md">
                    <AnimatedText 
                      text={screens[currentScreen].subtitle}
                      className="tracking-tight"
                    />
                  </h1>
                  
                  {/* Enhanced decorative underline with school colors */}
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 rounded-full mx-auto mt-4"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                      boxShadow: "0 0 10px rgba(225, 29, 72, 0.6)"
                    }}
                  />
                </motion.div>
                
                {/* Description text with school color tint */}
                <motion.p 
                  className="text-lg md:text-xl text-yellow-50 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {screens[currentScreen].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            
            {/* Enhanced progress indicators with school colors */}
            <div className="flex justify-center mt-16 space-x-3">
              {screens.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentScreen(index)}
                  className="relative h-2 rounded-full overflow-hidden focus:outline-none"
                  animate={{
                    width: index === currentScreen ? 40 : 20,
                    backgroundColor: index === currentScreen
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: index === currentScreen
                      ? ['0 0 5px 1px rgba(225, 29, 72, 0.5)', '0 0 8px 2px rgba(234, 179, 8, 0.6)', '0 0 5px 1px rgba(225, 29, 72, 0.5)']
                      : 'none'
                  }}
                  transition={{
                    duration: 0.3,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Enhanced skip button with school color glow effect */}
          <motion.button
            className="fixed bottom-8 right-8 text-yellow-100 hover:text-white text-sm md:text-base px-6 py-2.5 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg z-20"
            onClick={handleSkip}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 0 20px 5px rgba(225, 29, 72, 0.6)' 
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 0 10px 2px rgba(225, 29, 72, 0.3)'
            }}
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;