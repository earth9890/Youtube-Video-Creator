# Overnight batch state (orchestrator keeps this current; resume from here after any interruption)

Owner approved (2026-10-22, chat): publish all 7 **Public** like eps 28–37 (clickbait thumb A, pinned comment, AI-use Yes).
Git: NOT approved this time — leave uncommitted. Never mention AI/TTS/VoiceStudio in YouTube text.

Pipeline per episode: script agent (opus, NIGHT-BRIEF.md) → `./voice-ep.sh episodes/NN` (bg) → `./slow-ep.sh episodes/NN 0.9`
→ `touch episodes/NN/assets/VOICE-DONE` + SendMessage build agent → build agent (sonnet) creates READY →
`RES=1080 lockf -t 7200 .heavy.lock ~/.claude/skills/whiteboard-video-studio/scripts/finish.sh episodes/NN none episodes/NN/renders/NN-1080p.mp4` (bg)
→ `python3 prep-upload.py NN` → upload in Chrome (Black Hole Life account) → pinned comment → log line in
`~/videos/bhl-uploads-2026-10-15.log` + "## Published" in package.md.

| Ep | Folder | Title | Script | Voice | Slow | Build | Render | Published |
|---|---|---|---|---|---|---|---|---|
| 38 | 38-full-brain | What If You Used 100% of Your Brain? | done | done 115 clips | done 491.6 s | READY 104 scenes | done v2 8:11, 0 blank | https://youtu.be/WPJy9bXi5RY pinned |
| 39 | 39-protein-300g | What If You Ate 300g of Protein a Day? | done 1400w 76 clips | done | done 496 s | READY 112 scenes | done v2 8:16 | https://youtu.be/slysCLVFYgA pinned |
| 40 | 40-energy-drinks | What If You Drank 100 Energy Drinks? | done 1391w 79 clips | done | done 479 s | READY 96 scenes | done | https://youtu.be/MZOm3s9ob1E pinned |
| 41 | 41-moon-life | What If You Tried to Live on the Moon? | done 1400w 73 clips | done | done 471 s | READY 106 scenes (check timed out) | done | https://youtu.be/QPeTnG9YhpY pinned |
| 42 | 42-billion-day | What If You Had to Spend $1 Billion in a Day? | done 1391w 85 clips | done | done 498 s | READY 104 scenes (check timed out) | done v2 8:18 | https://youtu.be/ELhubiuGdBc pinned |
| 43 | 43-black-hole-fall | What If You Fell Into a Black Hole? | done 1396w 75 clips | done | done 479 s | READY 105 scenes | done 7:59 | https://youtu.be/Tc7_v11_gL0 pinned |
| 44 | 44-ant-size | What If You Shrank to the Size of an Ant? | done 1399w 83 clips | done | done 473 s | READY 82 scenes | done 7:53 | https://youtu.be/MRLSPaxzfvQ pinned |

**Upload blocker (02:00):** Chrome's Local Network Access permission for studio.youtube.com is in "prompt" state and
in-page fetch to http://127.0.0.1:8765 fails instantly (no prompt appears without the owner at the window). Do NOT
work around the permission. Owner must click Allow once (Chrome prompt / site settings), then upload all finished
renders in order. Account: Black Hole Life (harishsugandhi.work) is now selected in the Studio tab.

**02:03–05:30:** weekly usage limit hit; all agents paused. 05:32: voices 39/41–44 slowed, agents resumed.

**06:45:** renders under heavy load dropped the picture on some frames (blank paper + captions): 38 (460–463 s), 39 (5 spots). 44 clean. Added scripts/blank_scan.py (runs at the end of finish.sh). Re-rendering 38, 39; check every render with blank_scan before upload.
**07:00:** cause = hyperframes "experimental fast capture" (macOS default). finish.sh now renders with --experimental-fast-capture=false. Re-render queue: 38, 39, 42 (v1 files kept as *-v1.mp4).
**07:10:** published eps scanned (renders in Trash): only ep31 "What If the Moon Disappeared?" has a blank 0:33–0:36 on YouTube (3 s). Owner to decide: leave or re-render + re-upload. 32/36 earlier flags were dark night skies (detector fixed: pale + uniform only).
