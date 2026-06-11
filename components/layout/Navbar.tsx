"use client";

import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageDropdown from "../LanguageDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeLink, setActiveLink] = useState<string>();
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();
  const pathname = usePathname();
  const router = useRouter();
  const isScrolling = useRef(false);

  // دالة فتح الواتساب
  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber?.replace(/[^\d+]/g, "") || "";
    const message =
      language === "ar"
        ? "السلام عليكم، أود الحصول على استشارة تقنية مجانية لمشروعي"
        : "Hello, I would like to get a free technical consultation for my project";

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // دالة للتمرير للسكشن مع مراعاة ارتفاع الناف بار
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // ارتفاع الناف بار
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      isScrolling.current = true;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // إعادة تعيين الـ flag بعد انتهاء التمرير
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // منع تحديث الـ active link أثناء التمرير اليدوي للسكشن
      if (isScrolling.current) return;

      // Check which section is in view
      const sections = [
        "about",
        "services",
        "projects",
        "partners",
        "faq",
        "contact",
      ];
      const scrollPosition = window.scrollY + 120; // Offset for navbar

      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeLink) {
        setActiveLink(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active link

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeLink]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { key: "about", href: "/#about", nameAr: "لماذا T CARTS؟", nameEn: "About" },
    {
      key: "services",
      href: "/#services",
      nameAr: "المميزات",
      nameEn: "Services",
    },
    {
      key: "projects",
      href: "/#projects",
      nameAr: "النماذج",
      nameEn: "Projects",
    },
   
    { key: "faq", href: "/#faq", nameAr: "الاسئلة", nameEn: "FAQ" },
    {
      key: "contact",
      href: "/#contact",
      nameAr: "انضم الينا",
      nameEn: "Contact Us",
    },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    linkKey: string,
    href: string,
  ) => {
    e.preventDefault(); // منع السلوك الافتراضي للـ Link

    // استخراج الـ section id من الـ href
    const sectionId = href.split("#")[1];

    // تغيير الـ active link فوراً
    setActiveLink(linkKey);
    setIsOpen(false);

    // لو احنا في صفحة غير الصفحة الرئيسية
    if (pathname !== "/") {
      router.push(href);
      // ننتظر شوية عشان الصفحة تتحمل وبعدين نتمركز للسكشن
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // لو في الصفحة الرئيسية، نتمركز للسكشن مباشرة
      scrollToSection(sectionId);
    }
  };

  // دالة للتعامل مع اللوجو
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveLink("about");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-20 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg py-2" : "bg-white py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo - Right side with spinner */}
            <div className="cursor-pointer order-1">
              <div className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px]">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-[#068377] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <Link href="/" aria-label="home" onClick={handleLogoClick}>
                  <Image
                    src="/images/logo/logo.png"
                    alt="Tawajood Logo"
                    width={100}
                    height={100}
                    quality={100}
                    loading="eager"
                    priority={true}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </Link>
              </div>
            </div>

            {/* Navigation Links - Center with Active Link Styling */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 order-2">
              <div className="flex items-center gap-4 xl:gap-8">
                {navLinks.map((link) => (
                  <Link
                    aria-label={link.nameEn}
                    key={link.key}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.key, link.href)}
                    className={`transition-colors font-medium text-sm xl:text-base whitespace-nowrap pb-1 ${
                      activeLink === link.key
                        ? "text-[#068377] border-b-2 border-[#068377]"
                        : "text-[#312E8199] hover:text-[#068377]"
                    }`}
                  >
                    {language === "ar" ? link.nameAr : link.nameEn}
                  </Link>
                ))}
              </div>
            </div>

            {/* Start Project Button - Left side with animation */}
            <div className="order-3 hidden lg:flex items-center gap-4">
               <LanguageDropdown />

              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{
                  y: -5,
                  boxShadow: "0px 8px 25px rgba(69, 132, 197, 0.35)",
                }}
                whileTap={{
                  y: 0,
                  scale: 0.97,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 15,
                }}
                className="text-white px-4 bg-gradient-to-br from-[#012E29] to-[#00A898] py-2 md:px-5 md:py-3 rounded-2xl text-sm xl:text-base whitespace-nowrap flex items-center gap-2 group cursor-pointer"
               
              >
                <span>
                  {language === "ar"
                    ? "ابدأ متجرك الآن"
                    : "Start Your Project Now"}
                </span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{
                    x: language === "ar" ? -6 : 6,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    },
                  }}
                >
                  
                </motion.span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden order-4">
              <button
                className="text-2xl text-gray-700 z-20 relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          
        </div>
        
      </nav>

      {/* Mobile Menu - Modern Design with Active Link */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-4 right-4 bg-white shadow-2xl z-40 lg:hidden rounded-2xl overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <div className="w-[60px] h-[60px] mx-auto relative">
                <Image
                  src="/images/logo/logo.png"
                  alt="Logo"
                  width={120}
                  height={80}
                  quality={100}
                  loading="eager"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col max-h-[60vh] overflow-y-auto">
              {navLinks.map((link, index) => (
                <Link
                  aria-label={`go to ${link.key}`}
                  key={link.key}
                  href={link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.key, link.href);
                    setIsOpen(false);
                  }}
                  className={`transition py-3 px-4 text-center text-base font-medium ${
                    activeLink === link.key
                      ? "text-black bg-blue-50 border-r-4 border-[#068377]"
                      : "text-[#068377] hover:text-[#068377] hover:bg-gray-50"
                  } ${index !== navLinks.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  {language === "ar" ? link.nameAr : link.nameEn}
                </Link>
              ))}
            </div>

            <div className="p-4 pt-2 border-t border-gray-100 bg-gray-50">
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-br from-[#012E29] to-[#00A898] text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 group"
              >
                <span>
                  {language === "ar"
                    ? "ابدأ متجرك الآن"
                    : "Start Your Project Now"}
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                 
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Navbar;
