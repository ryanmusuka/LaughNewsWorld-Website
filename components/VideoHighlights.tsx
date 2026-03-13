/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function VideoHighlights() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from our Next.js API route on load
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        // Grab only the long videos and limit to the 5 most recent
        setVideos((data.longVideos || []).slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch YouTube videos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return (
    <section className="w-full py-8 px-0 md:px-6 bg-black dark:bg-zinc-950 text-white border-t-[8px] border-t-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header  */}
        <div className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Recent <span className="text-brand-yellow">Videos</span>
            </h2>
            <p className="text-zinc-400 font-medium mt-2">Deep dives, revelatory teachings, and humourous moments.</p>
          </div>
          <Button className="hidden md:flex mt-4 md:mt-0 bg-brand-blue text-white hover:bg-black/80 dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            <Link href="/watch">
               Watch LNW
            </Link>
          </Button>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 md:px-0 gap-6">
          {!isLoading && videos.map((video) => (
            <Link 
              href={video.link} 
              key={video.id}
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-center cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden border-2 border-zinc-800 group-hover:border-brand-yellow transition-colors bg-zinc-900">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-brand-yellow text-black rounded-full p-4 transform group-hover:scale-110 transition-transform shadow-xl">
                    <Play className="w-8 h-8 fill-black ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-bold text-white tracking-wider">
                  {video.duration || "Watch"}
                </div>
              </div>

              {/* Video Title */}
              <h3 className="mt-4 text-xl font-bold leading-tight group-hover:text-brand-yellow transition-colors line-clamp-2">
                {video.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Mobile Subscribe Button */}
        <div className="px-6 md:hidden">
          <Button className="w-full bg-brand-blue text-white hover:bg-black/80 dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            <Link href="/watch">
               Watch LNW
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}