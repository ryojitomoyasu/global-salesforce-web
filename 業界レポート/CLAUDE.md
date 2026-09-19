# CLAUDE.md — GSF 業界レポート 制作システム

このリポジトリは **Global Sales Force, Inc.（GSF）業界情報室** が発行する、北米・アジア食品業界の
**週次PDFレポート**と、随時の**スペシャルレポート**を生成するための一式です。Claude Code はこのファイルを
最初に読み、以下の構成・規約・コマンドに従って作業してください。

## このプロジェクトが作るもの

1. **週次「業界レポート」** — 毎週金曜発行。A4・**3ページ固定**・日英併記・ロゴ入りのPDF。
   北米×アジア（日本・韓国・中国）の食品業界ニュースを要約する。
2. **スペシャルレポート** — 特定テーマの読み物（米国出店、国内スナック市場、棚代入門など）。
   同じGSFブランド配色を使うが、ページ数・レイアウトはテーマごとに専用スクリプトで組む。

すべて **各社公式発表・報道・調査会社などの公開情報のみ**で構成する（→「制作上のガードレール」）。

## ディレクトリ構成

```
業界レポート/
├── CLAUDE.md                     ← このファイル
├── gsf_pkg/                      ← 制作ツール一式（ここで作業する）
│   ├── generate_report.py        週次レポート生成器（JSON → 3ページPDF）
│   ├── styles.css                週次レポートの誌面デザイン（基本触らない）
│   ├── logo_datauri.txt          ロゴ画像（Base64・全スクリプト共通で読み込む）
│   ├── issue_Vol01.json 〜        各号の記事データ（雛形＝Vol01）
│   ├── WEEKLY_INSTRUCTIONS.md     週次発行の元手順書（人間向け）
│   ├── generate_special_sushiro.py   スペシャル：スシロー海外展開（カード型・自作）
│   ├── generate_special_snack.py     スペシャル：グミ/ポテチ国内市場（SVGグラフ入り）
│   ├── generate_slotting.py          スペシャル：スロッティングフィー（Markdown→整形PDF）
│   ├── slotting_body.md              スロッティングフィー本文（Markdown）
│   └── *.pdf / *.html            生成物（作業ディレクトリ内の中間ファイル）
└── PDF/
    └── YYYY-MM/                   ← 完成PDFの最終保存先（月別フォルダ）
```

- **完成PDFの正本は必ず `PDF/YYYY-MM/` に置く**（発行月のフォルダ。無ければ作成）。
- `gsf_pkg/` 内に残る PDF/HTML は生成時の中間ファイル。`PDF/` には HTML を入れない。

## 環境準備（初回のみ／CIでは毎回冒頭）

```bash
pip install weasyprint markdown --break-system-packages
apt-get install -y fonts-noto-cjk        # 日本語フォント（Noto Sans/Serif CJK JP）
```

PDF化は **WeasyPrint** で行う。1回の生成に **40〜50秒**かかることがあるため、対話環境では
バックグラウンド実行（`nohup ... &`＋ポーリング）を推奨。→「よくある落とし穴」参照。

## 週次レポートの作り方

手順の詳細な意図は `gsf_pkg/WEEKLY_INSTRUCTIONS.md` にある。実務フローは次のとおり。

1. **号数を採番**：`issue_Vol*.json` の最大番号 +1。ゼロ埋め2桁（例 08 → 09）。
2. **ニュース収集（Web検索）**：対象週（金曜締め）の最新情報を地域別に集める。
   構成の目安 — 北米(na) 5本（先頭がリード）／日本(jp) 3本／韓国(kr) 2本／中国(cn) 2本／
   トレンド帯(trends) 5項目／注目商品(products) 6点。
3. **JSON作成**：`issue_Vol01.json` を雛形に `issue_Vol{番号}.json` を作る（スキーマは下記）。
4. **生成**：`cd gsf_pkg && python3 generate_report.py issue_Vol{番号}.json`
   → `GSF_Industry_Report_Vol{番号}_{YYYY-MM-DD}.pdf`（と同名HTML）を出力。
