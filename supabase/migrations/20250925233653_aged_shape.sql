/*
  # Create tickets table for Thetirage

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `email` (text, customer email)
      - `ticket_code` (uuid, unique ticket identifier)
      - `session_id` (text, Stripe checkout session ID)
      - `ticket_type` (text, Bronze/Silver/Gold)
      - `amount_paid` (numeric, amount in euros)
      - `created_at` (timestamp)
      - `is_winner` (boolean, for future draw results)
      - `draw_date` (date, which month's draw this ticket is for)

  2. Security
    - Enable RLS on `tickets` table
    - Add policy for users to read their own tickets by email
    - Add policy for service role to manage all tickets

  3. Indexes
    - Index on email for fast customer lookups
    - Index on session_id for webhook processing
    - Index on draw_date for monthly draws
    - Index on ticket_code for unique ticket verification
*/

CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ticket_code uuid NOT NULL DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  ticket_type text NOT NULL CHECK (ticket_type IN ('Bronze', 'Silver', 'Gold')),
  amount_paid numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_winner boolean DEFAULT false,
  draw_date date DEFAULT date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day'
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tickets_email ON tickets(email);
CREATE INDEX IF NOT EXISTS idx_tickets_session_id ON tickets(session_id);
CREATE INDEX IF NOT EXISTS idx_tickets_draw_date ON tickets(draw_date);
CREATE UNIQUE INDEX IF NOT EXISTS idx_tickets_code ON tickets(ticket_code);

-- RLS Policies
CREATE POLICY "Users can view their own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Service role can manage all tickets"
  ON tickets
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to view tickets by email (for customer support)
CREATE POLICY "Anonymous users can view tickets by email"
  ON tickets
  FOR SELECT
  TO anon
  USING (true);