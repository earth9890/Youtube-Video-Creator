# Story skeletons: Zenn0009 + PastTense01 (our main style references)

**Corpus:** all 18 transcripts in the group: 10 Zenn0009 and 8 PastTense01, about 2.5 hours of narration. Five of the PastTense files exist only as `.timed.txt`; I included them. The `.timed.txt` files have pause marks but no `[mm:ss]`, so I rebuilt timestamps (about every 10 s) from the word-timed `subs/*.en-orig.vtt` files. Views come from `thumbs/metrics.tsv` and the earlier `zenn.md` and `past-tense.md` reports. Two transcripts end early: *Rarest Human Traits* and *Slotow*. *All Day* loses only its last sentence. Everything below is paraphrase.

**How links are labelled:** **BUT** marks a reversal or complication. **THEREFORE/SO** marks a consequence, or a question the previous beat forces. **AND** marks a beat that only adds another item. I marked AND honestly. Data: `data/zenn-pasttense.json`, which adds stakes, obstacle, facts, jokes and template fields to the schema.

## TL;DR
1. The two monster hits (8.0M *Night*, 5.0M *Calhoun*) have the highest share of causal links: **87–88% BUT/THEREFORE**, with only 2 AND beats each. The four videos under 200K average **56%**.
2. **Every video under 350K that answers its title question early fails.** *Spotlight* answers at 2%, *Cancer* at 13% and *Spiders* at 48%. In every video over 1M, the central question stays open until **82–92%** of the runtime.
3. Zenn builds stories and PastTense builds lists. Zenn is **77% BUT/THEREFORE**; PastTense is **55%**, with AND at 45%. PastTense's two 1M+ hits only work because a **counter** (the running odds) or a **because-chain** (*3 meals*) holds the list together.
4. A big hit has about **4 turns**: the 5 videos over 1M average 4.0, while the bottom 4 average 1.25. At least one of those turns is a **late "everyone believed X, but" reversal at 70–81%** of the runtime (7/18 videos, including both mega-hits).

---

### Zenn0009 — What Did Ancient Humans Do at Night? (8.00M, 8.5 min)
- **Story engine:** mystery
- **Protagonist:** you + your ancestors. **Wants:** to understand what the dark hours were for (and, unknowingly, to sleep the way your body was built to)
- **Central question:** So what did they actually do for all those dark hours? (0:30) **Answered:** 7:50 (92% of runtime)
- **Stakes:** A whole state of consciousness, lost without anyone noticing; your 2 a.m. waking gets misdiagnosed as a disorder.
- **Obstacle / antagonist:** A wrong belief (modern sleep is 'normal'), reinforced by translators and by artificial light.
- **Beat chain** (13/15 BUT/THEREFORE/SO, 2 AND):
  - [0:00] **AND**: Tonight you'll flip a light switch without thinking.
  - [0:05] **BUT**: For 99.9% of history there was no switch; half of every life was spent in darkness.
  - [0:30] **SO**: Central question: what filled all those hours?
  - [0:36] **THEREFORE**: Start with fire: before it, moving at night meant being eaten.
  - [1:11] **BUT**: Fire drew a 30-ft circle of safety, and it also added 2-4 usable hours a day.
  - [1:51] **THEREFORE**: A researcher's campfire study: day talk is work, night talk is mostly stories, so culture is born at the fire.
  - [2:53] **BUT**: The night held something else: you were not designed to sleep the way you do.
  - [3:03] **THEREFORE**: A historian finds 500+ records of 'first sleep' and 'second sleep' with a waking gap.
  - [4:24] **BUT**: Historians mistranslated it for centuries because they couldn't imagine it.
  - [4:35] **THEREFORE**: A 1992 darkness experiment makes volunteers fall into the same split pattern, with a meditative hormone state.
  - [5:42] **SO**: What killed it? Light: street lamps, gas, Edison.
  - [6:08] **AND**: Aside: 'curfew' means cover-fire; being out at night was suspicious or illegal.
  - [6:45] **BUT**: We 'conquered' night and called it progress, and blue light now wrecks melatonin.
  - [7:29] **THEREFORE**: We erased a whole phase of consciousness; what if your insomnia is your body remembering?
  - [8:00] **SO**: Recap of the ancestral night, then back to the light switch.
- **Open loops** (11; median gap between new loops 48.0 s):
  - 0:30 → 7:50: What did they do in the dark?
  - 0:36 → 1:41: Why is fire the key?
  - 1:31 → 1:51: What did fire give beyond safety?
  - 2:53 → 3:23: What else was happening at night?
  - 3:54 → 3:56: What did people do while awake mid-night?
  - 4:24 → 4:35: Why did nobody notice?
  - 4:35 → 5:05: Is it real biology or just history?
  - 5:42 → 5:47: What killed the second sleep?
  - 6:08 → 6:18: The part nobody talks about?
  - 6:49 → 7:29: What exactly did we lose?
  - 7:50 → 8:00: Is insomnia really a disorder?
- **Turns:** 0:05 the switch didn't exist for 99.9% of history; 2:53 you were not designed to sleep like this; 4:24 experts misread the evidence for centuries; 6:45 progress reframed as loss; 7:50 insomnia reframed as memory
- **Ending:** Closes on a calm recap of the ancestral night, then calls back to the opening switch: we traded all of it for that switch and never noticed.
- **Where facts sit:** Q: what happened at night? A: a researcher's numbers that day talk was work and night talk was mostly stories. / Q: is split sleep real or folklore? A: a modern lab removes artificial light and volunteers fall into the split pattern within weeks.
- **Where jokes sit:** Very few (~0.7/min). Each sits at the end of a story beat ('overnight, literally' on the fire beat; 'Daytime talk was work.'). No digressions.
- **Transplant template:** Tonight you [ordinary modern act]. BUT for 99.9% of history [it didn't exist]. SO what did [ancestors] do instead? First, [enabling thing]; it gave them [hidden gift] -> [named researcher's finding]. BUT there was more: you weren't built to [modern habit]. [Old records] showed it; experts missed it because [wrong belief]. THEREFORE [modern experiment] proves it's still in you. SO what killed it? [modern invention]. BUT here's what we lost: [X]. What if your [modern 'problem'] is your body remembering? Close: we traded it for [the opening object].

### Zenn0009 — The Calhoun Effect (5.00M, 8.5 min)
- **Story engine:** real-person discovery (experiment chronicle with a myth-correction twist)
- **Protagonist:** John Calhoun and his eight founder mice. **Wants:** Calhoun wants a final answer to 'what happens to a society when nothing is hard?'
- **Central question:** Everything was perfect, yet five years later all were dead with no diagnosable cause; what killed them? (0:10) **Answered:** 6:58 (82% of runtime)
- **Stakes:** The colony dies out, and by extension the warning applies to us.
- **Obstacle / antagonist:** An invisible cause (no scarcity, no disease) plus a popular misreading of the result.
- **Beat chain** (14/16 BUT/THEREFORE/SO, 2 AND):
  - [0:00] **AND**: Eight mice in a perfect world: unlimited food and water, no threats.
  - [0:10] **BUT**: Five years later every one is dead, and no vet could name a cause.
  - [0:22] **SO**: Meet Calhoun: he built a 'paradise' to test life when nothing is hard.
  - [0:48] **AND**: He had already seen the same collapse 24 times; #25 was meant to be the definitive run.
  - [1:21] **THEREFORE**: The setup: built for about 3,800 mice, which it 'would never come close to'.
  - [1:41] **SO**: Day by day: 104 calm days, then doubling, 600+ by day 315.
  - [2:12] **BUT**: Normally surplus mice emigrate, and here there was nowhere to go.
  - [2:23] **THEREFORE**: Young males with no role sink into listless piles.
  - [2:53] **BUT**: A second group turns frantic and hypersexual; females retreat to the top.
  - [3:54] **THEREFORE**: Mothers can't defend nests, abandon or eat their young; the social fabric is dead.
  - [4:35] **SO**: The survivors' kids become 'the beautiful ones': perfect fur, no social life.
  - [5:25] **THEREFORE**: Peak 2,200 on day 560, last conception day 920, last mouse dies 1973.
  - [6:07] **BUT**: The world read it as 'comfort kills'.
  - [6:37] **BUT**: Calhoun's own words say the killer was the loss of meaningful roles.
  - [7:33] **BUT**: And Calhoun wasn't a doomer: he spent his career looking for the fix.
  - [8:09] **SO**: Callback to the opening; the mice had no choice, we still do.
