import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const newsItems = [
    {
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      category: "Event",
      color: "blue",
      date: "March 15, 2023",
      title: "Annual Science Exhibition",
      description: "Students showcase innovative projects at our annual science fair, demonstrating creativity and technical knowledge."
    },
    {
      image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      category: "Sports",
      color: "green",
      date: "April 10, 2023",
      title: "Sports Day Celebration",
      description: "Our annual sports day brought together students competing in various athletic events with great enthusiasm."
    },
    {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      category: "Achievement",
      color: "purple",
      date: "May 5, 2023",
      title: "National Award Winners",
      description: "Five of our students received prestigious national awards for their outstanding academic performance."
    }
  ];

  const getColorClass = (color: string) => {
    const colorMap: Record<string, { bg: string, darkBg: string, text: string }> = {
      blue: { bg: "bg-blue-100", darkBg: "dark:bg-blue-900/30", text: "text-primary dark:text-blue-400" },
      green: { bg: "bg-green-100", darkBg: "dark:bg-green-900/30", text: "text-secondary dark:text-green-400" },
      purple: { bg: "bg-purple-100", darkBg: "dark:bg-purple-900/30", text: "text-accent dark:text-purple-400" }
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

  return (
    <section id="news" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 relative inline-block">
            <span className="relative z-10">Latest News & Events</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-secondary rounded-full"></span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Stay updated with the latest happenings and upcoming events at Homagama Maha Vidyalaya
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {newsItems.map((item, index) => {
            const colorClasses = getColorClass(item.color);
            
            return (
              <motion.div 
                key={index}
                className="rounded-xl overflow-hidden japanese-box bg-white dark:bg-dark-100"
                variants={itemVariants}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`text-xs font-medium ${colorClasses.bg} ${colorClasses.darkBg} ${colorClasses.text} px-3 py-1 rounded-full`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-3">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {item.description}
                  </p>
                  <a href="#" className="inline-flex items-center font-medium text-primary dark:text-accent hover:underline">
                    Read more
                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="#" className="px-8 py-4 bg-white dark:bg-dark-100 text-primary dark:text-accent rounded-lg japanese-box font-medium hover:shadow-lg transition-all duration-300">
            View All News & Events
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default News;
