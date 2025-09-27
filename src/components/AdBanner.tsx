import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  adSlot: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  adSlot, 
  style = {}, 
  className = "" 
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    const pushAd = () => {
      try {
        // Vérifier que l'élément existe et n'a pas déjà été initialisé
        if (adRef.current && !isAdPushed.current) {
          // S'assurer que adsbygoogle est disponible
          if (typeof window !== 'undefined' && window.adsbygoogle) {
            // Marquer comme initialisé avant le push pour éviter les doublons
            isAdPushed.current = true;
            
            // Pousser l'annonce
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            
            console.log(`AdSense ad pushed for slot: ${adSlot}`);
          } else {
            console.warn('AdSense script not loaded yet');
          }
        }
      } catch (error) {
        console.error('AdSense error:', error);
        // Réinitialiser le flag en cas d'erreur pour permettre une nouvelle tentative
        isAdPushed.current = false;
      }
    };

    // Délai pour s'assurer que le DOM est prêt et que l'élément a une taille
    const timer = setTimeout(pushAd, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [adSlot]);

  // Reset du flag si le slot change
  useEffect(() => {
    isAdPushed.current = false;
  }, [adSlot]);

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    minHeight: '100px',
    minWidth: '320px',
    ...style
  };

  return (
    <div className={`ad-banner-container ${className}`} style={{ textAlign: 'center', margin: '20px 0' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-5280795861742271"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;