import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 relative">
              <span className="relative z-10">About Our School</span>
              <span className="absolute bottom-0 left-0 w-24 h-2 bg-secondary rounded-full"></span>
            </h2>
            
            <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
              Homagama Maha Vidyalaya has been a center of educational excellence since 1962. We are dedicated to providing 
              a holistic education that nurtures academic brilliance, creativity, and character development.
            </p>
            
            <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
              Our experienced faculty, modern facilities, and innovative teaching methods create an inspiring environment 
              where students discover their strengths and develop their potential.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="japanese-box p-5 rounded-lg bg-white dark:bg-dark-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                  <i className="fas fa-user-graduate text-primary dark:text-blue-400"></i>
                </div>
                <h3 className="font-poppins font-medium mb-1">2,500+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Students</p>
              </div>
              
              <div className="japanese-box p-5 rounded-lg bg-white dark:bg-dark-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                  <i className="fas fa-chalkboard-teacher text-secondary dark:text-green-400"></i>
                </div>
                <h3 className="font-poppins font-medium mb-1">150+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Teachers</p>
              </div>
              
              <div className="japanese-box p-5 rounded-lg bg-white dark:bg-dark-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                  <i className="fas fa-award text-accent dark:text-purple-400"></i>
                </div>
                <h3 className="font-poppins font-medium mb-1">60+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Years of Excellence</p>
              </div>
              
              <div className="japanese-box p-5 rounded-lg bg-white dark:bg-dark-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                  <i className="fas fa-building text-amber-500 dark:text-amber-400"></i>
                </div>
                <h3 className="font-poppins font-medium mb-1">25+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Facilities</p>
              </div>
            </div>
            
            <a href="#" className="inline-flex items-center font-medium text-primary dark:text-accent hover:underline">
              Learn more about our history
              <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </a>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 order-1 lg:order-2"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden japanese-box">
                <img 
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000" 
                  alt="Homagama Maha Vidyalaya building and campus" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Principal's quote card */}
              <motion.div 
                className="absolute -bottom-6 -right-6 glass p-6 rounded-lg japanese-box max-w-xs"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-start space-x-3">
                  <i className="fas fa-quote-left text-xl text-red-500 dark:text-yellow-400"></i>
                  <div>
                    <p className="italic text-slate-700 dark:text-slate-200 mb-3">
                      "Our school provides an environment where students thrive academically and personally."
                    </p>
                    <p className="font-medium text-sm">- Principal, Homagama Maha Vidyalaya</p>
                  </div>
                </div>
              </motion.div>
              

              
              {/* Achievement card */}
              <motion.div 
                className="absolute -top-16 left-10 glass p-4 rounded-lg japanese-box"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-red-500 text-white">
                    <i className="fas fa-trophy"></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">Best School Award</h3>
                    <p className="text-xs opacity-80">National Level 2023</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
