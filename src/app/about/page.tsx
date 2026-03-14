"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();

    const whyItems = [
        { titleKey: 'about.why1.title', descKey: 'about.why1.desc' },
        { titleKey: 'about.why2.title', descKey: 'about.why2.desc' },
        { titleKey: 'about.why3.title', descKey: 'about.why3.desc' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">
                    <div className="max-w-3xl mb-16 border-b border-border pb-8">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">{t('about.eyebrow')}</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            {t('about.title')}
                        </h1>
                    </div>

                    <div className="max-w-3xl mb-24">
                        <div className="text-lg text-muted-foreground leading-loose space-y-6">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                            <p className="text-2xl font-bold text-foreground">{t('about.highlight')}</p>
                            <p>{t('about.p3')}</p>
                        </div>
                    </div>

                    <div className="mb-24">
                        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">{t('about.whyUs')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {whyItems.map((item, idx) => (
                                <Card key={idx} className="bg-muted/50 border-none shadow-none">
                                    <CardHeader>
                                        <CheckCircle2 className="w-8 h-8 text-foreground/80 mb-4" />
                                        <CardTitle className="text-xl">{t(item.titleKey)}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{t(item.descKey)}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
