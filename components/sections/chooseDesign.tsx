"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Link from "next/link";
import { IoLinkOutline } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";

// بيانات التصاميم (بدون نصوص ثابتة)
const designsData = [
  {
    id: 1,
    image: "/images/chooseDesign/d1.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: "chooseDesign.badge.mostUsed",
    badgeColor: "bg-[#FF7700]",
  },
  {
    id: 2,
    image: "/images/chooseDesign/d2.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: "chooseDesign.badge.professional",
    badgeColor: "bg-[#38CB89]",
  },
  {
    id: 3,
    image: "/images/chooseDesign/d3.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: null,
  },
  {
    id: 4,
    image: "/images/chooseDesign/d4.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: null,
  },
  {
    id: 5,
    image: "/images/chooseDesign/d5.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: null,
  },
  {
    id: 6,
   image: "/images/chooseDesign/d6.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: "chooseDesign.badge.mostUsed",
    badgeColor: "bg-[#FF7700]",
  },
];

// مكون البادج
const Badge = ({ text, color }: { text: string; color: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className={`absolute top-3 right-3 z-10 ${color} text-white px-3 py-1.5 rounded-[8px] text-xs md:text-sm font-semibold shadow-md`}
    >
      {text}
    </motion.div>
  );
};

// مكون الكارت الواحد مع الترجمة
const Card = ({ 
  image, 
  title, 
  description, 
  buttonText, 
  badgeText, 
  badgeColor,
  language,
  index
}: {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  badgeText: string | null;
  badgeColor?: string;
  language: string;
  index: number;
}) => {
  const { whatsappNumber } = useCountry();
  const [isHovered, setIsHovered] = useState(false);

  // روابط المعاينة لكل مشروع
  const previewLinks = [
    "https://clothes-gray-nu.vercel.app/",
    "https://mobelia.vercel.app/",
    "https://matjar-beryl.vercel.app/",
    "https://beauty-eight-dun.vercel.app/",
    "https://education-nu-gray.vercel.app/",
    "https://fruits-snowy.vercel.app/"
  ];

  const projectLink = previewLinks[index] || previewLinks[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -15, scale: 1.02 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col w-full group h-auto lg:min-w-[384px] lg:min-h-[593px] border border-[#E4E7E9] hover:shadow-2xl rounded-2xl overflow-hidden bg-white mx-auto relative"
      dir={language === "ar" ? "rtl" : "ltr"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* حاوية الصورة */}
      <motion.div 
        className="w-full lg:h-[384px] relative flex-shrink-0 overflow-hidden"
      >
        <motion.div
          animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <Image
            src={image}
            alt={title}
            width={684}
            height={684}
            className="object-cover w-full h-full"
          />
        </motion.div>
        
        {/* البادج - نص مترجم */}
        {badgeText && (
          <Badge text={badgeText} color={badgeColor || "bg-gray-500"} />
        )}
        
        {/* Overlay عند الهوفر */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </motion.div>

      {/* المحتوى النصي والأزرار */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1 + 0.2,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
        className="flex flex-col flex-grow p-2 py-3 md:px-4 md:py-6 justify-between"
      >
        <div className="text-center relative">
          {/* العنوان */}
          <motion.h3 
            animate={isHovered ? { color: "#05645C" } : { color: "#191C1F" }}
            transition={{ duration: 0.3 }}
            className="text-[14px] md:text-[20px] font-bold text-center mb-1 md:mb-4"
          >
            {title}
          </motion.h3>

          {/* الوصف */}
          <motion.p 
            animate={isHovered ? { y: -5, opacity: 0.8 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[12px] md:text-[18px] mb-2 text-[#838383] text-center leading-relaxed"
          >
            {description}
          </motion.p>
          
          {/* زر المعاينة */}
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[-4rem] left-1/3 -translate-x-1/2"
          >
            <Link 
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="go to website" 
              className="flex items-center gap-3 bg-[#03645B] text-white justify-center w-fit px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-base md:text-lg">
                {language === "ar" ? "معاينة" : "Preview"}
              </span> 
              <motion.div
                animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
              >
                <IoLinkOutline className="w-5 h-5 md:w-7 md:h-7"/>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* الزر السفلي - يفتح الواتساب */}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0px 8px 20px rgba(5, 100, 92, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
          }}
          className="
          w-full
          text-sm
          md:text-[18px]
            lg:w-[352px] 
            md:h-[60px] 
            rounded-[8px]
            md:rounded-2xl 
            border 
            border-[#05645C] 
            md:px-8 
            px-2
            md:py-4 
            py-2
            text-[#05645C] 
            font-medium 
            hover:bg-gradient-to-br from-[#012E29] to-[#00A898]
            hover:text-white 
            transition-all 
            duration-300 
            shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-[#05645C]
            focus:ring-opacity-50
            mx-auto
          "
          style={{ boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default function ChooseDesign() {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // جلب البيانات المترجمة للتصاميم (بما في ذلك البادجات)
  const getTranslatedDesigns = () => {
    return designsData.map((design) => ({
      ...design,
      title: t(`chooseDesign.${design.id}.title`),
      description: t(`chooseDesign.${design.id}.description`),
      buttonText: t(design.buttonTextKey),
      badgeText: design.badgeKey ? t(design.badgeKey) : null,
    }));
  };

  const translatedDesigns = getTranslatedDesigns();

  return (
    <div id="projects" className="py-8 px-4 sm:px-6 lg:px-8" dir={language === "ar" ? "rtl" : "ltr"}>
      
      {/* القسم العلوي مع العناوين */}
      <div className="container mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* العنوان الرئيسي */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#025049] mb-4"
          >
            {t("chooseDesign.mainTitle")}
          </motion.h1>
          
          {/* الوصف الأول */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-[#353636] max-w-3xl mx-auto my-6 leading-relaxed"
          >
            {t("chooseDesign.description1")}
          </motion.p>
          
          {/* الوصف الثاني */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="text-xs md:text-lg font-semibold text-white bg-gradient-to-b py-2 rounded-full from-[#38CB89] to-[#419F75] max-w-2xl mx-auto"
          >
            {t("chooseDesign.description2")}
          </motion.div>
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* السلايدر للشاشات الصغيرة (موبايل) */}
      {/* ============================================ */}
      {isMobile && (
        <div className="block lg:hidden container mx-auto relative px-1">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              ref={scrollRef}
              className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth gap-4 px-6 pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {translatedDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[280px] max-w-[280px] snap-start flex-shrink-0"
                >
                  <Card
                    image={design.image}
                    title={design.title}
                    description={design.description}
                    buttonText={design.buttonText}
                    badgeText={design.badgeText}
                    badgeColor={design.badgeColor}
                    language={language}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ============================================ */}
      {/* الشبكة للشاشات الكبيرة (تابلت + ديسكتوب) */}
      {/* ============================================ */}
      {!isMobile && (
        <div className="hidden lg:block container mx-auto px-1 md:px-8">
          <div className="grid gap-4 md:gap-8 lg:gap-14 justify-center grid-cols-2 xl:grid-cols-3">
            {translatedDesigns.map((design, index) => (
              <Card
                key={design.id}
                image={design.image}
                title={design.title}
                description={design.description}
                buttonText={design.buttonText}
                badgeText={design.badgeText}
                badgeColor={design.badgeColor}
                language={language}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}