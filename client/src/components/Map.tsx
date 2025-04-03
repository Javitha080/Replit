import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useResponsive } from "@/hooks/use-responsive";
import ScrollLightEffects from "@/components/ScrollLightEffects";

// Location markers and nearby points of interest
const locationMarkers = [
  {
    id: 1,
    name: "Homagama Maha Vidyalaya",
    address: "Main Campus, Homagama, Sri Lanka",
    coordinates: { lat: 6.8500, lng: 79.8612 },
    type: "main",
    description: "The main campus featuring modern facilities, classrooms, and sports grounds."
  },
  {
    id: 2,
    name: "Sports Complex",
    address: "Eastern Wing, Homagama",
    coordinates: { lat: 6.8490, lng: 79.8622 },
    type: "sports",
    description: "State-of-the-art sports facilities including cricket ground, swimming pool, and indoor courts."
  },
  {
    id: 3,
    name: "Science & Technology Center",
    address: "Western Wing, Homagama",
    coordinates: { lat: 6.8510, lng: 79.8602 },
    type: "academic",
    description: "Modern laboratories and technology-enabled learning spaces for STEM education."
  },
  {
    id: 4,
    name: "Performing Arts Center",
    address: "Northern Wing, Homagama",
    coordinates: { lat: 6.8515, lng: 79.8610 },
    type: "arts",
    description: "Auditorium, music rooms, and creative spaces for cultural and artistic development."
  }
];

// Nearby amenities for context
const nearbyPlaces = [
  { name: "Homagama Railway Station", distance: "0.8 km" },
  { name: "Homagama Central Hospital", distance: "1.2 km" },
  { name: "Public Library", distance: "0.5 km" },
  { name: "Town Center", distance: "1.0 km" }
];

interface MapMarkerProps {
  marker: typeof locationMarkers[0];
  active: boolean;
  onClick: () => void;
}

