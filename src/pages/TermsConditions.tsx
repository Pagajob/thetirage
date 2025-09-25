import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, CreditCard } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const TermsConditions: React.FC = () => {
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
            <p><strong>Site web :</strong> <a href="https://thetirage.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://thetirage.com</a></p>
            <h1 className="text-4xl font-bold">Conditions Générales d'Utilisation</h1>
          </div>
          <p className="text-xl text-blue-100">Thetirage.com</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Article 1 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 1 – Objet et champ d'application</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du site web 
                thetirage.com exploité par la société PAGAJOB SASU. En accédant au site et en utilisant nos 
                services, vous acceptez sans réserve les présentes conditions.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 2 – Présentation du service</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Thetirage.com est une plateforme de jeux-concours en ligne qui organise mensuellement 
                des tirages au sort avec des lots à gagner. Les utilisateurs peuvent participer en 
                achetant des tickets de participation.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Services proposés :</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Organisation de jeux-concours mensuels
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Vente de tickets de participation
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Tirage au sort transparent et équitable
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Remise des lots aux gagnants
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 3 – Conditions d'accès</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'accès au site est libre et gratuit. La participation aux jeux-concours est réservée 
                aux personnes majeures résidant en France métropolitaine ou dans l'Union Européenne.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Restrictions d'âge et de localisation</h3>
                <p className="text-red-700 text-sm">
                  La participation est strictement interdite aux mineurs et aux résidents de pays 
                  où les jeux d'argent en ligne sont prohibés.
                </p>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 4 – Modalités de paiement</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les paiements sont traités de manière sécurisée par Stripe. Nous acceptons les cartes 
                bancaires Visa, Mastercard et American Express.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Sécurité des paiements</h3>
                <p className="text-gray-700 text-sm">
                  Toutes les transactions sont chiffrées et sécurisées. Nous ne stockons aucune 
                  information bancaire sur nos serveurs.
                </p>
              </div>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 5 – Responsabilité</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                PAGAJOB SASU s'engage à organiser les tirages de manière équitable et transparente. 
                Cependant, notre responsabilité ne saurait être engagée en cas de dysfonctionnements 
                techniques indépendants de notre volonté.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                L'utilisateur est seul responsable de l'utilisation qu'il fait du site et des 
                informations qu'il communique.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 6 – Propriété intellectuelle</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Tous les éléments du site (textes, images, logos, design) sont protégés par le 
                droit d'auteur et appartiennent à PAGAJOB SASU ou à ses partenaires.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Toute reproduction, même partielle, est interdite sans autorisation préalable.
              </p>
            </div>
          </section>

          {/* Article 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 – Modification des CGU</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                PAGAJOB SASU se réserve le droit de modifier les présentes CGU à tout moment. 
                Les modifications prennent effet dès leur publication sur le site.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Il appartient à l'utilisateur de consulter régulièrement les CGU pour prendre 
                connaissance des éventuelles modifications.
              </p>
            </div>
          </section>

          {/* Article 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 – Droit applicable et juridiction</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux 
                français seront seuls compétents.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Société :</strong> PAGAJOB SASU</p>
              <p><strong>Site web :</strong> <a href="https://thetirage.com" className=\"text-blue-600 hover:underline" target=\"_blank" rel="noopener noreferrer">https://thetirage.com</a></p>
              <p><strong>Email :</strong> <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline">contact@thetirage.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;