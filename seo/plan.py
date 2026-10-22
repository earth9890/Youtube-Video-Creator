"""SEO pass (2026-10-22): new search-worded opening, <=15 tags, query test, per video.
Builds seo/desc/<id>.txt (full new description) and seo/tags/<id>.txt; prints a report.
drop = how many of the old leading paragraphs the new opening replaces."""
import json, re, pathlib, sys
H = pathlib.Path(__file__).parent
META = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else H / 'meta'
V = {}
def v(i, open_, drop, tags, queries, title=None):
    V[i] = dict(open=open_, drop=drop, tags=tags, queries=queries, title=title)

v('DJS4fF1068k', "What would happen if the Moon disappeared tonight? Tides, nights, animals and the length of a day on an Earth without the Moon, one job at a time.", 1,
  ["what if the moon disappeared", "what happens if the moon disappears", "earth without the moon", "what does the moon do", "moon and tides", "why do we have tides", "moon moving away from earth", "how the moon formed", "theia giant impact", "dung beetle milky way", "coral spawning moon", "length of a day", "space explained", "what if", "black hole life"],
  ["what if the moon disappeared", "what happens if the moon disappears", "earth without the moon"])
v('MRLSPaxzfvQ', "What if you were shrunk to the size of an ant? The movies say you'd be too weak. On paper, the square-cube law makes you 350 times stronger, so what actually goes wrong?", 1,
  ["what if you shrank to the size of an ant", "what if you shrunk to the size of an ant", "what if you were the size of an ant", "ant sized human", "square cube law", "on being the right size", "haldane", "shrink ray science", "why small animals eat so much", "surface tension raindrop", "honey i shrunk the kids science", "what if", "science explained", "stick figure animation", "black hole life"],
  ["what if you shrunk to the size of an ant", "what if you were the size of an ant", "square cube law"])
v('Tc7_v11_gL0', "What happens if you fall into a black hole? We follow Dave feet first to the event horizon: spaghettification, whether time really stops, and what is inside.", 1,
  ["what if you fell into a black hole", "what happens if you fall into a black hole", "falling into a black hole", "spaghettification", "event horizon", "black hole explained", "inside a black hole", "time dilation near a black hole", "tidal forces", "einstein ring", "sagittarius a star", "supermassive black hole", "hawking radiation", "space", "black hole life"],
  ["what happens if you fall into a black hole", "spaghettification", "event horizon"])
v('ELhubiuGdBc', "How long would it take to spend 1 billion dollars? In a day it's about $11,574 every second, and a billion dollars in cash weighs about ten tonnes.", 0,
  ["what if you had to spend 1 billion dollars in a day", "spending 1 billion dollars in a day", "spend a billion dollars in 24 hours", "how long would it take to spend a billion dollars", "how much does a billion dollars weigh", "billion dollars in cash", "what costs a billion dollars", "what if you had a billion dollars", "a billion seconds is 31 years", "spending multiplier explained", "money explained", "what if", "black hole life"],
  ["spending 1 billion dollars in a day", "how long would it take to spend a billion dollars", "billion dollars in cash weighs"])
v('QPeTnG9YhpY', "Can humans live on the Moon? Twelve people have walked there and nobody stayed longer than about three days, so Dave packs one suitcase and tries living on the Moon for real.", 1,
  ["what if you tried to live on the moon", "can humans live on the moon", "could you live on the moon", "what if we lived on the moon", "living on the moon", "moon base", "moon dust", "moon radiation", "moon temperature", "lunar night", "water on the moon", "oxygen from moon soil", "lava tubes", "space", "black hole life"],
  ["can humans live on the moon", "what if we lived on the moon", "living on the moon"])
