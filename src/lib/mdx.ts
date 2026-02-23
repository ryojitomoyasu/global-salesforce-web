import fs from "fs";
import path from "path";

export interface MdxFrontmatter {
    title: string;
    description: string;
    date?: string;
    category?: string;
    region?: string;
    tags?: string[];
    author?: string;
}

export interface MdxFile {
    slug: string;
    frontmatter: MdxFrontmatter;
    content: string;
}

export function getMdxFiles(dir: string): MdxFile[] {
    const contentDir = path.join(process.cwd(), "src/content", dir);
    if (!fs.existsSync(contentDir)) return [];

    const files = fs.readdirSync(contentDir);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const filePath = path.join(contentDir, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");

            // Simple frontmatter parser (for dummy use)
            const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
            const match = frontmatterRegex.exec(fileContent);
            let frontmatter: any = {};
            let content = fileContent;

            if (match) {
                content = fileContent.replace(match[0], "");
                const fmString = match[1];
                fmString.split("\n").forEach((line) => {
                    const [key, ...valueArr] = line.split(":");
                    if (key && valueArr.length) {
                        let val = valueArr.join(":").trim();
                        // Handle simple array parsing for tags
                        if (val.startsWith("[") && val.endsWith("]")) {
                            val = val.slice(1, -1).split(",").map((i) => i.trim().replace(/'|"/g, "")) as any;
                        } else {
                            val = val.replace(/^["']|["']$/g, ""); // remove quotes
                        }
                        frontmatter[key.trim()] = val;
                    }
                });
            }

            return {
                slug: file.replace(".mdx", ""),
                frontmatter: frontmatter as MdxFrontmatter,
                content,
            };
        })
        .sort((a, b) => {
            if (a.frontmatter.date && b.frontmatter.date) {
                return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
            }
            return 0;
        });
}

export function getMdxFileBySlug(dir: string, slug: string): MdxFile | null {
    const files = getMdxFiles(dir);
    return files.find((file) => file.slug === slug) || null;
}
