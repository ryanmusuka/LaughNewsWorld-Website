/* eslint-disable prefer-const */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const backgroundImages = [
  "/assets/images/IMG_1405.webp",
  "/assets/images/IMG_1683.webp",
  "/assets/images/IMG_21242.webp",
  "/assets/images/IMG_31162.webp",
  "/assets/images/IMG_3343.webp",
  "/assets/images/IMG_3583.webp",
  "/assets/images/IMG_3956.webp",
  "/assets/images/IMG_4338.webp",
  "/assets/images/IMG_6959.webp",
  "/assets/images/IMG_7611.webp",
  "/assets/images/IMG_7807.webp",
  "/assets/images/IMG_7831.webp",
  "/assets/images/IMG_8063.webp",
  "/assets/images/IMG_8099.webp",
  "/assets/images/IMG_8533.webp",
  "/assets/images/IMG_8544.webp",
  "/assets/images/IMG_91332.webp",
  "/assets/images/IMG_9139.webp"
];

const rotatingWords = ["God.", "Humour.", "Revelation."];

export default function HeroMission() {
  const [currentImage, setCurrentImage] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Random Image Slideshow Logic
  useEffect(() => {
    // Pick a random image instantly on mount
    setCurrentImage(Math.floor(Math.random() * backgroundImages.length));

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => {
        let nextIndex = Math.floor(Math.random() * backgroundImages.length);
        // Ensure it doesn't show the exact same image twice in a row
        while (nextIndex === prev) {
          nextIndex = Math.floor(Math.random() * backgroundImages.length);
        }
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(imageInterval);
  }, []);

  // Typewriter Effect Logic
  useEffect(() => {
    const currentFullWord = rotatingWords[wordIndex];
    let typingSpeed = isDeleting ? 75 : 150; 

    if (!isDeleting && text === currentFullWord) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentFullWord.substring(0, prev.length - 1)
          : currentFullWord.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[75vh] py-16 px-6 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center border-b-[8px] border-black dark:border-white overflow-hidden">
      
      {/* 1. DOM Stacked Background Images for Zero Latency */}
      {backgroundImages.map((src, index) => {
        const isActive = index === currentImage;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 -z-10"
            }`}
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={src}
              alt={`Hero Background ${index + 1}`}
              fill
              className="object-cover object-top"
              priority={index === 0} 
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* 2. Brand Yellow Overlay (Foolproof inline style) */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: "rgba(255, 173, 0, 0.8)" }} 
      />

      {/* 3. The Content Layer */}
      <div className="relative z-20 max-w-4xl space-y-6 flex flex-col items-center">
        
        <p className="text-sm md:text-base font-bold tracking-widest uppercase text-black/80 drop-shadow-sm">
          LaughNewsWorld
        </p>
        
        {/* Typewriter Word Container (Unclipped & Full Size) */}
        <div className="h-[80px] md:h-[120px] flex items-center justify-center w-full overflow-visible whitespace-nowrap">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-[0.9] drop-shadow-lg flex items-center">
            {text}
            {/* Blinking Cursor */}
            <span className="animate-[pulse_0.8s_ease-in-out_infinite] ml-1 text-black">
              |
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-2xl font-bold text-black max-w-[600px] mx-auto pt-4 drop-shadow-md">
          Networking the world with Godly laughter through Prophet Uebert Angel ❤️🌍
        </p>

        <div className="pt-8">
          <Button
            asChild 
            size="lg"
            className="bg-brand-blue text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black text-xl px-10 py-8 rounded-none border-4 border-transparent hover:border-black dark:hover:border-white transition-all hover:scale-105 shadow-2xl"
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