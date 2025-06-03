
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiUser, FiMapPin, FiStar } from 'react-icons/fi';
import { FaPlane, FaCar, FaHome, FaGlassCheers } from 'react-icons/fa';

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  included: string[];
}

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: Package | null;
  language: string;
}

const PackageModal: React.FC<PackageModalProps> = ({ isOpen, onClose, packageData, language }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);

  if (!packageData) return null;

  const handleBooking = () => {
    console.log('Booking package:', packageData.title, { date: selectedDate, guests });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={packageData.image}
                alt={packageData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <FiX />
              </button>

              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold mb-2">{packageData.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-amber-400 fill-current" />
                    <span>{packageData.rating}</span>
                    <span className="text-gray-300">({packageData.reviews} reviews)</span>
                  </div>
                  <div className="text-amber-400 font-semibold text-xl">
                    {packageData.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Package Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === 'EN' ? 'Package Details' : 'تفاصيل الحزمة'}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {packageData.description}
                  </p>

                  {/* Highlights */}
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {language === 'EN' ? 'Highlights' : 'النقاط المميزة'}
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {packageData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-amber-500 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* What's Included */}
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {language === 'EN' ? "What's Included" : 'ما هو مشمول'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {packageData.included.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Form */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'EN' ? 'Book This Package' : 'احجز هذه الحزمة'}
                  </h3>

                  <div className="space-y-4">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'EN' ? 'Travel Date' : 'تاريخ السفر'}
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700"
                          required
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'EN' ? 'Number of Guests' : 'عدد الضيوف'}
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700"
                        >
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                        <FiMapPin />
                        <span className="font-medium">{packageData.duration}</span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-300">
                          {packageData.price} × {guests} {guests === 1 ? 'guest' : 'guests'}
                        </span>
                        <span className="font-semibold">
                          ${(parseInt(packageData.price.replace('$', '')) * guests).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                        <span>{language === 'EN' ? 'Total' : 'المجموع'}</span>
                        <span>${(parseInt(packageData.price.replace('$', '')) * guests).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <motion.button
                      onClick={handleBooking}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {language === 'EN' ? 'Book Now' : 'احجز الآن'}
                    </motion.button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {language === 'EN' 
                        ? 'Free cancellation up to 24 hours before departure'
                        : 'إلغاء مجاني حتى 24 ساعة قبل المغادرة'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PackageModal;
