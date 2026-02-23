import React from 'react';

export function SkylineBackground() {
    return (
        <div className="absolute inset-x-0 bottom-0 z-0 w-full h-[80vh] min-h-[600px] pointer-events-none opacity-40 flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/skyline.jpeg?v=8"
                alt="New York Skyline"
                className="w-full h-full object-cover object-center scale-[1.2]"
                style={{
                    // 1. Invert black lines to white, white bg to black
                    // 2. Sepia + saturate + hue-rotate to turn white lines into red lines
                    filter: "invert(1) sepia(1) saturate(5) hue-rotate(-50deg)",
                    // Screen blends the black background away, leaving only the red lines visible
                    mixBlendMode: "screen",
                }}
            />
        </div>
    );
}
