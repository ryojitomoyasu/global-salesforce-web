// ============================================================
// おすすめ本リスト
// ============================================================
// Amazonアソシエイト登録後、以下の手順でリンクを差し替えてください:
//
// 1. Amazonアソシエイトにログイン
// 2. 各本のAmazonページを開く
// 3. 「テキストリンクを取得」からURLをコピー
//    例: https://www.amazon.co.jp/dp/XXXXXXXXXX?tag=あなたのID-22
// 4. 下の affiliateUrl を差し替える
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
    "ビジネス・マーケティング",
    "食品・飲食業界",
    "英語・語学",
    "自己啓発",
] as const;

export const books: Book[] = [
    {
        id: "1",
        title: "エクスポート・マーケティング入門",
        author: "著者名",
        publisher: "出版社",
        year: "2023",
        category: "ビジネス・マーケティング",
        description: "米国市場への輸出戦略とチャネル開拓の基礎を解説した一冊。",
        comment: "米国進出を検討している方には特に参考になります。チャネル設計の考え方が実践的でした。",
        coverUrl: "",
        affiliateUrl: "https://www.amazon.co.jp/", // ← ここをアソシエイトURLに差し替え
    },
    {
        id: "2",
        title: "売れる商品の作り方",
        author: "著者名",
        publisher: "出版社",
        year: "2022",
        category: "ビジネス・マーケティング",
        description: "バイヤー視点から見た「棚に並ぶ商品」の条件を解説。",
        comment: "食品メーカーの方に特におすすめ。バイヤーが何を見ているかがよく分かります。",
        coverUrl: "",
        affiliateUrl: "https://www.amazon.co.jp/",
    },
    {
        id: "3",
        title: "世界で通じる英語のビジネスコミュニケーション",
        author: "著者名",
        publisher: "出版社",
        year: "2021",
        category: "英語・語学",
        description: "ビジネスシーンで使える英語表現を場面別に紹介。",
        comment: "英語での商談や交渉に役立つフレーズが豊富。手元に置いておくと便利です。",
        coverUrl: "",
        affiliateUrl: "https://www.amazon.co.jp/",
    },
];
