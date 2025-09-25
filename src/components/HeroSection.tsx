import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';

interface HeroSectionProps {
  affiliateCode?: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ affiliateCode }) => {
  const { t } = useTranslation();
  
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {affiliateCode && (
              <div className="inline-flex items-center bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Zap className="h-4 w-4 mr-2" />
                {t('hero.sharedBy', { code: affiliateCode })}
              </div>
            )}
            
            <div className="flex justify-center lg:justify-start mb-6">
              <img
                src="/thegrey.png"
                alt="The"
                className="h-24 w-auto"
              />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" dangerouslySetInnerHTML={{
              __html: `${t('hero.title')}<span class="text-yellow-400 block">${t('hero.titleHighlight')}</span>`
            }}>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed" dangerouslySetInnerHTML={{
              __html: t('hero.subtitle')
            }}>
            </p>
            
            <button
              onClick={scrollToPricing}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              {t('hero.cta')}
            </button>
            
            <p className="text-blue-200 text-sm mt-4">
              {t('hero.confirmation')}
            </p>
          </div>

          {/* Right Content - Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/iphone.png"
                  alt="iPhone 17 Pro Max - Prix principal"
                  className="w-96 h-auto drop-shadow-2xl"
                />
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-blue-900 px-6 py-3 rounded-2xl font-bold text-xl shadow-xl">
                  Valeur 1 479 €
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;