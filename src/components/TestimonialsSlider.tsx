
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

interface TestimonialsSliderProps {
  language: string;
}

const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: language === 'EN' ? 'Travel Enthusiast' : 'محبة السفر',
      rating: 5,
      text: language === 'EN' 
        ? "Absolutely incredible experience! The villa was stunning and the service was impeccable. Dubai Premier made our honeymoon unforgettable."
        : "تجربة رائعة بشكل مطلق! كانت الفيلا مذهلة والخدمة لا تشوبها شائبة. جعلت دبي بريمير شهر عسلنا لا ينسى.",
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3',
      location: 'New York, USA',
      package: 'Luxury Villa Package',
      audioUrl: '/audio/testimonial1.mp3'
    },
    {
      id: 2,
      name: 'Ahmed Al-Mansouri',
      role: language === 'EN' ? 'Business Executive' : 'مدير تنفيذي',
      rating: 5,
      text: language === 'EN'
        ? "The car rental service exceeded all expectations. Driving a Lamborghini through Dubai was a dream come true. Professional and seamless service."
        : "خدمة تأجير السيارات فاقت كل التوقعات. قيادة لامبورغيني في دبي كانت حلم تحقق. خدمة مهنية وسلسة.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
      location: 'Dubai, UAE',
      package: 'Luxury Car Experience',
      audioUrl: '/audio/testimonial2.mp3'
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: language === 'EN' ? 'Digital Nomad' : 'رحالة رقمية',
      rating: 5,
      text: language === 'EN'
        ? "The eSIM service kept me connected throughout my Middle East tour. Fast speeds, great coverage, and excellent customer support. Highly recommended!"
        : "خدمة الشريحة الإلكترونية أبقتني متصلة طوال جولتي في الشرق الأوسط. سرعات عالية وتغطية ممتازة ودعم عملاء رائع. أنصح بها بشدة!",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3',
      location: 'Singapore',
      package: 'Travel eSIM Global',
      audioUrl: '/audio/testimonial3.mp3'
    },
    {
      id: 4,
      name: 'Marcus Rodriguez',
      role: language === 'EN' ? 'Photographer' : 'مصور فوتوغرافي',
      rating: 5,
      text: language === 'EN'
        ? "Dubai Premier's nightlife packages are exceptional. VIP access to the best venues with amazing views. Perfect for special occasions and networking."
        : "حزم الحياة الليلية من دبي بريمير استثنائية. وصول كبار الشخصيات لأفضل الأماكن مع مناظر خلابة. مثالية للمناسبات الخاصة والتواصل.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3',
      location: 'Barcelona, Spain',
      package: 'VIP Nightlife Experience',
      audioUrl: '/audio/testimonial4.mp3'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const AudioPlayer = ({ audioUrl, isActive }: { audioUrl: string; isActive: boolean }) => {
    const [audio] = useState(new Audio(audioUrl));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audio.addEventListener('timeupdate', updateProgress);
      return () => audio.removeEventListener('timeupdate', updateProgress);
    }, [audio]);

    const toggleAudio = () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    };

    return (
      <div className="mt-4 flex items-center gap-3">
        <motion.button
          onClick={toggleAudio}
          className="flex items-center justify-center w-10 h-10 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <FiPause /> : <FiPlay className="ml-0.5" />}
        </motion.button>
        
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-amber-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'EN' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'EN' 
              ? 'Real experiences from travelers who chose Dubai Premier for their luxury adventures'
              : 'تجارب حقيقية من المسافرين الذين اختاروا دبي بريمير لمغامراتهم الفاخرة'
            }
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-amber-400"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full">
                    <FaStar className="text-sm" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center md:justify-start gap-1 mb-4"
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <FaStar className="text-amber-400 text-xl" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Quote */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed"
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.blockquote>

                  {/* Author Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                      {testimonials[currentIndex].package}
                    </p>

                    {/* Audio Player */}
                    <AudioPlayer 
                      audioUrl={testimonials[currentIndex].audioUrl} 
                      isActive={true}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              onClick={prevSlide}
              className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft className="text-xl text-gray-600 dark:text-gray-300" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-amber-500 w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="text-xl text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
