-- LSPro BBPI Website Initial Schema
-- Run this migration in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site content table
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  page VARCHAR(100) NOT NULL,
  section VARCHAR(100) NOT NULL,
  judul TEXT NOT NULL DEFAULT '',
  deskripsi TEXT NOT NULL DEFAULT '',
  gambar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(page, section)
);

-- Form downloads table
CREATE TABLE IF NOT EXISTS form_downloads (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  label VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated at trigger for site_content
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_site_content_updated_at ON site_content;
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_downloads ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read site_content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Public can read form_downloads"
  ON form_downloads FOR SELECT
  USING (true);

-- Authenticated users can manage all tables
CREATE POLICY "Authenticated users can manage site_content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage form_downloads"
  ON form_downloads FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


