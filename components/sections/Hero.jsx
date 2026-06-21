"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [isHovered, setIsHovered] = useState(false);

  // Translations
  const translations = {
    ar: {
      badge: "التحول الرقمي في السعودية",
      title: `أمتلك منظومة بيع متكاملة.. تملكها بالكامل  \nبدون اشتراكات أو عمولات`,
      description:
        "أمتلك منظومة بيع متكاملة.. تملكها بالكامل بدون اشتراكات أو عمولات",
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
    <section id="about" className="relative flex items-center overflow-hidden py-8 md:py-12 lg:py-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 backdrop-blur-sm bg-[#E8F6F6]"
          style={{
            background: "#E8F6F6",
          }}
        />
      </div>

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
              initial={{ y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[46px] font-bold mb-4 md:mb-6 text-[#012E29] whitespace-pre-line"
                style={{ lineHeight: "1.4" }}
              >
                {t.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-[24px] text-[#4A4A4A] mb-8 md:mb-10 leading-relaxed"
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
                  className="flex items-center bg-gradient-to-br from-[#012E29] to-[#00A898] hover:from-[#012E29] hover:to-[#00A898] justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg"
                  style={{
                    boxShadow: "0px 4px 15px #00000040",
                    minWidth: "180px",
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {t.cta}
                </motion.button>
                <motion.a
                  href="#projects"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-lg bg-white text-[#012E29] font-semibold transition-all text-base md:text-lg"
                >
                  {t.demo}
                </motion.a>
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
                className="relative z-10 w-full max-w-[500px] md:max-w-[600px] lg:max-w-[900px] mx-auto"
                animate={{
                  y: isHovered ? -15 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/hero/hero.png"
                  alt="Hero Image"
                  width={1700}
                  height={672}
                  quality={100}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Store Image 1 - Left side */}
              <motion.div
                className="absolute top-[55%] md:top-[60%] left-0 md:-left-4 z-20"
                animate={{
                  y: isHovered ? -40 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/hero/store.png"
                  alt="Store Icon"
                  width={272}
                  height={91}
                  quality={100}
                  className="w-[60px] h-[76px] md:w-[72px] md:h-[91px] object-contain"
                />
              </motion.div>

              {/* Store Image 2 - Right side */}
              <motion.div
                className="absolute top-[15%] md:top-[20%] right-0 md:-right-4 z-20"
                animate={{
                  y: isHovered ? 40 : 0,
                  x: isHovered ? 30 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/hero/store.png"
                  alt="Store Icon"
                  width={272}
                  height={90}
                  quality={100}
                  className="w-[60px] h-[76px] md:w-[72px] md:h-[91px] object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
