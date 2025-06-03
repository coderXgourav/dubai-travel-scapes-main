
import React from 'react';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  language: string;
  setLanguage: (value: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  return (
    <motion.div
      className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1 shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex">
        {['EN', 'AR'].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all ${
              language === lang
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {language === lang && (
              <motion.div
                layoutId="languageSelector"
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              {lang === 'EN' ? '🇺🇸' : '🇦🇪'} {lang}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default LanguageSwitcher;
