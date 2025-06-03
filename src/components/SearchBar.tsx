
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMapPin, FiCalendar, FiUser, FiLoader } from 'react-icons/fi';
import { FaPlane, FaCar, FaHome, FaGlassCheers, FaSimCard } from 'react-icons/fa';

interface SearchBarProps {
  language: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('flights');
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    guests: 1,
  });

  const tabs = [
    { id: 'flights', label: language === 'EN' ? 'Flights' : 'طيران', icon: FaPlane },
    { id: 'cars', label: language === 'EN' ? 'Cars' : 'سيارات', icon: FaCar },
    { id: 'villas', label: language === 'EN' ? 'Villas' : 'فيلات', icon: FaHome },
    { id: 'nightlife', label: language === 'EN' ? 'Nightlife' : 'الحياة الليلية', icon: FaGlassCheers },
    { id: 'esim', label: language === 'EN' ? 'eSIM' : 'شريحة إلكترونية', icon: FaSimCard },
  ];

  const cities = [
    { code: 'DXB', name: 'Dubai', flag: '🇦🇪' },
    { code: 'AUH', name: 'Abu Dhabi', flag: '🇦🇪' },
    { code: 'SHJ', name: 'Sharjah', flag: '🇦🇪' },
    { code: 'LHR', name: 'London', flag: '🇬🇧' },
    { code: 'JFK', name: 'New York', flag: '🇺🇸' },
    { code: 'CDG', name: 'Paris', flag: '🇫🇷' },
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
    console.log('Search completed for:', activeTab, formData);
  };

  const renderSearchFields = () => {
    switch (activeTab) {
      case 'flights':
        return (
          <motion.div
            key="flights"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={formData.from}
                onChange={(e) => setFormData({...formData, from: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              >
                <option value="">From</option>
                {cities.map(city => (
                  <option key={city.code} value={city.code}>
                    {city.flag} {city.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              >
                <option value="">To</option>
                {cities.map(city => (
                  <option key={city.code} value={city.code}>
                    {city.flag} {city.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={formData.departure}
                onChange={(e) => setFormData({...formData, departure: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </motion.div>
        );
      
      case 'cars':
        return (
          <motion.div
            key="cars"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Pick-up Location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="datetime-local"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="datetime-local"
                placeholder="Return Date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
          </motion.div>
        );
      
      default:
        return (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative -mt-20 z-20 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6"
      >
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="text-lg" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Search Fields */}
        <AnimatePresence mode="wait">
          {renderSearchFields()}
        </AnimatePresence>

        {/* Search Button */}
        <motion.div className="mt-6 flex justify-center">
          <motion.button
            onClick={handleSearch}
            disabled={isSearching}
            className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <FiLoader className="animate-spin" />
                  {language === 'EN' ? 'Searching...' : 'جاري البحث...'}
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <FiSearch />
                  {language === 'EN' ? 'Search' : 'بحث'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SearchBar;
