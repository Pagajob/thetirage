import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building, Mail, Phone, Globe } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const LegalNotice: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSelector />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center mb-4">
            <Building className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Mentions Légales</h1>
          </div>
          <p className="text-xl text-gray-100">Informations légales et réglementaires</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Éditeur du site */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-gray-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Éditeur du site</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Raison sociale :</strong>
                  <span className="text-gray-700">PAGAJOB SASU</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">SIRET :</strong>
                  <span className="text-gray-700">À compléter</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Capital social :</strong>
                  <span className="text-gray-700">À compléter</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Siège social :</strong>
                  <span className="text-gray-700">À compléter</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">RCS :</strong>
                  <span className="text-gray-700">À compléter</span>
                </div>
              </div>
            </div>
          </section>

          {/* Directeur de publication */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de publication</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Nom :</strong> [Nom du dirigeant de PAGAJOB SASU]<br />
                <strong>Qualité :</strong> Président de PAGAJOB SASU
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-gray-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-700">
                  <a href="mailto:contact@thetirage.com" className="text-purple-600 hover:underline">
                    contact@thetirage.com
                  </a>
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Site web</h3>
                </div>
                <p className="text-gray-700">
                  <a href="https://thetirage.com" className="text-blue-600 hover:underline">
                    https://thetirage.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Hébergement */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Hébergeur :</strong>
                  <span className="text-gray-700">o2switch</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Adresse :</strong>
                  <span className="text-gray-700">
                    222-224 Boulevard Gustave Flaubert<br />
                    63000 Clermont-Ferrand, France
                  </span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Téléphone :</strong>
                  <span className="text-gray-700">04 44 44 60 40</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-gray-900 w-32 flex-shrink-0">Site web :</strong>
                  <span className="text-gray-700">
                    <a href="https://www.o2switch.fr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                      www.o2switch.fr
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, 
                logiciels, etc.) est protégé par le droit d'auteur, le droit des marques et/ou 
                d'autres droits de propriété intellectuelle.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  <strong>Attention :</strong> Toute reproduction, représentation, modification, 
                  publication, adaptation de tout ou partie des éléments du site, quel que soit 
                  le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
                </p>
              </div>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection des données personnelles</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la 
                loi Informatique et Libertés, vous disposez de droits sur vos données personnelles.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  Pour plus d'informations, consultez notre 
                  <Link to="/confidentialite" className="text-blue-600 hover:underline ml-1">
                    Politique de Confidentialité
                  </Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser 
                des statistiques de visite. En continuant votre navigation, vous acceptez 
                l'utilisation de ces cookies.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Types de cookies utilisés :</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Cookies techniques (nécessaires au fonctionnement)</li>
                  <li>• Cookies analytiques (Google Analytics)</li>
                  <li>• Cookies publicitaires (Meta Pixel)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Responsabilité */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation de responsabilité</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                PAGAJOB SASU s'efforce d'assurer au mieux l'exactitude et la mise à jour des 
                informations diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, 
                la précision ou l'exhaustivité des informations mises à disposition.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                En conséquence, PAGAJOB SASU décline toute responsabilité pour toute imprécision, 
                inexactitude ou omission portant sur des informations disponibles sur le site.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Droit applicable</h2>
            <p className="text-gray-700">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, 
              les tribunaux français seront seuls compétents.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;