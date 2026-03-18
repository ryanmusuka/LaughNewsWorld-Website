"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, ArrowLeft, Shirt } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50 dark:bg-black">
      
      {/* Background Gimmicks (Spinning Sparkles) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 md:left-1/4 text-brand-yellow/20"
      >
        <Sparkles className="w-24 h-24 md:w-40 md:h-40" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 md:right-1/4 text-brand-blue/10"
      >
        <Shirt className="w-32 h-32 md:w-48 md:h-48" />
      </motion.div>

      {/* The Bouncing Centerpiece */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="z-10 relative"
      >
        {/* NOTE: If you want to use the image you uploaded, replace this <ShoppingBag> with an <img src="/your-image.png" className="w-48 h-48 object-contain" /> */}
        <ShoppingBag className="w-32 h-32 md:w-40 md:h-40 text-brand-blue drop-shadow-2xl" />
        
        {/* Jumpy Little Badge */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], rotate: [12, 16, 12] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-2 -right-6 bg-brand-yellow text-black text-sm font-black uppercase px-4 py-2 rounded-full border-4 border-black dark:border-zinc-900 shadow-xl"
        >
          Coming Soon!
        </motion.div>
      </motion.div>

      {/* The Text Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
        className="text-center mt-10 space-y-6 max-w-2xl z-10"
      >
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
          Hold Onto Your <br className="hidden md:block" /> Wallets!
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed px-4">
          We are currently in the lab cooking up some highly exclusive <strong className="text-brand-blue dark:text-brand-yellow">LaughNewsWorld Merch</strong>. 
          Expect hoodies, tees, and gear so fresh, it&apos;s practically a sin to miss out on. 
        </p>
      </motion.div>

      {/* Call to Action to leave the page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 z-10"
      >
        <Link href="/">
          <Button className="bg-brand-yellow text-black hover:bg-black hover:text-white dark:bg-white dark:hover:bg-brand-yellow dark:text-black font-black text-lg py-7 px-8 rounded-2xl transition-all shadow-[0_8px_30px_rgb(255,204,0,0.2)] hover:-translate-y-1">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Take Me Back to the Laughs
          </Button>
        </Link>
      </motion.div>
      
    </div>
  );
}