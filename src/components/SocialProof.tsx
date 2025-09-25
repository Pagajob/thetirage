import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MessageCircle } from 'lucide-react';

const SocialProof: React.FC = () => {
  const { t } = useTranslation();
  
  const winners = [
    {
      name: "Marie L.",
      prize: "iPhone 15 Pro",
      month: "Avril 2025",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face",
      testimonial: "Je n'y croyais pas au début, mais j'ai vraiment gagné ! L'équipe m'a contacté par téléphone et j'ai recu le colis par La Poste 🔥"
    },
    {
      name: "Thomas K.",
      prize: "Airpods Max",
      month: "Août 2025",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face",
      testimonial: "Merci pour les Airpods Max, j'aodre l'insonorisation et le son !"
    },
    {
      name: "Sarah M.",
      prize: "AirPods Pro",
      month: "Juin 2025",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face",
      testimonial: "Super expérience ! Merci pour les écouteurs ca change des vieux filaires !!"
    }
  ];

  const testimonials = [
    {
      name: "Alex D.",
      rating: 5,
      comment: "Très sérieux, j'ai participé 3 fois et même si je n'ai pas encore gagné, le processus est transparent !",
      verified: true
    },
    {
      name: "Julie P.",
      rating: 5,
      comment: "Enfin un jeu-concours honnête ! Le tirage en live rassure vraiment sur la transparence 💯",
      verified: true
    },
    {
      name: "Kevin R.",
      rating: 5,
      comment: "J'adore l'idée du live Snapchat, on voit tout en temps réel. Très bien fait !",
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Winners Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('socialProof.winnersTitle')}
          </h2>
          <div className="mb-8">
            <span className="text-6xl">🎉</span>
          </div>
          <p className="text-xl text-gray-600">
            {t('socialProof.winnersSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {winners.map((winner, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center mb-4">
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{winner.name}</h3>
                  <p className="text-sm text-gray-600">{winner.month}</p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center text-green-800 font-semibold">
                  {t('socialProof.wonPrize', { prize: winner.prize })}
                </div>
              </div>
              
              <p className="text-gray-700 italic">"{winner.testimonial}"</p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('socialProof.testimonialsTitle')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                {testimonial.verified && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {t('socialProof.verified')}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm font-semibold text-gray-900">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;