import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const VicePrincipal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="vice-principal" className="py-16 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-poppins font-bold mb-8 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative z-10">School Leadership</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-red-500 dark:bg-yellow-400 rounded-full"></span>
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="p-8 glass rounded-xl japanese-box relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 dark:border-yellow-400 shadow-lg mx-auto">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300" 
                      alt="Mrs. Jayanthi Silva - Vice Principal" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-1 text-slate-800 dark:text-white">Mrs. Jayanthi Silva</h3>
                  <p className="text-lg font-medium text-red-500 dark:text-yellow-400 mb-4">Vice Principal</p>
                  
                  <p className="text-base mb-4 text-slate-700 dark:text-slate-300">
                    Mrs. Jayanthi Silva brings over 25 years of experience in education to her role as Vice Principal at Homagama Maha Vidyalaya. 
                    Her dedicated leadership and innovative approach to education have been instrumental in maintaining our school's 
                    high academic standards and fostering a positive learning environment.
                  </p>
                  
                  <blockquote className="italic text-slate-600 dark:text-slate-400 border-l-4 border-red-500 dark:border-yellow-400 pl-4 py-1">
                    "Education is the most powerful tool we can use to change the world. At H.M.V., we strive to 
                    empower our students with knowledge, skills, and values to become future leaders."
                  </blockquote>
                </div>
              </div>
              
              <motion.div 
                className="absolute -top-6 -right-6 glass p-4 rounded-lg japanese-box hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-red-500 text-white dark:bg-yellow-400 dark:text-slate-900">
                    <i className="fas fa-award"></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">Best Educator</h3>
                    <p className="text-xs opacity-80">Provincial Award 2022</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 glass p-4 rounded-lg japanese-box hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-blue-500 text-white">
                    <i className="fas fa-graduation-cap"></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">PhD in Education</h3>
                    <p className="text-xs opacity-80">University of Colombo</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VicePrincipal;