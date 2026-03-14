"use client";

import React from 'react';

const partners = [
    { name: "Calbee", logoUrl: "/logos/Calbee%20-%20Logo.png" },
    { name: "Sun Noodle", logoUrl: "/logos/Sun%20Noodle%20Logo.png" },
    { name: "Ito En", logoUrl: "/logos/ITO%20EN%20-%20Logo.jpg" },
    { name: "Taguchi", logoUrl: "/logos/Taguchi%20-%20Logo.png" },
    { name: "Nito", logoUrl: "/logos/Nito%20-%20Logo.jpg" }
];

export function PartnersCarousel() {
    return (
        <div className="relative w-full overflow-hidden mt-8 py-4">
            {/* Gradient Mask for fading edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex w-fit items-center animate-carousel hover:[animation-play-state:paused]">
                {/* Render the list twice for seamless looping */}
                {[...partners, ...partners].map((partner, index) => (
                    <div 
                        key={`${partner.name}-${index}`} 
                        className="flex-none px-6 md:px-12 w-48 md:w-64 flex justify-center group cursor-pointer"
                    >
                        <div className="h-24 md:h-32 flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all duration-300 w-full">
                            <img
                                src={partner.logoUrl}
                                alt={`${partner.name} logo`}
                                className="max-w-[100px] md:max-w-[140px] max-h-full object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
