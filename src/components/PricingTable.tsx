import React from 'react';
import { useTranslation } from 'react-i18next';

interface PricingTableProps {
  affiliateCode?: string | null;
  showHeader?: boolean;
}

const PricingTable: React.FC<PricingTableProps> = ({ affiliateCode, showHeader = true }) => {
  const { t } = useTranslation();
  
  return (
    <section id="pricing" className="py-20" style={{ backgroundColor: '#2848ca' }}>
      <div className="max-w-7xl mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-16 text-white">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('pricing.title')}
            </h2>
            <div className="mb-8">
              <img
                src="/iphone3.png"
                alt="iPhone à gagner" 
                className="w-72 h-auto mx-auto opacity-90 drop-shadow-xl"
              />
            </div>
            <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
        )}

        {/* Wrapper large et centré pour forcer le layout desktop */}
<section className="w-full">
  <div className="w-full mb-10 flex justify-center">
    <div className="w-full max-w-4xl">
      <style>{`
        stripe-pricing-table {
          border-radius: 12px !important;
          width: 100% !important;
          margin: 0 auto !important;
        }
        stripe-pricing-table > div,
        stripe-pricing-table table,
        stripe-pricing-table [class*="container"] {
          width: 100% !important;
          border-radius: 12px !important;
        }
        @media (max-width: 768px) {
          stripe-pricing-table {
            margin: 0 !important;
            padding: 0 16px !important;
          }
        }
      `}</style>
      {/* IMPORTANT: script Stripe dans <head> :
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1SBHH8EWa5JpT2nEApE5XLx4"
        publishable-key="pk_live_51SBGkpEWa5JpT2nEuoHUSBjHeOYwuccT0OOB7uYLIvaxgujsRW0mDIPCBvmdQ2nsbDFeN1GK6RhhqjM0J8iwP3Yt00NLN4tzql"
      />
    </div>
  </div>
</section>

        <div className="text-center mt-12">
          <p className="text-white">
            {t('pricing.security')}
          </p>
          {affiliateCode && (
            <div className="mt-4 p-3 rounded-lg inline-block bg-white bg-opacity-20 border border-white border-opacity-30">
              <p className="text-sm font-medium text-white">
                🎉 Code promoteur actif: <strong>{affiliateCode}</strong>
              </p>
              <p className="text-xs mt-1 text-white text-opacity-90">
                Vous bénéficiez de 10% de réduction sur votre commande !
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;