import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose, // <--- Add this right here!
} from "@/components/ui/sheet";

export default function Navbar() {
  const routes = [
    { name: "About", href: "/about" },
    { name: "The LNW Chronicle", href: "/blog" },
    { name: "Watch LNW", href: "/watch" },
    { name: "Submit a Meme", href: "/submit" },
    
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
            Subscribe
          </Button>
        </nav>

        {/* Mobile Navigation (Hidden on Desktop) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-8 w-8 text-foreground" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-[4px] border-black dark:border-white bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-8 mt-12">
                {routes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    <Link
                      href={route.href}
                      className="text-2xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors"
                    >
                      {route.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-bold text-lg py-6 rounded-none mt-4">
                    Donate
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}