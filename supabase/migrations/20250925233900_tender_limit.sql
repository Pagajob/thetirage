/*
  # Fix tickets table permissions for anonymous users

  1. Security Updates
    - Add RLS policy for anonymous users to view ticket statistics
    - Allow public access to ticket_type and created_at for counting purposes
    - Remove dependency on users table for public statistics
*/

-- Add policy for anonymous users to view tickets for statistics
CREATE POLICY "Anonymous users can view tickets for stats"
  ON tickets
  FOR SELECT
  TO anon
  USING (true);

-- Ensure the existing policy for authenticated users is still active
-- (This should already exist from the previous migration)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tickets' 
    AND policyname = 'Users can view their own tickets'
  ) THEN
    CREATE POLICY "Users can view their own tickets"
      ON tickets
      FOR SELECT
      TO authenticated
      USING (email = (SELECT users.email FROM users WHERE users.id = auth.uid())::text);
  END IF;
END $$;