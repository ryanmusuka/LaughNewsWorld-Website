/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import Script from "next/script";
import GoogleAd from "@/components/GoogleAd";
import { createBrowserClient } from '@supabase/ssr';

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AdSense Configuration
  const AD_CLIENT = "ca-pub-2550346576190821"; 
  const FEED_SLOT = "8345058401"; 

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Fetch all articles from your database.
       const { data, error } = await supabase
        .from('blog_posts') 
        .select('*')
        .order('created_at', { ascending: false }); // Orders newest to oldest

      if (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const mappedPosts = data.map((post: any) => ({
          id: post.slug || post.id, 
          category: post.category || post.topic || "News",
          title: post.title,
          excerpt: post.excerpt || "Click to read the full story...",
          image: post.hero_image_url || "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2500&auto=format&fit=crop",
          date: new Date(post.created_at || post.date).toLocaleDateString('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric' 
          }),
          readTime: post.read_time || "5 min read",
          featured: post.featured || post.is_featured || false,
          views: post.views || 0, // Ensure we have a number for sorting
        }));

        setPosts(mappedPosts);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // ---------------------------------------------------------------------------
  // DYNAMIC SECTION LOGIC
  // ---------------------------------------------------------------------------
  
  // 1. Featured Post: Finds the first post marked as featured, or just uses the newest one if none are marked.
  const featuredPost = posts.find(p => p.featured) || posts[0];

  // 2. Trending Posts: Sorts ALL posts by highest views, removes the featured post to avoid duplicates, and grabs the top 3.
  const trendingPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .filter(p => p.id !== featuredPost?.id)
    .slice(0, 3);

  // 3. Archive Posts: The rest of the posts that are neither Featured nor in the top 3 Trending.
  const trendingIds = trendingPosts.map(p => p.id);
  const archivePosts = posts.filter(p => p.id !== featuredPost?.id && !trendingIds.includes(p.id));

  // 4. Search Filter
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
        <p className="mt-4 font-bold uppercase tracking-widest text-zinc-500 text-sm">Loading Newsroom...</p>
      </div>
    );
  }

  return (
    <>
      <Script
        id="adsense-blog-index-init"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
        crossOrigin="anonymous"
      />

      <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 pt-12 pb-12 px-6 font-sans text-black dark:text-white">
        <div className="max-w-7xl mx-auto">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-black dark:border-white pb-6 mb-10 gap-1 mt-10">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
              >
                The <span className="text-brand-blue">Front</span> Page
              </motion.h1>
              <p className="text-zinc-500 font-bold mt-2 uppercase tracking-widest text-sm">
                The Latest Articles from The LNW Team • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="relative w-full md:w-72 mt-6 md:mt-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-none focus:outline-none focus:border-black dark:focus:border-white transition-colors font-bold uppercase text-sm tracking-wide text-black dark:text-white"
              />
            </div>
          </header>

          {searchQuery ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? filteredPosts.map(post => (
                <ArticleCard key={post.id} post={post} />
              )) : (
                <p className="col-span-full text-center text-zinc-500 font-bold uppercase py-20">No articles found for "{searchQuery}"</p>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              
              {featuredPost && (
                <section>
                  <Link href={`/news/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    <div className="lg:col-span-8 overflow-hidden bg-zinc-200 aspect-video relative border border-zinc-200 dark:border-zinc-800">
                      <img 
                        src={featuredPost.image} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt={featuredPost.title} 
                      />
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 flex items-center gap-2 font-black uppercase tracking-widest text-xs">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        Latest
                      </div>
                    </div>
                    
                    <div className="lg:col-span-4 space-y-4 flex flex-col justify-center h-full pt-2">
                      <span className="text-brand-blue font-black uppercase tracking-widest text-sm">
                        {featuredPost.category}
                      </span>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] group-hover:text-brand-blue transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-serif leading-relaxed line-clamp-4">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 uppercase tracking-wider pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        <span>{featuredPost.date}</span>
                        <span>|</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </section>
              )}

              <hr className="border-t-2 border-black dark:border-white" />

              {/* TRENDING ROW sorted by Database Views */}
              {trendingPosts.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Trending Now</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {trendingPosts.map(post => (
                      <ArticleCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              <div className="py-6 my-8 w-full border-y border-zinc-300 dark:border-zinc-800">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 text-center mb-2">Advertisement</p>
                <GoogleAd adClient={AD_CLIENT} adSlot={FEED_SLOT} layout="horizontal" />
              </div>

              {/* ARCHIVE FEED */}
              {archivePosts.length > 0 && (
                <section>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">More Stories</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {archivePosts.map((post) => (
                      <Link key={post.id} href={`/news/${post.id}`} className="group flex flex-col sm:flex-row gap-6 items-start">
                        <div className="w-full sm:w-48 shrink-0 aspect-[4/3] sm:aspect-square overflow-hidden bg-zinc-100">
                          <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                        </div>
                        <div className="space-y-2 pt-1">
                          <span className="bg-brand-yellow text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest inline-block mb-1">
                            {post.category}
                          </span>
                          <h4 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:underline decoration-2 underline-offset-4">
                            {post.title}
                          </h4>
                          <p className="text-zinc-500 dark:text-zinc-400 font-serif text-sm line-clamp-2">{post.excerpt}</p>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider pt-2">{post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
      </main>
    </>
  );
}

// REUSABLE SUB-COMPONENT
function ArticleCard({ post }: { post: any }) {
  return (
    <Link href={`/news/${post.id}`} className="group flex flex-col space-y-3">
      <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
      </div>
      <div className="space-y-2 flex-grow">
        <span className="text-brand-blue text-xs font-black uppercase tracking-widest">{post.category}</span>
        <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight group-hover:text-brand-blue transition-colors line-clamp-3">
          {post.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 font-serif text-sm line-clamp-2">{post.excerpt}</p>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest pt-2">
        <span>{post.date}</span>
      </div>
    </Link>
  );
}