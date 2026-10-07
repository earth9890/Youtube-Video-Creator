import sys, pathlib
sys.path.insert(0,str(pathlib.Path(__file__).parent))
from gen import *
H2=HEAD.replace('@font-face{font-family:"Caveat"','@font-face{font-family:"PH";src:url("PatrickHand.ttf")}@font-face{font-family:"Caveat"')
def wr(name,body,defs=''):
    p=ROOT/'src'/f'{name}.html'; p.write_text(H2+svg(1280,720,body,defs)+'</body></html>'); return p
WOB='<filter id="w"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="6" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter>'
def sit(x,y,col,sw=6):
    return f'<g stroke="{col}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="{x}" cy="{y-70}" r="17"/><path d="M{x} {y-53} L{x} {y-12} L{x+34} {y-12} L{x+34} {y+28} M{x} {y-40} L{x+26} {y-24}"/><path d="M{x-10} {y-62} l6 3 M{x+2} {y-62} l6 -3" stroke-width="3"/></g>'
def climber(x,y,col,sw=6,s=1.0):
    return fig(x,y,s,col,sw,"up")
def text(x,y,t,size,fill,font="PH",anchor="start",extra=""):
    return f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" {extra}>{t}</text>'
# ---------- T1: dark, "MOST PEOPLE QUIT HERE" ----------
def t1():
    W="#f2f2f2"; R="#ff5a4d"
    b='<rect width="1280" height="720" fill="#2b2b2b"/><g filter="url(#w)">'
    b+=text(640,150,'MOST PEOPLE',128,W,anchor="middle")+f'<text x="640" y="290" font-family="PH" font-size="165" text-anchor="middle" fill="{W}"><tspan fill="{R}">QUIT</tspan> HERE.</text>'
    pts=[(110,680)]
    for i in range(5):
        pts+= [(110+190*(i+1),680-62*i),(110+190*(i+1),680-62*(i+1))]
    b+=f'<path d="M'+' L'.join(f'{x} {y}' for x,y in pts)+f'" fill="none" stroke="{W}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    b+=sit(255,680-62*0-1,W)+sit(440,680-62*1-1,W)
    b+=climber(700,680-62*2-2,W,6,.95)
    # flag
    b+=f'<path d="M1010 368 L1010 270" stroke="{W}" stroke-width="6" stroke-linecap="round"/><path d="M1010 270 L1075 292 L1010 316 Z" fill="{R}" stroke="{R}" stroke-width="4" stroke-linejoin="round"/>'
    b+=f'<path d="M165 600 l24 24 M189 600 l-24 24" stroke="{R}" stroke-width="7" stroke-linecap="round" opacity="0"/>'
    b+='</g>'
    return wr('thumb1',b,WOB)
# ---------- T2: white, "SHOW UP. EVERY DAY." ----------
def t2():
    K="#161616"; G="#2fa84a"
    b='<rect width="1280" height="720" fill="#fdfcf8"/><g filter="url(#w)">'
    b+=text(60,170,'SHOW UP.',150,K)+f'<text x="60" y="318" font-family="PH" font-size="150" fill="{K}">EVERY <tspan fill="{G}">DAY.</tspan></text>'
    # calendar
    b+=f'<rect x="690" y="360" width="520" height="300" rx="6" fill="none" stroke="{K}" stroke-width="7"/><path d="M690 410 L1210 410" stroke="{K}" stroke-width="6"/><circle cx="770" cy="360" r="9" fill="none" stroke="{K}" stroke-width="6"/><circle cx="1130" cy="360" r="9" fill="none" stroke="{K}" stroke-width="6"/>'
    for k in range(1,5): b+=f'<path d="M{690+104*k} 410 L{690+104*k} 660" stroke="{K}" stroke-width="3.5"/>'
    for r in range(1,4): b+=f'<path d="M690 {410+62*r} L1210 {410+62*r}" stroke="{K}" stroke-width="3.5"/>'
    for i in range(20):
        x=690+104*(i%5)+26; y=410+62*(i//5)+34
        b+=f'<path d="M{x} {y} l14 18 l38 -34" fill="none" stroke="{G}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    # hero with umbrella in rain
    b+=fig(300,690,1.35,K,7,"up")
    b+=f'<path d="M205 470 C 205 400 260 372 330 372 C 400 372 445 400 445 470 C 420 455 395 470 375 470 C 355 455 340 470 320 470 C 300 455 280 470 262 470 C 240 455 225 470 205 470 Z" fill="#ffd6d0" stroke="{K}" stroke-width="6" stroke-linejoin="round"/>'
    b+=f'<path d="M335 522 L330 440" stroke="{K}" stroke-width="7" stroke-linecap="round"/>'
    for i in range(9): b+=f'<path d="M{190+i*34} {405-(i%3)*10} l-10 28" stroke="#4a78b8" stroke-width="5" stroke-linecap="round"/>'
    b+='</g>'
    return wr('thumb2',b,WOB)
# ---------- T3: black hole brand, "NEVER GIVE UP." ----------
def t3():
    b='<rect width="1280" height="720" fill="#07070d"/>'+stars(1280,720,120,77,1.8)
    b+=blackhole(930,380,150,-10,'t3',disk=2.5)
    b+=f'<text x="70" y="215" font-family="PH" font-size="190" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="10">NEVER</text>'
    b+=f'<text x="70" y="395" font-family="PH" font-size="190" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="10">GIVE</text>'
    b+=f'<text x="70" y="575" font-family="PH" font-size="190" fill="#ff9a2e" style="paint-order:stroke" stroke="#000" stroke-width="10">UP.</text>'
    b+=fig(930,690,.8,"#fff",7,"both")
    return wr('thumb3',b)
if __name__=='__main__':
    for i,fn in enumerate([t1,t2,t3],1):
        shot(fn(),str(ROOT/'thumbnails'/f'thumbnail{i}_1280x720.png'),1280,720,1)
