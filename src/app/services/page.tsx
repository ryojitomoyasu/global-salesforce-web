import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ArrowRight, Globe2, Briefcase, BarChart3, Store } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Global Sales Force",
    description: "US market expansion, sales agency, channel strategy, and promotional support for food manufacturers.",
};

const services = [
    {
        slug: "go-to-market",
        title: "US市場参入支援 (Go-to-market)",
        description: "テストマーケティングから本格展開に向けたKPl設計、週次・月次の運用改善まで行い、成功確率を高める戦略を立案・実行します。",
        icon: Globe2
    },
    {
        slug: "sales-agency",
        title: "営業代行・アカウント開拓",
        description: "日米両言語に対応したプロの営業部隊が、貴社に代わって最前線で商談を実施。新規バイヤーの開拓と既存アカウントの深耕を行います。",
        icon: Briefcase
    },
    {
        slug: "channel-strategy",
        title: "卸/小売/外食チャネル戦略",
        description: "現地の卸売業者・小売チェーン・飲食店との強力なネットワークを活用し、商品性質に最適な販売プラットフォームを構築。",
        icon: BarChart3
    },
    {
        slug: "promotion",
        title: "店頭施策・販促",
        description: "ターゲット層に響く現場起点の試食プロモーション、POPの展開やエンドキャップの獲得を通じて、消費者へのトライアルを促進。",
        icon: Store
    }
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">
                    <div className="max-w-3xl mb-16 border-b border-border pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Services</h1>
                        <p className="text-xl text-muted-foreground">
                            米国市場で売上を伸ばすためのエンドツーエンドのソリューションを提供します。
                            現場主義にこだわり、確実な結果へと導きます。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((svc) => (
                            <Link href={`/services/${svc.slug}`} key={svc.slug} className="group block">
                                <Card className="h-full bg-card hover:border-foreground/30 transition-colors border-border/50">
                                    <CardHeader className="pb-4">
                                        <svc.icon className="w-12 h-12 mb-6 text-foreground/80 group-hover:text-primary transition-colors" />
                                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">{svc.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base leading-relaxed mb-8">
                                            {svc.description}
                                        </CardDescription>
                                        <div className="inline-flex items-center text-sm font-semibold tracking-wide uppercase group-hover:text-primary hover:underline">
                                            詳細を見る <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
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
