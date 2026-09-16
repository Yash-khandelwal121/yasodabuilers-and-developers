import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, CheckCircle, Edit3, Tags, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Admin Dashboard | Yasoda Builders CMS'
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts
  const { count: totalBlogs } = await supabase.from('blogs').select('*', { count: 'exact', head: true })
  const { count: publishedBlogs } = await supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published')
  const { count: draftBlogs } = await supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'draft')
  const { count: totalCategories } = await supabase.from('categories').select('*', { count: 'exact', head: true })

  // Fetch recent blogs
  const { data: rawRecentBlogs } = await supabase
    .from('blogs')
    .select('id, title, status, updated_at, categories(name)')
    .order('updated_at', { ascending: false })
    .limit(5)

  const recentBlogs = rawRecentBlogs as unknown as {
    id: string;
    title: string;
    status: string;
    updated_at: string;
    categories: { name: string } | null;
  }[];

  const stats = [
    { name: 'Total Blogs', value: totalBlogs || 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Published', value: publishedBlogs || 0, icon: CheckCircle, color: 'text-forest-600', bg: 'bg-forest-50' },
    { name: 'Drafts', value: draftBlogs || 0, icon: Edit3, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Categories', value: totalCategories || 0, icon: Tags, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Manage your website content and track status.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="inline-flex items-center justify-center px-4 py-2 bg-forest-800 text-white text-sm font-medium rounded-[2px] hover:bg-forest-900 transition-colors shadow-sm"
        >
          + ADD NEW BLOG
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex items-center">
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-charcoal-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-charcoal-900">Recently Edited Blogs</h3>
          <Link href="/admin/blogs" className="text-sm text-forest-800 hover:text-forest-900 font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {recentBlogs && recentBlogs.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <Link href={`/admin/blogs/${blog.id}/edit`} className="font-medium text-charcoal-900 hover:text-forest-800 transition-colors">
                    {blog.title}
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                    <span>{blog.categories?.name || 'Uncategorized'}</span>
                    <span>•</span>
                    <span>Last updated: {format(new Date(blog.updated_at), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            No blogs found. Start by creating your first blog post.
          </div>
        )}
      </div>
    </div>
  )
}
