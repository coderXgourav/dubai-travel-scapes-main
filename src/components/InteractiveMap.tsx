
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiX } from 'react-icons/fi';
import { FaHotel, FaPlane, FaCar, FaGlassCheers } from 'react-icons/fa';

interface InteractiveMapProps {
  language: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ language }) => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [animatedPins, setAnimatedPins] = useState<number[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const locations = [
    {
      id: 1,
      name: 'Burj Khalifa',
      description: language === 'EN' 
        ? 'World\'s tallest building with luxury experiences'
        : 'أطول مبنى في العالم مع تجارب فاخرة',
      icon: FaHotel,
      x: 45,
      y: 60,
      services: ['Luxury Dining', 'Observation Deck', 'Hotel Suites'],
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3'
    },
    {
      id: 2,
      name: 'Dubai International Airport',
      description: language === 'EN' 
        ? 'Premium flight services and lounges'
        : 'خدمات الطيران المميزة والصالات',
      icon: FaPlane,
      x: 70,
      y: 40,
      services: ['Private Jets', 'VIP Lounges', 'Fast Track'],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3'
    },
    {
      id: 3,
      name: 'Palm Jumeirah',
      description: language === 'EN' 
        ? 'Exclusive island with luxury villas and resorts'
        : 'جزيرة حصرية مع فيلات ومنتجعات فاخرة',
      icon: FaHotel,
      x: 25,
      y: 45,
      services: ['Luxury Villas', 'Beach Resorts', 'Private Beaches'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3'
    },
    {
      id: 4,
      name: 'Dubai Marina',
      description: language === 'EN' 
        ? 'Premium nightlife and yacht experiences'
        : 'الحياة الليلية المميزة وتجارب اليخوت',
      icon: FaGlassCheers,
      x: 15,
      y: 35,
      services: ['Rooftop Bars', 'Yacht Charters', 'Fine Dining'],
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?ixlib=rb-4.0.3'
    },
    {
      id: 5,
      name: 'Downtown Dubai',
      description: language === 'EN' 
        ? 'Shopping and luxury car rentals'
        : 'التسوق وتأجير السيارات الفاخرة',
      icon: FaCar,
      x: 50,
      y: 55,
      services: ['Luxury Cars', 'Shopping Malls', 'Premium Hotels'],
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3'
    }
  ];

  React.useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        locations.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedPins(prev => [...prev, index]);
          }, index * 300);
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, locations]);

  const drawAnimatedPath = () => {
    const pathLength = 300;
    return (
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M15,35 Q30,20 45,30 T70,40 Q80,45 70,55 T45,60 Q30,65 25,45 Z"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 3, delay: 2 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </motion.svg>
    );
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'EN' ? 'Explore Dubai' : 'استكشف دبي'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'EN' 
              ? 'Discover premium locations and services across the most luxurious city in the Middle East'
              : 'اكتشف المواقع والخدمات المميزة في أفخم مدينة في الشرق الأوسط'
            }
          </p>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Map Background */}
          <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Dubai Skyline Silhouette */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent opacity-30">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <polygon points="0,100 50,60 80,40 120,55 150,30 180,45 220,25 250,35 280,20 320,40 350,30 400,50 400,100" fill="currentColor" />
              </svg>
            </div>

            {/* Animated Route Path */}
            {drawAnimatedPath()}

            {/* Location Pins */}
            {locations.map((location, index) => {
              const Icon = location.icon;
              const isAnimated = animatedPins.includes(index);
              return (
                <motion.div
                  key={location.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={isAnimated ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  {/* Pin Shadow */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm" />
                  
                  {/* Pin */}
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg border-4 border-white dark:border-gray-800">
                    <Icon className="text-white text-lg" />
                    
                    {/* Pulse Animation */}
                    <motion.div
                      className="absolute inset-0 bg-amber-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Location Label */}
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {location.name}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Location Details Modal */}
          <AnimatePresence>
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedLocation(null)}
              >
                {(() => {
                  const location = locations.find(l => l.id === selectedLocation);
                  if (!location) return null;
                  const Icon = location.icon;
                  return (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-xl">
                            <Icon className="text-amber-600 dark:text-amber-400 text-xl" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {location.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedLocation(null)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <FiX className="text-gray-500" />
                        </button>
                      </div>

                      {/* Image */}
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {location.description}
                      </p>

                      {/* Services */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {language === 'EN' ? 'Available Services:' : 'الخدمات المتاحة:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {location.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          console.log(`Booking for ${location.name}`);
                          setSelectedLocation(null);
                        }}
                      >
                        {language === 'EN' ? 'Book Experience' : 'احجز التجربة'}
                      </motion.button>
                    </motion.div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Map Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: FaHotel, label: language === 'EN' ? 'Hotels & Villas' : 'الفنادق والفيلات', color: 'text-blue-500' },
            { icon: FaPlane, label: language === 'EN' ? 'Airports' : 'المطارات', color: 'text-green-500' },
            { icon: FaCar, label: language === 'EN' ? 'Car Rentals' : 'تأجير السيارات', color: 'text-purple-500' },
            { icon: FaGlassCheers, label: language === 'EN' ? 'Nightlife' : 'الحياة الليلية', color: 'text-pink-500' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Icon className={`${item.color} text-lg`} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMap;
