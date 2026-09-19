"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { books, BOOK_CATEGORIES, type Book } from "@/lib/books";
import { photos } from "@/lib/photos";
import { ExternalLink, BookOpen, Tag } from "lucide-react";
import { useState } from "react";

export default function GalleryPage() {
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
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Gallery
                        </h1>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            私たちの活動の記録や、おすすめの書籍をご紹介します。
                        </p>
                    </div>

                    {/* Photo Gallery Section */}
                    <section className="mb-32">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">Brands & Partners Gallery</h2>
                        
                        {(() => {
                            const groupedPhotos = photos.reduce((acc, photo) => {
                                const match = photo.match(/^([a-zA-Z\s]+)/);
                                const brand = match ? match[1].trim() : "Other";
                                if (!acc[brand]) acc[brand] = [];
                                acc[brand].push(photo);
                                return acc;
                            }, {} as Record<string, string[]>);

                            return Object.entries(groupedPhotos).map(([brand, brandPhotos]) => (
                                <div key={brand} className="mb-16 last:mb-0">
                                    <h3 className="text-xl md:text-2xl font-medium tracking-wide mb-6 border-b border-border/50 pb-3 text-foreground/80">
                                        {brand}
                                    </h3>
                                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                                        {brandPhotos.map((photo, index) => (
                                            <div key={index} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-muted shadow-sm hover:shadow-md transition-all duration-300">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={`/gallery/${encodeURIComponent(photo)}`}
                                                    alt={`${brand} image ${index + 1}`}
                                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ));
                        })()}
                    </section>

                    {/* Books Section */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Recommended Books</h2>
                        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                            ここで紹介するのは、私自身が読んで心を動かされ、「仲間にも読んでほしい」と思った本です。一人ひとりが学び、視野を広げていけば、チーム全体のレベルは自然と上がっていく。その積み重ねが、より良い会社・より強い組織をつくると信じてこのページを作成しました。
                        </p>
                        <p className="text-xs text-muted-foreground mb-8 p-3 bg-muted rounded-md inline-block">
                            ※ 本ページのリンクはAmazonアソシエイトプログラムを利用しています。リンクを経由してご購入いただいた収益は、日本の食文化や商品をアメリカに広げる活動のために使わせていただきます。
                        </p>

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
                    </section>

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
