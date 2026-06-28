// components/CallToAction.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaWhatsapp } from "react-icons/fa";

export function CallToAction() {
  const { language, t } = useLanguage();

  // رقم الواتساب - يمكنك تغيير الرقم هنا
  const whatsappNumber = "201234567890"; // استبدل برقم الواتساب الخاص بك
  const whatsappMessage = language === "ar" 
    ? "مرحباً، أرغب في الاستفسار عن خدمات T Carts" 
    : "Hello, I would like to inquire about T Carts services";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // دالة لفتح الواتساب
  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="contact" className="m-6 md:my-14 container px-4 md:px-8 mx-auto">
      <section className="my-5 rounded-3xl relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#012E29] to-[#025049]">
        {/* الدائرة اليمنى - حدود فقط */}
        <div className="absolute bottom-1 right-0 md:top-32 md:right-32 w-48 h-48 md:w-[250px] md:h-[250px] lg:w-[448px] lg:h-[392px] rounded-[9999px] opacity-40 md:opacity-75 border-[4px] border-[#FFFFFF20]" />

        {/* الدائرة اليسرى - حدود فقط */}
        <div className="absolute top-0 left-0 md:top-14 md:left-32 w-48 h-48 md:w-[250px] md:h-[250px] lg:w-[320px] lg:h-[264px] rounded-[9999px] opacity-40 md:opacity-75 border-[4px] border-[#FFFFFF20]" />

        {/* المحتوى */}
        <div className="relative container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* العنوان الرئيسي */}
         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 ">
  {language === "ar"
    ? `احصل علي منظومة بيع متكاملة 
وابدأ البيع باحترافية`
    : "Get an integrated selling system and start selling professionally"}
</h2>

{/* الوصف */}
<p className="text-base md:text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
  {language === "ar"
    ? `متجر إلكتروني متكامل مع أدوات الدفع والشحن 
وإدارة الطلبات لمساعدتك على تنمية أعمالك.`
    : "A fully integrated online store with payment and shipping tools, and order management to help you grow your business."}
</p>
            {/* الزر */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex text-sm md:text-[18px] text-semibold items-center shadow-[#00000040] gap-3 bg-gradient-to-r from-[#E2FFFA] to-white text-[#025049] px-8 py-4 md:px-10 md:py-5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                {/* <FaWhatsapp className="text-[#25D366] text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" /> */}
                <span>
                  {language === "ar"
                    ? "ابدأ رحلة نجاحك الآن"
                    : "Start Your Success Journey Now"}
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}