import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data: We will replace this with your actual YouTube API/Supabase data later
const MOCK_VIDEOS = [
  {
    id: 1,
    title: "When the Worship Leader Takes It Too Far",
    thumbnail: "https://images.unsplash.com/photo-1516280440502-65f67554f762?q=80&w=800&auto=format&fit=crop",
    link: "https://youtube.com",
    duration: "4:20"
  },
  {
    id: 2,
    title: "The Pastor's Secret Handshake",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c092bb215de?q=80&w=800&auto=format&fit=crop",
    link: "https://youtube.com",
    duration: "3:15"
  },
  {
    id: 3,
    title: "Church Ushers Be Like...",
    thumbnail: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=800&auto=format&fit=crop",
    link: "https://youtube.com",
    duration: "5:02"
  },
  {
    id: 4,
    title: "Youth Group Icebreakers Gone Wrong",
    thumbnail: "https://images.unsplash.com/photo-1523580494112-071d4581a59c?q=80&w=800&auto=format&fit=crop",
    link: "https://youtube.com",
    duration: "2:45"
  }
];

export default function VideoHighlights() {
  return (
    <section className="w-full py-16 px-0 md:px-6 bg-black dark:bg-zinc-950 text-white border-b-[8px] border-brand-yellow">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header - Padded on mobile since the carousel breaks out of padding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Watch <span className="text-brand-yellow">LNW</span>
            </h2>
            <p className="text-zinc-400 font-medium mt-2">The latest sketches, interviews, and shorts.</p>
          </div>
          <Button variant="outline" className="hidden md:flex mt-4 md:mt-0 rounded-none border-2 border-white text-black hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-colors font-bold">
            Subscribe on YouTube
          </Button>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 md:px-0 gap-6">
          {MOCK_VIDEOS.map((video) => (
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
                  {video.duration}
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
          <Button className="w-full bg-white text-white font-bold rounded-none hover:bg-brand-yellow transition-colors py-6 text-lg">
            Subscribe on YouTube
          </Button>
        </div>

      </div>
    </section>
  );
}