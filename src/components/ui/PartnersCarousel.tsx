"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
    { name: "Calbee", logoUrl: "/logos/Calbee%20-%20Logo.png" },
    { name: "Sun Noodle", logoUrl: "/logos/Sun%20Noodle%20Logo.png" },
    { name: "Ito En", logoUrl: "/logos/ITO%20EN%20-%20Logo.jpg" },
    { name: "Taguchi", logoUrl: "/logos/Taguchi%20-%20Logo.png" },
    { name: "Nito", logoUrl: "/logos/Nito%20-%20Logo.jpg" }
];

export function PartnersCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start" },
        [Autoplay({ delay: 3000, stopOnInteraction: true })]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative max-w-6xl mx-auto px-12">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
                    {partners.map((partner, index) => (
                        <div
                            className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 pl-4 py-4"
                            key={index}
                        >
                            <div className="relative h-12 md:h-16 w-full flex items-center justify-center cursor-pointer group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={partner.logoUrl}
                                    alt={`${partner.name} logo`}
                                    className="max-w-[120px] max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border shadow-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors z-10"
                onClick={scrollPrev}
                aria-label="Previous logos"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border shadow-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors z-10"
                onClick={scrollNext}
                aria-label="Next logos"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