5. **検品**：**必ず3ページ**であること（→「3ページに収める」）。ロゴ・日英併記・出典を目視確認。
6. **保存**：完成PDFを `PDF/{YYYY-MM}/` へコピー。

### issue_VolNN.json スキーマ

```jsonc
{
  "vol": "09",                       // ゼロ埋め2桁
  "date": "2026.08.21",              // 発行日（金曜）YYYY.MM.DD
  "week": "Aug 15 – Aug 21, 2026",   // 対象週レンジ
  "this_week": ["見出し1", ...4本],   // 1ページ目上部の帯
  "na": [ /* 5件。先頭がリード(art指定) */ ],
  "jp": [ /* 3件。先頭がリード */ ],
  "kr": [ /* 2件 */ ],
  "cn": [ /* 2件 */ ],
  "trends":   [ {"ja":"", "en":"", "ic":"latte"}, ...5件 ],
  "products": [ {"ja":"", "en":"", "ic":"soda", "region":"na", "tag":"US ・ ..."}, ...6件 ]
}
```

記事オブジェクト（na/jp/kr/cn の各要素）:
```jsonc
{
  "region": "na",                    // na/jp/kr/cn（色分けは自動）
  "art": "trade",                    // リード記事のみ。trade(北米)/summer(日本)等。未定義は簡易図
  "eyebrow": "TRADE ・ 通商",
  "ja": "日本語見出し", "en": "English headline",
  "ja_body": "日本語本文", "en_body": "英語本文",   // ★ja/enは同じ情報量にする（英語を短くしない）
  "src": "出典：〜",
  "stats": ["任意の数値チップ"]       // 省略可。行を増やすので3ページに収めたい時は外す
}
```
`trends[].ic` / `products[].ic` の絵キー：`chili, ube, popsicle, orange, cart, noodlebowl,
matcha_m, latte, soda, onigiri`。

### 固定仕様（変更しない）

- ブランドカラー：レッド `#C91F26` / ネイビー `#2C415E`。地域色：北米=ネイビー / 日本=レッド /
  韓国=`#3E6493` / 中国=`#B0842C`。
- レイアウト：1枚目=北米、2枚目=日本・韓国、3枚目=中国＋トレンド帯＋注目商品。
- 編集メモ固定文：「本誌は各社公式発表・報道など公開情報のみを要約」。
- `styles.css` は原則触らない。溢れは本文量で調整する。

### 3ページに収める（重要）

`generate_report.py` は各地域を `.pb`（改ページ）で区切るが、本文が長いと各ページが物理的に
あふれて4〜5ページになる。**3ページに収まるまで本文を詰める。** 目安（ja_body の文字数合計）:

- na ≈ 550 / jp ≈ 400 / kr ≈ 250 / cn ≈ 270（＝3ページに収まった実績値。Vol03 相当）
- 半カード（リード以外）は 1枚 ≈ 95〜110字が上限の目安。リードは ≈ 150〜165字。

詰め方の実務:
1. 生成後に必ずページ数を確認：
   ```bash
   python3 -c "import pypdf,glob; print(len(pypdf.PdfReader(glob.glob('*Vol{NN}*.pdf')[0]).pages))"
   ```
2. 4ページ以上なら、**溢れているページを画像化して目視**：
   ```bash
   pdftoppm -png -r 74 <pdf> /tmp/p   # p-1.png, p-2.png ... を Read で確認
   ```
3. よくあるのは「本文は収まっているがフッターだけ次ページに落ちる」パターン。その時は
   **リードの `stats` チップを外す**、または各半カードを1〜2行ずつ削ると収まる。
4. en_body も ja_body と同じだけ削る（情報量の対称を保つ）。

## スペシャルレポートの作り方

