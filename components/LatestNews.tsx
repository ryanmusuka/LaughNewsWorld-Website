// app/components/LatestNews.tsx (or wherever this lives)
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server"; // <-- Import our DB Client

export default async function LatestNews() {
  // 1. Initialize Supabase
  const supabase = await createClient();

  // 2. Fetch the 3 most recent published articles
  const { data: articles, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching articles:", error);
    // You could render a fallback UI here if the database fails
  }

  // Fallback to empty array if no data
  const feed = articles || [];

  return (
    <section className="w-full py-16 px-6 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-black dark:border-white pb-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter"><span className="text-brand-blue">Recent</span> Articles</h2>
            <p className="text-muted-foreground font-medium mt-2">Literary pieces from the LNW Team.</p>
          </div>
          <Button asChild className="hidden md:flex mt-4 md:mt-0 bg-brand-yellow text-white hover:bg-black/80 dark:text-black dark:hover:bg-white/80 font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent transition-all hover:scale-105">
            <Link href="/news">
               View All Articles
            </Link>
          </Button>
        </div>

        {/* The CSS Grid - dynamic data mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feed.map((article) => (
            // IMPORTANT: We wrap the entire Card in a Link pointing to the SLUG
            <Link href={`/news/${article.slug}`} key={article.id} className="block group">
              <Card className="rounded-none border-2 border-border overflow-hidden h-full hover:border-primary transition-colors cursor-pointer">
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image 
                    src={article.hero_image_url || "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=800&auto=format&fit=crop"} 
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="text-brand-blue">News</span>
                    {/* Format the date nicely */}
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  <CardTitle className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {/* If you add an 'excerpt' column later, use it here. For now, slice the content. */}
                    {article.content.substring(0, 120)}...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-none border-2 font-bold group-hover:bg-primary group-hover:text-primary-foreground">
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}