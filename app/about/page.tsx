"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-black dark:text-white py-24 px-6 flex flex-col items-center">
      
      <article className="max-w-2xl w-full mx-auto space-y-24">
        
        {/* 1. THE HOOK */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="space-y-8 mt-12 md:mt-24"
        >
          {/* Direct motion.h1 with text-center */}
          <motion.h1 variants={fadeUp} className="text-center text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1]">
            Networking the world with Godly laughter through <span className="text-brand-blue">Prophet Uebert Angel</span> ❤️🌍
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Religion often builds walls, but pure joy tears them down. Our mission is simple: to share the hilarious, lighthearted & relatable moments of Prophet Uebert Angel with the world., and ultimately introduce them to the life-changing GoodNews of Jesus Christ. They come for the laughs; they stay for the Truth.
            </motion.p>
        </motion.section>

        {/* 2. THE GENESIS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="space-y-6"
        >
          {/* block w-fit mx-auto centers the element without breaking Framer Motion */}
          <motion.h2 variants={fadeUp} className="block w-fit mx-auto text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-[8px] border-brand-yellow pb-2 text-center">
            The Genesis
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
            It all began during the heavy, isolated days of the COVID-19 lockdown. The world was at a standstill, and a sense of refreshing joy was desperately needed. During a special Zoom meeting between Prophetess Bebe Angel and the Harare branch of the church, she stepped in with the incredible warmth of a mother, lifting spirits and cracking jokes that had the entire call laughing. Sitting in that virtual room, our anonymous creator had a simple, passing thought:
          </motion.p>

          {/* INLINE CALLOUT (Smaller, subtle quote) */}
          <motion.div variants={fadeUp} className="pl-6 border-l-4 border-zinc-300 dark:border-zinc-700 py-2 my-6">
            <p className="text-xl font-bold italic text-zinc-600 dark:text-zinc-400">
              &quot;People would find this so funny. I wish there was a way to share this exact feeling with everyone who couldn&apos;t be here.&quot;
            </p>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
            That single desire to share a smile was the true birth of LaughNewsWorld. Acting on that spark, the creator began clipping and posting those lighthearted moments on a personal Atomgram account. The response was so organic and beautiful that it quickly demanded its own space, leading to the launch of the LaughNewsWorld Instagram page.
          </motion.p>
          
          <motion.p variants={fadeUp} className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
            What started entirely as a lockdown hobby, an unofficial passion project run by a fanbase that just loved the Prophets&apos; humor, slowly began to catch fire. Today, even though we are recognized and admired by the Prophets themselves, our identity hasn&apos;t changed. We remain an independent fanbase, using the irresistible power of humor to draw the world in to hear the GoodNews of Jesus Christ.
          </motion.p>
        </motion.section>

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
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="space-y-6"
        >
          <motion.h2 variants={fadeUp} className="block w-fit mx-auto text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-[8px] border-brand-yellow pb-2 text-center">
            The Impact
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
            What started as a lockdown hobby has exploded into a global net. With over <strong className="text-brand-yellow dark:text-brand-yellow font-black">15 million views</strong> across our platforms, LaughNewsWorld has proven that joy is highly contagious. But the views aren&apos;t the final goal, they are the funnel:
          </motion.p>

          <motion.ul variants={fadeUp} className="space-y-4 mt-6">
            <li className="flex gap-4">
              <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
              <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
                <strong className="text-brand-blue dark:text-brand-blue font-black">Real Souls Won:</strong> We have celebrated 4 direct salvations right in our DMs from individuals asking how to receive Jesus Christ into their lives after watching our content.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
              <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
                <strong className="text-brand-blue dark:text-brand-blue font-black">Global Connections:</strong> We receive countless messages asking for church locations, successfully directing seekers to their nearest Spirit Embassy branch or the main YouTube channel for sound teachings.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
              <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
                <strong className="text-brand-blue dark:text-brand-blue font-black">A Youth Fixture:</strong> Despite being unofficially affiliated, we&apos;ve become a staple in the church&apos;s online culture, especially among the youth who connect deeply with our approach.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="text-brand-blue dark:text-brand-yellow font-black text-2xl leading-none">→</span>
              <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed">
                <strong className="text-brand-blue dark:text-brand-blue font-black">In The Zone:</strong> We don&apos;t just post; we participate. We actively sow into the vision by giving towards the ministry&apos;s projects during Missions Week, at every given opportunity.
              </p>
            </li>
          </motion.ul>
        </motion.section>

        {/* 4. THE CULTURE */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="space-y-8"
        >
          <motion.h2 variants={fadeUp} className="block w-fit mx-auto text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-[8px] border-brand-yellow pb-2 text-center">
            The Culture
          </motion.h2>
          <div className="space-y-6">
            <motion.div variants={fadeUp} className="flex flex-col">
              <span className="font-black text-xl tracking-widest text-brand-blue uppercase">01. Joy is a Fruit</span>
              <span className="text-lg text-zinc-800 dark:text-zinc-300 mt-1">We believe laughter is biblical & beneficial (Proverbs 17:22).</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col">
              <span className="font-black text-xl tracking-widest text-brand-blue uppercase">02. Laughing Sessions</span>
              <span className="text-lg text-zinc-800 dark:text-zinc-300 mt-1">As Prophet Angel taught, we must consistently have laughing sessions and exhibit the joy of the Spirit.</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col">
              <span className="font-black text-xl tracking-widest text-brand-blue uppercase">03. The Main Thing</span>
              <span className="text-lg text-zinc-800 dark:text-zinc-300 mt-1">Everything ultimately points back to Christ.</span>
            </motion.div>
          </div>
        </motion.section>

        {/* 6. THE INVITATION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="pt-16 pb-12 text-center border-t-4 border-black dark:border-zinc-800 w-full"
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
  );
}