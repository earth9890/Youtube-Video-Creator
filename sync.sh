#!/bin/sh
# Pull the live skill into the repo (the skill's source of truth lives in ~/.claude/skills).
rsync -a --delete --exclude __pycache__ ~/.claude/skills/whiteboard-video-studio/ "$(dirname "$0")/skill/whiteboard-video-studio/"
