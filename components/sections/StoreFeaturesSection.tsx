// components/StoreFeaturesSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

// جلب البيانات من ملف الترجمة بدلاً من الثوابت
export function StoreFeaturesSection() {
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // تحديد التصميم لكل عنصر حسب الترتيب
  const getFeatureLayout = (index: number) => {
    if (index === 0) return { 
      colSpan: "lg:col-span-1", 
      rowSpan: "", 
      height: "h-[300px] md:h-[400px]",
      mobileOrder: "order-1" 
    };
    if (index === 1) return { 
      colSpan: "lg:col-span-2", 
      rowSpan: "row-span-1", 
      height: "h-[300px] md:h-[400px]",
      mobileOrder: "order-2"
    };
    if (index === 2) return { 
      colSpan: "lg:col-span-1", 
      rowSpan: "row-span-1", 
      height: "h-[300px] md:h-[400px]",
      mobileOrder: "order-3"
    };
    if (index === 3) return { 
      colSpan: "lg:col-span-2", 
      rowSpan: "", 
      height: "h-[300px] md:h-[400px]",
      mobileOrder: "order-4"
    };
    if (index === 4) return { 
      colSpan: "lg:col-span-2", 
      rowSpan: "", 
      height: "h-[300px] md:h-[400px]",
      mobileOrder: "order-5"
    };
    return { 
      colSpan: "lg:col-span-1", 
      rowSpan: "", 
      height: "h-[300px] md:h-[400px]",
      mobileOrder: "order-1" 
    };
  };

  // بيانات الميزات من ملف الترجمة
  const featuresData = [
    {
      id: 1,
      image: "/images/features/f11.png",
      title: t("storeFeatures.items.0.title"),
      description: t("storeFeatures.items.0.description"),
    },
    {
      id: 2,
      image: "/images/features/f222.png",
      title: t("storeFeatures.items.1.title"),
      description: t("storeFeatures.items.1.description"),
    },
    {
      id: 3,
      image: "/images/features/f33.png",
      title: t("storeFeatures.items.2.title"),
      description: t("storeFeatures.items.2.description"),
    },
    {
      id: 4,
      image: "/images/features/f44.png",
      title: t("storeFeatures.items.3.title"),
      description: t("storeFeatures.items.3.description"),
    },
    {
      id: 5,
      image: "/images/features/f55.png",
      title: t("storeFeatures.items.4.title"),
      description: t("storeFeatures.items.4.description"),
    },
  ];

  return (
    <section className="py-8 md:py-16 container mx-auto px-4 md:px-8" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* عنوان القسم */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#025049] mb-4">
          {t("storeFeatures.mainTitle")}
        </h2>
        <p className="text-base md:text-lg text-[#585858] max-w-2xl mx-auto">
          {t("storeFeatures.mainDescription")}
        </p>
      </motion.div>

      {/* شبكة المميزات */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-8 
          md:gap-10 
          auto-rows-[300px] 
          md:auto-rows-[400px] 
          items-start
          pt-4
          lg:pt-8
        "
      >
        {featuresData.map((feature, index) => {
          const layout = getFeatureLayout(index);
          return (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className={`
                ${layout.colSpan} 
                ${layout.rowSpan} 
                ${layout.height} 
                group
                ${layout.mobileOrder}
                lg:order-none
              `}
            >
              {/* حاوية الصورة بالكامل */}
              <div className="relative bg-[#4DA475] h-full w-full overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                
                {/* ✅ إضافة padding حول الصورة */}
                <div className="relative w-full h-full p-5">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    // fill
                    width={1200}
                    height={900}
                    className="object-cover"  // ← تغيير إلى contain
                    // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                    quality={90}
                  />
                </div>

                {/* ✅ التدرج الشفاف من الأسفل - يظهر فوق الصورة */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-3/5 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, #025049CF 0%, #0F0F0F00 100%)"
                  }}
                />

                {/* محتوى النص في الأسفل */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10 text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500 line-clamp-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-white/90 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}