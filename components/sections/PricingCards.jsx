// components/sections/PricingCards.jsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import { translations } from "@/translations";
import { GoCheckCircleFill } from "react-icons/go";
import { FaCrown } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRef } from "react";

// مكون البطاقة الفردية
const PricingCard = ({ data, isHighlighted, index, lang = "ar" }) => {
  // تحديد إذا كان الكارت الثالث (index === 2)
  const isThirdCard = index === 2;
  const { whatsappNumber } = useCountry();

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.1 }}
      viewport={{ once: true }}
      className={`
        relative flex flex-col rounded-2xl p-3 md:p-8 
        transition-all duration-100 
        items-center
        ${
          isHighlighted
            ? "bg-gradient-to-br from-[#4D9075] to-[#1C6544] shadow-xl hover:shadow-2xl mt-0 lg:-mt-10"
            : "bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg"
        }
        hover:shadow-2xl
        w-full max-w-sm mx-auto
        group
        h-full
        min-h-[300px] md:min-h-[400px]
      `}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* البادج */}
      {data.badge && (
        <div
          className={`
          absolute -top-3  ${lang === "ar" ? "right-1/3 lg:right-1/3" : "left-1/3 lg:left-1/3"} 
          bg-[#EF8913] text-white  
          px-4 lg:px-8 py-0.5 lg:py-1 rounded-2xl shadow-lg text-[10px] lg:text-base
          flex items-center gap-1.5 
          z-10
        `}
        >
          <span>{data.badge}</span>
        </div>
      )}

      {/* اسم الباقة */}
      <h3 className={`text-sm lg:text-2xl font-semibold my-0.5 lg:my-4 ${isHighlighted ? "text-white" : "text-[#05796B]"}`}>
        {data.name}
      </h3>

      {/* العنوان الفرعي */}
      <div className={`flex items-center gap-1.5 text-white ${isHighlighted ? "bg-white/20" : "bg-[#38CB89]"} p-1.5 lg:p-3 w-fit mb-1 lg:mb-3 rounded-xl`}>
        <span className="text-[10px] lg:text-base">{data.subhead}</span>
      </div>

      {/* السعر */}
      <div className="flex flex-col items-center gap-0 lg:gap-3 mb-0 lg:mb-4">
        <span className={`text-[10px] lg:text-2xl ${isHighlighted ? "text-white/60" : "text-[#3f494783]"} line-through`}>
          {data.oldPrice}
          {data.currency}
        </span>
        <span className={`text-xl md:text-4xl font-bold ${isHighlighted ? "text-white" : "text-[#191C1F]"} flex gap-0.5 lg:gap-2`}>
          <span className="text-xl md:text-4xl lg:text-[50px]">
            {data.price}
          </span>
          <span className="text-xs lg:text-base">{data.currency}</span>
        </span>
      </div>

      {/* رسوم - الكارت الثالث خلفية خضراء فاتحة */}
      <div className={`text-[10px] lg:text-sm font-medium shadow-md px-2.5 lg:px-4 py-1 lg:py-2 rounded-2xl w-fit my-2 lg:my-4
        ${
          isHighlighted 
            ? "bg-white/20 text-white" 
            : isThirdCard 
              ? "bg-[#38CB89] text-white" 
              : "bg-[#A6A6A621]"
        }
      `}>
        {data.feeNote}
      </div>
      <hr className={`my-2 lg:my-4 ${isHighlighted ? "border-white/20" : "border-[#8593A329]"} h-1 lg:h-2 w-full`} />
      
      {/* قائمة المميزات */}
      <ul className="space-y-2 lg:space-y-4 flex-1 mb-3 lg:mb-6 w-full">
        {data.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-center gap-1.5 lg:gap-2.5 text-[10px] lg:text-sm"
          >
            <GoCheckCircleFill className={`${isHighlighted ? "text-white/80" : "text-[#05796B]"} w-3 h-3 lg:w-5 lg:h-5 flex-shrink-0`} />
            <span className={`text-xs lg:text-base font-medium ${isHighlighted ? "text-white" : "text-[#475156]"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* الزر - يفتح الواتساب */}
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center gap-1.5 lg:gap-2
          w-full py-1.5 lg:py-3.5 px-3 lg:px-6 rounded-2xl font-semibold text-[12px] lg:text-base
          transition-all duration-300
          ${
            isHighlighted
              ? "bg-white text-[#1C6544] hover:bg-gray-100 shadow-lg"
              : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-600 hover:text-white"
          }
        `}
      >
        {data.buttonText}
        <FaArrowLeftLong className="text-[12px] lg:text-base" />
      </motion.button>
    </motion.div>
  );
};

