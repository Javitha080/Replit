import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type?: 'header' | 'text' | 'image' | 'card' | 'hero' | 'stats';
  count?: number;
  height?: string | number;
  width?: string | number;
  className?: string;
  animated?: boolean;
}

const SkeletonLoader = ({
  type = 'text',
  count = 1,
  height,
  width,
  className = '',
  animated = true,
}: SkeletonLoaderProps) => {
  // Helper to render individual skeleton elements
  const renderSkeleton = (index: number) => {
    let defaultHeight = '';
    let defaultWidth = '';
    let defaultClass = '';
    
    // Type-specific styling
    switch (type) {
      case 'header':
        defaultHeight = '2.5rem';
        defaultWidth = '60%';
        defaultClass = 'rounded';
        break;
      case 'text':
        defaultHeight = '1rem';
        defaultWidth = '100%';
        defaultClass = 'rounded';
        break;
      case 'image':
        defaultHeight = '250px';
        defaultWidth = '100%';
        defaultClass = 'rounded-lg';
        break;
      case 'card':
        defaultHeight = '320px';
        defaultWidth = '100%';
        defaultClass = 'rounded-xl';
        break;
      case 'hero':
        defaultHeight = '400px';
        defaultWidth = '100%';
        defaultClass = 'rounded-none';
        break;
      case 'stats':
        defaultHeight = '120px';
        defaultWidth = '100%';
        defaultClass = 'rounded-lg';
        break;
      default:
        defaultHeight = '1rem';
        defaultWidth = '100%';
        defaultClass = 'rounded';
    }
    
    const finalHeight = height || defaultHeight;
    const finalWidth = width || defaultWidth;

    // Create a unique key for each skeleton element
    const key = `skeleton-${type}-${index}`;
    
    return (
      <motion.div
        key={key}
        className={`bg-slate-200 dark:bg-slate-700 overflow-hidden relative ${defaultClass} ${className}`}
        style={{ 
          height: finalHeight, 
          width: finalWidth,
          borderRadius: type === 'card' ? '0.75rem' : type === 'image' ? '0.5rem' : '0.25rem'
        }}
        initial={animated ? { opacity: 0.6 } : {}}
        animate={animated ? { 
          opacity: [0.6, 0.8, 0.6],
        } : {}}
        transition={animated ? { 
          repeat: Infinity, 
          duration: 1.5, 
          ease: "easeInOut"
        } : {}}
      >
        {animated && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-600/50 to-transparent -translate-x-full"
            animate={{ translateX: ["0%", "100%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.8,
              ease: "linear",
              repeatDelay: 0.5
            }}
          />
        )}
      </motion.div>
    );
  };

  // Render skeleton placeholders
  return (
    <div className="space-y-2 w-full">
      {[...Array(count)].map((_, index) => renderSkeleton(index))}
    </div>
  );
};

// Predefined skeleton layouts for common sections
export const HeroSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-32 relative">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <SkeletonLoader type="header" width="70%" height="3rem" />
          <div className="space-y-3">
            <SkeletonLoader type="text" count={4} />
          </div>
          <div className="flex gap-4 pt-4">
            <SkeletonLoader width="120px" height="45px" className="rounded-full" />
            <SkeletonLoader width="120px" height="45px" className="rounded-full" />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <SkeletonLoader type="image" height="400px" />
        </div>
      </div>
    </div>
  );
};

export const FeaturesSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <SkeletonLoader type="header" width="40%" className="mx-auto" />
        <div className="mt-4">
          <SkeletonLoader type="text" width="60%" className="mx-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <SkeletonLoader type="image" height="180px" />
            <SkeletonLoader type="header" width="80%" height="1.5rem" />
            <SkeletonLoader type="text" count={2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonLoader key={i} type="stats" />
        ))}
      </div>
    </div>
  );
};

export const CardGridSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <SkeletonLoader type="header" width="40%" className="mx-auto" />
        <div className="mt-4">
          <SkeletonLoader type="text" width="60%" className="mx-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonLoader key={i} type="card" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;