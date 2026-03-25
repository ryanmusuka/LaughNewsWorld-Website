import Link from "next/link";
import { Menu } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose, 
} from "@/components/ui/sheet";

export default function Navbar() {
  const routes = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "The LNW Chronicle", href: "/blog" },
    { name: "Watch LNW", href: "/watch" },
    { name: "Advertise", href: "/advertise" },
    { name: "Shop", href: "/shop" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-[4px] border-black dark:border-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-black text-3xl tracking-tighter uppercase text-primary">
            LNW<span className="text-foreground">.</span>
          </span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-bold uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
            >
              {route.name}
            </Link>
          ))}
          <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-bold rounded-none border-2 border-transparent transition-all">
            <Link href = "/donate">
                Donate
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation (Hidden on Desktop) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent group">
                <Menu className="h-8 w-8 text-foreground transition-transform group-hover:scale-110 group-active:scale-95" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] border-l-4 border-brand-yellow dark:border-brand-blue bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              {/* Spinning Background Gimmick */}
              <div className="absolute -bottom-16 -right-16 text-brand-yellow/10 dark:text-brand-blue/10 pointer-events-none">
                <Sparkles className="w-80 h-80 animate-[spin_12s_linear_infinite]" />
              </div>

              {/* Added pl-8 to push everything away from the left border, halved spacing to space-y-4 */}
              <nav className="flex flex-col space-y-4 mt-20 relative z-10 pl-8">
                {routes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    {/* Halved font size to text-2xl */}
                    <Link
                      href={route.href}
                      className="group relative flex items-center w-full text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white transition-all"
                    >
                      {/* Scaled down the hover line and slide distance to match the smaller text */}
                      <span className="absolute -left-4 w-0 h-1.5 bg-brand-yellow dark:bg-brand-blue transition-all duration-300 ease-out group-hover:w-4 rounded-full" />
                      
                      <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:text-brand-blue dark:group-hover:text-brand-yellow">
                        {route.name}
                      </span>
                    </Link>
                  </SheetClose>
                ))}
                
                {/* The Revamped, Contained Donate Button */}
                <div className="pt-4 flex"> {/* Changed to flex so the button doesn't stretch */}
                  <SheetClose asChild>
                    <Link href="/donate">
                      {/* Removed w-full, added px-10 to make it a nice pill shape */}
                      <Button className="bg-brand-blue text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-black text-xl py-6 px-10 rounded-3xl transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
                        Donate
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}