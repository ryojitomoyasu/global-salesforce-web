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
    authorEn?: string;
    publisher?: string;
    publisherEn?: string;
    year?: string;
    category: string;
    description: string;
    descriptionEn?: string; // 紹介文の英語版
    comment: string; // あなた自身のコメント
    commentEn?: string; // コメントの英語版（英語表示のときに使われます）
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

// カテゴリの英語表示名（カテゴリを増やしたらここにも追加してください）
export const BOOK_CATEGORY_LABELS_EN: Record<string, string> = {
    "すべて": "All",
    "経営者": "Business Leaders",
    "ビジネス・マーケティング": "Business & Marketing",
    "食品・飲食業界": "Food & Restaurant Industry",
    "英語・語学": "English & Languages",
    "自己啓発": "Self-Development",
};

export const books: Book[] = [
    {
        id: "1",
        title: "孫正義　300年王国への野望（上）",
        titleEn: "Masayoshi Son: Ambition for a 300-Year Kingdom (Vol. 1)",
        author: "杉本貴司",
        authorEn: "Takashi Sugimoto",
        publisher: "日経ビジネス人文庫",
        publisherEn: "Nikkei Business Bunko",
        year: "2024",
        category: "経営者",
        description: "ソフトバンクグループを率いる孫正義の壮大なビジョンと、300年続く企業を作るという野望に迫るノンフィクション。",
        descriptionEn: "A nonfiction work that explores the grand vision of Masayoshi Son, the leader of SoftBank Group, and his ambition to build a company that lasts 300 years.",
        comment: "孫正義氏が世界をどう見ているのか。ITの世界をどう見据え、どの事業を押さえれば勝負に勝てるのか——。孫さんのものの見方・考え方の一端に触れることができました。我々も300年先を見据えて食品業界の未来を考え、今どう事業を展開していくべきか、どんなサービスを打ち出し、何を押さえておくべきか。そんなことを深く考えさせられた一冊です。",
        commentEn: "How does Masayoshi Son see the world? How does he look ahead at the IT industry, and which businesses does he believe you must secure in order to win? This book gave me a glimpse into his way of seeing and thinking. It made me reflect deeply on how we, too, should look 300 years ahead at the future of the food industry: how to grow our business today, what services to launch, and what ground we need to secure.",
        coverUrl: "/books/son-masayoshi-300.jpg",
        affiliateUrl: "https://amzn.to/4weoF6z",
    },
    {
        id: "2",
        title: "孫正義　300年王国への野望（下）",
        titleEn: "Masayoshi Son: Ambition for a 300-Year Kingdom (Vol. 2)",
        author: "杉本貴司",
        authorEn: "Takashi Sugimoto",
        publisher: "日経ビジネス人文庫",
        publisherEn: "Nikkei Business Bunko",
        year: "2024",
        category: "経営者",
        description: "ソフトバンクグループを率いる孫正義の壮大なビジョンと、300年続く企業を作るという野望に迫る傑作ノンフィクションの完結編。",
        descriptionEn: "The concluding volume of this acclaimed nonfiction work on the grand vision of Masayoshi Son, the leader of SoftBank Group, and his ambition to build a company that lasts 300 years.",
        comment: "夢を追いかけながら、いつも一緒に夢を追いかける仲間を増やしていく孫さん。そうして人を巻き込み、時代を読み、何十手先もの布石を打つ姿を、自分という人間と照らし合わせながら読ませてもらいました。偉大な先駆者の「次の一手」の打ち方は、僕自身の未来の描き方を深く見つめ直すきっかけをくれました。",
        commentEn: "While chasing his dream, Son-san keeps adding more people who chase that dream alongside him. I read this book holding myself up against the way he draws people in, reads the times, and makes moves dozens of steps ahead. Seeing how a great pioneer plays his \"next move\" pushed me to take a hard look at how I picture my own future.",
        coverUrl: "/books/son-masayoshi-300-2.jpg",
        affiliateUrl: "https://amzn.to/4veu909",
    },
    {
        id: "3",
        title: "明鏡",
        titleEn: "Meikyo",
        author: "イケハヤ",
        authorEn: "Ikehaya",
        category: "ビジネス・マーケティング",
        description: "「マーケティングはこの一冊でいいです。」と言い切る著者による、これからのマーケティングの集大成。",
        descriptionEn: "A comprehensive guide to the future of marketing, from an author who states flatly: \"This one book is all you need for marketing.\"",
        comment: "僕がバイブコーディングを知るきっかけになり、使えるようになったのはこの筆者イケハヤさんのラジオを聞いてたおかげです。この人のマーケティングは超一流と思っていたところ名境という本を出版されました。「マーケティングはこの一冊でいいです。」という著者の一言でこの本を購入することにしました。購入したばかりなので、感想を書く前に共有しておきます。",
        commentEn: "I first learned about vibe coding, and learned how to actually use it, thanks to listening to the radio show of this book's author, Ikehaya. Just as I was thinking his marketing was truly first-class, he published this book, Meikyo. His one line, \"This one book is all you need for marketing,\" convinced me to buy it. I have only just bought it, so I am sharing it here before writing my full impressions.",
        coverUrl: "/books/meikyo.png",
        affiliateUrl: "https://brmk.io/npZk2z",
    },
];
