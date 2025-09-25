import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Mail, Video } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: ShoppingCart,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: "text-green-600"
    },
    {
      icon: Video,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src="/iphone2.png"
              alt="iPhone"
              className="w-80 h-auto mx-auto opacity-90 drop-shadow-xl"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg border-4 border-gray-100 group-hover:border-blue-200 transition-all ${step.color}`}>
                  <step.icon className="h-8 w-8" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -ml-10"></div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;