"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background pt-16 pb-8">
            <div className="container-custom grid gap-12 md:grid-cols-4 lg:grid-cols-5">
                <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start">
                    <div className="font-bold text-xl tracking-tight mb-4">Global Sales Force, Inc.</div>
                    <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                        {t('footer.description')}
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-foreground transition-colors">{t('footer.aboutUs')}</Link></li>
                        <li><Link href="/contact" className="hover:text-foreground transition-colors">{t('footer.contact')}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">{t('footer.contactSection')}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        {t('footer.contactDesc')}
                    </p>
                    <Link href="/contact" className="text-sm font-medium flex items-center hover:underline focus-visible:underline">
                        {t('footer.inquiry')} <ArrowUpRight className="ml-1 w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="container-custom mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>© {year} Global Sales Force, Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-foreground">{t('footer.privacy')}</Link>
                    <Link href="/terms" className="hover:text-foreground">{t('footer.terms')}</Link>
                </div>
            </div>
        </footer>
    );
}