v('MZOm3s9ob1E', "What would happen if you drank 100 energy drinks? How much caffeine is too much, what caffeine really does to tiredness, and why you'd never get near a hundred.", 0,
  ["what if you drank 100 energy drinks", "100 energy drinks", "how many energy drinks is too many", "how much caffeine is too much", "caffeine limit per day", "does caffeine give you energy", "how caffeine works", "caffeine and adenosine", "caffeine half life", "caffeine and sleep", "energy drink sugar", "energy drinks", "what if", "health science", "black hole life"],
  ["what if you drank 100 energy drinks", "how much caffeine is too much", "100 energy drinks"])
v('slysCLVFYgA', "What happens if you eat too much protein? Dave tries 300g of protein in one day to find out how much protein is too much, and where the rest of it goes.", 0,
  ["what if you ate 300g of protein a day", "what happens if you eat too much protein", "too much protein", "how much protein is too much", "how much protein can you eat in a day", "300g protein", "eating 300 grams of protein", "protein and kidneys", "rabbit starvation", "how much protein do you need", "protein myths", "high protein diet", "what if", "nutrition science", "black hole life"],
  ["what happens if you eat too much protein", "too much protein", "300g of protein in one day"])
v('WPJy9bXi5RY', "Do we only use 10% of our brain? What would happen if you used 100% of your brain at once, and where the 10 percent brain myth really came from.", 0,
  ["what if you used 100% of your brain", "what if you used 100 percent of your brain", "what happens if you use 100 of your brain", "do we only use 10 percent of our brain", "10 percent brain myth", "ten percent myth", "brain myths", "how much of your brain do you use", "can you use your whole brain", "neuroplasticity", "london taxi drivers brain", "brain energy", "brain facts", "neuroscience", "black hole life"],
  ["what if you used 100% of your brain", "do we only use 10% of our brain", "10 percent brain myth"])
v('uN5ypWRpy_I', "What happens if you don't sleep? Dave goes for the longest time without sleep on record, 264 hours, about eleven days, to see what happens to your body and brain.", 1,
  ["what happens if you never sleep", "what happens if you don't sleep", "what happens if you don't sleep for 11 days", "longest time without sleep", "how long can you stay awake", "randy gardner", "264 hours awake", "sleep deprivation", "microsleep", "local sleep", "glymphatic system", "dolphins sleep half brain", "sleep science", "what if", "black hole life"],
  ["what happens if you don't sleep", "longest time without sleep", "what happens if you never sleep"])
v('f6tdDLZoYQQ', "Do crosswalk buttons actually work? What about the elevator door close button? In 2004, New York admitted that more than 2,500 of its walk buttons did nothing.", 1,
  ["placebo buttons", "why you press buttons that do nothing", "do crosswalk buttons work", "crosswalk button", "walk button", "do elevator door close buttons work", "elevator door close button", "fake buttons", "placebo thermostat", "dummy thermostat", "illusion of control", "ellen langer", "psychology", "black hole life"],
  ["do crosswalk buttons work", "placebo buttons", "elevator door close button"],
  title="Placebo Buttons: Why You Press Buttons That Do Nothing")
v('VDkQlN6fxRo', "Why can't you tickle yourself, and why are we ticklish at all? The answer is your brain predicting your own touch before it happens.", 0,
  ["why can't you tickle yourself", "can you tickle yourself", "why can't we tickle ourselves", "why are we ticklish", "why are humans ticklish", "tickling", "efference copy", "sensory attenuation", "predictive brain", "blakemore tickle robot", "laughing rats", "panksepp rats", "neuroscience", "psychology", "black hole life"],
  ["why can't you tickle yourself", "why are we ticklish", "can you tickle yourself"])
v('LiTuGDyn8DM', "What did ancient people think the stars were? A short history of ancient astronomy, from Babylon's \"writing of heaven\" to the emu in the sky, one darker sky at a time.", 0,
  ["what did ancient humans think the stars were", "ancient astronomy", "history of astronomy", "ancient people stars", "night sky", "milky way", "light pollution", "bortle scale", "emu in the sky", "aboriginal astronomy", "babylonian astronomy", "mul apin", "sirius nile flood", "history", "black hole life"],
  ["what did ancient people think the stars were", "ancient astronomy", "history of astronomy"])
