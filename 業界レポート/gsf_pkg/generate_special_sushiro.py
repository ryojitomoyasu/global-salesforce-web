#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GSF スペシャルレポート – スシロー海外展開特集（米国重点）
------------------------------------------------
styles.css / logo_datauri.txt を流用し、週次レポートと同じGSF誌面デザインで
A4・3ページのHTML/PDFを生成する。内容はスクリプト内に定義（公開情報のみ）。

出力: GSF_Special_Report_スシロー海外展開_YYYY-MM-DD.pdf
"""
import os, html
from weasyprint import HTML

HERE = os.path.dirname(os.path.abspath(__file__))
DATE = "2026.07.19"

HEX = {'na': '#2C415E', 'jp': '#C91F26', 'kr': '#3E6493'}

def esc(t): return html.escape(str(t), quote=False)

# ---- lead banner (sushi on conveyor belt, viewBox 210x150) ----
BANNER = (
 '<svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">'
 '<rect width="210" height="150" fill="#E7EAF1"/>'
 '<rect x="18" y="104" width="174" height="12" rx="6" fill="#2C415E" opacity=".18"/>'
 '<g>'
 '<ellipse cx="60" cy="100" rx="24" ry="7" fill="#2C415E" opacity=".25"/>'
 '<rect x="44" y="84" width="32" height="12" rx="6" fill="#fff" stroke="#2C415E" stroke-width="2.4"/>'
 '<path d="M46 84c4-9 26-9 30 0z" fill="#C91F26"/>'
 '</g>'
 '<g>'
 '<ellipse cx="118" cy="100" rx="24" ry="7" fill="#2C415E" opacity=".25"/>'
 '<rect x="102" y="84" width="32" height="12" rx="6" fill="#fff" stroke="#2C415E" stroke-width="2.4"/>'
 '<path d="M104 84c4-9 26-9 30 0z" fill="#2C415E"/>'
 '</g>'
 '<g>'
 '<ellipse cx="176" cy="100" rx="20" ry="6" fill="#2C415E" opacity=".25"/>'
 '<rect x="162" y="86" width="28" height="10" rx="5" fill="#fff" stroke="#2C415E" stroke-width="2.4"/>'
 '<path d="M164 86c3-7 22-7 24 0z" fill="#C91F26"/>'
 '</g>'
 '<path d="M150 34l16 12-16 12" fill="none" stroke="#C91F26" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>'
 '<path d="M132 34l16 12-16 12" fill="none" stroke="#2C415E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>'
 '<text x="26" y="46" font-family="monospace" font-size="15" font-weight="700" fill="#2C415E">NY 2026</text>'
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

def head(r, ja, en, n):
    return (f'<div class="region"><span class="sw" style="background:{HEX[r]}"></span>'
            f'<span class="rn">{ja}<em>（{en}）</em></span><span class="rl"></span>'
            f'<span class="rc">{n:02d} TOPICS</span></div>')

def strip(title, en, items):
    flav = ''.join(
        f'<div class="flav kp"><b>{esc(t["ja"])}</b><span>{esc(t["en"])}</span>'
        f'<span class="kpd">{esc(t["d"])}</span></div>' for t in items)
    return (f'<div class="strip"><h3>{title} <em>{en}</em></h3>'
            f'<div class="flav-row">{flav}</div></div>')

def metrics(title, en, items):
    meds = ''
    for p in items:
        c = HEX[p['region']]
        meds += (f'<div class="med {p["region"]}"><div class="disc"><span class="num">{esc(p["num"])}</span></div>'
                 f'<b>{esc(p["ja"])}</b><div class="en">{esc(p["en"])}</div></div>')
    return (f'<div class="potw"><h3>{title}</h3><em>{en}</em>'
            f'<div class="med-row">{meds}</div></div>')

FOOT_PUB = '発行：<b>Global Sales Force, Inc. 業界情報室</b> ／ 本誌は各社公式発表・報道など公開情報のみを要約'

# ================= CONTENT =================
US = [
 {"region":"na","eyebrow":"DEBUT ・ 米国初出店",
  "ja":"NYタイムズスクエアに米国1号店 ─ 2026年秋オープン",
  "en":"First US store in NY Times Square — opening fall 2026",
  "ja_body":"FOOD & LIFE COMPANIESは回転すし「スシロー」の米国1号店を2026年秋、ニューヨーク・マンハッタンのタイムズスクエア近く（8番街×42丁目）にオープンする。約9,000平方フィートの3フロア構成で、1・2階が回転すし（約150〜170席）、地下1階に個室とすしバーを設ける。寿司に加えラーメンや茶碗蒸し、デザートなど100種類以上を提供する。",
  "en_body":"FOOD & LIFE COMPANIES will open its first US 'Sushiro' in fall 2026 near Times Square in Manhattan (8th Ave & 42nd St). The ~9,000-sq-ft space spans three floors: conveyor-belt dining on floors 1–2 (about 150–170 seats) and private rooms with a sushi bar in the basement. Beyond sushi, the menu tops 100 items, adding ramen, chawanmushi and desserts.",
  "src":"出典：FOOD & LIFE COMPANIES／Time Out New York"},
 {"region":"na","eyebrow":"HISTORY ・ 再挑戦",
  "ja":"10年越しの“リベンジ出店” ─ 2015年進出→翌年撤退",
  "en":"A decade-later revenge: 2015 entry, 2016 exit",
  "ja_body":"同社は2015年に米国へ進出したが翌2016年に撤退し、再進出は積年の課題だった。2024年11月就任の山本雅啓社長は2025年中の出店を掲げたが、物件選定や米国の関税環境で難航。今回は10年越しの再挑戦となる。",
  "en_body":"The company entered the US in 2015 but withdrew in 2016, leaving re-entry a long-standing goal. President Masahiro Yamamoto (appointed November 2024) had aimed to open in 2025, but site selection and US tariffs slowed it — making this a decade-later second attempt.",
  "src":"出典：ダイヤモンド／みなと新聞"},
 {"region":"na","eyebrow":"STRATEGY ・ 立地",
  "ja":"なぜタイムズスクエアか ─ 「長期の米国展開」を宣言",
  "en":"Why Times Square — a statement of long-term commitment",
  "ja_body":"海外事業担当の加藤宏成副社長は、タイムズスクエア出店を「長期的な米国展開へのコミットメントの表明」と説明。「人口集積が最も高いNYで良い物件に出合えた」ため決断したとし、日本の高品質なすしをコスパよく提供する方針を示した。",
  "en_body":"Hiroshige Kato, EVP for overseas business, calls the Times Square site 'a statement of long-term commitment to US expansion.' He said it came together because 'we found a good property in New York, the densest market,' pledging high-quality Japanese sushi at good value.",
  "src":"出典：FOOD & LIFE COMPANIES／Undercurrent News"},
 {"region":"na","eyebrow":"MENU ・ 品揃え／価格",
  "ja":"寿司＋麺で100種超 ─ 価格は未公表、割高懸念も",
  "en":"100+ items beyond sushi; pricing undisclosed",
  "ja_body":"NYのメニューは寿司に加え、ラーメン・そうめん・茶碗蒸し、カタラーナやわらび餅などデザートも想定し、100種類超を並べる。価格は未公表で、SNSでは日本より割高になるとの懸念も。現地の生鮮・人件費や関税が価格設定の焦点だ。",
  "en_body":"The New York menu will extend beyond sushi to ramen, somen, chawanmushi and desserts like catalana and warabimochi — over 100 items. Prices are undisclosed, and social media worries they may exceed Japan's. Local food, labor costs and tariffs will shape pricing.",
  "src":"出典：Time Out／DAILYSUN NEW YORK"},
 {"region":"na","eyebrow":"RIVALS ・ 競合",
  "ja":"先行するくら寿司USA ─ 82店超、年20%増で長期300店狙い",
  "en":"Kura Sushi USA leads — 80+ stores, 20%/yr toward ~300",
  "ja_body":"米国の回転すしはくら寿司USAが先行。2009年にカリフォルニアで開業し現在82店超（26年に100店突破見込み）。年20%ペースで長期300店を狙い、トランプ大統領の出資も報じられた。宇波CEOは「競合が広がる前に主要市場を押さえる」と述べる。",
  "en_body":"US kaiten sushi is led by Kura Sushi USA, which opened in California in 2009 and now runs 80-plus stores (set to top 100 in 2026). It targets ~300 long term at 20% annual growth, with President Trump's stake reported. CEO Hajime Uba aims to 'secure key markets before rivals expand.'",
  "src":"出典：Bloomberg／Japan Times／Nikkei Asia"},
]

GL = [
 {"region":"jp","eyebrow":"GROWTH ・ 海外事業",
  "ja":"海外スシローが急拡大 ─ 売上661億円(+72.7%)、営業益73億円(+116.5%)",
  "en":"Overseas Sushiro surges — ¥66.1B revenue, ¥7.3B OP",
  "stats":["海外売上 +72.7%","営業益 +116.5%"],
  "ja_body":"連結売上の約2割を占める海外スシロー事業は、売上収益661億円（前年比+72.7%）、営業利益73億円（+116.5%）と大幅増益。香港・台湾・タイが牽引した。国内はコメ高など原価上昇が重く、成長の軸は海外へ移りつつある。2026年9月期は史上最大の出店ペースを計画する。",
  "en_body":"The overseas Sushiro business — about 20% of group revenue — jumped to ¥66.1B (+72.7%) with ¥7.3B operating profit (+116.5%), led by Hong Kong, Taiwan and Thailand. With rice and other costs weighing on Japan, growth is shifting abroad, and FY2026 (to September) plans the fastest store openings ever.",
  "src":"出典：FOOD & LIFE COMPANIES／foodrink.co.jp"},
 {"region":"jp","eyebrow":"PLAN ・ 出店計画",
  "ja":"海外310〜320店へ ─ 初めて海外出店が国内を上回る",
  "en":"Toward 310–320 stores — more openings abroad than in Japan",
  "ja_body":"海外店舗は200店を突破し、2026年9月期末までに310〜320店体制を目指す。同社史上初めて海外の新規出店数が国内を上回る見込みで、海外売上構成比は前期の30%超から35%へ引き上げる計画だ。",
  "en_body":"Overseas outlets have passed 200 and are targeted at 310–320 by the end of FY2026 (September). For the first time in the company's history, new openings abroad are set to exceed those in Japan, lifting the overseas revenue mix from 30%-plus to 35%.",
  "src":"出典：流通ニュース／foodrink.co.jp"},
 {"region":"jp","eyebrow":"CHINA ・ 中華圏",
  "ja":"主力は中華圏 ─ 168店(大陸69)、上海初出店で210超へ",
  "en":"Greater China leads — 168 stores, Shanghai debut",
  "ja_body":"中華圏（中国大陸・香港・台湾）は2025年11月末で168店（うち大陸69店）。香港・台湾が好調で、大陸は景気低迷下も改善傾向だ。2025年12月には上海に初出店。2026年9月末までに中華圏を210〜222店へ拡大する計画だ。",
  "en_body":"Greater China (mainland, Hong Kong, Taiwan) had 168 stores at end-November 2025 (69 on the mainland). Hong Kong and Taiwan are strong, and the mainland is improving despite a soft economy. Sushiro opened its first Shanghai store in December 2025 and plans 210–222 by end-September 2026.",
  "src":"出典：ジェトロ／ビジネスジャーナル"},
 {"region":"jp","eyebrow":"ASIA ・ 韓国・東南ア",
  "ja":"韓国・シンガポールも好発進 ─ 明洞再開、Thomson Plaza首位",
  "en":"Korea and Singapore off to strong starts",
  "ja_body":"韓国では昨年9月、4年ぶりの新店を明洞にオープンし日販は国内上位の好調。シンガポールでは昨年8月開業のThomson Plaza店が現地スシローで売上首位クラス。タイも牽引役で、東南アジアが次の成長エンジンになりつつある。",
  "en_body":"In Korea, a first new store in four years opened in Myeongdong last September, with daily sales among the country's best. In Singapore, the Thomson Plaza store (opened last August) ranks near the top locally. Thailand is also a driver, making Southeast Asia the next growth engine.",
  "src":"出典：ビジネスジャーナル／FOOD & LIFE COMPANIES"},
]

KA = [
 {"region":"kr","eyebrow":"CONTEXT ・ 背景",
  "ja":"国内のコメ高が海外シフトを後押し",
  "en":"Domestic rice inflation accelerates the overseas shift",
  "ja_body":"日本ではコメをはじめ原材料高が続き、値上げが客足に影響しかねない。国内の収益改善に時間がかかる中、利益率の高い海外事業が成長の主役に。米国進出もこの海外シフトを象徴する動きだ。",
  "en_body":"In Japan, rising costs — rice above all — make price hikes risky for footfall. With domestic recovery slow, the higher-margin overseas business has become the main growth driver, and the US entry symbolizes this shift abroad.",
  "src":"出典：ainvest／SeafoodSource"},
 {"region":"kr","eyebrow":"COMPARISON ・ 戦略対比",
  "ja":"スシロー＝アジア、くら寿司＝米国 ─ 異なる勝ち筋",
  "en":"Sushiro to Asia, Kura to the US — divergent playbooks",
  "ja_body":"両社は海外の主戦場を分けてきた。スシローは中華圏・アジアで規模を築き、くら寿司は米国で先行して上場・出店を重ねた。スシローの米国参入で、日本発の回転すしが本場NYで初めて正面から競合する。",
  "en_body":"The two chains have split their overseas battlegrounds: Sushiro built scale in Greater China and Asia, while Kura advanced in the US with a listing and steady openings. Sushiro's US entry means Japanese kaiten sushi will compete head-to-head in New York for the first time.",
  "src":"出典：ITmedia ビジネス"},
]

KEYPTS = [
 {"ja":"立地","en":"TIMES SQ","d":"8th Ave × 42nd St"},
 {"ja":"規模","en":"3 FLOORS","d":"150〜170席"},
 {"ja":"開業","en":"FALL 2026","d":"26年秋"},
 {"ja":"競合","en":"KURA USA","d":"82店超で先行"},
 {"ja":"価格","en":"TBD","d":"未公表・割高懸念"},
]

NUMS = [
 {"region":"na","num":"948","ja":"世界総店舗","en":"as of Apr 2026"},
 {"region":"jp","num":"200+","ja":"海外店舗数","en":"overseas stores"},
 {"region":"na","num":"35%","ja":"海外売上比率目標","en":"FY26 target"},
 {"region":"jp","num":"¥661億","ja":"海外売上 +72.7%","en":"overseas revenue"},
 {"region":"na","num":"150-170","ja":"NY 席数","en":"NY seats"},
 {"region":"jp","num":"100+","ja":"NY メニュー","en":"menu items"},
]

def build_html():
    css = open(os.path.join(HERE, 'styles.css'), encoding='utf-8').read()
    logo = open(os.path.join(HERE, 'logo_datauri.txt'), encoding='utf-8').read().strip()
    extra = ("\n.disc .num{font-family:'Noto Sans Mono',monospace;font-weight:900;color:var(--c);"
             "font-size:12px;line-height:1.03;text-align:center;padding:0 2px;}"
             "\n.flav.kp b{font-size:12px;}"
             "\n.flav.kp span{display:block;}"
             "\n.flav.kp .kpd{font-family:'Noto Sans CJK JP',sans-serif;color:#EEF1F6;font-size:9px;margin-top:4px;letter-spacing:0;}")
    css += extra

    tw = ' '.join('・ ' + esc(x) for x in [
        "NYタイムズスクエアに米国初出店（26年秋）", "10年越しの再挑戦",
        "競合くら寿司が先行", "海外売上比率35%へ"])

    us_lead = card(US[0], lead=True)
    us_rest = rows_of_two([card(s) for s in US[1:]])
    gl_lead = card(GL[0], lead=True)
    gl_rest = rows_of_two([card(s) for s in GL[1:]])
    ka_rows = rows_of_two([card(s) for s in KA])

    p1 = f'''<div class="page">
  <div class="flag"><div class="flag-l"><img src="{logo}" alt="Global Sales Force">
    <div class="rep">業界レポート 特別号<small>SPECIAL REPORT ・ SUSHIRO GLOBAL EXPANSION</small></div></div>
    <div class="stamp"><b>SPECIAL</b><br>{DATE}<br>Focus: U.S.</div></div>
  <div class="tw"><b>本号の要点 SPECIAL</b> {tw}</div>
  {head('na','米国','UNITED STATES', len(US))}
  {us_lead}{us_rest}
  <div class="foot"><span>{FOOT_PUB}</span><span>SPECIAL ・ {DATE} ・ 01/03 米国</span></div>
</div>'''

    p2 = f'''<div class="page pb">
  <div class="run"><b>GLOBAL ROUNDUP</b> ─ 世界・アジアの展開</div>
  {head('jp','世界・アジア','GLOBAL / ASIA', len(GL))}
  {gl_lead}{gl_rest}
  <div class="foot"><span>{FOOT_PUB}</span><span>SPECIAL ・ {DATE} ・ 02/03 世界・アジア</span></div>
</div>'''

    p3 = f'''<div class="page pb">
  <div class="run"><b>KEY TAKEAWAYS</b> ─ 論点整理・注目データ</div>
  {head('kr','論点整理','KEY TAKEAWAYS', len(KA))}
  {ka_rows}
  {strip('米国市場のポイント', 'KEY POINTS — U.S.', KEYPTS)}
  {metrics('注目データ', 'KEY NUMBERS', NUMS)}
  <div class="foot"><span>編集メモ：本誌は各社公式発表・報道など<b>公開情報のみ</b>を要約。取扱先の非公開情報は含みません。</span><span>SPECIAL ・ 03/03</span></div>
</div>'''

    return f'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>{css}</style></head><body>{p1}{p2}{p3}</body></html>'

def main():
    out = build_html()
    stem = f"GSF_Special_Report_スシロー海外展開_{DATE.replace('.', '-')}"
    with open(stem + '.html', 'w', encoding='utf-8') as f:
        f.write(out)
    HTML(string=out, base_url=HERE).write_pdf(stem + '.pdf')
    print('WROTE', stem + '.pdf')

if __name__ == '__main__':
    main()
