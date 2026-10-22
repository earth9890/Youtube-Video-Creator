#!/usr/bin/env python3
"""Asset-library lookup for build agents. Never read library/*.js to find an asset: ask this (stdlib only).

usage: lib.py find <words...> [--cat C] [-n 10]   ranked hits, one line each: name | cat/group | tags | exact call
       lib.py show <name>                          call, options + allowed values, origin/box, KB, file, deps
       lib.py cats | groups <cat> | names <prefix>
       lib.py check scenes.js                      unknown asset names / person option values -> did-you-mean, exit 1
       add --json to any command for machine output
library/catalog.json is rebuilt (node library/build-catalog.js) whenever a library/*.js is newer.
build.py `// @library auto` calls bundle() here to paste only the library files a scene needs.
"""
import difflib, json, re, subprocess, sys, pathlib

LIB = pathlib.Path(__file__).resolve().parent.parent / 'library'
CATALOG = LIB / 'catalog.json'
BASE = ('core', 'people', 'stylelab')
NOT_ASSETS = ('build-catalog', 'manifest')


def asset_files():  # same files and order as build.py `// @library`
    return [p.stem for p in sorted(LIB.glob('*.js')) if p.stem not in BASE + NOT_ASSETS]


def load():
    c = json.load(open(CATALOG)) if CATALOG.exists() else None
    srcs = [p for p in LIB.glob('*.js') if p.stem != 'manifest']
    if c is None or max(p.stat().st_mtime for p in srcs) * 1000 > c.get('t0', 0) or sorted(c['files']) != sorted(set(BASE) | set(asset_files()) - set(c['broken'])):
        try:
            r = subprocess.run(['node', str(LIB / 'build-catalog.js')], capture_output=True, text=True, timeout=60)
            if r.returncode:
                print('lib.py: catalog rebuild failed, using the old one: ' + r.stderr.strip()[-300:], file=sys.stderr)
            elif r.stderr.strip():
                print('lib.py: ' + r.stderr.strip(), file=sys.stderr)  # files skipped because they throw
            c = json.load(open(CATALOG))
        except (OSError, subprocess.TimeoutExpired, ValueError) as e:
            if c is None:
                sys.exit(f'lib.py: no catalog and could not build one ({e})')
            print(f'lib.py: catalog rebuild failed ({e}), using the old one', file=sys.stderr)
    c['by'] = {i['name']: i for i in c['items']}
    c['items'] = list(c['by'].values())  # unique names (last registration wins, like L.reg)
    return c


# ---------------- search ----------------
SYN = [s.split() for s in '''car auto automobile vehicle taxi cab | drive driver driving steer wheel | kiss smooch love romance couple
dance dancing waltz disco | boy man guy male dude | girl woman lady female | kid child boy girl baby toddler teen
person people man woman boy girl kid figure character | happy smile joy glad cheer | sad cry tears upset sob | angry mad furious grumpy
scared afraid fear terrified | shocked surprised wow | think thinking idea confused | talk talking speak speech mouth
run running sprint jog | walk walking stroll | sleep sleeping nap zzz tired bed | eat eating food meal hungry | drink beverage cup
house home | phone mobile smartphone | computer laptop pc | money cash coin dollar rich | doctor nurse hospital medical
school classroom teacher student | night dark moon | day sunny daytime | tree forest wood | dog puppy | cat kitten
bike bicycle | plane airplane aeroplane jet | ship boat | train railway | rocket spaceship | space cosmos galaxy universe planet
hug cuddle embrace | fight punch kick | sit sitting seat chair | title caption text | road street | city town | sea ocean water'''.replace('\n', ' | ').split(' | ')]


def stem(w):
    for suf in ('ing', 'ers', 'er', 'es', 'ed', 's', 'e'):
        if w.endswith(suf) and len(w) - len(suf) >= 3 and not (suf == 's' and w.endswith('ss')):
            return w[:-len(suf)]
    return w


def words(s):
    return [w for w in re.split(r'[^a-z0-9]+', str(s).lower()) if w]


