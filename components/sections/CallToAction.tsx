// components/CallToAction.tsx (نسخة مبسطة بدون إحصائيات)
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function CallToAction() {
  const { language, t } = useLanguage();

  return (
    <div className="m-6 md:my-14">
      <section className="container rounded-3xl  px-4 my-5 mx-auto relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#012E29] to-[#025049]">
        {/* الدائرة اليمنى - حدود فقط */}
        <div className="absolute bottom-1 right-0 md:top-32 md:right-32 w-48 h-48 md:w-[250px] md:h-[250px] lg:w-[448px] lg:h-[392px]  rounded-[9999px] opacity-40 md:opacity-75 border-[4px] border-[#FFFFFF20]" />

        {/* الدائرة اليسرى - حدود فقط */}
        <div className="absolute top-0 left-0 md:top-14 md:left-32 w-48 h-48 md:w-[250px] md:h-[250px] lg:w-[320px] lg:h-[264px] rounded-[9999px] opacity-40 md:opacity-75 border-[4px] border-[#FFFFFF20] " />

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
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              {language === "ar"
                ? "توقف عن دفع العمولات والاشتراكات الشهرية. وابدأ بزيادة أرباحك"
                : "Stop paying commissions and monthly subscriptions. Start increasing your profits"}
            </h2>

            {/* الوصف */}
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              {language === "ar"
                ? "انضم لمئات التجار الذين وضعوا ثقتهم في T CARTS. ابدأ ببناء متجرك الآن واستمتع بمنظومة بيع متكاملة، بدون عمولات او اشتراك شهري، وبدعم فني يقف معك خطوة بخطوة"
                : "Join hundreds of merchants who have placed their trust in T CARTS. Start building your store now and enjoy an integrated selling system, no commissions or monthly subscriptions, with technical support that stands with you step by step"}
            </p>

            {/* الزر */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link
                href="/contact"
                className="inline-flex text-sm md:text-[18px] text-semibold items-center shadow-[#00000040] gap-3 bg-gradient-to-r from-[#E2FFFA] to-white text-[#025049]  px-8 py-4 md:px-10 md:py-5 rounded-xl font-bold   transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span>
                  {language === "ar"
                    ? "ابدأ رحلة نجاحك الآن"
                    : "Start Your Success Journey Now"}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
