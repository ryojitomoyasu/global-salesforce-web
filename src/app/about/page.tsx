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
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">企業理念・ミッションステートメント</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            「日本の食品をアメリカに紹介し文化を作っていく。」
                        </h1>
                    </div>

                    <div className="max-w-3xl mb-24">
                        <div className="text-lg text-muted-foreground leading-loose space-y-6">
                            <p>
                                Sushi、Ramen、Izakayaなどが次々に英語になっております。これは勝手に広がったのではなく、広げた日本人がいるのです。一度しかない人生、我々が次の日本食を英語に変えていく立役者になりたいと思っております。
                            </p>
                            <p>
                                アメリカに進出したいが様々な理由で進出できない、二の足を踏んでいるメーカーさんがたくさんおられます。我々がそんなメーカーさんの商品をアメリカで売り、売上の土台を作り、進出の準備をしていきたいと思っております。アメリカに支店や子会社を作られた暁には我々が養った知識やコネクションを共有し一緒に成長していきたいと思っております。
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                                日本食をアメリカに、そしてアメリカから世界に！
                            </p>
                            <p>
                                食文化を広げる、ブランドを広げるには時間がかかります。しかし、今やらないと今後いつまで経っても広がることはありません。世界にも類を見ない異文化を受け入れることに抵抗のない、寛容なアメリカという国で、我々と一緒に御社の素敵な商品を広げましょう。
                            </p>
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
