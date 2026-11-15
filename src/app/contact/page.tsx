"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const { t } = useLanguage();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        // Dummy API call
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                {t('contact.intro')}
                            </p>


                        </div>

                        <div>
                            {status === "success" ? (
                                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-8 rounded-md border border-green-200 dark:border-green-800 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-6">
                                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{t('contact.success.title')}</h3>
                                    <p className="mb-6">
                                        {t('contact.success.thanks')}<br />
                                        {t('contact.success.body')}
                                    </p>
                                    <Button onClick={() => setStatus("idle")} variant="outline">
                                        {t('contact.success.again')}
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Honeypot for bots: hidden from visitors, must stay empty */}
                                    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                                        <label htmlFor="website">Website</label>
                                        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="company" className="text-sm font-medium">{t('contact.company')} <span className="text-red-500">*</span></label>
                                            <input id="company" name="company" required maxLength={200} className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.company.placeholder')} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">{t('contact.name')} <span className="text-red-500">*</span></label>
                                            <input id="name" name="name" required maxLength={100} className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.name.placeholder')} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">{t('contact.email')} <span className="text-red-500">*</span></label>
                                        <input id="email" name="email" type="email" required maxLength={254} className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.email.placeholder')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">{t('contact.subject')} <span className="text-red-500">*</span></label>
                                        <input id="subject" name="subject" required maxLength={200} autoComplete="off" className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.subject.placeholder')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">{t('contact.message')} <span className="text-red-500">*</span></label>
                                        <textarea id="message" name="message" required maxLength={5000} rows={5} className="flex w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.message.placeholder')}></textarea>
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-500 text-sm">{t('contact.error')}</p>
                                    )}

                                    <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={status === "submitting"}>
                                        {status === "submitting" ? t('contact.sending') : t('contact.send')}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        {t('contact.consent.before')}<Link href="/privacy" className="underline">{t('contact.consent.link')}</Link>{t('contact.consent.after')}
                                    </p>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
