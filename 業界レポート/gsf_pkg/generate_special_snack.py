#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GSF スペシャルレポート – グミ＆ポテトチップス 国内市場特集
------------------------------------------------
styles.css / logo_datauri.txt を流用し、GSF誌面デザインで A4・3ページ。
3ページ目に市場規模推移・チャネル構成比のSVGグラフを同梱。
出力: GSF_Special_Report_グミ・ポテチ国内市場_YYYY-MM-DD.pdf
"""
import os, html
from weasyprint import HTML

HERE = os.path.dirname(os.path.abspath(__file__))
DATE = "2026.07.19"
NAVY, RED, BLUE, GOLD = '#2C415E', '#C91F26', '#3E6493', '#B0842C'
HEX = {'na': NAVY, 'jp': RED, 'kr': BLUE}

def esc(t): return html.escape(str(t), quote=False)

BANNER = (
 '<svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">'
 '<rect width="210" height="150" fill="#F8E2E3"/>'
 # gummy bears
 '<g fill="#C91F26">'
 '<circle cx="52" cy="52" r="9"/><circle cx="46" cy="44" r="4"/><circle cx="58" cy="44" r="4"/>'
 '<rect x="45" y="56" width="14" height="18" rx="6"/></g>'
 '<g fill="#2C415E" opacity=".85">'
 '<circle cx="86" cy="60" r="9"/><circle cx="80" cy="52" r="4"/><circle cx="92" cy="52" r="4"/>'
 '<rect x="79" y="64" width="14" height="18" rx="6"/></g>'
 # chips bowl
 '<path d="M120 74h70l-8 30a10 10 0 01-10 8h-34a10 10 0 01-10-8z" fill="#fff" stroke="#2C415E" stroke-width="3"/>'
 '<path d="M132 74l8-20m14 20l4-24m14 24l10-18m10 18l14-14" stroke="#B0842C" stroke-width="4" stroke-linecap="round" fill="none"/>'
 '<text x="24" y="118" font-family="monospace" font-size="13" font-weight="700" fill="#2C415E">SNACKS JP</text>'
 '</svg>'
)

def card(s, lead=False):
    r = s['region']
    cls = f'card {r}' + (' lead' if lead else '')
    stats = ''
    if s.get('stats'):
        stats = '<div class="stats">' + ''.join(f'<span class="stat">{esc(x)}</span>' for x in s['stats']) + '</div>'
    art = f'<div class="art">{BANNER}</div>' if lead else ''
    body = (f'<div class="eb">{esc(s["eyebrow"])}</div>'
            f'<div class="hja">{esc(s["ja"])}</div>'
            f'<div class="hen">{esc(s["en"])}</div>'
            f'{stats}'
            f'<div class="bja">{esc(s["ja_body"])}</div>'
            f'<div class="ben">{esc(s["en_body"])}</div>'
            f'<div class="src">{esc(s["src"])}</div>')
    if lead:
        return f'<div class="{cls}">{art}<div class="txt">{body}</div></div>'
    return f'<div class="{cls}" style="width:50%;">{body}</div>'

def rows_of_two(cards_list):
    out, i = '', 0
    while i < len(cards_list):
        out += '<div class="row">' + ''.join(cards_list[i:i+2]) + '</div>'
        i += 2
    return out

def head(r, ja, en, n, unit='TOPICS'):
    return (f'<div class="region"><span class="sw" style="background:{HEX[r]}"></span>'
            f'<span class="rn">{ja}<em>（{en}）</em></span><span class="rl"></span>'
            f'<span class="rc">{n:02d} {unit}</span></div>')

# ---------- SVG charts ----------
def bar_market():
    """グミ市場規模 2021→2024 (億円)"""
    data = [("2021", 635), ("2022", 803), ("2023", 971), ("2024", 1138)]
    mx = 1200
    W, H, base, top = 300, 168, 138, 20
    bw, gap = 46, 20
    x0 = 24
    bars = ''
    for i, (yr, v) in enumerate(data):
        h = (v / mx) * (base - top)
        x = x0 + i * (bw + gap)
        y = base - h
        col = RED if yr == "2024" else '#E4A6A9'
        bars += (f'<rect x="{x}" y="{y:.1f}" width="{bw}" height="{h:.1f}" rx="3" fill="{col}"/>'
                 f'<text x="{x+bw/2}" y="{y-4:.1f}" font-family="monospace" font-size="11" font-weight="700" fill="#2C415E" text-anchor="middle">{v}</text>'
                 f'<text x="{x+bw/2}" y="{base+14}" font-family="monospace" font-size="10" fill="#57616F" text-anchor="middle">{yr}</text>')
    return (f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">'
            f'<line x1="{x0-6}" y1="{base}" x2="{W-10}" y2="{base}" stroke="#DBDFE7" stroke-width="1.4"/>'
            f'{bars}</svg>')

def bar_channel():
    """コンビニ構成比 by category (%)"""
    data = [("グミ", 48.1, RED), ("ガム", 38.2, NAVY), ("キャンディ", 26.9, BLUE)]
    mx = 55
    W, H = 300, 168
    x0, bw = 96, 176
    rows = ''
    for i, (lab, v, col) in enumerate(data):
        y = 26 + i * 46
        w = (v / mx) * bw
        rows += (f'<text x="{x0-10}" y="{y+16}" font-family="\'Noto Sans CJK JP\'" font-size="11" font-weight="700" fill="#2C415E" text-anchor="end">{lab}</text>'
                 f'<rect x="{x0}" y="{y}" width="{bw}" height="22" rx="4" fill="#EEF1F6"/>'
                 f'<rect x="{x0}" y="{y}" width="{w:.1f}" height="22" rx="4" fill="{col}"/>'
                 f'<text x="{x0+w+6:.1f}" y="{y+16}" font-family="monospace" font-size="11" font-weight="700" fill="{col}">{v}%</text>')
    return f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">{rows}</svg>'

def chart_card(region, eyebrow, ja, en, svg, caption, src):
    return (f'<div class="card {region}" style="width:50%;">'
            f'<div class="eb">{esc(eyebrow)}</div>'
            f'<div class="hja" style="font-size:14px;">{esc(ja)}</div>'
            f'<div class="hen">{esc(en)}</div>'
            f'<div class="chart">{svg}</div>'
            f'<div class="ben" style="border-top:none;padding-top:2px;">{esc(caption)}</div>'
            f'<div class="src">{esc(src)}</div></div>')

def strip(title, en, items):
    flav = ''.join(
        f'<div class="flav kp"><b>{esc(t["ja"])}</b><span>{esc(t["en"])}</span>'
        f'<span class="kpd">{esc(t["d"])}</span></div>' for t in items)
    return (f'<div class="strip"><h3>{title} <em>{en}</em></h3>'
            f'<div class="flav-row">{flav}</div></div>')

def metrics(title, en, items):
    meds = ''
    for p in items:
        meds += (f'<div class="med {p["region"]}"><div class="disc"><span class="num">{esc(p["num"])}</span></div>'
                 f'<b>{esc(p["ja"])}</b><div class="en">{esc(p["en"])}</div></div>')
    return (f'<div class="potw"><h3>{title}</h3><em>{en}</em>'
            f'<div class="med-row">{meds}</div></div>')

FOOT_PUB = '発行：<b>Global Sales Force, Inc. 業界情報室</b> ／ 本誌は各社公式発表・報道・調査会社の公開情報のみを要約'

# ================= CONTENT =================
GUMMY = [
 {"region":"na","eyebrow":"MARKET ・ 市場",
  "ja":"グミ市場、7年で2倍 ─ 2024年に1,138億円でガムを逆転",
  "en":"Gummy market doubles in 7 years — ¥113.8B in 2024, past gum",
  "ja_body":"国内グミ市場は2024年に前年比+17%の1,138億円と初めて1,000億円を突破し、7年前の約2倍に拡大。すでにガム市場を逆転した。2021年の635億円から3年で約1.8倍に伸び、2025年も1〜9月で金額・数量とも前年同期比+10%超と勢いは衰えていない。菓子カテゴリー随一の成長株だ。",
  "en_body":"Japan's gummy market grew 17% to ¥113.8 billion in 2024, topping ¥100 billion for the first time and roughly doubling from seven years earlier — already overtaking gum. From ¥63.5 billion in 2021 it rose about 1.8x in three years, and January–September 2025 was still up over 10% in both value and volume. It is the fastest grower in confectionery.",
  "src":"出典：日本経済新聞／日本食糧新聞"},
 {"region":"na","eyebrow":"WHY ・ 拡大の理由",
  "ja":"噛む・低カロリー・機能性 ─ 幅広い世代に定着",
  "en":"Chewy, low-calorie, functional — adopted across ages",
  "ja_body":"拡大の背景は、噛みごたえのある「ハードグミ」の人気、罪悪感の少ない低カロリー志向、GABAなど機能性表示の広がり、SNS映えする多彩なフレーバー、仕事や勉強の合間の“集中リフレッシュ”需要など。若者からシニアまで購買層が広がり、国民的おやつへと定着している。",
  "en_body":"Growth is driven by popular chewy 'hard gummies,' guilt-free low-calorie appeal, the spread of functional claims like GABA, photogenic flavor variety on social media, and 'refresh' demand during work or study. Buyers now span youth to seniors, making gummies a national everyday snack.",
  "src":"出典：東洋経済／ユニテックフーズ"},
 {"region":"na","eyebrow":"SUPPLY ・ 供給",
  "ja":"メーカー各社が増産体制 ─ 新工場・ライン増設が相次ぐ",
  "en":"Makers ramp up capacity — new plants and lines",
  "ja_body":"需要拡大を受け、明治・カンロ・UHA味覚糖など主要各社は増産投資を進める。新ラインや工場増設で供給力を高め、ハードグミや機能性グミの新商品投入も活発。売り場でも棚割りを拡大する動きが続き、供給と需要がともに市場を押し上げている。",
  "en_body":"To meet demand, major makers such as Meiji, Kanro and UHA are investing in capacity, adding lines and plants and launching new hard and functional gummies. Retailers keep expanding shelf space, so supply and demand together are lifting the market.",
  "src":"出典：日本食糧新聞／各社発表"},
 {"region":"na","eyebrow":"CHANNEL ・ 販路",
  "ja":"コンビニ構成比48.1% ─ ガム・キャンディを大きく上回る",
  "en":"48.1% of gummy sales at convenience stores — well above peers",
  "ja_body":"インテージによると、2025年のグミのコンビニ構成比は48.1%と売上の半分近くに達し、ガム38.2%、キャンディ26.9%を大きく上回る。手に取りやすい価格と新商品回転の速さがコンビニと好相性で、衝動購買を取り込む。一方、まとめ買いのスーパーやドラッグストアも伸び、販路は多様化している。",
  "en_body":"Per INTAGE, 48.1% of 2025 gummy sales came through convenience stores — near half, and far above gum (38.2%) and candy (26.9%). Accessible prices and fast product turnover suit convenience impulse buying. Meanwhile supermarkets and drugstores, favored for bulk buys, are also growing, diversifying the channels.",
  "src":"出典：インテージ 知るギャラリー"},
]

CHIPS = [
 {"region":"kr","eyebrow":"LEADER ・ 首位",
  "ja":"カルビーが過去最高益 ─ ポテチ国内シェア70.4%で堅調",
  "en":"Calbee hits record profit — 70.4% potato-chip share",
  "stats":["連結 +6.4%","国内 +5.8%","ポテチ share 70.4%"],
  "ja_body":"ポテトチップス最大手カルビーの2025年3月期は連結売上3,225億円（前年比+6.4%）、営業利益291億円（+6.5%）と過去最高を更新。値上げ効果と積極的なマーケティング、インバウンドの土産需要が寄与し国内は+5.8%。ポテトチップスの国内シェアは70.4%、スナック全体でも52.8%と圧倒的だ。",
  "en_body":"Calbee, the top potato-chip maker, posted record FY2025 (to March) results: consolidated sales of ¥322.5 billion (+6.4%) and operating profit of ¥29.1 billion (+6.5%). Price hikes, active marketing and inbound souvenir demand lifted domestic sales +5.8%. Its domestic share is 70.4% in potato chips and 52.8% in snacks overall.",
  "src":"出典：カルビー決算／J-marketing.net"},
 {"region":"kr","eyebrow":"MARKET ・ 市場",
  "ja":"スナック小売は2桁増 ─ 値上げ下でも数量堅調",
  "en":"Snack retail up double digits; volumes hold",
  "ja_body":"スナック菓子の小売金額は2023年に前年比+11.2%と2桁増。原材料高による相次ぐ値上げで単価が上がる一方、ポテトチップスやじゃがりこなど定番の販売数量は堅調に推移した。菓子市場全体も2022年度に1兆9,614億円へ拡大し、高付加価値化で単価が上がっている。",
  "en_body":"Snack retail value rose 11.2% in 2023, a double-digit gain. Repeated price hikes on higher input costs lifted unit prices, while volumes of staples like potato chips and Jagariko held firm. The overall confectionery market also expanded to ¥1.96 trillion in FY2022 as premiumization pushed prices up.",
  "src":"出典：流通ニュース／各種報道"},
 {"region":"kr","eyebrow":"CHANNEL ・ 販路",
  "ja":"スーパーが最大チャネル ─ コンビニも有力、ドラッグ台頭",
  "en":"Supermarkets largest; convenience strong, drugstores rising",
  "ja_body":"ポテトチップスなど塩味スナックは、まとめ買いに強いスーパーが最大の販売チャネルで、コンビニも衝動購買の有力チャネル。近年は価格訴求のドラッグストアが台頭し、菓子・食品全体の金額構成比は2020年の9.59%から2024年に11.87%へ上昇。スーパー・コンビニ比率は低下傾向で、販路の分散が進む。",
  "en_body":"For potato chips and salty snacks, supermarkets — strong for bulk buys — are the largest channel, with convenience stores a key impulse channel. Value-focused drugstores have risen lately: their share of confectionery and food value rose from 9.59% in 2020 to 11.87% in 2024, while supermarket and convenience shares slipped, spreading sales across channels.",
  "src":"出典：マクロミル／atpress"},
 {"region":"kr","eyebrow":"NOTE ・ 補足",
  "ja":"チャネル別の厳密な構成比は非公開が多い",
  "en":"Exact channel splits are largely undisclosed",
  "ja_body":"グミはインテージがコンビニ構成比を公表する一方、ポテトチップス単体のスーパー対コンビニの精密な構成比は、有料の小売パネル調査（インテージSRI+など）が中心で無償公開は限られる。本誌は公表値と各社発表を用い、非公開の推計値は掲載していない。より精緻な業態別数値が必要な場合は有料データの参照が確実だ。",
  "en_body":"While INTAGE publishes gummies' convenience-store share, precise supermarket-vs-convenience splits for potato chips sit mainly in paid retail panels (e.g., INTAGE SRI+), with limited free disclosure. This report uses published figures and company releases and omits non-public estimates; paid data is the reliable route for finer channel numbers.",
  "src":"出典：インテージ SRI+（説明）"},
]

KEYPTS = [
 {"ja":"グミ","en":"CVS 48.1%","d":"半分近くがコンビニ"},
 {"ja":"ガム","en":"CVS 38.2%","d":"グミが逆転"},
 {"ja":"キャンディ","en":"CVS 26.9%","d":"スーパー比率高い"},
 {"ja":"ドラッグ","en":"9.6→11.9%","d":"菓子・食品で台頭"},
 {"ja":"ポテチ","en":"SUPER LED","d":"スーパーが最大"},
]

NUMS = [
 {"region":"na","num":"¥1,138億","ja":"グミ市場(2024)","en":"gummy market"},
 {"region":"na","num":"+17%","ja":"グミ前年比","en":"YoY 2024"},
 {"region":"na","num":"48.1%","ja":"グミ コンビニ比","en":"CVS share"},
 {"region":"kr","num":"70.4%","ja":"ポテチ国内シェア","en":"Calbee"},
 {"region":"kr","num":"¥3,225億","ja":"カルビー売上","en":"+6.4%"},
 {"region":"kr","num":"+11.2%","ja":"スナック小売","en":"2023 retail"},
]

def build_html():
    css = open(os.path.join(HERE, 'styles.css'), encoding='utf-8').read()
    logo = open(os.path.join(HERE, 'logo_datauri.txt'), encoding='utf-8').read().strip()
    css += ("\n.disc .num{font-family:'Noto Sans Mono',monospace;font-weight:900;color:var(--c);"
            "font-size:11px;line-height:1.03;text-align:center;padding:0 2px;}"
            "\n.flav.kp b{font-size:12px;} .flav.kp span{display:block;}"
            "\n.flav.kp .kpd{font-family:'Noto Sans CJK JP',sans-serif;color:#EEF1F6;font-size:9px;margin-top:4px;letter-spacing:0;}"
            "\n.chart{margin:6px 0 4px;} .chart svg{width:100%;height:auto;}")

    tw = ' '.join('・ ' + esc(x) for x in [
        "グミ市場7年で2倍・1,138億円", "ガムを逆転", "コンビニ構成比48.1%",
        "カルビー過去最高益・シェア70.4%"])

    g_lead = card(GUMMY[0], lead=True)
    g_rest = rows_of_two([card(s) for s in GUMMY[1:]])
    c_lead = card(CHIPS[0], lead=True)
    c_rest = rows_of_two([card(s) for s in CHIPS[1:]])

    chart_row = ('<div class="row">'
        + chart_card('na', 'DATA ・ 市場規模', 'グミ市場規模の推移（億円）',
                     'Gummy market size (¥100M)', bar_market(),
                     '2021年635億円→2024年1,138億円で約1.8倍。2024年は前年比+17%、2025年1〜9月も+10%超。※2022–23は線形補間の目安値。',
                     '出典：日本経済新聞／お菓子ライブラリ')
        + chart_card('jp', 'DATA ・ チャネル', 'カテゴリ別コンビニ構成比（2025年）',
                     'Convenience-store share by category', bar_channel(),
                     'グミは売上の48.1%がコンビニ経由でガム・キャンディを大きく上回る。裏返せばスーパー等の比率はガム・キャンディで相対的に高い。',
                     '出典：インテージ 知るギャラリー')
        + '</div>')

    p1 = f'''<div class="page">
  <div class="flag"><div class="flag-l"><img src="{logo}" alt="Global Sales Force">
    <div class="rep">業界レポート 特別号<small>SPECIAL REPORT ・ JAPAN SNACK MARKET — GUMMY &amp; POTATO CHIPS</small></div></div>
    <div class="stamp"><b>SPECIAL</b><br>{DATE}<br>Focus: JP Snacks</div></div>
  <div class="tw"><b>本号の要点 SPECIAL</b> {tw}</div>
  {head('na','グミ','GUMMY', len(GUMMY))}
  {g_lead}{g_rest}
  <div class="foot"><span>{FOOT_PUB}</span><span>SPECIAL ・ {DATE} ・ 01/03 グミ</span></div>
</div>'''

    p2 = f'''<div class="page pb">
  <div class="run"><b>JAPAN SNACK</b> ─ ポテトチップス／スナック菓子</div>
  {head('kr','ポテトチップス','POTATO CHIPS', len(CHIPS))}
  {c_lead}{c_rest}
  <div class="foot"><span>{FOOT_PUB}</span><span>SPECIAL ・ {DATE} ・ 02/03 ポテチ</span></div>
</div>'''

    p3 = f'''<div class="page pb">
  <div class="run"><b>DATA &amp; CHANNEL</b> ─ 売上の伸びとチャネル構成</div>
  {head('na','データで見る','DATA VIEW', 2, unit='CHARTS')}
  {chart_row}
  {strip('チャネルの要点', 'CHANNEL SNAPSHOT', KEYPTS)}
  {metrics('注目データ', 'KEY NUMBERS', NUMS)}
  <div class="foot"><span>編集メモ：本誌は各社公式発表・報道・調査会社の<b>公開情報のみ</b>を要約。非公開の推計値は含みません。</span><span>SPECIAL ・ 03/03</span></div>
</div>'''

    return f'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>{css}</style></head><body>{p1}{p2}{p3}</body></html>'

def main():
    out = build_html()
    stem = f"GSF_Special_Report_グミ・ポテチ国内市場_{DATE.replace('.', '-')}"
    with open(stem + '.html', 'w', encoding='utf-8') as f:
        f.write(out)
    HTML(string=out, base_url=HERE).write_pdf(stem + '.pdf')
    print('WROTE', stem + '.pdf')

if __name__ == '__main__':
    main()