// المكون الرئيسي
export default function PricingCards() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ar;
  const lang = language;
  const scrollRef = useRef(null);

  // جلب البيانات من ملف الترجمة
  const pricingData = t.pricing;

  // بيانات افتراضية في حالة عدم وجود بيانات في الترجمة
  const defaultData = {
    mainTitle:
      lang === "ar"
        ? "اختر الباقة المناسبة لعملك"
        : "Choose the Right Plan for Your Business",
    subTitle:
      lang === "ar"
        ? "خطط مرنة تبدأ من 7000 جنيه مع مميزات استثنائية"
        : "Flexible plans starting from 7000 EGP with exclusive features",
    cards: {
      basic: {
        id: "basic",
        name: lang === "ar" ? "الباقة الأساسية" : "Basic Plan",
        badge: null,
        subhead:
          lang === "ar" ? "🔥 خصومات لفترة محدودة" : "🔥 Limited time offers",
        price: "7000",
        currency: lang === "ar" ? "جنيه" : "EGP",
        oldPrice: "10,000",
        feeNote: lang === "ar" ? "بدون رسوم خفيفة" : "No hidden fees",
        features:
          lang === "ar"
            ? [
                "متجر إلكتروني ",
                "دومين مجاني لمدة سنة",
                "استضافة مجاني لمدة سنة",
              ]
            : [
                "online store",
                "Free domain for 1 year",
                "Free hosting for 1 year",
              ],
        buttonText: lang === "ar" ? " ابدأ الآن  " : "Start Now",
      },
      growth: {
        id: "growth",
        name: lang === "ar" ? "باقة النمو" : "Growth Plan",
        badge: lang === "ar" ? "الأكثر اختيارًا" : "Most Popular",
        subhead:
          lang === "ar" ? "🔥 خصومات لفترة محدودة" : "🔥 Limited time offers",
        price: "10,000",
        currency: lang === "ar" ? "جنيه" : "EGP",
        oldPrice: "13,000",
        feeNote: lang === "ar" ? "بدون رسوم خفيفة" : "No hidden fees",
        features:
          lang === "ar"
            ? [
               "جميع مزايا الباقة الأساسية",
               "ربط بوابة دفع ",
               "ربط شركة شحن",
               "تقارير  متقدمة",
              ]
            : [
  "All Basic plan features",
  "Payment gateway integration",
  "Shipping company integration",
  "Advanced reports & analytics"
],
         buttonText: lang === "ar" ? " ابدأ الآن  " : "Start Now",
      },
      professional: {
        id: "professional",
        name: lang === "ar" ? "الباقة الاحترافية" : "Professional Plan",
        badge: null,
        subhead:
          lang === "ar" ? "🔥 خصومات لفترة محدودة" : "🔥 Limited time offers",
        price: "12,000",
        currency: lang === "ar" ? "جنيه" : "EGP",
        oldPrice: "16,000",
        feeNote: lang === "ar" ? "بدون رسوم خفيفة" : "No hidden fees",
        features:
          lang === "ar"
            ? [
                "جميع مزايا باقة النمو",
                "تطبيق إدارة متكامل",
               `أولوية الدعم`,
                `إعدادات تسويقية متقدمة`,
                "استشارات نمو "
              ]
            : [
  "All Growth plan features",
  "Integrated management app",
  "Priority technical support",
  "Advanced marketing tools",
  "Growth & development consulting"
],
       buttonText: lang === "ar" ? " ابدأ الآن  " : "Start Now",
      },
    },
  };

  // استخدام البيانات من الترجمة أو الافتراضية
  const mainTitle = pricingData?.mainTitle || defaultData.mainTitle;

  const getCardData = (key) => {
    const data = pricingData?.cards?.[key];
    if (data && data.id && data.name) {
      return data;
    }
    return defaultData.cards[key];
  };

  const cardEntries = [
    { data: getCardData("basic"), isHighlighted: false },
    { data: getCardData("growth"), isHighlighted: true },
    { data: getCardData("professional"), isHighlighted: false },
  ];

  // دالة لتلوين كلمة "المناسبة" أو "Right" داخل العنوان
  const renderHighlightedTitle = (text) => {
    if (lang === "ar") {
      // للعربية: تلوين كلمة "المناسبة"
      const parts = text.split("المناسبة");
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <span style={{ color: "#38CB89" }}>المناسبة</span>
            {parts[1]}
          </>
        );
      }
      return text;
    } else {
      // للإنجليزية: تلوين كلمة "Right"
      const parts = text.split("Right");
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <span style={{ color: "#38CB89" }}>Right</span>
            {parts[1]}
          </>
        );
      }
      return text;
    }
  };

  return (
    <section id="subscrip" className="py-16 px-4 md:px-8 lg:py-12" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="text-center mb-8 lg:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-extrabold text-[#025049] mb-2"
        >
          {renderHighlightedTitle(mainTitle)}
        </motion.h2>
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden lg:grid container mx-auto grid-cols-3 gap-4 lg:gap-5 items-start pt-12">
        {cardEntries.map((entry, index) => (
          <PricingCard
            key={entry.data.id}
            data={entry.data}
            isHighlighted={entry.isHighlighted}
            index={index}
            lang={lang}
          />
        ))}
      </div>

      {/* Mobile View - 3 cards stacked vertically with reduced height */}
      <div className="lg:hidden container mx-auto px-10">
        <div className="flex flex-col gap-7 max-w-xs mx-auto">
          {cardEntries.map((entry, index) => (
            <div key={entry.data.id} className="w-full mx-auto">
              <PricingCard
                data={entry.data}
                isHighlighted={entry.isHighlighted}
                index={index}
                lang={lang}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}