import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Copy, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Share2, 
  Eye, 
  EyeOff,
  Plus,
  ExternalLink,
  Calendar,
  Mail, 
  Lock,
  Euro,
  ArrowLeft
} from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { supabase, type PromoterStats } from '../lib/supabase';

const PromoterPage: React.FC = () => {
  const { t } = useTranslation();
  const [promoCode, setPromoCode] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<PromoterStats | null>(null);
  const [user, setUser] = useState<any>(null);
  const [hasPromoCode, setHasPromoCode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [showBankingInfo, setShowBankingInfo] = useState(false);
  const [bankingInfo, setBankingInfo] = useState({
    iban: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'FR'
  });
  const [bankingLoading, setBankingLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user && hasPromoCode) {
      fetchStats();
    }
  }, [user, hasPromoCode]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      // Vérifier si l'utilisateur a déjà un code promo
      await checkExistingPromoCode(session.user.id);
    }
  };

  const checkExistingPromoCode = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('promoters')
        .select('promo_code, bank_iban, bank_holder_first_name, bank_holder_last_name, bank_holder_address, bank_holder_city, bank_holder_postal_code, bank_holder_country, bank_info_validated')
        .eq('user_id', userId)
        .single();

      if (data && !error) {
        setPromoCode(data.promo_code);
        setGeneratedLink(`${window.location.origin}/?promo=${data.promo_code}`);
        setHasPromoCode(true);
        
        // Charger les informations bancaires si elles existent
        if (data.bank_iban) {
          setBankingInfo({
            iban: data.bank_iban || '',
            firstName: data.bank_holder_first_name || '',
            lastName: data.bank_holder_last_name || '',
            address: data.bank_holder_address || '',
            city: data.bank_holder_city || '',
            postalCode: data.bank_holder_postal_code || '',
            country: data.bank_holder_country || 'FR'
          });
        }
      }
    } catch (error) {
      console.error('Error checking existing promo code:', error);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Vérifiez votre email pour confirmer votre inscription !');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setShowAuth(false);
        await checkUser();
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setAuthLoading(false);
    }
  };
  const generatePromoCode = async () => {
    if (!promoCode.trim() || !user) return;

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/promoter-create-code`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            promo_code: promoCode.trim().toUpperCase()
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create promo code');
      }

      setPromoCode(result.promo_code);
      setGeneratedLink(`${window.location.origin}/?promo=${result.promo_code}`);
      setHasPromoCode(true);
      
      // Fetch stats after creating code
      await fetchStats();
      
      alert(t('promoter.codeCreated', { defaultValue: 'Code promo créé avec succès!' }));
    } catch (error: any) {
      console.error('Error creating promo code:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!user) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/promoter-stats`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch stats');
      }

      setStats(result);
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    }
  };

  const saveBankingInfo = async () => {
    if (!user) return;
    
    setBankingLoading(true);
    try {
      const { error } = await supabase
        .from('promoters')
        .update({
          bank_iban: bankingInfo.iban,
          bank_holder_first_name: bankingInfo.firstName,
          bank_holder_last_name: bankingInfo.lastName,
          bank_holder_address: bankingInfo.address,
          bank_holder_city: bankingInfo.city,
          bank_holder_postal_code: bankingInfo.postalCode,
          bank_holder_country: bankingInfo.country,
          bank_info_updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      alert('Informations bancaires sauvegardées avec succès !');
      setShowBankingInfo(false);
    } catch (error: any) {
      console.error('Error saving banking info:', error);
      alert('Erreur lors de la sauvegarde : ' + error.message);
    } finally {
      setBankingLoading(false);
    }
  };

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(message);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffccec' }}>
        <LanguageSelector />
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Espace Promoteur
            </h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre tableau de bord
            </p>
          </div>
          
          {!showAuth ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowAuth(true)}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Lock className="h-5 w-5 mr-2" />
                Se connecter / S'inscrire
              </button>
              <p className="text-sm text-gray-500 text-center">
                Créez votre compte pour générer vos liens d'affiliation
              </p>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSignUp}
                    onChange={(e) => setIsSignUp(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Créer un compte
                  </span>
                </label>
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {authLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Lock className="h-5 w-5 mr-2" />
                  )}
                  {isSignUp ? "S'inscrire" : "Se connecter"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuth(false)}
                  className="w-full text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Retour
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffccec' }}>
      <LanguageSelector />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Bouton retour vers le site principal */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour sur Thetirage.com
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <img
              src="/the.png"
              alt="Thetirage"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('promoter.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bienvenue {user.email} ! Encaissez des commissions en partageant Thetirage avec votre réseau.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('promoter.totalSales')}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats?.stats.total_sales || 0}
                </p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('promoter.totalRevenue')}</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(stats?.stats.total_revenue || 0)}
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('promoter.totalEarnings')}</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(stats?.stats.total_commission || 0)}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('promoter.howItWorksTitle')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
              <div className="text-amber-600 font-bold text-lg mb-2">{t('promoter.bronze')}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">0,90€</div>
              <div className="text-sm text-gray-600">{t('promoter.perSale')}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-gray-600 font-bold text-lg mb-2">{t('promoter.silver')}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3,00€</div>
              <div className="text-sm text-gray-600">{t('promoter.perSale')}</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center ring-2 ring-yellow-400">
              <div className="text-yellow-600 font-bold text-lg mb-2">{t('promoter.gold')}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5,60€</div>
              <div className="text-sm text-gray-600">{t('promoter.perSale')}</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
              <p className="text-gray-700">{t('promoter.step1')}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
              <p className="text-gray-700">{t('promoter.step2')}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
              <p className="text-gray-700">{t('promoter.step3')}</p>
            </div>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {hasPromoCode ? 'Votre Code Promoteur' : t('promoter.generateLink')}
          </h2>
          
          {!hasPromoCode ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('promoter.promoCode')}
                </label>
                <input
                  type="text"
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder={t('promoter.promoCodePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={20}
                />
              </div>
              
              <button
                onClick={generatePromoCode}
                disabled={loading || !promoCode.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                {t('promoter.generateButton')}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Code Promo Display */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre code promoteur
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-lg"
                  />
                  <button
                    onClick={() => copyToClipboard(promoCode, 'Code promo copié !')}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Lien d'affiliation */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre lien d'affiliation
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedLink, 'Lien copié !')}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  {showStats ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
                  {showStats ? 'Masquer les stats' : 'Voir mes stats'}
                </button>
                
                <button
                  onClick={() => setShowBankingInfo(true)}
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <Euro className="h-5 w-5 mr-2" />
                  Infos bancaires
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Stats */}
        {showStats && stats && (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Statistiques détaillées
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Taux de commission
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.stats.commission_rate}%
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  Statut
                </h3>
                <p className="text-lg font-semibold text-green-600">
                  {stats.stats.is_active ? 'Actif' : 'Inactif'}
                </p>
              </div>
            </div>

            {/* Recent Sales */}
            {stats.recent_sales && stats.recent_sales.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ventes récentes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Produit</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Montant</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent_sales.map((sale: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-2">
                            {formatDate(sale.created_at)}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {sale.product_name || 'Ticket Thetirage'}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {formatCurrency(parseFloat(sale.amount))}
                          </td>
                          <td className="border border-gray-200 px-4 py-2 font-semibold text-green-600">
                            {formatCurrency(parseFloat(sale.commission_amount))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Banking Info Modal */}
        {showBankingInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informations bancaires
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IBAN *
                    </label>
                    <input
                      type="text"
                      value={bankingInfo.iban}
                      onChange={(e) => setBankingInfo({...bankingInfo, iban: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="FR76 1234 5678 9012 3456 7890 123"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={bankingInfo.firstName}
                        onChange={(e) => setBankingInfo({...bankingInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={bankingInfo.lastName}
                        onChange={(e) => setBankingInfo({...bankingInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      value={bankingInfo.address}
                      onChange={(e) => setBankingInfo({...bankingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        value={bankingInfo.city}
                        onChange={(e) => setBankingInfo({...bankingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        value={bankingInfo.postalCode}
                        onChange={(e) => setBankingInfo({...bankingInfo, postalCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pays *
                    </label>
                    <select
                      value={bankingInfo.country}
                      onChange={(e) => setBankingInfo({...bankingInfo, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="FR">France</option>
                      <option value="BE">Belgique</option>
                      <option value="CH">Suisse</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setShowBankingInfo(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={saveBankingInfo}
                    disabled={bankingLoading}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {bankingLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : null}
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoterPage;