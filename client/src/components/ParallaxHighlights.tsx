import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HighlightItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
}

const ParallaxHighlights = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const highlights: HighlightItem[] = [
    {
      title: "Modern Facilities",
      subtitle: "State-of-the-Art Resources",
      description: "Our school provides cutting-edge facilities including modern laboratories, computer centers, and multimedia classrooms.",
      image: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Arts & Culture",
      subtitle: "Nurturing Creativity",
      description: "Our diverse arts program encourages students to explore their creative talents through music, dance, drama, and visual arts.",
      image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Sports Excellence",
      subtitle: "Building Champions",
      description: "Our comprehensive sports curriculum and professional coaching helps students excel in various regional and national competitions.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Global Perspective",
      subtitle: "International Exposure",
      description: "Through language programs, exchange initiatives, and international collaborations, we prepare our students for a global future.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      color: "from-amber-500 to-orange-600"
    }
  ];
  
  return (
    <section className="py-20 relative overflow-hidden" ref={containerRef}>
      <motion.div
        className="container mx-auto px-4"
        style={{ opacity }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 relative inline-block">
            <span className="relative z-10">School Highlights</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-secondary rounded-full"></span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Explore what makes our school special and how we provide a comprehensive educational experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            className="flex flex-col gap-10"
            style={{ y: y1 }}
          >
            {highlights.slice(0, 2).map((item, index) => (
              <HighlightCard key={index} item={item} index={index} />
            ))}
          </motion.div>
          
          <motion.div
            className="flex flex-col gap-10 md:mt-16"
            style={{ y: y2 }}
          >
            {highlights.slice(2, 4).map((item, index) => (
              <HighlightCard key={index + 2} item={item} index={index + 2} />
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-20 left-0 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 -z-10"
        style={{ y: y3 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10 -z-10"
        style={{ y: y4 }}
      ></motion.div>
    </section>
  );
};

const HighlightCard = ({ item, index }: { item: HighlightItem, index: number }) => {
  return (
    <motion.div
      className="group rounded-xl japanese-box bg-white dark:bg-dark-100 overflow-hidden hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-80 z-10`}></div>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
          <motion.span 
            className="text-sm font-medium tracking-wider mb-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          >
            {item.subtitle}
          </motion.span>
          <motion.h3 
            className="text-2xl font-poppins font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
          >
            {item.title}
          </motion.h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-600 dark:text-slate-400">
          {item.description}
        </p>
        <motion.a 
          href="#"
          className="inline-flex items-center mt-4 font-medium text-primary dark:text-accent"
          whileHover={{ x: 5 }}
        >
          Learn more
          <i className="fas fa-arrow-right ml-2"></i>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ParallaxHighlights;