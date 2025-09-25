import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { CircleCheck as CheckCircle, Mail, Calendar, Share2, ArrowRight } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const SuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const refCode = searchParams.get('ref');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const shareOnSocial = (platform: string) => {
    const text = t('success.shareText', { 
      defaultValue: "Je viens de participer au tirage Thetirage pour gagner un iPhone 17 Pro Max ! 🎁 Tentez votre chance aussi !" 
    });
    const url = window.location.origin + (refCode ? `/ref/${refCode}` : '');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <LanguageSelector />
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-10 left-10 text-4xl animate-bounce">🎉</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce delay-100">🎊</div>
          <div className="absolute top-32 left-1/3 text-4xl animate-bounce delay-200">✨</div>
          <div className="absolute top-16 right-1/3 text-4xl animate-bounce delay-300">🎁</div>
          <div className="absolute top-40 left-20 text-4xl animate-bounce delay-400">🏆</div>
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
          <div className="text-6xl mb-4">🎉</div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {t('success.congratulations')}
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <img
              src="/iphone.png"
              alt="iPhone 17 Pro Max"
              className="w-32 h-auto mx-auto opacity-90 drop-shadow-lg"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('success.participating')}
          </h2>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {t('success.ticketValidated')}
          </p>

          {sessionId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>{t('success.transactionNumber')}</strong> {sessionId.slice(-8).toUpperCase()}
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">{t('success.emailConfirmation')}</h3>
                <p className="text-sm text-gray-600">
                  {t('success.emailDescription')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">{t('success.liveDraw')}</h3>
                <p className="text-sm text-gray-600">
                  {t('success.liveDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Share2 className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">
              {t('success.shareTitle')}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            {t('success.shareDescription')}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => shareOnSocial('whatsapp')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              {t('common.whatsapp')}
            </button>
            <button
              onClick={() => shareOnSocial('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              {t('common.facebook')}
            </button>
            <button
              onClick={() => shareOnSocial('twitter')}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              {t('common.twitter')}
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
          >
            {t('success.backHome')}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
          
          <p className="text-sm text-gray-500">
            {t('success.goodLuck')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;