#!/usr/bin/env python3
"""Assemble a whiteboard-video-studio v2 project into a renderable HyperFrames index.html.

usage: build.py PROJECT_DIR                         # video: scenes.js -> index.html
       build.py PROJECT_DIR --thumb thumb-a.js OUT.png   # thumbnail: static frame -> 1280x720 PNG

Video mode needs in PROJECT_DIR:
  script.json            [["sentence", pauseAfter], ...]
  assets/clipt.json      from voice.py (clip start/end + total)
  scenes.js              your scene code (first line may be `// theme: dark` for the chalkboard look)
Creates/updates: assets/words.json (via words.py), assets/fonts/*, index.html,
                 hyperframes.json / meta.json / package.json (if missing).
Audio: uses assets/mix.wav (voice + music) when present, else assets/voice.wav.

Thumb mode: the .js file is scene code for ONE frame — use `const S = scene(0, 1, {cam:"none"})` and draw
everything at t=0 with dur <= 0.6. Rendered with headless Chrome at 1920x1080, resized to 1280x720.
"""
import json, os, shutil, subprocess, sys, pathlib

HERE = pathlib.Path(__file__).resolve().parent
SKILL = HERE.parent
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
args = sys.argv[1:]
proj = pathlib.Path(args[0]).resolve()
A = proj / 'assets'
A.mkdir(exist_ok=True)
thumb = '--thumb' in args

# --- fonts ---
(A / 'fonts').mkdir(exist_ok=True)
for f in ('PatrickHand.ttf', 'Caveat.ttf'):
    if not (A / 'fonts' / f).exists():
        shutil.copy(SKILL / 'brand' / f, A / 'fonts' / f)

if thumb:
    js_path = proj / args[args.index('--thumb') + 1]
    out_png = proj / args[args.index('--thumb') + 2]
    scenes = js_path.read_text()
    timing = {"total": 1.0, "words": [], "chunks": [], "clips": []}
    audio_tag = ''
    end_js = 'tl.progress(1);'
else:
    words, clipt = A / 'words.json', A / 'clipt.json'
    if clipt.exists() and (not words.exists() or words.stat().st_mtime < clipt.stat().st_mtime):
        subprocess.run([sys.executable, str(HERE / 'words.py'), str(proj / 'script.json'), str(clipt), str(words)], check=True)
    timing = json.load(open(words))
    scenes = (proj / 'scenes.js').read_text()
    audio = 'assets/mix.wav' if (A / 'mix.wav').exists() else ('assets/voice.wav' if (A / 'voice.wav').exists() else None)
    audio_tag = f'<audio id="vo" src="{audio}" data-start="0" data-duration="{timing["total"]}" data-track-index="1" data-volume="1"></audio>' if audio else ''
    end_js = 'tl.seek(0);'

total = timing['total']
dark = scenes.lstrip().startswith('// theme: dark')
paper = '#25272a' if dark else '#fdfcf8'
capc = '#f1efe8' if dark else '#2a2a2a'
engine = (HERE / 'engine2.js').read_text()
font_base = 'assets/fonts/' if not thumb else os.path.relpath(A / 'fonts', out_png.parent) + '/'

html = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      @font-face {{ font-family: "Caveat"; src: url("{font_base}Caveat.ttf") format("truetype"); font-weight: 400 700; }}
      @font-face {{ font-family: "PH"; src: url("{font_base}PatrickHand.ttf") format("truetype"); }}
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
      const THUMB = {'true' if thumb else 'false'};
      const TIMING = {json.dumps(timing)};
      window.__timelines = window.__timelines || {{}};
{engine}
// ===================== scenes =====================
{scenes}
// ==================================================
      captions(TIMING.chunks);
      window.__timelines["main"] = tl;
      {end_js}
    </script>
  </body>
</html>
'''

if thumb:
    out_png.parent.mkdir(parents=True, exist_ok=True)
    html_path = out_png.with_suffix('.html')
    html_path.write_text(html)
    big = out_png.with_name(out_png.stem + '_1920.png')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1920,1080',
                    '--virtual-time-budget=4000', f'--screenshot={big}', f'file://{html_path}'], check=True, capture_output=True)
    subprocess.run(['magick', str(big), '-resize', '1280x720', str(out_png)], check=True)
    subprocess.run(['magick', str(big), '-resize', '320x180', str(out_png.with_name(out_png.stem + '_glance.png'))], check=True)  # the glance test
    big.unlink()
    print(f'thumbnail {out_png}  theme={"dark" if dark else "light"}')
else:
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
