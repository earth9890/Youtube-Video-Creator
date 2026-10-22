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
import json, os, re, shutil, subprocess, sys, pathlib

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
for f in ('PatrickHand.ttf', 'Caveat.ttf', 'Mali-SemiBold.ttf'):
    if not (A / 'fonts' / f).exists():
        shutil.copy(SKILL / 'brand' / f, A / 'fonts' / f)

if thumb:
    js_path = proj / args[args.index('--thumb') + 1]
    out_png = proj / args[args.index('--thumb') + 2]
    scenes = js_path.read_text()
    src_dir = js_path.parent
    timing = {"total": 1.0, "words": [], "chunks": [], "clips": []}
    audio_tag = ''
    end_js = 'tl.progress(1);'
else:
    words, clipt = A / 'words.json', A / 'clipt.json'
    if clipt.exists() and (not words.exists() or words.stat().st_mtime < clipt.stat().st_mtime):
        subprocess.run([sys.executable, str(HERE / 'words.py'), str(proj / 'script.json'), str(clipt), str(words)], check=True)
    timing = json.load(open(words))
    scenes = (proj / 'scenes.js').read_text()
    src_dir = proj
    audio = 'assets/mix.wav' if (A / 'mix.wav').exists() else ('assets/voice.wav' if (A / 'voice.wav').exists() else None)
    audio_tag = f'<audio id="vo" src="{audio}" data-start="0" data-duration="{timing["total"]}" data-track-index="1" data-volume="1"></audio>' if audio else ''
    end_js = 'tl.seek(0);'

# `// @include path/to/cast.js` (relative to the scenes file) pastes a shared file in, e.g. a channel's recurring characters
scenes = re.sub(r'^// @include (\S+)\s*$', lambda m: (src_dir / m[1]).read_text(), scenes, flags=re.M)
# `// @library` pastes the asset library (library/*.js, see references/asset-library.md); `// @library props-home,sky` = core + people + stylelab + those
# `// @library auto` = only the files this scene's asset names need (scripts/lib.py + library/catalog.json); `auto,sky` also forces sky
LIB = SKILL / 'library'
def _lib(m):
    rest = [p.stem for p in sorted(LIB.glob('*.js')) if p.stem not in ('core', 'people', 'stylelab', 'build-catalog', 'manifest')]
    names = ['core', 'people', 'stylelab'] + ([n.strip() for n in m[1].split(',')] if m[1] else rest)
    if 'auto' in names:
        sys.path.insert(0, str(HERE))
        import lib
        forced = [n for n in names[3:] if n != 'auto']
        names, unknown = lib.bundle(lib.load(), scenes, forced)
        if unknown:
            sys.exit(f'@library auto: no library file {", ".join(unknown)}')
        full = sum((LIB / f'{n}.js').stat().st_size for n in ['core', 'people', 'stylelab'] + rest)
        used = sum((LIB / f'{n}.js').stat().st_size for n in names)
        print(f'@library auto: {" ".join(names)} = {used // 1024} KB (saved {(full - used) // 1024} KB of {full // 1024} KB)')
    return '\n'.join((LIB / f'{n}.js').read_text() for n in dict.fromkeys(names))
scenes = re.sub(r'^// @library(?: (\S+))?\s*$', _lib, scenes, flags=re.M)
total = timing['total']
dark = scenes.lstrip().startswith('// theme: dark')
story = '// look: story' in scenes[:300]  # long-form explainer: v3 drawing + hard cuts, no captions
still = '// look: still' in scenes[:300]  # illustrated stills: crisp vector, progressive build, slow camera (references/style-guide.md)
v3 = story or still or '// look: v3' in scenes[:300]  # bold outline + colour scenery look (engine2 V3 branch)
paper = '#25272a' if dark else '#fdfcf8'
capc = '#f1efe8' if dark else '#2a2a2a'
engine = (HERE / 'engine2.js').read_text() + ('\n' + (HERE / 'kit.js').read_text() if still else '')  # kit.js = design-system tokens + depth/light helpers
font_base = 'assets/fonts/' if not thumb else os.path.relpath(A / 'fonts', out_png.parent) + '/'
ph_font = f'src: url("{font_base}Mali-SemiBold.ttf") format("truetype");' if v3 else f'src: url("{font_base}PatrickHand.ttf") format("truetype");'
# v3 captions: heavy white letters with a dark outline — readable on any scenery colour
cap_css = ('font-family: "PH", sans-serif; font-size: 56px; color: #ffffff; -webkit-text-stroke: 10px #1d1b1f; paint-order: stroke fill;'
           if v3 else f'font-family: "Caveat", cursive; font-weight: 700; font-size: 66px; color: {capc};')

html = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      @font-face {{ font-family: "Caveat"; src: url("{font_base}Caveat.ttf") format("truetype"); font-weight: 400 700; }}
      @font-face {{ font-family: "PH"; {ph_font} }}
      @font-face {{ font-family: "Mali"; src: url("{font_base}Mali-SemiBold.ttf") format("truetype"); }}
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: {paper}; }}
      #root {{ position: relative; width: 100%; height: 100%; background: {paper}; }}
      #stage {{ position: absolute; inset: 0; width: 100%; height: 100%; }}
      .cap {{ position: absolute; left: 0; right: 0; bottom: 16px; height: 84px; display: flex; justify-content: center; align-items: center; gap: 16px;
             {cap_css} opacity: 0; white-space: nowrap; }}
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
      const LOOK = "{'still' if still else 'story' if story else 'v3' if v3 else 'v2'}";
      const TIMING = {json.dumps(timing)};
      window.__timelines = window.__timelines || {{}};
{engine}
// ===================== scenes =====================
{scenes}
// ==================================================
      {'' if story else 'captions(TIMING.chunks);'}
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
