-- Supabase Schema for Blog CMS

-- 1. Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Blogs Table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'Work Sector Builders',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  
  -- SEO Fields
  seo_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Categories RLS: Public can read all. Only authenticated can manage.
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Categories are insertable by authenticated users only" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users only" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users only" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- Blogs RLS: Public can only read published blogs. Authenticated can manage all.
CREATE POLICY "Published blogs are viewable by everyone" ON blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "All blogs are viewable by authenticated users" ON blogs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Blogs are insertable by authenticated users only" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Blogs are updatable by authenticated users only" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Blogs are deletable by authenticated users only" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Storage Bucket Setup
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true) ON CONFLICT DO NOTHING;

-- Storage RLS: Public can read. Authenticated can upload/delete.
CREATE POLICY "Images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- 5. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 6. Insert Initial Categories
INSERT INTO categories (name, slug) VALUES 
('Residential Construction', 'residential-construction'),
('Commercial Construction', 'commercial-construction'),
('Renovation', 'renovation'),
('Construction Guide', 'construction-guide'),
('Construction Quality', 'construction-quality'),
('Architecture & Planning', 'architecture-planning'),
('Real Estate', 'real-estate')
ON CONFLICT (name) DO NOTHING;