v('2ntf-K8jXKo', "What did ancient humans do for fun? Ancient games like the Royal Game of Ur, the oldest dice, the first flute and the oldest joke in the world, all in one phone-free evening.", 1,
  ["what did ancient humans do for fun", "ancient games", "oldest board game", "oldest board game in the world", "royal game of ur", "game of ur rules", "irving finkel", "knucklebones", "oldest dice", "oldest musical instrument", "hohle fels flute", "oldest joke in the world", "sumerian joke", "history", "black hole life"],
  ["what did ancient humans do for fun", "ancient games", "royal game of ur"])
v('HQbdV9TDlw4', "The Hawthorne effect explained: why people work harder when they're being watched, and what really happened in the Hawthorne experiments a hundred years ago.", 1,
  ["hawthorne effect", "hawthorne effect explained", "hawthorne effect experiment", "hawthorne effect psychology", "hawthorne experiments", "hawthorne works", "why you work harder when watched", "being watched", "observer effect", "elton mayo", "illumination experiments", "watching eyes experiment", "honesty box eyes", "psychology", "black hole life"],
  ["hawthorne effect explained", "hawthorne effect experiment", "why you work harder when watched"])
v('E6ZxhWGbdno', "Why do humans kiss? The history of kissing, from chimpanzees making up after a fight to the oldest written kiss, and whether every culture does it.", 1,
  ["why do humans kiss", "why do we kiss", "why do people kiss", "history of kissing", "who invented kissing", "first kiss in history", "oldest kiss", "do all cultures kiss", "kissing in other cultures", "chimpanzees kissing", "frans de waal", "mesopotamia kiss", "psychology", "history", "black hole life"],
  ["why do humans kiss", "why do we kiss", "history of kissing"])
v('C1vv8SBSMoU', "What is the overview effect? Why astronauts who see Earth from space come home different, and how close you can get to that feeling without a $450,000 ticket.", 0,
  ["overview effect", "what is the overview effect", "overview effect astronauts", "seeing earth from space", "why astronauts come back different", "frank white", "earthrise", "apollo 8", "blue marble", "pale blue dot", "yuri gagarin", "space tourism", "awe psychology", "space", "black hole life"],
  ["what is the overview effect", "overview effect astronauts", "seeing earth from space"])
v('QuxfwQ9IiyU', "The bystander effect explained: why a crowd can make help less likely, what really happened in the Kitty Genovese case, and how to get help in an emergency.", 0,
  ["bystander effect", "bystander effect explained", "bystander effect experiment", "diffusion of responsibility", "pluralistic ignorance", "darley and latane", "smoke filled room experiment", "kitty genovese", "kitty genovese case", "38 witnesses", "would anyone help you", "how to get help in an emergency", "cctv bystander study", "psychology", "black hole life"],
  ["bystander effect explained", "kitty genovese", "how to get help in an emergency"])
v('DjdFb-7PVGA', "Feeling behind in life at 30? Whose schedule says so: the founder ages, the by-30 lists and the people you're comparing yourself to.", 1,
  ["you are not behind", "feeling behind in life", "feeling behind in life at 30", "am i behind in life", "behind at 30", "by 30 list", "comparing yourself to others", "social media comparison", "average age of successful founders", "end of history illusion", "late bloomer", "self improvement", "stick figure animation", "black hole life"],
  ["feeling behind in life at 30", "am i behind in life", "comparing yourself"])
v('1aPVnOKALxY', "No willpower at night? Why you keep losing to the biscuit tin, and how the people with the most self-control stop snacking at night: they skip the fight.", 1,
  ["you are not weak", "willpower", "no willpower", "self control", "how to have more self control", "how to stop snacking at night", "ego depletion myth", "temptation", "discipline", "psychology facts", "stick figure animation", "black hole life"],
  ["no willpower at night", "how to stop snacking at night", "self control"])
