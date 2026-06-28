"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Card from "../ui/Card";
import { MdOutlineStorefront } from "react-icons/md";

import { CgCreditCard } from "react-icons/cg";
import { MdOutlineSpeed } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaHandshakeAngle } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { LuBadgeCheck } from "react-icons/lu";
import { BsTruck } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

// ✅ إضافة interface لنوع البيانات
interface FeatureItem {
  title: string;
  description: string;
}

const NeedToSuccess = () => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const icons = [
    HiOutlineCurrencyDollar,
    LuBadgeCheck,
    BsTruck,
    HiOutlineClipboardList,
    RiShieldKeyholeLine,
    HiOutlineDevicePhoneMobile,
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

  // دوال السحب (Drag)
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ✅ جلب البيانات مع تحديد النوع
  const features: FeatureItem[] = t("needToSuccess.items") as FeatureItem[];

  return (
    <section id="about" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-16"
        >
          <h1 className="text-2xl text-[#025049] md:text-4xl font-extrabold">
            {t("needToSuccess.title")}
          </h1>
          <p className="text-[#353636] text-base mt-3 md:mt-5 md:text-[18px]">
            {t("needToSuccess.subtitle")}
          </p>
        </motion.div>

        {/* السلايدر للشاشات الصغيرة */}
        <div className="block lg:hidden relative">
          {/* حاوية السلايدر */}
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth gap-4 px-2 pb-4"
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

            {features.map((feature: FeatureItem, index: number) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="max-w-[250px] snap-start flex-shrink-0"
                >
                  <Card className="px-5 py-5 hover:shadow-md shadow-sm shadow-[#0000000D] border border-[#0250491A] h-[180px] flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-[8px] bg-[#025049] flex items-center justify-center mb-2">
                      <Icon className="text-xl w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-sm text-[#025049] font-bold mb-1">
                      {feature.title}
                    </h2>
                    <div>
                      <div className="relative">
                        <p
                          className={`text-[#585858] text-[12px] ${
                            !isExpanded ? "line-clamp-5" : ""
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
                        {isExpanded && (
                          <button
                            onClick={() => setIsExpanded(false)}
                            className="text-[#00A898] text-[12px] font-semibold mt-2 block"
                          >
                            إظهار أقل
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* الشبكة للشاشات الكبيرة */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-3 gap-4 md:gap-6 lg:gap-16 mb-3 md:mb-10 mx-auto"
        >
          {features.map((feature: FeatureItem, index: number) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="px-2 py-2 sm:px-5 hover:shadow-md shadow-sm shadow-[#0000000D] border border-[#0250491A] md:px-[26px] h-[150px] md:h-[256px] flex flex-col justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-[8px] bg-[#025049] flex items-center justify-center mb-2 md:mb-4">
                    <Icon
                      className={`text-xl md:text-3xl w-5 h-5 md:w-6 md:h-6 text-white`}
                    />
                  </div>
                  <h2 className="text-sm md:text-xl text-[#025049] font-bold mb-1 md:mb-3">
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