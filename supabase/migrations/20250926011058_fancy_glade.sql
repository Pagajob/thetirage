/*
  # Fix tickets table RLS policy for anonymous access

  1. Security Changes
    - Add RLS policy to allow anonymous users to read tickets for statistics
    - This enables the StatsCounter component to fetch participation data
    - Policy allows SELECT access to anon role for all tickets
*/

-- Create policy to allow anonymous users to read tickets for statistics
CREATE POLICY "Allow anonymous users to read tickets for stats" ON tickets
  FOR SELECT TO anon
  USING (true);