# Build brief: episodes 46–49 (2026-10-28)

You build the visuals, package and thumbnails for one episode. Follow `BUILD-NIGHT.md` and `LONGFORM-BUILD.md` in this
folder exactly (two phases, W(clip, word) cues, 0.6 s crossfades, no hard cuts, no flashing, scene_lint, build.py,
`npx hyperframes check`, contact sheets you READ yourself, heavy commands in the FOREGROUND under
`lockf -t 3000 ~/videos/black-hole-life/.heavy.lock`, no render, no upload, no git, `trash` never `rm`).
What changed since those briefs:

1. **Model episode = `episodes/45-see-thoughts`** (latest published). Copy its hyperframes.json / meta.json / package.json
   (edit id/name), and copy the shape of its scenes.js (read only its first ~80 lines: header, SHOTS/shot/END helpers) and
   its package.md format. The Brain helper is the ep38/ep45 one (kit-brain-* in the library).
2. **Look K is the BHL default (owner, 2026-10-22): pure stick figures for every person.** build.py injects `L.look("K")`
   by itself. Never call `L.look(...)`. Every person (Dave, doc, news, old, kid, crowds, duo/activity assets) draws as a
   pure stick figure: white circle head, no clothes. Tell cast apart by props, labels and one accent colour (doc's
   clipboard and glasses, the anchor's desk and mic, the captain's cap and pipe-free beard...), consistent in every scene.
   On each contact sheet check the figures really are pure stick and that faces/emotions read.
3. **`script.json` already exists** (written from script.md with voice.py's own parser; clip numbers are final):
   46 = 71 clips, 47 = 75, 48 = 82, 49 = 85. Cue with W(clip, word) against it. Voice is being generated now; phase 2
   starts when I message you (`assets/VOICE-DONE` exists, voice.wav/clipt.json already slowed 0.9×). Don't poll for it.
4. **Thumbnails get the pro pass** (owner standard for all channels): read
   `~/.claude/skills/whiteboard-video-studio/references/thumbnail-pro.md` fully and do every step: 3 concepts (start from
   title.md ideas A and B, add a C), ≥ 2 written critique rounds per concept in the thumb file header, feed test with
   `thumb_check.py`, then the final pick rendered with `scripts/thumb_hires.py PROJECT thumbnails/thumb-x.js thumbnails/x.png`.
   Deliver `a.png` (pick) and `b.png` (test partner). Bar: dramatic, one giant emotional face, clear at 168 px, honest.
   Phase 1 builds thumbnails with the plain `build.py --thumb`; run thumb_hires.py for the final two in phase 2.
5. Reusable assets you draw: one new file `library/ep<NN>-<topic>.js` (contract `library/AGENTS.md`); touch no other
   library file, tool or shared script. Episode-only drawings stay in your scenes.js.
6. Package title: the pick in title.md, dramatic but true (≤ 55 chars); you may improve it. Never mention AI, TTS,
   VoiceStudio or any voice tool anywhere.

Stay inside `episodes/<your folder>/` (plus your one library file). Phase 1 ends with "WAITING FOR VOICE".
Phase 2 ends with `READY` in the folder and a final reply: scene count, lint/check, sheets reviewed, thumbnail pick and
its critique scores, title, anything the owner should look at.
