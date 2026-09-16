import { createClient } from '@/lib/supabase/server'
import BlogForm from '@/components/admin/BlogForm'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Blog | Yasoda Builders CMS'
}

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  // Await the params object before accessing its properties (Next.js 15+ requirement/best practice)
  const { id } = await params

  // Fetch the blog
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !blog) {
    notFound()
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  return (
    <div className="pb-12">
      <BlogForm initialData={blog} categories={categories || []} isEdit={true} />
    </div>
  )
}
