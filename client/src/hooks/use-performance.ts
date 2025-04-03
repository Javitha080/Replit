import { useEffect } from 'react';

export enum OptimizationLevel {
  Light = 'light',   // Basic optimizations
  Medium = 'medium', // Better balance of performance and effects
  High = 'high',     // Maximum performance, minimal effects
}

interface PerformanceOptions {
  level?: OptimizationLevel;
  lazyLoadImages?: boolean;
  smoothScroll?: boolean;
  prefetchLinks?: boolean;
  disableHeavyAnimations?: boolean;
  optimizeEventListeners?: boolean;
}

/**
 * A hook to apply various performance optimizations to the website
 */
export function usePerformanceOptimizations({
  level = OptimizationLevel.Medium,
  lazyLoadImages = true,
  smoothScroll = true,
  prefetchLinks = true,
  disableHeavyAnimations = false,
  optimizeEventListeners = true,
}: PerformanceOptions = {}) {
  
  // Apply appropriate optimizations based on the level
  useEffect(() => {
    // Console logging for debugging/monitoring
    console.log(`Applying performance optimizations (level: ${level})`);
    
    // Start profiling
    if (window.performance && window.performance.mark) {
      window.performance.mark('optimization-start');
    }
    
    // Apply smooth scrolling
    if (smoothScroll) {
      // Apply to HTML element for native smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // For older browsers, add JS-based smooth scrolling
      const enhanceAnchorClicks = () => {
        document.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;
          const anchor = target.closest('a[href^="#"]');
          if (anchor) {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId !== '#') {
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }
          }
        });
      };
      
      enhanceAnchorClicks();
    }
    
    // Lazy load images
    if (lazyLoadImages) {
      const lazyLoadImagesFunc = () => {
        // Use native lazy loading if available
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
          img.setAttribute('loading', 'lazy');
        });
        
        // If browser supports Intersection Observer, use it for older browsers without native lazy loading
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                  img.src = dataSrc;
                  img.removeAttribute('data-src');
                  imageObserver.unobserve(img);
                }
              }
            });
          });
          
          document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
          });
        }
      };
      
      lazyLoadImagesFunc();
      
      // Re-apply lazy loading on DOM changes
      if ('MutationObserver' in window) {
        const observer = new MutationObserver((mutations) => {
          let shouldCheck = false;
          
          mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              shouldCheck = true;
            }
          });
          
          if (shouldCheck) {
            lazyLoadImagesFunc();
          }
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }
    
    // Disable heavy animations for high level optimization
    if (disableHeavyAnimations || level === OptimizationLevel.High) {
      // Add a class to enable conditional CSS
      document.documentElement.classList.add('optimize-animations');
      
      // Add a CSS rule for reduced animation
      const style = document.createElement('style');
      style.innerHTML = `
        .optimize-animations * {
          animation-duration: 0.001s !important;
          animation-delay: 0s !important;
          transition-duration: 0.001s !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001s !important;
            animation-delay: 0s !important;
            transition-duration: 0.001s !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Prefetch links for faster navigation
    if (prefetchLinks) {
      const prefetchLink = (url: string) => {
        // Check if the link isn't already prefetched
        if (!document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        }
      };
      
      // Prefetch on mouse hover
      document.addEventListener('mouseover', (event) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');
        
        if (anchor && 
            anchor.href && 
            !anchor.href.startsWith('#') && 
            anchor.href.startsWith(window.location.origin)
           ) {
          prefetchLink(anchor.href);
        }
      });
    }
    
    // Optimize passive event listeners
    if (optimizeEventListeners) {
      const events = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
      
      events.forEach(event => {
        window.addEventListener(event, () => {}, { 
          capture: true,
          passive: true 
        });
      });
    }
    
    // End profiling
    if (window.performance && window.performance.mark) {
      window.performance.mark('optimization-end');
      window.performance.measure(
        'performance-optimizations', 
        'optimization-start', 
        'optimization-end'
      );
    }
    
    // Clean up function
    return () => {
      if (smoothScroll) {
        document.documentElement.style.scrollBehavior = '';
      }
      
      if (disableHeavyAnimations || level === OptimizationLevel.High) {
        document.documentElement.classList.remove('optimize-animations');
      }
    };
  }, [
    level, 
    smoothScroll, 
    lazyLoadImages, 
    prefetchLinks, 
    disableHeavyAnimations, 
    optimizeEventListeners
  ]);
  
  // Return empty - this hook only applies effects
  return null;
}

export default usePerformanceOptimizations;