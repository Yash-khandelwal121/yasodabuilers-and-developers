import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export const metadata = {
  title: "Latest Insights & Blogs | Yasoda Builders and Developers",
  description: "Explore practical insights on construction, property development, renovation, architecture and real estate from Yasoda Builders and Developers.",
};

// Calculate reading time based on word count
function getReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} Min Read`;
}

export default async function BlogsPage() {
  const supabase = await createClient();

  // Fetch only published blogs, ordered by newest first
  let blogs: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    featured_image_url: string | null;
    published_at: string | null;
    categories: { name: string } | null;
  }[] = [];

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, slug, title, excerpt, content, featured_image_url, published_at, categories(name)")
      .eq("status", "published")
      .order("published_at", { ascending: false });
      
    if (!error && data) {
      blogs = data as unknown as typeof blogs;
    }
  } catch (err) {
    console.warn("Failed to fetch blogs. Supabase might not be configured.");
  }

  return (
    <main className="pt-32 pb-24 bg-beige-100 min-h-screen">
      <div className="container-custom max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Insights & Updates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal-900 font-bold mb-6">
            Latest Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl font-light leading-relaxed">
            Explore practical insights on construction, property development, renovation, architecture and real estate from Yasoda Builders and Developers.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group flex flex-col bg-white overflow-hidden rounded-[2px] transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                {blog.featured_image_url ? (
                  <img 
                    src={blog.featured_image_url} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-widest text-accent uppercase rounded-[2px]">
                  {blog.categories?.name || 'Uncategorized'}
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-400 font-medium tracking-wider mb-4 uppercase">
                  <span>{blog.published_at ? format(new Date(blog.published_at), 'MMMM dd, yyyy') : 'Unknown Date'}</span>
                  <span className="mx-2">•</span>
                  <span>{getReadTime(blog.content || '')}</span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-semibold tracking-widest text-charcoal-900 group-hover:text-accent transition-colors duration-300 uppercase">
                  READ ARTICLE
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
          
          {(!blogs || blogs.length === 0) && (
            <div className="col-span-full text-center py-12 text-gray-500 text-lg">
              No blogs published yet. Check back soon!
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
