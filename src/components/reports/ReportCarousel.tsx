"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import dynamic from "next/dynamic";

const SimplePDFViewer = dynamic(
    () => import("./SimplePDFViewer").then(mod => mod.SimplePDFViewer),
    { ssr: false }
);

interface ReportItem {
    name: string;
    relativePath: string;
    date: string;
}

export function ReportCarousel() {
    const [reports, setReports] = useState<ReportItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps"
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    // Viewer state
    const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch("/api/reports");
                if (!res.ok) throw new Error("Failed to fetch reports");
                const data = await res.json();
                setReports(data);
            } catch (err) {
                console.error(err);
                setError("業界レポートの読み込みに失敗しました。");
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setPrevBtnEnabled(emblaApi.canScrollPrev());
            setNextBtnEnabled(emblaApi.canScrollNext());
        };

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect(); // initial check

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, reports]);

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const openReport = (report: ReportItem) => {
        // Construct the URL to the public static file
        setSelectedPdfUrl(`/reports/${report.relativePath}`);
        setIsViewerOpen(true);
    };

    if (isLoading) {
        return (
            <div className="py-12 flex justify-center items-center text-muted-foreground">
                <div className="animate-pulse flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    <span>レポートを読み込み中...</span>
                </div>
            </div>
        );
    }

    if (error || reports.length === 0) {
        return null; // Don't show the section if no reports or error
    }

    return (
        <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Industry Reports</h2>
                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                        毎週更新される最新の業界レポートをご覧いただけます。
                    </p>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 hidden sm:flex">
                    <button
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className="p-2 rounded-full border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Previous reports"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className="p-2 rounded-full border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Next reports"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 md:-ml-6">
                    {reports.map((report, index) => (
                        <div 
                            key={index} 
                            className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 md:pl-6"
                        >
                            <button
                                onClick={() => openReport(report)}
                                className="group w-full text-left flex flex-col h-full bg-background rounded-xl overflow-hidden border border-border hover:border-foreground/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                {/* Styled Cover */}
                                <div className="aspect-[3/4] w-full relative bg-gradient-to-br from-indigo-900 via-slate-800 to-black p-6 flex flex-col justify-between overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <FileText className="w-32 h-32" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="inline-flex bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full mb-4">
                                            {report.date}
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-white/60 text-xs font-semibold tracking-wider uppercase mb-1">
                                            Global Sales Force
                                        </p>
                                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-3">
                                            {report.name}
                                        </h3>
                                    </div>
                                    {/* Binding styling to look like a book edge */}
                                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/60 to-transparent border-r border-white/10"></div>
                                </div>
                                
                                {/* Info section */}
                                <div className="p-4 flex-1 flex flex-col bg-card">
                                    <div className="text-xs text-muted-foreground mb-1">Weekly Report</div>
                                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                        レポートを読む →
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Nav */}
            <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
                <button
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                    className="p-3 rounded-full border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                    className="p-3 rounded-full border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <SimplePDFViewer 
                pdfUrl={selectedPdfUrl}
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
            />
        </div>
    );
}
