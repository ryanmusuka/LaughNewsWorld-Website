import HeroMission from "@/components/HeroMission";
import LatestNews from "@/components/LatestNews";
import ReelsGallery from "@/components/ReelsGallery";
import VideoHighlights from "@/components/VideoHighlights";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      {/* Modular Block 1: The Hero */}
      <HeroMission />
      
      {/* Modular Block 2: Latest News (We will build this next) */}
      <LatestNews />
      {/* Modular Block 3: YouTube videos */}
      <VideoHighlights />
      {/* Modular Block 4: Reels/Shorts Gallery */}
      <ReelsGallery />
      {/* Modular Block 5: Newsletter Signup */}
    </main>
  );
}