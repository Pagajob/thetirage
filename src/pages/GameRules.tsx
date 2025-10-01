import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Calendar, Gift, Users } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const GameRules: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSelector />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center mb-4">
            <Scale className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Règlement du jeu-concours</h1>
          </div>
          <p className="text-xl text-blue-100">« Thetirage »</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Article 1 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 1 – Organisation</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                L'organisation Thetirage, représentée par la société AM TECHNOLOGIES SR organise chaque mois 
                un jeu-concours accessible en ligne via le site https://thetirage.com. Le jeu est ouvert à 
                toute personne majeure résidant en France métropolitaine ou dans un pays de l'union 
                européenne et disposant d'une adresse e-mail valide.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Gift className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 2 – Principe du jeu</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Chaque mois, un lot est mis en jeu (par exemple : iPhone 17 Pro Max pour le tirage 
                d'octobre 2025). Pour participer, l'utilisateur doit acheter un ticket payant via la plateforme 
                Stripe de l'organisateur.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Trois formules de participation sont proposées :</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                    <strong>Ticket Bronze (5,99 €)</strong> → 1 participation
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-400 rounded-full mr-3"></span>
                    <strong>Ticket Silver (9,99 €)</strong> → 2 participations
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
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
              <Calendar className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 3 – Dates et modalités</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Les participations sont ouvertes jusqu'au dernier dimanche du mois à 18h00 (heure de Paris).</strong>
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Le tirage au sort est effectué le dernier jour du mois, la date est toujours indiquée sur le site 
                thetirage.com.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Le gagnant est désigné de manière aléatoire parmi l'ensemble des participations 
                enregistrées.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Le gagnant est contacté par téléphone et/ou e-mail dans un délai maximum de 48 heures 
                  après le tirage.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Scale className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 4 – Dotations</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Le lot en jeu est précisé chaque mois sur la page d'accueil du site.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Le lot ne peut être ni échangé, ni remboursé, ni cédé.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  En cas de force majeure ou de difficulté indépendante de sa volonté, l'organisateur se 
                  réserve le droit de remplacer le lot par un lot de valeur équivalente.
                </p>
              </div>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 5 – Remise des lots</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les lots sont expédiés gratuitement en France métropolitaine dans un délai de 48h après 
                confirmation de l'identité du gagnant.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Pour les résidents hors France métropolitaine, les frais de port internationaux sont à la 
                charge du gagnant.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Si le gagnant ne se manifeste pas dans un délai de 7 jours après le premier contact, 
                  un nouveau tirage sera effectué.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 6 – Données personnelles</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les données personnelles collectées sont utilisées uniquement dans le cadre du jeu-concours 
                et pour contacter les gagnants.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Conformément au RGPD, les participants disposent d'un droit d'accès, de rectification et de 
                suppression de leurs données personnelles.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Pour exercer ces droits, contactez-nous à : contact@thetirage.com
              </p>
            </div>
          </section>

          {/* Article 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 – Responsabilité</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'organisateur ne saurait être tenu responsable des dysfonctionnements du réseau Internet, 
                des lignes téléphoniques ou de tout autre problème technique empêchant le bon déroulement 
                du jeu.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                La participation au jeu implique l'acceptation pleine et entière du présent règlement.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Organisateur :</strong> AM TECHNOLOGIES SR</p>
              <p><strong>Site web :</strong> https://thetirage.com</p>
              <p><strong>Email :</strong> contact@thetirage.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GameRules;