テーマごとに専用の生成スクリプトを作る。共通点は **`styles.css` の配色思想と `logo_datauri.txt`
を流用**し、GSFブランドの見た目を保つこと。既存の3本がテンプレになる:

- `generate_special_sushiro.py` … 週次と同じカード型レイアウトを流用（地域色クラス na/jp/kr を転用）。
  ページ数は3。**米国重点**など章立てを変えたい時のひな形。
- `generate_special_snack.py` … 3ページ目に **SVGの棒グラフ／横棒グラフ**を自作して同梱。
  データ可視化を入れたい時のひな形。
- `generate_slotting.py` … **Markdown（`slotting_body.md`）→ python-markdown → ブランドCSS → PDF**。
  章数の多い長文レポート向け。ページ数は内容に応じて可変。本文編集は `.md` 側だけで完結する。

長文・章立ての読み物は `generate_slotting.py` 方式（Markdown駆動）が最も編集しやすい。
グラフや数表が主役なら `generate_special_snack.py` 方式。

## 生成・検品の定番コマンド

```bash
cd gsf_pkg

# 週次
python3 generate_report.py issue_Vol09.json

# スペシャル（該当スクリプト）
python3 generate_slotting.py

# ページ数チェック
python3 -c "import pypdf; print(len(pypdf.PdfReader('<file>.pdf').pages))"

# 目視用に画像化（Read ツールで開く）
pdftoppm -png -r 74 '<file>.pdf' /tmp/preview

# 完成後：月別フォルダへ保存
cp '<file>.pdf' ../PDF/$(date +%Y-%m)/
```

## 自動発行（スケジュールタスク）

- Cowork 側に **毎週金曜 8時台**の自動実行タスク（`gsf-weekly-industry-report`）が登録済み。
  ニュース収集→JSON作成→PDF生成→`PDF/YYYY-MM/` 保存までを自動で行う。
- 過去に、重い **PDF変換段階で実行が途中終了**し JSON/HTML はあるが PDF 未生成、という失敗があった。
  その場合は既存の `issue_Vol{番号}.json` から `generate_report.py` で **PDF化だけ再実行**すればよい。
- Claude Code はこのスケジュール自体は管理しない（Cowork側の機能）。スクリプトとデータの保守が担当。

## 制作上のガードレール

- **公開情報のみ。** 顧客ブランド（例：ITO EN、Calbee、Sun Noodle 等）に触れる場合も、各社の公式発表・
  報道・公開データだけを使う。**社内資料・売上・取引・数量など非公開情報は一切載せない。**
- 数字は出典を併記し、古いデータ（例：FTCの2000年代データ）は「方向性の目安」と明記する。
- 日英併記のレポートでは、英語本文を日本語より短くしない。

## よくある落とし穴（過去の教訓）

- **WeasyPrint が遅い（40〜50秒）**：同期実行だとタイムアウトしやすい。バックグラウンド実行して
  ログとページ数をポーリングで確認する：
  ```bash
  nohup python3 generate_report.py issue_Vol09.json > /tmp/gen.log 2>&1 &
  sleep 45; cat /tmp/gen.log
  ```
- **絵文字の字形化け**：`✅` は Noto CJK で豆腐（□）になる。`◎` など通常記号に置き換える。`⚠` は可。
- **フッターだけ次ページに落ちる**：本文はほぼ収まっているのに1行分溢れているサイン。`stats` を外すか
  半カードを1行削れば3ページに収まる。
- **OneDrive同期フォルダ**：クラウドのみのファイルは bash で見えないことがある。個別 Read で取得できる。
- **円換算などの概算**は「※1ドル○円で概算」と必ず注記する。

## 命名規約

- 週次：`GSF_Industry_Report_Vol{NN}_{YYYY-MM-DD}.pdf`
- スペシャル：`GSF_Special_Report_{テーマ}_{YYYY-MM-DD}.pdf`
  （スロッティングフィーのみ既存踏襲で `GSF_Report_スロッティングフィー_{日付}.pdf`）
