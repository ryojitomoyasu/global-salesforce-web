# GSF 業界レポート ― 週次発行タスク（Cowork用）

**発行:** 毎週水曜　**担当:** Cowork（Claude）　**成果物:** A4・3ページPDF（日英併記・ロゴ入り）
**保存先:** ユーザーが都度Coworkに指示するGoogle Driveフォルダ

---

## パッケージ構成
| ファイル | 役割 |
|---|---|
| `generate_report.py` | JSON → 3ページPDF を生成するスクリプト |
| `styles.css` | 誌面デザイン（レッド #C91F26 / ネイビー #2C415E、A4・3ページ） |
| `logo_datauri.txt` | ロゴ画像（Base64・埋め込み用） |
| `issue_Vol01.json` | 記事データの雛形（前号／サンプル） |
| `WEEKLY_INSTRUCTIONS.md` | 本ファイル |

## 初回のみ（環境準備）
```bash
pip install weasyprint --break-system-packages
apt-get install -y fonts-noto-cjk   # 日本語フォント
```

---

## 毎週の手順

### 1. ニュース収集（Web検索）
北米・日本・韓国・中国の食品業界について、**その週〜その月**の最新ニュースと流行商品を、地域ごとに個別に検索して集める。目安の構成:
- **北米（na）** … 5本（先頭がリード記事）：通商/規制/物価/M&A/政策/トレンドなど
- **日本（jp）** … 3本（先頭がリード）：新商品/値上げ/輸出/季節商戦など
- **韓国（kr）** … 2本：Kフード輸出/流行など
- **中国（cn）** … 2本：機能性/小売/輸入など
- **トレンド帯（trends）** … 5項目（北米で伸びている味・商品）
- **注目商品（products）** … 6点（各地域の“今きてる”商品）

### 2. 【重要】顧客情報の取り扱い
取扱先（**ITO EN／Calbee など顧客ブランド**）に触れる場合は、**各社の公式発表・報道・公開データなどパブリックな公開情報のみ**を使用する。
**社内資料・売上・取引・アカウント・数量など非公開情報は一切載せない。**

### 3. データ化（JSON作成）
`issue_Vol01.json` を複製し、`issue_Vol{番号}.json` として今週分を記入。
- `vol` … 前号+1（前回=01 → 次は02）
- `date` … 発行日 `YYYY.MM.DD`（毎週水曜）
- `week` … 対象週 例 `Jul 7 – Jul 13, 2026`
- `this_week` … 見出しトピック4本
- 各記事オブジェクト:
  ```json
  {"region":"na","eyebrow":"TRADE ・ 通商","ja":"見出し","en":"English headline",
   "ja_body":"日本語本文","en_body":"English body（日本語と同じ情報量にする）",
   "src":"出典：〜","stats":["任意の数値チップ"],"art":"trade"}
  ```
  - **`ja_body` と `en_body` は必ず同じ情報量**にする（英語を短くしない）。
  - `art`（リード記事の絵）… `trade`（北米）/`summer`（日本）ほか。未定義キーは自動でシンプル図に。
  - `region` … `na`/`jp`/`kr`/`cn`（色分けは自動）。
- `trends[].ic` / `products[].ic` の絵キー … `chili, ube, popsicle, orange, cart, noodlebowl, matcha_m, latte, soda, onigiri`

### 4. PDF生成
```bash
python3 generate_report.py issue_Vol{番号}.json
```
→ `GSF_Industry_Report_Vol{番号}_{YYYY-MM-DD}.pdf`（と同名HTML）を出力。

### 5. 検品
- ページ数が **3ページ** であること（溢れて4ページになっていないか）。
- 万一あふれた場合は本文をやや短く調整して再生成（`styles.css` は基本触らない）。
- ロゴ・日英併記・出典が入っているか目視確認。

### 6. 保存
生成PDFを、ユーザー指定のGoogle Driveフォルダへ保存（ファイル名はそのまま）。

---

## 固定仕様（変更しない）
- ブランドカラー: レッド `#C91F26` / ネイビー `#2C415E`
- 地域色: 北米=ネイビー / 日本=レッド / 韓国=`#3E6493` / 中国=`#B0842C`
- レイアウト: 1枚目=北米、2枚目=日本・韓国、3枚目=中国＋トレンド帯＋注目商品
- 誌面の編集メモは「本誌は各社公式発表・報道など公開情報のみを要約」で固定
