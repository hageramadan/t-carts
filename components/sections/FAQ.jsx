// FAQSection.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";
import { useCountry } from "@/contexts/CountryContext";
const FAQSection = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const { whatsappNumber } = useCountry();
  const isRTL = language === "ar";

  const faqs = t("faq.questions");

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const countries = [
    {
      name: language === "ar" ? "السعودية" : "Saudi Arabia",
      code: "+966",
      flag: "🇸🇦",
      placeholder: "512345678",
    },
    {
      name: language === "ar" ? "مصر" : "Egypt",
      code: "+20",
      flag: "🇪🇬",
      placeholder: "1012345678",
    },
    {
      name: language === "ar" ? "اليمن" : "Yemen",
      code: "+967",
      flag: "🇾🇪",
      placeholder: "712345678",
    },
    {
      name: language === "ar" ? "العراق" : "Iraq",
      code: "+964",
      flag: "🇮🇶",
      placeholder: "7701234567",
    },
    {
      name: language === "ar" ? "الجزائر" : "Algeria",
      code: "+213",
      flag: "🇩🇿",
      placeholder: "551234567",
    },
  ];
  const handleFormSubmit = () => {
    // console.log("Form submitted from parent:", data);
    // هنا يمكنك إضافة منطق الإرسال الفعلي (API call)
  };

  return (
    <section id="faq" className="py-16 overflow-hidden bg-[#E8F4F4]">
      <div className="container mx-auto px-1 md:px-8">
        {/* العنوان العلوي للسكشن */}
            <div className="mb-8 text-center lg:text-start">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#025049] mb-2">
                {t("faq.title")}
              </h1>
            </div>
        <div className="flex flex-col lg:flex-row md:items-start items-center gap-8 lg:gap-12 justify-between">
          {/* المحتوى في اليمين - عرض 760px كحد أقصى */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 w-full lg:max-w-[760px]"
          >
            

            {/* قائمة الأسئلة */}
            <div className="space-y-6 gap-[24px]">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`
                    rounded-2xl shadow-md transition-all duration-300 overflow-hidden 
                    ${
                      openIndex === index
                        ? "bg-[#38CB89]"
                        : "bg-white hover:shadow-lg"
                    }
                  `}
                >
                  {/* زر السؤال */}
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-5 py-4 md:px-6 md:py-5 flex justify-between items-center gap-4 text-right group"
                  >
                    <span
                      className={`
                      text-[14px] md:text-lg font-semibold flex-1 transition-colors duration-300
                      ${openIndex === index ? "text-white" : "text-gray-800"}
                      ${isRTL ? "text-right" : "text-left"}
                    `}
                    >
                      {faq.question}
                    </span>

                    {/* الأيقونة */}
                    <div
                      className={`
                      w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center
                      transition-all duration-300 flex-shrink-0
                      ${
                        openIndex === index
                          ? "text-white"
                          : "text-[#068377] group-hover:bg-gray-200"
                      }
                    `}
                    >
                      {openIndex === index ? (
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M20 12H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* الإجابة */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 py-5 md:px-6 pb-6 bg-white rounded-b-2xl">
                          <p className="text-sm md:text-base text-[#585858] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* الصورة في الشمال */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileHover={{
              y: [-2, -10], // فقط تطلع لفوق وتنزل مكانها مرة واحدة
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex w-full lg:w-[424px] flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative w-full lg:w-[424px] mx-auto">
              <ContactForm
                countries={countries}
                onSubmit={handleFormSubmit}
                whatsappNumber={whatsappNumber}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
