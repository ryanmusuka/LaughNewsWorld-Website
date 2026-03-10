import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // LNW Custom Brand Colors
        brand: {
          yellow: "#ffad00",
          blue: "#0093c9",
          black: "#000000", // Standard black, but good to semanticize
        }
      },
    },
  },
  plugins: [],
};
export default config;