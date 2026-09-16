import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { blogsData } from '../src/data/blogsData';

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateBlogs() {
  console.log('Starting migration...');

  try {
    for (const blog of blogsData) {
      console.log(`Processing: ${blog.title}`);

      // 1. Ensure category exists
      let categoryId = null;
      if (blog.category) {
        const categorySlug = blog.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        const { data: category, error: catError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();

        if (category) {
          categoryId = category.id;
        } else {
          // Create category if it doesn't exist
          const { data: newCategory, error: newCatError } = await supabase
            .from('categories')
            .insert({ name: blog.category, slug: categorySlug })
            .select('id')
            .single();
            
          if (newCatError) {
            console.error(`Error creating category ${blog.category}:`, newCatError.message);
          } else if (newCategory) {
            categoryId = newCategory.id;
          }
        }
      }

      // 2. Insert or update the blog
      const payload = {
        title: blog.title,
        slug: blog.slug,
        category_id: categoryId,
        excerpt: blog.excerpt,
        content: blog.content,
        featured_image_url: blog.image, // Use the Unsplash image from the hardcoded data
        status: 'published',
        published_at: new Date(blog.date).toISOString(), // Convert string date to ISO
        seo_title: blog.title,
        meta_description: blog.excerpt.substring(0, 160),
      };

      const { error: upsertError } = await supabase
        .from('blogs')
        .upsert(payload, { onConflict: 'slug' });

      if (upsertError) {
        console.error(`Error upserting blog "${blog.title}":`, upsertError.message);
      } else {
        console.log(`✅ Migrated: ${blog.title}`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateBlogs();
