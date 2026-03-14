import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background pt-16 pb-8">
            <div className="container-custom grid gap-12 md:grid-cols-4 lg:grid-cols-5">
                <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start">
                    <div className="font-bold text-xl tracking-tight mb-4">Global Sales Force, Inc.</div>
                    <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                        日本の食文化をアメリカに広げる。
                        営業に特化したプロフェッショナルチームが、卸問屋・小売店・レストラン・リカーショップと連携し、米国市場での「売れる仕組み」を構築します。
                    </p>

                </div>


                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>

                        <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        米国での販路拡大や市場参入について、お気軽にご相談ください。
                    </p>
                    <Link href="/contact" className="text-sm font-medium flex items-center hover:underline focus-visible:underline">
                        お問い合わせ <ArrowUpRight className="ml-1 w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="container-custom mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} Global Sales Force, Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
