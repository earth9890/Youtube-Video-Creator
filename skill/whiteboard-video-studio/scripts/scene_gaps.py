#!/usr/bin/env python3
"""Find blank stretches: times no scene covers (a gap shows bare paper, e.g. scene i ends before scene i+1 starts).
usage: python3 scene_gaps.py EPISODE_DIR   (run after build.py). Exit 1 if any gap >= 0.05 s.
ponytail: reads the engine's window.__SCENES via headless Chrome --dump-dom; no hyperframes needed."""
import json, re, subprocess, sys, pathlib
ep = pathlib.Path(sys.argv[1]).resolve(); src = (ep / 'index.html').read_text()
probe = """<script>setTimeout(()=>{const s=(window.__SCENES||[]).slice().sort((a,b)=>a[0]-b[0]);const T=typeof TOTAL!=='undefined'?TOTAL:0;let g=[],c=0;
for(const [a,b] of s){if(a>c+0.05)g.push([+c.toFixed(2),+a.toFixed(2)]);c=Math.max(c,b)}if(c<T-0.05)g.push([+c.toFixed(2),+T.toFixed(2)]);
document.documentElement.setAttribute('data-gaps',JSON.stringify({n:s.length,total:T,gaps:g}))},300)</script></body>"""
tmp = ep / '.gaps.html'; tmp.write_text(src.replace('</body>', probe, 1))
try:
    dom = subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '--headless=new', '--disable-gpu', '--virtual-time-budget=8000', '--dump-dom', tmp.as_uri()], capture_output=True, text=True, timeout=180).stdout
finally:
    subprocess.run(['trash', str(tmp)])
m = re.search(r"data-gaps=\"([^\"]+)\"", dom)
if not m: sys.exit(print('no result (page error?)') or 2)
r = json.loads(m[1].replace('&quot;', '"'))
print(f"{ep.name}: {r['n']} scenes, total {r['total']} s, gaps: {r['gaps'] or 'none'}")
sys.exit(1 if r['gaps'] else 0)
