// ContactForm.js - الكود المعدل بالكامل
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactForm = ({ countries: countriesProp = [], onSubmit }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "other", // ✅ تعيين قيمة افتراضية
    message: "",
    additionalInfo: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // قائمة البلدان الافتراضية في حالة عدم وجود بيانات
  const defaultCountries = [
    {
      name: "مصر",
      nameEn: "Egypt",
      code: "+20",
      flag: "🇪🇬",
      placeholder: "1012345678",
    },
    {
      name: "السعودية",
      nameEn: "Saudi Arabia",
      code: "+966",
      flag: "🇸🇦",
      placeholder: "512345678",
    },
    
    {
      name: "الإمارات",
      nameEn: "UAE",
      code: "+971",
      flag: "🇦🇪",
      placeholder: "501234567",
    },
    {
      name: "الكويت",
      nameEn: "Kuwait",
      code: "+965",
      flag: "🇰🇼",
      placeholder: "51234567",
    },
    {
      name: "قطر",
      nameEn: "Qatar",
      code: "+974",
      flag: "🇶🇦",
      placeholder: "30123456",
    },
    {
      name: "البحرين",
      nameEn: "Bahrain",
      code: "+973",
      flag: "🇧🇭",
      placeholder: "31234567",
    },
    {
      name: "عمان",
      nameEn: "Oman",
      code: "+968",
      flag: "🇴🇲",
      placeholder: "91234567",
    },
    {
      name: "الأردن",
      nameEn: "Jordan",
      code: "+962",
      flag: "🇯🇴",
      placeholder: "791234567",
    },
    {
      name: "العراق",
      nameEn: "Iraq",
      code: "+964",
      flag: "🇮🇶",
      placeholder: "7712345678",
    },
    {
      name: "اليمن",
      nameEn: "Yemen",
      code: "+967",
      flag: "🇾🇪",
      placeholder: "771234567",
    },
  ];

  // استخدام البيانات المرسلة إذا وجدت، وإلا استخدام البيانات الافتراضية
  const countriesList = Array.isArray(countriesProp) && countriesProp.length > 0 
    ? countriesProp 
    : defaultCountries;

  const [selectedCountry, setSelectedCountry] = useState(() => {
    // التحقق من وجود بلدان
    if (countriesList && countriesList.length > 0) {
      const firstCountry = countriesList[0];
      return firstCountry || {
        name: language === "ar" ? "مصر" : "Egypt",
        code: "+20",
      flag: "🇪🇬",
      placeholder: "1012345678",
      };
    }
    // القيمة الافتراضية النهائية
    return  {
      name: "مصر",
      nameEn: "Egypt",
      code: "+20",
      flag: "🇪🇬",
      placeholder: "1012345678",
    }
  });

  // Update selected country name when language changes
  useEffect(() => {
    setSelectedCountry((prev) => {
      const currentCountryData = countriesList.find(
        (c) => c.code === prev.code,
      );
      if (currentCountryData) {
        return {
          ...prev,
          name: currentCountryData.name,
        };
      }
      return prev;
    });
  }, [language, countriesList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Validation function - تم إزالة التحقق من serviceType
  const validateForm = () => {
    const newErrors = {};
    let hasErrors = false;

    // التحقق من الاسم
    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired") || "الاسم مطلوب";
      hasErrors = true;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = t("validation.nameMinLength") || "الاسم يجب أن يكون 3 أحرف على الأقل";
      hasErrors = true;
    }

     if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired") || "البريد الإلكتروني مطلوب";
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid") || "البريد الإلكتروني غير صحيح";
      hasErrors = true;
    }

    // التحقق من رقم الهاتف
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!formData.phone) {
      newErrors.phone = t("validation.phoneRequired") || "رقم الهاتف مطلوب";
      hasErrors = true;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t("validation.phoneInvalid") || "رقم الهاتف غير صحيح";
      hasErrors = true;
    }

    // التحقق من البريد الإلكتروني (اختياري)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid") || "البريد الإلكتروني غير صحيح";
      hasErrors = true;
    }

    // ✅ تم إزالة التحقق من serviceType

    // التحقق من الرسالة
    if (!formData.message.trim()) {
      newErrors.message = t("validation.messageRequired") || "الرسالة مطلوبة";
      hasErrors = true;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("validation.messageMinLength") || "الرسالة يجب أن تكون 10 أحرف على الأقل";
      hasErrors = true;
    }

    setErrors(newErrors);
    
    // طباعة الأخطاء في الكونسول للمساعدة في التصحيح
    if (hasErrors) {
      console.log('❌ Validation errors:', newErrors);
      console.log('📝 Current form data:', formData);
    }
    
    return !hasErrors;
  };

  // Function to send data to API
  const sendToAPI = async (data) => {
    try {
      const response = await fetch('https://admin.t-carts.com/api/landing/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Reset submit status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage('');
    }
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countriesList.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setFormData((prev) => ({ ...prev, phone: "" }));
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    // منع السلوك الافتراضي للنموذج
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log('✅ Form submitted - Starting validation...');
    console.log('📝 Form data:', formData);

    // التحقق من صحة البيانات
    const isValid = validateForm();
    
    if (!isValid) {
      console.log('❌ Validation failed - Please check the errors above');
      // عرض رسالة للمستخدم
      setSubmitStatus('error');
      setSubmitMessage('يرجى تصحيح الأخطاء في النموذج قبل الإرسال');
      
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
      
      return;
    }

    console.log('✅ Validation passed');

    // تجهيز البيانات حسب متطلبات الـ API
    const fullPhoneNumber = `${selectedCountry.code}${formData.phone}`;
    const apiData = {
      name: formData.name.trim(),
      email: formData.email.trim() || '',
      phone: fullPhoneNumber,
      country_code: selectedCountry.code,
      message: formData.message.trim(),
    };

    console.log('📤 Sending data to API:', apiData);

    // بدء الإرسال
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      // استدعاء الـ API
      const result = await sendToAPI(apiData);
      
      console.log('📥 API Response:', result);
      
      // التحقق من نجاح الإرسال
      if (result.result === true) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'تم إرسال رسالتك بنجاح. سنقوم بالرد عليك قريباً.');
        
        // إعادة تعيين حقول النموذج
        setFormData({
          name: "",
          phone: "",
          email: "",
          serviceType: "other",
          message: "",
          additionalInfo: "",
        });
        
        // استدعاء callback الأب إذا وجد
        if (onSubmit) {
          onSubmit(result);
        }
        
        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => {
          setSubmitStatus(null);
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('❌ Submission Error:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
      
      // إخفاء رسالة الخطأ بعد 5 ثواني
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPhonePlaceholder = () => `${t("common.example")}`;

  const getInputClassName = (fieldName) => {
    return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38CB89] focus:border-[#38CB89]  ${
      errors[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300"
    }`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex-1 bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10"
    >
      <h1 className="text-lg md:text-xl text-[#191C1F] font-bold">
        {t("contactForm.title")}
      </h1>
      <p className="text-[14px] text-[#475156] my-3">
        {t("contactForm.subtitle")}
      </p>
      
      {/* رسائل النجاح/الخطأ */}
      {submitStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <p className="text-sm">✅ {submitMessage}</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="text-sm">❌ {submitMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* حقل الاسم */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("form.fullNamePlaceholder")}
              className={getInputClassName("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        </div>
        
        {/* حقل البريد الإلكتروني */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form.emailPlaceholder")}
              className={getInputClassName("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* حقل رقم الهاتف */}
        <div>
          <div className="flex" dir="rtl">
            {/* Custom Select للدولة */}
            <div className="relative flex-shrink-0" ref={selectRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 bg-gradient-to-br from-gray-50 to-white border rounded-r-lg rounded-l-none focus:outline-none focus:ring-2 focus:ring-[#38CB89] transition-all duration-200 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                style={{ minWidth: "90px" }}
                disabled={isSubmitting}
              >
                <span className="text-base sm:text-xl">
                  {selectedCountry.flag}
                </span>
                <span className="font-semibold text-gray-700 text-xs sm:text-base">
                  {selectedCountry.code}
                </span>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-fit sm:w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {countriesList && countriesList.length > 0 && countriesList.map((country, index) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          handleCountryChange({
                            target: { value: country.code },
                          });
                          setIsOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 
                            hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 
                            transition-all duration-200 text-right
                            ${selectedCountry.code === country.code ? "bg-blue-50 border-r-4 border-[#38CB89]" : ""}
                            ${index !== countriesList.length - 1 ? "border-b border-gray-100" : ""}
                          `}
                      >
                        <span className="text-lg sm:text-2xl">
                          {country.flag}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="font-bold text-gray-800 text-xs sm:text-sm">
                            {country.code}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            {country.name}
                          </span>
                        </div>
                        {selectedCountry.code === country.code && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-[#38CB89] mr-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </div>

            {/* حقل رقم الهاتف */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={getPhonePlaceholder()}
              className={`flex-1 min-w-0 px-3 sm:px-4 py-3 border rounded-l-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#38CB89] focus:border-[#38CB89] transition-all text-sm sm:text-base ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* حقل الرسالة */}
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder={t("form.messagePlaceholder")}
            className={getInputClassName("message")}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* زر الإرسال */}
        <div className="flex justify-center md:justify-end">
          <motion.button
            type="submit"
            onClick={handleSubmit}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            className={`flex items-center group justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-base ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#38CB89] hover:bg-[#2db87a]'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("form.sending") || "جاري الإرسال..."}
              </span>
            ) : (
              <>
                <span className="text-sm md:text-[16px] whitespace-nowrap">
                  {t("form.submitButton")}
                </span>
                <motion.div>
                  <FaArrowRight
                    className={`inline group-hover:-rotate-45 ${language === "ar" ? "rotate-180" : ""} text-sm md:text-base`}
                  />
                </motion.div>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;