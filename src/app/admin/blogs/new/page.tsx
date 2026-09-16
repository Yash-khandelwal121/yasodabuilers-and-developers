import { createClient } from '@/lib/supabase/server'
import BlogForm from '@/components/admin/BlogForm'

export const metadata = {
  title: 'Create New Blog | Yasoda Builders CMS'
}

export default async function NewBlogPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  return (
    <div className="pb-12">
      <BlogForm categories={categories || []} />
    </div>
  )
}
