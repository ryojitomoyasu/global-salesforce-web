#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GSF レポート – スロッティングフィー（複数ページ・ブランド配色）
slotting_body.md を読み込み、GSFブランドの誌面CSSで整形したPDFを出力する。
出力: GSF_Report_スロッティングフィー_YYYY-MM-DD.pdf
"""
import os
import markdown
from weasyprint import HTML

HERE = os.path.dirname(os.path.abspath(__file__))
DATE = "2026.07.27"

CSS = """
@page {
  size: A4;
  margin: 20mm 18mm 16mm;
  @bottom-center { content: "Global Sales Force, Inc. 業界情報室  ・  スロッティングフィー"; font-family:"Noto Sans CJK JP"; font-size:7.5pt; color:#9AA3AF; }
  @bottom-right { content: counter(page) " / " counter(pages); font-family:"Noto Sans Mono"; font-size:8pt; color:#9AA3AF; }
}
@page :first { margin-top: 18mm; @bottom-center{content:none;} @bottom-right{content:none;} }
* { box-sizing:border-box; }
body { font-family:"Noto Sans CJK JP", sans-serif; color:#1E2530; font-size:10.5pt; line-height:1.75; }

/* ---- cover masthead ---- */
.cover { border-bottom:3pt solid #C91F26; padding-bottom:16px; margin-bottom:22px; }
.cover .flag { display:flex; align-items:flex-end; justify-content:space-between; }
.cover img { height:44px; }
.cover .kicker { font-family:"Noto Sans Mono",monospace; font-size:8.5pt; letter-spacing:.12em; color:#57616F; text-transform:uppercase; }
.cover .stamp { text-align:right; font-family:"Noto Sans Mono",monospace; font-size:8.5pt; color:#57616F; line-height:1.6; }
.cover h1.title { font-family:"Noto Serif CJK JP",serif; font-weight:900; font-size:30pt; color:#2C415E; line-height:1.15; margin:20px 0 6px; letter-spacing:.01em; }
.cover .subtitle { font-size:12pt; font-weight:700; color:#C91F26; margin-bottom:4px; }
.cover .lead { font-size:10pt; color:#57616F; margin-top:10px; line-height:1.7; }
.cover .lead a { color:#2C415E; text-decoration:none; }

/* ---- headings ---- */
h1 { font-family:"Noto Serif CJK JP",serif; font-weight:900; font-size:16pt; color:#2C415E;
     border-left:6pt solid #C91F26; padding:2px 0 2px 12px; margin:26px 0 12px;
     break-after:avoid; }
h2 { font-size:12.5pt; font-weight:700; color:#C91F26; margin:18px 0 8px; break-after:avoid; }
h3 { font-size:11pt; font-weight:700; color:#2C415E; margin:14px 0 6px; break-after:avoid; }
p { margin:0 0 9px; }
strong { color:#12213A; }

ul, ol { margin:0 0 10px; padding-left:1.4em; }
li { margin-bottom:4px; }

/* ---- blockquote as callout ---- */
blockquote { margin:10px 0; padding:10px 14px; background:#F4F6F9; border-left:4pt solid #2C415E;
             border-radius:4px; color:#2C415E; font-size:10pt; }
blockquote p { margin:0 0 4px; }
blockquote p:last-child { margin:0; }

/* ---- tables ---- */
table { border-collapse:collapse; width:100%; margin:10px 0 14px; font-size:9.5pt; break-inside:avoid; }
th { background:#2C415E; color:#fff; font-weight:700; text-align:left; padding:7px 10px; border:1px solid #2C415E; }
td { padding:6px 10px; border:1px solid #D7DCE4; vertical-align:top; }
tbody tr:nth-child(even) td { background:#F6F8FB; }
td strong { color:#C91F26; }

hr { border:none; border-top:1px solid #DBDFE7; margin:20px 0; }
"""

def build():
    logo = open(os.path.join(HERE, 'logo_datauri.txt'), encoding='utf-8').read().strip()
    body_md = open(os.path.join(HERE, 'slotting_body.md'), encoding='utf-8').read()
    body_html = markdown.markdown(body_md, extensions=['tables', 'sane_lists'])

    cover = f'''
    <div class="cover">
      <div class="flag">
        <img src="{logo}" alt="Global Sales Force">
        <div class="stamp"><span class="kicker">GSF Report</span><br>{DATE}<br>Focus: US Retail</div>
      </div>
      <h1 class="title">スロッティングフィー</h1>
      <div class="subtitle">棚代入門 ― アメリカのスーパーに商品を置いてもらうには、いくらかかるのか</div>
      <div class="lead">
        本レポートは、Matt Putra（Eightx）&ldquo;Slotting Fees: What They Cost and How to Model Them in 2026&rdquo;
        （2026年6月9日公開／6月18日更新）の内容を、専門用語を知らない人にも分かるよう日本語で整理し直したものです。
        数字はすべて元記事の記載どおりで、出典（FTC・NielsenIQ・Vanderbilt ほか）を併記しています。<br>
        出典：<a href="https://eightx.co/blog/cpg-slotting-fees-cost">eightx.co/blog/cpg-slotting-fees-cost</a>
      </div>
    </div>
    '''
    html = f'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>{CSS}</style></head><body>{cover}{body_html}</body></html>'
    stem = f"GSF_Report_スロッティングフィー_{DATE.replace('.', '-')}"
    with open(os.path.join(HERE, stem + '.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    HTML(string=html, base_url=HERE).write_pdf(os.path.join(HERE, stem + '.pdf'))
    print('WROTE', stem + '.pdf')

if __name__ == '__main__':
    build()
