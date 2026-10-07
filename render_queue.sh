#!/bin/sh
# Sequential 4K render queue. usage: render_queue.sh "ep bed" "ep bed" ...
S=~/.claude/skills/whiteboard-video-studio/scripts/finish.sh
for job in "$@"; do set -- $job; ep=$1; bed=$2
  echo "=== $ep $(date +%H:%M)"; "$S" "episodes/$ep" "music/bed-$bed.wav" "$PWD/renders/$ep-4k.mp4" 2>&1 | tail -4
done
echo "=== queue done $(date +%H:%M)"
