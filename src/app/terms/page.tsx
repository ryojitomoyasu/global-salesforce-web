import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Global Sales Force",
    description: "Terms and conditions for using our website.",
};

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-16 pb-32">
                <div className="container-custom max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p>This is a dummy terms of service for the Global Sales Force website demo.</p>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By using this website, you agree to these dummy terms.</p>
                        <h2>2. Services</h2>
                        <p>We provide B2B consultative and sales agency services. Specific contracts will be drafted separately.</p>
                        <h2>3. Disclaimer</h2>
                        <p>All results are subject to market conditions and we do not provide guarantees for dummy pages.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
