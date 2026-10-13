#!/bin/sh
# Thumbnail study: every upload of each channel -> views list + maxres thumbnail, OCR, metrics, contact sheets.
# usage: fetch_thumbs.sh OUT_DIR channel1 [channel2 ...]     e.g. fetch_thumbs.sh ~/videos/research/thumbs Zenn0009 kurzgesagt
# Needs a recent yt-dlp (old ones return 403 / no view counts: `pip install -U yt-dlp` in a venv), ImageMagick, swiftc.
# Then: analyse the sheets with references/research/thumbnails/rubric.md (one agent per channel group).
set -e
H=$(cd "$(dirname "$0")" && pwd); OUT=$1; shift
mkdir -p "$OUT/lists" "$OUT/img"
for c in "$@"; do
  yt-dlp --flat-playlist --print "%(view_count)s|%(id)s|%(duration)s|%(title)s" "https://www.youtube.com/@$c/videos" 2>/dev/null > "$OUT/lists/$c.txt"
  echo "$c $(wc -l < "$OUT/lists/$c.txt") uploads"
done
cd "$OUT"
cat lists/*.txt | cut -d'|' -f2 | sort -u | xargs -P 24 -I{} sh -c 'f=img/{}.jpg; [ -s $f ] || curl -sf -o $f https://i.ytimg.com/vi/{}/maxresdefault.jpg || curl -sf -o $f https://i.ytimg.com/vi/{}/hqdefault.jpg'
[ -x ocr ] || swiftc -O "$H/ocr.swift" -o ocr
ls img/*.jpg | xargs -n 60 -P 6 ./ocr > ocr.jsonl 2>/dev/null
python3 "$H/thumb_metrics.py" . | tee metrics-summary.txt
python3 "$H/thumb_sheets.py" .
