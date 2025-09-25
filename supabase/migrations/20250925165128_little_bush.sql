/*
  # Système de promoteurs/affiliés

  1. Nouvelles tables
    - `promoters`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key vers auth.users)
      - `promo_code` (text, unique)
      - `stripe_promotion_code_id` (text, ID du promotion code Stripe)
      - `commission_rate` (decimal, taux de commission en %)
      - `total_commission` (decimal, commission totale gagnée)
      - `total_sales` (integer, nombre de ventes)
      - `total_revenue` (decimal, CA total généré)
      - `is_active` (boolean, statut actif/inactif)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `affiliate_sales`
      - `id` (uuid, primary key)
      - `promoter_id` (uuid, foreign key vers promoters)
      - `checkout_session_id` (text, ID de la session Stripe)
      - `customer_email` (text)
      - `amount` (decimal, montant de la vente)
      - `commission_amount` (decimal, commission pour cette vente)
      - `product_name` (text, nom du produit acheté)
      - `created_at` (timestamp)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies pour que les promoteurs ne voient que leurs données
*/

-- Table des promoteurs
CREATE TABLE IF NOT EXISTS promoters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  promo_code text UNIQUE NOT NULL,
  stripe_promotion_code_id text,
  commission_rate decimal(5,2) DEFAULT 20.00,
  total_commission decimal(10,2) DEFAULT 0.00,
  total_sales integer DEFAULT 0,
  total_revenue decimal(10,2) DEFAULT 0.00,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des ventes d'affiliation
CREATE TABLE IF NOT EXISTS affiliate_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  promoter_id uuid REFERENCES promoters(id) ON DELETE CASCADE,
  checkout_session_id text NOT NULL,
  customer_email text,
  amount decimal(10,2) NOT NULL,
  commission_amount decimal(10,2) NOT NULL,
  product_name text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE promoters ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_sales ENABLE ROW LEVEL SECURITY;

-- Policies pour promoters
CREATE POLICY "Promoters can view own data"
  ON promoters
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Promoters can insert own data"
  ON promoters
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Promoters can update own data"
  ON promoters
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies pour affiliate_sales
CREATE POLICY "Promoters can view own sales"
  ON affiliate_sales
  FOR SELECT
  TO authenticated
  USING (promoter_id IN (
    SELECT id FROM promoters WHERE user_id = auth.uid()
  ));

-- Indexes pour performance
CREATE INDEX IF NOT EXISTS idx_promoters_user_id ON promoters(user_id);
CREATE INDEX IF NOT EXISTS idx_promoters_promo_code ON promoters(promo_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_sales_promoter_id ON affiliate_sales(promoter_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_sales_checkout_session ON affiliate_sales(checkout_session_id);