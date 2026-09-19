<#
  GSF 業界レポート – Windows用 PDF生成
  ------------------------------------------------
  generate_report_win.py で HTML を作り、Microsoft Edge のヘッドレス印刷で PDF 化する。
  （このPCには WeasyPrint が無いため。仕上がりは Linux 版と同じ A4・3ページ）

  使い方:
      powershell -File .\build_win.ps1 -Json .\issue_Vol09.json

  出力:
      GSF_Industry_Report_VolNN_YYYY-MM-DD.html / .pdf （このフォルダ）
      最後に PAGES を表示する。3 でなければ CLAUDE.md「3ページに収める」に従って
      本文量を詰めてから、もう一度実行すること。
#>
param([Parameter(Mandatory = $true)][string]$Json)

$here = $PSScriptRoot

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
if (-not (Test-Path $edge)) { Write-Output "FAILED: Edge が見つかりません"; exit 1 }

# 1) JSON -> HTML
$stem = & py "$here\generate_report_win.py" $Json
if (-not $?) { Write-Output "FAILED: HTML生成でエラー"; exit 1 }
$stem = $stem.Trim()

$html = Join-Path $here "$stem.html"
$pdf = Join-Path $here "$stem.pdf"
$uri = ([System.Uri](Get-Item $html).FullName).AbsoluteUri
if (Test-Path $pdf) { Remove-Item $pdf -Force }

# 2) HTML -> PDF（Edge ヘッドレス。@page の A4・余白をそのまま使う）
& $edge --headless=new --disable-gpu --no-sandbox `
    --user-data-dir="$env:TEMP\gsf_edge_profile" `
    --no-pdf-header-footer --print-to-pdf="$pdf" $uri

# Edge は書き出し完了前に戻ることがあるので待つ
$n = 0
while (-not (Test-Path $pdf) -and $n -lt 40) { Start-Sleep -Milliseconds 500; $n++ }
Start-Sleep -Milliseconds 800
if (-not (Test-Path $pdf)) { Write-Output "FAILED: PDFが作られませんでした"; exit 1 }

# 3) ページ数チェック
$pages = & py -c "import pypdf,sys; print(len(pypdf.PdfReader(sys.argv[1]).pages))" $pdf
Write-Output "PDF  : $pdf"
Write-Output "PAGES: $pages"
if ($pages.Trim() -ne "3") { Write-Output "WARNING: 3ページではありません。本文量を調整してください。" }
