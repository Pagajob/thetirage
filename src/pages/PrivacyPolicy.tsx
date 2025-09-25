import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSelector />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Politique de Confidentialité</h1>
          </div>
          <p className="text-xl text-green-100">Protection de vos données personnelles</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
              <p className="text-gray-700 leading-relaxed">
                PAGAJOB SASU, éditeur du site thetirage.com, s'engage à protéger la confidentialité 
                de vos données personnelles conformément au Règlement Général sur la Protection des 
                Données (RGPD) et à la loi Informatique et Libertés.
              </p>
            </div>
          </section>

          {/* Article 1 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1. Données collectées</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Nous collectons les données suivantes dans le cadre de nos services :
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Données d'identification :</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Nom et prénom
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Adresse email
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Numéro de téléphone
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Adresse postale (pour l'envoi des lots)
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Données de navigation :</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    Adresse IP
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    Type de navigateur
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    Pages visitées et durée de visite
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    Cookies et traceurs
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">2. Finalités du traitement</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Vos données sont utilisées pour les finalités suivantes :
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Gestion des jeux-concours</h3>
                  <p className="text-purple-700 text-sm">
                    Organisation des tirages, contact des gagnants, envoi des lots
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Communication</h3>
                  <p className="text-blue-700 text-sm">
                    Envoi d'emails de confirmation, newsletters, support client
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Amélioration du service</h3>
                  <p className="text-orange-700 text-sm">
                    Analyse d'audience, optimisation de l'expérience utilisateur
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Obligations légales</h3>
                  <p className="text-red-700 text-sm">
                    Respect des obligations comptables et fiscales
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">3. Base légale et durée de conservation</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Le traitement de vos données repose sur votre consentement et l'exécution du contrat 
                de participation au jeu-concours.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Durées de conservation :</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Données de participation :</strong> 3 ans après la fin du jeu-concours</li>
                  <li><strong>Données de paiement :</strong> 10 ans (obligations comptables)</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                  <li><strong>Cookies publicitaires :</strong> 13 mois maximum</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vos droits</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Droit d'accès</h3>
                  <p className="text-blue-700 text-sm">
                    Obtenir une copie de vos données personnelles
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-600 p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Droit de rectification</h3>
                  <p className="text-green-700 text-sm">
                    Corriger ou mettre à jour vos données
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-600 p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Droit à l'effacement</h3>
                  <p className="text-red-700 text-sm">
                    Demander la suppression de vos données
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Droit d'opposition</h3>
                  <p className="text-purple-700 text-sm">
                    Vous opposer au traitement de vos données
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Pour exercer vos droits :</strong> Contactez-nous à 
                  <a href="mailto:contact@thetirage.com" className="text-yellow-600 hover:underline ml-1">
                    contact@thetirage.com
                  </a> avec une pièce d'identité.
                </p>
              </div>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies et traceurs</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience et mesurer l'audience.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Types de cookies utilisés :</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
                  <li><strong>Cookies analytiques :</strong> Google Analytics pour mesurer l'audience</li>
                  <li><strong>Cookies publicitaires :</strong> Meta Pixel pour le retargeting</li>
                </ul>
              </div>
              
              <p className="text-gray-700 text-sm">
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sécurité des données</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données contre tout accès non autorisé, altération ou destruction.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Mesures de sécurité :</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Chiffrement SSL/TLS pour toutes les communications</li>
                  <li>• Hébergement sécurisé chez o2switch (France)</li>
                  <li>• Accès restreint aux données personnelles</li>
                  <li>• Sauvegardes régulières et sécurisées</li>
                  <li>• Paiements sécurisés via Stripe (certifié PCI DSS)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact - Délégué à la Protection des Données</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Responsable du traitement :</strong> PAGAJOB SASU</p>
              <p><strong>Email DPO :</strong> <a href="mailto:dpo@thetirage.com" className="text-green-600 hover:underline">dpo@thetirage.com</a></p>
              <p><strong>Contact général :</strong> <a href="mailto:contact@thetirage.com" className="text-green-600 hover:underline">contact@thetirage.com</a></p>
              <p className="text-sm mt-4">
                <strong>Autorité de contrôle :</strong> Vous pouvez également saisir la CNIL 
                (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">www.cnil.fr</a>) 
                en cas de réclamation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;