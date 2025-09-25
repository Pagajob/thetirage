import React from 'react';
import { X, Scale, Calendar, Gift, Users } from 'lucide-react';

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameRulesModal: React.FC<GameRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Scale className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Règlement du jeu-concours
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Article 1 */}
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Article 1 – Organisation</h3>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  L'organisation Thetirage, représentée par la société PAGAJOB SASU organise chaque mois 
                  un jeu-concours accessible en ligne via le site https://thetirage.com. Le jeu est ouvert à 
                  toute personne majeure résidant en France métropolitaine ou dans un pays de l'union 
                  européenne et disposant d'une adresse email valide.
                </p>
              </div>
            </section>

            {/* Article 2 */}
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <Gift className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Article 2 – Principe du jeu</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Chaque mois, un lot est mis en jeu (par exemple : iPhone 17 Pro Max pour le tirage 
                  d'octobre 2025). Pour participer, l'utilisateur doit acheter un ticket payant via la plateforme 
                  Stripe de l'organisateur.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm">Trois formules de participation :</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                      <strong>Ticket Bronze (5,99 €)</strong> → 1 participation
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      <strong>Ticket Silver (9,99 €)</strong> → 2 participations
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                      <strong>Ticket Gold (15,99 €)</strong> → 4 participations + bonus
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  Chaque ticket correspond à une entrée au tirage au sort du mois en cours.
                </p>
              </div>
            </section>

            {/* Article 3 */}
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Article 3 – Dates et modalités</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-800 font-medium mb-1 text-sm">📅 Participation</p>
                  <p className="text-purple-700 text-sm">
                    Jusqu'au dernier dimanche du mois à 18h00 (heure de Paris).
                  </p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 font-medium mb-1 text-sm">🎯 Tirage</p>
                  <p className="text-red-700 text-sm">
                    Le dernier jour du mois, date indiquée sur thetirage.com.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 font-medium mb-1 text-sm">🏆 Gagnant</p>
                  <p className="text-yellow-700 text-sm">
                    Désigné aléatoirement parmi toutes les participations.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 font-medium mb-1 text-sm">📞 Contact</p>
                  <p className="text-blue-700 text-sm">
                    Contacté sous 48h par téléphone et/ou e-mail.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 4 */}
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <Gift className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Article 4 – Dotations</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <p className="text-indigo-700 text-sm">
                    Le lot en jeu est précisé chaque mois sur la page d'accueil du site.
                  </p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-700 text-sm">
                    Le lot ne peut être ni échangé, ni remboursé, ni cédé.
                  </p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-orange-700 text-sm">
                    En cas de force majeure, l'organisateur se réserve le droit de reporter, 
                    d'annuler ou de modifier le lot proposé.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Contact</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Organisateur :</strong> PAGAJOB SASU</p>
                <p><strong>Site :</strong> <a href="https://thetirage.com" className=\"text-blue-600 hover:underline">thetirage.com</a></p>
                <p><strong>Email :</strong> <a href="mailto:contact@pagajob.com" className="text-blue-600 hover:underline">contact@pagajob.com</a></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Règlement mis à jour le {new Date().toLocaleDateString('fr-FR')}
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRulesModal;