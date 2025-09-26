/*
  # Création et configuration de la table tickets pour Thetirage

  1. Nouvelle table tickets
    - `id` (uuid, primary key, auto-généré)
    - `email` (text, obligatoire)
    - `ticket_code` (text, obligatoire)
    - `ticket_type` (text, obligatoire)
    - `session_id` (text, obligatoire)
    - `draw_date` (timestamp, obligatoire, défaut now())
    - `created_at` (timestamp, défaut now())

  2. Sécurité RLS
    - Lecture publique pour les statistiques
    - Insertion uniquement via service_role (webhook)
    - Pas de mise à jour/suppression depuis le frontend
*/

-- Supprimer la table existante si elle existe (pour recréer proprement)
DROP TABLE IF EXISTS tickets CASCADE;

-- Créer la table tickets avec la structure demandée
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ticket_code TEXT NOT NULL,
  ticket_type TEXT NOT NULL CHECK (ticket_type IN ('Bronze', 'Silver', 'Gold')),
  session_id TEXT NOT NULL,
  draw_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer des index pour optimiser les performances
CREATE INDEX idx_tickets_draw_date ON tickets(draw_date);
CREATE INDEX idx_tickets_type ON tickets(ticket_type);
CREATE INDEX idx_tickets_session_id ON tickets(session_id);
CREATE INDEX idx_tickets_email ON tickets(email);

-- Activer RLS (Row Level Security)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Policy 1: Lecture publique pour les statistiques (frontend)
-- Permet à tous (y compris anonymes) de lire les tickets
CREATE POLICY "Allow public read access for stats"
  ON tickets
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Insertion uniquement via service_role (webhook Stripe)
-- Seul le backend avec service_role peut insérer
CREATE POLICY "Allow service_role to insert tickets"
  ON tickets
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy 3: Mise à jour uniquement via service_role
CREATE POLICY "Allow service_role to update tickets"
  ON tickets
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy 4: Suppression uniquement via service_role
CREATE POLICY "Allow service_role to delete tickets"
  ON tickets
  FOR DELETE
  TO service_role
  USING (true);

-- Accorder les permissions nécessaires
GRANT SELECT ON tickets TO anon;
GRANT SELECT ON tickets TO authenticated;
GRANT ALL ON tickets TO service_role;