v('Q9RDTNFrRbQ', "Why do you look darker in photos than in real life? For decades, film and cameras were tuned to the Shirley card. That is the photo's fault, not your skin.", 1,
  ["you are not too dark", "why do i look dark in photos", "why do i look darker in pictures", "dark skin photos", "shirley card", "kodak film history", "camera skin tone", "skin colour", "melanin evolution", "colourism", "self esteem", "stick figure animation", "black hole life"],
  ["why do i look darker in photos", "shirley card", "dark skin photos"])
v('FqCwTouJLbI', "Why do you go blank in math? Math anxiety fills the same working memory you need for the sum, and one simple writing trick before exams helps.", 1,
  ["you are not bad at math", "why am i bad at math", "why do i go blank in math", "math anxiety", "how to overcome math anxiety", "im not a math person", "working memory", "test anxiety", "expressive writing before exams", "sian beilock", "study tips", "stick figure animation", "black hole life"],
  ["why do i go blank in math", "math anxiety", "bad at math"])
v('-MXrXcTd8us', "Is it too late to learn guitar at 40? Am I too old to start? What a study of nearly fifty thousand people found about when your brain peaks.", 1,
  ["you are not too old", "too old to start", "is it too late to start", "is it too late to learn guitar", "too old to learn", "when does your brain peak", "learning as an adult", "learn guitar at 40", "late bloomer", "colonel sanders myth", "neuroplasticity", "stick figure animation", "black hole life"],
  ["is it too late to learn guitar", "too old to start", "when does your brain peak"])
v('O-JCindIwvw', "Think you're too skinny? Why skinny arms feel like the whole beach is watching, and what the action figures you grew up with did to your idea of a normal body.", 1,
  ["you are not too skinny", "am i too skinny", "too skinny", "skinny arms", "hardgainer", "body image", "spotlight effect", "gi joe action figures", "action figure body", "strength training for beginners", "stick figure animation", "black hole life"],
  ["am i too skinny", "skinny arms", "action figures body"])
v('2RODWPDyspA', "Am I weird? Nobody is normal: the Air Force measured 4,063 pilots to find the average one and found zero, and that's before pluralistic ignorance.", 1,
  ["you are not weird", "am i weird", "nobody is normal", "pluralistic ignorance", "flaw of averages", "average pilot air force", "feeling like the odd one out", "social anxiety", "psychology facts", "stick figure animation", "black hole life"],
  ["am i weird", "nobody is normal", "pluralistic ignorance"])
v('KEuLhiZz95s', "Why am I so unlucky? The psychology of luck: Richard Wiseman tested lucky and unlucky people with a newspaper, and the difference was not luck.", 1,
  ["you are not unlucky", "why am i so unlucky", "how to be lucky", "luck psychology", "richard wiseman luck factor", "lucky charms science", "newspaper photo experiment", "break your routine", "stick figure animation", "black hole life"],
  ["why am i so unlucky", "luck psychology", "richard wiseman"])
v('O_lZbM8mlBE', "Feeling lonely on a Saturday night, sure everyone else has a better social life? Where the other ninety-one people you follow really are.", 1,
  ["you are not alone", "feeling alone", "why do i feel alone", "feeling lonely on weekends", "loneliness", "why does everyone have a better social life", "social comparison", "reaching out to friends", "psychology facts", "stick figure animation", "black hole life"],
  ["feeling lonely on a saturday night", "everyone else better social life", "feeling lonely saturday night"])
v('SDhphGdlCj8', "Feel like a failure after one rejection? A 2019 study of people who missed by a hair shows what one \"unfortunately\" email really predicts, and how to deal with rejection.", 1,
  ["you are not a failure", "i feel like a failure", "feel like a failure", "rejection", "how to deal with rejection", "fear of failure", "near miss study", "early career setback", "resilience", "stick figure animation", "black hole life"],
  ["feel like a failure", "how to deal with rejection", "near miss study"])
