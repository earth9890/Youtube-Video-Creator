#!/bin/sh
# scenes.js = parts/*.js in order (00-base … 99-run)
cd "$(dirname "$0")" && cat parts/*.js > scenes.js && python3 ~/.claude/skills/whiteboard-video-studio/scripts/build.py .
