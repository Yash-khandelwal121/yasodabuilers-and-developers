'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Edit, Eye, Trash2, Search, MoreVertical, CheckCircle, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Blog = {
  id: string
  title: string
  slug: string
  status: string
  published_at: string | null
  updated_at: string
  featured_image_url: string | null
  categories: { name: string } | null
}

export default function BlogsTable({ 
  initialBlogs, 
  categories 
}: { 
  initialBlogs: Blog[],
  categories: { id: string, name: string }[]
}) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  // Filter and sort blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || blog.categories?.name === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(id)
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    
    if (error) {
      alert('Error deleting blog: ' + error.message)
      setIsDeleting(null)
    } else {
      setBlogs(blogs.filter(b => b.id !== id))
      setIsDeleting(null)
      router.refresh()
    }
  }

  const toggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published'
    const publishedAt = newStatus === 'published' ? new Date().toISOString() : null

    const { error } = await supabase
      .from('blogs')
      .update({ status: newStatus, published_at: publishedAt })
      .eq('id', blog.id)

    if (error) {
      alert('Error updating status: ' + error.message)
    } else {
      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, status: newStatus, published_at: publishedAt } : b))
      router.refresh()
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 bg-gray-50/50">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[2px] text-sm focus:ring-forest-800 focus:border-forest-800"
          />
        </div>
        <div className="flex gap-4 sm:w-auto w-full">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full sm:w-40 pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full sm:w-48 pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        {blog.featured_image_url ? (
                          <img src={blog.featured_image_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="ml-4 max-w-[300px]">
                        <div className="text-sm font-medium text-charcoal-900 truncate" title={blog.title}>{blog.title}</div>
                        <div className="text-sm text-gray-500 truncate">/{blog.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{blog.categories?.name || '—'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => toggleStatus(blog)}
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-colors ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(blog.updated_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link href={`/blogs/${blog.slug}`} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors" title="Preview">
                        <Eye size={18} />
                      </Link>
                      <Link href={`/admin/blogs/${blog.id}/edit`} className="text-gray-400 hover:text-forest-600 transition-colors" title="Edit">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog.id, blog.title)}
                        disabled={isDeleting === blog.id}
                        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50" 
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No blogs found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
