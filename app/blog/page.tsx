"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

// Mock Data - We will move this to a database/CMS later!
const blogPosts = [
  {
    id: "1",
    category: "Revelation",
    title: "Why Laughter is a Spiritual Weapon You're Not Using",
    excerpt: "Prophet Uebert Angel breaks down the mystery of joy and how it dismantles the works of darkness in your daily life. Discover the prophetic power of a simple smile.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2500&auto=format&fit=crop",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    featured: true
  },
  {
    id: "2",
    category: "Humor",
    title: "The Science of Joy: What Happens in the Spirit?",
    excerpt: "Exploring the intersection of physical laughter and spiritual breakthrough. When you laugh, the enemy gets confused.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 22, 2026",
    readTime: "4 min read",
    featured: false
  },
  {
    id: "3",
    category: "Testimony",
    title: "How One Joke Shifted the Atmosphere in London",
    excerpt: "A firsthand account of the recent service where a simple punchline opened the heavens for massive deliverance.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 20, 2026",
    readTime: "3 min read",
    featured: false
  },
  {
    id: "4",
    category: "Prophetic",
    title: "Joy Cometh In The Morning: Understanding Times and Seasons",
    excerpt: "You've survived the night, but are you ready for the morning? The prophetic timetable of joy is here.",
    image: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    featured: false
  },
  {
    id: "5",
    category: "Teaching",
    title: "Don't Let The Enemy Steal Your Punchline",
    excerpt: "The devil hates a joyful believer. Here are three ways to protect your peace and maintain your laugh.",
    image: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 15, 2026",
    readTime: "4 min read",
    featured: false
  },
  {
    id: "6",
    category: "Humor",
    title: "Top 5 Moments the Prophet Made Us Cry Laughing",
    excerpt: "A definitive ranking of the most hilarious, unscripted moments from the altar this year.",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 10, 2026",
    readTime: "2 min read",
    featured: false
  }
];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = blogPosts.find(p => p.featured);
  const trendingPosts = blogPosts.filter(p => !p.featured).slice(0, 3);
  const archivePosts = blogPosts.filter(p => !p.featured).slice(3);

  // Filter posts based on search
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 pt-28 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & SEARCH ROW */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-black dark:border-white pb-6 mb-10 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
            >
              The <span className="text-brand-blue">Front</span> Page
            </motion.h1>
            <p className="text-zinc-500 font-bold mt-2 uppercase tracking-widest text-sm">
              Global Edition • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-none focus:outline-none focus:border-black dark:focus:border-white transition-colors font-bold uppercase text-sm tracking-wide"
            />
          </div>
        </header>

        {/* SEARCH RESULTS (If user is typing) */}
        {searchQuery ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? filteredPosts.map(post => (
              <ArticleCard key={post.id} post={post} />
            )) : (
              <p className="col-span-full text-center text-zinc-500 font-bold uppercase py-20">No articles found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          
          /* NORMAL NEWSROOM LAYOUT (If search is empty) */
          <div className="space-y-12">
            
            {/* 1. THE FEATURED STORY (Massive layout) */}
            {featuredPost && (
              <section>
                <Link href={`/blog/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  <div className="lg:col-span-8 overflow-hidden bg-zinc-200 aspect-video relative border border-zinc-200 dark:border-zinc-800">
                    <img 
                      src={featuredPost.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={featuredPost.title} 
                    />
                    {/* Live/Breaking Badge overlay */}
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
                    {/* Notice the font-serif here for the elegant news reading feel */}
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-serif leading-relaxed">
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

            {/* 2. TRENDING ROW (3 Columns) */}
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

            <hr className="border-t border-zinc-300 dark:border-zinc-800" />

            {/* 3. ARCHIVE FEED (2 Columns - Horizontal Layout on Desktop) */}
            <section>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">More Stories</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {archivePosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col sm:flex-row gap-6 items-start">
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

          </div>
        )}
      </div>
    </main>
  );
}

// Reusable Sub-Component for standard cards to keep code clean
function ArticleCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.id}`} className="group flex flex-col space-y-3">
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