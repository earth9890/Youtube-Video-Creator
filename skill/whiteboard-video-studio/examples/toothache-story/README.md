# Example: "What Did Ancient Humans Do About Toothache?" (8-min story mode, episode 11)

This was the first long-form story explainer, built to match the measured Zenn / Past Tense style (`references/story-explainer.md`): 1,465 words, 8:02, 207 shots, hard cuts, voice only. It was **rejected**: "really bad video i didnt like it at all the transitions from one scene to another feels flicker".

## What to reuse
- **`parts/00-base.js`, the prop library (~60 props):**
  - Teeth and dental: tooth (molar or incisor, with pulp, cavity, rot, hole, crack, grooves, gold, face, pain), pain zigzags, worm, flint, rock, bowDrill, pliers, gasBag, dentures.
  - Other objects: tablet, papyrus, frog, pot, jar, onion, incense, sugar, bacteria, acorn, wheat, pill, coin, pin, land, skull, bridge, stars5, graph, nums, hairBall, blood.
  - People: person, cave, you, doc, glasses, bandage, crown.
- **`parts/99-run.js`, the shot-list pattern:** `SHOTS` sorted by (clip, word); each shot starts at `W(clip, word) - 0.08` and runs until the next one; a warning fires if any shot runs over 6.5 s. `assemble.sh` concatenates `parts/*.js` into `scenes.js`.
- **`script.json` and `sources.md`:** a full 8-minute beat sheet with sources, every fact verified.
- **`package.md`:** title options, description, tags and pinned comment. It also shows a correction: an invented "38%" claim was replaced with the true one.
- **`thumbnails/thumb-a.js` / `thumb-b.js`:** archetype A (worried caveman, rock and rotten tooth, yellow "WITH A ROCK?") and archetype B (black background, worm crawling out of a tooth, no text).

## What NOT to repeat
1. **Hard cuts every ~2.3 s between unrelated stills** felt like flicker to the owner, even though the reference channels cut that way. Default to the v3 look: 3–4 s scenes, 0.3 s crossfades, draw-on reveals, camera moves. Use story mode only if the owner asks for it.
2. **Building 8 minutes before a 1-minute trial was approved.** Make a 1-minute trial first, every time.
3. **The script was written before `references/script-writer.md` existed.** It uses the old "[S] sarcasm beat" marks and a documentary tone. `script.md` here is a writing draft with old marks (`{0.6}`, `[S]`) that **voice.py's new md parser does not understand**; use `script.json` with it. Rewrite any new long script with script-writer.md §2.2.

## Build (for reference)
```sh
sh assemble.sh                      # parts/*.js -> scenes.js -> build.py (story look: first line "// look: story")
~/.claude/skills/whiteboard-video-studio/scripts/finish.sh . none   # voice-only mix at -15 LUFS, 4K render with HF_CAPTURE_PARALLEL_STREAM=true
```
