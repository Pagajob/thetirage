import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Zap, ExternalLink } from 'lucide-react';

interface FooterProps {
  affiliateCode?: string | null;
}

const Footer: React.FC<FooterProps> = ({ affiliateCode }) => {
  const { t } = useTranslation();
  
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Final CTA */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/iphone17.png"
                alt="iPhone à gagner"
                className="w-24 h-auto opacity-90"
              />
            </div>
            <div className="flex justify-center mb-6">
              <img
                src="/iphone.png"
                alt="iPhone à gagner"
                className="w-48 h-auto opacity-95 drop-shadow-xl"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-900 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                {t('footer.lastChance')}
              </h2>
            </div>
            <p className="text-xl text-gray-900 mb-6" dangerouslySetInnerHTML={{
              __html: t('footer.deadline')
            }}>
            </p>
            <button
              onClick={scrollToPricing}
              className="bg-gray-900 text-yellow-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center transform hover:scale-105"
            >
              <Zap className="h-5 w-5 mr-2" />
              {t('footer.participateNow')}
            </button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img
                src="/thegrey.png"
                alt="The"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legalInfo')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/reglement" className="hover:text-white transition-colors">
                  {t('footer.gameRules')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="mailto:contact@thetirage.com?subject=Support%20Client%20-%20Thetirage&body=Bonjour,%0D%0A%0D%0AJ'ai%20besoin%20d'aide%20concernant%20:%0D%0A%0D%0A" className="hover:text-white transition-colors">
                  {t('footer.support')}
                </a>
              </li>
              <li>
                <a href="/promoteur" className="hover:text-yellow-400 transition-colors font-medium">
                  💰 Espace Promoteur
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center justify-center md:justify-start"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('footer.snapchat')}
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center justify-center md:justify-start"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('footer.instagram')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
          <p className="text-sm mt-2">
            {t('footer.gameInfo')}
          </p>
          {affiliateCode && (
            <p className="text-xs mt-2 text-yellow-400">
              {t('footer.viaPromoter', { code: affiliateCode })}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;