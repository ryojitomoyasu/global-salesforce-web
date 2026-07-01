"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, BookOpen, File } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SimplePDFViewerProps {
    pdfUrl: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SimplePDFViewer({ pdfUrl, isOpen, onClose }: SimplePDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(1.0);
    const [viewMode, setViewMode] = useState<"single" | "double">("single");

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setViewMode("single");
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Reset page when opening a new PDF
    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen, pdfUrl]);

    if (!isOpen || !pdfUrl) return null;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const nextPages = () => {
        if (viewMode === "single") {
            setCurrentPage((prev) => Math.min(prev + 1, numPages));
        } else {
            setCurrentPage((prev) => Math.min(prev + 2, numPages));
        }
    };

    const prevPages = () => {
        if (viewMode === "single") {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        } else {
            setCurrentPage((prev) => Math.max(prev - 2, 1));
        }
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const toggleViewMode = () => setViewMode(prev => prev === "single" ? "double" : "single");

    // Calculate which pages to show
    let leftPage = 0;
    let rightPage = 0;

    if (viewMode === "single") {
        leftPage = currentPage; // Just show one page
    } else {
        // Desktop two-page view (like a book)
        if (currentPage === 1) {
             leftPage = 1;
             rightPage = numPages >= 2 ? 2 : 0;
        } else {
             leftPage = currentPage;
             rightPage = currentPage + 1 <= numPages ? currentPage + 1 : 0;
        }
    }

    // Ensure currentPage always aligns to odd numbers if we want a true book spread,
    // but a simple +2 step is fine.
    
    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 bg-black/50 text-white border-b border-white/10">
                <div className="text-sm font-medium hidden sm:block">
                    {numPages ? `Page ${currentPage} ${viewMode === "double" && rightPage ? `- ${rightPage}` : ""} of ${numPages}` : "Loading..."}
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0">
                    <button onClick={handleZoomOut} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Zoom Out">
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={handleZoomIn} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Zoom In">
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    
                    {!isMobile && (
                        <div className="h-6 w-px bg-white/20 mx-2"></div>
                    )}
                    
                    {!isMobile && (
                        <button onClick={toggleViewMode} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2" aria-label="Toggle View Mode">
                            {viewMode === "single" ? (
                                <><BookOpen className="w-5 h-5" /><span className="text-sm hidden md:inline">見開き表示</span></>
                            ) : (
                                <><File className="w-5 h-5" /><span className="text-sm hidden md:inline">単一ページ表示</span></>
                            )}
                        </button>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors absolute sm:relative right-4"
                    aria-label="Close viewer"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Viewer Area */}
            <div className="flex-1 overflow-auto relative flex p-4 md:p-8">
                
                {/* Navigation Left */}
                <button 
                    onClick={prevPages}
                    disabled={currentPage === 1}
                    className="absolute left-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="m-auto flex items-center justify-center max-w-full">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex flex-col items-center text-white/50">
                                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                                <p>PDFを読み込み中...</p>
                            </div>
                        }
                        className="flex shadow-2xl"
                    >
                        {/* Page Container */}
                        <div className="flex bg-white mx-auto shadow-2xl transition-all duration-200">
                            {numPages > 0 && (
                                <>
                                    <div className={viewMode === "double" ? "border-r border-gray-200" : ""}>
                                        <Page 
                                            pageNumber={leftPage} 
                                            renderTextLayer={false} 
                                            renderAnnotationLayer={false}
                                            width={(typeof window !== 'undefined' ? (viewMode === "single" ? Math.min(window.innerWidth - 80, 800) : Math.min((window.innerWidth - 80) / 2, 600)) : 600) * scale}
                                            className="select-none"
                                        />
                                    </div>
                                    {viewMode === "double" && rightPage > 0 && (
                                        <div>
                                            <Page 
                                                pageNumber={rightPage} 
                                                renderTextLayer={false} 
                                                renderAnnotationLayer={false}
                                                width={(typeof window !== 'undefined' ? Math.min((window.innerWidth - 80) / 2, 600) : 600) * scale}
                                                className="select-none"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </Document>
                </div>

                {/* Navigation Right */}
                <button 
                    onClick={nextPages}
                    disabled={viewMode === "single" ? currentPage >= numPages : rightPage === 0 || rightPage >= numPages}
                    className="absolute right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}
