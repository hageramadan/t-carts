'use client';

import { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: 'ar' | 'en') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-[#068377]"
      >
        {/* <FaGlobe className="text-sm" /> */}
        <span className="text-sm font-medium">
          {currentLanguage?.name}
        </span>
        <FaChevronDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Improved for mobile */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full  mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'ar' | 'en')}
                className={`w-full flex items-center md:gap-3 px-4 py-3 text-right hover:bg-gray-50 transition-colors ${
                  language === lang.code ? 'bg-[#068377]/10 text-[#068377]' : 'text-gray-700'
                }`}
              >
                
                <span className="flex-1 font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 text-[#068377]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageDropdown;