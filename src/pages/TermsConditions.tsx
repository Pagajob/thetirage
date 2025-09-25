import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CreditCard, Users, Globe, FileText, Lock } from 'lucide-react';
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
            <FileText className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Conditions Générales d'Utilisation</h1>
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
              <Globe className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 1 – Objet</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») définissent les modalités et conditions dans lesquelles la société <strong>PAGAJOB SASU</strong> (ci-après « l'Organisateur »), propose l'accès et l'utilisation du site <a href="https://thetirage.com" className="text-blue-600 hover:underline">https://thetirage.com</a>.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Le site permet aux utilisateurs d'acheter des participations afin de prendre part à des tirages au sort mensuels, organisés pour attribuer un lot défini et communiqué sur la plateforme.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 2 – Acceptation des CGU</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'utilisation du site et la participation aux jeux-concours impliquent l'acceptation pleine et entière des présentes CGU.
              </p>
              <p className="text-gray-700 leading-relaxed">
                L'utilisateur reconnaît avoir pris connaissance des règles du jeu, disponibles dans le <strong>Règlement officiel du jeu-concours</strong>, et s'engage à les respecter.
              </p>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 3 – Accès au site</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Le site est accessible gratuitement à tout utilisateur disposant d'une connexion Internet.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Certains services, tels que l'achat de participations, nécessitent un paiement via la plateforme sécurisée <strong>Stripe</strong>.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  L'Organisateur se réserve le droit d'interrompre, de suspendre ou de modifier l'accès au site à tout moment, notamment pour des raisons techniques ou de maintenance.
                </p>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 4 – Participation aux jeux</h2>
            </div>
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">
                    La participation est ouverte à toute personne majeure résidant en France métropolitaine ou dans l'Union Européenne, disposant d'une adresse e-mail valide.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">
                    Chaque ticket acheté correspond à une ou plusieurs participations au tirage mensuel, selon la formule choisie (Bronze, Silver ou Gold).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">
                    L'utilisateur reconnaît que l'achat d'un ticket constitue une participation à un jeu de hasard et non un investissement financier.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 5 – Modalités de paiement</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  Les paiements sont traités via <strong>Stripe</strong>, prestataire de services de paiement certifié PCI-DSS.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Aucune donnée bancaire n'est conservée par l'Organisateur.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                La transaction est considérée comme ferme et définitive après confirmation du paiement.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 6 – Dotations</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Le lot en jeu est indiqué sur le site et peut varier chaque mois (par exemple : un iPhone 17 Pro Max pour octobre 2025).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Le lot ne peut être ni échangé, ni remboursé, ni converti en argent.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  En cas d'indisponibilité du lot, l'Organisateur se réserve le droit de proposer un lot de valeur équivalente.
                </p>
              </div>
            </div>
          </section>

          {/* Article 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 – Responsabilités</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'Organisateur ne saurait être tenu responsable :
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">
                    d'éventuelles interruptions ou dysfonctionnements techniques du site,
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">
                    de tout dommage résultant d'une utilisation non conforme du site par l'utilisateur,
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">
                    en cas de fraude, force majeure ou cas fortuit perturbant le déroulement du jeu.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Article 8 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 8 – Données personnelles</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les données collectées (nom, prénom, e-mail, etc.) sont nécessaires à la gestion du jeu et à l'envoi des confirmations de participation.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  Elles sont traitées conformément au <strong>RGPD</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Chaque utilisateur dispose d'un droit d'accès, de rectification et de suppression en écrivant à : <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline"><strong>contact@thetirage.com</strong></a>.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Les données ne sont en aucun cas transmises à des tiers non autorisés.
              </p>
            </div>
          </section>

          {/* Article 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 9 – Propriété intellectuelle</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Le site, son contenu (textes, images, logos) et ses fonctionnalités sont la propriété exclusive de PAGAJOB SASU.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  Toute reproduction, représentation ou exploitation non autorisée est strictement interdite.
                </p>
              </div>
            </div>
          </section>

          {/* Article 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 10 – Modification des CGU</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'Organisateur se réserve le droit de modifier les présentes CGU à tout moment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Les utilisateurs seront informés en cas de modification substantielle.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  La version en vigueur est celle publiée sur le site au moment de l'utilisation.
                </p>
              </div>
            </div>
          </section>

          {/* Article 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 11 – Droit applicable et juridiction compétente</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les présentes CGU sont soumises au droit français.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux français.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Organisateur :</strong> PAGAJOB SASU</p>
              <p><strong>Site web :</strong> <a href="https://thetirage.com" className="text-blue-600 hover:underline">https://thetirage.com</a></p>
              <p><strong>Email :</strong> <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline">contact@thetirage.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;