"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();

    const navLinks = [
        { name: t('nav.about'), href: "/about" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
            <div className="container-custom flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo.png?v=1"
                        alt="Global Sales Force"
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="transition-colors hover:text-foreground/80 text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="flex items-center text-sm font-semibold">
                        <button
                            onClick={() => setLang('ja')}
                            className={`px-1 transition-colors ${lang === 'ja' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            JA
                        </button>
                        <span className="text-muted-foreground mx-0.5">/</span>
                        <button
                            onClick={() => setLang('en')}
                            className={`px-1 transition-colors ${lang === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            EN
                        </button>
                    </div>
                    <Button asChild size="sm">
                        <Link href="/contact">{t('nav.contactUs')}</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 -mr-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-b border-border absolute top-16 left-0 w-full bg-background flex flex-col items-start px-6 py-6 space-y-6 shadow-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-full pt-4 border-t border-border flex flex-col space-y-4">
                        <div className="flex items-center text-sm font-semibold gap-2">
                            <span className="text-muted-foreground">Language:</span>
                            <button
                                onClick={() => setLang('ja')}
                                className={`px-2 py-1 rounded transition-colors ${lang === 'ja' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                JA
                            </button>
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                EN
                            </button>
                        </div>
                        <Button asChild className="w-full">
                            <Link href="/contact" onClick={() => setIsOpen(false)}>{t('nav.contactUs')}</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
