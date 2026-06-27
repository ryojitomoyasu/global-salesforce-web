// ============================================================
// おすすめ本リスト
// ============================================================
// 本を追加するには books 配列に新しいオブジェクトを追加してください。
// affiliateUrl: AmazonアソシエイトのURLを貼り付け（amzn.to の短縮URLでもOK）
// coverUrl: Amazon商品画像のURL（空白でも可 — 代替デザインが表示されます）
// ============================================================

export interface Book {
    id: string;
    title: string;
    titleEn?: string;
    author: string;
    publisher?: string;
    year?: string;
    category: string;
    description: string;
    comment: string; // あなた自身のコメント
    coverUrl?: string; // 書影URL（Amazonの画像URLなど）
    affiliateUrl: string; // AmazonアソシエイトURL
}

export const BOOK_CATEGORIES = [
    "すべて",
    "経営者",
    "ビジネス・マーケティング",
    "食品・飲食業界",
    "英語・語学",
    "自己啓発",
] as const;

export const books: Book[] = [
    {
        id: "1",
        title: "孫正義　300年王国への野望（上）",
        author: "杉本貴司",
        publisher: "日経ビジネス人文庫",
        year: "2024",
        category: "経営者",
        description: "ソフトバンクグループを率いる孫正義の壮大なビジョンと、300年続く企業を作るという野望に迫るノンフィクション。",
        comment: "孫正義がどのように世界を見ているか、ITの世界をどのように見据えて、どの事業を抑えていけばこの勝負に勝てるのか。孫さんものの見方、考え方を垣間見ることが出来ました。我々は300年先を見据え、この食品業界の未来を考え、今どのように事業展開をしていくべきか、どのようなサービスを展開し、何を抑えないといけないかを考えさせられた1冊です。",
        coverUrl: "/books/son-masayoshi-300.jpg",
        affiliateUrl: "https://amzn.to/4weoF6z",
    },
];
