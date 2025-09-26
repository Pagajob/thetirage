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
              {/* Code Promo Display