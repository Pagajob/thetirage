import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Building, CreditCard, Shield, Users, Gift } from 'lucide-react';
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
            <Scale className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Conditions Générales de Vente et d'Utilisation</h1>
          </div>
          <p className="text-xl text-blue-100">CGVU – Thetirage.com</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Article 1 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 1 – Identification de l'organisateur</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed mb-4">
                Le site <strong>Thetirage.com</strong> est édité et exploité par la société <strong>PAGAJOB SASU</strong>, 
                immatriculée au Registre du Commerce et des Sociétés de Lyon, dont le siège social est situé :
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">PAGAJOB SASU</p>
                <p className="text-gray-700">Strada Tudor Arghezi 26, Bucarest, Roumanie</p>
                <p className="text-gray-700">Capital social : <strong>1 000 €</strong></p>
                <p className="text-gray-700">Représentée par <strong>Allan Dahmani</strong></p>
                <p className="text-gray-700 mt-2">
                  Contact : <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline">contact@thetirage.com</a>
                </p>
              </div>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Scale className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 2 – Objet</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales de Vente et d'Utilisation (CGVU) régissent :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>L'accès et l'utilisation du site <strong>thetirage.com</strong></li>
                <li>Les modalités de participation aux jeux-concours organisés par l'éditeur</li>
                <li>Les droits et obligations des participants et de l'organisateur</li>
              </ul>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 3 – Conditions de participation</h2>
            </div>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Être majeur (18 ans révolus) et résider en France métropolitaine ou dans l'Union Européenne</li>
                <li>Disposer d'une adresse e-mail valide</li>
                <li>Acheter au moins un ticket de participation via la plateforme sécurisée <strong>Stripe</strong></li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Important :</strong> Toute participation non conforme ou frauduleuse sera annulée par l'organisateur.
                </p>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Gift className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 4 – Modalités des jeux-concours</h2>
            </div>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Chaque mois, un lot est mis en jeu (ex. iPhone 17 Pro Max en octobre 2025)</li>
                <li>Les participations sont ouvertes jusqu'au <strong>dernier jour du mois à 18h (heure de Paris)</strong></li>
                <li>Le tirage au sort est effectué le <strong>dernier jour du mois</strong> parmi l'ensemble des participations validées</li>
                <li>Le gagnant est désigné de manière aléatoire et contacté par téléphone et/ou e-mail sous 48h</li>
              </ul>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 5 – Tickets et tarifs</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">Trois formules sont proposées :</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                  <div className="text-amber-600 font-bold text-lg mb-2">Ticket Bronze</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">5,99 €</div>
                  <div className="text-sm text-gray-600">→ 1 participation</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-gray-600 font-bold text-lg mb-2">Ticket Silver</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">9,99 €</div>
                  <div className="text-sm text-gray-600">→ 2 participations</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center ring-2 ring-yellow-400">
                  <div className="text-yellow-600 font-bold text-lg mb-2">Ticket Gold</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">15,99 €</div>
                  <div className="text-sm text-gray-600">→ 4 participations + bonus</div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Chaque ticket donne droit à un ou plusieurs numéros uniques, enregistrés par l'organisateur.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Article 6 – Paiement</h2>
            </div>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Les paiements sont réalisés exclusivement en ligne par carte bancaire via <strong>Stripe</strong></li>
                <li>Les transactions sont sécurisées et cryptées</li>
                <li>Aucun remboursement ne sera accordé, sauf en cas d'annulation du jeu par l'organisateur</li>
              </ul>
            </div>
          </section>

          {/* Article 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 – Dotations</h2>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Le lot en jeu est précisé chaque mois sur la page d'accueil du site</li>
                <li>Le lot ne peut être ni échangé, ni remboursé, ni cédé</li>
                <li>En cas de force majeure, l'organisateur se réserve le droit de remplacer le lot par un autre d'une valeur équivalente</li>
              </ul>
            </div>
          </section>

          {/* Article 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 – Données personnelles</h2>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Les informations collectées sont utilisées uniquement pour la gestion du jeu et la remise du lot</li>
                <li>Elles sont traitées conformément au <strong>RGPD</strong></li>
                <li>Chaque participant dispose d'un droit d'accès, de rectification et de suppression en écrivant à : 
                  <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline ml-1">contact@thetirage.com</a>
                </li>
              </ul>
            </div>
          </section>

          {/* Article 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 9 – Responsabilités</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'organisateur ne saurait être tenu responsable en cas de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Dysfonctionnement technique, bug ou indisponibilité du site</li>
                <li>Fraude, piratage ou utilisation abusive des moyens de paiement</li>
                <li>Perte, vol ou retard dans la communication avec le gagnant</li>
              </ul>
            </div>
          </section>

          {/* Article 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 10 – Acceptation du règlement</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                La participation au jeu implique l'acceptation pleine et entière des présentes CGVU, 
                accessibles à tout moment sur le site <strong>thetirage.com</strong>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Organisateur :</strong> PAGAJOB SASU</p>
              <p><strong>Site web :</strong> https://thetirage.com</p>
              <p><strong>Email :</strong> <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline">contact@thetirage.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;