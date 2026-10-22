# Thumbnail pro pass (all channels: Black Hole Life, Tiny Tune Town, Stack Doodle)

Owner rule (2026-10-22): "take a little bit of time… the thumbnail should be the best… pixel perfect, clear, clickbait…
like a professional designer / photographer who knows human psychology." A thumbnail is half of the click. It gets real
time: **3 concepts, at least 2 rounds of critique each, then the best one at high resolution.** Channel rules still apply
on top (BHL: `thumbnail-designer.md`; Tiny Tune Town: `tiny-tune-town/references/thumbnails.md`; Stack Doodle:
`stack-doodle/references/package.md`).

## 1. Psychology: what makes a thumb stop a scrolling thumb
1. **One focal point, read in under 1 second at 168×94.** Squint test: blur it and you should still see what it is. One
   subject, one action. Everything else supports or goes.
2. **A face with one extreme, specific emotion** (shock, dread, smug, delight), big: 30–45 % of the frame height, eyes
   readable at feed size. People look where the face looks: point the eyes or the hand at the object of the story.
3. **Curiosity gap.** Show the moment just before or just after the consequence, not the explanation. The viewer must
   ask "what happened?" or "is that real?", and only the video answers. The title is the promise; the thumbnail is the
   hook; they never repeat each other.
4. **Stakes cues:** danger, scale contrast (tiny next to huge), something broken/cracked/on fire, a countdown, a "wrong"
   detail, before/after. Novelty beats prettiness.
5. **Text:** 0–3 words, giant (≥ 12 % of frame height per line), two colours max, heavy outline or drop shadow, in the
   top-left/left third. Words add the emotion or claim ("WEB CRACKED", "TOO LOUD?"), never the title again.
6. **Colour:** one dominant saturated hue against a dark or flat ground, one complementary accent; maximum brightness
   contrast between subject and background; avoid YouTube-red/white noise. Glow behind the subject separates it.
7. **Composition:** rule of thirds; foreground / subject / background depth (big cropped face in front, the object in the
   middle, a glow or scene behind); a light source (rim light, beam, glow) on the subject; leading lines or one arrow to
   the focal point. Crop faces and objects off the frame edge to feel close and big.
8. **Keep clear:** the bottom-right corner (timestamp overlay) and the extreme edges (mobile crop).
9. **Honest clickbait:** exaggerate what is true, never invent it. If the video can't pay it off, it's a lie that kills
   retention and can get the channel penalised.

## 2. Process (do every step; budget 30–45 min)
1. Write 3 concepts in one line each: A = the claim/emotion (face + words), B = the object/scene as hero, C = the absurd
   moment. Pick the strongest emotion + curiosity per concept.
2. Build each at the 1920×1080 frame (`build.py PROJECT --thumb thumbnails/thumb-x.js thumbnails/x.png`) and READ it.
3. **Critique round** (write it down in the thumb file header): score 1–5 on focal clarity at 168 px, emotion, curiosity,
   contrast/separation, text legibility, composition/depth, polish (edges, alignment, no overlap), honesty, brand fit.
   Fix every row under 4. Repeat at least twice.
4. Feed test: `scripts/thumb_check.py` (lint + feed grid next to competitors); look at the grid at 100 % and squinting.
   Also check on a light and a dark background, and at mobile size.
5. **Final render, pixel perfect:** `python3 ~/.claude/skills/whiteboard-video-studio/scripts/thumb_hires.py PROJECT
   thumbnails/thumb-a.js thumbnails/a.png` → renders the vector frame at 2× (3840×2160) and Lanczos-downsamples to a crisp
   1280×720 PNG (< 2 MB) + a 2560×1440 preview. Vector only (no pasted low-res rasters); text as vector; check edges zoomed.
6. Upload A; keep B and C for Test & Compare (up to 3).

## 3. Craft checklist (polish that separates pro from amateur)
- Die-cut/outline or drop shadow on every subject so it pops off the ground; consistent light direction.
- Text kerning even, lines aligned to one edge, a slight tilt (−3°) for energy, not chaos.
- No element touching another by accident; no tangents (edges that just kiss); breathing room around the face.
- Line weights consistent with the channel look; no stray thin lines that vanish at feed size.
- The face's expression matches the words (shock + "CRACKED", not smile + "CRACKED").
- Series badge/logo small and in the same place every time (recognition), never competing with the focal point.
