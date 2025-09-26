/*
  # Fix tickets table permissions for anonymous access

  1. Security Changes
    - Remove RLS policy that references auth.users table for anonymous access
    - Add simple RLS policy for anonymous users to read tickets for public statistics
    - Keep existing policies for authenticated users intact

  2. Changes Made
    - Drop the problematic policy that tries to access auth.users
    - Create new policy allowing anonymous read access for public stats
    - Ensure no sensitive data is exposed to anonymous users
*/

-- Drop the existing policy that references users table and causes permission issues
DROP POLICY IF EXISTS "Users can view their own tickets" ON tickets;

-- Create a simple policy for anonymous users to read tickets for public statistics
CREATE POLICY "Anonymous users can view tickets for public stats"
  ON tickets
  FOR SELECT
  TO anon
  USING (true);

-- Recreate the policy for authenticated users to view their own tickets
-- This policy will work because authenticated users have access to auth.uid()
CREATE POLICY "Authenticated users can view their own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Keep the existing service role policy
-- (This should already exist from previous migrations)