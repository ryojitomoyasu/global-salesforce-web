"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { books, BOOK_CATEGORIES, BOOK_CATEGORY_LABELS_EN, type Book } from "@/lib/books";
import { photos } from "@/lib/photos";
import { ExternalLink, BookOpen, Tag } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<string>("すべて");
    const { lang, t } = useLanguage();

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
                            {t('gallery.subtitle')}
                        </p>
                    </div>

                    {/* Photo Gallery Section */}
                    <section className="mb-32">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Brands & Partners Gallery</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {photos.map((photo, index) => (
                                <div key={index} className="relative group rounded-xl overflow-hidden bg-muted shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/3]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/gallery/${encodeURIComponent(photo)}`}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Books Section */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Recommended Books</h2>
                        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                            {t('gallery.books.intro')}
                        </p>
                        <p className="text-xs text-muted-foreground mb-8 p-3 bg-muted rounded-md inline-block">
                            {t('gallery.books.disclosure')}
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
                                    {categoryLabel(cat, lang)}
                                </button>
                            ))}
                        </div>

                        {/* Book Grid */}
                        {filtered.length === 0 ? (
                            <div className="text-center py-24 text-muted-foreground">
                                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p>{t('gallery.books.empty')}</p>
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

function categoryLabel(category: string, lang: string) {
    return lang === "en" ? BOOK_CATEGORY_LABELS_EN[category] ?? category : category;
}

function BookCard({ book }: { book: Book }) {
    const { lang, t } = useLanguage();
    const en = lang === "en";
    const title = (en && book.titleEn) || book.title;
    const author = (en && book.authorEn) || book.author;
    const publisher = (en && book.publisherEn) || book.publisher;
    const description = (en && book.descriptionEn) || book.description;
    const comment = (en && book.commentEn) || book.comment;

    return (
        <div className="group flex flex-col h-full border border-border rounded-xl overflow-hidden hover:border-foreground/30 hover:shadow-lg transition-all duration-300 bg-card">
            {/* Book Cover */}
            <div className="aspect-[3/2] w-full bg-muted relative overflow-hidden flex items-center justify-center">
                {book.coverUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={book.coverUrl}
                        alt={title}
                        className="h-full w-auto object-contain mx-auto py-4"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground/40 px-8 text-center h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 w-full">
                        <BookOpen className="w-12 h-12" />
                        <span className="text-xs font-medium leading-snug">{title}</span>
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-border/50">
                        <Tag className="w-3 h-3" />
                        {categoryLabel(book.category, lang)}
                    </span>
                </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-6">
                <h2 className="font-bold text-lg leading-snug mb-1 group-hover:text-foreground/70 transition-colors">
                    {title}
                </h2>
                {en && book.titleEn && (
                    <p className="text-xs text-muted-foreground/60 mb-1">{book.title} (Japanese edition)</p>
                )}
                <p className="text-sm text-muted-foreground mb-1">{author}</p>
                {(publisher || book.year) && (
                    <p className="text-xs text-muted-foreground/60 mb-4">
                        {[publisher, book.year].filter(Boolean).join(" · ")}
                    </p>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                    {description}
                </p>

                {/* Personal comment */}
                <blockquote className="border-l-4 border-border pl-4 text-sm italic text-muted-foreground mb-6">
                    {comment}
                </blockquote>

                {/* CTA button */}
                <a
                    href={book.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/80 transition-colors"
                >
                    {t('gallery.books.cta')}
                    <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
            </div>
        </div>
    );
}
