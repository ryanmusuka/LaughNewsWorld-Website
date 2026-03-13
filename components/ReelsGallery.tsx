/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ReelsGallery() {
  const [reels, setReels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from our Next.js API route on load
  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        // Grab only the shorts and limit to the 5 most recent
        setReels((data.shorts || []).slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch YouTube shorts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReels();
  }, []);

  return (
    <section className="w-full py-8 px-0 md:px-6 bg-brand-blue text-white border-t-[8px] border-t-brand-yellow">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Trending <span className="text-black">Laughs</span>
            </h2>
            <p className="text-brand-yellow font-medium mt-2">Laughter-inducing shorts.</p>
          </div>
          <Button className="hidden md:flex mt-4 md:mt-0 bg-brand-yellow text-white hover:bg-black/80 dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            <Link href="/watch">
               Watch LNW
            </Link>
          </Button>
        </div>

        {/* Horizontal Scroll Carousel for Vertical Videos */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 md:px-0 gap-4 md:gap-6">
          {!isLoading && reels.map((reel) => (
            <Link 
              href={reel.link} 
              key={reel.id}
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex-none w-[60vw] sm:w-[220px] md:w-[280px] snap-center cursor-pointer"
            >
              {/* Vertical Thumbnail Container -> aspect-[9/16] is the magic class here! */}
              <div className="relative aspect-[9/16] w-full overflow-hidden border-4 border-black group-hover:border-brand-yellow transition-colors bg-zinc-900 rounded-xl md:rounded-2xl">
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Views Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white tracking-wider">
                  <Play className="w-3 h-3 inline-block mr-1 mb-[2px] fill-white" />
                  Shorts
                </div>

                {/* Reel Title at Bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm md:text-base font-bold leading-snug text-white group-hover:text-brand-yellow transition-colors line-clamp-3">
                    {reel.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Subscribe Button */}
        <div className="px-6 md:hidden">
         <Button className="w-full bg-black text-white hover:bg-black/80 dark:text-white dark:hover:bg-white/80 dark:hover:text-black font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            <Link href="/watch">
               Watch LNW
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}