# Build brief: eps 89 + 92 (2026-11-04 night, orchestrator = bhl-two)

You build the visuals + package for ONE episode. Base brief: `~/videos/black-hole-life/LONGFORM-BUILD.md` (read it first, follow it
exactly; this file adds tonight's rules and wins where they differ).

## Inputs
- `script.md` is final. Do not edit script.md / voice / assets. The voice is being made now by the orchestrator.
- Until `assets/clipt.json` exists, the clip list is `clips-preview.json` in the episode folder (same order as the future
  `script.json`: one entry per clip, `[text, gap, speed, semitones(, who)]`). `W(clip, word)` indices count those entries.
  Preview builds before the voice: follow memory note "scratch preview" = copy the project to
  `<your scratchpad>/black-hole-life/projNN/` (the path MUST contain `/black-hole-life/` or Look K is not injected), write a fake
  `assets/clipt.json` (`{"clips": [[start,end],...], "total": T}`, each clip lasting words/2.8 s with the gap after it) and snapshot there.
  Once `assets/clipt.json` + `script.json` exist in the real folder (the orchestrator slows them to 0.9x), switch to the real folder.

## Tonight's rules (owner: "best, best, best. Not broken". Broken = bad rendered images)
- scenes.js lines 1-3: `// look: still`, `// motion: v2`, `// @library auto`. Look K stick figures (automatic). Dave = the cast man.
- 70-100 scenes, 4-8 s each, 0.6 s crossfades, no hard cuts, never flicker. Every shot shows background + main subject from its
  first frame; only labels/cards/props pop on words.
- `# hud:` lines in script.md = an on-screen HUD tag (top corner card) exactly as written. `# gag:` lines = draw that gag.
  Chapter clock readings as a small corner clock card / chapter card (`# chapter:` text). Keep the HUD consistent all episode.
- Sound: `L.put … { pop: true }` for entrances that deserve a pop; `S.punch` ≤ 2/min on punch words; `S.kick` only on real
  impacts; `S.sfx(W(c,w), name, x)` for physical events; ~1 sound per 3-5 s, no more.
- Before you call it done, QA every scene yourself from snapshots (heavy jobs under `lockf -t 3000 ~/videos/black-hole-life/.heavy.lock`):
  each scene at start + 0.35 s AND end − 0.75 s (dense: at least one still every 5 s overall). READ every contact sheet. Fix:
  missing or garbled assets, blank/black/bare-paper frames, overlapping or clipped text, text under the caption band
  (content y < 940), figures cut in half by the frame edge (motion v2 push creeps 6 %: keep key content ≥ 70 px inside the
  edges), broken/odd library drawings (a prop must look like what it is), labels over faces, a person walking through a desk.
  Re-snapshot until a full pass is clean. `lib.py check scenes.js`, `scene_lint.py`, `build.py .` all clean.
  `npx hyperframes check` may time out at 120 s on 7-min episodes (known, environmental); report it, don't fight it.
- DO NOT render (no `hyperframes render`, no finish.sh). The orchestrator does a 1-min trial, frame_qa and the 4K render.
- Don't edit `~/.claude/skills/whiteboard-video-studio/scripts/*` (owned by up-bhl). Reusable new drawings → `library/` via
  `L.reg` per `library/AGENTS.md` is fine.
- Never read library/*.js, engine2.js, kit.js, or a whole other scenes.js (use `lib.py find/show`, `references/engine-api.md`
  incl. "Motion v2", first ~80 lines of `episodes/49-talk-to-animals/scenes.js` for helper style).

## Thumbnails: the pro pass (`references/thumbnail-pro.md`, read it whole)
3 concepts × 2 critique rounds, then `thumb_hires.py` 2x render for the pick (A) and test partner (B); `thumb_check.py` and READ
the `*_grid.jpg`. Space topics ≥ 40 % near-black. Dave as the single face, 1-3 words of reaction, never the title.
Note your critique in `thumbnails/NOTES.md` (short).

## Package (`package.md` + `upload.json`)
- Template: `references/youtube-package.md` (the ▶ More / ▶ All / ▶ Subscribe lines). Title rules
  (`research/channel-setup.md` §6): `What If You …?`, question first, ≤ 60 chars, no channel suffix.
- Playlist IDs: All `PLN-K-zF7RNW0`, What If `PLSMv6579_BbM`, Space `PLQJ2ptKYaN5w`, Psychology `PLayeD1kJzbZ4`,
  Ancient `PLdoQ3DJyz3eg`, Pep talks `PLI_paQ0Tng1Q`. "More" line = What If for both episodes; list the playlists the video
  goes in (89: All + What If + Space; 92: All + What If).
- Chapters from `# chapter:` comments mapped to the real clipt.json (do this only after the real voice exists; first 0:00).
- Never mention AI, TTS, VoiceStudio or any voice tool in any YouTube text.
- package.md in the format of `episodes/49-talk-to-animals/package.md` (title list with `← **pick**`, `## Description`,
  `## Tags`, `## Pinned comment`), then `python3 ~/videos/black-hole-life/prep-upload.py .` must pass (it writes `renders/upload.json`;
  `mkdir -p renders` first). Also list the playlist IDs the video goes in under a `## Playlists` heading.

When done: empty `READY` file; final reply = scene count, lint/check results, which sheets you read and what you fixed, thumb pick.
