import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Limits -----------------------------------------------------------------
const MAX_BODY_BYTES = 20_000;
const LIMITS = { company: 200, name: 100, email: 254, subject: 200, message: 5000 } as const;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5; // max submissions per IP per window

const ALLOWED_HOSTS = new Set(["www.global-salesforce.com", "global-salesforce.com"]);

// Best-effort limiter (per server instance). Stops simple floods from one address.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) {
        for (const [k, v] of hits) {
            if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
        }
    }
    return false;
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Single-line fields: strip control characters (incl. line breaks) so they cannot alter mail headers.
function cleanLine(v: unknown, max: number): string | null {
    if (typeof v !== "string") return null;
    const s = v.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
    if (!s || s.length > max) return null;
    return s;
}

function cleanText(v: unknown, max: number): string | null {
    if (typeof v !== "string") return null;
    const s = v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
    if (!s || s.length > max) return null;
    return s;
}

function sameSite(request: Request): boolean {
    const origin = request.headers.get("origin");
    if (!origin) return false;
    try {
        const host = new URL(origin).hostname;
        if (ALLOWED_HOSTS.has(host)) return true;
        // Preview deployments and local development: origin must match the host being served.
        return host === (request.headers.get("host") || "").split(":")[0];
    } catch {
        return false;
    }
}

const bad = (status = 400) => NextResponse.json({ error: "Invalid request." }, { status });

export async function POST(request: Request) {
    try {
        if (!sameSite(request)) return bad(403);
        if (!(request.headers.get("content-type") || "").includes("application/json")) return bad(415);

        const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
        if (rateLimited(ip)) {
            return NextResponse.json({ error: "Too many requests." }, { status: 429 });
        }

        const raw = await request.text();
        if (raw.length > MAX_BODY_BYTES) return bad(413);

        let data: Record<string, unknown>;
        try {
            data = JSON.parse(raw);
        } catch {
            return bad();
        }
        if (!data || typeof data !== "object" || Array.isArray(data)) return bad();

        // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
        if (typeof data.website === "string" && data.website.trim() !== "") {
            return NextResponse.json({ message: "Inquiry received successfully." }, { status: 200 });
        }

        const company = cleanLine(data.company, LIMITS.company);
        const name = cleanLine(data.name, LIMITS.name);
        const email = cleanLine(data.email, LIMITS.email);
        const subject = cleanLine(data.subject, LIMITS.subject);
        const message = cleanText(data.message, LIMITS.message);

        if (!company || !name || !email || !subject || !message) return bad();
        if (!/^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/.test(email)) return bad();

        // Configure nodemailer transporter using environment variables
        // Setup requires SMTP credentials in .env.local
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const h = {
            company: escapeHtml(company),
            name: escapeHtml(name),
            email: escapeHtml(email),
            subject: escapeHtml(subject),
            message: escapeHtml(message).replace(/\r?\n/g, "<br/>"),
        };

        // Setup email data sent to the site admins
        const mailOptions = {
            from: process.env.SMTP_USER || '"GSF Website" <no-reply@global-salesforce.com>',
            to: ["ryoji@global-salesforce.com", "yuki@global-salesforce.com"],
            replyTo: email,
            subject: `[Webお問い合わせ] ${subject} - ${company}`,
            text: `
ウェブサイトのContactフォームから新しいお問い合わせがありました。

【会社名】
${company}

【氏名】
${name}

【メールアドレス】
${email}

【タイトル】
${subject}

【相談内容・現状の課題など】
${message}
            `,
            html: `
<h3>ウェブサイトのContactフォームから新しいお問い合わせがありました。</h3>
<table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; min-width: 400px;">
    <tr>
        <td style="background-color: #f7f7f7; width: 140px;"><strong>会社名</strong></td>
        <td>${h.company}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>氏名</strong></td>
        <td>${h.name}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>メールアドレス</strong></td>
        <td>${h.email}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>タイトル</strong></td>
        <td>${h.subject}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>相談内容</strong></td>
        <td>${h.message}</td>
    </tr>
</table>
<br/>
<p style="color: #666; font-size: 12px;">このメールは Global Sales Force, Inc. のウェブサイトから自動送信されています。</p>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Inquiry received successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to send contact email:", error);
        return NextResponse.json(
            { error: "Failed to process the request and send email." },
            { status: 500 }
        );
    }
}
