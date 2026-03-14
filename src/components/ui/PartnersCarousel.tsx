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
        <div className="relative w-full overflow-hidden mt-8 py-4 px-0">
            <style dangerouslySetInnerHTML={{__html: `
                .partner-marquee-track {
                    display: flex;
                    width: fit-content;
                    align-items: center;
                    animation: partner-marquee 30s linear infinite;
                }
                .partner-marquee-track:hover {
                    animation-play-state: paused;
                }
                @keyframes partner-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50%)); }
                }

                .partner-item {
                    flex: none;
                    width: 12rem;
                    height: 6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    margin: 0 1.5rem;
                    background-color: rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(4px);
                    border: 1px solid rgba(243, 244, 246, 0.5);
                    border-radius: 0.75rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                @media (min-width: 768px) {
                    .partner-item {
                        width: 16rem;
                        height: 8rem;
                        margin: 0 3rem;
                    }
                }

                .partner-item:hover {
                    background-color: rgba(255, 255, 255, 1);
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }

                .partner-logo-img {
                    max-width: 100px;
                    max-height: 100%;
                    object-fit: contain;
                    filter: grayscale(100%);
                    opacity: 0.6;
                    transition: all 0.3s ease;
                    pointer-events: none;
                }

                @media (min-width: 768px) {
                    .partner-logo-img {
                        max-width: 140px;
                    }
                }

                .partner-item:hover .partner-logo-img {
                    filter: grayscale(0) !important;
                    opacity: 1 !important;
                }
            `}} />
            
            {/* Gradient Mask for fading edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="partner-marquee-track">
                {/* Render the list twice for seamless looping */}
                {[...partners, ...partners].map((partner, index) => (
                    <div 
                        key={`${partner.name}-${index}`} 
                        className="partner-item"
                    >
                        <img
                            src={partner.logoUrl}
                            alt={`${partner.name} logo`}
                            className="partner-logo-img"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
