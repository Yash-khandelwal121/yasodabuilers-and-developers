import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Metadata, ResolvingMetadata } from "next";

// Calculate reading time based on word count
function getReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} Min Read`;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: blog } = await supabase
    .from("blogs")
    .select("title, excerpt, seo_title, meta_description, canonical_url, og_title, og_description, og_image_url, featured_image_url, published_at")
    .eq("slug", slug)
    .single();

  if (!blog) return {};

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = blog.og_image_url || blog.featured_image_url || null

  return {
    title: blog.seo_title || `${blog.title} | Yasoda Builders`,
    description: blog.meta_description || blog.excerpt || '',
    alternates: {
      canonical: blog.canonical_url || `https://www.yashodadevelopers.com/blogs/${slug}`,
    },
    openGraph: {
      title: blog.og_title || blog.seo_title || blog.title,
      description: blog.og_description || blog.meta_description || blog.excerpt || '',
      type: 'article',
      publishedTime: blog.published_at,
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Check auth for draft preview
  const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));
  const isAdmin = !!user;

  let query = supabase
    .from("blogs")
    .select("*, categories(name, slug)")
    .eq("slug", slug);

  // If not admin, strictly enforce published only
  if (!isAdmin) {
    query = query.eq("status", "published");
  }

  let blog = null;
  try {
    const { data } = await query.single();
    blog = data;
  } catch (err) {
    console.warn("Failed to fetch blog. Supabase might not be configured.");
  }

  if (!blog) {
    notFound();
  }

  // Fetch related posts (same category, published, exclude current)
  let relatedPosts = [];
  try {
    const { data } = await supabase
      .from("blogs")
      .select("id, slug, title, excerpt, featured_image_url, published_at, content, categories(name)")
      .eq("status", "published")
      .eq("category_id", blog.category_id)
      .neq("id", blog.id)
      .limit(3);
    if (data) relatedPosts = data;
  } catch (err) {}

  // Schema.org JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.seo_title || blog.title,
    "image": blog.featured_image_url ? [blog.featured_image_url] : [],
    "datePublished": blog.published_at || blog.created_at,
    "dateModified": blog.updated_at,
    "author": [{
      "@type": "Organization",
      "name": blog.author || "Yasoda Builders and Developers"
    }],
    "description": blog.meta_description || blog.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="pt-32 pb-24 bg-beige-100 min-h-screen">
        <article className="container-custom max-w-4xl mx-auto px-4 md:px-8">
          
          {/* Admin Draft Badge */}
          {blog.status === 'draft' && (
            <div className="bg-amber-100 text-amber-800 p-4 mb-6 rounded text-center font-bold">
              ADMIN PREVIEW: This blog is currently a DRAFT and is not visible to the public.
            </div>
          )}

          {/* Breadcrumbs */}
          <div className="flex items-center text-sm font-medium tracking-wide text-gray-500 mb-8 sm:mb-12 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2 flex-shrink-0" />
            <Link href="/blogs" className="hover:text-accent transition-colors">Blogs</Link>
            <ChevronRight size={14} className="mx-2 flex-shrink-0" />
            <span className="text-accent">{blog.categories?.name || 'Uncategorized'}</span>
          </div>

          {/* Header */}
          <header className="mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase mb-6 rounded-[2px]">
              {blog.categories?.name || 'Uncategorized'}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-charcoal-900 font-bold leading-tight mb-8">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-6 border-y border-gray-200/60 py-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-accent" />
                {blog.published_at ? format(new Date(blog.published_at), 'MMMM dd, yyyy') : 'Draft'}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-accent" />
                {getReadTime(blog.content || '')}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featured_image_url && (
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] mb-12 sm:mb-20 overflow-hidden bg-gray-100 rounded-[2px]">
              <img 
                src={blog.featured_image_url} 
                alt={blog.featured_image_alt || blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-stone max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-charcoal-900 prose-strong:font-semibold
              prose-li:text-gray-600 prose-li:font-light
              prose-blockquote:border-l-accent prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:font-serif prose-blockquote:text-lg prose-blockquote:italic
              prose-img:rounded-[2px] prose-img:shadow-md
              mb-20"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />

          {/* Divider */}
          <div className="h-[1px] w-full bg-gray-200 mb-16" />

          {/* Enquiry CTA */}
          <div className="bg-charcoal-900 p-8 sm:p-12 text-center rounded-[2px] mb-24">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              Whether you are planning a residential build or a commercial development, our team of experts is here to bring your vision to life.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent text-white text-sm font-bold tracking-widest uppercase hover:bg-accent-dark transition-colors rounded-[2px]"
            >
              Contact Us Today
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold text-charcoal-900">Related Articles</h3>
                <Link href="/blogs" className="text-sm font-semibold tracking-widest text-accent uppercase hover:text-accent-dark transition-colors hidden sm:block">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.id} className="group flex flex-col bg-white overflow-hidden rounded-[2px] hover:shadow-lg transition-all duration-300">
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                      {post.featured_image_url && (
                        <img 
                          src={post.featured_image_url} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs text-gray-400 font-medium tracking-wider mb-3 uppercase">
                        {post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : ''}
                      </div>
                      <h4 className="text-lg font-serif font-bold text-charcoal-900 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 font-light text-sm line-clamp-2 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center text-xs font-semibold tracking-widest text-charcoal-900 group-hover:text-accent transition-colors uppercase">
                        READ MORE <ArrowRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </main>
    </>
  );
}
