import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "School building",
      title: "Main Building"
    },
    {
      src: "https://images.unsplash.com/photo-1570975640108-2fb142e363e0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "Science laboratory",
      title: "Science Lab"
    },
    {
      src: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "School library",
      title: "Library"
    },
    {
      src: "https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "Classroom",
      title: "Modern Classroom"
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "Computer lab",
      title: "IT Lab"
    },
    {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "Sports field",
      title: "Sports Ground"
    },
    {
      src: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "Cultural performance",
      title: "Cultural Event"
    },
    {
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      alt: "Science exhibition",
      title: "Science Exhibition"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-100 dark:bg-dark-100" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 relative inline-block">
            <span className="relative z-10">Our Gallery</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-secondary rounded-full"></span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Explore life at Homagama Maha Vidyalaya through our collection of memories
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index}
              className="gallery-item overflow-hidden rounded-lg japanese-box h-48 md:h-64 relative group"
              variants={itemVariants}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <h4 className="text-white font-medium">{image.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="#" className="px-8 py-4 bg-white dark:bg-dark-100 text-primary dark:text-accent rounded-lg japanese-box font-medium hover:shadow-lg transition-all duration-300">
            View Full Gallery
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
