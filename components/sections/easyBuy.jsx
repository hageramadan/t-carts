"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { useState } from "react";

const EasyBuy = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [isHovered, setIsHovered] = useState(false);

  // Translations
  const translations = {
    ar: {
      badge: `أداء أسرع لنمو أكبر.. لوحة تحكم ذكية تمنحك الرؤية الكاملة للتوسع.`,
      title: `تجربة شراء بلا تعقيد`,
      description: `كلما قلت خطوات الشراء، زادت مبيعاتك. وفرنا لعملائك واجهة دفع سريعة وبسيطة، متوافقة تماماً مع الجوال، لتضمن إتمام كل عملية شراء من أي زائر يدخل متجرك بأقل مجهود`,
      cta: "ابدأ متجرك الآن",
      demo: "شاهد النماذج",
      stats1: "مشروع منجز",
      stats2: "دول مختلفة",
      stats3: "عميل سعيد",
    },
    en: {
      badge: "Digital Transformation in Saudi",
      title:
        "We develop your goals.. in a language that Saudi digital transformation reality understands",
      description:
        "Turn your idea into a successful digital project with Tawajood. We have designed more than 100 projects in 10 different countries (Restaurant apps, beauty clinics, real estate, meat stores, taxi, car rental, auctions, sports, and various other fields)",
      cta: "Start Your Store Now",
      demo: "View Our Work",
      stats1: "Projects Completed",
      stats2: "Different Countries",
      stats3: "Happy Clients",
    },
  };

  const t = translations[language];

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
    const message =
      language === "ar"
        ? "السلام عليكم، أود الحصول على ابدأ متجرك الآن لمشروعي الرقمي"
        : "Hello, I would like to get a Start Your Store Now for my digital project";

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative flex items-center overflow-hidden py-8 md:py-12 lg:py-16 ">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 md:gap-12">
          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center"
          >
            <motion.div
              className="px-4 md:px-6 lg:px-10 w-full"
            
            >
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] font-bold mb-4  text-[#011917] whitespace-pre-line"
                style={{ lineHeight: "1.7" }}
              >
                {t.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-[24px] text-[#353636] mb-2 md:mb-5 leading-relaxed"
             style={{lineHeight:1.6}}
             >
                {t.description}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
              >
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="flex items-center bg-[#068377] hover:from-[#012E29] hover:to-[#00A898] justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg"
                  style={{
                    boxShadow: "0px 4px 15px #00000040",
                    minWidth: "180px",
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {t.cta}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Container for images - same height as content */}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center py-8 md:py-12">
              {/* Main Image */}
              <motion.div
                className="relative z-10 w-full max-w-[500px] md:max-w-[600px]  mx-auto"
                animate={{
                  y: isHovered ? -15 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/easybuy/easy.png"
                  alt="Hero Image"
                  width={628}
                  height={488}
                  quality={90}
                  className="w-full h-auto object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyBuy;
