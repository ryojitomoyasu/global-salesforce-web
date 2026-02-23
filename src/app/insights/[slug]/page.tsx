import { getMdxFileBySlug, getMdxFiles } from "@/lib/mdx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const posts = getMdxFiles("insights");
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getMdxFileBySlug("insights", slug);

    if (!post) {
        return <div>Not Found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom">
                    <Link href="/insights" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Insights
                    </Link>

                    <article className="max-w-3xl mx-auto">
                        <header className="mb-14">
                            <div className="flex items-center gap-4 text-sm font-medium uppercase text-muted-foreground mb-6">
                                <time>{post.frontmatter.date}</time>
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground/20"></span>
                                <span className="text-foreground tracking-wider">{post.frontmatter.category}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.15]">
                                {post.frontmatter.title}
                            </h1>

                            {post.frontmatter.author && (
                                <div className="flex items-center pt-6 border-t border-border">
                                    <div className="w-12 h-12 rounded-full bg-muted mr-4 flex items-center justify-center text-sm font-bold">G</div>
                                    <div>
                                        <div className="font-semibold">{post.frontmatter.author}</div>
                                        <div className="text-xs text-muted-foreground">Global Sales Force, Inc.</div>
                                    </div>
                                </div>
                            )}
                        </header>

                        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
                            <MDXRemote source={post.content} />
                        </div>

                        <div className="mt-16 pt-8 border-t border-border">
                            <h3 className="text-2xl font-bold tracking-tight mb-6">関連記事</h3>
                            <p className="text-muted-foreground">記事一覧に戻って、他のInsightを読むこともできます。</p>
                            <Link href="/insights" className="inline-flex mt-4 items-center font-medium hover:underline">
                                Insight一覧へ <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
