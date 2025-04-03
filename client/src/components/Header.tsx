import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import schoolLogo from '@assets/1000160383-removebg-preview.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const headerBorderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state for basic styling
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Calculate scroll progress for advanced styling
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Dynamic styles based on scroll position
  const getHeaderStyle = () => {
    return {
      backgroundColor: isScrolled 
        ? theme === 'dark' 
          ? `rgba(17, 17, 25, ${Math.min(scrollProgress * 0.85 + 0.15, 0.85)})` 
          : `rgba(255, 255, 255, ${Math.min(scrollProgress * 0.85 + 0.15, 0.85)})`
        : 'transparent',
      backdropFilter: isScrolled ? `blur(${Math.min(scrollProgress * 10, 8)}px)` : 'none',
      boxShadow: isScrolled ? `0 4px 30px rgba(0, 0, 0, ${Math.min(scrollProgress * 0.1, 0.1)})` : 'none',
      borderBottom: isScrolled 
        ? theme === 'dark' 
          ? `1px solid rgba(255, 255, 255, ${Math.min(scrollProgress * 0.08, 0.08)})` 
          : `1px solid rgba(0, 0, 0, ${Math.min(scrollProgress * 0.08, 0.08)})`
        : 'none',
      transition: 'all 0.3s ease'
    };
  };

  return (
    <header 
      ref={headerRef}
      className="fixed w-full top-0 z-50 transition-all duration-300"
      style={getHeaderStyle()}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-2 border-red-500/30 bg-white/90 dark:bg-slate-900/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={schoolLogo} 
              alt="School Logo" 
              className="w-16 h-16 object-contain"
              style={{ transform: 'translateY(-1px)' }} // Fine-tune vertical alignment
            />
          </motion.div>
          <div className="hidden md:block">
            <motion.h1 
              className="text-lg md:text-xl font-poppins font-bold text-slate-800 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              H.M.V. - Homagama Maha Vidyalaya
            </motion.h1>
            <motion.p 
              className="text-xs text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Excellence in Education Since 1962
            </motion.p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center neo-glass bg-white/80 dark:bg-slate-800/80 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {theme === 'dark' ? (
              <i className="fas fa-moon text-yellow-400"></i>
            ) : (
              <i className="fas fa-sun text-red-500"></i>
            )}
          </motion.button>
          
          <nav className="hidden md:block">
            <motion.ul 
              className="flex space-x-6 font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, staggerChildren: 0.1 }}
            >
              {[
                { href: "#", label: "Home", active: true },
                { href: "#about", label: "About" },
                { href: "#news", label: "News" },
                { href: "#gallery", label: "Gallery" },
                { href: "#contact", label: "Contact" }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <a 
                    href={item.href} 
                    className={cn(
                      "block py-1 px-2 hover:text-red-500 dark:hover:text-yellow-500 transition-colors duration-200 relative",
                      item.active ? "text-red-500 dark:text-yellow-400 font-medium" : "text-slate-800 dark:text-slate-200"
                    )}
                  >
                    {item.label}
                    {item.active && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 dark:bg-yellow-500 rounded-full"
                        layoutId="navIndicator"
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          
          <motion.button 
            id="mobile-menu-btn" 
            className="md:hidden w-10 h-10 relative focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className={cn(
                "block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out",
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              )}></span>
              <span className={cn(
                "block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out",
                isOpen ? "opacity-0" : ""
              )}></span>
              <span className={cn(
                "block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out",
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              )}></span>
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu with glassmorphic floating card */}
      <motion.div 
        id="mobile-menu" 
        className={cn(
          "md:hidden absolute right-4 top-[calc(100%+10px)] w-[calc(100%-2rem)] rounded-xl neo-glass",
          "overflow-hidden shadow-lg border border-white/10 dark:border-white/5 transform origin-top",
        )}
        initial={{ opacity: 0, scaleY: 0, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          scaleY: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))' 
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.95))',
          backdropFilter: 'blur(10px)',
          display: isOpen ? 'block' : 'none' // Ensures it's not focusable when hidden
        }}
      >
        <ul className="py-2">
          {[
            { href: "#", label: "Home", icon: "fa-home" },
            { href: "#about", label: "About", icon: "fa-info-circle" },
            { href: "#news", label: "News", icon: "fa-newspaper" },
            { href: "#gallery", label: "Gallery", icon: "fa-images" },
            { href: "#contact", label: "Contact", icon: "fa-envelope" }
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + (index * 0.05) }}
              className="border-b border-slate-100 dark:border-slate-800/50 last:border-0"
            >
              <a 
                href={item.href} 
                onClick={() => setIsOpen(false)} 
                className="flex items-center py-3 px-4 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
              >
                <i className={`fas ${item.icon} w-5 text-red-500 dark:text-yellow-500`}></i>
                <span className="ml-3">{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
        
        {/* School colors gradient at the bottom */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"></div>
      </motion.div>
    </header>
  );
};

export default Header;