def score(it, q):
    """q: list of (word, weight, is_synonym) per query word. Sum of each query word's best field match."""
    name = words(it['name'])
    fields = [(name, 10), (words(' '.join(it.get('tags', []))), 7), (words(it.get('label', '')), 6), (words(it.get('group', '')), 4), ([it['cat']], 3)]
    total, hit = 0, 0
    for alts in q:
        best = 0
        for w, k in alts:
            sw = stem(w)
            for ws, wt in fields:
                if w in ws:
                    best = max(best, wt * k)
                elif any(stem(x) == sw for x in ws):
                    best = max(best, (wt - 1) * k)
                elif len(w) >= 4 and any(w in x for x in ws):
                    best = max(best, wt * 0.4 * k)
        total += best
        hit += best > 0
    return total * (1.5 if hit == len(q) else 1) + hit * 5 if hit else 0


def find(c, query, cat=None, n=10):
    q = []
    for w in words(' '.join(query)):
        alts = [(w, 1.0)] + [(s, 0.6) for g in SYN if w in g or stem(w) in map(stem, g) for s in g if s != w]
        q.append(list(dict.fromkeys(alts)))
    if not q:
        return []
    hits = [(score(i, q), i) for i in c['items'] if not cat or i['cat'] == cat or i.get('group', '').lower() == cat.lower()]
    hits = [h for h in hits if h[0] > 0]
    hits.sort(key=lambda h: (-h[0], h[1].get('kb', 0) > 60, len(h[1]['name'])))  # big gallery sheets last on ties
    return [i for _, i in hits[:n]]


def call_of(it):
    return re.sub(r'\s+', ' ', re.sub(r'\s*//.*$', '', it['call'])).strip()


def line(it):
    skip = set(words(it['name'])) | set(words(it['cat'])) | set(words(it.get('group', '')))
    tags = [t for t in it.get('tags', []) if t.lower() not in skip][:3]
    return f"{it['name']} | {it['cat']}/{it.get('group', '-')} | {','.join(tags)} | {call_of(it)}"


def suggest(c, name, n=4):
    """near-typos first, then word matches ("car-red" -> veh-car), then looser typos"""
    names = list(c['by'])
    out = difflib.get_close_matches(name, names, n, 0.8) + [i['name'] for i in find(c, [name.replace('-', ' ')], n=n)] + difflib.get_close_matches(name, names, n, 0.6)
    return list(dict.fromkeys(out))[:n]


# ---------------- show ----------------
PERSON_OPTS = {'style': 'CAST', 'body': 'BODIES', 'pose': 'POSES', 'face': 'FACES', 'mouth': 'VISEMES', 'outfit': 'OUTFITS', 'hair': 'HAIR', 'acc': 'ACC'}


def table(c, t):
    return [k for k in c['tables'].get(t, {}) if not k.startswith('_')]


def origin(box, call=''):
    x0, y0, w, h = box
    if x0 == 0 and y0 == 0 and w >= 1900:
        return 'background: top-left, put at 0, 0 (1920x1080)'
    if re.search(r'\b(gy|floorY)\b', call) or y0 + h <= 0.3 * h:
        return 'standing: (x, gy) = bottom centre on the ground'
    return 'floating: (x, y) = centre'


def show(c, name):
    it = c['by'][name]
    d = {k: it.get(k) for k in ('name', 'cat', 'group', 'label', 'file', 'call', 'box', 'kb', 'tags', 'deps')}
    d['origin'] = origin(it['box'], it['call'])
    colors = set(c.get('colors', []))
    opts = {}
    for k in it.get('opts', []):
        seen = (it.get('vals') or {}).get(k, [])
        colour = re.fullmatch(r'c|colou?r|\w+C', k) or (seen and set(seen) <= colors)
        opts[k] = ['colour name' + (f' (default {seen[0]})' if seen else '')] if colour else ['e.g. ' + ' | '.join(seen)] if seen else []
    if 'time' in opts:
        opts['time'] = sorted(set(opts.get('time', [])) | ({'light', 'dark'} if it['cat'] == 'interiors' else {'day', 'sunset', 'night'}))
    if it.get('person'):
        for k, t in PERSON_OPTS.items():
            vals = table(c, t)
            if k == 'pose':
                vals = [v for v in vals if not v.startswith('cyc-')] + ['cyc-<walk|run|wave|talk|idle|jump|nod|shake>-<frame>']
            opts[k] = vals
        opts['skin'] = ['s1', 's2', 's3', 's4', 's5', 's6']
    d['opts'] = opts
    files = needs(c, {it['file']})
    d['bundle'] = [f for f in files if f not in BASE]
    d['colors'] = c.get('colors', [])
    return d


