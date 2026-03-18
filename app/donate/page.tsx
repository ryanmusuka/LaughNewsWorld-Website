"use client";

import { motion } from "framer-motion";
import { Heart, Mic, Laptop, Share2, MessageSquareQuote, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-20 px-4 md:px-8 text-zinc-900 dark:text-zinc-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-3xl mx-auto space-y-12"
      >
        {/* 1. The Emotional Hook */}
        <motion.section variants={fadeUp} className="text-center space-y-6">
          <div className="inline-flex items-center justify-center bg-brand-yellow/10 rounded-full mb-4 text-brand-yellow">
            <Heart className="w-16 h-16 fill-brand-yellow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Help Us Keep the <br className="hidden md:block" /> Laughs Rolling
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            LaughNewsWorld is dedicated to providing high-quality, clean, faith-aligned comedy and news. In a digital world often filled with negativity, we strive to be your daily safe haven, an uplifting space that brings a smile to your face. But keeping this space running and growing takes massive amounts of time and resources.
          </p>
        </motion.section>

        {/* 2. Tangible Impact */}
        <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Operations Card */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col">
            <Laptop className="w-8 h-8 text-brand-blue mb-4" />
            <h3 className="text-xl font-bold uppercase mb-2">Daily Operations</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
             Your support helps sustain the real driving force behind this platform: the countless hours spent finding, editing, and curating content. It helps cover our day-to-day digital tools and the sheer effort required to bring you fresh, clean laughs regularly. And ultimately, it allows us to bless and thank the incredible team we have!
             </p>
          </div>

          {/* The Roadmap (Podcast) Card */}
         <div className="bg-zinc-900 dark:bg-black border-4 border-brand-yellow rounded-3xl p-8 flex flex-col shadow-xl">
            <Mic className="w-8 h-8 text-brand-yellow mb-4" />
            <h3 className="text-xl font-bold uppercase text-white mb-2">Taking It to the Next Level</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We want to take these laughs beyond just short videos and memes. Your support helps us slowly save up for the essential gear we need to launch a full-length LaughNewsWorld podcast; a space for longer conversations, special guests, and even more clean, faith-based comedy.
            </p>
          </div>

        </motion.section>

        {/* 5. Social Proof */}
        <motion.section variants={fadeUp} className="bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-8 md:p-10 relative text-center">
          <MessageSquareQuote className="w-10 h-10 text-brand-blue/30 mx-auto mb-4 absolute top-6 left-1/2 -translate-x-1/2 -z-10" />
          <p className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 italic mb-4">
            &quot;LaughNewsWorld? That&apos;s a brilliant page!&quot; </p>
          <span className="text-sm font-bold uppercase tracking-wider text-brand-blue">— Prophet Uebert Angel</span>
        </motion.section>

        {/* CTA, Alternative Support & Disclaimer */}
        <motion.section variants={fadeUp} className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 text-center space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">Partner With Us</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mx-auto">
              Click below to make a secure, one-time or recurring donation via Stripe. 
              </p>
          </div>

          {/* Single Focused Button */}
          <a href="YOUR_STRIPE_PAYMENT_LINK_HERE" target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto max-w-md mx-auto">
            <Button className="w-full bg-brand-yellow text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black text-lg py-7 rounded-2xl transition-all shadow-lg hover:shadow-brand-yellow/20">
              Support Our Mission
            </Button>
          </a>

          {/* 4. Alternative Support */}
          <div className="pt-6">
            <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
              <Share2 className="w-5 h-5" />
              <p>Can&apos;t donate right now? No problem at all!</p>
            </div>
            <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
              Liking, sharing our posts, telling a friend, and keeping us in your prayers is just as valuable to us. Thank you for being part of the family.
            </p>
          </div>

          {/* Disclaimer (Faith-based & Independence) */}
          <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-500 text-left md:text-center space-y-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-zinc-400" />
              <p>
                <strong>Transparency Notice:</strong> LaughNewsWorld is an independent, fan-based entity and is not directly affiliated with the ministry, The GoodNewsChurch.
              </p>
            </div>
            <p className="max-w-2xl mx-auto">
              Donations made through this page go exclusively toward the operating costs, software, and future projects of the LaughNewsWorld platform. This is a contribution to a content creator platform and does not represent a tithe or offering to the ministry. Further details can be found in our Terms and Conditions.
            </p>
          </div>

        </motion.section>
      </motion.div>
    </div>
  );
}