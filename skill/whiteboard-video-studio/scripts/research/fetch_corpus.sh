#!/bin/sh
# Rebuild a script-research corpus: top videos by views per channel -> auto-subs -> timed transcripts with pause marks.
# usage: fetch_corpus.sh OUT_DIR N channel1 [channel2 ...]     e.g. fetch_corpus.sh ~/videos/research/writing 6 Zenn0009 halfasinteresting
# Then: analyse with references/research/rubric.md (one agent per channel group), measure audio with prosody.py.
# Needs yt-dlp (update it if YouTube returns 403: `pip install -U yt-dlp` in a venv).
set -e
OUT=$1; N=$2; shift 2
mkdir -p "$OUT/lists" "$OUT/subs" "$OUT/txt"
for c in "$@"; do
  yt-dlp --skip-download --ignore-errors --playlist-end 45 --print "%(view_count)s|%(id)s|%(duration)s|%(title)s" "https://www.youtube.com/@$c/videos" 2>/dev/null > "$OUT/lists/$c.views.txt" || true
  sort -t'|' -k1,1nr "$OUT/lists/$c.views.txt" | awk -F'|' '$3>180 && $3<1600' | head -"$N" | while IFS='|' read v id d t; do
    echo "$c $id $v $d $t" >> "$OUT/corpus.txt"
    yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en-orig,en" --sub-format vtt -o "$OUT/subs/${c}_%(id)s.%(ext)s" "https://youtu.be/$id" >/dev/null 2>&1 || true
  done
done
python3 "$(dirname "$0")/vtt2txt.py" "$OUT/subs" "$OUT/txt"
