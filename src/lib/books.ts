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
    {
        id: "2",
        title: "孫正義　300年王国への野望（下）",
        author: "杉本貴司",
        publisher: "日経ビジネス人文庫",
        year: "2024",
        category: "経営者",
        description: "ソフトバンクグループを率いる孫正義の壮大なビジョンと、300年続く企業を作るという野望に迫る傑作ノンフィクションの完結編。",
        comment: "夢を追いかけながら、いつも一緒に夢を追いかける仲間を増やしていく孫さん。そうして人を巻き込み、時代を読み、何十手先もの布石を打つ姿を、自分という人間と照らし合わせながら読ませてもらいました。偉大な先駆者の「次の一手」の打ち方は、僕自身の未来の描き方を深く見つめ直すきっかけをくれました。",
        coverUrl: "/books/son-masayoshi-300-2.jpg",
        affiliateUrl: "https://amzn.to/4veu909",
    },
    {
        id: "3",
        title: "明鏡",
        author: "イケハヤ",
        category: "ビジネス・マーケティング",
        description: "「マーケティングはこの一冊でいいです。」と言い切る著者による、これからのマーケティングの集大成。",
        comment: "僕がバイブコーディングを知るきっかけになり、使えるようになったのはこの筆者イケハヤさんのラジオを聞いてたおかげです。この人のマーケティングは超一流と思っていたところ名境という本を出版されました。「マーケティングはこの一冊でいいです。」という著者の一言でこの本を購入することにしました。購入したばかりなので、感想を書く前に共有しておきます。",
        coverUrl: "/books/meikyo.png",
        affiliateUrl: "https://brmk.io/npZk2z",
    },
];
