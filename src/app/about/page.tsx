import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Global Sales Force",
    description: "Learn about our mission, values, and why we are the best partner for your US expansion.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">
                    <div className="max-w-3xl mb-16 border-b border-border pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Us</h1>
                        <p className="text-xl text-muted-foreground">
                            私たちは、日本の素晴らしい食文化や商品をアメリカ全土へ届けるための「実践的パートナー」です。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                日本のメーカーが持つ「品質へのこだわり」と、アメリカ市場が求める「価値」を的確に繋ぎ、持続可能なビジネスを構築すること。<br /><br />
                                単なるコンサルティングにとどまらず、現場に立ち、汗をかきながら商談をまとめる営業部隊として、貴社の売上拡大にコミットします。
                            </p>
                        </div>
                        <div className="aspect-video w-full bg-muted rounded-md relative overflow-hidden">
                            {/* Placeholder for an office or team photo */}
                            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium">Team Photo Placeholder</div>
                        </div>
                    </div>

                    <div className="mb-24">
                        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Why Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "徹底した現場主義",
                                    desc: "データだけでは見えない店頭のリアルな状況や、バイヤーの生の声をもとに、泥臭く改善を繰り返します。"
                                },
                                {
                                    title: "スピード感ある実行力",
                                    desc: "複雑な意思決定プロセスを排除し、テストマーケティングから本格導入まで、最短ルートで成果を追求します。"
                                },
                                {
                                    title: "日米両言語でのシームレスな連携",
                                    desc: "商談は英語で、貴社へのご報告は日本語で。言葉や文化の壁を感じさせない透明性の高いコミュニケーションを実現。"
                                }
                            ].map((item, idx) => (
                                <Card key={idx} className="bg-muted/50 border-none shadow-none">
                                    <CardHeader>
                                        <CheckCircle2 className="w-8 h-8 text-foreground/80 mb-4" />
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight mb-8">Company Profile</h2>
                        <div className="border border-border rounded-md divide-y divide-border">
                            <div className="flex flex-col md:flex-row p-6">
                                <div className="md:w-1/3 font-semibold text-muted-foreground mb-2 md:mb-0">会社名</div>
                                <div className="md:w-2/3">Global Sales Force, Inc.</div>
                            </div>
                            <div className="flex flex-col md:flex-row p-6">
                                <div className="md:w-1/3 font-semibold text-muted-foreground mb-2 md:mb-0">所在地</div>
                                <div className="md:w-2/3">
                                    (HQ) New York, NY<br />
                                    (Branch) Los Angeles, CA<br />
                                    ※デモ用のプレースホルダです
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row p-6">
                                <div className="md:w-1/3 font-semibold text-muted-foreground mb-2 md:mb-0">事業内容</div>
                                <div className="md:w-2/3">
                                    ・米国における食品メーカーの営業代行<br />
                                    ・販路開拓およびディストリビューション支援<br />
                                    ・マーケティング戦略立案・実行
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
