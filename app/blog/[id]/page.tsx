"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
  
  if (sentences.length === 1) {
    return { quote: paragraph, remainder: null };
  }

  const quote = sentences[0].trim();
  const remainder = sentences.slice(1).join(" ").trim();
  
  return { quote, remainder };
}

// 2. MOCK DATABASE 
const mockDatabase = [
  {
    id: "1",
    category: "Revelation",
    title: "Why Laughter is a Spiritual Weapon You're Not Using",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2500&auto=format&fit=crop",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    author: "LaughNewsWorld Team",
    youtubeVideoId: "dQw4w9WgXcQ", 
    content: [
      "Joy is not just a reaction to good news; it is a prophetic declaration that the enemy has lost. For too long, religion has painted a picture of a somber, unsmiling God, but if we look closely at the scriptures, joy is listed as a fruit of the Spirit, right alongside love and peace.",
      "Prophet Uebert Angel has consistently demonstrated that the anointing flows heavily in an atmosphere of joy. When you laugh, you are literally changing the molecular structure of the atmosphere around you. You are displacing heaviness.",
      "The devil cannot function in an atmosphere of pure, unadulterated joy. It confuses his camp. When he expects you to cry over a situation, but you choose to laugh instead, you strip him of his power over your mind.",
      "During a recent Sunday service, the Prophet cracked a joke right before a major deliverance session. Many wondered why he would do that before such a serious spiritual warfare moment.",
      "Humour breaks down the walls of the flesh so the Gospel can walk right through the front door of the spirit. By disarming the congregation's religious guards, their spirits were left wide open to receive the miraculous. People who had been bound for years were suddenly laughing their way into freedom. It wasn't just a comedy show; it was a highly calculated spiritual strike.",
      "So the next time you feel the weight of the world pressing down on you, don't just pray a sad prayer. Put on a sermon that makes you laugh. Watch a clip that brings you genuine joy. Let that godly laughter bubble up, and watch the walls of Jericho in your life come tumbling down."
    ]
  },
  {
    id: "2",
    category: "Humor",
    title: "The Science of Joy: What Happens in the Spirit?",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 22, 2026",
    readTime: "4 min read",
    author: "LaughNewsWorld Team",
    content: [
      "There is an actual science to what happens in the realm of the spirit when a believer decides to laugh. It's more than just a physical reflex; it is a spiritual frequency.",
      "When we observe the patterns of major breakthroughs in the ministry, they are often preceded by intense moments of corporate laughter. This isn't a coincidence.",
      "Laughter acts as a spiritual reset button. It clears the atmosphere of doubt, fear, and anxiety, making room for the prophetic word to land without interference.",
      "We saw this vividly during the last crossover night. The tension of the old year was heavy, but one well-placed moment of humor shattered that tension entirely.",
      "A joyful spirit is a receptive spirit. The moment you start laughing, your spiritual defenses drop, not to the enemy, but to the Holy Spirit. You stop trying to figure out how the miracle will happen and simply rest in the joy of the Lord.",
      "Next time you need a breakthrough, try laughing first. It might just be the very key you've been looking for to unlock your next level."
    ]
  },
  {
    id: "3",
    category: "Testimony",
    title: "How One Joke Shifted the Atmosphere in London",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 20, 2026",
    readTime: "3 min read",
    author: "LaughNewsWorld Team",
    content: [
      "London has always been a hub of intense spiritual activity, but what happened last Sunday was entirely unexpected.",
      "The service started with a heavy focus on deep spiritual warfare. The congregation was locked in, intense, and serious. But the Prophet knew something they didn't.",
      "Sometimes the heaviest chains are broken by the lightest moments. He paused his teaching, looked at the crowd, and delivered a punchline that had the entire room erupting in laughter.",
      "In that exact moment, the atmosphere shifted. It was palpable. The heavy cloud over the room dissipated, replaced by a tangible sense of liberty.",
      "Joy is the ultimate act of spiritual defiance. By choosing to laugh in the face of demonic opposition, the congregation declared total victory before the prayer even finished.",
      "Testimonies poured in the following week of spontaneous healings that occurred exactly during that moment of laughter. It stands as a testament to the power of prophetic joy."
    ]
  },
  {
    id: "4",
    category: "Prophetic",
    title: "Joy Cometh In The Morning: Understanding Times and Seasons",
    image: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    author: "LaughNewsWorld Team",
    content: [
      "Weeping may endure for a night, but joy comes in the morning. This is not just a poetic scripture; it is a prophetic timetable.",
      "Many believers get stuck in the night season because they refuse to acknowledge when the morning has arrived. The transition between seasons requires a change in your disposition.",
      "You cannot enter your morning season with a night season attitude. You have to start rejoicing before you see the full manifestation of the daylight.",
      "Prophet Angel often teaches on the necessity of aligning your emotions with your prophetic destination.",
      "Your laughter is the alarm clock that signals your spirit it is morning. If you wait for everything to be perfect before you rejoice, you will miss the transition entirely. Faith rejoices in advance.",
      "Start practicing your morning joy today. Let the enemy know your night is officially over."
    ]
  },
  {
    id: "5",
    category: "Teaching",
    title: "Don't Let The Enemy Steal Your Punchline",
    image: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 15, 2026",
    readTime: "4 min read",
    author: "LaughNewsWorld Team",
    content: [
      "The enemy is a master thief, and his favorite target isn't your money—it's your joy.",
      "He knows that if he can take your joy, he can drain your strength. A joyless believer is a powerless believer, easy prey for discouragement.",
      "Guarding your joy requires intentionality. It means refusing to engage with toxic conversations, doom-scrolling, or environments that drain your spirit.",
      "This is why the culture of LaughNewsWorld is so vital. We provide an oasis of godly humor in a desert of bad news.",
      "Your laugh is your spiritual signature. The devil hates it because it reminds him of his defeat at Calvary. Every time you smile through a storm, you are mocking his attempts to destroy you.",
      "Keep your joy fiercely protected. It is one of the most valuable assets in your spiritual arsenal."
    ]
  },
  {
    id: "6",
    category: "Humor",
    title: "Top 5 Moments the Prophet Made Us Cry Laughing",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 10, 2026",
    readTime: "2 min read",
    author: "LaughNewsWorld Team",
    youtubeVideoId: "jNQXAC9IVRw",
    content: [
      "If there is one thing we know for sure, it is that Prophet Uebert Angel has a masterclass sense of humor.",
      "Over the past year, we have compiled the most unscripted, hilarious moments that caught the congregation completely off guard.",
      "From his unique observations about married life to his legendary interactions with people on the prayerline, these moments are unforgettable.",
      "Our team sat down and watched hundreds of hours of footage to narrow it down to the absolute best.",
      "Laughter is the glue that binds a spiritual family together. Sharing these moments reminds us that while our mission is serious, we don't have to take ourselves too seriously. We are part of a family that knows how to rejoice.",
      "Head over to our Watch page to see the full compilation video of these top 5 moments. You won't want to miss it!"
    ]
  }
];

