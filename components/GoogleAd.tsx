"use client";

import { useEffect, useRef } from "react";

interface GoogleAdProps {
  adClient: string; 
  adSlot: string;   
  layout?: "horizontal" | "vertical"; 
  className?: string;
}

export default function GoogleAd({ adClient, adSlot, layout = "horizontal", className = "" }: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.hasAttribute("data-ad-status")) {
      try {
        // @ts-expect-error - adsbygoogle is dynamically injected by the Next/Script on the page
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        // This fails gracefully if the user has an AdBlocker enabled, preventing app crashes.
        console.error("AdSense injection bypassed (likely due to an AdBlocker):", error);
      }
    }
  }, []);

  const layoutClasses = {
    horizontal: "min-h-[100px] w-full md:min-h-[250px]", 
    vertical: "min-h-[600px] w-full md:w-[300px]",       
  };

  return (
    <div className={`flex justify-center items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none overflow-hidden ${layoutClasses[layout]} ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}