v('G6jBADLtHeY', "Am I boring to talk to? The liking gap: after a chat, people like you more than you think, and your replay is the only one that says otherwise.", 1,
  ["you are not boring", "am i boring", "why am i boring in conversation", "am i boring to talk to", "liking gap", "overthinking conversations", "people like you more than you think", "awkward conversations", "conversation psychology", "stick figure animation", "black hole life"],
  ["am i boring to talk to", "liking gap", "people like you more than you think"])
v('b4zwJzP7kC4', "Why am I so lazy? The psychology of procrastination is mood repair: you're dodging a feeling, not the work, and a 2001 study shows it.", 0,
  ["you are not lazy", "why am i lazy", "am i lazy", "procrastination", "why do i procrastinate", "how to stop procrastinating", "procrastination psychology", "mood repair", "tim pychyl", "motivation", "stick figure animation", "black hole life"],
  ["why am i so lazy", "procrastination psychology", "mood repair"])
v('LR4VGwb7oBI', "Why do you forget what you study? Re-reading feels like learning but isn't. Testing yourself (active recall) is one of the best ways to study that has been tested.", 1,
  ["you are not dumb", "why do i forget what i study", "how to study", "best way to study", "active recall", "testing effect", "rereading", "einstein failed math myth", "study tips", "learning science", "stick figure animation", "black hole life"],
  ["why do i forget what i study", "best ways to study", "active recall"])
v('3hijnxP5SrY', "Think you're too short? Stretching, pills and hanging from doors can't make you taller once growth plates close, and Messi is 5'7\" tall. So does height matter?", 1,
  ["you are not short", "am i too short", "does height matter", "short men confidence", "height and success", "how tall is messi", "messi height", "short famous people", "how to look taller", "growth plates", "stick figure animation", "black hole life"],
  ["does height matter", "how tall is messi", "am i too short"])
v('mYDnI5kvcvU', "Why do you look ugly in photos but fine in the mirror? Camera vs mirror: selfie distortion stretches your nose and the mirror shows you backwards, so neither is the real you.", 1,
  ["you are not ugly", "why do i look ugly in photos", "why do i look different in pictures", "mirror vs camera", "selfie distortion", "selfie camera distortion", "am i ugly", "self esteem", "body image", "stick figure animation", "black hole life"],
  ["why do i look ugly in photos", "mirror vs camera", "selfie distortion"])
v('xSIvAgPyzr4', "No motivation to do anything? How to do things when you don't feel like it: discipline vs motivation, the 66-day habit study, and why missing one day is fine.", 2,
  ["no motivation to do anything", "how to do things when you don't feel like it", "discipline vs motivation", "discipline", "motivation", "how to build habits", "66 days habit", "never miss twice", "habit formation", "self improvement", "stick figure animation", "black hole life"],
  ["no motivation to do anything", "how to do things when you don't feel like it", "discipline vs motivation"])
v('8qfxyMxD7GU', "Perfectionism and procrastination are the same fear of failure in disguise. James Dyson failed 5,126 times before the one prototype that worked. Here's the smallest way to start today.", 2,
  ["perfectionism", "perfectionism and procrastination", "perfectionism and fear of failure", "fear of failure", "high standards", "how to start", "stop procrastinating", "self compassion", "james dyson", "growth mindset", "stick figure animation", "black hole life"],
  ["perfectionism and procrastination", "perfectionism fear of failure", "how to start"])
v('tI6s-w_4uIE', "How to improve your attention span: it has dropped from 2½ minutes to 47 seconds, it isn't your fault, and three small changes train you to focus again.", 2,
  ["attention span", "how to improve attention span", "how to improve attention span and focus", "how to focus", "47 second attention span", "phone addiction", "digital distraction", "deep work", "stop scrolling", "productivity tips", "stick figure animation", "black hole life"],
  ["how to improve attention span", "attention span 47 seconds", "how to focus"])
