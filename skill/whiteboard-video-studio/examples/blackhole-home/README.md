# Example: "What If We Live Inside a Black Hole?" (1-min trial, episode 12)

This example shows how the script writer was learned: the same topic written three times. Only v3 was approved ("good job brother I like the voice").

| Version | Files | Owner verdict | Why |
|---|---|---|---|
| v1 documentary | `rejected-v1-documentary/` | "you don't want to be a knowledgeable thing… we want fun content, not like researching about this really happened" | Research tone: dates, names and study numbers back to back ("In 1972, a physicist named Raj Pathria…"); no narrator character, no jokes |
| v2 relatable gags | `rejected-v2-relatable-gags/` | "script writing… really bad… storytelling is really so weak" | 12 gags in 60 s, and **every one was about the viewer's life, not the topic**: Mondays, traffic, Wi-Fi, the family WhatsApp group, "cosmic Kinder Joy", "Boom!", "Surprise!". Fails the Joke Law (delete and move tests). `script_lint.py` gives it 12 FAILs |
| **v3 (approved)** | `script.md`, `script.json` | "I like the voice and all" | Built with `references/script-writer.md`: nesting-list hook, one rule, test dummy Dave, runner "Probably.", fact sandwich, sceptic as a character, callback ending. Lint: PASS. 197 words, 66 s, 38 clips |

## v3 production commands
```sh
python3 ~/.claude/skills/whiteboard-video-studio/scripts/script_lint.py script.md          # must PASS
~/.venvs/pocket/bin/python ~/.claude/skills/whiteboard-video-studio/scripts/voice.py script.md assets --lead 0.4 --tail 1.5 --speed 1.0
# -> assets/voice.wav, assets/clipt.json, and script.json (one entry per CLIP: [text, gap, speed, semitones])
# Check: whisper-cli transcript matched word for word; silencedetect median gap 0.24 s (was ~0.7 s before the trim fix)
ffmpeg -i assets/voice.wav -af loudnorm=I=-15:TP=-1.5 -b:a 192k voice.mp3              # send the owner audio only, before any visuals
```
Visual cues for v3 use **clip numbers from the generated `script.json`** (38 clips), not the 15 lines of script.md.

## Reusable visuals
These scene helpers are copy-paste ready for space and comedy topics:
- **`rejected-v2-relatable-gags/scenes.js`** (v3 look, crossfades, 22 scenes):
  - `blackHole()`: back disk, lensed arc over the top, photon ring, front disk. It reads as a black hole, not Saturn.
  - `galaxy()`: spiral arms, optional spin, and `eyes: true` for shifty side-glancing eyes.
  - `house()`, `earth()`, `wifi(bars)`, `car()`, and chat `bubble()`.
  - A carousel built from primitives (in the merry-go-round scene).
  - A cracking-egg reveal using `tl.to(top, {rotation, svgOrigin})`.
  - Objects sucked into the black hole (`tl.to(g, {x, y, rotation, opacity: 0})`).
  - A hero falling into the hole while spinning and shrinking.
- **`rejected-v1-documentary/scenes.js`:** the first version of these helpers, plus a JWST hexagon mirror, an "=" size comparison, and a "NO SPAGHETTI" scene.
- **Thumbnails.** One v1 thumbnail (rejected by our own grid test) and two v2 thumbnails built from `references/thumbnail-designer.md`:

  | File | Archetype | Verdict in the feed grid (`thumb_check.py`) |
  |---|---|---|
  | `thumb-a.js` → `a.png` "WE LIVE HERE?" | A, full-body figure + tilted ring | **Fails.** Lint passes (3 words, text 0.16, edges 0.13, 71 % black), but at feed size the tilted orange ring reads as **Saturn**, the figure's head is about 10 % of the height, and the house is a second focal point. |
  | `thumb-c.js` → `c.png` "NO WAY OUT" | Space icon (G/F): front-on ring black hole, Earth inside the disc, white "US" scale arrow, no character | Reads at once as a black hole with us inside. Stakes text, 81 % black, edges 0.12. |
  | `thumb-d.js` → `d.png` "WE'RE INSIDE?" | A with a big-head crop: Dave at s 4.3 (head ≈ 40 % of height), worried, with tea; a huge black hole on the right with Earth inside | The face and the wrongness both read in the grid. The floor-raiser variant; pair it with C in Test & Compare. |

  `BH()`, `STARS()` and `EARTH()` at the top of thumb-c.js are the reusable black-hole icon kit.

## Visual lessons from this episode
- Comedy visuals land when each one *is* the line: a sock flying into the hole, Dave holding his tea. A visual that decorates a gag the narrator is telling separately doesn't land.
- Keep scenes 2.5–4 s with 0.3 s crossfades. Merge any window under 2 s into a neighbour (the owner calls rapid cuts "flicker").
- Labels go at the top (y ≈ 120–260), never in the bottom ~120 px where captions sit. `npx hyperframes check` flags `content_overlap` with captions.
- Figures drawn on a black hole need `c: "#ffffff"` or they vanish.
