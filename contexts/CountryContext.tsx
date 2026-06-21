'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';

interface CountryContextType {
  whatsappNumber: string;
  countryCode: string | null;
  isDetected: boolean;
}

const CountryContext = createContext<CountryContextType>({
  whatsappNumber: '966549256726',
  countryCode: null,
  isDetected: false,
});

export const useCountry = () => useContext(CountryContext);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [whatsappNumber, setWhatsappNumber] = useState<string>('201055099236');
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isDetected, setIsDetected] = useState(false);
  
  const hasFetched = useRef(false);

  useEffect(() => {
    // منع التنفيذ المتكرر في وضع Strict Mode
    if (hasFetched.current) return;
    hasFetched.current = true;

    const detectCountry = () => {
      try {
        // الاعتماد كلياً على المنطقة الزمنية ولغة المتصفح (بدون طلب شبكة)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const browserLang = navigator.language;
        
        // console.log('Detected TimeZone:', timezone);
        // console.log('Detected Language:', browserLang);
        
        // التحقق من وجود مؤشرات لمصر
        if (timezone?.includes('Cairo') || 
            timezone?.includes('Egypt') || 
            browserLang?.includes('eg') ||
            browserLang?.includes('EG') ||
            browserLang === 'ar-EG') {
          setWhatsappNumber('201055099236');
          setCountryCode('EG');
          // console.log('✅ Egypt detected (TimeZone/Language) - Using number: 201055099236');
        } 
        // التحقق من وجود مؤشرات للسعودية
        else if (timezone?.includes('Riyadh') || 
                 timezone?.includes('Saudi') || 
                 browserLang?.includes('sa') ||
                 browserLang?.includes('SA') ||
                 browserLang === 'ar-SA') {
          setWhatsappNumber('966549256726');
          setCountryCode('SA');
          // console.log('✅ Saudi Arabia detected (TimeZone/Language) - Using number: 966549256726');
        }
        // القيمة الافتراضية إذا لم يتم التعرف على البلد
        else {
          setWhatsappNumber('966549256726');
          setCountryCode('DEFAULT');
          // console.log('⚠️ Country not specifically detected - Using default Saudi number');
        }
      } catch (error) {
        // الحل النهائي في حال حدوث أي خطأ غير متوقع
        console.error('Error in country detection:', error);
        setWhatsappNumber('966549256726');
        setCountryCode('FALLBACK');
        // console.log('🔄 Fallback - Using default Saudi number');
      } finally {
        setIsDetected(true);
      }
    };

    // تنفيذ وظيفة الكشف فوراً (بدون await لأنها متزامنة)
    detectCountry();
    
  }, []); // يعمل مرة واحدة فقط عند تحميل المكون

  return (
    <CountryContext.Provider value={{ whatsappNumber, countryCode, isDetected }}>
      {children}
    </CountryContext.Provider>
  );
};