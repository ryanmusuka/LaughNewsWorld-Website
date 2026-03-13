import Link from "next/link";

export default function Footer() {
  // Dynamically grab the current year so you never have to manually update the copyright
  const currentYear = new Date().getFullYear();

  // Centralized routing matching the Navbar
  const routes = [
    { name: "About", href: "/about" },
    { name: "The LNW Chronicle", href: "/blog" },
    { name: "Watch LNW", href: "/watch" },
    { name: "Advertise Your Business", href: "/advertise" },
    { name: "Donate", href: "/donate" },
  ];

  return (
    <footer className="w-full bg-black text-white py-12 px-6 border-t-[8px] border-brand-yellow">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Column 1: Brand & Mission */}
        <div className="space-y-4 max-w-sm">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-black text-4xl tracking-tighter uppercase text-brand-yellow">
              LNW<span className="text-white">.</span>
            </span>
          </Link>
          <p className="text-zinc-400 font-medium">
            Networking the world with Godly laughter through Prophet Uebert Angel ❤️🌍
            </p>
        </div>

        {/* Column 2: Vertical Navigation Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-lg uppercase tracking-widest text-zinc-500 mb-2">Explore</h4>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit"
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-lg uppercase tracking-widest text-zinc-500 mb-2">Connect</h4>
          <Link href="#" className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit">YouTube</Link>
          <Link href="#" className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit">Whatsapp Social Group</Link>
          <Link href="#" className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit">Instagram</Link>
          <Link href="#" className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit">TikTok</Link>
          <Link href="#" className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit">Facebook</Link>
          <Link href="#" className="text-white hover:text-brand-yellow font-bold uppercase tracking-wider transition-colors w-fit">Whatsapp Channel</Link>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl mt-12 pt-8 border-t-2 border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-medium">
        <p>&copy; {currentYear} LaughNewsWorld. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}