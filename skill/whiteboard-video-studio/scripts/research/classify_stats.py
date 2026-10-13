"""Aggregate *.dtw.sent.tsv + labels.json into per-class delivery stats (relative to each narrator's own baseline).
usage: ~/.venvs/pocket/bin/python classify_stats.py > delivery_table.txt"""
import json, re, numpy as np

L = json.load(open('labels.json'))
FUNNY = ['SamONellaAcademy', 'casuallyexplained', 'halfasinteresting']

def rows(f):
    T = open(f'{f}.dtw.sent.tsv').read().splitlines(); h = T[1].split('\t')
    R = [dict(zip(h, l.split('\t'))) for l in T[2:]]
    for r in R:
        for k in h[:-1]: r[k] = float(r[k])
    return R

def labels(spec, n):
    c = ['F'] * n
    for tok in spec.split():
        rng, cl = tok.split(':'); a, _, b = rng.partition('-')
        for i in range(int(a), int(b or a) + 1):
            if i < n: c[i] = cl
    return c

ALL = []
for f, v in L.items():
    if f.startswith('_'): continue
    R = rows(f); C = labels(v['lab'], len(R))
    F = [r for r, c in zip(R, C) if c not in 'XV']   # narrator baseline = all own-voice lines
    base_sps = np.median([r['sps'] for r in F]); base_rng = np.nanmedian([r['rng'] for r in F])
    base_pa = np.median([r['pa'] for r in F])
    for i, (r, c) in enumerate(zip(R, C)):
        if c == 'X' or i == 0: continue
        if c == 'P': c = 'p' if r['nw'] <= 7 else 'P'      # p = short punch (<=7 words)
        pr = R[i - 1]
        r.update(df0_prev=r['f0'] - pr['f0'], drate_prev=100 * r['sps'] / pr['sps'] - 100, p90=np.percentile([x['pa'] for x in F], 90))
        r.update(file=f, ch=f.split('_')[0], cls=c, funny=f.split('_')[0] in FUNNY, rate=100 * r['sps'] / base_sps - 100,
                 drng=r['rng'] - base_rng, prev=C[i - 1], hook=i < v['hook_end'], hook_end=i == v['hook_end'], pa_rel=r['pa'] / base_pa)
        ALL.append(r)
    print(f'{f:32s} n={len(R):3d} base sps={base_sps:.2f} median F-gap={base_pa:.2f}s  first word at {R[0]["t"]:.2f}s  '
          f'gap before body={R[v["hook_end"]]["pb"]:.2f}s  hook rate={np.median([r["sps"] for r in R[1:v["hook_end"]]]) / base_sps * 100 - 100:+.0f}%')

def q(xs, fmt='{:.2f}'):
    xs = [x for x in xs if not np.isnan(x)]
    if not xs: return '-'
    return fmt.format(np.median(xs)) + ' [' + fmt.format(np.percentile(xs, 25)) + '..' + fmt.format(np.percentile(xs, 75)) + ']'

def table(sel, title):
    print(f'\n## {title}\nclass n | pause before s | pause after s | rate vs own F % | median F0 st | last-3-words F0 st | F0 range vs own st | words | vs previous line')
    for c in 'FSPpAQRTV':
        X = [r for r in sel if r['cls'] == c]
        if len(X) < 3: continue
        print(f"{c} {len(X):3d} | {q([r['pb'] for r in X])} | {q([r['pa'] for r in X])} | {q([r['rate'] for r in X], '{:+.0f}')} | "
              f"{q([r['f0'] for r in X], '{:+.1f}')} | {q([r['f0end'] for r in X], '{:+.1f}')} | {q([r['drng'] for r in X], '{:+.1f}')} | {np.median([r['nw'] for r in X]):.0f} | vs prev line: F0 {q([r['df0_prev'] for r in X], '{:+.1f}')} rate {q([r['drate_prev'] for r in X], '{:+.0f}')}")

table([r for r in ALL if r['funny']], 'FUNNY narrators (SamONella x2, CasuallyExplained x2, HAI x2)')
table([r for r in ALL if not r['funny']], 'SERIOUS narrators (Kurzgesagt x1, Zenn x2)')
for ch in ['SamONellaAcademy', 'casuallyexplained', 'halfasinteresting', 'kurzgesagt', 'zenn']:
    table([r for r in ALL if r['ch'] == ch], ch)

print('\n## Specific transitions (funny narrators)')
fun = [r for r in ALL if r['funny']]
for name, X in [('gap S->P (before punch, after setup)', [r['pb'] for r in fun if r['cls'] in 'Pp' and r['prev'] == 'S']),
                ('gap S->p (before SHORT punch)', [r['pb'] for r in fun if r['cls'] == 'p' and r['prev'] in 'SFP']),
                ('gap after SHORT punch', [r['pa'] for r in fun if r['cls'] == 'p']),
                ('gap F->P', [r['pb'] for r in fun if r['cls'] == 'P' and r['prev'] == 'F']),
                ('gap P->P (joke run)', [r['pb'] for r in fun if r['cls'] == 'P' and r['prev'] == 'P']),
                ('gap after P when next is F (back to info)', [r['pa'] for i, r in enumerate(fun[:-1]) if r['cls'] == 'P' and fun[i + 1]['cls'] in 'FT']),
                ('gap F->F', [r['pb'] for r in fun if r['cls'] == 'F' and r['prev'] == 'F']),
                ('gap before T (section change)', [r['pb'] for r in fun if r['cls'] == 'T']),
                ('gap before A (tag after punch)', [r['pb'] for r in fun if r['cls'] == 'A']),
                ('gap before V (character voice)', [r['pb'] for r in fun if r['cls'] == 'V'])]:
    print(f'{name:45s} n={len(X):3d}  {q(X)}')
print('\n## Where the long gaps go: gaps >= narrator p90 (top 10%), class of the line AFTER and BEFORE the gap')
for grp, sel in [('funny', [r for r in ALL if r['funny']]), ('serious', [r for r in ALL if not r['funny']])]:
    G = [(r['prev'], r['cls']) for r in sel if r['pb'] >= r['p90']]
    from collections import Counter
    print(grp, 'n=', len(G), 'after-gap:', dict(Counter(b for a, b in G).most_common()), ' before-gap:', dict(Counter(a for a, b in G).most_common()))
print('\n## In-sentence beat (longest internal silence) and where it falls (0=start, 1=end)')
for c in 'FPpS':
    X = [r for r in fun if r['cls'] == c and r['nw'] >= 8]
    late = [r for r in X if r['pinpos'] > .5]
    print(f'{c} (>=8 words) n={len(X):3d}  internal beat {q([r["pin"] for r in X])}  share with beat >=0.25 s in 2nd half: {sum(r["pin"] >= .25 for r in late) / len(X):.0%}')
X = [r for r in ALL if not r['funny']]
print(f'\nSERIOUS: gap before R {q([r["pb"] for r in X if r["cls"] == "R"])}  after R {q([r["pa"] for r in X if r["cls"] == "R"])}  before T {q([r["pb"] for r in X if r["cls"] == "T"])}  F->F {q([r["pb"] for r in X if r["cls"] == "F" and r["prev"] == "F"])}')
