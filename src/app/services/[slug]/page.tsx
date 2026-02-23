import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Dummy detail pages for all slugs
export function generateStaticParams() {
    return [
        { slug: "go-to-market" },
        { slug: "sales-agency" },
        { slug: "channel-strategy" },
        { slug: "promotion" },
    ];
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom">
                    <Link href="/services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Services
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 capitalize leading-tight">
                            {slug.replace("-", " ")}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-16">
                            これは「{slug}」のサービス詳細ページのデモです。実際には各サービスごとの具体的な提供内容、プロセス、料金、対応ケースなどを詳細に記載するエリアになります。
                        </p>

                        <div className="aspect-[21/9] w-full bg-muted mb-16 rounded-md"></div>

                        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none mb-16">
                            <h2>サービスの特徴</h2>
                            <p>
                                当社のチームは、市場の最前線で得た知見をもとに実践的なサポートを行います。
                                単なるアドバイスで終わらせず、貴社と伴走して実際に手を動かし、ターゲット層に確実に商品が届き、売れる仕組みを構築します。
                            </p>
                            <h3>提供内容</h3>
                            <ul>
                                <li>市場動向のリサーチと競合分析</li>
                                <li>ターゲットバイヤーへのアプローチリスト作成と実行</li>
                                <li>週次・月次のKPIに基づくレポーティングと改善提案</li>
                            </ul>
                        </div>

                        <div className="bg-muted p-10 rounded-md text-center">
                            <h3 className="text-2xl font-bold tracking-tight mb-4">このサービスに関するご相談</h3>
                            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                                より詳細なプロセスや、貴社商品での適応可能性を知りたい方は、無料相談をご活用ください。
                            </p>
                            <Button asChild size="lg" className="px-8 text-base">
                                <Link href="/contact">プロジェクトについて相談する</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
