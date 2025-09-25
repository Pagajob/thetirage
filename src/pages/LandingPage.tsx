import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import PricingTable from '../components/PricingTable';
import StatsCounter from '../components/StatsCounter';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const { refCode } = useParams();
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null);

  useEffect(() => {
    if (refCode) {
      setAffiliateCode(refCode);
      // Store affiliate code in localStorage for tracking
      localStorage.setItem('affiliateCode', refCode);
    }
  }, [refCode]);

  return (
    <div className="min-h-screen bg-white">
      <LanguageSelector />
      <HeroSection affiliateCode={affiliateCode} />
      <HowItWorks />
      <PricingTable affiliateCode={affiliateCode} />
      <StatsCounter />
      <PricingTable affiliateCode={affiliateCode} />
      <SocialProof />
      <FAQ />
      <Footer affiliateCode={affiliateCode} />
    </div>
  );
};

export default LandingPage;