v('_2LUgvKUWKo', "Why do you feel lonely even around people? About half of all adults say they feel lonely, and how to stop feeling lonely starts with one small thing tonight.", 1,
  ["feeling lonely around people", "lonely but surrounded by people", "why do i feel lonely", "loneliness", "how to stop feeling lonely", "loneliness and health", "social connection", "making friends as an adult", "mental health", "stick figure animation", "black hole life"],
  ["feeling lonely around people", "why do i feel lonely", "how to stop feeling lonely"])
v('H5lF3uG-8tw', "Why does social media make you feel small? How to stop comparing yourself: the comparison trap, and the three-step fix behind a study where students who cut social media to 30 minutes a day felt less lonely within three weeks.", 2,
  ["social media comparison", "comparison trap", "stop comparing yourself", "why does social media make me feel bad", "social media and loneliness", "30 minute social media limit", "highlight reel vs real life", "unfollow accounts", "self improvement", "stick figure animation", "black hole life"],
  ["social media comparison", "why does social media make you feel small", "stop comparing yourself"])
v('AO5OvJl5k6A', "Why do you feel judged by everyone? The spotlight effect in psychology: you feel like everyone is watching, and in the study only 23% noticed.", 2,
  ["spotlight effect", "spotlight effect psychology", "why do i feel judged by everyone", "feeling like everyone is watching you", "fear of judgment", "social anxiety", "overthinking what people think", "stop caring what people think", "self confidence", "psychology facts", "stick figure animation", "black hole life"],
  ["why do i feel judged by everyone", "spotlight effect psychology", "feel like everyone is watching"])
v('1d5P2NVhQeA', "How to stop overthinking and worrying: in one study, 91% of the things anxious people worried about never happened. Three research-backed steps to break the loop.", 2,
  ["how to stop overthinking", "how to stop worrying", "overthinking", "worry", "91 percent of worries never happen", "anxiety relief", "stop worrying", "mental health", "stick figure animation", "black hole life"],
  ["how to stop overthinking", "how to stop worrying", "91% of worries never happen"])
v('hbpM6VGX9hY', "How to stop a bad habit at night that you keep promising to quit: often it's escape, not desire. Urge surfing: an urge rises, peaks and passes, and you can ride it out.", 2,
  ["late night habit", "how to break a bad habit", "how to stop a bad habit at night", "urge surfing", "habit loop", "compulsive habits", "self control", "never miss twice", "2am habit", "stick figure animation", "black hole life"],
  ["how to stop a bad habit at night", "urge surfing", "bad habit at night"])
v('pg7fshAltSU', "Can you increase your height? Not once you've stopped growing, so this is about confidence for short people: how you carry your height. In 1968 the same man was guessed 5 cm taller as a \"professor\".", 2,
  ["can you increase height", "height insecurity", "short height confidence", "confidence for short people", "how to look taller", "how to have presence", "1968 height experiment", "napoleon height myth", "feeling small", "stick figure animation", "black hole life"],
  ["can you increase your height", "confidence for short people", "height confidence"])
v('_l52TbOl7qQ', "Why do you procrastinate? It's a feeling problem, not a time problem, and the 2-minute rule is how to stop procrastinating today.", 2,
  ["why do i procrastinate", "procrastination", "how to stop procrastinating", "procrastination psychology", "2 minute rule", "two minute rule", "motivation", "productivity", "self improvement", "stick figure animation", "black hole life"],
  ["why do i procrastinate", "how to stop procrastinating", "2 minute rule"])
v('3Ap-cOHD7jk', "Never give up: how to not give up when everyone else does: you don't need to be the smartest person in the room, you need to keep showing up.", 0,
  ["how to not give up", "never give up", "never give up motivation", "how to not give up on yourself", "why people quit", "keep going", "consistency", "show up every day", "motivation", "discipline", "black hole life"],
  ["how to not give up", "never give up", "keep showing up"])

