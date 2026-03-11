import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroMission() {
  return (
    // Mobile-First CSS: Default padding is py-16, expanding to py-32 on large screens
    <section className="w-full bg-primary py-16 px-6 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center border-b-[8px] border-black dark:border-white">
      <div className="max-w-4xl space-y-6">
        
        {/* The Eyebrow / Tagline */}
        <p className="text-sm md:text-base font-bold tracking-widest uppercase text-primary-foreground/80">
          LaughNewsWorld
        </p>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary-foreground uppercase leading-[0.9]">
          God, Humour <br className="hidden md:block" /> & Revelation.
        </h1>

        <p className="text-lg md:text-xl font-medium text-primary-foreground max-w-[600px] mx-auto pt-4">
          Networking the world with Godly laughter through Prophet Uebert Angel ❤️🌍
        </p>

        {/* Call to Action */}
        <div className="pt-8">
          <Button
            asChild 
            size="lg" 
            className="bg-brand-blue text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105"
          > 
            <Link href="/about">
               The LNW Story
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}