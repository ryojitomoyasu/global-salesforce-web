import { getMdxFileBySlug, getMdxFiles } from "@/lib/mdx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = getMdxFiles("blog");
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getMdxFileBySlug("blog", slug);

    if (!post) notFound();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom">
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        ブログ一覧へ戻る
                    </Link>

                    <article className="max-w-3xl mx-auto">
                        {/* Article header */}
                        <header className="mb-14">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {post.frontmatter.category && (
                                    <span className="inline-flex items-center gap-1.5 bg-muted text-foreground/80 text-xs font-semibold px-3 py-1.5 rounded-full">
                                        <Tag className="w-3 h-3" />
                                        {post.frontmatter.category}
                                    </span>
                                )}
                                {post.frontmatter.date && (
                                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <time>{post.frontmatter.date}</time>
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.2]">
                                {post.frontmatter.title}
                            </h1>

                            {post.frontmatter.description && (
                                <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-border pl-5 mb-8">
                                    {post.frontmatter.description}
                                </p>
                            )}

                            {post.frontmatter.author && (
                                <div className="flex items-center pt-6 border-t border-border">
                                    <div className="w-10 h-10 rounded-full bg-muted mr-4 flex items-center justify-center text-sm font-bold">
                                        G
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{post.frontmatter.author}</div>
                                        <div className="text-xs text-muted-foreground">Global Sales Force, Inc.</div>
                                    </div>
                                </div>
                            )}
                        </header>

                        {/* Article body */}
                        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-p:leading-relaxed prose-p:text-foreground/80
                            prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
                            prose-strong:text-foreground
                            prose-blockquote:border-border prose-blockquote:text-muted-foreground">
                            <MDXRemote source={post.content} />
                        </div>

                        {/* Footer nav */}
                        <div className="mt-20 pt-10 border-t border-border">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 font-semibold hover:underline underline-offset-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                ブログ一覧へ戻る
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
