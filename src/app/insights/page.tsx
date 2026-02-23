import { getMdxFiles } from "@/lib/mdx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights | Global Sales Force",
    description: "Articles and analyses on the US food market, sales strategies, and business development.",
};

export default function InsightsPage() {
    const insights = getMdxFiles("insights");

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">
                    <div className="max-w-3xl mb-16 border-b border-border pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Insights</h1>
                        <p className="text-xl text-muted-foreground">
                            米国食品市場のトレンド、バイヤーのリアルな視点、そして日系企業が成功するための実践的なアプローチを解説。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {insights.map((post) => (
                            <Link href={`/insights/${post.slug}`} key={post.slug} className="group flex flex-col h-full rounded-md overflow-hidden">
                                <div className="aspect-[16/10] w-full bg-muted relative overflow-hidden mb-4 rounded-md">
                                    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-3">
                                        <time>{post.frontmatter.date}</time>
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                        <span className="uppercase tracking-wider font-semibold text-foreground/80">{post.frontmatter.category}</span>
                                    </div>
                                    <h3 className="font-bold text-xl mb-3 leading-snug group-hover:text-primary transition-colors">
                                        {post.frontmatter.title}
                                    </h3>
                                    <p className="text-muted-foreground line-clamp-2 mb-4 text-sm mix-blend-opacity-80">
                                        {post.frontmatter.description}
                                    </p>
                                    {post.frontmatter.author && (
                                        <div className="mt-auto flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-muted mr-3 flex items-center justify-center text-[10px] font-bold">G</div>
                                            <span className="text-xs font-semibold tracking-wide text-foreground/80">{post.frontmatter.author}</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
