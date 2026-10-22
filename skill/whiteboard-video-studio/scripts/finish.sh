#!/bin/sh
# Finish one episode: mix music under the voice (or voice only), rebuild, check, render 4K (RES=1080 for 1080p).
# usage: finish.sh EPISODE_DIR BED.wav|none [OUT_NAME]     none = voice only at -15 LUFS (story explainers)
# Renders are sequential on purpose (Chrome + encoder are CPU-heavy); run this per episode from a queue.
set -e
EP=$(cd "$1" && pwd); OUT=${3:-$(basename "$EP")-4k.mp4}
S=~/.claude/skills/whiteboard-video-studio/scripts
cd "$EP"
if [ "$2" = none ]; then
  ffmpeg -y -v error -i assets/voice.wav -af loudnorm=I=-15:TP=-1.5:LRA=4 -ar 44100 assets/mix.wav
else
  BED=$(cd "$(dirname "$2")" && pwd)/$(basename "$2")
  ~/.venvs/musicgen/bin/python "$S/mix.py" . "$BED"
fi
python3 "$S/build.py" .
npx hyperframes check 2>&1 | grep -E "error\(s\)|passed|failed" | head -6
# HF_CAPTURE_PARALLEL_STREAM: stream frames to the encoder (multi-worker disk capture of an 8-min 4K video needs ~60 GB)
# RES=1080 renders at the composition size (1920x1080, ~3x faster: long 8-10 min videos); default 4k
RESFLAG="--resolution 4k"; [ "${RES:-4k}" = 1080 ] && RESFLAG=""
# fast capture (drawElementImage, macOS default) dropped the whole picture on some frames under load (eps 38/39/42, 2026-10-22): use screenshot capture
HF_CAPTURE_PARALLEL_STREAM=true PRODUCER_EXPERIMENTAL_FAST_CAPTURE=false npx hyperframes render --quality delivery --experimental-fast-capture=false $RESFLAG --output "$OUT" 2>&1 | grep -E "Render complete|MB ·|rror" | head -4
ffprobe -v error -show_entries stream=codec_name,width,height,duration -of csv=p=0 "$OUT"
python3 "$S/blank_scan.py" "$OUT" || echo "WARNING: blank frames (renderer dropped the picture, usually under heavy load): re-render this episode"