def needs(c, files):
    """files + their file deps (transitively), always with core people stylelab first, in `// @library` order."""
    todo, seen = list(files), set(BASE)
    while todo:
        f = todo.pop()
        if f in seen:
            continue
        seen.add(f)
        todo += c['files'].get(f, {}).get('deps', [])
    return [f for f in list(BASE) + asset_files() if f in seen]


def show_text(d):
    out = [f"{d['name']}  {d['cat']}/{d.get('group') or '-'}  \"{d.get('label') or d['name']}\"  file: {d['file']}.js  ~{d['kb']} KB markup",
           f"call: {d['call']}", f"origin: {d['origin']}  box {d['box']}"]
    for k, v in d['opts'].items():
        out.append(f"  {k}: {' | '.join(v) if v else '(free value; see call)'}")
    if d.get('tags'):
        out.append('tags: ' + ', '.join(d['tags']))
    if d.get('deps'):
        out.append('inlines: ' + ', '.join(d['deps']))
    if any(v[:1] and v[0].startswith('colour name') for v in d['opts'].values()):
        out.append('colours: ' + ' '.join(d['colors']))
    out.append('// @library auto pastes: ' + ' '.join(list(BASE) + d['bundle']))
    return '\n'.join(out)


# ---------------- check + bundle ----------------
STR = re.compile(r'"((?:[^"\\\n]|\\.)*)"|\'((?:[^\'\\\n]|\\.)*)\'|`((?:[^`\\]|\\.)*)`')
CALL = re.compile(r'\bL\.put\(\s*[^,()]+,\s*|\bL\.(?:svg|inline)\(\s*')


def strip_comments(src):
    return re.sub(r'(?<![:"\'\\])//[^\n]*', '', src)  # keeps line numbers; spares "http://"


def pattern(s):
    """A template/concat name like `scene-${p}-day` or "scene-" + p -> regex over names, else None."""
    segs = re.split(r'\$\{[^}]*\}', s)
    if len(segs) == 1 and not s.endswith('-'):
        return None
    if len(segs[0]) < 3:
        return None
    return re.compile('^' + '.*'.join(map(re.escape, segs)) + ('' if len(segs) > 1 else '.*') + '$')


def end_of_call(src, i):  # index of the ")" closing the call that starts before i
    depth, j = 1, i
    while j < len(src) and depth:
        ch = src[j]
        if ch in '"\'`':
            m = STR.match(src, j)
            j = m.end() if m else j + 1
            continue
        depth += ch in '([{'
        depth -= ch in ')]}'
        j += 1
    return j


def check_text(c, src):
    """[(line, message)] for unknown asset names (and unknown person option values) in L.put/L.svg/L.inline calls."""
    res, ln = [], lambda i: src.count('\n', 0, i) + 1
    for m in CALL.finditer(src):
        s = STR.match(src, m.end())
        if not s:
            continue  # name in a variable: not checkable
        name = next(g for g in s.groups() if g is not None)
        pat = pattern(name) if '`' == src[s.start()] or name.endswith('-') else None
        if pat:
            if not any(pat.match(n) for n in c['by']):
                res.append((ln(m.start()), f'no asset matches "{name}"'))
            continue
        it = c['by'].get(name)
        if not it:
            res.append((ln(m.start()), f'unknown asset "{name}" -> did you mean: {", ".join(suggest(c, name)) or "?"} (lib.py find <words>)'))
            continue
        if it.get('person'):
            args = src[s.end():end_of_call(src, s.end())]
            for k, v in re.findall(r'\b(style|body|pose|face|mouth|outfit|hair|acc)\s*:\s*(\[[^\]]*\]|"[^"]*"|\'[^\']*\')', args):
                ok = table(c, PERSON_OPTS[k])
                for val in re.findall(r'["\']([^"\']*)["\']', v):
                    if val not in ok and val != 'none':
                        res.append((ln(m.start()), f'{name}: unknown {k} "{val}" -> did you mean: {", ".join(difflib.get_close_matches(val, ok, 3, 0.5)) or "?"} (lib.py show {name})'))
    return res


