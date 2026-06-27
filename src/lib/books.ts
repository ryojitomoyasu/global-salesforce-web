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
        comment: "孫正義氏が世界をどう見ているのか。ITの世界をどう見据え、どの事業を押さえれば勝負に勝てるのか——。孫さんのものの見方・考え方の一端に触れることができました。我々も300年先を見据えて食品業界の未来を考え、今どう事業を展開していくべきか、どんなサービスを打ち出し、何を押さえておくべきか。そんなことを深く考えさせられた一冊です。",
        coverUrl: "/books/son-masayoshi-300.jpg",
        affiliateUrl: "https://amzn.to/4weoF6z",
    },
];
