import { getMdxFileBySlug, getMdxFiles } from "@/lib/mdx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const posts = getMdxFiles("case-studies");
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getMdxFileBySlug("case-studies", slug);

    if (!post) {
        return <div>Not Found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom">
                    <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Case Studies
                    </Link>

                    <article className="max-w-3xl mx-auto">
                        <header className="mb-12">
                            <div className="flex items-center gap-3 text-sm font-medium tracking-wide uppercase text-muted-foreground mb-6">
                                <span className="bg-muted px-3 py-1 rounded-sm">{post.frontmatter.category}</span>
                                <span>{post.frontmatter.region}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                                {post.frontmatter.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {post.frontmatter.description}
                            </p>
                        </header>

                        <div className="aspect-[21/9] w-full bg-muted mb-12 rounded-md overflow-hidden" />

                        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                            <MDXRemote source={post.content} />
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
