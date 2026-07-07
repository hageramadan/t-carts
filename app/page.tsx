// app/page.tsx - أصبح نظيفاً بدون تمرير بيانات
"use client";
import { lazy } from 'react';
import FAQSection from '@/components/sections/FAQ';
import NeedToSuccess from '@/components/sections/needToSuccess';
import ChooseDesign from '@/components/sections/chooseDesign';
import { StoreFeaturesSection } from '@/components/sections/StoreFeaturesSection';
import GooglePlay from '@/components/sections/googlePlay';
import { CallToAction } from '@/components/sections/CallToAction';
import PricingCards from '@/components/sections/PricingCards';

const Hero = lazy(() => import('@/components/sections/Hero'));

export default function Home() {
  return (
    <>
      <Hero />
      <NeedToSuccess />
      <ChooseDesign />

      <StoreFeaturesSection />
      <GooglePlay />
      <PricingCards /> 
      <FAQSection />
      <CallToAction />
    </>
  );
}