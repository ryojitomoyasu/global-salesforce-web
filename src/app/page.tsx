"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { PartnersCarousel } from "@/components/ui/PartnersCarousel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ArrowRight, BarChart3, Globe2, Briefcase } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const steps = [
    { titleKey: 'home.how.step1.title', descKey: 'home.how.step1.desc' },
    { titleKey: 'home.how.step2.title', descKey: 'home.how.step2.desc' },
    { titleKey: 'home.how.step3.title', descKey: 'home.how.step3.desc' },
    { titleKey: 'home.how.step4.title', descKey: 'home.how.step4.desc' },
    { titleKey: 'home.how.step5.title', descKey: 'home.how.step5.desc' },
  ];

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
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl text-balance font-medium leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="text-base h-12 md:h-14 px-8 bg-white text-black hover:bg-neutral-200">
                <Link href="/contact">{t('home.hero.cta')}</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* OUR FOCUS */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('home.focus.title')}</h2>
                <p className="text-muted-foreground text-lg text-balance">
                  {t('home.focus.subtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border/50 bg-card hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <Globe2 className="w-10 h-10 mb-4 text-foreground/80" />
                  <CardTitle className="text-xl">{t('home.focus.channel.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t('home.focus.channel.desc')}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <Briefcase className="w-10 h-10 mb-4 text-foreground/80" />
                  <CardTitle className="text-xl">{t('home.focus.sales.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t('home.focus.sales.desc')}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <BarChart3 className="w-10 h-10 mb-4 text-foreground/80" />
                  <CardTitle className="text-xl">{t('home.focus.expand.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t('home.focus.expand.desc')}
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('home.how.title')}</h2>
              <p className="text-muted-foreground text-lg">
                {t('home.how.subtitle')}
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start md:justify-between w-full mb-12 last:mb-0">
                  <div className="hidden md:block md:w-[45%] text-right pr-12">
                    {idx % 2 === 0 ? (
                      <div>
                        <h3 className="text-xl font-bold mb-2">0{idx + 1}. {t(step.titleKey)}</h3>
                        <p className="text-muted-foreground">{t(step.descKey)}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="absolute left-0 md:left-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background md:-translate-x-1/2 shadow-sm font-bold text-lg">
                    {idx + 1}
                  </div>

                  <div className="pl-20 md:pl-0 md:w-[45%] md:text-left md:pl-12">
                    <div className="md:hidden">
                      <h3 className="text-xl font-bold mb-2">0{idx + 1}. {t(step.titleKey)}</h3>
                      <p className="text-muted-foreground">{t(step.descKey)}</p>
                    </div>
                    {idx % 2 !== 0 ? (
                      <div className="hidden md:block">
                        <h3 className="text-xl font-bold mb-2">0{idx + 1}. {t(step.titleKey)}</h3>
                        <p className="text-muted-foreground">{t(step.descKey)}</p>
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
              {t('home.cta.title')}
            </h2>
            <p className="text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-background text-background hover:bg-background/10">
                <Link href="/contact">{t('home.cta.button')}</Link>
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
