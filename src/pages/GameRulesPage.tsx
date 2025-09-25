import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Calendar, Gift, Users } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const GameRulesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSelector />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center mb-4">
            <Scale className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Règlement du jeu-concours « Thetirage »
            </h1>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <img src="/thegrey.png" alt="Thetirage" className="h-6 w-auto mr-2" />
            Organisé par PAGAJOB SASU
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Article 1 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 1 – Organisation</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                L'organisation Thetirage, représentée par la société PAGAJOB SASU organise chaque mois 
                un jeu-concours accessible en ligne via le site https://thetirage.com. Le jeu est ouvert à 
                toute personne majeure résidant en France métropolitaine ou dans un pays de l'union 
                européenne et disposant d'une adresse email valide.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Gift className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 2 – Principe du jeu</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Chaque mois, un lot est mis en jeu (par exemple : iPhone 17 Pro Max pour le tirage 
                d'octobre 2025). Pour participer, l'utilisateur doit acheter un ticket payant via la plateforme 
                Stripe de l'organisateur.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">Trois formules de participation sont proposées :</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                    <strong>Ticket Bronze (5,99 €)</strong> → 1 participation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    <strong>Ticket Silver (9,99 €)</strong> → 2 participations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <strong>Ticket Gold (15,99 €)</strong> → 4 participations + bonus
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Chaque ticket correspond à une entrée au tirage au sort du mois en cours.
              </p>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 3 – Dates et modalités</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 font-medium mb-2">📅 Période de participation</p>
                <p className="text-purple-700">
                  Les participations sont ouvertes jusqu'au dernier dimanche du mois à 18h00 (heure de Paris).
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-2">🎯 Tirage au sort</p>
                <p className="text-red-700">
                  Le tirage au sort est effectué le dernier jour du mois, la date est toujours indiquée sur le site thetirage.com.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium mb-2">🏆 Désignation du gagnant</p>
                <p className="text-yellow-700">
                  Le gagnant est désigné de manière aléatoire parmi l'ensemble des participations enregistrées.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium mb-2">📞 Contact du gagnant</p>
                <p className="text-blue-700">
                  Le gagnant est contacté par téléphone et/ou e-mail dans un délai maximum de 48 heures après le tirage.
                </p>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Gift className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 4 – Dotations</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-indigo-700 leading-relaxed">
                  Le lot en jeu est précisé chaque mois sur la page d'accueil du site.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  Le lot ne peut être ni échangé, ni remboursé, ni cédé.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-700 leading-relaxed">
                  En cas de force majeure ou de difficulté indépendante de sa volonté, l'organisateur se 
                  réserve le droit de reporter, d'annuler ou de modifier le lot proposé.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact</h3>
            <div className="space-y-2 text-blue-800">
              <p><strong>Organisateur :</strong> PAGAJOB SASU</p>
              <p><strong>Site web :</strong> <a href="https://thetirage.com" className=\"text-blue-600 hover:underline">https://thetirage.com</a></p>
              <p><strong>Email :</strong> <a href="mailto:contact@pagajob.com" className="text-blue-600 hover:underline">contact@pagajob.com</a></p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Règlement mis à jour le {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRulesPage;