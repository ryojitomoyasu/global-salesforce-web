import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the root directory for PDFs in the public folder
const PDF_ROOT_DIR = path.join(process.cwd(), "public", "reports");

export interface ReportItem {
    name: string;
    relativePath: string;
    date: string;
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
            const name = file.replace(/\.pdf$/i, '').replace(/_/g, ' ');

            fileList.push({
                name,
                relativePath,
                date
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
