import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import { LangSwitch } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
    title: "Privacy Policy | Global Sales Force",
    description: "Our privacy policy regarding the collection and use of personal data.",
};

function PrivacyJa() {
    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight mb-8">プライバシーポリシー</h1>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>Global Sales Force Inc.（以下「当社」といいます。）は、お問い合わせフォームをご利用いただく際に取得する個人情報について、以下のとおり適切に取り扱います。</p>

                <h2 className="font-bold">1. 個人情報の取得について</h2>
                <p>当社は、お問い合わせフォームを通じて、以下の情報を取得する場合があります。</p>
                <ul>
                    <li>会社名</li>
                    <li>氏名</li>
                    <li>メールアドレス</li>
                    <li>お問い合わせ内容</li>
                    <li>その他、お客様が入力された情報</li>
                </ul>

                <h2 className="font-bold">2. 利用目的</h2>
                <p>取得した個人情報は、以下の目的のために利用いたします。</p>
                <ul>
                    <li>お問い合わせへの回答およびご連絡</li>
                    <li>当社サービスに関するご案内</li>
                    <li>ご相談内容に基づく提案・情報提供</li>
                    <li>サービス改善および品質向上のための分析</li>
                </ul>

                <h2 className="font-bold">3. 個人情報の第三者提供</h2>
                <p>当社は、以下の場合を除き、取得した個人情報を第三者に提供することはありません。</p>
                <ul>
                    <li>ご本人の同意がある場合</li>
                    <li>法令に基づき開示が必要な場合</li>
                    <li>人命・財産保護のために必要な場合</li>
                </ul>

                <h2 className="font-bold">4. 個人情報の管理</h2>
                <p>当社は、個人情報への不正アクセス、漏えい、改ざん、紛失等を防止するため、適切な安全管理措置を講じます。</p>

                <h2 className="font-bold">5. 個人情報の開示・訂正・削除</h2>
                <p>ご本人から自己の個人情報について開示、訂正、削除等の請求があった場合、合理的な範囲で速やかに対応いたします。</p>

                <h2 className="font-bold">6. プライバシーポリシーの改定</h2>
                <p>本ポリシーは、必要に応じて予告なく改定される場合があります。</p>

                <div className="mt-8 p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">
                    <p className="mb-1">※営業目的のみのお問い合わせはご遠慮ください。</p>
                    <p className="mb-0">※内容確認後、通常3営業日以内にご返信いたします。</p>
                </div>
            </div>
        </>
    );
}

function PrivacyEn() {
    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>Global Sales Force Inc. (&quot;the Company&quot;) handles personal information obtained through our contact form appropriately, as described below.</p>

                <h2 className="font-bold">1. Collection of Personal Information</h2>
                <p>We may collect the following information through our contact form:</p>
                <ul>
                    <li>Company name</li>
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Details of your inquiry</li>
                    <li>Any other information you enter</li>
                </ul>

                <h2 className="font-bold">2. Purpose of Use</h2>
                <p>We use the personal information we collect for the following purposes:</p>
                <ul>
                    <li>Responding to and following up on inquiries</li>
                    <li>Providing information about our services</li>
                    <li>Offering proposals and information based on your consultation</li>
                    <li>Analysis to improve our services and their quality</li>
                </ul>

                <h2 className="font-bold">3. Disclosure to Third Parties</h2>
                <p>We do not provide personal information to third parties except in the following cases:</p>
                <ul>
                    <li>When we have your consent</li>
                    <li>When disclosure is required by law</li>
                    <li>When necessary to protect human life or property</li>
                </ul>

                <h2 className="font-bold">4. Management of Personal Information</h2>
                <p>We take appropriate security measures to prevent unauthorized access to, and leakage, alteration, or loss of, personal information.</p>

                <h2 className="font-bold">5. Disclosure, Correction, and Deletion</h2>
                <p>If you request the disclosure, correction, or deletion of your own personal information, we will respond promptly within a reasonable scope.</p>

                <h2 className="font-bold">6. Revisions to This Policy</h2>
                <p>This policy may be revised without prior notice as necessary.</p>

                <div className="mt-8 p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">
                    <p className="mb-1">* Please refrain from inquiries made solely for sales or solicitation purposes.</p>
                    <p className="mb-0">* After reviewing your message, we normally reply within 3 business days.</p>
                </div>
            </div>
        </>
    );
}

export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom max-w-3xl">
                    <LangSwitch ja={<PrivacyJa />} en={<PrivacyEn />} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
