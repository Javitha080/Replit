import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VicePrincipal from "@/components/VicePrincipal";
import Features from "@/components/Features";
import News from "@/components/News";
import SchoolGallery from "@/components/SchoolGallery";
import Contact from "@/components/Contact";
import Map from "@/components/Map";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ThreeBackground from "@/components/ThreeBackground";
import WelcomeScreen from "@/components/WelcomeScreen";
import AnimatedCounter from "@/components/AnimatedCounter";
import AnimatedCursor from "@/components/AnimatedCursor";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxHighlights from "@/components/ParallaxHighlights";
import SchoolPrograms from "@/components/SchoolPrograms";
import SkeletonLoader, { HeroSkeleton, FeaturesSkeleton, StatsSkeleton, CardGridSkeleton } from "@/components/SkeletonLoader";

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const exploreRef = useRef<HTMLDivElement>(null);
  
  // Track page load speed
  const startLoadTime = useRef(Date.now());
  
  // Monitor resources loading performance
  useEffect(() => {
    // Start the profiler for performance monitoring
    if (window.performance && window.performance.mark) {
      window.performance.mark('start-rendering');
    }
    
    // Set title
    document.title = "Homagama Maha Vidyalaya";
    
    // Handle body overflow based on welcome screen state
    if (showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      
      // Simulate resource loading after welcome screen disappears
      const loadTimer = setTimeout(() => {
        setIsLoading(false);
        setContentLoaded(true);
        
        // Track performance metrics
        if (window.performance && window.performance.mark) {
          window.performance.mark('end-rendering');
          window.performance.measure('rendering-duration', 'start-rendering', 'end-rendering');
          const loadTime = Date.now() - startLoadTime.current;
          console.log(`Page loaded and rendered in ${loadTime}ms`);
        }
      }, 1500); // Show the loading animation briefly
      
      return () => clearTimeout(loadTimer);
    }
  }, [showWelcome]);
  
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };
  
  // Scroll to content handler
  // Function to scroll to content
  const scrollToContent = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ 
        behavior: 'smooth'
      });
    }
  };
  
  // Updated to use bottom instead of content
  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    });
  };
  
  // Quick stats displayed in the center of page
  const QuickStats = () => {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 dark:from-indigo-700/90 dark:to-purple-700/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-poppins font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              School at a Glance
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-white/50 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10 japanese-box">
              <AnimatedCounter
                end={2500}
                duration={2.5}
                delay={0.2}
                suffix="+"
                className="text-4xl md:text-5xl font-poppins font-bold mb-2"
              />
              <h3 className="text-xl font-medium mb-1">Students</h3>
              <p className="text-sm text-blue-100">Currently Enrolled</p>
            </div>
            
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10 japanese-box">
              <AnimatedCounter
                end={150}
                duration={2}
                delay={0.4}
                suffix="+"
                className="text-4xl md:text-5xl font-poppins font-bold mb-2"
              />
              <h3 className="text-xl font-medium mb-1">Educators</h3>
              <p className="text-sm text-blue-100">Qualified Teachers</p>
            </div>
            
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10 japanese-box">
              <AnimatedCounter
                end={60}
                duration={1.5}
                delay={0.6}
                suffix="+"
                className="text-4xl md:text-5xl font-poppins font-bold mb-2"
              />
              <h3 className="text-xl font-medium mb-1">Years</h3>
              <p className="text-sm text-blue-100">Of Excellence</p>
            </div>
            
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10 japanese-box">
              <AnimatedCounter
                end={98}
                duration={2}
                delay={0.8}
                suffix="%"
                className="text-4xl md:text-5xl font-poppins font-bold mb-2"
              />
              <h3 className="text-xl font-medium mb-1">Success Rate</h3>
              <p className="text-sm text-blue-100">In Final Examinations</p>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                rotate: [0, Math.random() * 180, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>
    );
  };
  
  // Scroll to bottom component
  const ScrollToBottom = () => {
    return (
      <motion.div 
        className="fixed bottom-24 right-8 flex flex-col items-center z-40 cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="text-red-500 dark:text-yellow-400"
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <i className="fas fa-chevron-down"></i>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };
  
  return (
    <>
      <WelcomeScreen onComplete={handleWelcomeComplete} />
      
      <AnimatePresence>
        {!showWelcome && (
          <motion.div 
            className="bg-slate-50 text-slate-800 dark:bg-dark-200 dark:text-slate-100 font-inter transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedCursor />
            <ThreeBackground />
            <Header />
            
            {isLoading ? (
              // Loading state - show skeleton loaders
              <motion.div
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Loading Experience</h2>
                    <p className="text-slate-600 dark:text-slate-400">Preparing immersive content...</p>
                  </div>
                </div>
                <HeroSkeleton />
                <FeaturesSkeleton />
                <StatsSkeleton />
                <CardGridSkeleton />
              </motion.div>
            ) : (
              // Content loaded
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div ref={exploreRef} className="relative">
                  <Hero />
                </div>
                
                <ScrollReveal animation="slideUp">
                  <About />
                </ScrollReveal>
                
                <ScrollReveal animation="fadeIn">
                  <QuickStats />
                </ScrollReveal>
                
                <ScrollReveal animation="slideLeft">
                  <VicePrincipal />
                </ScrollReveal>
                
                <ScrollReveal animation="slideRight">
                  <Features />
                </ScrollReveal>
                
                <ScrollReveal animation="slideUp" threshold={0.2}>
                  <SchoolPrograms />
                </ScrollReveal>
                
                <ScrollReveal animation="fadeIn" threshold={0.3}>
                  <ParallaxHighlights />
                </ScrollReveal>
                
                <ScrollReveal animation="slideLeft">
                  <News />
                </ScrollReveal>
                
                <ScrollReveal animation="slideUp" threshold={0.1}>
                  <SchoolGallery />
                </ScrollReveal>
                
                <ScrollReveal animation="slideUp">
                  <Contact />
                </ScrollReveal>
                
                <ScrollReveal animation="fadeIn">
                  <Map />
                </ScrollReveal>
                
                <Footer />
                <BackToTop />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
