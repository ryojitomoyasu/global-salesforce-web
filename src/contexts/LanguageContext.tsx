"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'ja' | 'en';

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
    ja: {
        // Header / Nav
        'nav.about': 'About',
        'nav.contactUs': 'お問い合わせ',
        'nav.language': '言語: JA / EN',

        // Footer
        'footer.description': '日本の食文化をアメリカに広げる。 営業に特化したプロフェッショナルチームが、卸問屋・小売店・レストラン・リカーショップと連携し、米国市場での「売れる仕組み」を構築します。',
        'footer.company': 'Company',
        'footer.aboutUs': 'About Us',
        'footer.contact': 'Contact',
        'footer.contactSection': 'Contact',
        'footer.contactDesc': '米国での販路拡大や市場参入について、お気軽にご相談ください。',
        'footer.inquiry': 'お問い合わせ',
        'footer.rights': '© {year} Global Sales Force, Inc. All rights reserved.',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',

        // Homepage — Hero
        'home.hero.title': 'あなたのブランドを、米国市場で持続的に挑戦できる事業へ。',
        'home.hero.subtitle': '営業特化チームが、卸・小売・レストランをつなぎ、米国市場で販路・売上・ブランドを着実に育てます。',
        'home.hero.cta': '相談する',

        // Homepage — Our Focus
        'home.focus.title': 'Our Focus',
        'home.focus.subtitle': '米国進出から既存ビジネスのスケールまで、実務に徹底した現場主義でサポートします。',
        'home.focus.channel.title': '販路構築',
        'home.focus.channel.desc': '現地の卸売業者・小売チェーン・飲食店とのネットワークを活用し、商品特性に合わせた最適な販売チャネルをゼロから構築します。単なる導入ではなく、継続的に売れる販路づくりを支援します。',
        'home.focus.sales.title': '営業代行',
        'home.focus.sales.desc': '日米両言語に対応した営業チームが、貴社に代わって現地の最前線で商談・交渉を実行します。単なる営業代行にとどまらず、売場づくりやディスプレイ展開まで一貫して対応し、市場で実際に商品が動く状態をつくります。',
        'home.focus.expand.title': '市場拡大・実行',
        'home.focus.expand.desc': '導入後こそ、本当の市場づくりが始まります。店舗展開・売場改善・流通連携を継続的に運用し、市場で定着し拡大し続ける仕組みを構築します。',

        // Homepage — How We Work
        'home.how.title': 'How we grow together',
        'home.how.subtitle': '現場から市場を動かし、米国での成長を実現するプロセス',
        'home.how.step1.title': '市場を知る（Understand the Market）',
        'home.how.step1.desc': '現地の売場、競合、チャネルの特性を現場目線で把握し、商品が伸びる可能性を見極めます。',
        'home.how.step2.title': '売れる形をつくる（Build the Right Setup）',
        'home.how.step2.desc': '価格設定、販売チャネル、提案方法を整理し、米国市場で"売れる状態"をつくります。',
        'home.how.step3.title': '現場を動かす（Activate the Market）',
        'home.how.step3.desc': 'バイヤー商談、導入交渉、売場づくり、ディスプレイ設置まで実行し、市場を実際に動かします。',
        'home.how.step4.title': '市場を回し続ける（Operate the Market）',
        'home.how.step4.desc': '流通・在庫・販促・店頭状況を継続的に管理し、ブランドが売れ続ける状態を維持します。',
        'home.how.step5.title': '成長を加速する（Accelerate Growth）',
        'home.how.step5.desc': '売上データと現場の声を基に改善を重ね、導入から拡大フェーズへ成長を加速させます。',

        // Homepage — CTA
        'home.cta.title': '米国市場の「現場」を、動かす。',
        'home.cta.subtitle': '戦略提案だけで終わらない。商談、売場づくり、ディストリビューター連携まで、実行まで伴走する現場パートナーです。',
        'home.cta.button': 'メールで問い合わせる',

        // About Page
        'about.eyebrow': '企業理念・ミッションステートメント',
        'about.title': '「日本の食品をアメリカに紹介し文化を作っていく。」',
        'about.p1': 'Sushi、Ramen、Izakaya――今では当たり前のように英語として使われている言葉です。これらは自然に広まったのではありません。その裏には、海を渡って広めてきた日本人がいました。一度しかない人生、次の日本食を「英語」にする立役者に、私たちがなりたいと考えています。',
        'about.p2': 'アメリカに進出したいけれど、人手やコスト、ノウハウなどの理由で二の足を踏んでいるメーカーさんはたくさんいらっしゃいます。私たちはそうしたメーカーさんの商品をアメリカで販売し、売上の土台を作り、本格進出への準備を一緒に進めます。',
        'about.p3': '私たちの武器は、どぶ板営業です。問屋さんとの商談だけで終わらせず、一店舗一店舗に足を運び、お店の方々と顔の見える関係を築いています。商品が棚に並んでからが本当の勝負。売場を自分たちの目で確かめ、お店の声を拾い、次の一手につなげています。',
        'about.p4': 'そして御社がアメリカに支店や子会社を構えられた際には、私たちが培ってきた知識や人脈をすべて共有し、ともに成長していきたいと考えています。',
        'about.whyUs': 'Why Us',
        'about.why1.title': '徹底した現場主義',
        'about.why1.desc': 'データだけでは見えない店頭のリアルな状況や、バイヤーの生の声をもとに、泥臭く改善を繰り返します。',
        'about.why2.title': 'スピード感ある実行力',
        'about.why2.desc': '複雑な意思決定プロセスを排除し、テストマーケティングから本格導入まで、最短ルートで成果を追求します。',
        'about.why3.title': '日米両言語でのシームレスな連携',
        'about.why3.desc': '商談は英語で、貴社へのご報告は日本語で。言葉や文化の壁を感じさせない透明性の高いコミュニケーションを実現。',
    },
    en: {
        // Header / Nav
        'nav.about': 'About',
        'nav.contactUs': 'Contact Us',
        'nav.language': 'Language: JA / EN',

        // Footer
        'footer.description': 'Bringing Japanese food culture to America. Our sales-specialized team connects with distributors, retailers, restaurants, and liquor shops to build a sustainable sales infrastructure in the US market.',
        'footer.company': 'Company',
        'footer.aboutUs': 'About Us',
        'footer.contact': 'Contact',
        'footer.contactSection': 'Contact',
        'footer.contactDesc': 'Let\'s talk about expanding your sales channels and entering the US market.',
        'footer.inquiry': 'Get in Touch',
        'footer.rights': '© {year} Global Sales Force, Inc. All rights reserved.',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',

        // Homepage — Hero
        'home.hero.title': 'Turn Your Brand Into a Sustainable Business in the US Market.',
        'home.hero.subtitle': 'Our dedicated sales team connects distributors, retailers, and restaurants to steadily grow your brand\'s reach, revenue, and recognition in America.',
        'home.hero.cta': 'Contact Us',

        // Homepage — Our Focus
        'home.focus.title': 'Our Focus',
        'home.focus.subtitle': 'From entering the US market to scaling your existing business—we provide hands-on, field-first support every step of the way.',
        'home.focus.channel.title': 'Channel Development',
        'home.focus.channel.desc': 'Leveraging our network of local distributors, retail chains, and food service operators, we build the optimal sales channel for your products from the ground up—creating a system that keeps selling.',
        'home.focus.sales.title': 'Sales Representation',
        'home.focus.sales.desc': 'Our bilingual sales team handles negotiations and meetings on your behalf at the front lines. Beyond representation, we manage shelf placement and display rollouts to ensure your products actually move in the market.',
        'home.focus.expand.title': 'Market Activation & Growth',
        'home.focus.expand.desc': 'Real market-building begins after launch. We continuously manage store rollouts, shelf improvements, and distribution relationships to keep your brand growing and established.',

        // Homepage — How We Work
        'home.how.title': 'How we grow together',
        'home.how.subtitle': 'Our process for driving market growth from the field',
        'home.how.step1.title': 'Understand the Market',
        'home.how.step1.desc': 'We assess the competitive landscape, retail channels, and on-the-ground realities to identify where your product has the best potential.',
        'home.how.step2.title': 'Build the Right Setup',
        'home.how.step2.desc': 'We structure pricing, channel strategy, and pitch frameworks to position your product for success in the US market.',
        'home.how.step3.title': 'Activate the Market',
        'home.how.step3.desc': 'We execute buyer meetings, launch negotiations, shelf setup, and display installations to get your product moving in the real world.',
        'home.how.step4.title': 'Operate the Market',
        'home.how.step4.desc': 'We continuously manage inventory, promotions, and in-store conditions to keep your brand selling consistently.',
        'home.how.step5.title': 'Accelerate Growth',
        'home.how.step5.desc': 'We iterate based on sales data and field insights, accelerating the transition from launch to full-scale expansion.',

        // Homepage — CTA
        'home.cta.title': 'Drive the US Market—From the Field.',
        'home.cta.subtitle': 'We don\'t stop at strategy. From negotiations and shelf-building to distributor partnerships, we are your on-the-ground partner every step of the way.',
        'home.cta.button': 'Send Us an Email',

        // About Page
        'about.eyebrow': 'Our Mission Statement',
        'about.title': '"Introducing Japanese food to America and building a culture around it."',
        'about.p1': 'Sushi, Ramen, Izakaya—these are words that are now used naturally in English. They didn\'t spread on their own. Behind them were Japanese people who crossed the ocean to spread them. You only live once, and we want to be the driving force that turns the next Japanese food into an "English" word.',
        'about.p2': 'There are many manufacturers who want to expand into America but hesitate due to reasons like manpower, costs, or lack of know-how. We sell these manufacturers\' products in America, build a foundation of sales, and work together to prepare for full-scale expansion.',
        'about.p3': 'Our strongest weapon is grassroots sales. We don\'t just stop at negotiations with distributors; we visit each and every store to build face-to-face relationships with the staff. The real battle begins after the product is on the shelf. We check the sales floor with our own eyes, gather the voices of the stores, and connect them to our next move.',
        'about.p4': 'And when your company is ready to establish a branch or subsidiary in America, we will share all the knowledge and networks we have cultivated, so that we can grow together.',
        'about.whyUs': 'Why Us',
        'about.why1.title': 'Field-First Approach',
        'about.why1.desc': 'We go beyond data to understand the real conditions on the shelf and hear directly from buyers, relentlessly iterating to improve.',
        'about.why2.title': 'Speed & Execution',
        'about.why2.desc': 'We cut through complex decision-making and pursue results at the fastest possible pace—from test marketing to full-scale launch.',
        'about.why3.title': 'Seamless Bilingual Partnership',
        'about.why3.desc': 'Negotiations in English, reporting to you in Japanese. We deliver transparent, high-quality communication with no language or culture barriers.',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('ja');

    useEffect(() => {
        const stored = localStorage.getItem('gsf-lang') as Lang | null;
        if (stored === 'ja' || stored === 'en') {
            setLangState(stored);
        }
    }, []);

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        localStorage.setItem('gsf-lang', newLang);
    };

    const t = (key: string): string => {
        return translations[lang][key] ?? translations['ja'][key] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
