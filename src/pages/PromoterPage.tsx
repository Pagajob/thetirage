import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  Euro
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <LanguageSelector />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Share2 className="h-12 w-12 text-blue-600 mr-3" />
            <img
              src="/thegrey.png"
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium mb-1">Votre code unique</p>
                    <p className="text-3xl font-bold text-blue-900">{promoCode}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Réduction client: 10% • Commission variable selon ticket
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(promoCode, 'Code copié !')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t('promoter.copy')}
                  </button>
                </div>
              </div>

              {/* Link Sharing */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Lien de partage</h3>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedLink, t('promoter.copied'))}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copier
                  </button>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Commission Info */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('promoter.howItWorksTitle')}</h2>
          
          {/* Commission Rates */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-amber-600 font-bold text-lg">{t('promoter.bronze')}</div>
                <div className="text-2xl font-bold text-green-600">15%</div>
                <div className="text-sm text-gray-600">~0,90 € {t('promoter.perSale')}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-gray-600 font-bold text-lg">{t('promoter.silver')}</div>
                <div className="text-2xl font-bold text-green-600">30%</div>
                <div className="text-sm text-gray-600">~3,00 € {t('promoter.perSale')}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 ring-2 ring-green-400">
              <div className="text-center">
                <div className="text-yellow-600 font-bold text-lg">{t('promoter.gold')}</div>
                <div className="text-2xl font-bold text-green-600">35%</div>
                <div className="text-sm text-gray-600">~5,60 € {t('promoter.perSale')}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
              <p className="text-gray-700">{t('promoter.step1')}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
              <p className="text-gray-700">{t('promoter.step2')}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
              <p className="text-gray-700">Vous recevez votre commission sur chaque vente (15% à 35% selon le ticket, paiement sous 7 jours)</p>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        {hasPromoCode && (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('promoter.detailedStats')}</h2>
              <button
                onClick={() => setShowStats(!showStats)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                {showStats ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
                {showStats ? t('promoter.hide') : t('promoter.show')}
              </button>
            </div>
            
            {showStats && stats && (
              <div className="space-y-6">
                {/* Recent Sales Table */}
                {stats.recent_sales.length > 0 ? (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Ventes récentes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Produit</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Montant</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Commission</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {stats.recent_sales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                {formatDate(sale.created_at)}
                              </td>
                              <td className="px-4 py-3">{sale.product_name || 'Ticket Thetirage'}</td>
                              <td className="px-4 py-3 font-medium">{formatCurrency(sale.amount)}</td>
                              <td className="px-4 py-3 font-medium text-green-600">
                                {formatCurrency(sale.commission_amount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune vente pour le moment</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Partagez votre lien pour commencer à générer des commissions !
                    </p>
                  </div>
                )}

                {/* Validation Stripe */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Validation Stripe</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Utilisations détectées:</span>
                      <span className="font-medium ml-2">{stats.stripe_validation.usage_count}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">CA Stripe:</span>
                      <span className="font-medium ml-2">{formatCurrency(stats.stripe_validation.total_amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Banking Information Section */}
        {hasPromoCode && (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Euro className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Informations bancaires</h2>
              </div>
              <button
                onClick={() => setShowBankingInfo(!showBankingInfo)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                {showBankingInfo ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
                {showBankingInfo ? 'Masquer' : 'Modifier'}
              </button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">ℹ</div>
                <div>
                  <p className="text-blue-800 font-medium mb-1">Paiement des commissions</p>
                  <p className="text-blue-700 text-sm">
                    Vos commissions sont versées automatiquement après chaque tirage sur votre compte bancaire. 
                    Assurez-vous que vos informations sont correctes pour éviter tout retard de paiement.
                  </p>
                </div>
              </div>
            </div>

            {!showBankingInfo ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Titulaire du compte</p>
                    <p className="font-medium text-gray-900">
                      {bankingInfo.firstName && bankingInfo.lastName 
                        ? `${bankingInfo.firstName} ${bankingInfo.lastName}`
                        : 'Non renseigné'
                      }
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">IBAN</p>
                    <p className="font-medium text-gray-900">
                      {bankingInfo.iban 
                        ? `${bankingInfo.iban.slice(0, 8)}****${bankingInfo.iban.slice(-4)}`
                        : 'Non renseigné'
                      }
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Adresse</p>
                  <p className="font-medium text-gray-900">
                    {bankingInfo.address && bankingInfo.city 
                      ? `${bankingInfo.address}, ${bankingInfo.postalCode} ${bankingInfo.city}`
                      : 'Non renseignée'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={bankingInfo.firstName}
                      onChange={(e) => setBankingInfo({...bankingInfo, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre prénom"
                      required
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
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IBAN *
                  </label>
                  <input
                    type="text"
                    value={bankingInfo.iban}
                    onChange={(e) => setBankingInfo({...bankingInfo, iban: e.target.value.toUpperCase().replace(/\s/g, '')})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="FR76 1234 5678 9012 3456 7890 123"
                    maxLength={34}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format : FR76 suivi de 23 chiffres (espaces automatiquement supprimés)
                  </p>
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
                    placeholder="123 Rue de la République"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      value={bankingInfo.postalCode}
                      onChange={(e) => setBankingInfo({...bankingInfo, postalCode: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="75001"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      value={bankingInfo.city}
                      onChange={(e) => setBankingInfo({...bankingInfo, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Paris"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pays
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

                <div className="flex space-x-4">
                  <button
                    onClick={saveBankingInfo}
                    disabled={bankingLoading || !bankingInfo.firstName || !bankingInfo.lastName || !bankingInfo.iban || !bankingInfo.address || !bankingInfo.city || !bankingInfo.postalCode}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {bankingLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Euro className="h-5 w-5 mr-2" />
                    )}
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setShowBankingInfo(false)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoterPage;