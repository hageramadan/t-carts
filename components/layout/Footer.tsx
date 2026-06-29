// Footer.js
"use client";


import { MdEmail } from "react-icons/md";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { useCountry } from "@/contexts/CountryContext";
import { EmailSubscribe } from "../sections/EmailSubscribe";

const Footer = () => {
  const { t } = useLanguage();
  const { whatsappNumber } = useCountry();

  const services = [
   { translate:t("servicesNames.mobileAppDev") , href:"#about"},
    { translate:t("servicesNames.websiteDevSystems") , href:"#features"},
    {translate:t("servicesNames.ecommerceHosting"), href:""},
    {translate:t("servicesNames.brandIdentity"), href:"#faq"},
   {translate:t("servicesNames.digitalGrowth"), href:`https://wa.me/${whatsappNumber}`},
  ];

  // Data for ContactInfo component
  const social = [
    // {
    //   id: 1,
    //   imageSrc: "/images/social/linkedin.png",
    //   link: "https://www.linkedin.com/company/tawajood/posts/?feedView=all",
    //   alt: "LinkedIn",
    //   bgColor: "hover:bg-[#0077B5]",
    // },
     {
      id: 2,
      imageSrc: "/images/social/snap.png",
      link: "https://www.snapchat.com/add/dukkanah0?share_id=2393hK60rl4&locale=en-EG",
      alt: "Snap",
      bgColor: "hover:bg-[#0077B5]",
    },
    {
      id: 3,
      imageSrc: "/images/social/insta.png",
      link: "https://www.instagram.com/tcarstofficial?igsh=MWZkZXZwN2hnMjZsbA==",
      alt: "Instagram",
      bgColor:
        "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]",
    },
    {
      id: 4,
      imageSrc: "/images/social/face.png",
      link: "https://www.facebook.com/share/14eXaTppRh3/",
      alt: "Facebook",
      bgColor: "hover:bg-[#1877F2]",
    },
    {
      id: 5,
      imageSrc: "/images/social/wats.png",
      link: `https://wa.me/${whatsappNumber}`,
      alt: "WhatsApp",
      bgColor: "hover:bg-[#25D366]",
    },
    {
      id: 6,
      imageSrc: "/images/social/tiktok.png",
      link: "https://www.tiktok.com/@tcartofficial?_r=1&_t=ZS-97II6w5C6aK",
      alt: "TikTok",
      bgColor: "hover:bg-[#000000]",
    },
  ];

  const phoneNumbers = ["966549256726+", "201055099236+"];
  const emails = ["info@tawajood.com"];
 const addresses = t("addressesList");

  return (
    <footer className="bg-[#001110] text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* العمود الأول - الشعار والوصف */}
          <div>
            <div className="w-[100px] h-[75px] mb-4">
              <Image
                src="/logof.png"
                alt="Logo"
                loading="eager"
                width={2000}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white max-w-64 text-sm md:text-[16px] leading-relaxed mb-4">
              {t("footer.description")}
            </p>
          </div>

          {/* العمود الثاني - الخدمات */}
          <div>
            <h4 className="font-bold text-[16px] md:text-lg mb-4 text-white">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2 md:space-y-6">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    aria-label={`go to ${service}`}
                    href={service.href}
                    className="text-white text-sm md:text-[16px] font-medium"
                  >
                    {service.translate}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث - المساعدة والروابط القانونية */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">
              {t("footer.help")}
            </h4>
            <ul className="space-y-2 md:space-y-6 mb-6">
              <li>
                <Link href="/privacy" className="text-white text-sm block">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <a href="#" className="text-white text-sm block">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع - الفروع والمواقع */}
          <div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">
                {t("footer.followUs")}
              </h4>

              <EmailSubscribe />
            </div>

            {/* صور السوشيال ميديا */}
            <div className="md:mt-8 pt-4 my-3 md:mb-0">
             
              <div className="flex  gap-4 md:gap-6">
                {social.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.imageSrc}
                        alt={item.alt}
                        width={1000}
                        height={1000}
                      
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p className="text-white text-xs mt-2">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;