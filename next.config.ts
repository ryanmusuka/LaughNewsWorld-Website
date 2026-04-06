import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Injecting env vars directly to force Next.js to read them
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bugesrcjogdxjkftdzuf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', 
      }
    ],
  },
};

export default nextConfig;