#!/usr/bin/env python3
"""Render a thumbnail at 2x (3840x2160 from the 1920x1080 frame) and downsample to a crisp 1280x720 (+ a 2560x1440 copy).

usage: python3 ~/.claude/skills/whiteboard-video-studio/scripts/thumb_hires.py PROJECT_DIR thumbnails/thumb-a.js thumbnails/a.png   (any channel)
Writes c.png (1280x720, what YouTube shows; < 2 MB) and c-2560.jpg (sharp preview)."""
import pathlib, subprocess, sys, tempfile
BUILD = pathlib.Path.home() / '.claude/skills/whiteboard-video-studio/scripts/build.py'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
ep, src, out = pathlib.Path(sys.argv[1]).resolve(), sys.argv[2], pathlib.Path(sys.argv[1]).resolve() / sys.argv[3]
tmp = pathlib.Path(tempfile.mkdtemp(prefix='sdthumb-', dir=out.parent))  # next to the output so the font paths resolve
subprocess.run([sys.executable, str(BUILD), str(ep), '--thumb', src, str(tmp / 'x.png')], check=True, capture_output=True)
big = tmp / 'big.png'
subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=2', '--window-size=1920,1080',
                '--virtual-time-budget=5000', f'--screenshot={big}', f'file://{tmp / "x.html"}'], check=True, capture_output=True)
subprocess.run(['magick', str(big), '-filter', 'Lanczos', '-resize', '1280x720', '-strip', str(out)], check=True)
subprocess.run(['magick', str(big), '-filter', 'Lanczos', '-resize', '2560x1440', '-quality', '92', str(out.with_name(out.stem + '-2560.jpg'))], check=True)
subprocess.run(['trash', str(tmp)], check=True)
print(out, out.stat().st_size // 1024, 'KB')
