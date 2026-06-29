"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);
  const descriptionRef = useRef(null);

  // Translations
  const translations = {
    ar: {
      badge: "التحول الرقمي في السعودية",

      title: `أمتلك منظومة بيع متكاملة.. تبدأ من 7,000 جنيه فقط.`,
      description: `ابدأ البيع أونلاين خلال ايام مع دومين واستضافة مجانية لمدة سنة، بدون اشتراكات او عمولات`,
      cta: "ابدأ متجرك الآن",
      demo: "شاهد النماذج",
      stats1: "مشروع منجز",
      stats2: "دول مختلفة",
      stats3: "عميل سعيد",
    },
    en: {
      badge: "Digital Transformation in Saudi",
      title: "own a complete sales system.. starting from only 7,000 EGP.",
      description:
        "Start selling online within days with a free domain and hosting for one year, with no subscriptions or commissions.",
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

  // Intersection Observer for gap animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentRef = descriptionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="relative flex items-center overflow-hidden py-8 md:py-12 lg:py-16"
    >
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
          {/* Content Container - Removed all motion animations */}
          <div className="w-full lg:w-1/2 flex items-center order-2 md:order-1">
            <div
              className="px-4 md:px-6 lg:px-10 w-full transition-all duration-500 ease-in-out"
              style={{
                transform: isDescriptionHovered
                  ? "translateY(-8px)"
                  : "translateY(0)",
              }}
              onMouseEnter={() => setIsDescriptionHovered(true)}
              onMouseLeave={() => setIsDescriptionHovered(false)}
            >
              {/* Main Title */}
              <h1
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[46px] font-bold mb-2 md:mb-3 text-[#012E29] whitespace-pre-line transition-all duration-500 ease-in-out
                  ${isDescriptionHovered ? "translate-y-[-8px] md:translate-y-[-12px]" : "translate-y-0"}`}
                style={{ lineHeight: "1.4" }}
              >
                {t.title}
              </h1>

           
              <div
                className={` ${isInView ? "mt-6 md:mt-8 lg:mt-10" : ""}
                  ${
                    isDescriptionHovered
                      ? "translate-y-3 md:translate-y-4 opacity-90"
                      : "translate-y-0 opacity-100"
                  } `}
              >
                {/* Description with gap that appears on scroll AND hover effect */}
                <p
                  ref={descriptionRef}
                  className={`mb-6 md:mb-8  text-base sm:text-lg md:text-xl lg:text-[24px] text-[#4A4A4A] transition-all duration-500 ease-in-out
                `}
                  style={{ lineHeight: 1.7 }}
                >
                  {t.description}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-4 md:gap-6 transition-all duration-500 ease-in-out
                 `}
                >
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center bg-gradient-to-br from-[#012E29] to-[#00A898] hover:from-[#012E29] hover:to-[#00A898] justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:-translate-y-2"
                    style={{
                      boxShadow: "0px 4px 15px #00000040",
                      minWidth: "180px",
                    }}
                  >
                    {t.cta}
                  </button>
                  <a
                    href="#projects"
                    className="flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-lg bg-white text-[#012E29] font-semibold transition-all duration-300 hover:scale-95 text-base md:text-lg"
                  >
                    {t.demo}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Container for images - same height as content */}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center order-1 md:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center py-8 md:py-12">
              {/* Main Image */}
              <div
                className="relative z-10 w-full max-w-[500px] md:max-w-[600px] lg:max-w-[900px] mx-auto transition-all duration-700 ease-in-out"
                style={{
                  transform: isHovered ? "translateY(-15px)" : "translateY(0)",
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
              </div>

              {/* Store Image 1 - Left side */}
              <div
                className="absolute top-[55%] md:top-[60%] left-0 md:-left-4 z-20 transition-all duration-700 ease-in-out"
                style={{
                  transform: isHovered ? "translateY(-40px)" : "translateY(0)",
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
              </div>

              {/* Store Image 2 - Right side */}
              <div
                className="absolute top-[15%] md:top-[20%] right-0 md:-right-4 z-20 transition-all duration-700 ease-in-out"
                style={{
                  transform: isHovered
                    ? "translateY(40px) translateX(20px)"
                    : "translateY(0) translateX(0)",
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
