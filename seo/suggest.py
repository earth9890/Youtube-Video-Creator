"""YouTube search autocomplete for seed phrases: what people actually type.
usage: suggest.py "seed one" "seed two" ...   (prints seed -> suggestions)"""
import json, sys, time, urllib.parse, urllib.request

def suggest(q):
    url = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=en&gl=US&q=" + urllib.parse.quote(q)
    with urllib.request.urlopen(url, timeout=10) as r:
        return json.loads(r.read().decode("utf-8", "replace"))[1]

for q in sys.argv[1:]:
    print(f"{q} -> " + " | ".join(suggest(q)[:8]))
    time.sleep(0.4)
