import Image from "next/image";
import Link from "next/link";
import { Play, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data: Vertical thumbnails for Reels/Shorts
const MOCK_REELS = [
  {
    id: 1,
    title: "When the mic feedback hits during prayer 💀",
    thumbnail: "https://images.unsplash.com/photo-1516280440502-65f67554f762?q=80&w=600&auto=format&fit=crop",
    views: "1.2M Views",
  },
  {
    id: 2,
    title: "The usher when you sit in the front row",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c092bb215de?q=80&w=600&auto=format&fit=crop",
    views: "850K Views",
  },
  {
    id: 3,
    title: "Me trying to find the scripture the pastor just read",
    thumbnail: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=600&auto=format&fit=crop",
    views: "2.1M Views",
  },
  {
    id: 4,
    title: "Worship leaders warming up be like...",
    thumbnail: "https://images.unsplash.com/photo-1523580494112-071d4581a59c?q=80&w=600&auto=format&fit=crop",
    views: "420K Views",
  },
  {
    id: 5,
    title: "Leaving church after a 3-hour service",
    thumbnail: "https://images.unsplash.com/photo-1545696563-af8f6ec35b64?q=80&w=600&auto=format&fit=crop",
    views: "3.4M Views",
  }
];

export default function ReelsGallery() {
  return (
    // We use a high-contrast LNW Blue background here to separate it from the black video section above it
    <section className="w-full py-16 px-0 md:px-6 bg-brand-blue text-white border-b-[8px] border-black dark:border-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-6 h-6 text-brand-yellow" />
              <p className="text-brand-yellow font-bold tracking-widest uppercase text-sm">Shorts & Reels</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Trending <span className="text-black">Laughs</span>
            </h2>
          </div>
          <Button className="hidden md:flex mt-4 md:mt-0 bg-black text-white hover:bg-black/80 font-bold rounded-none border-2 border-transparent transition-all">
            Follow on Instagram
          </Button>
        </div>

        {/* Horizontal Scroll Carousel for Vertical Videos */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 md:px-0 gap-4 md:gap-6">
          {MOCK_REELS.map((reel) => (
            <Link 
              href="#" 
              key={reel.id}
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
                  {reel.views}
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
          <Button className="w-full bg-black text-white font-bold rounded-none py-6 text-lg hover:bg-black/80 transition-colors">
            Follow on Instagram
          </Button>
          <Button className="w-full bg-black text-white font-bold rounded-none py-6 text-lg hover:bg-black/80 transition-colors">
            Follow on TikTok
          </Button>
        </div>

      </div>
    </section>
  );
}