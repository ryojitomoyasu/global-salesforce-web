"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
    { name: "Calbee", logoUrl: "https://globalsalesforceinc.com/wp-content/uploads/2021/07/Calbee-RED-logo-2.png" },
    { name: "Sun Noodle", logoUrl: "https://globalsalesforceinc.com/wp-content/uploads/2021/07/SUN-NOODLE-LOGO-100920-2-1024x752.png" },
    { name: "Ito En", logoUrl: "https://globalsalesforceinc.com/wp-content/uploads/2021/07/Logo-2-1024x967.jpg" },
    { name: "Taguchi", logoUrl: "https://globalsalesforceinc.com/wp-content/uploads/2022/04/taguchi%E6%96%B0%E3%83%AD%E3%82%B41-22043-1.png" },
    { name: "Nito", logoUrl: "https://globalsalesforceinc.com/wp-content/uploads/2021/07/%E4%BA%8C%E5%85%8E%E3%83%AD%E3%82%B4.jpg" },
    { name: "Yatsushika", logoUrl: "https://globalsalesforceinc.com/wp-content/uploads/2021/07/%E5%85%AB%E9%B9%BF%E3%81%B2%E3%81%92%E6%96%87%E5%AD%97%E6%AD%A3%E8%A6%8F%EF%BC%89.jpg" }
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
                            <div className="relative h-12 md:h-16 w-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={partner.logoUrl}
                                    alt={`${partner.name} logo`}
                                    className="max-w-[120px] max-h-full object-contain"
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
