import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock, Mail } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const PrivacyPolicy: React.FC = () => {
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
            <Shield className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Politique de confidentialité</h1>
          </div>
          <p className="text-xl text-blue-100">(Thetirage.com)</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <p className="text-gray-700 leading-relaxed">
                La société <strong>PAGAJOB SASU</strong> (ci-après "l'Organisateur"), exploitant le site thetirage.com, 
                attache une grande importance à la protection des données personnelles de ses utilisateurs. 
                La présente politique explique quelles données nous collectons, pourquoi, et comment elles 
                sont utilisées et protégées.
              </p>
            </div>
          </section>

          {/* Responsable du traitement */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">2. Responsable du traitement</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-2">
                <p className="text-gray-700"><strong>PAGAJOB SASU</strong></p>
                <p className="text-gray-700">Siège social : Strada Tudor Arghezi 26, Bucarest, Roumanie</p>
                <p className="text-gray-700">Capital social : 1 000 €</p>
                <p className="text-gray-700">
                  Email : <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline">contact@thetirage.com</a>
                </p>
              </div>
            </div>
          </section>

          {/* Données collectées */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">3. Données collectées</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Lors de l'utilisation du site et de la participation aux jeux-concours, les données suivantes 
                peuvent être collectées :
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Nom, prénom</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone (si fourni)</li>
                <li>Informations de paiement (via Stripe – non stockées par Thetirage)</li>
                <li>Adresse IP et données de navigation (via cookies et outils analytiques)</li>
              </ul>
            </div>
          </section>

          {/* Finalité du traitement */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">4. Finalité du traitement</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Les données collectées sont utilisées pour :
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Gérer la participation aux jeux-concours</li>
                <li>Envoyer les confirmations de paiement et de participation</li>
                <li>Contacter les gagnants</li>
                <li>Respecter les obligations légales et comptables</li>
                <li>Améliorer l'expérience utilisateur et la sécurité du site</li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">5. Base légale</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Le traitement de vos données personnelles repose sur :
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>L'exécution du contrat</strong> : pour la gestion de votre participation</li>
                <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services</li>
                <li><strong>Le consentement</strong> : pour les cookies non essentiels</li>
                <li><strong>L'obligation légale</strong> : pour la conservation des données comptables</li>
              </ul>
            </div>
          </section>

          {/* Conservation des données */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Conservation des données</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Données de participation</strong> : 3 ans après la fin du jeu-concours</li>
                  <li><strong>Données comptables</strong> : 10 ans (obligation légale)</li>
                  <li><strong>Cookies analytiques</strong> : 13 mois maximum</li>
                  <li><strong>Données des gagnants</strong> : 5 ans pour justification des dotations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Partage des données */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Partage des données</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Vos données peuvent être partagées avec :
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Stripe</strong> : pour le traitement sécurisé des paiements</li>
                <li><strong>Prestataires techniques</strong> : hébergement, maintenance (sous contrat de confidentialité)</li>
                <li><strong>Autorités compétentes</strong> : en cas d'obligation légale</li>
              </ul>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Aucune vente ou location</strong> de vos données à des tiers à des fins commerciales.
                </p>
              </div>
            </div>
          </section>

          {/* Vos droits */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">8. Vos droits</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit d'accès</h3>
                  <p className="text-sm text-gray-700">Connaître les données que nous détenons sur vous</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit de rectification</h3>
                  <p className="text-sm text-gray-700">Corriger des données inexactes</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit à l'effacement</h3>
                  <p className="text-sm text-gray-700">Demander la suppression de vos données</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit d'opposition</h3>
                  <p className="text-sm text-gray-700">Vous opposer au traitement de vos données</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Pour exercer vos droits :</strong> Contactez-nous à 
                  <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline ml-1">contact@thetirage.com</a>
                  <br />
                  <span className="text-sm text-gray-600">
                    Réponse sous 30 jours. Une pièce d'identité pourra être demandée pour vérification.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Sécurité */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">9. Sécurité</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Chiffrement des données sensibles (HTTPS/SSL)</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Sauvegarde régulière et sécurisée</li>
                <li>Surveillance et détection des intrusions</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cookies</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Notre site utilise des cookies pour :
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Cookies essentiels</strong> : fonctionnement du site (pas de consentement requis)</li>
                <li><strong>Cookies analytiques</strong> : Google Analytics pour améliorer nos services</li>
                <li><strong>Cookies publicitaires</strong> : Google Ads pour le suivi des conversions</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez gérer vos préférences cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Contact - Délégué à la protection des données</h2>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>Pour toute question relative à cette politique de confidentialité :</p>
              <p><strong>Email :</strong> <a href="mailto:contact@thetirage.com" className="text-blue-600 hover:underline">contact@thetirage.com</a></p>
              <p><strong>Objet :</strong> "Protection des données personnelles"</p>
              <p className="text-sm text-gray-600 mt-4">
                Vous avez également le droit de déposer une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) 
                si vous estimez que vos droits ne sont pas respectés.
              </p>
            </div>
          </section>

          {/* Mise à jour */}
          <section className="mt-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Dernière mise à jour :</strong> 25 septembre 2025<br />
                Cette politique peut être modifiée. Les changements importants vous seront notifiés.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;