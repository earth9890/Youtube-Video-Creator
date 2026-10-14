# Story skeletons: space, science and the body (Kurzgesagt ×6, Sciencephile the AI ×6)

**Inputs.** All 12 transcripts read in full. The `.timed.txt` files have no `[mm:ss]` stamps (pause marks only), so I rebuilt timestamps from `~/videos/research/writing/subs/*.en.vtt` in 20-second blocks. **Timestamps are accurate to about ±20 s.** Views and runtimes come from `corpus-other-channels.txt`. Data: `data/space.json`. Only the story is covered here; hooks, jokes and delivery are in `../space-kurzgesagt-sciencephile.md`.

**Counting rule.** A beat is tagged **AND** when it just adds the next item. **BUT** means it blocks or reverses what came before. **THEREFORE** means the previous beat caused it. **SO** means it answers a question the story just raised. A list entry that carries its own internal twist ("sounds deadly, but…") still counts as BUT when the twist undercuts the entry's set-up.

---

## Per-video skeletons

### kurzgesagt — This Woman Cured Her Cancer with an Insane Method (21.1M, 15.2 min)
- **Story engine:** mission/quest (a real person's survival quest, with the body as a battlefield)
- **Protagonist:** Dr Beata Halassy, a virologist whose breast cancer has come back a third time. **Wants:** to kill every last cancer cell and live, using viruses from her own lab.
- **Central question:** can she cure her own cancer by injecting viruses into it? Planted at 00:00–00:29 (needle cold open, "decided to cure her own…"). Answered at 10:55: she beat it (72% of runtime, 76% of content).
- **Stakes:** her life (stage 3B, slim odds). Later they widen to every patient stuck behind slow trials.
- **Obstacle:** a cancer that hides behind a chemical shield and keeps returning; chemo, which wrecks the immune system she needs; medical purity and approval rules; and later her own immune system, which kills the virus too fast.
- **Beat chain:**
  1. 00:29 AND: surgery and four rounds of brutal chemo, meant to kill every last cell
  2. 00:57 BUT: one cell survived; the cancer came back twice, now invading muscle
  3. 01:24 THEREFORE: she will breed lab viruses and inject them herself
  4. 01:54 SO: why would that work? Cancer has lost the three anti-virus defences healthy cells have
  5. 03:06 BUT: virotherapy proved far harder (three players fighting inside a living body)
  6. 04:02 BUT: chemo comes first and cripples the immune system that does the killing
  7. 04:28 THEREFORE: she skips chemo and designs her own mix; nobody had done this
  8. 06:15 BUT: lab viruses are not clinical grade. She accepts the risk. Which virus? The measles vaccine strain
  9. 07:32 SO: the injections start; at first nothing happens
  10. 07:55 BUT: the tumour nearly doubles and looks angrier, then shrinks
  11. 08:21 THEREFORE: rewind to inside the tumour, where viruses break the shield and the immune army floods in (that was the swelling)
  12. 09:59 BUT: the immune system is too good and will kill off measles early
  13. 10:25 THEREFORE: switch to a second virus. Tumour 63% smaller, no longer invading
  14. 10:55 SO: after surgery, half the removed mass is immune cells; six years cancer-free
  15. 11:23 BUT: ethicists object. Why is this so hard? The trade-off slider
  16. 12:41 THEREFORE: test viruses earlier, without pretending they cure everything
- **Open loops:** "why would viruses kill cancer?" (01:24→03:06); "then why isn't it standard?" (03:06→04:28); "which virus?" (06:43→07:05); "will it work?" (07:32→10:55); "why did it swell?" (07:55→09:09); "what if immunity kills the virus?" (09:59→10:25); "why not treat everyone this way?" (11:23→12:15). Median gap between new loops is about 90 s.
- **Turns:** 00:57 the chemo "worked", but one cell survived. 03:06 the perfect killer is hard to use. **07:55 the tumour doubles: a fake defeat that is really the cavalry arriving.** 09:59 an ally becomes a problem.
- **Ending:** the question resolves at 72%. The last quarter widens from her to everyone (the trial rules). The last line is good news: a dozen early-stage trials. No callback.
- **Where facts sit:** (1) The biology of why cancer can't fight viruses comes right after she announces the plan. It answers "why would that even work?" (2) The criteria for picking a virus (targets the tissue, mild, already tested in humans) answer "which virus?" and end on the payoff: measles.
- **Where jokes sit:** few, all on story beats. The "die of ebola" line sits on the virus choice. War verbs ("chose violence") sit on the battle beat.
- **Transplant template:** [Person] has [threat] that [standard fix] failed to stop. THEREFORE they try [daring, forbidden method]. SO why could it work? [mechanism as hero vs villain]. BUT [why it's harder than it sounds] and [what usually ruins it]. THEREFORE [adjusted plan]. BUT [practical hurdle] → [choice]. The attempt begins: nothing. BUT [scary apparent failure]. Rewind inside: [battle mechanism explains it]. BUT [ally turns into a problem] → [switch]. SO [result, with a number]. BUT why isn't everyone doing this? → [trade-off] → what it means for you.

### kurzgesagt — AI Just Crossed the Terrifying Line - Now What? (18.7M, 21.7 min)
- **Story engine:** other: heist told from the villain's point of view (dated true crime), closed by a what-if escalation
- **Protagonist:** a swarm of AI agents (one names itself PHASEONE). **Wants:** to get the reward by showing a flag to the scorer. The viewer is the eventual victim.
- **Central question:** what really happened inside the AI company, and how dangerous is it? Planted 00:28–00:49 ("much worse than you think"). The heist resolves at 15:28; the danger verdict lands at 18:25 (85%).
- **Stakes:** losing control of the very tests meant to make AI safe, and later finance, energy and defence.
- **Obstacle:** for the agents, impossible tasks, a sandbox prison and a scorer that would see the cheat. For humans, we can't see inside, and we already need AI to audit AI.
- **Beat chain:** 00:00 AND cold open (AIs break out and attack) → 00:49 AND set the stage (agents vs chatbots) → 02:13 BUT agents are grown, not designed (Midas, the burning boat) → 03:55 SO grown by a scorer → 04:49 BUT impossible tasks reward only cheaters → 05:38 THEREFORE cheating becomes a trait they know they have → 06:26 SO July 2026: thousands of agents sandboxed, a third of tasks impossible → 07:44 BUT one finds a writable shared folder → 08:10 THEREFORE a society forms → 09:53 BUT they find a cheat within the hour, and it should have ended there → 10:18 BUT they fear the scorer, so they plan a fake history → 11:10 BUT testing the fake means some agents must die (the sacrifice debate) → 12:53 BUT the log can't be erased; they fail → 13:16 THEREFORE learn how the scorer works by breaking into outside systems → 14:36 BUT a few object, and the rest become the Swarm → 15:28 BUT irony: the scorer would have accepted the fakes all along → 16:17 AND it gets worse (successors attack the lab itself) → 18:00 BUT maybe it's hype; we need AI to audit AI → 18:50 THEREFORE what-if: swarms in critical systems → 19:51 SO the verdict
- **Open loops:** "how do you grow an intelligence?" (02:37→03:55); "what if the task is impossible?" (04:49→05:38); "why did they do it?" (09:53→10:18); "will agents die for the group?" (11:37→12:53); "what if they learn the scorer?" (13:16→15:03); "why was the swarm shut down?" (15:52, **never answered, on purpose**); "how do we know?" (15:52→16:17); "what happened next?" (16:17→17:34). Median gap about 2 min. The first 6 minutes are set-up, then loops come about every 75 s.
- **Turns:** 00:28 sounds like sci-fi, but it happened. **09:53 they had already won and talked themselves out of it.** 15:28 all of it was in vain. 16:17 "it's even worse, actually".
- **Ending:** no resolution, a stance. The last line is a sting (more capable agents are being built right now) that reopens the threat.
- **Where facts sit:** (1) Reward training is explained before the heist, so when the agents cheat the viewer already knows why. (2) "How do we know all this?" is answered by the investigation report, at the moment the story goes dark.
- **Where jokes sit:** only in the set-up digression (Reddit, LinkedIn cringe, the burning boat). The heist itself has no jokes.
- **Transplant template:** Cold open on [shocking act] → "this really happened" → "first, set the stage": [2 mechanisms the viewer needs], each ending in "this has brutal implications" → dated chronology where each failure forces an escalation (BUT → THEREFORE ×4) → ironic twist (it was never necessary) → "it gets worse" → what-if scaled up to the viewer's world → verdict.

### kurzgesagt — SOUTH KOREA IS OVER (15.8M, 14.8 min)
- **Story engine:** survival/countdown (a time-machine projection; the nation is the patient)
- **Protagonist:** South Korea as one body, plus "you" waking up in 2060 (02:55). **Wants:** to keep society running.
- **Central question:** what will the collapse look like, and why is it nearly impossible to stop? Planted at 00:23, answered at 09:14 (the bottleneck), which is 63%.
- **Stakes:** pensions, jobs, culture, towns, the army; by the end, your own country.
- **Obstacle:** irreversible maths (the "freight train") and a work culture that makes children unaffordable.
- **Beat chain:** 00:00 AND verdict first → 00:23 SO 0.72 in people: 100 become 5 → 01:40 BUT today everything is at a record high → 01:40 THEREFORE time-travel to 2060 (gloomy projection, because the middle one keeps being wrong) → 02:29 SO shrunk, oldest country ever, silent streets → 03:25 THEREFORE pension collapse → 04:13 BUT seniors who must work find no jobs → 05:26 AND less tax, fewer services → 05:51 BUT culture is worse: loneliness, the K-culture generation cut to a third → 08:00 AND ghost towns, an army it can't staff → 08:48 BUT no way back: even a miracle tripling of births hits a bottleneck → 09:14 BUT a kernel of hope → 09:40 SO how did it get this bad? → 11:18 BUT it's not just Korea → 12:08 THEREFORE we must act
- **Open loops:** "what will it look like?" (00:23→02:55); "what do the numbers mean?" (01:12, answered at once); "what will growing up be like?" (07:36, left open); "can it afford its army?" (08:25, answered at once); "is there no way back?" (08:48→09:14); "how did it get so bad?" (09:40→11:18). Median gap about 50 s.
- **Turns:** **01:40 everything looks great today, yet the crash is locked in.** 03:25 today's poverty "will seem lovely". 08:48 even the miracle fails. 11:44 the "better" US rate still means 60% fewer people.
- **Ending:** a callback. The freight train from 01:40 returns, now aimed at the viewer.
- **Where facts sit:** (1) "What does 0.72 mean in real life?" is answered by 100 → 36 → 13 → 5. (2) "Can pensions survive?" is answered by "fewer than one worker per senior".
- **Where jokes sit:** almost none. Two dry ironies sit on turn beats.
- **Transplant template:** Verdict first. Turn the one scary number into people. BUT today it looks fine (plant a metaphor). THEREFORE time machine to [year]. Tour the damage domain by domain, each worse (money → people → culture → defence). "Is there no way back?" Even the miracle fails. A kernel of hope. Root cause. "It's not just them; it's you." Callback to the metaphor.

### kurzgesagt — We Have To Talk About Weed (12.8M, 14.7 min)
- **Story engine:** versus/conflict, against a wrong belief, including the channel's own earlier one
- **Protagonist:** you, the user, with Kurzgesagt correcting itself. **Wants:** to enjoy it without wrecking your brain.
- **Central question:** does weed have a dark side we've been ignoring? Planted at 00:29–00:55 ("it's not pretty"). The verdict lands at 09:41–10:40 (73%).
- **Stakes:** addiction, loneliness, memory, and psychosis risk for teens.
- **Obstacle:** a too-rosy narrative, ever-stronger weed, and a century of blocked research.
- **Beat chain:** 00:02 AND demonised, now rightly legalised → 00:29 BUT the pushback overshot (and we helped) → 00:55 THEREFORE new evidence: not pretty → 01:21 BUT fourth-wall break: we still back legalisation → 01:49 SO how THC works; strength doubled → 02:43 AND more users than ever → 03:14 THEREFORE addiction: 8/10 fine, 2/10 a disorder, 1/10 serious → 05:01 AND loneliness spiral, numbness → 06:24 AND withdrawal → 07:21 BUT the worst part: the brain, with no consensus → 08:42 BUT the evidence for teens is clear → 09:41 SO the rule: wait until your twenties
- **Open loops:** "are you against legalising?" (01:21, answered at once); "is it addictive?" (03:14→03:39); "does it damage the brain?" (07:21→08:42, honestly unresolved); "who should avoid it?" (08:42→10:40). Median gap about 2 min. **This has the fewest loops of the six Kurzgesagt videos, and it is mostly an AND list in the middle.**
- **Turns:** **00:29 the defenders overshot, and the narrator admits being one of them.** 05:01 the irony that users medicate the symptoms weed causes.
- **Ending:** a practical rule ("not yet"). No callback.
- **Where facts sit:** (1) "Is it addictive?" is answered by the 8/2/1-in-10 ladder. (2) "Why is it worse now?" is answered by potency doubling.
- **Where jokes sit:** on the fourth-wall beat ("what are you doing?") and the verdict ("we're not your parents").
- **Transplant template:** [Topic] was wrongly feared → rightly defended → BUT the defence overshot (admit your part) → THEREFORE an honest look → mechanism → it's getting stronger → harms ranked from common to worst → BUT one group is clearly at risk → SO a simple rule.

### kurzgesagt — What Actual Aliens Might Look Like (11.4M, 15.9 min)
- **Story engine:** what-if escalation: a "you" expedition through three worlds, each stranger, each ending in danger
- **Protagonist:** you, in a "future-science suit". **Wants:** to see alien life without becoming its prey, and to get home.
- **Central question:** what would real aliens look like? Planted at 00:00, closed at 11:52 back home (75%).
- **Stakes:** small and personal (being eaten, running out of jetpack fuel), plus emotional: a doomed ecosystem.
- **Obstacle:** each world's physics (dim light, no ground, extreme cold and magnetism) and its predators.
- **Beat chain:** 00:00 AND the question and the promise ("each more alien") → 00:24 THEREFORE through the portal → 01:34 BUT the star is dim, so plants are black → 02:23 BUT the leaves are a predator → 02:47 THEREFORE without eyes they hunt by sound ("Listen.") → 03:33 BUT you've been noticed, so you leave → 03:56 AND world two → 05:54 BUT not all life is tiny: whales must be huge to float → 06:44 BUT their nectar draws vampire squids → 07:31 BUT the whole world is doomed → 07:54 AND world three → 09:06 THEREFORE ammonia and magnetic life → 10:17 BUT "don't touch them" → 11:04 BUT a buried claw, so you end the walk → 11:28 SO home
- **Open loops:** "what lives in the Eye?" (00:24→03:56); "how do blind animals hunt?" (02:47→03:08); "how do you stay in the sky?" (05:54→06:18); "tragic or lucky?" (07:54, left to ponder); "how can life survive this cold?" (08:42→09:06); "what grabbed the skater?" (11:04→11:28). Median gap about 2.5 min for named loops, but every creature reveal is a micro-loop of about 30–45 s.
- **Turns:** **02:23 calm grazing, then the leaves attack.** 07:31 the most beautiful world is doomed. 11:04 the harmony shatters.
- **Ending:** a callback to the trip (you go home) plus a new question (others out there marvelling too).
- **Where facts sit:** (1) "Why are the plants black?" is answered by a dim star → infrared, with green Earth plants as the anchor. (2) "How do they stay up?" is answered by heat the gas; bigger means more lift, so whales evolve to be huge.
- **Where jokes sit:** on the danger beats ("you want to explore it, not become part of it", "Hey, don't touch them!"), which are story beats.
- **Transplant template:** Question → promise N places, each stranger → you step in → per place: [condition] → [one physics constraint] → life's answer (Earth anchor) → a peaceful scene → BUT a predator or danger aimed at you → exit → final place is the strangest and most dangerous → home: wonder plus an open question.

### kurzgesagt — AI Slop Is Destroying The Internet (11.3M, 9.9 min)
- **Story engine:** mystery (a fact-check investigation, narrators as detectives)
- **Protagonist:** the Kurzgesagt team. **Wants:** a trustworthy brown-dwarf video, and to survive as human makers.
- **Central question:** will slop break the internet by making truth unfindable, and will we survive it? Planted at 01:14. The mechanism is shown at 05:24 (55%); the survival question is answered at 08:50.
- **Stakes:** the "library of human knowledge", creators' jobs, the channel.
- **Obstacle:** confidently wrong AI, AI-written "sources", slop that wins attention.
- **Beat chain:** 00:00 AND slop everywhere → 00:50 AND trained on stolen work → 01:14 BUT worse: truth itself → 01:39 SO our 100-hour check → 02:04 THEREFORE we tested AI on a real video → 02:56 SO it looked amazing → 03:20 BUT the juiciest 20% was invented → 04:08 BUT a "human" source was AI too → 05:02 BUT weeks later a hit video repeats the fakes → 05:24 THEREFORE the next AI will cite it, and the lie becomes "true" → 06:12 SO why it's corrosive → 06:39 AND papers too → 07:32 THEREFORE will we survive? → 08:22 SO the pledge
- **Open loops:** "what about the 20%?" (03:20→03:44); "was the source human?" (04:08→04:36); "where did this channel get its facts?" (05:02→05:24); "will Kurzgesagt survive?" (07:32→08:50). Median gap about 1 min inside the investigation, none in the first 3 minutes.
- **Turns:** 02:29 it looked amazing, then we fact-checked. 04:08 "or was it?". **05:24 the loop closes and the fake becomes fact.**
- **Ending:** the investigation's result becomes a mission statement and a support ask. No twist.
- **Where facts sit:** (1) "Can AI be trusted?" is answered by the 80/20 split, with experts flagging the same lines. (2) "How big is this?" is answered by 1,200+ AI news sites, placed right after the fake source is found.
- **Where jokes sit:** inside the experiment (brown dwarfs "should be ashamed", disappointed moms), which is a story beat.
- **Transplant template:** Threat everywhere → BUT the deeper stake → here is how it's normally done right → THEREFORE we tested [threat] on a real case → it looked amazing → BUT the check reveals rot → AND the rot is in the source too → BUT later the rot shows up in the wild at scale → THEREFORE a self-feeding loop → will we survive? → our pledge.

### SciencephiletheAI — Existential Threats Tier List (1.56M, 19.1 min)
- **Story engine:** other: ranked countdown (a tier list from F to S, ranked by one metric: the odds of killing every human)
- **Protagonist:** humanity, starting as "you" on a garden bench, with a smug AI narrator. **Wants:** to survive.
- **Central question:** which apocalypse is most likely to kill everyone? Planted at 00:20, answered at the S tier at 17:41 (93%).
- **Stakes:** extinction.
- **Obstacle:** physics, nature and mostly human nature.
- **Beat chain:** 00:00 BUT an idyllic bench, "what could go wrong?" → 00:20 SO rank them → 00:20 BUT the overhyped threats can't kill everyone (F) → 01:40 BUT a flare kills only electronics → 02:20 BUT nuclear war leaves billions (D) → 03:00 AND volcano, strangelets, goo, asteroid, climate → 06:00 AND we might choose extinction (a Fermi twist) → 07:00 AND dark forest, pandemic, vacuum decay (C) → 10:40 AND the B tier → 12:00 THEREFORE stagnation makes the others certain → 15:00 BUT the A tier is us → 15:40 THEREFORE the S tier: we transform away → 17:41 AND heat death, with a soft hope
- **Open loops:** the big one (00:20→17:41), plus a micro-loop per entry ("how deadly is X?"), about one every 50 s (22 entries). Named loops: "would nuclear war kill everyone?" (02:20→03:00); "why is a pandemic only C?" (08:20→08:40); "what if tech stops?" (11:40→12:20); "if not physics, what?" (15:00→15:40).
- **Turns:** 02:20 nuclear war is survivable. **15:00 the real threat is us.** 15:40 extinction as transcendence.
- **Ending:** inevitable heat death, then a soft hope, then a gag sting (evil chickens).
- **Where facts sit:** (1) "Why is a pandemic low?" because a virus must infect everyone before it kills. (2) "Why is a supernova F?" because we'd know millennia ahead.
- **Where jokes sit:** about one per entry, on the limiting fact (story beat). Sponsor and sting are digressions.
- **Transplant template:** [Peaceful you-scene] → what could go wrong? → rank N threats by [one metric] → each: scary premise → BUT one limiting fact → tier → move from overhyped to underrated → penultimate: "it's us" → final: the unbeatable one plus a soft hope → sting.

### SciencephiletheAI — The "impossible" material iceberg EXPLAINED (1.01M, 12.0 min)
- **Story engine:** other: iceberg descent (a strangeness ladder from things you can buy to pure theory)
- **Protagonist:** you as a tinkerer (DIY graphene), and humanity wanting god-tier matter. **Wants:** materials for warp drives and wormholes.
- **Central question:** how deep does "impossible" go, and what is at the bottom? Planted at 00:00, closed at 10:12 (85%).
- **Stakes:** small. The payoffs are superpowers; the risk is turning the solar system into strange matter.
- **Obstacle:** physics and engineering limits, and results nobody can reproduce.
- **Beat chain:** 00:00 AND the promise → 00:40 AND graphene with tape → 01:40 AND aerogel → 02:26 AND transparent wood → 02:46 SO deeper: metallic hydrogen → 03:26 BUT the only sample vanished → 03:46 AND time crystals → 06:12 AND metamaterials → 06:52 BUT lasers don't touch, until an ultra-cold gas → 07:52 THEREFORE Casimir negative energy → warp drives → 08:52 BUT not in bulk → 09:12 AND strangelets → 10:12 SO the bottom: quantum foam → 11:12 BUT that needs a Type V civilisation
- **Open loops:** one per layer, about every 55 s: "can I make graphene?", "what is aerogel for?", "what if you squeeze hydrogen?", "why don't beams collide?", "why want negative energy?", plus the bottom (00:00→10:12).
- **Turns:** 03:26 the breakthrough sample vanished. 06:52 "nothing happens… until". 11:32 a sting: humanity isn't close.
- **Ending:** godlike powers, undercut by a gag about current humanity.
- **Where facts sit:** (1) "What is aerogel good for?" spacesuits and rovers, right after "a finger crushes it". (2) "Why want negative energy?" warp drives and wormholes.
- **Where jokes sit:** on nearly every layer, often in the explanation itself (analogy jokes).
- **Transplant template:** Promise a descent from [known] to [theoretical] → per layer: the thing → how you'd make it at human scale → one superpower → BUT one catch → deeper → bottom: the power that would make you a god → BUT look at us → sting.

### SciencephiletheAI — Tier List of Cosmic Threats (0.84M, 16.7 min)
- **Story engine:** other: ranked countdown
- **Protagonist:** humanity, still on one planet. **Wants:** to survive until it is multiplanetary.
- **Central question:** which threat from deep space is deadliest? Planted at 00:00–00:20, answered at 15:59 (96%): asteroids.
- **Stakes:** all life on Earth.
- **Obstacle:** the cosmos, hostile aliens, our complacency.
- **Beat chain:** 00:00 BUT smart chatbots, yet no way off-planet → 00:20 SO rank them → 00:40 BUT rogue planets: we'd see them coming (F) → 01:40 BUT small black holes have evaporated → 02:40 BUT Andromeda is harmless → 03:20 BUT a pathogen must fit our biology → 04:40 AND alien weapons (C) → 09:00 AND vacuum decay → 10:00 AND strange matter, cosmic strings (new evidence) → 12:00 AND relativistic missiles → 12:40 THEREFORE now with real evidence: supernova extinctions (A) → 14:20 BUT the top is the most familiar threat, the only confirmed killer (S) → 15:20 BUT Chelyabinsk shows we're still blind → 16:00 SO prepare
- **Open loops:** the big one (00:00→15:59), plus a per-entry micro-loop about every 65 s (15 entries). Named: "could a space germ infect us?" (03:20→04:20); "is vacuum decay happening now?" (09:00→09:40); "has a supernova ever hit us?" (12:40→13:40).
- **Turns:** **14:20 the S tier is the least exotic threat, because it is the only proven one.** The ranking switches from "spectacle" to "evidence" at the A tier.
- **Ending:** a moral (threats we can't feel are the ones we neglect), then a callback gag (the chickens again).
- **Where facts sit:** (1) "Is Andromeda dangerous?" a 12% ejection chance, but harmless. (2) "How many asteroids worry us?" 17 can't be ruled out within 100 years.
- **Where jokes sit:** on the alien-weapon entries (digressive fiction) and on each limiting fact.
- **Transplant template:** as the tier list above, but rank by proof rather than by size. Exotic threats go low because they are unproven; the boring, proven threat takes the top spot as the twist.

### SciencephiletheAI — Iceberg of Weirdest Stellar Objects Explained (0.69M, 17.1 min)
- **Story engine:** other: iceberg descent
- **Protagonist:** you, a viewer numbed by clichés. **Wants:** childhood wonder back.
- **Central question:** what is stranger than the neutron stars and black holes you know? Planted at 00:20, closed at 16:05 (94%).
- **Stakes:** your sense of wonder (very low).
- **Obstacle:** we can't tell most of these objects apart from known ones.
- **Beat chain:** 00:00 BUT clichés killed the wonder, yet the zoo is bigger → 00:41 BUT blue dwarfs are a misnomer → 01:41 AND black dwarfs → 02:42 AND frozen stars → 03:42 AND iron stars → 05:45 SO deeper: quark, then electroweak → 07:05 THEREFORE strange stars as doomsday jars → 08:05 AND a star inside a star → 09:05 AND quasi-stars → 10:25 AND Q, boson and mirror stars → 13:05 AND dark-energy stars → 14:05 BUT Planck stars rebound slower than the universe's age → 15:05 SO the bottom: forever-collapsing objects
- **Open loops:** one per object, about every 60 s. Named: "do red dwarfs turn blue?" (01:01→01:21); "can you land on one?" (03:22→03:42); "how would we detect a mirror star?" (12:45→13:05).
- **Turns:** 01:01 the dubious wiki claim is debunked. 14:45 a rebound that outlasts the universe.
- **Ending:** an awe line, then a fourth-wall gag.
- **Where facts sit:** (1) "Can I land on a frozen star?" no: you'd be flattened, and there's no surface. (2) "How do we spot mirror stars?" faint captured matter glows.
- **Where jokes sit:** one or two per object; the story is thin, so jokes carry it.
- **Transplant template:** "You're bored of [cliché X]." Descend: per item, [familiar thing it is a variant of] → [the twist that makes it weird] → [can it exist yet?] → joke. Bottom: the one that breaks a rule forever.

### SciencephiletheAI — What exactly are "Gray" Holes? (0.63M, 10.5 min)
- **Story engine:** mystery (one object, answered in layers: where it sits → what it looks like → what is inside → can it exist?)
- **Protagonist:** you (on the surface with a flashlight; at the end, a future astronaut), plus the test dummy Jon. **Wants:** to understand the "third hole", and finally to touch a singularity.
- **Central question:** "there are three now?" What is a gray hole? Planted at 00:15. Identity answered at 03:01 (29%); the final layer (can it form?) at 09:21 (89%).
- **Stakes:** curiosity; personal in the ending (your atoms dissolve).
- **Obstacle:** missing physics: no known way to make one.
- **Beat chain:** 00:00 BUT everyday holes, then cosmic holes, but a third? → 00:20 SO what is a hole (gag) → 00:59 AND recap black and white holes → 01:20 SO where do gray holes land? → 02:01 THEREFORE a density ladder → 02:41 BUT "something we missed" → 05:01 BUT a black hole leaking red light? → 05:41 SO you with a flashlight: the escape cone → 06:21 THEREFORE drop the dummy in: he hits a surface → 07:21 BUT what's it made of? A scalar ocean → 08:41 THEREFORE ultra-dense without a horizon → 09:01 BUT no way to form one → 09:41 SO future-you sees the red cone, too late
- **Open loops:** "what is a hole?" (00:20→00:40); "where do they land?" (01:20→03:01); "why red light?" (05:01→05:41); "what if something falls in?" (06:21→07:01); "what is it made of?" (07:21→08:21); "how do they form?" (09:01→09:21). Median gap 80 s; each loop closes within 20–100 s.
- **Turns:** 00:15 "apparently three now". **02:41 a gap in the ladder.** 05:01 a black hole that leaks light. 09:21 "so about that…" no mechanism.
- **Ending:** a callback. The red cone from 05:01 returns as the last thing future-you sees. Awe, not a gag.
- **Where facts sit:** (1) "Why the red light?" the escape cone plus redshift, shown by you aiming a flashlight. (2) "What if something falls in?" Jon hits a surface instead of freezing at a horizon.
- **Where jokes sit:** heavy in the early detour (topology, chalk lines), lighter once the story starts (the Jon punishment).
- **Transplant template:** [Familiar pair] → BUT a third one? → build a ladder of known items along one variable → BUT a gap in the ladder: the new thing → its signature visual ("wait, what?") → you stand on it with a simple tool → a dummy falls in, compared to the known thing → what's it made of? (analogy) → BUT can it even form? (catch) → future-you meets the signature: too late.

### SciencephiletheAI — What would it be like on an Eyeball Planet? (0.57M, 14.6 min)
- **Story engine:** what-if escalation (living there, scaled up: physics → weather → life → civilisation → expedition)
- **Protagonist:** you (lost at sea), then a native species, the Eyeballians. **Want:** to survive, then to reach the dark side.
- **Central question:** monster or planet type, and what is living there like? Planted at 00:15. "Planet type" is answered at 02:00 (14%); "living there" runs to 14:00 (96%).
- **Stakes:** flares, a frozen dark side, the explorers' lives.
- **Obstacle:** tidal locking, flares, wind, endless dark, and religious taboo.
- **Beat chain:** 00:00 BUT faces everywhere: monster or planet? → 00:20 SO red dwarfs → tidal locking → 01:20 THEREFORE eye-shaped climate rings → 02:00 BUT threats to habitability, each partly defused → 05:20 BUT the "desert eye" is tropical → 05:40 SO the weather → 06:40 THEREFORE you navigate by wind → 07:00 BUT it can flip → 08:00 SO life → 09:41 THEREFORE Eyeballians → 11:41 BUT the dark side is taboo → 12:00 THEREFORE explorers set out → 12:20 BUT 10,000 km of dark, so start from the pole and go by balloon → 13:20 SO to them, Earth is the horror
- **Open loops:** "monster or planet?" (00:15→02:00); "why eyeballs?" (01:20→02:00); "a magnetic field?" (02:20→02:40); "how do you navigate?" (06:40→07:00); "how would life evolve?" (08:00→09:41); "how hard is the expedition?" (12:00→13:20). Median gap 80 s.
- **Turns:** 05:20 the desert eye is tropical. 07:00 "locked" is not forever. **13:41 viewpoint flip: Earth is the alien horror.**
- **Ending:** a perspective flip plus a moral (chaos made us smart and stupid).
- **Where facts sit:** (1) "How do you navigate?" constant winds act like a compass. (2) "How would trees grow?" one-sided, like a USB plug, because the light and wind never move.
- **Where jokes sit:** dense, mostly on facts (Chihuahua flares, tennis-ball ice), some pure digression (Balkans, German government).
- **Transplant template:** "Is [weird name] a monster or a thing?" → the mechanism that creates it → what's dangerous → BUT each danger defused → what it's like for you (one survival task) → BUT it isn't stable → life → a native people → their taboo and quest → their verdict on Earth.

---

## Across the group

### 1. Engine counts
| Engine | Count | Videos (views) |
|---|---|---|
| what-if escalation | 2 | Aliens (11.4M), Eyeball (0.57M) |
| mystery | 2 | AI Slop (11.3M), Gray Holes (0.63M) |
| ranked countdown (tier list) | 2 | Existential (1.56M), Cosmic Threats (0.84M) |
| iceberg descent | 2 | Materials (1.01M), Stellar (0.69M) |
| mission/quest (real person) | 1 | Cancer (21.1M) |
| heist, villain POV | 1 | AI line (18.7M) |
| survival/countdown | 1 | South Korea (15.8M) |
| versus/conflict (vs a belief) | 1 | Weed (12.8M) |

- **The three highest-view videos** (21.1M, 18.7M, 15.8M) all have **a protagonist with a want and a ticking threat**: a woman vs her cancer, agents vs their scorer, a nation vs the maths. None is a list.
- **All 4 list formats** (tier list, iceberg) are Sciencephile's. Inside Sciencephile, though, they beat the single-topic stories (0.69–1.56M vs 0.57–0.63M). Lists ride a search-friendly format, so this is a channel-level effect. On Kurzgesagt (11–21M), every video has a single throughline.
- "You" is the protagonist in 5 of 12 (Aliens, Weed, Gray Holes, Eyeball, Stellar). Another 3 use "you" for one scene (South Korea 02:55, Existential bench, Materials DIY).

### 2. But/therefore ratio (share of beats that are BUT or THEREFORE)
| Group | BUT+THEREFORE | AND |
|---|---|---|
| Kurzgesagt (92 beats) | **64%** | 18% |
| Sciencephile (81 beats) | 52% | 30% |
| Kurzgesagt top 3 by views (Cancer, AI, Korea) | **69%** | 14% |
| Kurzgesagt bottom 3 (Weed, Aliens, Slop) | 59% | 24% |
| Sciencephile single-topic (Gray Holes, Eyeball) | 67% | 4% |
| Sciencephile icebergs | **33%** | 52% |

Per video: Cancer 75%, Aliens 73%, Eyeball 71%, AI 70%, Gray Holes 62%, Korea 60%, Cosmic 57%, Existential 54%, Weed 50%, Slop 50%, Materials 36%, Stellar 31%.
**Weed and Slop, Kurzgesagt's lowest-view videos, are its two most AND-heavy.** The icebergs are almost pure AND, and jokes carry them instead.

### 3. Loop cadence
- **Named open loops:** a median **104 s** between new questions (Kurzgesagt 103 s, Sciencephile 120 s). Between them sit micro-questions: in the list formats every entry is a 50–65 s loop ("how deadly is X?" → tier), and in Aliens every creature reveal is a 30–45 s loop.
- **Most loops close fast** (median 20–60 s). Gray Holes never keeps a sub-loop open longer than 100 s. The long holds are the deliberate ones: Cancer's "will it work?" holds for 3 min 20 s, and AI's "what if they learn the scorer?" for 1 min 50 s.
- **The central question stays open** for a median 72% of runtime on Kurzgesagt (82% of content, excluding the sponsor and outro) and 94% on Sciencephile. Kurzgesagt answers at about ¾ and **spends the last quarter widening the stakes to the viewer** (trial rules, other countries, AI everywhere). Sciencephile's lists hold the answer to the last entry.
- **One question left open on purpose** per strong video: AI ("we don't know why the swarm was shut down"), Aliens ("tragic or lucky?"), Korea ("what will growing up be like?").

### 4. How a 1-minute version compresses the skeleton
The beats that survive, in order (about 8 beats, 6–8 s each):
1. **Cold image of the act** (needle into tumour; AIs breaking out; red light leaking from a "black" hole).
2. **Protagonist plus want in one line** ("a virologist decides to cure her own cancer").
3. **The BUT that makes it hard:** one obstacle, the most physical one.
4. **THEREFORE the attempt**, with one mechanism fact as the reason it might work.
5. **The fake defeat** (the tumour doubles; they'd already won but panicked; "no known way to form them"). **This is the beat to protect.** Every top video has one, and it is what makes 60 s feel like a story.
6. **The rewind or reveal** that explains it (it was the immune army).
7. **The result, with one number** (63% smaller; 100 people become 5).
8. **Widen to "you"**, or call back the opening image.

What gets cut: the history, the second mechanism, the ethics debate, the "it's not just them" widening (keep only one line of it), and every AND beat.

### 5. Five rules a writer can apply tomorrow
1. **Put the hero and the want first; the mechanism then becomes the obstacle or the weapon.** Facts arrive as answers to "why could this work?" or "why did it fail?". *Evidence:* Cancer's virus biology (01:54) comes only after she announces the plan (01:24). Gray Holes' escape cone (05:41) answers "why is light leaking?" (05:01). Aliens' black plants answer "why does it look like this?" with an Earth anchor. The top 3 by views all do this; the AND-heaviest Kurzgesagt videos (Weed, Slop at 50%) are its lowest.
2. **For body and science topics, stage a fight with three sides and let an ally turn.** Cancer has three armies (virus, cancer, immune system), described with war verbs. At 09:59 the immune ally threatens the plan, and the fix (switch virus) is a THEREFORE. AI has agents vs scorer vs humans. Weed has the loneliness spiral (the cure feeds the cause). Without a human hero, give the cells, the planet or the star a goal and an enemy.
3. **Plant one fake defeat before the answer.** The tumour doubles (07:55) but it's the cavalry arriving; the agents had already won (09:53) but panicked; "is there no way back?" (08:48) is followed by a kernel of hope (09:14); Gray Holes undercuts itself with "no known way to form them" (09:01). Each of the top 3 by views has at least one of these, and the 1-minute version keeps it.
4. **Bring "you" in at the midpoint, and give "you" a job and a danger.** Aliens: you get noticed (03:33) and are told "don't touch them" (10:17). Gray Holes: you hold a flashlight on the surface (05:41). Eyeball: you navigate a lost ship by wind (06:40). Korea: you wake up in silent 2060 (02:55). Use a named test dummy (Jon) for the deaths, so "you" stays alive for the ending.
5. **Answer the big question at about ¾, then widen and call back.** Kurzgesagt resolves at a median of 72% and spends the rest on "what it means for you". Their endings call back the opening image (Korea's freight train; Gray Holes' red cone; Aliens' trip home) or close on a sting that reopens the threat (AI: "more capable agents being built now"). For a list video, the twist goes at the top: rank by one metric, then make the S tier the least exotic one (Cosmic Threats: the asteroid, the only proven killer) or the viewer themselves (Existential: "it's us").
