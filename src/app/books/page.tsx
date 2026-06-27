"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { books, BOOK_CATEGORIES, type Book } from "@/lib/books";
import { ExternalLink, BookOpen, Tag } from "lucide-react";
import { useState } from "react";

export default function BooksPage() {
    const [activeCategory, setActiveCategory] = useState<string>("すべて");

    const filtered = activeCategory === "すべて"
        ? books
        : books.filter((b) => b.category === activeCategory);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-24">
                <div className="container-custom">

                    {/* Page Header */}
                    <div className="max-w-3xl mb-16 border-b border-border pb-12">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                            Global Sales Force
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            おすすめの本
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            米国市場への進出、営業、マーケティング、英語学習など——実際に読んで役に立った本をジャンル別にご紹介します。
                        </p>
                        <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md">
                            ※ 本ページのリンクはAmazonアソシエイトプログラムを利用しています。リンクを経由してご購入いただいた収益は、日本の食文化や商品をアメリカに広げる活動のために使わせていただきます。
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {BOOK_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                                    activeCategory === cat
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Book Grid */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-24 text-muted-foreground">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>このカテゴリの本は近日公開予定です。</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function BookCard({ book }: { book: Book }) {
    return (
        <div className="group flex flex-col h-full border border-border rounded-xl overflow-hidden hover:border-foreground/30 hover:shadow-lg transition-all duration-300 bg-card">
            {/* Book Cover */}
            <div className="aspect-[3/2] w-full bg-muted relative overflow-hidden flex items-center justify-center">
                {book.coverUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-full w-auto object-contain mx-auto py-4"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground/40 px-8 text-center h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 w-full">
                        <BookOpen className="w-12 h-12" />
                        <span className="text-xs font-medium leading-snug">{book.title}</span>
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-border/50">
                        <Tag className="w-3 h-3" />
                        {book.category}
                    </span>
                </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-6">
                <h2 className="font-bold text-lg leading-snug mb-1 group-hover:text-foreground/70 transition-colors">
                    {book.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-1">{book.author}</p>
                {(book.publisher || book.year) && (
                    <p className="text-xs text-muted-foreground/60 mb-4">
                        {[book.publisher, book.year].filter(Boolean).join(" · ")}
                    </p>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                    {book.description}
                </p>

                {/* Personal comment */}
                <blockquote className="border-l-4 border-border pl-4 text-sm italic text-muted-foreground mb-6">
                    {book.comment}
                </blockquote>

                {/* CTA button */}
                <a
                    href={book.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/80 transition-colors"
                >
                    Amazonで見る
                    <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
            </div>
        </div>
    );
}
