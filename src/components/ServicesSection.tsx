
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPlane, FaCar, FaHome, FaGlassCheers, FaSimCard, FaUmbrellaBeach } from 'react-icons/fa';

interface ServicesSectionProps {
  language: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ language }) => {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      id: 1,
      category: 'travel',
      icon: FaPlane,
      title: language === 'EN' ? 'Flight Booking' : 'حجز الطيران',
      description: language === 'EN' 
        ? 'Premium flight experiences with exclusive cabin upgrades and priority boarding'
        : 'تجارب طيران مميزة مع ترقيات المقصورة الحصرية والصعود ذو الأولوية',
      price: 'From $299',
      stats: { bookings: 15420, rating: 4.9 },
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3'
    },
    {
      id: 2,
      category: 'transport',
      icon: FaCar,
      title: language === 'EN' ? 'Luxury Car Rental' : 'تأجير السيارات الفاخرة',
      description: language === 'EN'
        ? 'Drive premium vehicles from Lamborghini, Ferrari, and Rolls Royce'
        : 'قد السيارات المميزة من لامبورغيني وفيراري ورولز رويس',
      price: 'From $150/day',
      stats: { bookings: 8930, rating: 4.8 },
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3'
    },
    {
      id: 3,
      category: 'accommodation',
      icon: FaHome,
      title: language === 'EN' ? 'Villa Reservations' : 'حجز الفيلات',
      description: language === 'EN'
        ? 'Exclusive villas with private pools, beach access, and concierge service'
        : 'فيلات حصرية مع مسابح خاصة ووصول للشاطئ وخدمة الكونسيرج',
      price: 'From $500/night',
      stats: { bookings: 5670, rating: 4.9 },
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3'
    },
    {
      id: 4,
      category: 'entertainment',
      icon: FaGlassCheers,
      title: language === 'EN' ? 'Nightlife Experience' : 'تجربة الحياة الليلية',
      description: language === 'EN'
        ? 'VIP access to Dubai\'s hottest clubs and rooftop bars'
        : 'وصول كبار الشخصيات لأشهر النوادي والبارات في دبي',
      price: 'From $80',
      stats: { bookings: 12340, rating: 4.7 },
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?ixlib=rb-4.0.3'
    },
    {
      id: 5,
      category: 'technology',
      icon: FaSimCard,
      title: language === 'EN' ? 'Travel eSIM' : 'شريحة السفر الإلكترونية',
      description: language === 'EN'
        ? 'Stay connected with high-speed internet across 100+ countries'
        : 'ابق متصلاً بالإنترنت عالي السرعة في أكثر من 100 دولة',
      price: 'From $15',
      stats: { bookings: 23450, rating: 4.6 },
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3'
    },
    {
      id: 6,
      category: 'travel',
      icon: FaUmbrellaBeach,
      title: language === 'EN' ? 'Beach Packages' : 'حزم الشاطئ',
      description: language === 'EN'
        ? 'All-inclusive beach resort packages with water sports and spa'
        : 'حزم منتجع الشاطئ الشاملة مع الرياضات المائية والسبا',
      price: 'From $200/day',
      stats: { bookings: 9876, rating: 4.8 },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3'
    }
  ];

  const categories = [
    { id: 'all', label: language === 'EN' ? 'All Services' : 'جميع الخدمات' },
    { id: 'travel', label: language === 'EN' ? 'Travel' : 'السفر' },
    { id: 'transport', label: language === 'EN' ? 'Transport' : 'النقل' },
    { id: 'accommodation', label: language === 'EN' ? 'Stay' : 'الإقامة' },
    { id: 'entertainment', label: language === 'EN' ? 'Entertainment' : 'الترفيه' },
    { id: 'technology', label: language === 'EN' ? 'Technology' : 'التكنولوجيا' },
  ];

  const filteredServices = filter === 'all' 
    ? services 
    : services.filter(service => service.category === filter);

  const AnimatedCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    
    React.useEffect(() => {
      if (inView) {
        const timer = setInterval(() => {
          setCount(prev => {
            if (prev < end) {
              return Math.min(prev + Math.ceil(end / 50), end);
            }
            return end;
          });
        }, 50);
        
        return () => clearInterval(timer);
      }
    }, [inView, end]);
    
    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <section id="services" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'EN' ? 'Premium Services' : 'الخدمات المميزة'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'EN' 
              ? 'Experience luxury and comfort with our curated selection of premium travel services'
              : 'اختبر الفخامة والراحة مع مجموعتنا المختارة من خدمات السفر المميزة'
            }
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === category.id
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-amber-500 text-white p-3 rounded-xl">
                      <Icon className="text-xl" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-amber-600">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{service.stats.rating}</span>
                    </div>
                    <div>
                      <AnimatedCounter end={service.stats.bookings} /> {language === 'EN' ? 'bookings' : 'حجز'}
                    </div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'EN' ? 'Book Now' : 'احجز الآن'}
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
