/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, Loader2 } from "lucide-react"; // Added Loader2 for a sleek loading spinner
import { Button } from "@/components/ui/button";
import Script from "next/script";
import GoogleAd from "@/components/GoogleAd";
import { createBrowserClient } from '@supabase/ssr';

// 1. ANIMATION SETTINGS
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

// --- THE SMART EXTRACTOR FUNCTION ---
function extractQuote(paragraph: string) {
  // Returns the entire paragraph as the quote, with no leftover text
  return { 
    quote: paragraph.trim(), 
    remainder: null 
  };
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string; // Gets the URL parameter from the [slug] folder

  // 2. STATE FOR DATABASE FETCHING
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const AD_CLIENT = "ca-pub-2550346576190821"; 
  const IN_ARTICLE_SLOT = "8345058401";
  const SIDEBAR_SLOT = "6565072879";
  const BOTTOM_SLOT = "3333333333";

  // 3. FETCH DATA FROM SUPABASE
  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      // Initialize the browser client safely using your environment variables
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Query the database 
      const { data, error } = await supabase
        .from('blog_posts') 
        .select('*')
        .eq('slug', slug) 
        .single();

      console.log("=== SUPABASE PAYLOAD ===", data);
      if (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Map the database response to match the exact format your UI expects
        setPost({
          ...data,
          // Converts a single block of text from the DB into an array of paragraphs based on line breaks
          content: Array.isArray(data.content) 
            ? data.content 
            : typeof data.content === 'string' 
              ? data.content.split('\n').filter((p: string) => p.trim() !== '') 
              : [],
          // Formats PostgreSQL timestamp into 'Oct 24, 2026' format
          date: new Date(data.created_at || data.date).toLocaleDateString('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric' 
          }),
          // Maps DB column names to UI variable names
          image: data.hero_image_url || data.image,
          readTime: data.read_time || "5 min read",
          author: data.author || "LaughNewsWorld Team",
          youtubeVideoId: data.youtube_video_id || null,
        });
      }
      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  // 4. GRACEFUL LOADING & ERROR STATES
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
        <p className="mt-4 font-bold uppercase tracking-widest text-zinc-500 text-sm">Loading Article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white">Article Not Found</h1>
        <p className="text-zinc-500 mb-8">We couldn&apos;t locate the article you were looking for.</p>
        <Button asChild className="bg-brand-blue text-white rounded-none uppercase tracking-widest font-bold">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script
        id="adsense-init"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
        crossOrigin="anonymous"
      />

      <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-black dark:text-white pt-8 pb-8 px-6">
        
        <div className="max-w-6xl mx-auto mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-blue font-bold uppercase tracking-widest text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Front Page
          </Link>
        </div>

        <article className="w-full">
          
          <motion.header 
            initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-2 text-center max-w-4xl mx-auto mb-12"
          >
            
            <motion.h1 variants={fadeUp} className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[1.05]">
              {post.title}
            </motion.h1>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest pt-4 border-t-2 border-zinc-200 dark:border-zinc-800 w-fit mx-auto">
              <span>By {post.author}</span><span>•</span><span>{post.date}</span><span>•</span><span>{post.readTime}</span>
            </motion.div>
          </motion.header>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto aspect-video md:aspect-[16/9] bg-zinc-200 overflow-hidden border-2 border-black dark:border-zinc-800 mb-16"
          >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8">
              
              <motion.div 
                initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                className="space-y-8 pb-10"
              >
                {post.content.map((paragraph: string, index: number) => {
                  
                  const showDynamicInFeedAd = (index + 1) % 3 === 0 && index !== post.content.length - 1;

                  return (
                    <div key={index} className="space-y-8">
                      {index === 8 ? (
                        <motion.div variants={fadeUp} className="pl-6 border-l-4 border-zinc-300 dark:border-zinc-700 py-2 my-10">
                          <p className="text-xl font-bold italic text-zinc-600 dark:text-zinc-400">&quot;{extractQuote(paragraph).quote}&quot; <br></br><span className="text-sm md:text-base lg:text-base font-black italic text-black dark:text-white">   ~ Prophet Uebert Angel</span></p>
                          {extractQuote(paragraph).remainder && <p className="text-lg md:text-xl text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif mt-4">{extractQuote(paragraph).remainder}</p>}
                        </motion.div>
                      ) : index === 3 ? (
                        <motion.div variants={fadeUp} className="space-y-8">
                          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight border-l-[8px] border-brand-yellow pl-6 py-2 my-16 text-brand-blue dark:text-brand-blue leading-[1.1]">
                            &quot;{extractQuote(paragraph).quote}&quot; <span className="text-xl md:text-lg lg:text-lg font-black italic text-black dark:text-white"><br></br> ~ Prophet Uebert Angel</span>
                          </blockquote>
                        </motion.div>
                      ) : (
                        <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                          {paragraph}
                        </motion.p>
                      )}

                      {showDynamicInFeedAd && (
                        <motion.div variants={fadeUp} className="py-6 my-8 w-full border-y border-zinc-200 dark:border-zinc-800">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-400 text-center mb-2">Advertisement</p>
                          <GoogleAd adClient={AD_CLIENT} adSlot={IN_ARTICLE_SLOT} layout="horizontal" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="pt-4 pb-12 w-full"
              >
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 text-center mb-2">Advertisement</p>
                <GoogleAd adClient={AD_CLIENT} adSlot={BOTTOM_SLOT} layout="horizontal" />
              </motion.div>

              {post.youtubeVideoId && (
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="w-full pt-6 pb-12"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-blue p-3 rounded-full text-white"><Play className="w-6 h-6 fill-current" /></div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Watch The Moment</h3>
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-1">Directly from the archive</p>
                    </div>
                  </div>
                  <LazyYouTubePlayer videoId={post.youtubeVideoId} />
                </motion.div>
              )}

            </div>

            <aside className="hidden lg:block lg:col-span-4 relative">
              <div className="sticky top-32 space-y-8">
                <div className="w-full border-l border-zinc-200 dark:border-zinc-800 pl-8">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 pb-2">Advertisement</p>
                  <GoogleAd adClient={AD_CLIENT} adSlot={SIDEBAR_SLOT} layout="vertical" />
                </div>
              </div>
            </aside>

          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-2xl mx-auto pt-10 mt-10 border-t-4 border-black dark:border-white text-center"
          >
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Want more laughs & revelation?</h3>
            <Button asChild size="lg" className="bg-black text-white hover:bg-brand-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-brand-yellow font-black text-lg px-8 py-6 rounded-none border-2 border-transparent hover:border-black transition-all uppercase tracking-widest">
              <Link href="/watch">Head to the Watch Page</Link>
            </Button>
          </motion.div>

        </article>
      </main>
    </>
  );
}

// -----------------------------------------------------------------
// REUSABLE LAZY VIDEO PLAYER COMPONENT
// -----------------------------------------------------------------
function LazyYouTubePlayer({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className="aspect-video w-full border-4 border-black dark:border-zinc-800 bg-zinc-900 relative overflow-hidden group shadow-2xl cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-brand-yellow text-black p-5 rounded-full group-hover:scale-110 shadow-xl transition-transform duration-300">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        </>
      ) : (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      )}
    </div>
  );
}