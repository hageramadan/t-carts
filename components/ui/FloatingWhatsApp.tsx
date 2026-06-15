'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { LuMessageCircle } from "react-icons/lu";
import { useCountry } from '@/contexts/CountryContext';

const FloatingWhatsAppSimple = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry(); // استخدام الرقم من الـ Context

  const handleWhatsAppClick = () => {
    // Clean phone number (remove any non-digit characters except +)
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, '');
    
    const message = language === 'ar' 
      ? 'السلام عليكم، أود الحصول على استشارة مجانية'
      : 'Hello, I would like to get a Start Your Store Now';
    
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-[10%] end-4 md:end-[1%] lg:end-[2%] xl:end-[10%] z-50 flex items-center gap-2 p-3 md:p-4 xl:p-5 rounded-2xl shadow-lg group"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 20px #25D3664D'
      }}
      whileHover={{
        background: '#20B859',
        boxShadow: '0 6px 25px #25D36666'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-white font-medium text-[16px]">
        {language === 'ar' ? 'استشارة مجانية' : 'Start Your Store Now'}
      </span>
      <LuMessageCircle className="text-white h-6 w-6" />
    </motion.button>
  );
};

export default FloatingWhatsAppSimple;