'use client';

import { motion } from 'framer-motion';
import {  FaSearch } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';


export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="h-[50vh] md:h-[70vh] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] text-[#025049] font-bold bg-gradient-to-brfrom-[#068377] to-[#21405F] bg-clip-text text-transparent">
            404
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-4 -right-4 md:-top-8 md:-right-8"
          >
            <FaSearch className="text-4xl md:text-6xl text-gray-400 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {language === 'ar'
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها'
              : 'Sorry, the page you are looking for does not exist or has been moved'}
          </p>
        </motion.div>

       
      </div>
    </div>
  );
}