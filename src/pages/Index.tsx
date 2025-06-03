
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import InteractiveMap from '../components/InteractiveMap';
import SkeletonLoader from '../components/SkeletonLoader';
import PackageModal from '../components/PackageModal';

const Index = () => {
  const [language, setLanguage] = useState('EN');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const featuredPackages = [
    {
      id: 1,
      title: 'Luxury Dubai Experience',
      description: 'A comprehensive 7-day luxury package including 5-star accommodation, private tours of iconic landmarks, fine dining experiences, and exclusive access to premium venues.',
      price: '$2999',
      duration: '7 Days / 6 Nights',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3',
      highlights: [
        'Private tour of Burj Khalifa and Dubai Mall',
        'Luxury desert safari with fine dining',
        'Yacht cruise around Palm Jumeirah',
        'VIP access to premium shopping districts'
      ],
      included: [
        '5-star hotel accommodation',
        'Private transfers',
        'Daily breakfast',
        'Professional guide',
        'All entrance fees',
        '24/7 concierge service'
      ]
    }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* Hero Skeleton */}
          <div className="h-screen flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <SkeletonLoader className="h-16 w-96 mx-auto mb-4" />
              <SkeletonLoader className="h-8 w-64 mx-auto mb-8" />
              <div className="flex justify-center gap-4">
                <SkeletonLoader className="h-12 w-32" />
                <SkeletonLoader className="h-12 w-32" />
              </div>
            </div>
          </div>
          
          {/* Services Skeleton */}
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <SkeletonLoader className="h-8 w-64 mx-auto mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <SkeletonLoader className="h-48 w-full" />
                    <SkeletonLoader className="h-6 w-3/4" />
                    <SkeletonLoader className="h-4 w-full" />
                    <SkeletonLoader className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero language={language} />
        
        {/* Search Bar */}
        <SearchBar language={language} />
        
        {/* Services Section */}
        <ServicesSection language={language} />
        
        {/* Featured Packages Section */}
        <section id="packages" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'EN' ? 'Featured Packages' : 'الحزم المميزة'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {language === 'EN' 
                  ? 'Curated luxury experiences designed for the most discerning travelers'
                  : 'تجارب فاخرة مختارة ومصممة للمسافرين الأكثر تميزاً'
                }
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -10 }}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setIsPackageModalOpen(true);
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full font-semibold">
                      {pkg.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{pkg.duration}</span>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{pkg.rating} ({pkg.reviews})</span>
                      </div>
                    </div>
                    
                    <motion.button
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {language === 'EN' ? 'View Details' : 'عرض التفاصيل'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSlider language={language} />
        
        {/* Interactive Map Section */}
        <InteractiveMap language={language} />
        
        {/* Package Modal */}
        <PackageModal
          isOpen={isPackageModalOpen}
          onClose={() => setIsPackageModalOpen(false)}
          packageData={selectedPackage}
          language={language}
        />
      </div>
    </Layout>
  );
};

export default Index;
