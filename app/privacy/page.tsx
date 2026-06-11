// app/privacy-policy/page.js
"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { FaShieldAlt, FaDatabase, FaUserSecret, FaShareAlt, FaCookie, FaSyncAlt } from "react-icons/fa";


export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();
  const isRTL = language === "ar";
  

  // Icons for each section
  const sectionIcons = [
    <FaDatabase className="text-[#38CB89] text-2xl" key="1"/>,
    <FaUserSecret className="text-[#38CB89] text-2xl" key="2"/>,
    <FaShieldAlt className="text-[#38CB89] text-2xl" key="3"/>,
    <FaShareAlt className="text-[#38CB89] text-2xl" key="4"/>,
    <FaCookie className="text-[#38CB89] text-2xl" key="5" />,
    <FaSyncAlt className="text-[#38CB89] text-2xl" key="6"/>
  ];

  const privacyData = t("privacyPolicy");
  const sections = privacyData.sections || [];

  return (
    <main id="privacy" className="min-h-screen bg-gradient-to-br from-gray-50 to-white  py-6"
    >
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#025049] mb-4">
            {privacyData.title}
          </h1>
        
        </motion.div>

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className=" rounded-2xl p-6 md:p-8 mb-1"
        >
         
          <p className="leading-relaxed text-base md:text-lg">
            {privacyData.intro.content}
          </p>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section:any, index:any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  {sectionIcons[index % sectionIcons.length]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#025049] mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      

     
      </div>
    </main>
  );
}