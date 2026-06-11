// components/EmailSubscribe.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export function EmailSubscribe() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    
    if (!email) {
      setError(language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setError(language === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(language === "ar" ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* زر الإرسال - الأيقونة على اليسار */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading || isSubmitted}
            className={`absolute left-2 top-[10px]  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
              isSubmitted 
                ? "bg-[#38CB89] text-white" 
                : "bg-[#025049] text-white hover:bg-[#038B7A]"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitted ? (
              <FaCheckCircle className="w-5 h-5" />
            ) : isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaPaperPlane className="w-5 h-5" />
            )}
          </motion.button>
          
          {/* حقل الإدخال */}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder={language === "ar" ? " البريد الإلكتروني" : "Enter your email"}
            className="w-full pl-14 pr-4 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#38CB89] focus:border-transparent text-gray-700 placeholder-gray-400 bg-white shadow-sm border border-gray-200"
            disabled={isLoading || isSubmitted}
          />
        </div>
        
        {/* رسالة الخطأ */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-2 mr-4"
          >
            {error}
          </motion.p>
        )}
        
        {/* رسالة النجاح */}
        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#38CB89] text-sm mt-2 mr-4"
          >
            {language === "ar" 
              ? "تم الاشتراك بنجاح! شكراً لك" 
              : "Subscribed successfully! Thank you"}
          </motion.p>
        )}
      </form>
    </div>
  );
}