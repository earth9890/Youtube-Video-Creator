import utils.clients
import utils.http_session
import utils.transport
import utils.session
import random, math, subprocess, pathlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
SANS='"Avenir Next","Avenir","Helvetica Neue",Arial,sans-serif'
HEAD='''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Caveat";src:url("Caveat.ttf");font-weight:400 700}
html,body{margin:0;background:#000}svg{display:block}
</style></head><body>'''
def stars(w,h,n,seed,rmax=2.0,keep=None):
    r=random.Random(seed); out=[]
    for _ in range(n):
        x,y=r.uniform(0,w),r.uniform(0,h)
        if keep and not keep(x,y): continue
        s=r.uniform(.4,rmax)**1.0; o=r.uniform(.25,.95)
        out.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{s:.1f}" fill="#fff" opacity="{o:.2f}"/>')
    return ''.join(out)
def blackhole(cx,cy,r,rot=-12,k='a',c1="#ffb347",c2="#fff1d0",c3="#ff4d1a",disk=2.6,glow=1.0):
    rx=r*disk; ry=r*.34; sw=r*.22
    return f'''
<defs>
 <radialGradient id="g{k}"><stop offset="0" stop-color="{c3}" stop-opacity="{.55*glow}"/><stop offset=".45" stop-color="{c3}" stop-opacity="{.18*glow}"/><stop offset="1" stop-color="{c3}" stop-opacity="0"/></radialGradient>
 <linearGradient id="d{k}" x1="0" x2="1"><stop offset="0" stop-color="{c3}" stop-opacity="0"/><stop offset=".22" stop-color="{c3}"/><stop offset=".5" stop-color="{c2}"/><stop offset=".78" stop-color="{c1}"/><stop offset="1" stop-color="{c3}" stop-opacity="0"/></linearGradient>
 <linearGradient id="r{k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c2}"/><stop offset=".5" stop-color="{c1}"/><stop offset="1" stop-color="{c3}"/></linearGradient>
 <filter id="b{k}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="{r*.06:.1f}"/></filter>
 <filter id="s{k}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="{r*.012:.1f}"/></filter>
</defs>
<g transform="rotate({rot} {cx} {cy})">
 <circle cx="{cx}" cy="{cy}" r="{r*3.3:.0f}" fill="url(#g{k})"/>
 <ellipse cx="{cx}" cy="{cy}" rx="{rx:.0f}" ry="{ry:.0f}" fill="none" stroke="url(#d{k})" stroke-width="{sw*1.6:.0f}" filter="url(#b{k})" opacity=".9"/>
 <ellipse cx="{cx}" cy="{cy}" rx="{rx:.0f}" ry="{ry:.0f}" fill="none" stroke="url(#d{k})" stroke-width="{sw*.35:.0f}" filter="url(#s{k})"/>
 <circle cx="{cx}" cy="{cy}" r="{r*1.2:.0f}" fill="none" stroke="url(#r{k})" stroke-width="{r*.17:.0f}" filter="url(#b{k})" opacity=".85"/>
 <circle cx="{cx}" cy="{cy}" r="{r*1.2:.0f}" fill="none" stroke="url(#r{k})" stroke-width="{r*.035:.1f}" filter="url(#s{k})"/>
 <circle cx="{cx}" cy="{cy}" r="{r}" fill="#000"/>
 <circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c2}" stroke-width="{r*.02:.1f}" opacity=".9"/>
 <path d="M{cx-rx:.0f} {cy} A{rx:.0f} {ry:.0f} 0 0 0 {cx+rx:.0f} {cy}" fill="none" stroke="url(#d{k})" stroke-width="{sw*1.5:.0f}" filter="url(#b{k})" opacity=".9"/>
 <path d="M{cx-rx:.0f} {cy} A{rx:.0f} {ry:.0f} 0 0 0 {cx+rx:.0f} {cy}" fill="none" stroke="url(#d{k})" stroke-width="{sw*.33:.0f}" filter="url(#s{k})"/>
</g>'''
def fig(x,y,s=1,col="#fff",sw=7,arm="down",extra=""):
    # feet at (x,y); height ~ 120*s
    h=y-120*s; hip=y-48*s; sh=y-90*s
    arms={"down":f"M{x} {sh} L{x-18*s} {sh+34*s} M{x} {sh} L{x+18*s} {sh+34*s}",
          "up":f"M{x} {sh} L{x-20*s} {sh+30*s} M{x} {sh} L{x+26*s} {sh-34*s}",
          "both":f"M{x} {sh} L{x-24*s} {sh-30*s} M{x} {sh} L{x+24*s} {sh-30*s}"}[arm]
    return f'''<g stroke="{col}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" fill="none">
<circle cx="{x}" cy="{h-9*s:.0f}" r="{15*s:.0f}"/><path d="M{x} {h+6*s:.0f} L{x} {hip:.0f} M{x} {hip:.0f} L{x-16*s:.0f} {y} M{x} {hip:.0f} L{x+16*s:.0f} {y} {arms}"/>{extra}</g>'''
def svg(w,h,body,defs=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><defs>{defs}</defs>{body}</svg>'
def write(name,w,h,body,defs=''):
    p=ROOT/'src'/f'{name}.html'; p.write_text(HEAD+svg(w,h,body,defs)+'</body></html>'); return p
def shot(p,out,w,h,scale=1):
    subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless=new','--disable-gpu','--hide-scrollbars',f'--force-device-scale-factor={scale}',f'--window-size={w},{h}','--virtual-time-budget=3000',f'--screenshot={out}',f'file://{p}'],check=True,capture_output=True)
MARK='#ff7a18'
# ================= LOGOS (800x800) =================
def logo1():
    b=f'<rect width="800" height="800" fill="#05060d"/><radialGradient id="bg1" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#1a1230"/><stop offset="1" stop-color="#03030a"/></radialGradient><rect width="800" height="800" fill="url(#bg1)"/>'
    b+=stars(800,800,90,3,1.8)+blackhole(400,400,175,-10,'l1')
    return write('logo1',800,800,b)
def logo2():
    b='<defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1747"/><stop offset="1" stop-color="#05030f"/></linearGradient><linearGradient id="tx2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ffd9a0"/></linearGradient></defs><rect width="800" height="800" fill="url(#bg2)"/>'
    b+=stars(800,800,70,8,1.6)+blackhole(400,400,190,-14,'l2',disk=2.2)
    b+=f'<text x="400" y="470" text-anchor="middle" font-family={SANS!r} font-weight="900" font-size="230" letter-spacing="-8" fill="url(#tx2)" style="paint-order:stroke" stroke="#05030f" stroke-width="10">BHL</text>'
    return write('logo2',800,800,b)
def logo3():
    f='<filter id="wob"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/></filter>'
    b='<rect width="800" height="800" fill="#fdfcf8"/><g filter="url(#wob)"><g transform="translate(0,-80)">'
    b+='<circle cx="400" cy="480" r="215" fill="#161616"/>'
    b+='<path d="M170 470 C 160 330 300 235 420 250 C 560 262 650 360 628 500 C 610 620 480 700 340 680 C 240 665 175 590 168 500" fill="none" stroke="#ff7a18" stroke-width="22" stroke-linecap="round"/>'
    b+='<path d="M215 540 C 250 640 400 700 540 650" fill="none" stroke="#ff7a18" stroke-width="10" stroke-linecap="round" opacity=".7"/>'
    for d,w in [("M400 400 C 480 395 520 460 490 520 C 455 580 360 570 335 510 C 315 450 360 405 420 415",5),("M400 345 C 510 335 570 430 535 540 C 495 640 340 640 290 530 C 250 440 305 350 410 355",4)]:
        b+=f'<path d="{d}" fill="none" stroke="#fdfcf8" stroke-width="{w}" stroke-linecap="round"/>'
    b+='</g></g>'
    return write('logo3',800,800,b,f)
def logo4():
    d='<radialGradient id="c4"><stop offset="0" stop-color="#000"/><stop offset=".55" stop-color="#000"/><stop offset="1" stop-color="#1a0a3a" stop-opacity="0"/></radialGradient><filter id="bl4"><feGaussianBlur stdDeviation="6"/></filter><linearGradient id="sp4" x1="0" x2="1"><stop offset="0" stop-color="#ff4d1a"/><stop offset=".5" stop-color="#ffb347"/><stop offset="1" stop-color="#a64dff"/></linearGradient>'
    arms=''
    for a in range(4):
        pts=[]
        for i in range(0,60):
            t=i/59; ang=a*math.pi/2+t*3.4; rad=70+t*210
            pts.append((400+math.cos(ang)*rad,400+math.sin(ang)*rad*.92))
        path='M'+' L'.join(f'{x:.0f} {y:.0f}' for x,y in pts)
        arms+=f'<path d="{path}" fill="none" stroke="url(#sp4)" stroke-width="30" stroke-linecap="round" opacity=".5" filter="url(#bl4)"/><path d="{path}" fill="none" stroke="url(#sp4)" stroke-width="5" stroke-linecap="round" opacity=".95"/>'
    b='<rect width="800" height="800" fill="#06040f"/>'+stars(800,800,60,12,1.4)+arms
    b+='<circle cx="400" cy="400" r="95" fill="#000"/><circle cx="400" cy="400" r="95" fill="none" stroke="#fff1d0" stroke-width="3"/><circle cx="400" cy="400" r="108" fill="none" stroke="#ffb347" stroke-width="8" opacity=".7" filter="url(#bl4)"/>'
    b+='<path id="cp4" d="M400 400 m-345 0 a345 345 0 1 1 690 0 a345 345 0 1 1 -690 0" fill="none"/>'
    b+=f'<text font-family={SANS!r} font-weight="800" font-size="46" fill="#fff"><textPath href="#cp4" startOffset="0" textLength="2150" lengthAdjust="spacing">BLACK HOLE LIFE ✦ BLACK HOLE LIFE ✦ BLACK HOLE LIFE ✦</textPath></text>'
    return write('logo4',800,800,b,d)
def logo5():
    d='<linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5e1a"/><stop offset="1" stop-color="#ffb21f"/></linearGradient>'
    b='<rect width="800" height="800" fill="url(#bg5)"/>'
    b+='<circle cx="400" cy="400" r="255" fill="none" stroke="#fff4dc" stroke-width="28"/>'
    b+='<circle cx="400" cy="400" r="222" fill="#0a0a0f"/>'
    b+='<path d="M170 420 C 170 300 300 220 400 220" fill="none" stroke="#fff4dc" stroke-width="0"/>'
    b+='<ellipse cx="400" cy="420" rx="390" ry="70" fill="none" stroke="#fff4dc" stroke-width="12" transform="rotate(-14 400 420)" opacity=".0"/>'
    return write('logo5',800,800,b,d)
# ================= BANNERS (2560x1440, safe 507..2053 x 508..931) =================
TITLE='BLACK HOLE LIFE'
def banner1():
    b='<rect width="2560" height="1440" fill="#04050b"/><radialGradient id="bg" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#1a1236"/><stop offset="1" stop-color="#03030a"/></radialGradient><rect width="2560" height="1440" fill="url(#bg)"/>'
    b+=stars(2560,1440,380,21,2.3)+blackhole(1280,665,170,-8,'b1',disk=4.0)
    b+=f'<text x="1280" y="800" text-anchor="middle" font-family={SANS!r} font-weight="900" font-size="132" letter-spacing="12" fill="#fff" stroke="#000" stroke-width="14" style="paint-order:stroke">{TITLE}</text>'
    b+=f'<text x="1280" y="890" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="74" fill="#ffd9a0" stroke="#000" stroke-width="8" style="paint-order:stroke">show up. every day. never give up.</text>'
    return write('banner1',2560,1440,b)
def banner2():
    f='<filter id="wob" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="6"/></filter><filter id="wt"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>'
    b='<rect width="2560" height="1440" fill="#fdfcf8"/><g filter="url(#wob)" stroke="#161616" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">'
    # left: mountain + flag, fully left of the all-devices zone (x<500)
    b+='<path d="M60 925 L170 780 L215 805 L300 690 L335 712 L390 640 L470 925" stroke-width="11"/>'
    b+='<path d="M390 640 L390 545" stroke-width="8"/><path d="M390 545 L450 565 L390 590 Z" fill="#e0312b" stroke="#e0312b" stroke-width="6"/>'
    # ground
    b+='<path d="M40 925 L2520 925" stroke-width="12"/>'
    # right: black-hole sun + hero, fully right of the all-devices zone (x>2060)
    b+='<circle cx="2290" cy="590" r="95" fill="#161616"/><ellipse cx="2290" cy="590" rx="205" ry="38" transform="rotate(-14 2290 590)" stroke="#ff7a18" stroke-width="15"/><circle cx="2290" cy="590" r="118" stroke="#ff7a18" stroke-width="12"/>'
    b+='<path d="M2290 420 l0 -38 M2430 455 l28 -28 M2480 590 l42 0 M2150 455 l-28 -28 M2100 590 l-42 0" stroke="#161616" stroke-width="8"/>'
    b+=fig(2290,925,1.05,"#161616",9,"both")
    b+='</g>'
    b+='<text x="1280" y="745" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="215" fill="#161616" filter="url(#wt)">Black Hole Life</text>'
    b+='<text x="1280" y="860" text-anchor="middle" font-family="Caveat" font-weight="600" font-size="82" fill="#ff7a18" filter="url(#wt)">keep showing up. never give up.</text>'
    b+='<path d="M820 772 C 1200 790 1600 768 1740 780" stroke="#161616" stroke-width="12" fill="none" stroke-linecap="round" filter="url(#wob)"/>'
    return write('banner2',2560,1440,b,f)
def banner3():
    b='<rect width="2560" height="1440" fill="#000"/>'+stars(2560,1440,160,31,1.6)
    b+='<defs><linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#ffb347" stop-opacity="0"/><stop offset=".5" stop-color="#ffe9bd"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></linearGradient><filter id="gb"><feGaussianBlur stdDeviation="9"/></filter></defs>'
    b+='<circle cx="1280" cy="600" r="82" fill="none" stroke="#ffb347" stroke-width="14" filter="url(#gb)" opacity=".85"/><circle cx="1280" cy="600" r="82" fill="#000" stroke="#ffe9bd" stroke-width="3"/>'
    b+='<rect x="780" y="597" width="1000" height="6" fill="url(#gl)" filter="url(#gb)"/><rect x="780" y="598" width="1000" height="3" fill="url(#gl)"/>'
    b+=f'<text x="1280" y="810" text-anchor="middle" font-family={SANS!r} font-weight="300" font-size="108" letter-spacing="32" fill="#fff">BLACK HOLE LIFE</text>'
    b+=f'<text x="1280" y="890" text-anchor="middle" font-family={SANS!r} font-weight="500" font-size="32" letter-spacing="14" fill="#ffb347">SHOW UP · EVERY DAY · NEVER GIVE UP</text>'
    return write('banner3',2560,1440,b)
def banner4():
    d='<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#090618"/><stop offset=".42" stop-color="#34104f"/><stop offset=".72" stop-color="#b8391f"/><stop offset="1" stop-color="#ff9a3c"/></linearGradient>'
    b='<rect width="2560" height="1440" fill="url(#sky)"/>'+stars(2560,900,260,41,2.0)
    b+=blackhole(1740,930,175,-10,'b4',disk=3.6,glow=1.2)
    b+='<path d="M0 1440 L0 1130 C 200 1100 330 1060 520 1090 C 640 1110 700 1040 760 1005 C 800 985 830 1000 860 1030 C 1100 1120 1300 1080 1500 1110 C 1800 1150 2200 1090 2560 1130 L2560 1440 Z" fill="#07040b"/>'
    b+=fig(790,1003,1.15,"#07040b",10,"both")
    b+=f'<text x="1000" y="640" text-anchor="middle" font-family={SANS!r} font-weight="900" font-size="132" letter-spacing="12" fill="#fff" style="paint-order:stroke" stroke="#2a0a3a" stroke-width="10">{TITLE}</text>'
    b+=f'<text x="1000" y="725" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="76" fill="#ffe0b0">never stop climbing toward the light</text>'
    return write('banner4',2560,1440,b,d)
if __name__=='__main__':
    for i,fn in enumerate([logo1,logo2,logo3,logo4,logo5],1):
        shot(fn(),str(ROOT/'logos'/f'logo{i}_1600.png'),800,800,2)
    for i,fn in enumerate([banner1,banner2,banner3,banner4],1):
        shot(fn(),str(ROOT/'banners'/f'banner{i}_2560x1440.png'),2560,1440,1)
