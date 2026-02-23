import { getMdxFiles } from "@/lib/mdx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies | Global Sales Force",
    description: "Explore our successful B2B sales and channel building projects for Japanese food brands in the US market.",
};

export default function CaseStudiesPage() {
    const caseStudies = getMdxFiles("case-studies");

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">
                    <div className="max-w-3xl mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Case Studies</h1>
                        <p className="text-xl text-muted-foreground">
                            日本の食文化を米国で拡げる。私たちのプロフェッショナルチームが支援した成功事例をご紹介します。
                        </p>
                    </div>

                    {/* Filtering dummy UI */}
                    <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
                        <button className="px-4 py-2 rounded-full border border-border bg-foreground text-background text-sm font-medium">All</button>
                        <button className="px-4 py-2 rounded-full border border-border bg-background text-foreground hover:bg-muted text-sm font-medium">Grocery</button>
                        <button className="px-4 py-2 rounded-full border border-border bg-background text-foreground hover:bg-muted text-sm font-medium">Restaurant</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caseStudies.map((study) => (
                            <Link href={`/case-studies/${study.slug}`} key={study.slug} className="group block h-full">
                                <Card className="h-full bg-card overflow-hidden hover:shadow-md transition-shadow duration-300 border-border/50 group-hover:border-border">
                                    <div className="aspect-[4/3] w-full bg-muted relative overflow-hidden">
                                        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <CardHeader className="p-5 pb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-xs font-semibold text-muted-foreground flex items-center gap-2 tracking-wide uppercase">
                                                <span className="bg-muted px-2 py-1 rounded-sm">{study.frontmatter.category}</span>
                                                <span>{study.frontmatter.region}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg line-clamp-3 leading-snug group-hover:text-primary transition-colors">
                                            {study.frontmatter.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-5 pt-0">
                                        <CardDescription className="line-clamp-3 text-sm">
                                            {study.frontmatter.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
