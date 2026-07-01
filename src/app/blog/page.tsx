import { getMdxFiles } from "@/lib/mdx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { ReportCarousel } from "@/components/reports/ReportCarousel";

export const metadata: Metadata = {
    title: "Report/Blog | Global Sales Force",
    description: "米国食品市場への進出に関するノウハウ、現場からの最新情報、成功事例をお届けします。",
};

export default function BlogPage() {
    const posts = getMdxFiles("blog");

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">
                    {/* Page Header */}
                    <div className="max-w-3xl mb-16 border-b border-border pb-12">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                            Global Sales Force
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Report/Blog</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            米国食品市場への進出に関するノウハウ、現場からの最新情報、成功事例をお届けします。
                        </p>
                    </div>

                    {/* Industry Reports Section */}
                    <ReportCarousel />

                    <div className="mb-8 mt-12">
                        <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-4">Blog Articles</h2>
                    </div>

                    {/* Post Grid */}
                    {posts.length === 0 ? (
                        <div className="text-center py-24 text-muted-foreground">
                            <p className="text-lg">記事は近日公開予定です。</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.slug}
                                    className="group flex flex-col h-full border border-border rounded-xl overflow-hidden hover:border-foreground/30 transition-all duration-300 hover:shadow-lg"
                                >
                                    {/* Thumbnail placeholder */}
                                    <div className="aspect-[16/9] w-full bg-muted relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 transition-transform duration-500 group-hover:scale-105" />
                                        {post.frontmatter.category && (
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-border/50">
                                                    <Tag className="w-3 h-3" />
                                                    {post.frontmatter.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card body */}
                                    <div className="flex flex-col flex-1 p-6">
                                        {post.frontmatter.date && (
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <time>{post.frontmatter.date}</time>
                                            </div>
                                        )}
                                        <h2 className="font-bold text-lg mb-3 leading-snug group-hover:text-foreground/70 transition-colors">
                                            {post.frontmatter.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                                            {post.frontmatter.description}
                                        </p>
                                        <div className="flex items-center text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors mt-auto">
                                            続きを読む
                                            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
