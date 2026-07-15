"use client";

import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGlobe, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageDropdown from "../LanguageDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeLink, setActiveLink] = useState<string>();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { whatsappNumber } = useCountry();
  const pathname = usePathname();
  const router = useRouter();
  const isScrolling = useRef(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // إغلاق dropdown عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // دالة تبديل اللغة
  const changeLanguage = (lang: any) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setIsLangDropdownOpen(false);
  };

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
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      isScrolling.current = true;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (isScrolling.current) return;

      const sections = [
        "about",
        "features",
        "projects",
        "faq",
        "contact",
      ];
      const scrollPosition = window.scrollY + 120;

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
    handleScroll();

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
    { key: "about", href: "/#about", nameAr: "لماذا T CARTS؟", nameEn: "Why T CARTS?" },
   
   
     {
      key: "features",
      href: "/#features",
      nameAr: "المميزات",
      nameEn: "features",
    },
     {
      key: "projects",
      href: "/#projects",
      nameAr: "النماذج",
      nameEn: "Projects",
    },
     {
      key: "dashboard",
      href: "/#dashboard",
      nameAr: "وحدة التحكم",
      nameEn: "Dashboard",
    },
     {
      key: "application",
      href: "/#application",
      nameAr: "التطبيق",
      nameEn: "Application",
    },
     {
      key: "subscriptions ",
      href: "/#subscrip",
      nameAr: "الاشتراكات",
      nameEn: "Subscriptions ",
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
    e.preventDefault();

    const sectionId = href.split("#")[1];

    setActiveLink(linkKey);
    setIsOpen(false);

    if (pathname !== "/") {
      router.push(href);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveLink("about");
    } else {
      router.push("/");
    }
  };

  // الحصول على اسم اللغة الحالية للعرض
  const getCurrentLanguageName = () => {
    return language === "ar" ? "العربية" : "English";
  };

  const getCurrentLanguageCode = () => {
    return language === "ar" ? "AR" : "EN";
  };

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-20 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm shadow-black/10" : "bg-white "
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
                    width={300}
                    height={300}
                    quality={100}
                    loading="eager"
                    priority={true}
                    className={`w-full h-full transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </Link>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
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

            {/* Desktop Right Section */}
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
                    : "Start Your Store Now"}
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
                  {/* <FaArrowRight /> */}
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

      {/* Mobile Menu */}
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
                  width={300}
                  height={300}
                  quality={100}
                  loading="eager"
                  className="w-full h-full "
                />
              </div>
            </div>

            <div className="flex flex-col max-h-[50vh] overflow-y-auto">
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

            {/* Language Dropdown for Mobile - نفس تصميم الشاشات الكبيرة */}
            <div className="p-4 border-t border-gray-100 bg-gray-50" ref={langDropdownRef}>
              {/* Dropdown Trigger */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#068377] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <FaGlobe className="text-[#068377] text-lg" />
                    <span className="text-gray-700 font-medium">
                      {getCurrentLanguageName()}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isLangDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="text-gray-400 text-sm" />
                  </motion.div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <button
                        onClick={() => changeLanguage("ar")}
                        className={`w-full px-4 py-3 text-right transition-all duration-200 flex items-center justify-between ${
                          language === "ar"
                            ? "bg-[#068377]/10 text-[#068377]"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span>العربية</span>
                        {language === "ar" && (
                          <span className="text-[#068377] text-sm">✓</span>
                        )}
                      </button>
                      <button
                        onClick={() => changeLanguage("en")}
                        className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center justify-between ${
                          language === "en"
                            ? "bg-[#068377]/10 text-[#068377]"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span>English</span>
                        {language === "en" && (
                          <span className="text-[#068377] text-sm">✓</span>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp Button */}
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 bg-gradient-to-br from-[#012E29] to-[#00A898] text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 group"
              >
                <span>
                  {language === "ar"
                    ? "ابدأ متجرك الآن"
                    : "Start Your Store Now"}
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* <FaArrowRight  /> */}
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