def bundle(c, src, forced=()):
    """Library files a scene needs (base first, same order as `// @library`), from the string literals it uses."""
    vals = {}
    for t in c['tables'].values():
        for k, f in t.items():
            vals.setdefault(k, f)
    need = set(forced)
    for m in STR.finditer(src):
        s = next(g for g in m.groups() if g is not None)
        if s in c['by']:
            need.add(c['by'][s]['file'])
        elif s in vals:
            need.add(vals[s])  # pose/face/outfit/hair/acc value from a category file (pose: "run" -> motion)
        elif (p := pattern(s)):
            need |= {i['file'] for i in c['items'] if p.match(i['name'])}
    for m in re.finditer(r'\bL\.([A-Za-z_$][\w$]*)', src):
        if m[1] in c.get('defs', {}):
            need.add(c['defs'][m[1]])
    unknown = [f for f in forced if f not in asset_files()]
    files = needs(c, need)
    for f in files:
        if f in c['broken']:
            print(f'@library auto: warning: {f}.js throws ({c["broken"][f]})', file=sys.stderr)
    return files, unknown


# ---------------- CLI ----------------
def main(argv):
    js = '--json' in argv
    argv = [a for a in argv if a != '--json']
    if not argv or argv[0] in ('-h', '--help', 'help'):
        print(__doc__.strip())
        return 0
    cmd, args = argv[0], argv[1:]
    c = load()
    emit = lambda obj, text: print(json.dumps(obj, separators=(',', ':')) if js else text)
    if cmd == 'find':
        cat, n, q, i = None, 10, [], 0
        while i < len(args):
            if args[i] == '--cat':
                cat, i = args[i + 1], i + 2
            elif args[i] == '-n':
                n, i = int(args[i + 1]), i + 2
            else:
                q.append(args[i]); i += 1
        hits = find(c, q, cat, n)
        emit([{k: h.get(k) for k in ('name', 'cat', 'group', 'tags', 'call', 'file')} for h in hits],
             '\n'.join(map(line, hits)) or f'no match for {" ".join(q)!r}; try fewer/other words, `lib.py cats`, `lib.py groups <cat>`')
        return 0 if hits else 1
    if cmd == 'show':
        if not args or args[0] not in c['by']:
            nm = args[0] if args else ''
            emit({'error': 'unknown', 'suggest': suggest(c, nm)}, f'unknown asset {nm!r}; did you mean: {", ".join(suggest(c, nm))}')
            return 1
        d = show(c, args[0])
        emit(d, show_text(d))
        return 0
    if cmd == 'cats':
        cats = {}
        for it in c['items']:
            e = cats.setdefault(it['cat'], {'n': 0, 'groups': {}, 'files': {}})
            e['n'] += 1
            e['groups'][it.get('group', '-')] = e['groups'].get(it.get('group', '-'), 0) + 1
            e['files'][it['file']] = 1
        emit(cats, '\n'.join(f"{k} ({v['n']}){'' if list(v['groups']) == ['-'] else ': ' + ' · '.join(f'{g} {n}' for g, n in v['groups'].items())}  [{', '.join(v['files'])}]" for k, v in cats.items())
             + (f"\nskipped (throws): {', '.join(c['broken'])}" if c['broken'] else ''))
        return 0
    if cmd == 'groups':
        its = [i for i in c['items'] if args and i['cat'] == args[0]]
        if not its:
            print(f'unknown category; one of: {", ".join(dict.fromkeys(i["cat"] for i in c["items"]))}')
            return 1
        g = {}
        for i in its:
            g.setdefault(i.get('group', '-'), []).append(i['name'])
        emit(g, '\n'.join(f"{k} ({len(v)}): {' '.join(v[:8])}{' …' if len(v) > 8 else ''}" for k, v in g.items()))
        return 0
    if cmd == 'names':
        ns = [n for n in c['by'] if n.startswith(args[0] if args else '')]
        emit(ns, f'{len(ns)}: ' + ' '.join(ns))
        return 0 if ns else 1
    if cmd == 'check':
        src = strip_comments(open(args[0]).read())
        res = check_text(c, src)
        total = sum(1 for _ in CALL.finditer(src))
        emit([{'line': l, 'msg': m} for l, m in res], '\n'.join(f'FAIL  line {l}: {m}' for l, m in res) + f"\n{'FAIL' if res else 'PASS'}: {total} library call(s), {len(res)} problem(s)")
        return 1 if res else 0
    print(__doc__.strip())
    return 2


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
