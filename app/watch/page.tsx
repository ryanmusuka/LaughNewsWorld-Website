/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import { Play, Youtube, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Reusable animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // <-- This cast fixes the build
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function WatchPage() {
  const [longVideos, setLongVideos] = useState<any[]>([]);
  const [shorts, setShorts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from our new Next.js API route on load
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        setLongVideos(data.longVideos || []);
        setShorts(data.shorts || []);
      } catch (error) {
        console.error("Failed to fetch YouTube videos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-black dark:text-white pt-12 pb-20 px-6 flex flex-col items-center">
      
      <div className="max-w-7xl w-full mx-auto space-y-20 md:space-y-20">
        
        {/* 1. THE HEADER */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          // 3. Removed the mt-12 md:mt-24 that was pushing this way too far down
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1]">
            Beyond the <span className="text-brand-blue">Laughter</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Come for the punchlines, stay for the profound truth. While we love sharing the hilarious moments of Prophet Uebert Angel, every laugh is a bridge to deep, life-changing revelation. Explore our handpicked collections below.
          </motion.p>
        </motion.section>

        {/* LOADING STATE - Shows while the API fetches */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
            <p className="text-xl font-bold uppercase tracking-widest text-zinc-500">Loading the Vault...</p>
          </div>
        ) : (
          <>
            {/* 2. THE MAIN STAGE (16:9 Long Form) */}
            <section className="space-y-12">
              
              <motion.div 
                initial="hidden" animate="visible" variants={fadeUp} 
                className="text-center md:text-left border-b-[4px] border-black dark:border-white pb-4"
              >
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Latest Laughs & Revelation</h2>
                <p className="text-zinc-500 mt-2 font-medium">Deep dives, revelatory teachings, and humourous moments.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {longVideos.map((video) => (
                  <motion.a 
                    key={video.id}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "50px" }} 
                    variants={fadeUp}
                    href={video.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden bg-zinc-200 dark:bg-zinc-900 aspect-video rounded-xl border-4 border-transparent hover:border-brand-blue transition-all"
                  >
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-brand-yellow text-black p-4 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 fill-black ml-1" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>

            {/* 3. THE VERTICAL VAULT (9:16 Shorts) */}
            <section className="space-y-12 pb-24">
              
              <motion.div 
                initial="hidden" animate="visible" variants={fadeUp} 
                className="text-center md:text-left border-b-[4px] border-black dark:border-white pb-4"
              >
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">The Vertical Vault</h2>
                <p className="text-zinc-500 mt-2 font-medium">Quick hits, viral reels, and rapid-fire joy.</p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {shorts.map((video) => (
                  <motion.a 
                    key={video.id}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "50px" }} // Triggers individually
                    variants={fadeUp}
                    href={video.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden bg-zinc-200 dark:bg-zinc-900 aspect-[9/16] rounded-xl border-4 border-transparent hover:border-brand-yellow transition-all"
                  >
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-brand-blue text-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 4. THE CALL TO ACTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8 pt-12 pb-24 border-t-2 border-zinc-200 dark:border-zinc-800"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Don&apos;t miss a single <span className="text-brand-yellow">Laugh.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            Join thousands of others getting their daily dose of Godly joy and deep revelation. Subscribe to the official LaughNewsWorld channel today.
          </motion.p>
          
          <motion.div variants={fadeUp} className="pt-4">
            <a 
              href="https://www.youtube.com/@Laughnewsworld" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-red-700 text-white font-black text-lg md:text-xl uppercase tracking-wider py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-red-500/30"
            >
              <Youtube className="w-8 h-8" />
              Subscribe on YouTube
            </a>
          </motion.div>
        </motion.section>

      </div>
    </main>
  );
}