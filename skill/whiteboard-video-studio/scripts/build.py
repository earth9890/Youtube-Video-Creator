#!/usr/bin/env python3
"""Assemble a whiteboard-video-studio v2 project into a renderable HyperFrames index.html.

usage: build.py PROJECT_DIR

Needs in PROJECT_DIR:
  script.json            [["sentence", pauseAfter], ...]
  assets/clipt.json      from voice.py (clip start/end + total)
  scenes.js              your scene code (first line may be `// theme: dark` for the chalkboard look)
Creates/updates: assets/words.json (via words.py), assets/fonts/*, index.html,
                 hyperframes.json / meta.json / package.json (if missing).
Audio: uses assets/mix.wav (voice + music) when present, else assets/voice.wav.
"""
import json, os, shutil, subprocess, sys, pathlib

HERE = pathlib.Path(__file__).resolve().parent
SKILL = HERE.parent
proj = pathlib.Path(sys.argv[1]).resolve()
A = proj / 'assets'
A.mkdir(exist_ok=True)

# --- timing ---
words, clipt = A / 'words.json', A / 'clipt.json'
if clipt.exists() and (not words.exists() or words.stat().st_mtime < clipt.stat().st_mtime):
    subprocess.run([sys.executable, str(HERE / 'words.py'), str(proj / 'script.json'), str(clipt), str(words)], check=True)
timing = json.load(open(words))
total = timing['total']

# --- theme ---
scenes = (proj / 'scenes.js').read_text()
dark = scenes.lstrip().startswith('// theme: dark')
paper = '#25272a' if dark else '#fdfcf8'
capc = '#f1efe8' if dark else '#2a2a2a'

# --- fonts ---
(A / 'fonts').mkdir(exist_ok=True)
for f in ('PatrickHand.ttf', 'Caveat.ttf'):
    if not (A / 'fonts' / f).exists():
        shutil.copy(SKILL / 'brand' / f, A / 'fonts' / f)

# --- audio ---
audio = 'assets/mix.wav' if (A / 'mix.wav').exists() else ('assets/voice.wav' if (A / 'voice.wav').exists() else None)
audio_tag = f'<audio id="vo" src="{audio}" data-start="0" data-duration="{total}" data-track-index="1" data-volume="1"></audio>' if audio else ''

engine = (HERE / 'engine2.js').read_text()
html = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      @font-face {{ font-family: "Caveat"; src: url("assets/fonts/Caveat.ttf") format("truetype"); font-weight: 400 700; }}
      @font-face {{ font-family: "PH"; src: url("assets/fonts/PatrickHand.ttf") format("truetype"); }}
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: {paper}; }}
      #root {{ position: relative; width: 100%; height: 100%; background: {paper}; }}
      #stage {{ position: absolute; inset: 0; width: 100%; height: 100%; }}
      .cap {{ position: absolute; left: 0; right: 0; bottom: 16px; height: 84px; display: flex; justify-content: center; align-items: center; gap: 16px;
             font-family: "Caveat", cursive; font-weight: 700; font-size: 66px; color: {capc}; opacity: 0; white-space: nowrap; }}
      .cap span {{ opacity: 0; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1920" data-height="1080">
      <svg id="stage" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="marker" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
          </filter>
        </defs>
        <g id="board" filter="url(#marker)"></g>
      </svg>
      <div id="caps"></div>
      {audio_tag}
    </div>
    <script>
      const THEME = "{'dark' if dark else 'light'}";
      const TIMING = {json.dumps(timing)};
{engine}
// ===================== scenes.js =====================
{scenes}
// =====================================================
      captions(TIMING.chunks);
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
'''
(proj / 'index.html').write_text(html)

slug = proj.name
if not (proj / 'hyperframes.json').exists():
    json.dump({"$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
               "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
               "paths": {"blocks": "compositions", "components": "compositions/components", "assets": "assets"},
               "media": {"autoProxy": True}, "authoringSkill": "general-video"}, open(proj / 'hyperframes.json', 'w'), indent=2)
if not (proj / 'meta.json').exists():
    json.dump({"id": slug, "name": slug}, open(proj / 'meta.json', 'w'), indent=2)
if not (proj / 'package.json').exists():
    json.dump({"name": slug, "private": True, "type": "module"}, open(proj / 'package.json', 'w'), indent=2)
print(f'built {proj / "index.html"}  total={total}s theme={"dark" if dark else "light"} audio={audio}')
