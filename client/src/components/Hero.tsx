import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { scrollToElement } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TypingAnimation from "./TypingAnimation";

const Hero = () => {
  // Array of typing phrases to rotate through
  const typingPhrases = [
    "Excellence in Education for Over 60 Years",
    "Nurturing Future Leaders Since 1964",
    "A Premier Educational Institution in Sri Lanka",
    "Where Knowledge Meets Character Building",
    "Inspiring Excellence, Empowering Minds"
  ];
  
  // Array of school images to rotate through
  const schoolImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  ];
  
  // State for current image and typing phrase
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Effect to rotate images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % schoolImages.length);
    }, 5000);
    
    return () => clearInterval(imageInterval);
  }, []);
  
  // Effect to handle typing animation completion and rotation
  useEffect(() => {
    if (typingComplete) {
      const phraseTimeout = setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % typingPhrases.length);
        setTypingComplete(false);
      }, 3000); // Wait 3 seconds after typing is complete before changing phrase
      
      return () => clearTimeout(phraseTimeout);
    }
  }, [typingComplete]);
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent"></div>
      </div>
      
      {/* Animated background blobs */}
      <motion.div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 dark:bg-primary/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          easings: ["easeInOut"],
        }}
      />
      
      <motion.div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 dark:bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          easings: ["easeInOut"],
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/20 dark:bg-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          easings: ["easeInOut"],
        }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-bold mb-4 text-slate-800 dark:text-white leading-tight">
              <span className="text-primary">Homagama</span> Maha<br />
              Vidyalaya
            </h1>
            
            <div className="text-xl sm:text-2xl mb-6 text-slate-600 dark:text-slate-300 h-16">
              <TypingAnimation
                text={typingPhrases[currentPhraseIndex]}
                speed={80}
                delay={1000}
                onComplete={() => setTypingComplete(true)}
              />
            </div>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-300">
              Nurturing minds, building character, and fostering a community of lifelong learners in a supportive and innovative educational environment.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="rounded-full font-medium px-8 py-6"
                onClick={() => scrollToElement("about")}
              >
                Discover More
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full font-medium px-8 py-6"
                onClick={() => scrollToElement("contact")}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
          
          {/* Image/3D content */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Main circular image with border glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
              <div className="absolute inset-[3px] rounded-full overflow-hidden japanese-box bg-slate-100 dark:bg-slate-800">
                {schoolImages.map((img, index) => (
                  <motion.img 
                    key={index}
                    src={img}
                    alt={`Homagama Maha Vidyalaya School - View ${index + 1}`} 
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: currentImageIndex === index ? 1 : 0 
                    }}
                    transition={{ duration: 1 }}
                  />
                ))}
                
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 mix-blend-overlay"></div>
              </div>
              
              {/* Floating info cards */}
              <motion.div 
                className="absolute -right-4 top-8 glass px-4 py-3 rounded-lg japanese-box"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-blue-500 text-white">
                    <i className="fas fa-medal"></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">Top Rated</h3>
                    <p className="text-xs opacity-80">Excellence in education</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-4 bottom-8 glass px-4 py-3 rounded-lg japanese-box"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-purple-500 text-white">
                    <i className="fas fa-graduation-cap"></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">Since 1964</h3>
                    <p className="text-xs opacity-80">Trusted legacy</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative floating elements */}
              <motion.div 
                className="w-8 h-8 absolute top-1/4 -right-12 rounded-full bg-yellow-400"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="w-6 h-6 absolute bottom-1/4 -left-10 rounded-md bg-emerald-400"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Removed Scroll indicator as requested */}
      </div>
    </section>
  );
};

export default Hero;