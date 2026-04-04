"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script"; // Required for isolated AdSense injection
import GoogleAd from "@/components/GoogleAd"; // Your reusable Ad component

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

export default function AboutPage() {
  // AdSense Configuration
  const AD_CLIENT = "ca-pub-2550346576190821"; 
  const IN_ARTICLE_SLOT_1 = "8345058401";
  const IN_ARTICLE_SLOT_2 = "6373501189";
  const SIDEBAR_SLOT ="6565072879";

  return (
    <>
      {/* TARGETED SCRIPT INJECTION: Only loads on the About Page */}
      <Script
        id="adsense-about-init"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
        crossOrigin="anonymous"
      />

      <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-black dark:text-white pt-12 pb-20 px-6">
        
        <article className="w-full">
          
          {/* 1. THE HOOK (Centered & Full Width, outside the grid) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl mx-auto space-y-8 mb-20 text-center" 
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1]">
              Networking the world with Godly laughter through <span className="text-brand-blue">Prophet Uebert Angel</span> ❤️🌍
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl mx-auto">
              Religion often builds walls, but pure joy tears them down. Our mission is simple: to share the hilarious, lighthearted & relatable moments of Prophet Uebert Angel with the world, and ultimately introduce them to the life-changing GoodNews of Jesus Christ. They come for the laughs; they stay for the Truth.
            </motion.p>
          </motion.section>

          {/* THE GRID ARCHITECTURE */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: 8 Columns for the About text & inline ads */}
            <div className="lg:col-span-8 space-y-16 md:space-y-20">
              
              {/* 2. THE GENESIS */}
              <section className="space-y-6">
                <motion.h2 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="block w-fit text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-[8px] border-brand-yellow pb-2"
                >
                  The Genesis
                </motion.h2>
                <motion.p 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif"
                >
                  It all began during the heavy, isolated days of the COVID-19 lockdown. The world was at a standstill, and a sense of refreshing joy was desperately needed. During a special Zoom meeting between Prophetess Bebe Angel and the Harare branch of the church, she stepped in with the incredible warmth of a mother, lifting spirits and cracking jokes that had the entire call laughing. Sitting in that virtual room, our anonymous creator had a simple, passing thought:
                </motion.p>
                
                {/* INLINE CALLOUT */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="pl-6 border-l-4 border-zinc-300 dark:border-zinc-700 py-2 my-6"
                >
                  <p className="text-xl font-bold italic text-zinc-600 dark:text-zinc-400">
                    &quot;People would find this so funny. I wish there was a way to share this exact feeling with everyone who couldn&apos;t be here.&quot;
                  </p>
                </motion.div>

                <motion.p 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif"
                >
                  That single desire to share a smile was the true birth of LaughNewsWorld. Acting on that spark, the creator began clipping and posting those lighthearted moments on a personal Atomgram account. The response was so organic and beautiful that it quickly demanded its own space, leading to the launch of the LaughNewsWorld Instagram page.
                </motion.p>
                
                <motion.p 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif"
                >
                  What started entirely as a lockdown hobby, an unofficial passion project run by a fanbase that just loved the Prophets&apos; humor, slowly began to catch fire. Today, even though we are recognized and admired by the Prophets themselves, our identity hasn&apos;t changed. We remain an independent fanbase, using the irresistible power of humor to draw the world in to hear the GoodNews of Jesus Christ.
                </motion.p>
              </section>

              {/* IN-FEED AD 1 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-6 border-y border-zinc-200 dark:border-zinc-800 w-full">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 text-center mb-2">Advertisement</p>
                <GoogleAd adClient={AD_CLIENT} adSlot={IN_ARTICLE_SLOT_1} layout="horizontal" />
              </motion.div>

              {/* PULL QUOTE */}
              <motion.blockquote 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-3xl md:text-5xl font-black italic tracking-tight border-l-[8px] border-brand-yellow pl-8 py-4 my-16 text-brand-blue dark:text-brand-blue"
              >
                &quot;Humour breaks down the walls so the Gospel can walk right through the front door.&quot;
              </motion.blockquote>

              {/* 3. THE IMPACT */}
              <section className="space-y-6">
                <motion.h2 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="block w-fit text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-[8px] border-brand-yellow pb-2"
                >
                  The Impact
                </motion.h2>
                
                <motion.p 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif"
                >
                  What started as a lockdown hobby has exploded into a global net. With over <strong className="text-brand-yellow dark:text-brand-yellow font-black">15 million views</strong> across our platforms, LaughNewsWorld has proven that joy is highly contagious. But the views aren&apos;t the final goal, they are the funnel:
                </motion.p>

                <ul className="space-y-4 mt-6">
                  <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4">
                    <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
                    <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                      <strong className="text-brand-blue dark:text-brand-blue font-black font-sans">Real Souls Won:</strong> We have celebrated 4 direct salvations right in our DMs from individuals asking how to receive Jesus Christ into their lives after watching our content.
                    </p>
                  </motion.li>
                  <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4">
                    <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
                    <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                      <strong className="text-brand-blue dark:text-brand-blue font-black font-sans">Global Connections:</strong> We receive countless messages asking for church locations, successfully directing seekers to their nearest Spirit Embassy branch or the main YouTube channel for sound teachings.
                    </p>
                  </motion.li>
                  <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4">
                    <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
                    <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                      <strong className="text-brand-blue dark:text-brand-blue font-black font-sans">A Youth Fixture:</strong> Despite being unofficially affiliated, we&apos;ve become a staple in the church&apos;s online culture, especially among the youth who connect deeply with our approach.
                    </p>
                  </motion.li>
                  <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4">
                    <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
                    <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed font-serif">
                      <strong className="text-brand-blue dark:text-brand-blue font-black font-sans">In The Zone:</strong> We don&apos;t just post; we participate. We actively sow into the vision by giving towards the ministry&apos;s projects during Missions Week, at every given opportunity.
                    </p>
                  </motion.li>
                </ul>
              </section>

              {/* IN-FEED AD 2 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-6 border-y border-zinc-200 dark:border-zinc-800 w-full">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 text-center mb-2">Advertisement</p>
                <GoogleAd adClient={AD_CLIENT} adSlot={IN_ARTICLE_SLOT_2} layout="horizontal" />
              </motion.div>

              {/* 4. THE CULTURE */}
              <section className="space-y-8">
                <motion.h2 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
                  className="block w-fit text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-[8px] border-brand-yellow pb-2"
                >
                  The Culture
                </motion.h2>
                <div className="space-y-6">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col">
                    <span className="font-black text-xl tracking-widest text-brand-blue uppercase">01. Joy is a Fruit</span>
                    <span className="text-lg text-zinc-800 dark:text-zinc-300 mt-1 font-serif">We believe laughter is biblical & beneficial (Proverbs 17:22).</span>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col">
                    <span className="font-black text-xl tracking-widest text-brand-blue uppercase">02. Laughing Sessions</span>
                    <span className="text-lg text-zinc-800 dark:text-zinc-300 mt-1 font-serif">As Prophet Angel taught, we must consistently have laughing sessions and exhibit the joy of the Spirit.</span>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col">
                    <span className="font-black text-xl tracking-widest text-brand-blue uppercase">03. The Main Thing</span>
                    <span className="text-lg text-zinc-800 dark:text-zinc-300 mt-1 font-serif">Everything ultimately points back to Christ.</span>
                  </motion.div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: 4 Columns for the Sticky Sidebar Ad */}
            <aside className="hidden lg:block lg:col-span-4 relative">
              <div className="sticky top-32 space-y-8">
                <div className="w-full border-l border-zinc-200 dark:border-zinc-800 pl-8">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 pb-2">Advertisement</p>
                  <GoogleAd adClient={AD_CLIENT} adSlot={SIDEBAR_SLOT} layout="vertical" />
                </div>
              </div>
            </aside>

          </div>

          {/* 5. THE INVITATION (Centered at the very bottom) */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} 
            variants={fadeUp}
            className="mt-16 pt-16 pb-12 text-center border-t-4 border-black dark:border-zinc-800 w-full max-w-4xl mx-auto"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-black text-white hover:bg-brand-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-brand-yellow font-black text-xl px-10 py-8 rounded-none border-4 border-transparent hover:border-black transition-all"
            >
              <Link href="/watch">
                Experience LaughNewsWorld.
              </Link>
            </Button>
          </motion.section>

        </article>
      </main>
    </>
  );
}