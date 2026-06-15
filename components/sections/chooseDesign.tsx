// app/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Link from "next/link";
import { IoLinkOutline } from "react-icons/io5";

// بيانات التصاميم (بدون نصوص ثابتة)
const designsData = [
  {
    id: 1,
    image: "/images/chooseDesign/d1.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: "chooseDesign.badge.mostUsed",
    badgeColor: "bg-[#FF7700]",
  },
  {
    id: 2,
    image: "/images/chooseDesign/d2.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: "chooseDesign.badge.professional",
    badgeColor: "bg-[#38CB89]",
  },
  {
    id: 3,
    image: "/images/chooseDesign/d3.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: null,
  },
  {
    id: 4,
    image: "/images/chooseDesign/d4.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: null,
  },
  {
    id: 5,
    image: "/images/chooseDesign/d5.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: null,
  },
  {
    id: 6,
   image: "/images/chooseDesign/d6.png",
    buttonTextKey: "chooseDesign.button1",
    badgeKey: "chooseDesign.badge.mostUsed",
    badgeColor: "bg-[#FF7700]",
  },
];

// مكون البادج
const Badge = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className={`absolute top-3 right-3 z-10 ${color} text-white px-3 py-1.5 rounded-[8px] text-xs md:text-sm font-semibold shadow-md`}>
      {text}
    </div>
  );
};

// مكون الكارت الواحد مع الترجمة
const Card = ({ 
  image, 
  title, 
  description, 
  buttonText, 
  badgeText, 
  badgeColor,
  language 
}: {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  badgeText: string | null;
  badgeColor?: string;
  language: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{y:-10}}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col w-full group h-auto lg:min-w-[384px] lg:min-h-[593px] border border-[#E4E7E9] hover:shadow-lg rounded-2xl overflow-hidden bg-white mx-auto relative"
      dir={language === "ar" ? "rtl" : "ltr"}
    
    >
      {/* حاوية الصورة */}
      <div className="w-full lg:h-[384px] relative flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={384}
          height={384}
          className="object-cover w-full h-full"
          
        />
        
        {/* البادج - نص مترجم */}
        {badgeText && (
          <Badge text={badgeText} color={badgeColor || "bg-gray-500"} />
        )}
      </div>

      {/* المحتوى النصي والأزرار */}
      <div className="flex flex-col flex-grow p-2 py-3 md:px-4 md:py-6 justify-between">
        <div className="text-center relative">
          {/* العنوان */}
          <h3 className="text-[14px] md:text-[20px] font-bold text-[#191C1F] text-center mb-1 md:mb-4">
            {title}
          </h3>

          {/* الوصف */}
          <p className="text-[12px] md:text-[18px] mb-2 text-[#838383] text-center leading-relaxed">
            {description}
          </p>
          <div className=" absolute top-[-4rem] left-4 md:left-1/3 group-hover:flex hidden">
          <Link href="/" aria-label="go to website" className="flex items-center gap-3 bg-[#03645B] text-white justify-center w-fit px-4 py-2 rounded-lg">
         
          <span className="text-base md:text-lg">
                  {language === "ar"
                    ? "معاينة"
                    : "Preview"}
                </span> 
           <IoLinkOutline  className="w-5 h-5 md:w-7 md:h-7"/>

          </Link>
          </div>
        </div>

        {/* الزر */}
        <button
          onClick={() => {
            // يمكن إضافة وظيفة الزر هنا
            console.log("Button clicked:", buttonText);
          }}
          className="
          w-full
          text-sm
          md:text-[18px]
            lg:w-[352px] 
            md:h-[60px] 
            rounded-[8px]
            md:rounded-2xl 
            border 
            border-[#05645C] 
            md:px-8 
            px-2
            md:py-4 
            py-2
            text-[#05645C] 
            font-medium 
            hover:bg-gradient-to-br from-[#012E29] to-[#00A898]
            hover:text-white 
            transition-all 
            duration-300 
            shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-[#05645C]
            focus:ring-opacity-50
            mx-auto
          "
          style={{ boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default function ChooseDesign() {
  const { t, language } = useLanguage();
  const { whatsappNumber } = useCountry();

  // جلب البيانات المترجمة للتصاميم (بما في ذلك البادجات)
  const getTranslatedDesigns = () => {
    return designsData.map((design) => ({
      ...design,
      title: t(`chooseDesign.${design.id}.title`),
      description: t(`chooseDesign.${design.id}.description`),
      buttonText: t(design.buttonTextKey),
      badgeText: design.badgeKey ? t(design.badgeKey) : null,
    }));
  };

  const translatedDesigns = getTranslatedDesigns();

  // متغيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div   id="projects" className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir={language === "ar" ? "rtl" : "ltr"}>
      
      {/* القسم العلوي مع العناوين */}
      <div className="container mx-auto mb-12 md:mb-16 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* العنوان الرئيسي */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#025049] mb-4">
            {t("chooseDesign.mainTitle")}
          </h1>
          
          {/* الوصف الأول */}
          <p className="text-base md:text-lg text-[#353636] max-w-3xl mx-auto my-6 leading-relaxed">
            {t("chooseDesign.description1")}
          </p>
          
          {/* الوصف الثاني */}
          <p className="text-xs md:text-lg font-semibold text-white bg-gradient-to-b py-2 rounded-full from-[#38CB89] to-[#419F75] max-w-2xl mx-auto">
            {t("chooseDesign.description2")}
          </p>
        </motion.div>
      </div>

      {/* حاوية التصاميم */}
      <div className="container mx-auto px-1 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            grid 
            gap-4
            md:gap-8
            lg:gap-14 
            justify-center
            grid-cols-2 
            xl:grid-cols-3
          "
        >
          {translatedDesigns.map((design) => (
            <Card
              key={design.id}
              image={design.image}
              title={design.title}
              description={design.description}
              buttonText={design.buttonText}
              badgeText={design.badgeText}
              badgeColor={design.badgeColor}
              language={language}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}