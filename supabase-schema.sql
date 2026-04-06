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

-- Allow reads (for live counter)
CREATE POLICY "Allow public reads" ON waitlist
  FOR SELECT TO anon USING (true);