EP00_BODY = ("A one-minute reminder: success isn't built in one big moment. It's built in the quiet days you refused to quit.\n\n"
             "Learn something daily, make mistakes, then get back up and start again.\n\nNew videos every week.")
BANNED = re.compile(r"\b(insane|crazy|mind-?blowing|shocking|won't believe|baffled|hack|secret)\b", re.I)
STOP = set("am too vs a an the of to in on is are do does you your i my me we our if what why how can at for and or it its be been".split())

def norm(w):
    w = w.lower().strip("?.,:;\"'()!%")
    for suf in ("ing", "ed", "s"):
        if len(w) > 4 and w.endswith(suf):
            return w[: -len(suf)]
    return w

def words(s):
    return {norm(w) for w in re.findall(r"[\w'%½$]+", s.replace("%", " percent ")) if norm(w) not in STOP}

def paras(desc):
    return [p for p in re.split(r"\n\s*\n", desc.strip()) if p.strip()]

out = H / "desc"; out.mkdir(exist_ok=True); (H / "tags").mkdir(exist_ok=True)
rows, bad = [], 0
for i, p in V.items():
    d = json.load(open(META / f"{i}.info.json"))
    old = d.get("description") or ""
    title = p["title"] or d["title"]
    if i == "3Ap-cOHD7jk":
        new = p["open"] + "\n\n" + EP00_BODY
    else:
        lines = [l for l in old.strip().split("\n") if not re.search(r"TTS|Kyutai|VoiceStudio", l)]  # never credit the voice tool
        n = 0
        while p["drop"] and lines:
            n += bool(lines[0].strip()); lines.pop(0)
            if n == p["drop"]: break
        new = p["open"] + "\n\n" + "\n".join(lines).lstrip("\n")
    new = re.sub(r"\n{3,}", "\n\n", new).strip()
    (out / f"{i}.txt").write_text(new + "\n")
    (H / "tags" / f"{i}.txt").write_text(", ".join(p["tags"]) + "\n")
    probs = []
    if len(new) > 5000: probs.append(f"desc {len(new)} > 5000")
    if len(p["tags"]) > 15: probs.append(f"{len(p['tags'])} tags")
    if len(", ".join(p["tags"])) > 450: probs.append("tags > 450 chars")
    if len(title) > 100: probs.append("title > 100")
    if BANNED.search(p["open"] + title): probs.append("banned word: " + BANNED.search(p["open"] + title).group(0))
    if re.search(r"\b(AI|TTS|VoiceStudio)\b", new): probs.append("mentions AI/TTS")
    snippet = words(title + " " + p["open"])
    miss = {q: sorted(words(q) - snippet) for q in p["queries"]}
    miss = {q: m for q, m in miss.items() if m}
    if miss: probs.append("query miss: " + "; ".join(f"{q} -> {m}" for q, m in miss.items()))
    bad += bool(probs)
    rows.append((i, title, len(old), len(new), len(p["tags"]), probs))
for r in rows:
    print(f"{r[0]} | {r[1][:50]} | desc {r[2]}->{r[3]} | tags {r[4]} | {'OK' if not r[5] else ' / '.join(r[5])}")
print(f"\n{len(rows)} videos, {bad} with problems")
md = ["# SEO pass 2026-10-22 (all public videos)", "",
      "Each video: target queries (from YouTube autocomplete), new opening (the two lines above ...more), tags. "
      "Rest of each description is kept; 'Voice: Kyutai Pocket TTS' credit lines removed. Full texts: seo/desc/<id>.txt.", ""]
for i, p in V.items():
    d = json.load(open(META / f"{i}.info.json"))
    md += [f"## {d['title']}  (https://youtu.be/{i})"]
    if p["title"]: md += [f"- **New title:** {p['title']}"]
    md += [f"- Queries: " + " · ".join(p["queries"]), f"- Opening: {p['open']}", f"- Tags ({len(p['tags'])}): " + ", ".join(p["tags"]), ""]
(H / "SEO.md").write_text("\n".join(md))
