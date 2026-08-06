// app/page.tsx - أصبح نظيفاً بدون تمرير بيانات
"use client";
import { lazy } from "react";
import FAQSection from "@/components/sections/FAQ";
import NeedToSuccess from "@/components/sections/needToSuccess";
import ChooseDesign from "@/components/sections/chooseDesign";
import { StoreFeaturesSection } from "@/components/sections/StoreFeaturesSection";
import GooglePlay from "@/components/sections/googlePlay";
import { CallToAction } from "@/components/sections/CallToAction";
import PricingCards from "@/components/sections/PricingCards";
import { Features } from "@/components/sections/Features";
import DataC from "@/components/sections/dataC";
import FastSEO from "@/components/sections/fastSEO";
import FirstSearch from "@/components/sections/firstSearch";
import EasyBuy from "@/components/sections/easyBuy";
import PaymentIntegration from "@/components/sections/PaymentIntegration";
const Hero = lazy(() => import("@/components/sections/Hero"));

export default function Home() {
  return (
    <>
      <Hero />
      <EasyBuy />
      {/* <FastSEO /> */}
      {/* <DataC /> */}
      <FirstSearch />
      {/* <Features /> */}
      <NeedToSuccess />
      
      <PaymentIntegration/>

      <StoreFeaturesSection />
      <GooglePlay />
      <PricingCards />
      <ChooseDesign />
      <FAQSection />
      <CallToAction />
    </>
  );
}
