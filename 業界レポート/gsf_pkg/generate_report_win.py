# -*- coding: utf-8 -*-
"""
GSF 業界レポート – Windows用 HTMLビルダー
------------------------------------------------
このPC（Windows）には WeasyPrint が入っていないため、generate_report.py を
そのまま実行すると import で落ちる。ここでは weasyprint をダミーに差し替えて
build_html() だけを借り、HTML を書き出す。
PDF化は build_win.ps1（Microsoft Edge のヘッドレス印刷）が担当する。

使い方:
    py generate_report_win.py issue_Vol09.json
      → GSF_Industry_Report_Vol09_2026-08-21.html を同フォルダに出力し、
        標準出力にファイル名の stem を返す（build_win.ps1 がこれを受け取る）

補足:
    styles.css のフォント指定は Linux の "Noto Sans CJK JP" 前提。
    Windows には "Noto Sans JP" / "Noto Serif JP" が入っているので候補に足す。
    これで Linux 版とほぼ同じ組版（3ページ）になることを Vol08 で確認済み。
"""
import sys, os, json, types, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))

# ---- weasyprint をダミー化（build_html だけ使うので実体は不要） ----
_fake = types.ModuleType("weasyprint")


class _HTML:
    def __init__(self, *a, **k):
        pass

    def write_pdf(self, *a, **k):
        raise RuntimeError("PDF化は build_win.ps1（Edge）が行います")


_fake.HTML = _HTML
sys.modules["weasyprint"] = _fake

_spec = importlib.util.spec_from_file_location(
    "generate_report", os.path.join(HERE, "generate_report.py"))
gr = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gr)

FONT_MAP = [
    ('"Noto Sans CJK JP"',  '"Noto Sans CJK JP","Noto Sans JP"'),
    ('"Noto Serif CJK JP"', '"Noto Serif CJK JP","Noto Serif JP"'),
    ('"Noto Sans Mono"',    '"Noto Sans Mono","Consolas"'),
]


def main():
    if len(sys.argv) < 2:
        print("usage: py generate_report_win.py <issue.json>")
        sys.exit(1)
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    html = gr.build_html(data)
    for a, b in FONT_MAP:
        html = html.replace(a, b)
    stem = f"GSF_Industry_Report_Vol{data['vol']}_{data['date'].replace('.','-')}"
    with open(os.path.join(HERE, stem + ".html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(stem)


if __name__ == "__main__":
    main()
