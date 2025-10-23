# Supabase Setup Guide

Your backend has been successfully migrated from MySQL to Supabase! Follow these steps to complete the setup.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: DCodeCafes (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project" and wait for it to initialize

## 2. Get Your API Credentials

1. Once your project is ready, go to **Project Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. Copy the following values:
   - **Project URL** (looks like: `https://yjqlqlnywqvuvedzmfrd.supabase.co`)
   - **service_role key** (under "Project API keys" - this is your secret key)

## 3. Update Your .env File

Open your `.env` file and replace the placeholder values:

```env
SUPABASE_URL=https://yjqlqlnywqvuvedzmfrd.supabase.co
SUPABASE_SERVICE_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcWxxbG55d3F2dXZlZHptZnJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY5MDYyNSwiZXhwIjoyMDc2MjY2NjI1fQ.5jPguos694N7AFTccHUhRuTddn9wqA2HVHXwOKhMP8k
JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTc2MDcyNTQzMCwiaWF0IjoxNzYwNzI1NDMwfQ.zk9UeNOzIhzIMl2jEQK0XegAjjSUgRqcJroKekVXeDI

```

**Important**: 
- Use the `service_role` key, NOT the `anon` key (service_role bypasses Row Level Security)
- Generate a strong random string for `JWT_SECRET` (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

## 4. Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor** (in the sidebar)
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
-- Create blogs table
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

-- Create case_studies table
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

-- Create services table
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
```

4. Click "Run" to execute the SQL

## 5. Configure Row Level Security (Optional but Recommended)

By default, Supabase enables Row Level Security (RLS). Since you're using the `service_role` key, RLS is bypassed. However, if you want to use the `anon` key for public access, you'll need to set up policies.

For now, you can disable RLS on these tables:

```sql
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
```

Or set up proper policies for public read access:

```sql
-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published content
CREATE POLICY "Public blogs are viewable by everyone"
  ON blogs FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

-- Allow authenticated users (with service_role key) full access
CREATE POLICY "Service role has full access to blogs"
  ON blogs FOR ALL
  USING (true);

CREATE POLICY "Service role has full access to case_studies"
  ON case_studies FOR ALL
  USING (true);

CREATE POLICY "Service role has full access to services"
  ON services FOR ALL
  USING (true);
```

## 6. Test Your Backend

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the ping endpoint:
   ```bash
   curl http://localhost:8080/api/ping
   ```

3. Test creating a blog (you'll need to login first to get a token):
   ```bash
   # Login
   curl -X POST http://localhost:8080/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"username":"sharmadivyanshu281","password":"Preksh@2004"}'

   # Use the token from the response
   curl -X POST http://localhost:8080/api/blogs \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -d '{"title":"Test Blog","slug":"test-blog","content":"This is a test"}'
   ```

## What Changed?

- ✅ Replaced `mysql2` with `@supabase/supabase-js`
- ✅ Updated all database queries to use Supabase client
- ✅ Changed from MySQL syntax to PostgreSQL syntax
- ✅ Updated environment variables
- ✅ Maintained all existing API endpoints and functionality

## Troubleshooting

**Database not configured error:**
- Make sure `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set in your `.env` file
- Restart your dev server after updating `.env`

**Authentication errors:**
- Verify you're using the `service_role` key, not the `anon` key
- Check that `JWT_SECRET` is set in your `.env` file

**Table not found errors:**
- Make sure you ran the SQL commands in the Supabase SQL Editor
- Check the table names match exactly (case-sensitive)

## Next Steps

- Set up Supabase Storage for file uploads (if needed)
- Configure email authentication (optional)
- Set up database backups
- Monitor usage in Supabase dashboard
