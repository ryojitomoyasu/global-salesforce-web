import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { company, name, email, subject, message } = data;

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

        // Setup email data sent to the site admins
        const mailOptions = {
            from: process.env.SMTP_USER || '"GSF Website" <no-reply@global-salesforce.com>',
            to: ["ryoji@global-salesforce.com", "yuki@global-salesforce.com"],
            replyTo: email,
            subject: `[Webお問い合わせ] ${subject || "件名なし"} - ${company || "会社名なし"}`,
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
        <td>${company}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>氏名</strong></td>
        <td>${name}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>メールアドレス</strong></td>
        <td><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>タイトル</strong></td>
        <td>${subject}</td>
    </tr>
    <tr>
        <td style="background-color: #f7f7f7;"><strong>相談内容</strong></td>
        <td>${message ? message.replace(/\n/g, '<br/>') : ''}</td>
    </tr>
</table>
<br/>
<p style="color: #666; font-size: 12px;">このメールは Global Sales Force, Inc. のウェブサイトから自動送信されています。</p>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Inquiry received successfully.", data },
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
