import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Shield, Camera, CreditCard, Truck } from 'lucide-react';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1'),
      icon: Shield
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2'),
      icon: CreditCard
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3'),
      icon: Truck
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center">
                  {faq.icon && (
                    <faq.icon className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="bg-blue-50 rounded-lg p-4 ml-10">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('faq.contactTitle')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('faq.contactSubtitle')}
            </p>
            <a 
              href="mailto:contact@thetirage.com?subject=Question sur Thetirage&body=Bonjour,%0D%0A%0D%0AJ'ai une question concernant le jeu-concours Thetirage :%0D%0A%0D%0A"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
            >
              {t('faq.contactButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;