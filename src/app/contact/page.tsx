"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
                                米国での販路拡大や市場参入について、お気軽にご相談ください。
                                3営業日以内に担当者よりご連絡いたします。
                            </p>


                        </div>

                        <div>
                            {status === "success" ? (
                                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-8 rounded-md border border-green-200 dark:border-green-800 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-6">
                                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">お問い合わせ完了</h3>
                                    <p className="mb-6">
                                        ありがとうございます。<br />
                                        ご入力いただいた内容を受け付けました。担当者より折り返しご連絡いたします。
                                    </p>
                                    <Button onClick={() => setStatus("idle")} variant="outline">
                                        別の問い合わせをする
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="company" className="text-sm font-medium">会社名 <span className="text-red-500">*</span></label>
                                            <input id="company" name="company" required className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="株式会社〇〇" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">氏名 <span className="text-red-500">*</span></label>
                                            <input id="name" name="name" required className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="山田 太郎" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">メールアドレス <span className="text-red-500">*</span></label>
                                        <input id="email" name="email" type="email" required className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="taro.yamada@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">タイトル <span className="text-red-500">*</span></label>
                                        <input id="subject" name="subject" required autoComplete="off" className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="お問い合わせの件名" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">相談内容・現状の課題など <span className="text-red-500">*</span></label>
                                        <textarea id="message" name="message" required rows={5} className="flex w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="現在の米国進出状況や、抱えている課題についてご自由にお書きください。"></textarea>
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-500 text-sm">エラーが発生しました。時間をおいて再度お試しください。</p>
                                    )}

                                    <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={status === "submitting"}>
                                        {status === "submitting" ? "送信中..." : "送信する"}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        送信することにより、<Link href="/privacy" className="underline">プライバシーポリシー</Link>に同意したものとみなされます。
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
