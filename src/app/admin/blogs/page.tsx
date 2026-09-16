import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BlogsTable from './BlogsTable'

export const metadata = {
  title: 'Manage Blogs | Yasoda Builders CMS'
}

export default async function AdminBlogsPage() {
  const supabase = await createClient()

  // Fetch all blogs with categories
  const { data: rawBlogs } = await supabase
    .from('blogs')
    .select('id, title, slug, status, published_at, updated_at, featured_image_url, categories(name)')
    .order('created_at', { ascending: false })

  const blogs = rawBlogs as unknown as {
    id: string;
    title: string;
    slug: string;
    status: string;
    published_at: string | null;
    updated_at: string;
    featured_image_url: string | null;
    categories: { name: string } | null;
  }[];

  // Fetch categories for filtering
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900">Manage Blogs</h2>
          <p className="text-gray-500 mt-1">Create, edit, publish and delete your website blogs.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="inline-flex items-center justify-center px-4 py-2 bg-forest-800 text-white text-sm font-medium rounded-[2px] hover:bg-forest-900 transition-colors shadow-sm"
        >
          + ADD NEW BLOG
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <BlogsTable initialBlogs={blogs || []} categories={categories || []} />
      </div>
    </div>
  )
}
