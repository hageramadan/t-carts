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
  const [hoveredButton, setHoveredButton] = useState(null);

  // Translations
  const translations = {
    ar: {
      title: `إدارة متجرك من أي مكان`,
      description: `تابع نشاط متجرك لحظة بلحظة من خلال تطبيق T-CARTS`,
      list1: "متابعه الطلبات",
      list2: "إشعارات فورية",
      list3: "إدارة من أي مكان",
      cta: "حمل التطبيق",
    },
    en: {
      title: "Manage your store from anywhere",
      description: "Track your store activity in real-time through the T-CARTS app",
      list1: "Order tracking",
      list2: "Instant notifications",
      list3: "Manage from anywhere",
      cta: "Download APP",
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
    <section id="application" className="container mx-auto px-4 md:px-8 relative flex items-center overflow-hidden py-8 md:py-12 lg:py-16">
      <div className="relative z-10 bg-gradient-to-b rounded-3xl from-[#549679] to-[#03504A] p-5 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center order-2 md:order-1"
          >
            <motion.div className=" w-full pb-3">
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-center pt-2 md:pt-0 md:text-start md:text-2xl lg:text-3xl xl:text-[32px] font-bold mb-4 text-white md:whitespace-pre-line"
                style={{ lineHeight: "1.7" }}
              >
                {t.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-base  md:text-xl lg:text-[24px] text-white mb-2 md:mb-5 "
                style={{ lineHeight: 1.6 }}
              >
                {t.description}
              </motion.p>

              {/* List Section - Added here */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-white mb-2 md:mb-5 space-y-2"
              >
                <li className="flex items-start gap-3 text-base sm:text-lg md:text-xl">
                  <span className="text-white mt-1.5 md:mt-2">•</span>
                  <span>{t.list1}</span>
                </li>
                <li className="flex items-start gap-3 text-base sm:text-lg md:text-xl">
                  <span className="text-white mt-1.5 md:mt-2">•</span>
                  <span>{t.list2}</span>
                </li>
                <li className="flex items-start gap-3 text-base sm:text-lg md:text-xl">
                  <span className="text-white mt-1.5 md:mt-2">•</span>
                  <span>{t.list3}</span>
                </li>
              </motion.ul>

              {/* Buttons */}
              <p className="text-white font-bold mb-2 text-base md:text-xl md:mb-3">
                {t.cta}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 md:gap-6"
              >
                {/* App Store Button */}
                <motion.div
                  animate={{
                    y: hoveredButton === "appstore" ? -10 : 0,
                    scale: hoveredButton === "appstore" ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  onMouseEnter={() => setHoveredButton("appstore")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Link href="/" aria-label="download app">
                    <Image
                      src="/images/download/appstore.png"
                      alt="appstore"
                      width={135}
                      height={40}
                      className="transition-all duration-300"
                    />
                  </Link>
                </motion.div>

                {/* Play Store Button */}
                <motion.div
                  animate={{
                    y: hoveredButton === "playstore" ? -10 : 0,
                    scale: hoveredButton === "playstore" ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  onMouseEnter={() => setHoveredButton("playstore")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Link href="/" aria-label="download app">
                    <Image
                      src="/images/download/playstore.png"
                      alt="playstore"
                      width={135}
                      height={40}
                      className="transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Container for images - same height as content */}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center order-1 md:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center py-3">
              {/* Main Image */}
              <motion.div
                className="relative z-10 max-w-[300px] md:max-w-[800px] mx-auto"
                animate={{
                  y: isHovered ? -15 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <div className="max-w-[300px] md:max-w-[500px] mx-auto">
                    <Image
                  src="/images/download/download.png"
                  alt="Hero Image"
                  width={1202}
                  height={428}
                  quality={100}
                  className="w-full object-contain"
                  priority
                />
                </div>
              
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GooglePlay;