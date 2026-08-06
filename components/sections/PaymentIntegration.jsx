"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
// import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";

const PaymentIntegration = () => {
  const { language } = useLanguage();
  //   const { whatsappNumber } = useCountry();
  const [isHovered, setIsHovered] = useState(false);

  // Translations
  const translations = {
    ar: {
      title: `تكامل مع أشهر طرق الدفع`,
      description: `كل ما تحتاجه لإتمام عمليات البيع والدفع... في تكامل واحد يسهل إدارة أعمالك`,

      cta: "ابدأ متجرك الآن",
      demo: "شاهد النماذج",
      stats1: "مشروع منجز",
      stats2: "دول مختلفة",
      stats3: "عميل سعيد",
    },
    en: {
      title: "Integration with Leading Payment Methods",
      description:
        "Everything you need to complete sales and payments... in one integration that simplifies your business management",

      cta: "Start Your Store Now",
      demo: "View Our Work",
      stats1: "Projects Completed",
      stats2: "Different Countries",
      stats3: "Happy Clients",
    },
  };

  const t = translations[language];

  //   const handleWhatsAppClick = () => {
  //     const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
  //     const message = language === "ar"
  //       ? "السلام عليكم، أود الحصول على ابدأ متجرك الآن لمشروعي الرقمي"
  //       : "Hello, I would like to get a Start Your Store Now for my digital project";

  //     const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  //     window.open(whatsappUrl, "_blank");
  //   };

  // Payment methods icons
  const paymentMethods = [
    { id: 1, name: "Visa", icon: "/images/payment/visa.png" },
    { id: 2, name: "Mastercard", icon: "/images/payment/meza.png" },
    { id: 3, name: "Mada", icon: "/images/payment/credit.png" },
    { id: 4, name: "Apple Pay", icon: "/images/payment/valu.png" },
    { id: 5, name: "Google Pay", icon: "/images/payment/stc.png" },
    { id: 6, name: "STC Pay", icon: "/images/payment/cash.png" },
    { id: 7, name: "tamara", icon: "/images/payment/tamara.png" },
    { id: 8, name: "tabby", icon: "/images/payment/tabby.png" },
    { id: 9, name: "apple Pay", icon: "/images/payment/apple_pay.png" },
  ];

  return (
    <section className="relative flex items-center overflow-hidden py-8 md:py-12 lg:py-16">
      {/* Gradient Background - from top-right (light) to bottom-left (dark) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#021A1A] via-[#0A3A3A] to-[#021A1A]  z-0" />
      
     

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0 md:gap-12">
          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center order-2 lg:order-1"
          >
            <div className="px-4 md:px-6 lg:px-10 w-full">
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] font-bold mb-4 text-white whitespace-pre-line"
                style={{ lineHeight: "1.7" }}
              >
                {t.title}
              </motion.h1>

              {/* Description with features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 md:mb-8"
              >
                <p
                  className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed"
                  style={{ lineHeight: 1.6 }}
                >
                  {t.description}
                </p>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
              >
                <motion.div 
                  className="bg-[#FFFFFF1A] flex items-center gap-2 rounded-lg px-6 py-2 border border-[#FFFFFF1A] backdrop-blur-sm cursor-pointer"
                  whileHover={{
                    y: -10,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <GoCheckCircleFill className="text-[#22C55E] flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white">
                    {language === "ar" ? "معاملات آمنة" : "Secure Transactions"}
                  </h3>
                </motion.div>

                <motion.div 
                  className="bg-[#FFFFFF1A] flex items-center gap-2 rounded-lg px-6 py-2 border border-[#FFFFFF1A] backdrop-blur-sm cursor-pointer"
                  whileHover={{
                    y: -10,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <GoCheckCircleFill className="text-[#22C55E] flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white">
                    {language === "ar" ? "معالجة سريعة" : "Fast Processing"}
                  </h3>
                </motion.div>

                <motion.div 
                  className="bg-[#FFFFFF1A] flex items-center gap-2 rounded-lg px-6 py-2 border border-[#FFFFFF1A] backdrop-blur-sm cursor-pointer"
                  whileHover={{
                    y: -10,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <GoCheckCircleFill className="text-[#22C55E] flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white">
                    {language === "ar" ? "خيارات دفع متعددة" : "Multiple Payment Options"}
                  </h3>
                </motion.div>
              </motion.div>

              {/* Buttons */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
              >
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="flex items-center bg-[#068377] hover:bg-[#056b60] justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg transition-colors duration-300"
                  style={{
                    boxShadow: "0px 4px 15px #00000040",
                    minWidth: "180px",
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {t.cta}
                </motion.button>
              </motion.div> */}
            </div>
          </motion.div>

          {/* Image Container - Grid of 6 payment methods */}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center order-2 lg:order-2"
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center py-8 md:py-12">
              <motion.div
                className="relative z-10 w-full max-w-[400px] md:max-w-[500px] mx-auto"
                animate={{
                  y: isHovered ? -15 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                {/* Grid of 6 images - 3 rows of 2 columns */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      className="relative mb-7 lg:mb-0 flex items-center justify-center gap-3 lg:gap-6 py-1 lg:py-6 cursor-pointer"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{
                        y: -10,
                        // scale: 1.05,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <div className="w-[90%] mx-auto h-12 md:h-16 relative flex items-center justify-center">
                        <Image
                          src={method.icon}
                          alt={method.name}
                          width={800}
                          height={500}
                          className="object-cover w-full h-auto"
                          quality={90}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentIntegration;