import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const endX = useRef(0);
  const endY = useRef(0);
  
  // Mouse move event
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      endX.current = e.clientX;
      endY.current = e.clientY;
      setHidden(false);
    };
    
    // Mouse down event
    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 500);
    };
    
    // Mouse leave event
    const handleMouseLeave = () => {
      setHidden(true);
    };
    
    // Mouse enter event
    const handleMouseEnter = () => {
      setHidden(false);
    };
    
    // Link hover events
    const handleLinkHoverStart = () => {
      setLinkHovered(true);
    };
    
    const handleLinkHoverEnd = () => {
      setLinkHovered(false);
    };
    
    // Check if device supports hover (non-touch device)
    const isHoverableDevice = window.matchMedia('(hover: hover)').matches;
    
    if (isHoverableDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      
      // Add event listeners to all links and buttons
      const links = document.querySelectorAll('a, button');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleLinkHoverStart);
        link.addEventListener('mouseleave', handleLinkHoverEnd);
      });
      
      // Animation frame for smooth cursor movement
      let requestId: number;
      let lastTimestamp = 0;
      
      const smoothCursorMovement = (timestamp: number) => {
        // Calculate delta time for smoother animation
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        // Skip large time gaps which can cause jumping
        if (delta > 100) {
          setPosition({ x: endX.current, y: endY.current });
          requestId = requestAnimationFrame(smoothCursorMovement);
          return;
        }
        
        // Simple linear interpolation for smooth movement
        const lerp = (start: number, end: number, factor: number) => {
          return start + (end - start) * factor;
        };
        
        // The lower the factor, the smoother but slower the movement
        const interpolationFactor = 0.2;
        
        setPosition((prev) => ({
          x: lerp(prev.x, endX.current, interpolationFactor),
          y: lerp(prev.y, endY.current, interpolationFactor)
        }));
        
        requestId = requestAnimationFrame(smoothCursorMovement);
      };
      
      requestId = requestAnimationFrame(smoothCursorMovement);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        
        links.forEach((link) => {
          link.removeEventListener('mouseenter', handleLinkHoverStart);
          link.removeEventListener('mouseleave', handleLinkHoverEnd);
        });
        
        cancelAnimationFrame(requestId);
      };
    } else {
      // Touch device - hide cursor completely
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
      return;
    }
  }, []);
  
  // Only render on non-touch devices
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;
  
  // Calculate styles based on state
  const cursorSize = linkHovered ? 32 : 12;
  const cursorOpacity = hidden ? 0 : 0.5;
  
  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
        scale: clicked ? 0.5 : 1,
        opacity: cursorOpacity
      }}
      transition={{
        scale: { type: 'spring', stiffness: 500, damping: 30 },
        opacity: { duration: 0.2 }
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: linkHovered ? cursorSize * 2 : cursorSize,
          height: linkHovered ? cursorSize * 2 : cursorSize
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default AnimatedCursor;