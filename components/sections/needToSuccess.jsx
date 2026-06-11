"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Card from "../ui/Card";
import { MdOutlineStorefront } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { CgCreditCard } from "react-icons/cg";
import { MdOutlineSpeed } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaHandshakeAngle } from "react-icons/fa6";

const NeedToSuccess = () => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const icons = [
    MdOutlineStorefront,
    HiOutlineDevicePhoneMobile,
    CgCreditCard,
    MdOutlineSpeed,
    RiCustomerService2Fill,
    FaHandshakeAngle,
  ];

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
          <h1 className="text-2xl text-[#025049] md:text-5xl font-extrabold ">
            {t("needToSuccess.title")}
          </h1>
          <p className="text-[#353636] text-base mt-3 md:mt-5 md:text-[18px] ">{t("needToSuccess.subtitle")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // تغيير الكلاس هنا: شبكة بعمودين على جميع الشاشات
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-16 mb-3 md:mb-10 mx-auto"
        >
          {t("needToSuccess.items").map((feature, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.div key={index} variants={itemVariants}>
                {/* w-full md:w-[280px] */}
                <Card className="px-2 py-2 sm:px-5 hover:shadow-md shadow-sm shadow-[#0000000D] border border-[#0250491A] md:px-[46px] h-[270px] md:h-[326px]  flex  flex-col justify-center">
                  {/* Icon Container - تصغير الحجم */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-[8px] bg-[#025049] flex items-center justify-center  mb-2 md:mb-4">
                    <Icon
                      className={`text-xl md:text-3xl w-5 h-5 md:w-6 md:h-6 text-white`}
                    />
                  </div>
                  {/* تصغير حجم النص للموبايل */}
                  <h2 className="text-sm md:text-xl  text-[#025049] font-bold mb-1 md:mb-3 ">
                    {feature.title}
                  </h2>
                  <div>
                    <div className="relative">
                      <p
                        className={`text-[#585858] text-[12px] md:text-base md:text-[16px] ${
                          !isExpanded ? "line-clamp-5 md:line-clamp-none" : ""
                        }`}
                      >
                        {feature.description}
                        {!isExpanded && feature.description.length > 200 && (
                          <span className="inline-block">
                            <button
                              onClick={() => setIsExpanded(true)}
                              className="text-[#00A898] font-semibold mr-1 inline"
                            >
                              ...المزيد
                            </button>
                          </span>
                        )}
                      </p>

                      {/* زر إظهار أقل - يظهر فقط عند التوسيع */}
                      {isExpanded && (
                        <button
                          onClick={() => setIsExpanded(false)}
                          className="text-[#00A898] text-[12px] md:text-[14px] font-semibold mt-2 block md:hidden"
                        >
                          إظهار أقل
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default NeedToSuccess;
