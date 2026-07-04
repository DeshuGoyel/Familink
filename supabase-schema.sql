-- Transfer Legacy — Supabase Waitlist Schema
-- Run this in: Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id              UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT         UNIQUE NOT NULL,
  position        SERIAL,
  created_at      TIMESTAMPTZ  DEFAULT NOW(),
  referral_source TEXT,
  confirmed       BOOLEAN      DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the form)
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT TO anon WITH CHECK (true);

-- Create a public view to expose only the count of waitlist signups (for live counter)
CREATE OR REPLACE VIEW waitlist_count AS
  SELECT count(*) AS count FROM waitlist;

-- Grant select access on the view to anon
GRANT SELECT ON waitlist_count TO anon;
