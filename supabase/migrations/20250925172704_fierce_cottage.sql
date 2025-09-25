/*
  # Ajouter les informations bancaires aux promoteurs

  1. Modifications
    - Ajouter les colonnes pour les informations bancaires à la table promoters
    - Champs pour IBAN, nom, prénom, adresse
    - Statut de validation des informations

  2. Sécurité
    - Les données bancaires sont sensibles et protégées par RLS
    - Seul le propriétaire peut voir/modifier ses informations
*/

-- Ajouter les colonnes d'informations bancaires
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_iban TEXT;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_holder_first_name TEXT;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_holder_last_name TEXT;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_holder_address TEXT;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_holder_city TEXT;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_holder_postal_code TEXT;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_holder_country TEXT DEFAULT 'FR';
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_info_validated BOOLEAN DEFAULT FALSE;
ALTER TABLE promoters ADD COLUMN IF NOT EXISTS bank_info_updated_at TIMESTAMPTZ DEFAULT NOW();