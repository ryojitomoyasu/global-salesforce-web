import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
// 各号の記事見出し（業界レポート/gsf_pkg/build_site_highlights.py で生成）
import highlightsData from "@/data/report-highlights.json";

// Define the root directory for PDFs in the public folder
const PDF_ROOT_DIR = path.join(process.cwd(), "public", "reports");

interface Highlights {
    kind: "weekly" | "special";
    ja: string[];
    en: string[];
    cover?: string | null;
}

const HIGHLIGHTS = highlightsData as Record<string, Highlights>;

export interface ReportItem {
    name: string;
    relativePath: string;
    date: string;
    kind: "weekly" | "special";
    highlights?: { ja: string[]; en: string[] };
    cover?: string;
}

function getPdfsRecursive(dir: string, fileList: ReportItem[] = []): ReportItem[] {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getPdfsRecursive(filePath, fileList);
        } else if (file.toLowerCase().endsWith(".pdf")) {
            // Extract a date from the filename if possible, otherwise use file stat birthtime
            let date = "";
            const dateMatch = file.match(/\d{4}-\d{2}-\d{2}/);
            if (dateMatch) {
                date = dateMatch[0];
            } else {
                const stat = fs.statSync(filePath);
                date = stat.birthtime.toISOString().split("T")[0];
            }

            // Create a relative path that we can use in the frontend
            const relativePath = path.relative(PDF_ROOT_DIR, filePath).replace(/\\/g, '/');

            // Clean up the name (remove extension and optional date parts if you want)
            const stem = file.replace(/\.pdf$/i, '');
            const name = stem.replace(/_/g, ' ');
            const h = HIGHLIGHTS[stem];

            fileList.push({
                name,
                relativePath,
                date,
                kind: h?.kind ?? (/Special|Report_/.test(stem) && !/Industry_Report/.test(stem) ? "special" : "weekly"),
                highlights: h ? { ja: h.ja, en: h.en } : undefined,
                cover: h?.cover ?? undefined,
            });
        }
    });

    return fileList;
}

export async function GET() {
    try {
        const reports = getPdfsRecursive(PDF_ROOT_DIR);
        // Sort by date descending (newest first)
        reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        return NextResponse.json(reports);
    } catch (error) {
        console.error("Failed to read reports directory:", error);
        return NextResponse.json({ error: "Failed to load reports" }, { status: 500 });
    }
}
