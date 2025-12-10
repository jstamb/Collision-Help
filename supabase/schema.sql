-- Collision Help Database Schema
-- Run this in Supabase SQL Editor

-- Drop existing table if needed (comment out if you want to preserve data)
-- DROP TABLE IF EXISTS leads;

-- Leads table with AI analysis
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Contact Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT,
  zip_code TEXT,
  best_contact_time TEXT,

  -- Accident Details
  vehicle_type TEXT,
  rear_ended TEXT,
  accident_date_range TEXT,
  concerns TEXT[],
  landing_page TEXT,

  -- Photos
  photo_paths TEXT[],
  photo_urls TEXT[],

  -- AI Analysis Results
  ai_analysis JSONB,
  ai_analysis_summary TEXT,
  ai_damage_severity TEXT,
  ai_estimated_cost_low INTEGER,
  ai_estimated_cost_high INTEGER,
  ai_recommended_actions TEXT[],

  -- Processing Status
  analysis_status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMPTZ,

  -- Webhook (legacy)
  webhook_sent BOOLEAN DEFAULT FALSE,
  webhook_response JSONB,

  -- Raw metadata for debugging
  metadata JSONB
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_analysis_status ON leads(analysis_status);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies (optional - for security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);
