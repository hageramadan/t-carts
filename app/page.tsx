'use client';

import {  lazy } from 'react';


import FastSEO from '@/components/sections/fastSEO';
import DataC from '@/components/sections/dataC';
import FAQSection from '@/components/sections/FAQ';
import ContactSection from '@/components/sections/Contact';
import EasyBuy from '@/components/sections/easyBuy';
import FirstSearch from '@/components/sections/firstSearch';
import NeedToSuccess from '@/components/sections/needToSuccess';
import ChooseDesign from '@/components/sections/chooseDesign';
import { StoreFeaturesSection } from '@/components/sections/StoreFeaturesSection';
import GooglePlay from '@/components/sections/googlePlay'
import { CallToAction } from '@/components/sections/CallToAction';
// Lazy load components for better performance
const Hero = lazy(() => import('@/components/sections/Hero'));
const Features = lazy(() => import('@/components/sections/Features'));


export default function Home() {
  return (
    <>

        <Hero />
        <Features />
        <FastSEO />
        <DataC />
        <EasyBuy />
        <FirstSearch />
        <NeedToSuccess />
        <ChooseDesign/>
        <StoreFeaturesSection/>
        <GooglePlay />
        <FAQSection />
        <CallToAction />
    </>
  );
}