- **Open loops** (8; median gap between new loops 72 s):
  - 0:10 → 6:58: What killed them?
  - 0:40 → 6:58: What happens to a society when nothing is hard?
  - 1:41 → 5:25: How many will it reach (never near 3,800)?
  - 2:12 → 2:23: Where do the surplus mice go?
  - 3:24 → 4:24: What behaviours no mouse society had seen?
  - 4:45 → 4:55: How will the next generation behave?
  - 6:07 → 6:37: Is 'comfort kills' what he really said?
  - 7:33 → 7:38: The part nobody quotes?
- **Turns:** 0:10 a paradise ends in total extinction; 2:12 there's no exit valve; 5:05 the healthiest-looking mice are 'functionally dead'; 6:37 the famous lesson is a misreading; 7:33 the scientist was an optimist
- **Ending:** Repeats the cold-open facts (eight mice, five years, an unnameable cause) and hands the stakes to the viewer: they had no choice, we do.
- **Where facts sit:** Q: why does crowding break this colony? A: normal colonies shed surplus mice by emigration, and this one had no exit. / Q: what killed them? A: Calhoun's own sentence about roles outnumbered by individuals.
- **Where jokes sit:** Almost none (~0.35/min). Irony only from names ('walk-up apartments', 'beautiful ones'). The story carries it.
- **Transplant template:** [N subjects] were placed in a perfect [world]. [Time] later, all [failed], with no obvious cause. [Named person] built it to answer [big question]; he'd seen it [N] times, and this was the final test. Timeline: [calm phase] -> [growth] -> BUT [missing escape valve] -> THEREFORE [symptom 1] -> BUT [symptom 2] -> [darkest symptom] -> [a generation that looks perfect but is dead] -> [end date]. Everyone concluded [popular myth]. BUT his paper actually said [real cause]. AND he spent his life trying to [fix]. Callback to the opening; [they] had no choice, you do.

