import { useState, useEffect } from 'react';

// Breakpoint definitions for standardized responsive design
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type BreakpointKey = keyof typeof breakpoints;
type Breakpoint = { [key in BreakpointKey]: boolean } & { 
  width: number; 
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
};

// Hook for comprehensive responsive information
export const useResponsive = (): Breakpoint => {
  // Default to desktop values to prevent hydration issues
  const [responsive, setResponsive] = useState<Breakpoint>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    width: 1200,
    height: 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'landscape',
  });

  useEffect(() => {
    // Initial check
    updateValues();

    // Update on resize
    const handleResize = () => {
      updateValues();
    };

    // Update orientation change (especially important for mobile)
    const handleOrientationChange = () => {
      updateValues();
    };

    // Update values based on current window size
    function updateValues() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? 'landscape' : 'portrait';
      
      // Device type detection
      const isMobile = width < breakpoints.md;  
      const isTablet = width >= breakpoints.md && width < breakpoints.lg;
      const isDesktop = width >= breakpoints.lg;

      setResponsive({
        sm: width >= breakpoints.sm,
        md: width >= breakpoints.md,
        lg: width >= breakpoints.lg,
        xl: width >= breakpoints.xl,
        '2xl': width >= breakpoints['2xl'],
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        orientation,
      });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return responsive;
};

// Conditional component rendering based on device/screen size
interface ResponsiveWrapperProps {
  children: React.ReactNode;
  breakpoint?: BreakpointKey | number;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  tabletOnly?: boolean;
  aboveBreakpoint?: boolean;  // true = show above breakpoint, false = show below breakpoint
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  breakpoint = 'md',
  mobileOnly = false,
  desktopOnly = false,
  tabletOnly = false,
  aboveBreakpoint = true,
}) => {
  const responsive = useResponsive();
  
  // Handle device-specific checks
  if (mobileOnly && !responsive.isMobile) return null;
  if (desktopOnly && !responsive.isDesktop) return null;
  if (tabletOnly && !responsive.isTablet) return null;
  
  // Handle breakpoint-based checks
  const breakpointValue = typeof breakpoint === 'number' 
    ? breakpoint 
    : breakpoints[breakpoint];
  
  const isAboveBreakpoint = responsive.width >= breakpointValue;
  
  if ((aboveBreakpoint && !isAboveBreakpoint) || (!aboveBreakpoint && isAboveBreakpoint)) {
    return null;
  }
  
  return <>{children}</>;
};

export default useResponsive;