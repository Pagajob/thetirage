import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseBannerProps {
  slot: string;
}

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ slot }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle && window.adsbygoogle.loaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          // Fallback if adsbygoogle is not fully loaded
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center my-8 min-w-[320px]">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5280795861742271"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        key={`adsense-${slot}`}
      />
    </div>
  );
};

export default AdSenseBanner;