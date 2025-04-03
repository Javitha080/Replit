import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ScrollLightEffects from "./ScrollLightEffects";
import { useResponsive } from "@/hooks/use-responsive";

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const { isMobile } = useResponsive();

  const features = [
    {
      icon: "fas fa-graduation-cap",
      color: "blue",
      title: "Comprehensive Education",
      description: "We offer a balanced curriculum that nurtures academic excellence while developing essential life skills.",
      lightColor: "rgba(59, 130, 246, 0.7)"
    },
    {
      icon: "fas fa-flask",
      color: "green",
      title: "Modern Laboratories",
      description: "State-of-the-art science, computer, and language labs foster practical learning and innovation.",
      lightColor: "rgba(16, 185, 129, 0.7)"
    },
    {
      icon: "fas fa-paint-brush",
      color: "purple",
      title: "Arts & Cultural Programs",
      description: "We encourage creativity through diverse artistic endeavors, cultural exhibitions, and performances.",
      lightColor: "rgba(139, 92, 246, 0.7)"
    },
    {
      icon: "fas fa-running",
      color: "amber",
      title: "Sports Excellence",
      description: "Our comprehensive sports program develops physical fitness, teamwork, and competitive skills.",
      lightColor: "rgba(251, 191, 36, 0.7)"
    },
    {
      icon: "fas fa-users",
      color: "pink",
      title: "Supportive Community",
      description: "Our close-knit community of teachers, parents, and students creates a nurturing learning environment.",
      lightColor: "rgba(236, 72, 153, 0.7)"
    },
    {
      icon: "fas fa-globe-asia",
      color: "cyan",
      title: "Global Perspective",
      description: "We prepare students for a global future through language programs and international exchanges.",
      lightColor: "rgba(6, 182, 212, 0.7)"
    }
  ];

  // Extended descriptions for the feature modal
  const extendedContent = {
    blue: {
      details: "Our curriculum follows national educational standards while incorporating innovative teaching methods. We focus on developing critical thinking, problem-solving, and communication skills alongside academic knowledge.",
      stats: ["98% examination success rate", "Over 200 university placements annually", "15:1 student-teacher ratio"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    green: {
      details: "Our laboratories are equipped with the latest technology and tools for hands-on learning. Students engage in practical experiments, research projects, and technical skill development in physics, chemistry, biology, and computer science.",
      stats: ["12 dedicated lab facilities", "1:1 device-to-student ratio", "Annual science fair with 50+ projects"],
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    purple: {
      details: "Our arts program encompasses visual arts, music, dance, and drama. Students regularly participate in performances, exhibitions, and cultural events both within the school and at national level competitions.",
      stats: ["25+ cultural activities", "Annual school concert", "3 dedicated arts studios"],
      image: "https://images.unsplash.com/photo-1519177580-5ec4494938de?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    amber: {
      details: "Our sports program includes cricket, volleyball, basketball, track and field, swimming, and more. We have professional coaches and excellent facilities that have helped our students achieve district and national recognition.",
      stats: ["20+ district championships", "Olympic-sized swimming pool", "15-acre sports complex"],
      image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    pink: {
      details: "Our community extends beyond the classroom with active parent-teacher associations, alumni networks, and community service initiatives. We believe in fostering a sense of belonging and mutual support.",
      stats: ["Monthly parent-teacher meetings", "Active 1000+ alumni network", "10+ annual community service projects"],
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    cyan: {
      details: "We prepare students for a global future through comprehensive language education, cultural exchange programs, and global awareness activities. Our students regularly participate in international competitions and exchange visits.",
      stats: ["5 languages offered", "Annual international exchange program", "Global partner schools in 8 countries"],
      image: "https://images.unsplash.com/photo-1518082593638-b6e73b35d39a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, { bg: string, darkBg: string, text: string, border: string, shadow: string }> = {
      blue: { 
        bg: "bg-blue-100", 
        darkBg: "dark:bg-blue-900/30", 
        text: "text-blue-600 dark:text-blue-400", 
        border: "border-blue-200 dark:border-blue-800/50",
        shadow: "shadow-blue-500/20"
      },
      green: { 
        bg: "bg-green-100", 
        darkBg: "dark:bg-green-900/30", 
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800/50",
        shadow: "shadow-green-500/20"
      },
      purple: { 
        bg: "bg-purple-100", 
        darkBg: "dark:bg-purple-900/30", 
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800/50",
        shadow: "shadow-purple-500/20"
      },
      amber: { 
        bg: "bg-amber-100", 
        darkBg: "dark:bg-amber-900/30", 
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800/50",
        shadow: "shadow-amber-500/20"
      },
      pink: { 
        bg: "bg-pink-100", 
        darkBg: "dark:bg-pink-900/30", 
        text: "text-pink-600 dark:text-pink-400",
        border: "border-pink-200 dark:border-pink-800/50",
        shadow: "shadow-pink-500/20"
      },
      cyan: { 
        bg: "bg-cyan-100", 
        darkBg: "dark:bg-cyan-900/30", 
        text: "text-cyan-600 dark:text-cyan-400",
        border: "border-cyan-200 dark:border-cyan-800/50",
        shadow: "shadow-cyan-500/20"
      }
    };

    return colorMap[color] || colorMap.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Handler for opening feature details
  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
  };

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-500/5 to-cyan-500/5 blur-3xl rounded-full -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            <span className="relative z-10">What Makes Us Special</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.span>
          </h2>
          <motion.p 
            className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover the unique aspects of our educational approach that help our students excel in academics, 
            arts, sports, and personal development
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const colorClasses = getColorClass(feature.color);
            
            return (
              <ScrollLightEffects
                key={index}
                lightColor={feature.lightColor}
                intensity={0.2}
                lightCount={2}
                className="h-full"
              >
                <motion.div 
                  className={`h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl ${colorClasses.border} border ${colorClasses.shadow} shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
                  variants={itemVariants}
                  onClick={() => handleFeatureClick(index)}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: `0 20px 25px -5px ${feature.lightColor.replace('0.7', '0.1')}, 0 8px 10px -6px ${feature.lightColor.replace('0.7', '0.1')}` 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`relative w-16 h-16 rounded-2xl ${colorClasses.bg} ${colorClasses.darkBg} flex items-center justify-center mb-6 overflow-hidden`}>
                    <i className={`${feature.icon} ${colorClasses.text} text-2xl relative z-10`}></i>
                    <motion.div 
                      className="absolute inset-0 opacity-30"
                      animate={{ 
                        background: [
                          `radial-gradient(circle at 20% 20%, ${feature.lightColor}, transparent 70%)`,
                          `radial-gradient(circle at 80% 80%, ${feature.lightColor}, transparent 70%)`
                        ] 
                      }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  
                  <h3 className={`text-xl md:text-2xl font-poppins font-bold mb-3 ${colorClasses.text}`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center mt-auto">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Learn more</span>
                    <i className="fas fa-arrow-right text-xs ml-2 transition-transform group-hover:translate-x-1"></i>
                  </div>
                </motion.div>
              </ScrollLightEffects>
            );
          })}
        </motion.div>
        
        {/* Detailed feature modal */}
        <AnimatePresence>
          {activeFeature !== null && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
            >
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              
              <motion.div 
                className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {activeFeature !== null && (
                  <>
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      {/* Feature image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${extendedContent[features[activeFeature].color as keyof typeof extendedContent].image})` 
                        }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Feature icon and title */}
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <div className={`flex items-center space-x-4`}>
                          <div className={`w-12 h-12 rounded-xl ${getColorClass(features[activeFeature].color).bg} flex items-center justify-center`}>
                            <i className={`${features[activeFeature].icon} ${getColorClass(features[activeFeature].color).text} text-xl`}></i>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold">{features[activeFeature].title}</h3>
                        </div>
                      </div>
                      
                      {/* Close button */}
                      <button 
                        className="absolute top-4 right-4 w-8 h-8 bg-black/30 text-white rounded-full flex items-center justify-center"
                        onClick={() => setActiveFeature(null)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    
                    {/* Feature content */}
                    <div className="p-6 md:p-8">
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {extendedContent[features[activeFeature].color as keyof typeof extendedContent].details}
                        </p>
                        
                        {/* Feature stats */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {extendedContent[features[activeFeature].color as keyof typeof extendedContent].stats.map((stat, i) => (
                            <div key={i} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-xl">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full ${getColorClass(features[activeFeature].color).bg} mr-2`}></div>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{stat}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA button */}
                      <div className="mt-8 flex justify-end">
                        <button 
                          className={`px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r 
                            ${features[activeFeature].color === 'blue' ? 'from-blue-500 to-blue-600' : 
                              features[activeFeature].color === 'green' ? 'from-green-500 to-green-600' :
                              features[activeFeature].color === 'purple' ? 'from-purple-500 to-purple-600' :
                              features[activeFeature].color === 'amber' ? 'from-amber-500 to-amber-600' :
                              features[activeFeature].color === 'pink' ? 'from-pink-500 to-pink-600' :
                              'from-cyan-500 to-cyan-600'
                            }`}
                        >
                          Learn More About This Program
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;
