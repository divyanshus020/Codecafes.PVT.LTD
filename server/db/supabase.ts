import { createClient } from "@supabase/supabase-js";

const {
  SUPABASE_URL = "",
  SUPABASE_SERVICE_KEY = "",
} = process.env;

export const dbEnabled = Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_SERVICE_KEY || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function initSchema() {
  if (!dbEnabled) {
    console.log("Supabase not configured, skipping schema init");
    return;
  }

  // Note: Run these SQL commands in your Supabase SQL Editor to create tables
  console.log(`
    To set up your Supabase database, run these SQL commands in the Supabase SQL Editor:

    CREATE TABLE IF NOT EXISTS blogs (
      id BIGSERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image VARCHAR(1024),
      status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS case_studies (
      id BIGSERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      summary TEXT,
      content TEXT NOT NULL,
      cover_image VARCHAR(1024),
      status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS services (
      id BIGSERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      price DECIMAL(10,2),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Create updated_at trigger function
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Add triggers for auto-updating updated_at
    CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  `);
}
