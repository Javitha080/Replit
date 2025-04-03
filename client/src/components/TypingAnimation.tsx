import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const TypingAnimation = ({ text, speed = 100, delay = 1000, onComplete }: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    if (isWaiting) return;
    
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting && currentIndex === text.length) {
      // When we've typed out the full text, call onComplete if provided
      if (onComplete) {
        onComplete();
      }
      
      // Wait before starting to delete
      setIsWaiting(true);
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(false); // Don't delete, just wait for next phrase
      }, delay);
    } else if (isDeleting && currentIndex === 0) {
      // When we've deleted all text, wait before starting to type again
      setIsWaiting(true);
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(false);
      }, delay);
    } else {
      // Normal typing or deleting
      timeout = setTimeout(() => {
        if (!isDeleting) {
          // Typing forward
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Deleting backward
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }
      }, isDeleting ? speed / 2 : speed); // Deleting is faster than typing
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, isWaiting, text, speed, delay, onComplete]);
  
  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-blink h-full ml-1 inline-block w-1 bg-current"></span>
    </span>
  );
};

export default TypingAnimation;