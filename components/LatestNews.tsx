import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock Data: This represents what we will eventually fetch from Supabase
const MOCK_NEWS = [
  {
    id: 1,
    title: "UN Approves Puns for Diplomacy",
    excerpt: "In a shocking turn of events, world leaders agree that a good Dad joke can de-escalate global tensions.",
    imageUrl: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=800&auto=format&fit=crop",
    date: "3 hours ago",
    category: "Global"
  },
  {
    id: 2,
    title: "New Study: Laughing Increases Lifespan",
    excerpt: "Scientists confirm what Proverbs 17:22 told us thousands of years ago: a joyful heart is good medicine.",
    imageUrl: "https://images.unsplash.com/photo-1545696563-af8f6ec35b64?q=80&w=800&auto=format&fit=crop",
    date: "5 hours ago",
    category: "Science"
  },
  {
    id: 3,
    title: "Meme of the Week: Church Tech Team",
    excerpt: "When the pastor says 'let's go to that one scripture' and you didn't have it prepared.",
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop",
    date: "1 day ago",
    category: "Church Culture"
  }
];

export default function LatestNews() {
  return (
    <section className="w-full py-16 px-6 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-black dark:border-white pb-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter"><span className="text-brand-blue">Recent</span> Articles</h2>
            <p className="text-muted-foreground font-medium mt-2">Literary pieces from the LNW Team.</p>
          </div>
          <Button className="hidden md:flex mt-4 md:mt-0 bg-brand-yellow text-white hover:bg-black/80 dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            <Link href="/watch">
               View All Articles
            </Link>
          </Button>
        </div>

        {/* The CSS Grid - Mobile First Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_NEWS.map((article) => (
            <Card key={article.id} className="rounded-none border-2 border-border overflow-hidden group hover:border-primary transition-colors">
              <div className="relative h-60 w-full overflow-hidden bg-muted">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="text-brand-blue">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <CardTitle className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full rounded-none border-2 font-bold hover:bg-primary hover:text-primary-foreground">
                  Read Article
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Mobile-only "View All" Button */}
        <div className="px-6 md:hidden">
          <Button className="w-full bg-brand-blue text-white hover:bg-black/80 dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            View More Articles
          </Button>
        </div>

      </div>
    </section>
  );
}