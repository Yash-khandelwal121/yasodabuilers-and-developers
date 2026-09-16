'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import TipTapEditor from './TipTapEditor'
import ImageUpload from './ImageUpload'
import { Save, Eye, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Category = {
  id: string
  name: string
}

type BlogFormProps = {
  initialData?: any
  categories: Category[]
  isEdit?: boolean
}

export default function BlogForm({ initialData, categories, isEdit = false }: BlogFormProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category_id: initialData?.category_id || (categories.length > 0 ? categories[0].id : ''),
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    featured_image_url: initialData?.featured_image_url || '',
    featured_image_alt: initialData?.featured_image_alt || '',
    status: initialData?.status || 'draft',
    seo_title: initialData?.seo_title || '',
    meta_description: initialData?.meta_description || '',
    focus_keyword: initialData?.focus_keyword || '',
    canonical_url: initialData?.canonical_url || '',
    og_title: initialData?.og_title || '',
    og_description: initialData?.og_description || '',
  })

  // Generate slug from title automatically if not in edit mode or if slug is empty
  useEffect(() => {
    if (!isEdit && formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.title, isEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      setLoading(true)
      
      if (!formData.title || !formData.slug) {
        throw new Error('Title and Slug are required.')
      }

      const payload = {
        ...formData,
        status,
        updated_at: new Date().toISOString(),
        published_at: status === 'published' && initialData?.status !== 'published' 
          ? new Date().toISOString() 
          : initialData?.published_at
      }

      let error;

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('blogs')
          .update(payload)
          .eq('id', initialData.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('blogs')
          .insert([payload])
        error = insertError
      }

      if (error) {
        if (error.code === '23505') { // Unique violation
          throw new Error('This slug already exists. Please choose a unique slug.')
        }
        throw error
      }

      router.push('/admin/blogs')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/blogs" className="p-2 bg-white border border-gray-200 rounded text-gray-500 hover:text-charcoal-900 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-charcoal-900">
            {isEdit ? 'Edit Blog Post' : 'Create New Blog'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {isEdit && (
            <Link 
              href={`/blogs/${formData.slug}`} 
              target="_blank"
              className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-[2px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye size={16} className="mr-2" />
              Preview
            </Link>
          )}
          <button
            onClick={() => handleSave('draft')}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-[2px] text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Save size={16} className="mr-2" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-forest-800 border border-transparent text-sm font-medium rounded-[2px] text-white hover:bg-forest-900 transition-colors disabled:opacity-50"
          >
            <Check size={16} className="mr-2" />
            {isEdit && formData.status === 'published' ? 'Update Published' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <div className="flex items-center">
                <span className="text-gray-500 bg-gray-50 border border-r-0 border-gray-300 px-3 py-2 rounded-l-[2px] text-sm">/blogs/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="blog-url-slug"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="A brief summary of the article..."
                className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Content</label>
              <TipTapEditor 
                content={formData.content} 
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))} 
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-charcoal-900 border-b pb-2 mb-4">SEO Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
                placeholder={formData.title || "SEO optimized title"}
                className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.seo_title.length} chars (Recommended: 50-60)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_description.length} chars (Recommended: 140-160)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Focus Keyword</label>
                <input
                  type="text"
                  name="focus_keyword"
                  value={formData.focus_keyword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <input
                  type="text"
                  name="canonical_url"
                  value={formData.canonical_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
                />
              </div>
            </div>

            <div className="pt-4 border-t mt-4 space-y-4">
              <h4 className="text-sm font-semibold text-charcoal-900">Open Graph (Social Sharing)</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                <input
                  type="text"
                  name="og_title"
                  value={formData.og_title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                <textarea
                  name="og_description"
                  value={formData.og_description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-charcoal-900 border-b pb-2">Publishing</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-[2px] text-sm font-medium capitalize">
                {formData.status}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
              >
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-charcoal-900 border-b pb-2">Featured Image</h3>
            <ImageUpload 
              url={formData.featured_image_url} 
              onUpload={(url) => setFormData(prev => ({ ...prev, featured_image_url: url || '' }))} 
            />
            
            {formData.featured_image_url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Image Alt Text</label>
                <input
                  type="text"
                  name="featured_image_alt"
                  value={formData.featured_image_alt}
                  onChange={handleChange}
                  placeholder="Describe the image for SEO"
                  className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:ring-forest-800 focus:border-forest-800 text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
