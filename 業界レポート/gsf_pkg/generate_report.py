#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GSF 業界レポート – 週次PDFジェネレーター
------------------------------------------------
使い方:
    python3 generate_report.py issue_Vol01.json

  ・ issue の JSON（同フォルダの issue_Vol01.json が雛形）を読み込み
  ・ styles.css と logo_datauri.txt を使って A4・3ページのHTMLを組み立て
  ・ WeasyPrint で PDF を出力（ファイル名は JSON の vol/date から自動命名）

必要環境（初回のみ）:
    pip install weasyprint --break-system-packages
    apt-get install -y fonts-noto-cjk        # 日本語フォント

出力:
    GSF_Industry_Report_Vol{vol}_{date}.pdf
"""
import sys, json, os, html
from weasyprint import HTML

HERE = os.path.dirname(os.path.abspath(__file__))

# ---- region palette (固定) ----
HEX  = {'na':'#2C415E','jp':'#C91F26','kr':'#3E6493','cn':'#B0842C'}
RJA  = {'na':'北米','jp':'日本','kr':'韓国','cn':'中国'}
REN  = {'na':'NORTH AMERICA','jp':'JAPAN','kr':'KOREA','cn':'CHINA'}

# ---- banner illustrations (leadカード用, viewBox 210x150) ----
BANNERS = {
 'trade': '<rect width="210" height="150" fill="#E7EAF1"/><g fill="none" stroke="#2C415E" stroke-width="3.5"><rect x="20" y="74" width="22" height="58"/><rect x="48" y="54" width="20" height="78"/><rect x="74" y="88" width="17" height="44"/><rect x="98" y="42" width="22" height="90"/></g><path d="M134 92h56" stroke="#C91F26" stroke-width="3.5" stroke-linecap="round"/><path d="M170 76l20 16-20 16" fill="none" stroke="#C91F26" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M162 34l-20 16 20 16" fill="none" stroke="#2C415E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>',
 'summer':'<rect width="210" height="150" fill="#F8E2E3"/><path d="M40 78c0-16 16-28 45-28s45 12 45 28" stroke="#C91F26" stroke-width="3.5" fill="#fff"/><path d="M40 78h90" stroke="#C91F26" stroke-width="3.5"/><ellipse cx="85" cy="78" rx="45" ry="10" fill="#C91F26" opacity=".2"/><path d="M74 40c-3 5 3 8 0 14M85 36c-3 5 3 8 0 14M96 40c-3 5 3 8 0 14" stroke="#C91F26" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="162" cy="82" r="26" fill="#fff" stroke="#C91F26" stroke-width="3.5"/><path d="M138 82h48M162 82c-10 0-10 20 0 20M162 50v-10" stroke="#C91F26" stroke-width="3" stroke-linecap="round"/>',
}
def banner(art, region):
    if art in BANNERS:
        return f'<svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">{BANNERS[art]}</svg>'
    c = HEX[region]
    return (f'<svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">'
            f'<rect width="210" height="150" fill="{c}" opacity=".10"/>'
            f'<circle cx="105" cy="75" r="34" fill="none" stroke="{c}" stroke-width="4"/></svg>')

# ---- small icons (trends / products) ----
def icon(name, c):
    d = {
    'chili': f'<path d="M21 9c-3 6-8 8-8 15a8 8 0 0016 0c0-7-5-9-8-15z" fill="{c}"/>',
    'ube':   f'<path d="M13 21c0-4 4-8 8-8s8 4 8 8-3 12-8 12-8-8-8-12z" fill="{c}"/>',
    'popsicle': f'<rect x="16" y="10" width="10" height="20" rx="5" fill="{c}"/><rect x="19" y="28" width="3" height="6" rx="1.5" fill="{c}"/>',
    'orange': f'<circle cx="21" cy="21" r="11" fill="none" stroke="{c}" stroke-width="2"/><path d="M21 10c4 3 4 19 0 22" stroke="{c}" stroke-width="1.4" fill="none"/>',
    'cart':  f'<path d="M6 8h5l4 18h16l3-12H13" fill="none" stroke="{c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17" cy="32" r="2.6" fill="{c}"/><circle cx="29" cy="32" r="2.6" fill="{c}"/>',
    'noodlebowl': f'<ellipse cx="21" cy="25" rx="13" ry="8" fill="{c}"/><path d="M8 25c0-5 6-9 13-9s13 4 13 9" fill="none" stroke="{c}" stroke-width="2"/>',
    'matcha_m': f'<circle cx="21" cy="22" r="12" fill="none" stroke="{c}" stroke-width="2"/><path d="M11 22h20M21 22c-5 0-5 9 0 9M21 9v-4" stroke="{c}" stroke-width="2" fill="none"/>',
    'latte': f'<path d="M13 14h15l-1 16a3 3 0 01-3 2.6h-7a3 3 0 01-3-2.6z" fill="none" stroke="{c}" stroke-width="2"/>',
    'soda':  f'<rect x="15" y="10" width="12" height="22" rx="5" fill="none" stroke="{c}" stroke-width="2"/><path d="M16 17h10" stroke="{c}" stroke-width="1.6"/>',
    'onigiri': f'<path d="M12 30c0-8 4-16 9-16s9 8 9 16z" fill="none" stroke="{c}" stroke-width="2.2" stroke-linejoin="round"/><rect x="17" y="24" width="8" height="6" fill="{c}"/>',
    }
    return f'<svg viewBox="0 0 42 42">{d.get(name, d["noodlebowl"])}</svg>'

def esc(t): return html.escape(str(t), quote=False)

# ---- renderers ----
def card(s, lead=False):
    r = s['region']
    cls = f'card {r}' + (' lead' if lead else '')
    stats = ''
    if s.get('stats'):
        stats = '<div class="stats">' + ''.join(f'<span class="stat">{esc(x)}</span>' for x in s['stats']) + '</div>'
    art = ''
    if lead:
        art = f'<div class="art">{banner(s.get("art",""), r)}</div>'
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

def region_head(r, n):
    return (f'<div class="region"><span class="sw" style="background:{HEX[r]}"></span>'
            f'<span class="rn">{RJA[r]}<em>（{REN[r]}）</em></span><span class="rl"></span>'
            f'<span class="rc">{n:02d} STORIES</span></div>')

def rows_of_two(cards_list):
    out, i = '', 0
    while i < len(cards_list):
        pair = cards_list[i:i+2]
        out += '<div class="row">' + ''.join(pair) + '</div>'
        i += 2
    return out

def strip(trends):
    flav = ''.join(
        f'<div class="flav">{icon(t["ic"], "#EEF1F6")}<b>{esc(t["ja"])}</b><span>{esc(t["en"])}</span></div>'
        for t in trends)
    return (f'<div class="strip"><h3>北米で"今きてる"味 <em>FLAVORS ON THE RISE</em></h3>'
            f'<div class="flav-row">{flav}</div></div>')

def products(prods):
    meds = ''
    for p in prods:
        c = HEX[p['region']]
        ic = icon(p['ic'], c).replace('viewBox="0 0 42 42"','width="52" height="52" viewBox="0 0 42 42"')
        meds += (f'<div class="med {p["region"]}"><div class="disc">{ic}</div>'
                 f'<b>{esc(p["ja"])}</b><div class="en">{esc(p["en"])}</div>'
                 f'<span class="tg">{esc(p["tag"])}</span></div>')
    return (f'<div class="potw"><h3>今週の注目商品</h3><em>PRODUCTS OF THE WEEK</em>'
            f'<div class="med-row">{meds}</div></div>')

FOOT_PUB = '発行：<b>Global Sales Force, Inc. 業界情報室</b> ／ 本誌は各社公式発表・報道など公開情報のみを要約'

def build_html(d):
    css  = open(os.path.join(HERE,'styles.css'),encoding='utf-8').read()
    logo = open(os.path.join(HERE,'logo_datauri.txt'),encoding='utf-8').read().strip()
    vol, date, week = d['vol'], d['date'], d['week']
    tw = ' '.join('・ '+esc(x) for x in d['this_week'])

    na_lead = card(d['na'][0], lead=True)
    na_rest = rows_of_two([card(s) for s in d['na'][1:]])
    jp_lead = card(d['jp'][0], lead=True)
    jp_rest = rows_of_two([card(s) for s in d['jp'][1:]])
    kr_rows = rows_of_two([card(s) for s in d['kr']])
    cn_rows = rows_of_two([card(s) for s in d['cn']])

    p1 = f'''<div class="page">
  <div class="flag"><div class="flag-l"><img src="{logo}" alt="Global Sales Force">
    <div class="rep">業界レポート<small>NORTH AMERICA × ASIA FOOD & BEVERAGE TRENDS WEEKLY</small></div></div>
    <div class="stamp"><b>Vol. {vol}</b><br>{date}<br>Week of {week}</div></div>
  <div class="tw"><b>今週の視点 THIS WEEK</b> {tw}</div>
  {region_head('na', len(d['na']))}
  {na_lead}{na_rest}
  <div class="foot"><span>{FOOT_PUB}</span><span>VOL.{vol} ・ {date} ・ 01/03 北米</span></div>
</div>'''

    p2 = f'''<div class="page pb">
  <div class="run"><b>アジア ASIA ROUNDUP</b> ─ 日本 ／ 韓国</div>
  {region_head('jp', len(d['jp']))}
  {jp_lead}{jp_rest}
  {region_head('kr', len(d['kr']))}
  {kr_rows}
  <div class="foot"><span>{FOOT_PUB}</span><span>VOL.{vol} ・ 02/03 日本・韓国</span></div>
</div>'''

    p3 = f'''<div class="page pb">
  <div class="run"><b>アジア ASIA ROUNDUP</b> ─ 中国 ／ 今週の注目商品</div>
  {region_head('cn', len(d['cn']))}
  {cn_rows}
  {strip(d['trends'])}
  {products(d['products'])}
  <div class="foot"><span>編集メモ：本誌は各社公式発表・報道など<b>公開情報のみ</b>を要約。</span><span>VOL.{vol} ・ 03/03 中国・注目商品</span></div>
</div>'''

    return f'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>{css}</style></head><body>{p1}{p2}{p3}</body></html>'

def main():
    if len(sys.argv) < 2:
        print('usage: python3 generate_report.py <issue.json>'); sys.exit(1)
    data = json.load(open(sys.argv[1], encoding='utf-8'))
    out_html = build_html(data)
    stem = f"GSF_Industry_Report_Vol{data['vol']}_{data['date'].replace('.','-')}"
    with open(stem+'.html','w',encoding='utf-8') as f:
        f.write(out_html)
    HTML(string=out_html, base_url=HERE).write_pdf(stem+'.pdf')
    print('WROTE', stem+'.pdf')

if __name__ == '__main__':
    main()
