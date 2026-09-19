# -*- coding: utf-8 -*-
"""
GSF 業界レポート – 入稿前チェッカー
------------------------------------------------
PDF化する前に必ず実行する。3ページに収まらない原因のほとんどは本文の書きすぎなので、
生成する前に字数で弾く。あわせて表記ルール（カタカナ主表記・USD併記）も確認する。

    py check_issue.py issue_Vol13.json

OK なら終了コード 0、直すところがあれば 1 を返す。
NG が出たら「該当カードの ja_body と en_body を短く書き直してから」再実行すること。
PDFを作ってからページ数で調整するより、ここで直すほうが早い。

上限値は実測ベース（Vol08・Vol12 が3ページに収まった時の値）。
"""
import sys, json, re

# 地域ごとの上限（ja_body の文字数）
LIMITS = {
    "na": {"total": 590, "lead": 140, "half": 125, "label": "北米"},
    "jp": {"total": 410, "lead": 145, "half": 125, "label": "日本"},
    "kr": {"total": 260, "lead": 130, "half": 130, "label": "韓国"},
    "cn": {"total": 290, "lead": 150, "half": 150, "label": "中国"},
}

# en_body が ja_body の何倍までなら許容か（情報量は減らさず、冗長さだけ削る目安）
EN_RATIO_MAX = 2.9

# カタカナ主表記にすべき中国・韓国企業名（見つかったら確認を促す）
WATCH_NAMES = ["阿里巴巴", "美団", "京東", "淘宝", "拼多多", "天猫", "盒馬",
               "蜜雪氷城", "字節跳動", "農心", "三養", "オリオン"]

# 現地通貨の金額表記（USD併記が要るもの）。円は日本語読者の自国通貨なので対象外。
CURRENCY = re.compile(r"[0-9,．.]+\s*(億|兆|万)?\s*(ウォン|元)")

# 「メイトゥアン（美団）」でも「盒馬（フーマー）」でも可とする
def has_katakana_reading(blob, name):
    return (re.search(r"[ァ-ヶー]{3,}\s*[（(]\s*" + name, blob) or
            re.search(name + r"\s*[（(]\s*[ァ-ヶー]{3,}", blob))


def main():
    if len(sys.argv) < 2:
        print("usage: py check_issue.py <issue.json>")
        sys.exit(1)

    d = json.load(open(sys.argv[1], encoding="utf-8"))
    ng = []
    warn = []

    print(f"Vol{d['vol']}  {d['date']}  {d['week']}")
    print("=" * 60)

    for r, lim in LIMITS.items():
        arts = d.get(r, [])
        total = sum(len(a["ja_body"]) for a in arts)
        mark = "OK " if total <= lim["total"] else "NG "
        if total > lim["total"]:
            ng.append(f"{lim['label']}の合計が {total}字（上限 {lim['total']}字）。"
                      f"{total - lim['total']}字ぶん削ること。")
        print(f"{mark}{lim['label']}({r}) 合計 {total}字 / 上限 {lim['total']}字")

        for i, a in enumerate(arts):
            ja, en = len(a["ja_body"]), len(a["en_body"])
            cap = lim["lead"] if i == 0 else lim["half"]
            over = ja > cap
            if over:
                ng.append(f"{lim['label']}[{i}]「{a['ja'][:24]}」が {ja}字（上限 {cap}字）。"
                          f"{ja - cap}字ぶん削ること。")
            if en > ja * EN_RATIO_MAX:
                warn.append(f"{lim['label']}[{i}] 英文が長め（ja {ja}字 / en {en}字）。"
                            f"情報は残したまま言い回しを詰めること。")
            print(f"   {'NG' if over else 'ok'} [{i}] ja {ja:3d}/{cap}  en {en:3d}  {a['ja'][:30]}")

    print("-" * 60)

    # 表記ルール
    for r in LIMITS:
        for i, a in enumerate(d.get(r, [])):
            blob = a["ja"] + a["ja_body"]
            for nm in WATCH_NAMES:
                if nm in blob and not has_katakana_reading(blob, nm):
                    warn.append(f"{LIMITS[r]['label']}[{i}] 「{nm}」がカタカナ主表記に"
                                f"なっていない可能性。例: メイトゥアン（美団）")
            if CURRENCY.search(blob) and "ドル" not in blob:
                warn.append(f"{LIMITS[r]['label']}[{i}] 現地通貨の金額にUSD併記が無い可能性。"
                            f"例: 9,561億ウォン（約6.9億ドル）")
            if CURRENCY.search(blob) and "ドル" in blob and "概算" not in a["src"]:
                warn.append(f"{LIMITS[r]['label']}[{i}] 出典行にレートの注記が無い。"
                            f"例: ※1ドル=1,386ウォンで概算")

    if warn:
        print("【要確認】")
        for w in dict.fromkeys(warn):
            print("  ・" + w)
    if ng:
        print("【要修正】")
        for x in ng:
            print("  ・" + x)
        print("\n→ 上のカードを短く書き直してから、もう一度このチェックを実行すること。")
        print("  ここを通してから build_win.ps1 を実行する。")
        sys.exit(1)

    print("字数チェック OK。build_win.ps1 で PDF 化してよい。")
    sys.exit(0)


if __name__ == "__main__":
    main()
