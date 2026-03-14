import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { PartnersCarousel } from "@/components/ui/PartnersCarousel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ArrowRight, BarChart3, Globe2, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* SKYLINE HERO IMAGE */}
        <section className="w-full bg-white relative flex justify-center items-center overflow-hidden pt-0 md:pt-12">
          <div className="relative w-full flex justify-center" style={{ isolation: 'isolate' }}>
            <div className="w-full md:w-[85%] lg:w-[80%] max-w-7xl mix-blend-multiply">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/skyline.jpg?v=12"
                alt="Global Sales Force New York Skyline"
                className="w-[115%] max-w-none -ml-[7.5%] -mt-4 md:w-full md:max-w-full md:ml-0 md:mt-0 h-auto object-contain"
                style={{
                  filter: "brightness(1.5) contrast(1.8) grayscale(0.2)",
                  WebkitFilter: "brightness(1.5) contrast(1.8) grayscale(0.2)",
                  transform: "translateZ(0)"
                }}
              />
            </div>
          </div>
        </section>

        {/* HERO SECTION TEXT */}
        <section className="relative w-full py-20 min-h-[500px] flex items-center justify-center bg-black overflow-hidden border-t border-border/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black z-10 pointer-events-none" />

          <div className="container-custom relative z-20 text-center text-white flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance max-w-4xl">
              あなたのブランドを、<br className="hidden md:block" />米国市場で持続的に挑戦できる事業へ。
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl text-balance font-medium leading-relaxed">
              営業特化チームが、卸・小売・レストランをつなぎ、米国市場で販路・売上・ブランドを着実に育てます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

              <Button asChild size="lg" className="text-base h-12 md:h-14 px-8 bg-white text-black hover:bg-neutral-200">
                <Link href="/contact">相談する</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* OUR FOCUS */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Focus</h2>
                <p className="text-muted-foreground text-lg text-balance">
                  米国進出から既存ビジネスのスケールまで、実務に徹底した現場主義でサポートします。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border/50 bg-card hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <Globe2 className="w-10 h-10 mb-4 text-foreground/80" />
                  <CardTitle className="text-xl">販路構築</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    現地の卸売業者・小売チェーン・飲食店とのネットワークを活用し、<br />
                    商品特性に合わせた最適な販売チャネルをゼロから構築します。<br />
                    単なる導入ではなく、継続的に売れる販路づくりを支援します。
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <Briefcase className="w-10 h-10 mb-4 text-foreground/80" />
                  <CardTitle className="text-xl">営業代行</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    日米両言語に対応した営業チームが、貴社に代わって現地の最前線で商談・交渉を実行します。<br />
                    単なる営業代行にとどまらず、売場づくりやディスプレイ展開まで一貫して対応し、市場で実際に商品が動く状態をつくります。
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <BarChart3 className="w-10 h-10 mb-4 text-foreground/80" />
                  <CardTitle className="text-xl">市場拡大・実行</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    導入後こそ、本当の市場づくりが始まります。<br />
                    店舗展開・売場改善・流通連携を継続的に運用し、市場で定着し拡大し続ける仕組みを構築します。
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-24 bg-muted border-y border-border">
          <div className="container-custom">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How we grow together</h2>
              <p className="text-muted-foreground text-lg">
                現場から市場を動かし、米国での成長を実現するプロセス
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {[
                { title: "市場を知る（Understand the Market）", desc: "現地の売場、競合、チャネルの特性を現場目線で把握し、商品が伸びる可能性を見極めます。" },
                { title: "売れる形をつくる（Build the Right Setup）", desc: "価格設定、販売チャネル、提案方法を整理し、米国市場で“売れる状態”をつくります。" },
                { title: "現場を動かす（Activate the Market）", desc: "バイヤー商談、導入交渉、売場づくり、ディスプレイ設置まで実行し、市場を実際に動かします。" },
                { title: "市場を回し続ける（Operate the Market）", desc: "流通・在庫・販促・店頭状況を継続的に管理し、ブランドが売れ続ける状態を維持します。" },
                { title: "成長を加速する（Accelerate Growth）", desc: "売上データと現場の声を基に改善を重ね、導入から拡大フェーズへ成長を加速させます。" }
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-start md:justify-between w-full mb-12 last:mb-0">
                  <div className="hidden md:block md:w-[45%] text-right pr-12">
                    {idx % 2 === 0 ? (
                      <div>
                        <h3 className="text-xl font-bold mb-2">0{idx + 1}. {step.title}</h3>
                        <p className="text-muted-foreground">{step.desc}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="absolute left-0 md:left-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background md:-translate-x-1/2 shadow-sm font-bold text-lg">
                    {idx + 1}
                  </div>

                  <div className="pl-20 md:pl-0 md:w-[45%] md:text-left md:pl-12">
                    <div className="md:hidden">
                      <h3 className="text-xl font-bold mb-2">0{idx + 1}. {step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                    {idx % 2 !== 0 ? (
                      <div className="hidden md:block">
                        <h3 className="text-xl font-bold mb-2">0{idx + 1}. {step.title}</h3>
                        <p className="text-muted-foreground">{step.desc}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* STRONG CTA SECTION */}
        <section className="py-32 bg-foreground text-background">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              米国市場の「現場」を、動かす。
            </h2>
            <p className="text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              戦略提案だけで終わらない。<br />
              商談、売場づくり、ディストリビューター連携まで、<br />
              実行まで伴走する現場パートナーです。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-background text-background hover:bg-background/10">
                <Link href="/contact">メールで問い合わせる</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* LOGO BAND */}
        <section className="border-t border-border py-12 bg-background overflow-hidden relative">
          <div className="container-custom">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-widest">
              Trusted by / Partners
            </p>
            <PartnersCarousel />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
