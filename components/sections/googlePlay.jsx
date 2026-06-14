"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const GooglePlay = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [isHovered, setIsHovered] = useState(false);

  // Translations
  const translations = {
    ar: {
      badge: `أداء أسرع لنمو أكبر.. لوحة تحكم ذكية تمنحك الرؤية الكاملة للتوسع.`,
      title: ` استمتع بحرية الإدارة الكاملة لمتجرك 
عبر تطبيق جوال سهل وسريع`,
      description: ` كن أول من يعلم بكل أوردر جديد يصل لمتجرك.
استمتع بحرية الإدارة الكاملة لمتجرك عبر تطبيق جوال سهل وسريع. تابع أداء مبيعاتك، حدّث حالات الطلبات بضغطة زر.`,
      cta: "حمل التطبيق",
    },
    en: {
      badge: "Digital Transformation in Saudi",
      title:
        "We develop your goals.. in a language that Saudi digital transformation reality understands",
      description:
        "Turn your idea into a successful digital project with Tawajood. We have designed more than 100 projects in 10 different countries (Restaurant apps, beauty clinics, real estate, meat stores, taxi, car rental, auctions, sports, and various other fields)",
      cta: "Download APP",
    },
  };

  const t = translations[language];

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
    const message =
      language === "ar"
        ? "السلام عليكم، أود الحصول على ابدأ متجرك الآن لمشروعي الرقمي"
        : "Hello, I would like to get a free consultation for my digital project";

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative flex items-center overflow-hidden py-8 md:py-12 lg:py-16 ">
      <div className="container mx-auto px-4 relative z-10 bg-gradient-to-b rounded-3xl from-[#549679] to-[#03504A]">
        <div className="flex flex-col lg:flex-row items-center justify-between  gap-8 md:gap-12">
          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center "
          >
            <motion.div className="px-4 md:px-6 lg:px-10 w-full ">
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-center pt-2 md:pt-0 md:text-start md:text-4xl lg:text-5xl xl:text-[40px] font-bold mb-4  text-white md:whitespace-pre-line"
                style={{ lineHeight: "1.7" }}
              >
                {t.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-[24px] text-white mb-2 md:mb-5 leading-relaxed"
                style={{ lineHeight: 1.6 }}
              >
                {t.description}
              </motion.p>

              {/* Buttons */}
              <p className="text-white font-bold mb-2 text-base md:text-xl md:mb-3">
                {t.cta}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex  gap-4 md:gap-6"
              >
                <Link href="/" aria-label="down load app">
                  <Image
                    src="/images/download/appstore.png"
                    alt="appstore"
                    width={135}
                    height={40}
                  />
                </Link>
                <Link href="/" aria-label="down load app">
                  <Image
                    src="/images/download/playstore.png"
                    alt="playstore"
                    width={135}
                    height={40}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Container for images - same height as content */}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center py-3">
              {/* Main Image */}
              <motion.div
                className="relative z-10 w-full max-w-[500px]  mx-auto"
                animate={{
                  y: isHovered ? -15 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/download/down.png"
                  alt="Hero Image"
                  width={502}
                  height={428}
                  quality={100}
                  className="w-full h-auto object-contain"
                  priority
                />
              </motion.div>

              {/* Store Image 1 - Left side */}
              <motion.div
                className="absolute top-[55%] md:top-[50%] left-0 md:left-24 z-20"
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
                  width={72}
                  height={91}
                  quality={100}
                  className="w-[60px] h-[76px] md:w-[72px] md:h-[91px] object-contain"
                />
              </motion.div>

              {/* Store Image 2 - Right side */}
              <motion.div
                className="absolute top-[10%] md:top-[40%] right-0 md:right-24 z-20"
                animate={{
                  y: isHovered ? 40 : 0,
                  x: isHovered ? 20 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/hero/store.png"
                  alt="Store Icon"
                  width={72}
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

export default GooglePlay;