### Zenn0009 — Why You Can't Remember Being a Baby (1.80M, 6.9 min)
- **Story engine:** mystery
- **Protagonist:** you (baby you). **Wants:** to recover/understand the first three years of your own life
- **Central question:** You lived a whole life before age 3 and remember none of it; why, if 'brain not ready' is wrong? (0:10-0:20) **Answered:** 6:08 (89% of runtime)
- **Stakes:** Your identity: is the baby in your photos even you?
- **Obstacle / antagonist:** A wrong belief (babies can't record) and the brain's own growth.
- **Beat chain** (11/14 BUT/THEREFORE/SO, 3 AND):
  - [0:00] **AND**: You lived a full life before age three: first word, first steps.
  - [0:08] **BUT**: You remember none of it.
  - [0:12] **BUT**: The usual answer, 'brain not ready', is wrong: something destroyed the memories.
  - [0:20] **THEREFORE**: Freud named it; a ribbon-and-mobile experiment proves babies do remember for days and weeks.
  - [1:01] **BUT**: Those memories never reach adulthood, and for decades nobody knew why.
  - [1:11] **SO**: Layer 1: the hippocampus isn't wired yet.
  - [1:52] **BUT**: That's only half; in 2014 two neuroscientists propose building the brain erases memory.
  - [2:43] **THEREFORE**: Mouse experiments confirm it: not too weak, too busy growing.
  - [3:14] **BUT**: Another layer: no sense of self yet (mirror-and-rouge test).
  - [4:25] **SO**: An uncomfortable question: is the baby in your photos actually you?
  - [4:46] **AND**: One more piece: language gives memory a skeleton.
  - [5:27] **AND**: Culture shifts the age of first memory (2.5 to 4+).
  - [6:08] **SO**: Recap: everything at once.
  - [6:29] **THEREFORE**: Reframe: your brain was busy becoming you, which meant destroying who came before.
- **Open loops** (8; median gap between new loops 49 s):
  - 0:10 → 6:08: Why can't you remember?
  - 0:12 → 3:03: What destroyed the memories?
  - 1:01 → 1:11: Why don't infant memories last?
  - 1:52 → 2:13: What's 'even stranger'?
  - 2:13 → 2:53: Can building a brain really erase it?
  - 3:14 → 3:24: What's the strangest layer?
  - 4:25 → 6:39: Is baby-you actually you?
  - 4:46 → 4:56: What's the last piece?
- **Turns:** 0:12 the common answer is wrong; 3:03 not too weak, too busy growing; 4:25 baby-you may be a different person; 6:29 forgetting was the price of becoming you
- **Ending:** Explicit recap of all layers, then a philosophical sting: becoming you required destroying the person before.
- **Where facts sit:** Q: can babies form memories at all? A: the ribbon-kick experiment (yes, for days or weeks). / Q: what destroys them? A: the neurogenesis study, where speeding new neurons makes adult mice forget.
- **Where jokes sit:** Near zero. Tension comes from repeated 'even stranger' escalations.
- **Transplant template:** You [did/experienced X] and remember none of it. Most people think [simple answer]. BUT that's not quite right: [stronger claim]. Proof the capacity exists: [experiment]. BUT [it vanishes]. Layer 1 [structural cause]. BUT that's only half: Layer 2 [counterintuitive cause, the thing that builds you destroys it]. Layer 3 [identity] -> uncomfortable question. Layer 4 [culture shifts it]. SO it was all at once. Close: [the loss] was the price of [becoming you].

### Zenn0009 — What Did Ancient Humans Actually Eat? (894K, 8.1 min)
- **Story engine:** other: escalating-horror chronology ('it gets worse')
- **Protagonist:** you + your ancestors. **Wants:** calories, to survive
- **Central question:** Your fridge isn't food to them; so what did they actually eat? 'The answer would horrify you.' (0:08) **Answered:** 6:49 (85% of runtime)
- **Stakes:** Survival then; now, a 3-million-year program misfiring in a world of donuts.
- **Obstacle / antagonist:** Nature (scarcity, predators) and, today, our own outdated cravings.
- **Beat chain** (11/14 BUT/THEREFORE/SO, 3 AND):
  - [0:00] **AND**: Open your fridge: soda, yogurt, pizza.
  - [0:05] **BUT**: To your ancestors none of this is food; what did they eat? (proof is in caves)
  - [0:18] **SO**: 3 million years ago we were scavengers: marrow from bones hyenas couldn't break, brains.
  - [1:22] **THEREFORE**: That's why your body still treats fat like treasure.
  - [1:43] **BUT**: 'What came later is worse': fire turns cooking into pre-digestion, guts shrink, brains grow.
  - [2:33] **THEREFORE**: The menu explodes; honey is about 15% of Hadza calories.
  - [3:14] **SO**: Same craving in you: modern sugar is honey in a costume.
  - [4:05] **AND**: Meat: one mammoth buys time for culture, and protein cravings follow.
  - [4:25] **BUT**: One craving we can't admit: each other (cut-marked skull cups in an English cave).
  - [5:06] **BUT**: It wasn't starvation: calorie math shows a human is poor food, so it was ritual.
  - [5:47] **AND**: Stranger still: they ate rotten meat on purpose, and cheese/beer are 'controlled rot'.
  - [6:49] **THEREFORE**: Every craving still runs; at 11 p.m. at the fridge you're running ancient code.
  - [7:09] **BUT**: Role swap: you'd die in their world, and they'd think your kitchen is a god's pantry.
  - [7:50] **SO**: You may be the first human who isn't hungry.
- **Open loops** (7; median gap between new loops 41.0 s):
  - 0:08 → 6:49: What did they actually eat?
  - 0:12 → 4:35: What's the proof in caves?
  - 1:43 → 4:25: What came later that's worse?
  - 4:05 → 4:10: What else did they crave?
  - 4:25 → 4:28: The craving we can't admit?
  - 5:06 → 5:16: Was it starvation?
  - 5:47 → 5:56: What's stranger?
- **Turns:** 0:05 your food isn't food; 4:28 cannibalism; 5:06 not hunger but ritual; 6:28 cheese is rot; 7:09 the time-travel swap
- **Ending:** Callback to the opening fridge (now at 11 p.m.), a two-way time-travel swap, and a gratitude sting.
- **Where facts sit:** Q: why do you crave fat? A: marrow and brains were the jackpot no other scavenger could reach. / Q: was cannibalism about hunger? A: calorie comparison of a human body vs a bison vs a mammoth.
- **Where jokes sit:** ~1/min, placed at the end of each era beat as a modern translation ('sugar wearing a costume', 'controlled rot'). Each one bridges the beat back to 'you'.
- **Transplant template:** Open your [modern thing]. To [ancestors], none of it is [category]. SO what did they [do]? (warn: horrifying). Era 1: [grim fact] -> 'your body still remembers' [modern craving]. BUT it gets worse. Era 2: [enabling tech] -> [body change]. Each era ends with a craving you still have ([modern product] = [ancient thing] in disguise). BUT one [thing] we can't admit: [taboo]. Not because [obvious reason]: [number that kills it]. AND stranger: [gross fact] -> [beloved thing is just that]. Close: [you at 11 p.m.] running ancient code; swap test both ways; you're the first who [doesn't suffer X].

### Zenn0009 — What If WE Are The Aliens? (829K, 10.5 min)
- **Story engine:** versus/conflict (trial of a what-if hypothesis: case for, case against, residual mystery)
- **Protagonist:** humanity ('us'). **Wants:** to know where we come from and why we don't fit
- **Central question:** What if we don't fit on Earth because we're not from here? (0:22) **Answered:** 9:32 (91% of runtime)
- **Stakes:** Our origin story; whether we're 'home'.
- **Obstacle / antagonist:** Rival explanation (evolutionary mismatch) plus the honest limits of science.
- **Beat chain** (8/16 BUT/THEREFORE/SO, 8 AND):
  - [0:00] **AND**: Every species is adapted to Earth: gills, hollow bones, fur.
  - [0:10] **BUT**: We burn in our own sun, our spines fail, birth kills us.
  - [0:22] **SO**: Central question: what if we're not from here?
  - [0:28] **AND**: Exhibit 1: sunburn (we invented sunscreen against our own star).
  - [0:50] **AND**: Exhibit 2: 80% get back pain; we were 'retrofitted, badly'.
  - [1:21] **AND**: Exhibit 3: deadliest childbirth, most helpless babies.
  - [2:01] **AND**: Exhibit 4: allergies, our defences attack the air.
  - [2:21] **BUT**: The strangest exhibit isn't physical: we alone know we'll die.
  - [3:12] **AND**: The hardest one: we dismantle our ecosystem like an invasive species.
  - [3:53] **SO**: Where from, then? The DNA co-discoverer proposed directed panspermia.
  - [4:34] **AND**: Supporting evidence: life appeared fast, meteorite amino acids, tardigrades survive space, a book arguing it.
  - [6:16] **BUT**: Mainstream biology answers almost all of it: evolutionary mismatch, item by item.
  - [7:38] **BUT**: 'Settles it, right? Not quite': nothing explains our speed.
  - [8:40] **AND**: Candidate causes (language, cooking, FOXP2, teaching): none complete.
  - [9:21] **SO**: Honest verdict: probably not aliens, but we don't fully know.
  - [9:52] **THEREFORE**: Maybe the restlessness is a clue; either/or close.
- **Open loops** (7; median gap between new loops 72.0 s):
  - 0:22 → 9:32: Are we from somewhere else?
  - 2:21 → 2:28: What's the strangest part?
  - 3:12 → 3:22: Which one is hardest to explain?
  - 3:53 → 4:03: So where did we come from?
  - 6:16 → 6:26: Can normal biology explain it?
  - 7:38 → 7:49: What can't biology explain?
  - 8:40 → 9:21: Why so fast?
- **Turns:** 6:16 the case flips to mismatch; 7:38 fake ending: 'not quite'; 9:32 concession: probably not true
- **Ending:** Two-branch close: if we're from here we're the strangest thing Earth made; if not, we've been trying to get home without knowing. It ends on a question.
- **Where facts sit:** Q: why do we burn? (later) A: hair loss for sweat-cooling on the savanna, the price of out-running everything. / Q: is the alien idea crank talk? A: a Nobel laureate co-wrote the 1973 paper.
- **Where jokes sit:** Highest in the set (~1.9/min), but stacked on the 'case for' exhibits (0:28-3:53) as roasts of the species. The final 2 minutes are joke-free.
- **Transplant template:** Every [peer] fits [environment]. Then there's [subject]: [3 misfits]. What if [wild hypothesis]? Case FOR: exhibit 1..5, escalating to 'the strangest one' and 'the hardest one'. SO a credible [authority] proposed [hypothesis] + supporting evidence. BUT mainstream [field] explains each exhibit (re-walk the list in the same order). 'Settles it, right? Not quite': [one residual anomaly]. Candidate explanations, none complete. Honest verdict: probably not, but not certain. Close on an either/or that makes the viewer feel strange and special.

### Zenn0009 — Why Hasn't Anyone Raised the Titanic? (728K, 10.4 min)
- **Story engine:** mission/quest (obstacle ladder: 'why hasn't anyone done X?')
- **Protagonist:** would-be salvagers ('you', engineers, a salvage company). **Wants:** to bring the Titanic back up
- **Central question:** We know exactly where it is; why hasn't anyone just brought it up? (0:07) **Answered:** 9:18 (90% of runtime)
- **Stakes:** A fortune and history, versus disturbing 1,500 graves; and the wreck will soon be gone either way.
- **Obstacle / antagonist:** Physics (pressure, weight, fragility), nature (iron-eating bacteria, a hurricane), and morality.
- **Beat chain** (14/17 BUT/THEREFORE/SO, 3 AND):
  - [0:00] **AND**: It's right there: we've sent cameras, subs, even tourists.
  - [0:07] **SO**: So why not raise it and charge admission?
  - [0:16] **BUT**: Dozens of plans, all failed.
  - [0:28] **BUT**: Obstacle 1: 2.5 miles down, 6,000 psi, and the 2023 sub implosion as proof.
  - [1:32] **BUT**: Say you solve pressure: obstacle 2, 52,000 tons, no cable could lift it.
  - [2:02] **BUT**: Obstacle 3: it's in two pieces and rotting; pull and it disintegrates.
  - [2:42] **SO**: So people got creative: ping-pong balls, petroleum jelly, ice, a novel's compressed air, each killed in a line.
  - [4:05] **BUT**: Someone did raise part of it: 'the big piece'.
  - [5:07] **BUT**: 1996: crowds cheer as it surfaces, then a hurricane snaps the lines.
  - [5:17] **THEREFORE**: 1998 retry succeeds, now on display in Las Vegas.
  - [5:37] **BUT**: That took 4 years for 15 tons, against 52,000.
  - [6:07] **BUT**: Meanwhile a unique bacterium is eating the ship; gone in 20-30 years.
  - [7:39] **AND**: The other reason: it's a grave (moment of silence, pairs of shoes on the seabed).
  - [8:45] **THEREFORE**: The UN and a treaty protect it like a cemetery.
  - [9:18] **SO**: Layered answer: we can't, and we shouldn't.
  - [9:41] **AND**: One face: a passenger's postcard to his mother.
  - [9:55] **SO**: The ocean is taking it back: a fitting end.
- **Open loops** (8; median gap between new loops 71 s):
  - 0:07 → 9:18: Why hasn't anyone raised it?
  - 0:20 → 0:28: Why did every attempt fail?
  - 2:42 → 2:53: What wild ideas did people try?
  - 4:05 → 4:15: How did someone bring part of it up?
  - 4:56 → 5:07: Will the big piece make it?
  - 6:07 → 6:17: What's eating it?
  - 7:39 → 7:49: What's the non-technical reason?
  - 8:19 → 8:30: What did Ballard see?
- **Turns:** 4:05 someone did succeed; 5:07 hurricane snatches victory; 5:37 scale makes the win tiny; 6:07 a clock starts: it's disappearing; 7:39 can't becomes shouldn't
- **Ending:** A quiet moral reframe: maybe vanishing is the right end. Last image: a faint mark on the seafloor; time doing what time does.
- **Where facts sit:** Q: why can't you just go down there? A: 6,000 psi, then the 2023 implosion shows what that does. / Q: why not lift it? A: 52,000 tons = 36,000 cars, and the one piece raised weighed 15.
- **Where jokes sit:** ~1/min, mostly deadpan undercuts at the end of failed attempts ('and then a hurricane arrived', 'to put it mildly, not practical'). All on story beats.
- **Transplant template:** [Famous thing] is right there; we've even [done lesser thing]. SO why hasn't anyone [obvious action]? It seems easy: [profit]. People tried and all failed. Obstacle 1 [physics] + a recent tragedy as proof. 'Say you solve that': obstacle 2 [scale + vivid comparison]. Obstacle 3 [it's not what you picture]. Wild-attempt montage, each killed in one line. BUT someone DID do a small piece: [mini-heist with crowd, setback, retry]. BUT scale: [tiny vs total]. Meanwhile [nature's clock erasing it]. AND the deeper reason: [moral]. Layered answer: can't AND shouldn't. One human face. Quiet final image.

### Zenn0009 — What Happens After We Die? (583K, 8.2 min)
- **Story engine:** survival/countdown (second-by-second clock, 0 to 60 s)
- **Protagonist:** you, in your last minute. **Wants:** (implicitly) to live, and to know what you experience
- **Central question:** Your heart just stopped; what happens in the next 60 seconds, and is your brain at its most alive? (0:10) **Answered:** 7:31 (93% of runtime)
- **Stakes:** Your life (the 4-6-minute reversible window) and what your final experience is.
- **Obstacle / antagonist:** Time and biology (oxygen running out), plus science's limits.
- **Beat chain** (13/16 BUT/THEREFORE/SO, 3 AND):
  - [0:00] **AND**: Your heart just stopped: second zero.
  - [0:10] **BUT**: Claim: dying may be the most alive your brain ever is.
  - [0:17] **SO**: 0 s: nothing you can feel; blood stops.
  - [0:30] **BUT**: Your brain doesn't know yet: about 10 s of oxygen left, you're still you.
  - [0:50] **THEREFORE**: About 10 s: cortex shuts down, consciousness goes; from outside you look gone.
  - [1:11] **BUT**: Inside, a 2023 study shows a gamma surge as the brain dies ('crazy high').
  - [2:14] **SO**: Pause: near-death reports match; life review is small moments, not highlights.
  - [2:54] **AND**: White-cat anecdote: a memory from 14 months old, confirmed by his mother.
  - [3:35] **SO**: Are all memories still in there? We don't know.
  - [3:46] **BUT**: Meanwhile the body goes dark: 30 s, lactic acid, jaw drops, pupils fixed.
  - [4:37] **BUT**: 'Or are they?' Hospital studies: about 40% report some awareness, 3% full sight and sound.
  - [5:27] **AND**: Many report not being alone; the experience is mostly peaceful.
  - [5:59] **SO**: 60 s: still reversible; self-digestion just beginning; limbo.
  - [7:00] **SO**: Waiting for what? Two answers: oxygen, or this was your last minute.
  - [7:31] **THEREFORE**: Your brain used that minute to turn on, not off.
  - [7:41] **SO**: Moral: survivors want time; the ordinary Tuesdays are what replays.
- **Open loops** (8; median gap between new loops 41 s):
  - 0:10 → 7:31: What happens in the 60 s / most alive?
  - 0:30 → 0:50: When does the brain notice?
  - 1:11 → 1:31: What's happening inside?
  - 2:44 → 2:54: What does the life review really show?
  - 2:54 → 3:25: Whose memory is the white cat?
  - 3:35 → left open: Are all our memories still in there?
  - 4:37 → 4:47: Is anyone behind the eyes?
  - 7:00 → 7:11: Waiting for what?
- **Turns:** 1:31 a surge, not a fade; 2:44 life review is trivia, not highlights; 4:37 'or are they?' awareness reported while clinically dead
- **Ending:** A moral flip with a callback to the 'random Tuesday' (2:54): your brain recorded it all and may play it back. One loop (are all memories stored?) is deliberately left open.
- **Where facts sit:** Q: what does the dying brain do? A: the 2023 gamma-surge study. / Q: is anyone 'in there' after the heart stops? A: hospital-study percentages for awareness.
- **Where jokes sit:** Essentially none. Tension comes from the clock and from 'here's where it gets strange again' re-hooks.
- **Transplant template:** [Clock event] just happened to you. Second zero. Claim: [counterintuitive]. Walk the clock: [t1 body fact] -> BUT [inside, the opposite] -> named study. Pause for [human reports] + one jaw-drop anecdote -> open question. Back to the body at [t2]. 'Or are they?' -> bigger study with percentages. [t3]: the reversible window. 'Waiting for what?' Two answers. Close: a moral + callback to the anecdote.

### Zenn0009 — What Did Ancient Humans Do All Day? (446K, 8.8 min)
- **Story engine:** other: day-in-the-life clock walk
- **Protagonist:** you, placed in a Hadza/Kung camp. **Wants:** (implicitly) the happiness and free time they seem to have
- **Central question:** They work ~2.5 hours a day and look happier; so what do they actually do all day? (0:32) **Answered:** 8:05 (92% of runtime)
- **Stakes:** What we traded away: time, closeness, equality.
- **Obstacle / antagonist:** Our assumptions (hunters feed the camp, primitive = miserable) and modern life's bosses and bills.
- **Beat chain** (11/17 BUT/THEREFORE/SO, 6 AND):
  - [0:00] **AND**: Right now a Hadza man is napping; his work day is done.
  - [0:10] **AND**: 2.5 hours of work, fewer chronic diseases, more laughter; they look happier.
  - [0:32] **SO**: So what do they do all day? A 1968 time study: about 15 hours of work a week.
  - [0:50] **THEREFORE**: Walk the day with 'you' in it: sunrise, 25-30 people you've known forever.
  - [1:21] **AND**: First hour is talk, which is the camp's operating system and legal system.
  - [2:01] **BUT**: An anthropologist's Christmas ox gets mocked for weeks, and the reason is equality.
  - [3:02] **BUT**: Hunting is dramatic and usually fails.
  - [3:43] **BUT**: The women feed the camp; grandmothers out-gather mothers.
  - [4:24] **AND**: Kids learn in mixed-age play groups: 'the school we evolved for'.
  - [5:15] **SO**: Midday: sharing is a rule, possibly what built our brains.
  - [5:46] **AND**: Afternoon: naps, lice, toilets, sex, all without shame.
  - [6:26] **BUT**: Conflicts happen, and they end by walking away to another camp.
  - [6:56] **AND**: Late afternoon visits; hunters usually return empty.
  - [7:38] **BUT**: This is not paradise: sickness, dead children.
  - [8:05] **SO**: Answer: the 'original affluent society' had time, not wealth.
  - [8:15] **BUT**: We made real trades (vaccines) and hidden ones (bosses and bills).
  - [8:35] **THEREFORE**: We're still hunter-gatherers; we just stopped doing [their things]. (transcript cut)
- **Open loops** (5; median gap between new loops 75.0 s):
  - 0:32 → 8:05: What do they do all day?
  - 0:30 → 8:05: Why are they happier?
  - 2:01 → 2:32: Why mock a great gift?
  - 3:02 → 3:43: Who actually feeds the camp?
  - 6:26 → 6:36: How do fights end without police?
- **Turns:** 2:22 the generous gift is mocked; 3:43 the women, not the hunters, feed the camp; 7:38 'this is not paradise'
- **Ending:** Balanced ledger (real gains and hidden losses), with a callback to the opening's 'no boss, no rent' as 'bosses and bills', ending on the line that we are still them.
- **Where facts sit:** Q: how much did they work? A: an anthropologist's minute-by-minute tally, about 15 h/week. / Q: who feeds the camp? A: women provide more than half the calories; grandmothers gather the most.
- **Where jokes sit:** ~2/min (the funniest Zenn), mostly as tag lines at the end of each clock segment ('Most of us hit that before lunch', 'Generosity is the savings account'). They sit on story beats, and the ending stretch is joke-free.
- **Transplant template:** Right now, somewhere, [person] is [enviable state]. [Stat vs you]. SO what do they actually do all day? Walk the clock with 'you' inside: Sunrise [scene] -> [surprising function] + one story with a twist -> Morning [the expected hero fails; the unexpected hero] -> Midday [a rule] -> Afternoon [taboo said flat] -> [how conflict ends] -> Evening. BUT this is not paradise. The answer: [abstract resource]. We made real trades AND hidden trades. Close: you still have their [body]; you just stopped [X].

### Zenn0009 — The Slotow Effect (341K, 11.5 min)
- **Story engine:** mystery (whodunit) -> real-person discovery
- **Protagonist:** rangers and ecologists at a South African reserve; the orphan elephants. **Wants:** stop the rhino killings without shooting their way out
- **Central question:** Rhinos found dead with horns still on; who is killing them, and why? Framed as 'why the young need the old'. (0:00-0:45) **Answered:** 9:50 (86% of runtime)
- **Stakes:** A rhino population nursed back from a few dozen animals; the orphans' lives.
- **Obstacle / antagonist:** A wrong theory (trauma, bad elephants) and a missing piece nobody could supply (adult bulls couldn't be moved).
- **Beat chain** (18/21 BUT/THEREFORE/SO, 3 AND):
  - [0:00] **AND**: 1994: dead rhinos, and poachers are the obvious suspect.
  - [0:05] **BUT**: The horn is still attached.
  - [0:20] **AND**: Wounds from above, elephant-sized prints.
  - [0:45] **BUT**: Elephants don't kill rhinos; this one was hunting.
  - [1:08] **SO**: Rewind to 1979: a new park is stocked with 18 orphan calves and no adults.
  - [1:31] **BUT**: Why orphans? Culls shot the matriarch first, then the herd; only calves could be trucked.
  - [2:53] **THEREFORE**: Nobody was a villain; the orphans were left to raise themselves.
  - [3:13] **BUT**: They turn nervous and aggressive, and two adult females can't fix it.
  - [3:44] **THEREFORE**: Charges, a tourist killed, the hunter sent to stop it killed too.
  - [4:04] **THEREFORE**: 1994: 20 rhinos dead in a year.
  - [4:35] **SO**: Rangers work it like a serial case and shoot three suspects; the killings stop.
  - [4:55] **BUT**: 1996: 20 more die. Wrong elephants.
  - [5:05] **THEREFORE**: Two-year surveillance, rap sheets, a suspect named 'Tom Thumb', a 1997 catch in the act.
  - [5:36] **BUT**: Trauma explains anger but not timing; the clusters have a rhythm.
  - [5:56] **THEREFORE**: Every killer was a young male in musth, which normally starts late and short.
  - [6:47] **BUT**: Older bulls switch musth off just by existing, and this park had none.
  - [8:08] **BUT**: Diagnosis flips: the park didn't have bad elephants, it was missing elephants.
  - [8:28] **SO**: Import adult bulls (newly possible with new trucks).
  - [9:09] **THEREFORE**: Outranked, the young bulls' musth collapses; the killings stop completely.
  - [10:00] **AND**: Callback: even Tom Thumb left the rhinos alone; paper in Nature.
  - [10:10] **SO**: Lesson: a society has an architecture; humans will never get this experiment.
- **Open loops** (7; median gap between new loops 45.5 s):
  - 0:00 → 0:40: Who killed the rhinos?
  - 0:45 → 6:57: Why would elephants kill rhinos?
  - 1:31 → 1:41: Why were there no adults?
  - 4:55 → 5:05: Why did killings resume?
  - 5:36 → 5:56: Trauma or something else?
  - 5:25 → 10:00: What happens to Tom Thumb?
  - 8:08 → 9:50: What's the fix?
- **Turns:** 0:05 the horn is still there; 0:45 elephants don't do this; 4:55 they shot the wrong ones; 5:36 trauma theory fails on timing; 8:08 'not bad elephants, missing elephants'
- **Ending:** Extrapolates the lesson to human neighbourhoods we can never experiment on; final line (transcript cut) says nothing about them changed except their surroundings.
- **Where facts sit:** Q: why no adults? A: the cull method (matriarch first; calves the only ones small enough to truck). / Q: why the killing clusters? A: the musth mechanism and how older bulls cap it.
- **Where jokes sit:** ~0.5/min, deadpan ('mostly by ignoring each other') and one callback (Tom Thumb). All on story beats.
- **Transplant template:** [Year]: [victims] found dead. Obvious suspect [X], BUT [clue rules X out]. Clues point to [impossible culprit], BUT [culprit] never does this. SO rewind: how [culprit] got here, a well-meant decision with a dark detail; nobody was a villain. Warning signs -> escalation -> body count. Investigators act on [wrong theory]; it works, BUT it happens again. Surveillance, a named suspect. Two theories: [obvious] vs [precise]; the timing reveals [mechanism], and what normally switches it off is [missing element]. Diagnosis flip: not bad [X], missing [Y]. Fix: put [Y] back, and it stops in a season. Callback to the named suspect. Lesson for humans.

### Zenn0009 — The Spotlight Effect (150K, 8.3 min)
- **Story engine:** other: myth-bust self-help (feeling vs data)
- **Protagonist:** you. **Wants:** not to be judged
- **Central question:** Is everyone really watching you? (answered almost at once: no, 0:10). The working question is why it feels that way. (2:12) **Answered:** 0:10 (2% of runtime)
- **Stakes:** Every hand you didn't raise and every thing you didn't try.
- **Obstacle / antagonist:** Your own brain's ancient software (anchoring, tribe-era fear).
- **Beat chain** (11/15 BUT/THEREFORE/SO, 4 AND):
  - [0:00] **AND**: You walk in late; everyone sees the stain and the sweat.
  - [0:10] **BUT**: What really happened: two glances, nobody cared.
  - [0:28] **SO**: It has a name: the spotlight effect.
  - [0:37] **THEREFORE**: The embarrassing-T-shirt study: wearers guess 50% noticed; under 25% did.
  - [1:31] **AND**: Variations: flattering shirts, group discussions, same result.
  - [2:12] **SO**: Why? Anchoring on your own vivid experience.
  - [2:53] **AND**: The elevator example: you're the star, they're scenery.
  - [3:33] **SO**: Roots: in a tribe of 150, reputation meant survival.
  - [4:04] **BUT**: You live among 8 billion, and your brain hasn't caught up.
  - [4:24] **AND**: Its cousin: the illusion of transparency (speeches, bitter drinks).
  - [5:36] **THEREFORE**: Just knowing about it made speakers perform better.
  - [6:06] **BUT**: Counterpoint, social media: it still holds.
  - [6:36] **SO**: What it cost you: every hand not raised.
  - [7:38] **THEREFORE**: You're free: go to the restaurant alone, wear the shirt.
  - [8:08] **SO**: Inverted callback: they're worried about who's looking at them.
- **Open loops** (7; median gap between new loops 61.5 s):
  - 0:10 → 0:10: What actually happened?
  - 0:28 → 1:31: Does it hold up in tests?
  - 2:12 → 2:22: Why does your brain do this?
  - 3:33 → 3:44: Where does it come from?
  - 4:24 → 4:35: What cuts deeper?
  - 5:36 → 5:56: Is knowing it useful?
  - 6:06 → 6:16: What about social media?
- **Turns:** 0:10 nobody noticed; 5:46 knowing the effect improves performance
- **Ending:** Empowerment list, then the opening room scene inverted: everyone is busy worrying about themselves.
- **Where facts sit:** Q: how visible are you really? A: guessed 50% vs actual under 25% in the T-shirt study. / Q: can knowing help? A: the follow-up study where informed speakers were rated more composed.
- **Where jokes sit:** ~0.8/min; small relatable tags. Note it's the lowest-viewed Zenn and the one with the weakest open loop.
- **Transplant template:** You [embarrassing scene]; everyone saw. BUT what actually happened: [deflation]. It has a name. Classic experiment: [guess vs reality %]. Variations. WHY: [mechanism] + everyday example. Evolutionary root -> mismatch with now. A deeper cousin effect. Payoff: knowing helps. A counterpoint answered. The life cost list. Close: invert the opening scene.

### PastTense01 — Why Humans Eat 3 Meals a Day (1.27M, 8.4 min)
- **Story engine:** other: origin-of-a-habit chronology ('who decided this?')
- **Protagonist:** you and your daily meals. **Wants:** to know whether three meals is natural
- **Central question:** Nobody decided 3 meals from biology; it's 'a story'. Where did it come from? (0:20; restated 3:23) **Answered:** 7:39 (91% of runtime)
- **Stakes:** Low/personal: whether your routine is biology or habit (and eating late is worse).
- **Obstacle / antagonist:** A wrong belief (it's natural) plus cultural bias and commerce.
- **Beat chain** (11/16 BUT/THEREFORE/SO, 5 AND):
  - [0:00] **AND**: You ate breakfast, lunch, dinner and never questioned it.
  - [0:10] **BUT**: No biology decided it: three meals is a story.
  - [0:28] **SO**: 23,000 years ago at a lakeside camp: people ate whenever.
  - [1:11] **BUT**: Agriculture brings reliable food.
  - [1:36] **BUT**: Still no three meals: Egypt ate two.
  - [2:01] **AND**: Greeks ate three-ish, loosely.
  - [2:12] **BUT**: The super-organized Romans feared more than one meal as gluttony.
  - [2:52] **AND**: European settlers called Native fasting 'uncivilized', and that bias later spread three meals.
  - [3:23] **SO**: Where exactly from? The Royal Navy's ship routine.
  - [3:54] **BUT**: What locked it in: factory clocks; 'not a discovery, a solution'.
  - [4:36] **AND**: Breakfast vs mass; dinner migrates to evening with lamps.
  - [5:27] **AND**: A cereal entrepreneur sells breakfast as most important: commerce, not science.
  - [5:56] **BUT**: Does biology want it? Circadian timing matters more than count.
  - [7:09] **BUT**: Biology isn't everything: shared meals bond us.
  - [7:39] **SO**: Recap as a 'because...because...' chain.
  - [8:10] **THEREFORE**: Tonight you'll sit for dinner, and now you'll know why.
- **Open loops** (5; median gap between new loops 91.5 s):
  - 0:20 → 7:39: Where did the 3-meal story come from?
  - 2:22 → 2:32: Did organized Rome have a schedule?
  - 3:23 → 3:33: Who formalized 3 meals?
  - 5:27 → 5:37: Who cemented breakfast?
  - 5:56 → 6:59: Does your biology want 3 meals?
- **Turns:** 0:10 it's not biology, it's a story; 2:22 Rome feared multiple meals; 4:25 a solution, not a discovery; 5:37 commerce, not science
- **Ending:** Callback to the opening ('tonight you'll sit for dinner') with closure: now you know why. Calm, no sting.
- **Where facts sit:** Q: did the Romans eat 3 meals? A: a food historian on Roman fear of gluttony and one main meal. / Q: why does breakfast matter so much today? A: cereal marketing in the 1920s-30s.
- **Where jokes sit:** Near zero. Interest comes from 'you might expect X; they did not' reversals.
- **Transplant template:** You [daily habit] and never questioned it. BUT nobody decided it from [biology]; it's a story. Go back [N] years: [no habit]. [Big change] still didn't create it. Culture A did [variant], culture B [variant], the culture you'd expect to invent it [rejected it]. SO where exactly did it come from? [Institution] -> [industrial force] locked it; 'not a discovery, a solution'. AND [commerce] cemented it. BUT does your body want it? [Science: what actually matters]. BUT [human/social layer]. Recap as a because-chain. Close: next time you [habit], you'll know why.

### PastTense01 — The Rarest Human Possible (1.18M, 6.1 min)
- **Story engine:** other: build-a-character multiplier (running odds counter)
- **Protagonist:** a dream woman (later revealed to be the 'rarest human'), and you the dreamer. **Wants:** you want to know if she could exist
- **Central question:** Does a person like her exist? Then: what would the rarest possible human look like? (0:35-0:38) **Answered:** 5:28 (89% of runtime)
- **Stakes:** Light: the romance/fantasy, then your own uniqueness.
- **Obstacle / antagonist:** Probability itself.
- **Beat chain** (7/13 BUT/THEREFORE/SO, 6 AND):
  - [0:00] **AND**: You meet a striking woman in a park and fall in love.
  - [0:20] **BUT**: The alarm rings; it was a dream.
  - [0:30] **SO**: Does she exist? Yes; bigger question: what is the rarest possible person?
  - [0:47] **THEREFORE**: Trait 1: a tiny ethnic group gives 1 in 16 million.
  - [1:42] **AND**: Albinism: 1 in 320 billion.
  - [2:20] **AND**: Complete heterochromia.
  - [2:50] **AND**: Left-handed: 1 in 5.33 quadrillion.
  - [3:35] **AND**: Tetrachromacy.
  - [4:25] **AND**: Hyperthymesia.
  - [5:15] **SO**: Recap the build: it's the woman from the dream.
  - [5:28] **THEREFORE**: 1 in 6.83 septillion, more than the stars in the universe.
  - [5:48] **BUT**: And this isn't even the rarest possible.
  - [5:56] **SO**: You're unique too.
- **Open loops** (3; median gap between new loops 6.0 s):
  - 0:35 → 0:37: Does she exist?
  - 0:38 → 5:28: What would the rarest person look like?
  - 0:47 → 5:28: How small do the odds get? (counter after every trait)
- **Turns:** 0:20 it was a dream; 5:20 the built person is the dream woman
- **Ending:** Callback reveal (the stats person = the dream woman) and a compliment to the viewer.
- **Where facts sit:** Q: how rare is she? A: each trait is a probability multiplied into a running total. / Q: how big is that number? A: compared to stars in the universe and grains of sand.
- **Where jokes sit:** 1-2 light moments (dream fake-out, sign-off pun). The running counter is the hook.
- **Transplant template:** Second-person fantasy scene with a striking [person]. Fake-out: it was a dream. Question: could they exist? Yes; bigger question: what's the most [extreme] possible? Add trait 1 -> odds. Trait 2 -> new odds ... (update the counter every 40-50 s). Recap: it's the person from the dream. Final number vs a cosmic comparison. 'Not even the max.' Close: so are you.

### PastTense01 — Did Ancient Humans get Cancer? (318K, 6.3 min)
- **Story engine:** mystery (myth-bust: 'it's a modern disease')
- **Protagonist:** humanity vs cancer (cancer as antagonist). **Wants:** to understand, and beat, an old enemy
- **Central question:** Most think cancer is modern; is it? (0:30) Answered at once (0:51). The working question: did they get it less, and why? (3:34) **Answered:** 0:51 (13% of runtime)
- **Stakes:** Lives; how we fight cancer.
- **Obstacle / antagonist:** Cancer itself plus a preservation bias in the evidence.
- **Beat chain** (10/13 BUT/THEREFORE/SO, 3 AND):
  - [0:00] **AND**: Cancer is brutal and steals people.
  - [0:25] **BUT**: It's been here since the beginning.
  - [0:30] **BUT**: Most think it's modern.
  - [0:41] **THEREFORE**: A 1.7-million-year-old ancestor's foot bone with bone cancer.
  - [1:11] **BUT**: Bones show only a fraction: soft tissue doesn't fossilize.
  - [1:42] **SO**: Mummies: CT scans find tumours.
  - [2:02] **AND**: Writings: an Egyptian papyrus ('no treatment'); Hippocrates names it 'crab'.
  - [2:54] **SO**: Why so ancient? Cancer is a copying error built into life.
  - [3:34] **SO**: Did they get it less? Probably, but because they died young.
  - [4:05] **AND**: Different risks cut both ways (smoke, parasites, sun).
  - [4:36] **SO**: Why is it everywhere today? Longevity, detection, lifestyle.
  - [5:17] **THEREFORE**: Ancient-ness helps science (elephants' extra tumour-suppressor genes).
  - [5:58] **SO**: Rhyming recap image; for the first time we can fight back.
- **Open loops** (4; median gap between new loops 62 s):
  - 0:30 → 0:51: Is cancer modern?
  - 1:11 → 1:22: Why so few fossil cancers?
  - 3:34 → 3:45: Did they get it less?
  - 4:36 → 4:47: Why does it seem everywhere now?
- **Turns:** 0:25 it's ancient; 3:45 'yes, but not for the reasons people think'
- **Ending:** A rhythmic recap image (a bone, a tumour, before language, before fire) and a note of hope.
- **Where facts sit:** Q: is cancer modern? A: the 1.7-million-year-old tumour. / Q: why less then? A: average lifespan of 25-35 vs cancer's 50+ window.
- **Where jokes sit:** None. The antagonist framing gives it energy.
- **Transplant template:** [Antagonist] is brutal (personify it). BUT it's ancient. Most think [modern]. Proof: [oldest specimen]. BUT the evidence is biased (why we see so little). Better sources: [mummies], [writings + name origin]. Why so old? [Mechanism]. Did they have it less? Yes, BUT for a surprising reason. Why it seems everywhere today. How the deep past helps now. Close: rhythmic recap image + hope.

### PastTense01 — Does Human Food Taste Good to Animals? (288K, 6.5 min)
- **Story engine:** other: comparative species tour answering one question
- **Protagonist:** animals (your dog as anchor). **Wants:** food
- **Central question:** Animals crave our food, but does it actually taste good to them? (0:08) **Answered:** 5:37 (87% of runtime)
- **Stakes:** Low; curiosity (plus wildlife health effects).
- **Obstacle / antagonist:** Evolution has rewired taste differently per species.
- **Beat chain** (10/16 BUT/THEREFORE/SO, 6 AND):
  - [0:00] **AND**: Your dog ignores a full bowl to stare at your burger; bears raid bins.
  - [0:08] **BUT**: Attraction isn't taste.
  - [0:18] **SO**: The taste machinery is shared and ancient.
  - [0:40] **AND**: Dogs are close to us, and smell matters most.
  - [1:01] **BUT**: Cats can't taste sugar at all (a broken gene).
  - [1:32] **SO**: Taste exists to flag useful chemicals; evolution drops what isn't needed.
  - [2:03] **AND**: Pandas lost umami.
  - [2:23] **AND**: Hummingbirds rebuilt sweet taste from a savory receptor.
  - [2:54] **AND**: Catfish taste with skin; flies with legs.
  - [3:14] **AND**: Dolphins barely taste.
  - [3:35] **THEREFORE**: Humans enter: dogs evolved starch genes beside us.
  - [4:06] **BUT**: Dogs still pick the meat first.
  - [4:26] **SO**: Why human food is irresistible: dense, predictable calories.
  - [5:17] **THEREFORE**: It changes wildlife: heavier raccoons, rerouted bears.
  - [5:37] **SO**: Answer: not universally better tasting.
  - [6:07] **THEREFORE**: Callback: your dog isn't judging your cooking.
- **Open loops** (3; median gap between new loops 129.0 s):
  - 0:08 → 5:37: Does our food taste good to them?
  - 4:06 → 4:16: Did domestication erase dog preferences?
  - 4:26 → 4:36: Then why is it irresistible?
- **Turns:** 1:01 cats can't taste sweet; 2:23 hummingbirds repurposed a receptor
- **Ending:** Callback to the opening dog and burger, with a gentle reframe.
- **Where facts sit:** Q: can a cat enjoy ice cream? A: its sweet gene is broken, so it's fat and smell. / Q: do dogs prefer bread or meat? A: the garbage-container experiment.
- **Where jokes sit:** Near zero.
- **Transplant template:** [Familiar animal] does [funny behaviour] around [our thing]. BUT [behaviour] doesn't prove [assumed reason]. The shared basics. Tour: the closest relative -> the one that breaks the rule -> the reverse case -> the strangest hack -> the extreme. Then humans enter the story. Why it still looks irresistible. Answer. Callback to the opening animal.

### PastTense01 — Rarest Human Traits (261K, 8.1 min)
- **Story engine:** other: head-to-toe listicle ('rare, BUT rarer is...')
- **Protagonist:** 'the most average guy alive', then his inverse. **Wants:** none stated
- **Central question:** What are the rarest traits a person can have? (0:20) Answered piece by piece; no single payoff (transcript cut at 'joints'). **Answered:** never inside the video
- **Stakes:** None.
- **Obstacle / antagonist:** None; pure catalogue.
- **Beat chain** (2/12 BUT/THEREFORE/SO, 10 AND):
  - [0:00] **AND**: The most average human: hair, eyes, height, blood type.
  - [0:20] **BUT**: What about the complete opposite?
  - [0:25] **SO**: Go top to bottom.
  - [0:30] **AND**: Hair: red, BUT rarer is uncombable hair, rarer still no hair.
  - [1:20] **AND**: Eyes: green -> heterochromia -> red eyes.
  - [1:51] **AND**: Ears: elf ears -> no ears.
  - [2:11] **AND**: Nose, cheeks, tongue, teeth, lips.
  - [3:43] **AND**: Organs: mirrored -> scattered.
  - [4:24] **AND**: Blood: AB- -> 'golden blood' (under 50 people).
  - [4:54] **AND**: Skin, arms (extra limb), hands.
  - [6:37] **AND**: Handedness: ambidexterity.
  - [7:18] **AND**: Nails, joints (cut).
- **Open loops** (4; median gap between new loops 50 s):
  - 0:20 → left open: What are the rarest traits?
  - 0:30 → 1:00: Rarer than red hair?
  - 1:20 → 1:41: Rarer than green eyes?
  - 4:24 → 4:34: The rarest blood?
- **Turns:** 0:20 flip from average to extreme
- **Ending:** Not available (transcript cut). The structure gives no climax; the body list just runs out.
- **Where facts sit:** Q: rarest blood? A: Rh-null, under 50 known people. / Q: rarer than polydactyly? A: ectrodactyly, about 1 in 90,000.
- **Where jokes sit:** Rare asides ('what if you could look like an elf?').
- **Transplant template:** Meet the average [X]. Flip: what about the extreme opposite? Walk [a spatial order]; each stop: 'common-rare A, BUT rarer is B' + one number. (Weak: no protagonist, no stakes, no ending.)

### PastTense01 — What if you have the Rarest Diseases? (112K, 7.8 min)
- **Story engine:** what-if escalation (trade-offer dilemma)
- **Protagonist:** you. **Wants:** $1 billion
- **Central question:** Would you take $1B in exchange for having the rarest diseases for a year? (0:00, handed back to the viewer at 7:42) **Answered:** never inside the video
- **Stakes:** Your body for a year vs a billion dollars.
- **Obstacle / antagonist:** The diseases, and, in the final act, how they combine.
- **Beat chain** (4/11 BUT/THEREFORE/SO, 7 AND):
  - [0:00] **AND**: Trade offer: $1B, plus the rarest diseases for a year.
  - [0:10] **SO**: Disease 1: allergic to water, including your own sweat and tears.
  - [1:12] **AND**: Your body slowly turns to bone (FOP).
  - [2:04] **AND**: Kuru, the 'laughing sickness'.
  - [3:05] **AND**: Fatal insomnia.
  - [3:56] **AND**: Progeria.
  - [4:56] **AND**: Alström syndrome.
  - [5:39] **AND**: RPID (maybe one case ever).
  - [6:20] **BUT**: Combined, they interact: sweat triggers the allergy, falls trigger bone growth.
  - [7:21] **THEREFORE**: Even treating you is dangerous.
  - [7:42] **SO**: Would you still take the deal?
- **Open loops** (1; median gap between new loops n/a s):
  - 0:00 → left open: Would you take the deal?
- **Turns:** 6:20 the combination act: diseases compound
- **Ending:** Hands the central question back to the viewer (comment bait).
- **Where facts sit:** Q: how can you be allergic to water? A: water isn't a protein, so it's probably something in the skin. / Q: what does progeria do? A: aging at about 7x the normal rate.
- **Where jokes sit:** Dark premise humour only.
- **Transplant template:** Trade offer: [prize] for [ordeal list]. Item 1..N, each lived through 'you' (a day-in-your-life symptom). BUT the final act: they COMBINE [A worsens B worsens C]. Even rescue is dangerous. Back to you: deal or no deal? (Strong final act; weak AND-chain middle.)

### PastTense01 — Why Humans Prefer Their Food Hot? (27K, 5.1 min)
- **Story engine:** mystery (why-question explainer)
- **Protagonist:** you and a cold pizza. **Wants:** the food to taste right
- **Central question:** Same calories, yet cold tastes worse; why do we prefer hot food? (0:30) **Answered:** 4:54 (97% of runtime)
- **Stakes:** Trivial.
- **Obstacle / antagonist:** Your senses and expectations.
- **Beat chain** (7/11 BUT/THEREFORE/SO, 4 AND):
  - [0:00] **AND**: Pizza arrives late and cold.
  - [0:15] **SO**: Microwave it, and the same food tastes better.
  - [0:30] **SO**: Why? Your body doesn't need warmth.
  - [0:37] **THEREFORE**: Flavour is mostly smell, and heat releases aroma.
  - [1:31] **AND**: Temperature nerves (warm cola, cold broth).
  - [1:51] **AND**: Texture: cheese, fat, soggy fries.
  - [2:32] **BUT**: That's not why we got attached: fire and cooking made food safe and rich.
  - [3:12] **THEREFORE**: Thought experiment: two groups; warmth becomes a signal for safe calories.
  - [3:43] **AND**: Culture reinforces it.
  - [4:14] **SO**: Back to the pizza: it fails your brain's prediction.
  - [4:54] **THEREFORE**: We prefer food in the form we expect.
- **Open loops** (2; median gap between new loops 122 s):
  - 0:30 → 4:54: Why do we prefer hot?
  - 2:32 → 2:42: Why did we get attached in the first place?
- **Turns:** 2:32 the senses aren't the root cause
- **Ending:** Callback to the pizza with an abstract answer (prediction). No sting.
- **Where facts sit:** Q: why does cold food taste flat? A: heat pushes aroma molecules into your nose. / Q: why would evolution care? A: the cooking-safety thought experiment.
- **Where jokes sit:** None.
- **Transplant template:** Everyday letdown with [object]. Fix it -> better. Why? Proximate causes 1-3. BUT that's not the root: [deep-time cause] (two-group thought experiment). Culture layer. Back to [object]: the real answer is [expectation]. (Low stakes = the lowest-viewed.)

### PastTense01 — Why are Humans Scared of Spiders (21K, 5.0 min)
- **Story engine:** mystery (why-question explainer)
- **Protagonist:** you vs a spider. **Wants:** safety
- **Central question:** Why does a harmless creature trigger one of our strongest fears? (0:15) **Answered:** 2:23 (48% of runtime)
- **Stakes:** Low; the spider's life.
- **Obstacle / antagonist:** Your inherited wiring.
- **Beat chain** (5/10 BUT/THEREFORE/SO, 5 AND):
  - [0:00] **AND**: A spider skitters; your heart pounds before you think.
  - [0:10] **BUT**: It's probably harmless.
  - [0:30] **AND**: The numbers: a third of women are afraid; few species are dangerous.
  - [1:01] **SO**: The amygdala fires before thought.
  - [1:42] **THEREFORE**: On the savanna, venomous spiders made the fear hardwired.
  - [2:33] **AND**: Six-month-old babies' pupils dilate at spiders.
  - [3:14] **AND**: Adults spot even distorted spiders fastest.
  - [3:55] **AND**: Disgust stacks on fear.
  - [4:36] **SO**: You're not irrational, but the world changed.
  - [4:56] **SO**: Don't squash them.
- **Open loops** (2; median gap between new loops 76 s):
  - 0:15 → 2:23: Why the fear?
  - 1:31 → 1:42: Why spiders specifically?
- **Turns:** 0:10 it's harmless
- **Ending:** Reassurance plus a request (don't squash them).
- **Where facts sit:** Q: is the fear learned? A: the infant pupil study (about 5x dilation). / Q: is there a built-in template? A: the visual search test.
- **Where jokes sit:** None.
- **Transplant template:** [Trigger] causes [reaction] before thought. BUT [it's harmless]. Numbers. Mechanism. Evolutionary cause (answered by the midpoint). Then a stack of AND evidence. Close: not irrational, but outdated. (Answer at 48% = the loop is spent early; the lowest-viewed.)
---

## Across the group

### Engine counts
| Engine | Count | Videos (views) |
|---|---|---|
| Mystery (why / what really happened) | 6 | Night 8.0M, Baby 1.8M, Slotow 341K, Cancer 318K, Hot food 27K, Spiders 21K |
| Chronology / origin ("go back N years") | 2 | 3 Meals 1.27M, Eat 894K |
| Real-person discovery (experiment chronicle) | 1 (+Slotow as hybrid) | Calhoun 5.0M |
| Build-a-character / running counter | 1 | Rarest Human 1.18M |
| Versus (case for / case against) | 1 | Aliens 829K |
| Mission / obstacle ladder | 1 | Titanic 728K |
| Survival / countdown clock | 1 | After Death 583K |
| Day-in-the-life clock walk | 1 | All Day 446K |
| Species tour | 1 | Animals 288K |
| Myth-bust self-help | 1 | Spotlight 150K |
| What-if escalation (dilemma) | 1 | Rarest Diseases 112K |
| Head-to-toe listicle | 1 | Rarest Traits 261K |

- **Top 5 (≥1M):** 2 mystery, 1 real-person discovery, 1 chronology, 1 counter. A mystery appears at the top and also at the bottom. The engine is not what separates hits from flops. What separates them is **whether the loop stays shut**: *Night* and *Baby* hold the answer to 89–92%, while *Spiders* gives it away at 48%.
- **Zenn varies its engines.** It uses 8 different engines across 10 videos, and none of them is a plain list. **PastTense** leans on lists: 4 of its 8 videos are tours or catalogues.

### BUT/THEREFORE vs AND
| Slice | Beats | BUT | THEREFORE/SO | AND |
|---|---|---|---|---|
| All 18 | 263 | 28% | 40% | 32% |
| Top 5 (≥1M) | 74 | 34% | 42% | **24%** |
| Mid 9 (200K–1M) | 142 | 30% | 38% | 32% |
| Bottom 4 (<200K) | 47 | **13%** | 45% | **43%** |
| Zenn (10) | 161 | 34% | 43% | 23% |
| PastTense (8) | 102 | 19% | 36% | 45% |

- The single best predictor is **BUT share**: 34% in the top 5 and 13% in the bottom 4. The bottom group still has plenty of THEREFORE/SO. It explains causes fine, but nothing goes *wrong*, so nothing reverses.
- Per video, the share of BUT/THEREFORE runs: *Night* 87%, *Calhoun* 88%, *Slotow* 86%, *Titanic* 82%, *After Death* 81%, and so on down to *Rarest Diseases* 36% and *Rarest Traits* 17%.
- **The exception is *Rarest Human* (1.18M, only 54% causal).** It is an AND-list, but every AND **updates one running number** (1 in 16M → 1 in 320B → 1 in 5.33 quadrillion → 1 in 6.83 septillion), and the end reveals the number belongs to the dream woman. The counter supplies the escalation that the links don't. *Rarest Traits* uses the same kind of list with no counter: 17% causal and 261K views.

### Loop cadence
- **A new open question every ~60 s** (median gap between newly opened loops is 62 s across all videos). The top 5 run at 49 s and the bottom 4 at 76 s. The 49 s figure is pulled down by *Rarest Human*, whose two opening questions are 3 s apart. Leave it out and the top 4 still run at 60 s, against 76 s for the bottom 4. *Rarest Human*'s real cadence is its odds counter, which updates about every 45 s. Loop density is 0.91 per minute in the top 5 and 0.46 per minute in the bottom 4.
- **Most small loops close within 10–30 s.** The tease ("but here's what's fascinating", "it gets worse", "or are they?") is followed almost at once by a named study that answers it. Only 2–4 loops per video span more than a minute, and those are the spine.
- **The central question stays open for a median of 89% of runtime.** Every video over 1M sits between 82% and 92%. The three that answer early (*Spotlight* 2%, *Cancer* 13%, *Spiders* 48%) average 163K views.
- Recurring loop phrasings, in paraphrase: "the answer is stranger than you think", "that's only half the story", "here's the part almost nobody quotes", "it gets worse", "settles it, right? Not quite", "waiting for what?". Each one promises a **reversal**, not just more information.

### Recurring skeleton parts (counts across 18)
- **A "you" + modern-object cold open** (switch, fridge, pizza, dog, late entrance, stopped heart): 10/18.
- **The ending calls back the opening object or scene:** 11/18, including 4 of the top 5 (*Night* light switch, *Calhoun* eight mice, *3 Meals* dinner, *Rarest Human* dream woman).
- **A wrong common belief stated in the first 30 s, then denied:** 8/18, including 4 of the top 5 (*Night*, *Calhoun* "a paradise" that ends in extinction, *Baby*, *3 Meals*).
- **A named researcher + year + method as the answer to each mini-question:** every Zenn video (about 2–6 per video). It also appears in both PastTense hits, but in only 1 of its other 6 videos (*Spiders*).
- **A late reversal at 70–81% runtime** (popular myth wrong, "not quite", can't → shouldn't, bad elephants → missing elephants, diseases combine): 7/18.
- **Ending type:** 10 end on a reframe or sting, and that is all 10 Zenn videos: the topic is turned back onto the viewer's life (lost night, "you might be the first who isn't hungry", "we still have a choice"). 6 end on calm closure ("now you'll know why"); these are all PastTense, including both of its hits. 1 hands the question to the viewer (*Rarest Diseases*). 1 has no ending in the transcript (*Rarest Traits*).

### How a 1-minute version compresses the skeleton
The beats that survive are the ones that carry a BUT. In order, about 6 beats at ~10 s each:
1. **"You" + modern object, then BUT** (the reversal of the common belief). *Night:* you flip a switch, BUT for 99.9% of history there was none.
2. **The central question,** said out loud.
3. **One named study as the first answer** (one number only).
4. **"BUT that's only half"**, followed by the stranger second answer. This is the beat that earns the share.
5. **The late reversal** (myth wrong / what we lost), compressed to two lines.
6. **A callback sting** to the opening object.

What gets cut: every AND beat (extra exhibits, extra species, extra eras), the method details, the counterpoint section, the recap. *Calhoun* compresses to: perfect world → all dead → no exit, so roles vanished → the "beautiful ones" → everyone blamed comfort, BUT he said roles → we still have a choice. That is 6 beats, and 5 of them are causal.

### 5 rules a writer can apply tomorrow
1. **Hold the title answer until about 85% of the runtime.** Give partial answers, but never the full one. *Evidence:* all 5 videos over 1M close their central question between 82% and 92%. *Spotlight* (2%), *Cancer* (13%) and *Spiders* (48%) answer early and are 3 of the 6 weakest videos.
2. **Make a third of your links BUT.** Before writing jokes, write the beat list and label every link. If more than a quarter are AND, merge them or turn them into reversals. *Evidence:* BUT share is 34% in the top 5 and 13% in the bottom 4. *Night* and *Calhoun* have just 2 AND beats each.
3. **Every ~50 s, open a question that promises a reversal, then answer it with a named person, year and method within 30 s.** *Evidence:* the median gap between new loops is 49–60 s in the top 5 and 76 s in the bottom 4. Zenn's mini-answers are always "In [year], [job title] [name] did [method] and found [number]" (*Night*: 4 studies; *Baby*: 6).
4. **Plant the myth early and break it twice: once at 0:10–0:30 and once at about 75%.** *Evidence:* *Calhoun* (at 6:37 the paper says roles, not comfort), *Night* (at 6:45 progress turns out to be loss), *Aliens* (at 7:38, "not quite"), *Titanic* (at 7:39, can't becomes shouldn't), *Slotow* (at 8:08, missing elephants, not bad ones). 7/18 videos have the late break, including both mega-hits.
5. **If the material really is a list, attach a counter or a combination act to it, and end on the opening object.** *Evidence:* *Rarest Human* (a running odds counter, then the reveal that it's the dream woman) got 1.18M views. *Rarest Traits* (the same list without a counter or an ending) got 261K. *Rarest Diseases* gets its only BUT from the combination act at 81%. Callback endings appear in 11/18 videos and 4 of the top 5.

### Note for our scripts
Our failure mode (fact → joke → fact → joke, joined by "and also") is the *Rarest Traits* skeleton: 83% AND beats, no protagonist, no stakes, no ending. In this corpus, jokes always sit at the end of a **story beat**, never as a digression. Zenn's funniest video (*All Day*, about 2 per minute) still has a clock structure and a BUT every few beats. The two mega-hits have almost no jokes (0.35–0.7 per minute). Story comes first, and jokes sit on top of it.
