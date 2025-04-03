import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CookieConsent from "@/components/CookieConsent";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import usePerformanceOptimizations, { OptimizationLevel } from "@/hooks/use-performance";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { toast } = useToast();
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always required
    analytics: false,
    functional: false,
    marketing: false
  });

  // Apply performance optimizations
  usePerformanceOptimizations({
    level: OptimizationLevel.Medium,
    smoothScroll: true,
    lazyLoadImages: true,
    prefetchLinks: true,
    optimizeEventListeners: true
  });

  // Handle cookies when accepted
  const handleCookieAccept = () => {
    // Save all cookie settings
    setCookieSettings({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true
    });
    
    // Apply analytics (just an example, would be implemented with actual analytics in production)
    if (window) {
      console.log('Analytics cookies enabled');
      // This would be where you initialize analytics like Google Analytics, etc.
    }
    
    toast({
      title: "Cookies Accepted",
      description: "Thank you for accepting cookies. Your browsing experience will be enhanced.",
    });
  };

  // Handle cookies when declined
  const handleCookieDecline = () => {
    // Keep only essential cookies
    setCookieSettings({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false
    });
    
    toast({
      title: "Cookies Declined",
      description: "You've opted out of optional cookies. Only essential cookies will be used.",
      variant: "default",
    });
  };

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
        <CookieConsent 
          onAccept={handleCookieAccept} 
          onDecline={handleCookieDecline} 
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
