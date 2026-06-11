import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { CountryProvider } from '@/contexts/CountryContext';
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "متجر إلكتروني متكامل -  أمتلك منظومة بيع متكاملة.. تملكها بالكامل بدون اشتراكات أو عمولات",
 
  description:`أمتلك منظومة بيع متكاملة.. تملكها بالكامل  ...
بدون اشتراكات أو عمولات` ,
     icons: {
    icon: [
      { url: "/logo2.png", type: "image/png" },
      { url: "/logo2.png", type: "image/png" },
      { url: "/logo2.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo2.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T68DNND2');
            `,
          }}
        />
      </head>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T68DNND2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
         <CountryProvider>
            <LanguageProvider>
                <div className="min-h-screen flex flex-col">
                  {/* <SubNavbar /> */}
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  {/* <FloatingWhatsApp /> */}
                </div>
              </LanguageProvider>
         </CountryProvider>
        
      </body>
    </html>
  );
}