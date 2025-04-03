import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Define the type for gallery images
interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
}

const SchoolGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Gallery images data with categories
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Science Laboratory",
      description: "Students engaged in hands-on scientific experiments",
      category: "facilities"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "School Library",
      description: "Our well-stocked library with modern research facilities",
      category: "facilities"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Annual Sports Meet",
      description: "Students showcasing their athletic abilities",
      category: "events"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Computer Lab",
      description: "State-of-the-art computing facilities for IT education",
      category: "facilities"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1587623259542-ec1c8821b41d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Art Exhibition",
      description: "Creative artworks by our talented students",
      category: "events"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Music Room",
      description: "Well-equipped space for music education and practice",
      category: "facilities"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "School Festival",
      description: "Annual cultural festival celebrating diversity",
      category: "events"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Outdoor Play Area",
      description: "Spacious playground for recreational activities",
      category: "facilities"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Graduation Ceremony",
      description: "Celebrating academic achievements of our students",
      category: "events"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Science Fair",
      description: "Students presenting innovative science projects",
      category: "events"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "School Assembly",
      description: "Morning assembly promoting discipline and unity",
      category: "activities"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1517164850305-99a27ae571ea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
      title: "Meditation Session",
      description: "Mindfulness practices for student well-being",
      category: "activities"
    }
  ];
  
  // Filter images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);
  
  // Animation variants for gallery items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Category buttons
  const categories = [
    { id: "all", label: "All Photos" },
    { id: "facilities", label: "Facilities" },
    { id: "events", label: "Events" },
    { id: "activities", label: "Activities" }
  ];
  
  return (
    <section id="school-gallery" className="py-20 bg-slate-100 dark:bg-dark-300" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 relative inline-block">
            <span className="relative z-10">School Photo Collection</span>
            <span className="absolute bottom-0 left-0 right-0 h-3 bg-yellow-400/30 dark:bg-yellow-500/20 -z-10 transform -rotate-1"></span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore our comprehensive visual archive showcasing the vibrant life, modern facilities, 
            and memorable events at Homagama Maha Vidyalaya.
          </p>
        </motion.div>
        
        {/* Category filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 japanese-box
                ${selectedCategory === category.id 
                  ? 'bg-red-500 text-white dark:bg-yellow-500 dark:text-slate-900 shadow-md transform -translate-y-1' 
                  : 'bg-white text-slate-700 dark:bg-dark-100 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-50'
                }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>
        
        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {filteredImages.map((image) => (
            <motion.div 
              key={image.id}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="rounded-xl overflow-hidden glass shadow-lg japanese-box h-full relative">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <div className="text-white text-lg font-semibold mb-1">{image.title}</div>
                      <div className="text-white/80 text-sm">{image.description}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white/90 dark:bg-dark-100/90 backdrop-blur-sm">
                  <h3 className="text-slate-800 dark:text-white text-lg font-medium mb-1 group-hover:text-red-500 dark:group-hover:text-yellow-400 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    {image.description}
                  </p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs font-medium bg-slate-200 dark:bg-dark-200 rounded-full px-2 py-1 capitalize">
                      {image.category}
                    </span>
                    <button className="text-sm text-red-500 dark:text-yellow-400 hover:underline">
                      View <i className="fas fa-arrow-right text-xs ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <motion.button 
            className="px-8 py-3 bg-red-500 dark:bg-yellow-500 text-white dark:text-slate-900 rounded-full font-medium hover:bg-red-600 dark:hover:bg-yellow-600 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto gap-2 japanese-box"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Complete Gallery</span>
            <i className="fas fa-images"></i>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default SchoolGallery;