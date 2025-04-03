import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie-consent');
    
    if (!hasConsent) {
      // Wait a bit before showing the consent dialog to not interrupt the initial experience
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    onAccept();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    onDecline();
    setIsVisible(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-slate-800 shadow-lg border-t border-slate-200 dark:border-slate-700"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Cookie Consent</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept", you consent to our use of cookies.
                </p>
                
                <button 
                  onClick={toggleDetails}
                  className="text-sm text-primary dark:text-primary-foreground hover:underline flex items-center"
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                  <i className={`fas fa-chevron-${showDetails ? 'up' : 'down'} ml-1 text-xs`}></i>
                </button>
                
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 space-y-2 p-3 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900">
                        <div>
                          <h4 className="font-medium mb-1">Essential Cookies</h4>
                          <p>These cookies are necessary for the website to function properly.</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Analytics Cookies</h4>
                          <p>These cookies help us understand how visitors interact with our website.</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Functional Cookies</h4>
                          <p>These cookies enable personalized features and functionality.</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Marketing Cookies</h4>
                          <p>These cookies are used to track visitors across websites to display relevant advertisements.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDecline}
                  className="whitespace-nowrap"
                >
                  Decline
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAccept}
                  className="whitespace-nowrap"
                >
                  Accept All Cookies
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;