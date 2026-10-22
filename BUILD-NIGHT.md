# Overnight build brief (episodes 39–44)

You build visuals, package and thumbnails for one episode. Follow `~/videos/black-hole-life/LONGFORM-BUILD.md` exactly
(Skill `whiteboard-video-studio`, v3 look, 0.6 s crossfades, no hard cuts, W(clip, word) cues, scene_lint, build.py,
`npx hyperframes check`, contact sheets you READ yourself, heavy commands under
`lockf -t 3000 ~/videos/black-hole-life/.heavy.lock` run in the FOREGROUND (the lock waits for itself; never wait on
background notifications), package.md like 27-not-behind, no render, no upload, no git, `trash` not `rm`).
Latest finished examples to copy look and structure from: `episodes/38-full-brain` (if READY exists there),
`episodes/37-placebo-buttons`, `episodes/31-moon-disappeared`. Copy hyperframes.json / meta.json / package.json from 37.

Inputs: `script.md` (read its # header: beat sheet, runner object, cast, safety notes), `script.json` (one entry per clip;
a 5th element names the speaking character, e.g. 'dave', 'brain', 'doc'), `sources.md`, `title.md` (pick 1, thumbnail ideas).

## Two phases
1. **Now (no audio yet):** scaffold, design any new character, write the whole scenes.js with W(clip, word) cues
   (clip numbering as in 37's scenes.js), scene_lint it, write package.md (chapter timestamps TODO), build both
   thumbnails. Then STOP and end your reply with "WAITING FOR VOICE". Do not poll for the voice.
2. **After my message** (`assets/VOICE-DONE` exists; voice.wav/clipt.json already slowed 0.9×): build, snapshot,
   read contact sheets, fix, fill chapter timestamps from clipt.json, create `READY`.

## Characters
- Dave = our usual Dave; he speaks with his own voice: show him talking on his quoted lines.
- Dave's **Brain** (if in the cast) = the small pink brain with round librarian glasses from `episodes/38-full-brain`
  (copy her helper from its scenes.js so she looks identical); she pops out of Dave's head on her lines.
- Other cast tags (doc, news, kid, old): a simple labelled generic figure, consistent across scenes. No real people.

## Visual rules
- One image per clause: whatever the narrator names appears when it is said. Numbers exactly as sources.md.
- **No flashing, strobing or rapid brightness changes anywhere** (photosensitivity). Danger beats are calm and kind.
- No brands or logos (generic cans, generic products), no likenesses, no gore.

## Thumbnails
`references/thumbnail-designer.md` ★ clickbait scene mode = thumbnail A (reference build
`episodes/28-ancient-fun/thumbnails/thumb-c.js` → c.png): `thumb-a.js` → `a.png` from title.md idea A, and
`thumb-b.js` → `b.png` (old style, idea B). Read both PNGs yourself and iterate. Valid poses: stand sad point pointL
armsUp shrug think hips wave cross head reach reachL hold push (an invalid pose silently stops everything after it).

Description: never mention AI, TTS, VoiceStudio or any voice tool. Sources from sources.md.
Final reply (phase 2): scene count, lint/check results, contact sheets reviewed, thumbnails, title, anything to look at.

Library: search `lib.py find <words>` (see LONGFORM-BUILD.md "Asset library lookup") before drawing a prop, room or duo scene yourself.
