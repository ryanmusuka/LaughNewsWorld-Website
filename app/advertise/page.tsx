/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { TrendingUp, Users, PlayCircle, ShieldCheck, CheckCircle2, UploadCloud, File as FileIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from '@supabase/ssr';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function AdvertisePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Form State Management mapped to your new DB columns (conceptually)
  const [formData, setFormData] = useState({
    contact_name: "",
    business_name: "",
    email: "",
    website_url: "",
    ad_types: [] as string[],
    caption: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  // Handle Text Inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Checkbox Toggles
  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      ad_types: checked 
        ? [...prev.ad_types, value] 
        : prev.ad_types.filter(p => p !== value)
    }));
  };

 // Handle form submission to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.contact_name || !formData.email || formData.ad_types.length === 0) {
      setSubmitStatus({ type: 'error', message: 'Please fill in your name, email, and select at least one package.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: 'idle', message: '' });

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      let mediaUrl = null;

      // 1. Upload File to Storage (If one was selected)
      if (selectedFile) {
        console.log("Attempting to upload file...", selectedFile.name);
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `ad-creatives/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('advertisements') 
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedFile.type // <-- This prevents the 400 Bad Request error
          });

        if (uploadError) {
          console.error("Storage Upload Error:", uploadError);
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('advertisements')
          .getPublicUrl(filePath);
          
        mediaUrl = publicUrl;
        console.log("File uploaded successfully. URL:", mediaUrl);
      }

      // 2. Save Data to Database
      console.log("Attempting to insert into database...");
      const { error: dbError } = await supabase
        .from('advertisement_requests')
        .insert([{
          contact_name: formData.contact_name,
          business_name: formData.business_name,
          email: formData.email,
          website_url: formData.website_url,
          ad_types: formData.ad_types,
          caption: formData.caption,
          media_url: mediaUrl
        }]);

      if (dbError) {
        console.error("Database Insert Error:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log("Database insert successful!");

      // 3. Success State & Reset
      setSubmitStatus({ type: 'success', message: 'Request submitted successfully! We will be in touch soon.' });
      setFormData({ contact_name: "", business_name: "", email: "", website_url: "", ad_types: [], caption: "" });
      setSelectedFile(null);
      setUploadProgress(0);

    } catch (error: any) {
      console.error("Caught Error:", error);
      setSubmitStatus({ type: 'error', message: error.message || 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload progress simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.size > 50 * 1024 * 1024) {
        setSubmitStatus({ type: 'error', message: 'File is too large. Maximum size is 50MB.' });
        return;
      }

      setSelectedFile(file);
      setUploadProgress(0);
      setSubmitStatus({ type: 'idle', message: '' });

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 15;
        });
      }, 150);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    if (bytes < k * k) return (bytes / k).toFixed(1) + " KB";
    return (bytes / (k * k)).toFixed(2) + " MB";
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-black dark:text-white pt-16 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* HERO HOOK */}
        <motion.section 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-block bg-brand-yellow/20 border border-brand-yellow text-brand-yellow font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-4">
            Partner With Us
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">
            Reach a Highly Engaged, <span className="text-brand-blue">Faith-Driven</span> Audience.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl mx-auto">
            Don&apos;t waste money on untargeted ads. Put your brand directly in front of thousands of dedicated GoodNewsWorld citizens across YouTube, Instagram, and TikTok.
          </motion.p>
        </motion.section>

        {/* BY THE NUMBERS */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: TrendingUp, title: "Total Monthly Reach", stat: "700K+", desc: "Across all platforms" },
            { icon: PlayCircle, title: "YouTube Views", stat: "5.3M+", desc: "Highly engaged viewers (in 1 year so far!)" },
            { icon: Users, title: "Social Following", stat: "90K+", desc: "Combined active followers" },
            { icon: ShieldCheck, title: "Audience Trust", stat: "High", desc: "Niche GNW demographic" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl text-center hover:border-brand-yellow transition-colors">
              <item.icon className="w-10 h-10 mx-auto mb-4 text-brand-blue" />
              <h3 className="text-5xl font-black mb-2">{item.stat}</h3>
              <p className="font-bold text-lg">{item.title}</p>
              <p className="text-zinc-500 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* AD PACKAGES */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-12">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Investment</h2>
            <p className="text-zinc-500 font-medium">Select a tier that fits your marketing goals.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Category 1 */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col">
              <h3 className="text-2xl font-black uppercase text-brand-blue mb-2">The Social Feed</h3>
              <p className="text-zinc-500 text-sm mb-6 pb-6 border-b border-brand-blue dark:border-brand-blue">Standard reach across our main Instagram & Facebook timelines.</p>
              <ul className="space-y-6 mb-8 flex-grow font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£15</strong> &mdash; Single Story Ad</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">A promotional post on our Instagram/Facebook Stories visible to our highly active audience for 24 hours.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£20</strong> &mdash; Static Feed Post</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">A permanent, dedicated photo post on our timeline featuring your custom promotional caption and tags.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£25</strong> &mdash; Dedicated Video Post</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">A permanent, standalone video ad posted directly to our timeline with your custom caption.</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Category 2 */}
            <motion.div variants={fadeUp} className="bg-zinc-900 dark:bg-black border-4 border-brand-yellow rounded-3xl p-8 flex flex-col relative transform lg:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-black font-black uppercase tracking-widest px-4 py-1 rounded-full text-xs">
                Highest Engagement
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-2">Reels Integration</h3>
              <p className="text-zinc-400 text-sm mb-6 pb-6 border-b border-brand-yellow">Viral potential integrated into our IG, TikTok & YT Shorts.</p>
              <ul className="space-y-6 mb-8 flex-grow font-medium text-zinc-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£30</strong> &mdash; Post-Roll Ad</span>
                    <span className="text-sm text-zinc-400 mt-1 leading-snug">Your short promotional video seamlessly stitched to the very end of one of our viral reels.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£35</strong> &mdash; The Watermark</span>
                    <span className="text-sm text-zinc-400 mt-1 leading-snug">Your brand&apos;s logo watermarked on the screen for the entire duration of our reel, plus a dedicated mention in the caption.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£45</strong> &mdash; The Ultimate Reel</span>
                    <span className="text-sm text-zinc-400 mt-1 leading-snug">The full takeover. Your logo watermarked throughout the video, your ad attached at the end, AND a caption shoutout.</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Category 3 */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-zinc-900 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 flex flex-col">
              <h3 className="text-2xl font-black uppercase text-[#FF0000] mb-2">YouTube Powerhouse</h3>
              <p className="text-zinc-500 text-sm mb-6 pb-6 border-b border-red-200 dark:border-red-800">Deep, focused impact within our long-form content.</p>
              <ul className="space-y-6 mb-8 flex-grow font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5"/> 
                  <div className="flex flex-col">
                    <span><strong>£50</strong> &mdash; Video Integration</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">A dedicated ad spot played seamlessly within one of our highly-watched, long-form YouTube videos, plus a permanent link in the description box.</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-zinc-200 dark:bg-zinc-900 rounded-3xl p-4 md:p-4">
          <motion.h2 variants={fadeUp} className="text-3xl font-black uppercase tracking-tighter text-center mb-12">How It Works</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Choose Your Package", desc: "Select the ad type and platform that best fits your marketing goals." },
              { step: "2", title: "Submit Your Creative", desc: "Send us your video, logo, or image along with your desired caption for review." },
              { step: "3", title: "Publish & Promote", desc: "Upon approval and payment, our team seamlessly integrates and pushes your ad to the timeline." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                <div className="text-6xl font-black text-black/5 dark:text-white/10 absolute -top-6 -left-4 z-0">{item.step}</div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">{item.desc}</p>
                  <br /><br />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* BOOKING FORM & FINE PRINT */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto space-y-8">
          
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Submit Your Ad Request</h2>
            <p className="text-zinc-500 font-medium">Fill out the form below to initiate the review process.</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} variants={fadeUp} className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 p-6 md:p-10 rounded-3xl space-y-6">
            
            {/* Disclaimer Box */}
            <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 rounded-r-lg">
              <p className="text-sm font-medium dark:text-zinc-300">
                <strong className="text-brand-blue dark:text-brand-blue uppercase">Crucial Notice:</strong> Submitting this form does not charge you. It sends your ad to our team for a Code of Conduct review. Upon approval, we will email you a secure Stripe payment link to finalize your booking.
              </p>
            </div>

            {/* Dynamic Status Messages */}
            {submitStatus.type === 'success' && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded text-sm font-bold">
                {submitStatus.message}
              </div>
            )}
            {submitStatus.type === 'error' && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm font-bold">
                {submitStatus.message}
              </div>
            )}

            {/* Row 1: Name & Business */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Your Name *</label>
                <input 
                  type="text" 
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Business Name</label>
                <input 
                  type="text" 
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors" 
                  placeholder="Acme Corp" 
                />
              </div>
            </div>

            {/* Row 2: Email & Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Website / Social Link</label>
                <input 
                  type="text" 
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors" 
                  placeholder="https://yourwebsite.com" 
                />
              </div>
            </div>

            {/* Row 3: Full-Width Selectable Package Cards */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Desired Packages (Select As Many As Desired) *</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                
                {/* Social Feed Options */}
                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
                  <input type="checkbox" value="story" checked={formData.ad_types.includes('story')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£15 - Single Story Ad</span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Social Feed</span>
                  </div>
                </label>

                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
                  <input type="checkbox" value="feed-photo" checked={formData.ad_types.includes('feed-photo')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£20 - Photo Ad + Desc</span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Social Feed</span>
                  </div>
                </label>

                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
                  <input type="checkbox" value="feed-video" checked={formData.ad_types.includes('feed-video')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£25 - Single Video Ad</span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Social Feed</span>
                  </div>
                </label>

                {/* Reels Options */}
                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
                  <input type="checkbox" value="reel-post" checked={formData.ad_types.includes('reel-post')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£30 - Post-Roll Ad</span>
                    <span className="text-xs text-brand-blue dark:text-brand-yellow uppercase tracking-wider mt-1">Reels</span>
                  </div>
                </label>

                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
                  <input type="checkbox" value="reel-watermark" checked={formData.ad_types.includes('reel-watermark')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£35 - Watermark + Desc</span>
                    <span className="text-xs text-brand-blue dark:text-brand-yellow uppercase tracking-wider mt-1">Reels</span>
                  </div>
                </label>

                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5">
                  <input type="checkbox" value="reel-ultimate" checked={formData.ad_types.includes('reel-ultimate')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£45 - Ultimate Reel</span>
                    <span className="text-xs text-brand-blue dark:text-brand-yellow uppercase tracking-wider mt-1">Reels</span>
                  </div>
                </label>

                {/* YouTube Option */}
                <label className="relative flex items-start gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4 cursor-pointer hover:border-brand-yellow transition-all has-[:checked]:border-brand-yellow has-[:checked]:bg-brand-yellow/5 sm:col-span-2 md:col-span-3 lg:col-span-1">
                  <input type="checkbox" value="yt-midroll" checked={formData.ad_types.includes('yt-midroll')} onChange={handlePackageChange} className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-[#FF0000] focus:ring-[#FF0000] dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">£50 - Video Integration</span>
                    <span className="text-xs text-[#FF0000] uppercase tracking-wider mt-1">YouTube</span>
                  </div>
                </label>

              </div>
            </div>

            {/* Row 4: Desired Caption */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Desired Caption / Ad Copy</label>
              <textarea 
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
                className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors min-h-[120px] resize-y" 
                placeholder="Enter the exact text, tags, and hashtags you want included with your ad..."
              />
            </div>

           {/* Row 5: Upload File */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Upload Creative (Logo/Video/Image)</label>
              
              {!selectedFile ? (
                <label className="block border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, video/mp4" 
                    onChange={handleFileChange}
                  />
                  <UploadCloud className="w-10 h-10 mx-auto mb-2 text-zinc-400 group-hover:text-brand-blue transition-colors" />
                  <p className="text-sm font-medium text-zinc-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-zinc-400 mt-1">MP4, PNG, JPG up to 50MB</p>
                </label>
              ) : (
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-blue/10 p-3 rounded-lg text-brand-blue">
                      <FileIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {selectedFile.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-zinc-500">
                          {formatFileSize(selectedFile.size)}
                        </span>
                        <span className="text-xs font-bold text-brand-blue">
                          {uploadProgress < 100 ? "Loading preview..." : "Ready to submit"}
                        </span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setSelectedFile(null)}
                      disabled={isSubmitting}
                      className="p-2 text-zinc-400 hover:text-[#FF0000] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
                    <div 
                      className="h-full bg-brand-blue transition-all duration-300 ease-out" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-yellow text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black text-lg py-6 rounded-xl transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                "Submit Request for Review"
              )}
            </Button>

            {/* Fine Print */}
            <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 text-center space-y-2">
              <p>
                Because this platform serves a specific faith-based community, we reserve the right to reject ads that do not align with Christian values, modesty, or the ethos of the GoodNewsWorld.
              </p>
              <p>
                <strong>Disclaimer:</strong> LaughNewsWorld is an independent entity and is not directly affiliated with the ministry, The GoodNewsChurch.
              </p>
            </div>

          </motion.form>
        </motion.section>

      </div>
    </main>
  );
}