"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Card from "../ui/Card";
import { FaMoneyBills } from "react-icons/fa6";
import { TbClipboardList } from "react-icons/tb";
import { SlClock } from "react-icons/sl";
import { GoDatabase } from "react-icons/go";
import { GrBundle } from "react-icons/gr";
const Features = () => {
  const { t } = useLanguage();
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();

  const icons = [FaMoneyBills, GrBundle, SlClock, GoDatabase];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
    const message =
      t("features.consultation.message") ||
      (language === "ar"
        ? "السلام عليكم، أود الحصول على استشارة تقنية مجانية لمشروعي"
        : "Hello, I would like to get a free technical consultation for my project");

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="about" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-16"
        >
          <h1 className="text-xl text-[#025049] md:text-3xl font-bold">
            {t("features.title")}
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // تغيير الكلاس هنا: شبكة بعمودين على جميع الشاشات
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-16 mb-3 md:mb-10 mx-auto"
        >
          {t("features.items").map((feature, index) => {
            const Icon = icons[index % icons.length];
            
            return (
              <motion.div key={index} variants={itemVariants}>
                {/* w-full md:w-[280px] */}
                <Card className="px-2 py-2 sm:px-5  md:px-[46px] h-[300px] md:h-96  flex  flex-col justify-center">
                  {/* Icon Container - تصغير الحجم */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ECF6FF] flex items-center justify-center  mb-2 md:mb-4">
                    <Icon className={`text-xl md:text-3xl w-5 h-5 md:w-6 md:h-6 text-[#025049]`} />
                  </div>
                  {/* تصغير حجم النص للموبايل */}
                  <h2 className="text-sm md:text-xl  text-[#025049] font-bold mb-1 md:mb-3 ">{feature.title}</h2>
                  <p className="text-[#585858] text-sm md:text-base md:text-[16px] line-clamp-none">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

  
      </div>
    </section>
  );
};

export default Features;