export default function ArticlePage() {
  const params = useParams();
  const post = mockDatabase.find(p => p.id === params.id) || mockDatabase[0];

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-black dark:text-white pt-28 pb-16 px-6">
      
      {/* TOP NAVIGATION */}
      <div className="max-w-4xl mx-auto mb-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-blue font-bold uppercase tracking-widest text-xs transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Front Page
        </Link>
      </div>

      <article className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <motion.header 
          initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6 text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <span className="bg-brand-yellow text-black px-3 py-1 text-xs font-black uppercase tracking-widest">
              {post.category}
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.05]">
            {post.title}
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest pt-4 border-t-2 border-zinc-200 dark:border-zinc-800 w-fit mx-auto">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </motion.div>
        </motion.header>

        {/* HERO IMAGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video md:aspect-[21/9] bg-zinc-200 overflow-hidden border-2 border-black dark:border-zinc-800"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* THE SMART AUTO-FORMATTER */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-2xl mx-auto space-y-8 pb-10"
        >
          {post.content.map((paragraph, index) => {
            if (index === 2) {
              const { quote, remainder } = extractQuote(paragraph);
              return (
                <div key={index} className="space-y-8">
                  <motion.div variants={fadeUp} className="pl-6 border-l-4 border-zinc-300 dark:border-zinc-700 py-2 my-10">
                    <p className="text-xl font-bold italic text-zinc-600 dark:text-zinc-400">
                      &quot;{quote}&quot;
                    </p>
                  </motion.div>
                  {remainder && (
                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                      {remainder}
                    </motion.p>
                  )}
                </div>
              );
            }

            if (index === 4) {
              const { quote, remainder } = extractQuote(paragraph);
              return (
                <div key={index} className="space-y-8">
                  <motion.blockquote variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight border-l-[8px] border-brand-yellow pl-6 py-2 my-16 text-brand-blue dark:text-brand-blue leading-[1.1]">
                    &quot;{quote}&quot;
                  </motion.blockquote>
                  {remainder && (
                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                      {remainder}
                    </motion.p>
                  )}
                </div>
              );
            }

            return (
              <motion.p key={index} variants={fadeUp} className="text-lg md:text-xl text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                {paragraph}
              </motion.p>
            );
          })}
        </motion.div>

        {/* CONDITIONALLY RENDERED LAZY VIDEO SECTION */}
        {post.youtubeVideoId && (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-3xl mx-auto pt-6 pb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-brand-blue p-3 rounded-full text-white">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Watch The Moment</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-1">Directly from the archive</p>
              </div>
            </div>
            
            <LazyYouTubePlayer videoId={post.youtubeVideoId} />
          </motion.div>
        )}

        {/* FOOTER CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-2xl mx-auto pt-10 border-t-4 border-black dark:border-white text-center"
        >
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Want more laughs?</h3>
          <Button asChild size="lg" className="bg-black text-white hover:bg-brand-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-brand-yellow font-black text-lg px-8 py-6 rounded-none border-2 border-transparent hover:border-black transition-all uppercase tracking-widest">
            <Link href="/watch">
              Head to the Watch Page
            </Link>
          </Button>
        </motion.div>

      </article>
    </main>
  );
}

// -----------------------------------------------------------------
// REUSABLE LAZY VIDEO PLAYER COMPONENT
// This keeps the site fast by only loading the iframe WHEN clicked!
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
          {/* High Quality YouTube Thumbnail */}
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          {/* Giant Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-brand-yellow text-black p-5 rounded-full group-hover:scale-110 shadow-xl transition-transform duration-300">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        </>
      ) : (
        /* The actual video player loads exactly here when clicked */
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