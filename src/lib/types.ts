export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  category_id: string | null;
  tags: string[];
  author: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  seo_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogWithCategory extends Blog {
  categories: Category | null;
}