// Custom animated map marker component
const MapMarker: React.FC<MapMarkerProps> = ({ marker, active, onClick }) => {
  // Different colors based on marker type
  const markerColors = {
    main: "bg-blue-500 shadow-blue-500/50",
    sports: "bg-green-500 shadow-green-500/50",
    academic: "bg-purple-500 shadow-purple-500/50",
    arts: "bg-amber-500 shadow-amber-500/50"
  };
  
  const color = markerColors[marker.type as keyof typeof markerColors] || markerColors.main;
  
  return (
    <motion.div
      className={`absolute cursor-pointer transition-all z-20 ${active ? 'z-30' : ''}`}
      style={{
        // Position markers relative to their coordinates on the map
        left: `${50 + (marker.coordinates.lng - 79.8612) * 500}%`,
        top: `${50 + (marker.coordinates.lat - 6.8500) * -500}%`,
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <motion.div 
        className={`relative ${active ? 'scale-125' : 'scale-100'}`}
        animate={{ scale: active ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Marker pin with pulsing effect */}
        <div className={`w-4 h-4 rounded-full ${color} relative`}>
          <motion.div
            className={`absolute inset-0 rounded-full ${color}`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        {/* Label that appears on hover or when active */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
                {marker.name}
                <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-white dark:bg-slate-800 -translate-x-1/2 rotate-45"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Main interactive map component
const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { once: true, amount: 0.3 });
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { isMobile, isTablet } = useResponsive();
  
  // Toggle marker details
  const handleMarkerClick = (id: number) => {
    setActiveMarker(id);
    setShowDetails(true);
  };

  // Simulated map interactions
  const handlePan = (direction: string) => {
    // In a real implementation, this would pan the map
    console.log(`Panning map ${direction}`);
  };

  const handleZoom = (factor: number) => {
    // In a real implementation, this would zoom the map
    console.log(`Zooming map by factor ${factor}`);
  };

  // Get details of the active marker
  const activeMarkerDetails = activeMarker 
    ? locationMarkers.find(marker => marker.id === activeMarker) 
    : null;
    
  return (
    <section id="location" className="py-16 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Location
          </motion.h2>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Located in the heart of Homagama, our school is easily accessible and surrounded by essential amenities.
          </motion.p>
        </div>
      
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main map content area */}
          <div className="w-full lg:w-2/3">
            <ScrollLightEffects
              intensity={0.5}
              lightColor="rgba(59, 130, 246, 0.3)"
              shadowColor="rgba(0, 0, 0, 0.15)"
              className="rounded-2xl overflow-hidden"
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl border dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xl" ref={mapRef}>
                {/* Interactive map background */}
                <div className="absolute inset-0 overflow-hidden bg-slate-200 dark:bg-slate-800 z-10">
                  {/* Map grid lines for visual effect */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="border border-slate-300/20 dark:border-slate-700/20"
                      />
                    ))}
                  </div>
                  
                  {/* Map background with subtle animation */}
                  <motion.div 
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NGgwdjJoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NEg2VjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"
                    animate={isInView ? { 
                      backgroundPosition: ['0px 0px', '60px 60px'],
                    } : {}}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  />
                  
                  {/* Main roads */}
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-300/30 dark:bg-slate-600/30"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-300/30 dark:bg-slate-600/30"></div>
                  
                  {/* Secondary roads */}
                  <div className="absolute left-0 right-0 top-1/3 h-0.5 bg-slate-300/20 dark:bg-slate-600/20"></div>
                  <div className="absolute left-0 right-0 top-2/3 h-0.5 bg-slate-300/20 dark:bg-slate-600/20"></div>
                  <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-slate-300/20 dark:bg-slate-600/20"></div>
                  <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-slate-300/20 dark:bg-slate-600/20"></div>
                  
                  {/* Location markers */}
                  <AnimatePresence>
                    {isInView && (
                      <>
                        {locationMarkers.map(marker => (
                          <MapMarker 
                            key={marker.id}
                            marker={marker}
                            active={activeMarker === marker.id}
                            onClick={() => handleMarkerClick(marker.id)}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Map controls for desktop */}
                {!isMobile && (
                  <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
                    <motion.div 
                      className="bg-white dark:bg-slate-700 rounded-lg shadow-lg overflow-hidden p-1"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                        onClick={() => handleZoom(1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                        onClick={() => handleZoom(-1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-1"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                        onClick={() => handlePan('center')}
                      >
                        <i className="fas fa-location-crosshairs"></i>
                      </button>
                    </motion.div>
                  </div>
                )}
                
                {/* Direction pad for mobile */}
                {isMobile && (
                  <motion.div 
                    className="absolute bottom-4 right-4 z-20 grid grid-cols-3 gap-1 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-lg p-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-8 h-8"></div>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                      onClick={() => handlePan('up')}
                    >
                      <i className="fas fa-chevron-up"></i>
                    </button>
                    <div className="w-8 h-8"></div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                      onClick={() => handlePan('left')}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                      onClick={() => handlePan('center')}
                    >
                      <i className="fas fa-location-crosshairs"></i>
                    </button>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                      onClick={() => handlePan('right')}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                    
                    <div className="w-8 h-8"></div>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                      onClick={() => handlePan('down')}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className="w-8 h-8"></div>
                  </motion.div>
                )}
                
                {/* Map attribution */}
                <div className="absolute left-3 bottom-3 z-20 text-xs text-slate-500 dark:text-slate-400">
                  Interactive School Map © {new Date().getFullYear()} Homagama Maha Vidyalaya
                </div>
              </div>
            </ScrollLightEffects>
          </div>
          
          {/* Information sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="lg:h-full flex flex-col">
              {/* Location details card */}
              <motion.div 
                className="flex-1 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 bg-pattern pointer-events-none"></div>
                
                {/* Main address */}
                <div className="mb-6 relative z-10">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                    <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                    Homagama Maha Vidyalaya
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Central Campus, Homagama</p>
                  <p className="text-slate-600 dark:text-slate-300">Colombo District, Sri Lanka</p>
                </div>
                
                {/* Contact and hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-6 relative z-10">
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
                      Contact Information
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                        <i className="fas fa-phone text-blue-500 mt-1 mr-2"></i>
                        <span>+94 XX XXX XXXX</span>
                      </li>
                      <li className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                        <i className="fas fa-envelope text-blue-500 mt-1 mr-2"></i>
                        <span>info@homagamamv.edu.lk</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
                      Office Hours
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                        <i className="fas fa-clock text-blue-500 mt-1 mr-2"></i>
                        <div>
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span>8:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span>8:00 AM - 12:00 PM</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Nearby places */}
                <div className="relative z-10">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
                    Nearby Amenities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {nearbyPlaces.map((place, index) => (
                      <li key={index} className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        <span>{place.name}</span>
                        <span className="ml-auto text-xs text-slate-500">{place.distance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Get directions button (would link to maps in a real implementation) */}
                <div className="mt-6 relative z-10">
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors flex items-center justify-center">
                    <i className="fas fa-directions mr-2"></i>
                    Get Directions
                  </button>
                </div>
              </motion.div>
              
              {/* Location details popup for selected marker */}
              <AnimatePresence>
                {showDetails && activeMarkerDetails && (
                  <motion.div 
                    className="mt-4 p-5 bg-white dark:bg-slate-800 rounded-xl shadow-lg relative overflow-hidden border border-slate-200 dark:border-slate-700"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Close button */}
                    <button 
                      className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10"
                      onClick={() => setShowDetails(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    
                    <div className="relative z-10">
                      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                        {activeMarkerDetails.name}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        {activeMarkerDetails.address}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {activeMarkerDetails.description}
                      </p>
                    </div>
                    
                    {/* Background highlight for the card */}
                    <div 
                      className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -mr-10 -mt-10 ${
                        activeMarkerDetails.type === 'main' ? 'bg-blue-500' :
                        activeMarkerDetails.type === 'sports' ? 'bg-green-500' :
                        activeMarkerDetails.type === 'academic' ? 'bg-purple-500' :
                        'bg-amber-500'
                      }`}
                    ></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
