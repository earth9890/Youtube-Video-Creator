# Script batch 76–95 (2026-10-22): 20 "What If You…?" scripts in the NEW mission format, scripts ONLY

The owner pointed us at One Small If (@onesmallif: a nine-day-old channel already at up to 105K views per video) and asked
for 20 new scripts that take inspiration from it. Study: `~/videos/research/channels/onesmallif/study.md` (read §0, §3,
§4 "rules for a writer", §6 "what we should change", §7 "what not to copy"). **We take the formula, never their wording,
jokes, fact order, mascot, look or topics.** No voice, no visuals, no render, no upload, no git.

Still in force from `LONGFORM-BRIEF.md` and `NIGHT-BRIEF.md` (read both): every fact sourced with an exact quote in
`sources.md`; safety (no medical advice, no how-to, kind, nothing scary for its own sake, "please don't try this" where it
matters); cast tags and the `# cast:` header; voice-safe clips (no clip under 6 words); lint; `title.md`. **What changes:**

## The new shape (numbers from the study)
1. **A mission with a clock, not a topic.** The power/premise happens to you (Dave), and you need it to get ONE human thing
   done before a deadline (make it to your sister's wedding by 6 pm; win back the dog from the vet before closing; get the
   cake across town in 40 minutes). The deadline is set by 38 % at the latest, ideally in the first minute. Every chapter is
   an escalation step you can count (hour 1, 2, 3… / 10 m, 100 m, 1 km / bed one, two, three), and the chapter titles are
   the clock or the step (`# chapter: 4:15 pm` or `# chapter: Ten times`).
2. **Open on the end.** 8–15 s flash-forward of the worst or funniest moment, then "Let's go back." to a clock reading.
   Title question spoken by 0:35. **First consequence by 25 s; first costly obstacle by 60 s.**
3. **A rule card early** (0:30–1:50): one line that fixes the engine and blocks nitpicks ("In this story, your lungs work
   like a fish's. Your phone does not.").
4. **Facts are obstacles, not lessons.** About one real science nugget a minute, each ≤ 10 s, total explanation 10–15 % of
   runtime. Every fact must either block you or become the next gag. Numbers go on screen as HUD tags: write them as
   `# hud: 40 % LESS OXYGEN` comments; say each number once, never explain it twice.
5. **Second person, present tense, deadpan narrator.** "You wake up. Your pillow is wet. Not drool. Gills." The viewer is
   Dave: Dave is on screen, the narrator talks to "you". Dave's own quotes stay `(@dave)`.
6. **Short sentences, fewer words.** Target **1,000–1,150 spoken words** (≈ 6.5–7.5 min after our 0.9× slow-down), sentences
   of 4–6 words. VoiceStudio garbles clips under 6 words, so put several short sentences on ONE line (one clip):
   `You jump. You miss. The floor does not.` Use `/` only where a beat needs air. The linter's "too many short sentences"
   WARN is expected; ignore it.
7. **A real cast talks (30–45 % of the words).** Use our voices: `(@dave)` Dave, `(@brain)` Dave's Brain (tired librarian),
   `(@doc)` the scientist **on a phone call** (≤ 30 s per video; recurring line of your own invention, e.g. "I checked the
   numbers twice"), `(@kid)` a small niece/nephew, `(@old)` a grumpy neighbour, `(@news)` a TV anchor for scale. Quotes ≥ 6
   words. One recurring tiny-people cutaway per chapter for scale (3–6 s, `# gag:` comment).
8. **Jokes:** ~4 a minute in the fun chapters, ~2.5 in the emotional one; mostly reaction and visual gags (`# gag:` lines for
   the animator) + the Joke Law (built from the fact). Tag `[J]`.
9. **Plant a prop or phrase in the first 60 s; pay it at 90 %+.** **One mood turn** (45–60 % or ~94 %): the price of the
   power (loneliness, hunger, missing the moment).
10. **Ending:** resolve the mission at ~90 %; then a 20–30 s sting where the last real fact opens the NEXT question ("but
    your gills only work in cold water… and it's July") with the ask in the story's voice ("if you want to know what
    happens in July, you know the button").
11. Header: story card (`# engine: mission`), ≥ 8 `# beat:` lines, `# mission:`, `# clock:`, `# rule:`, `# plant:` / `# payoff:`.

## Bar for "done"
`script_lint.py script.md --long` 0 FAIL (warnings about short sentences OK); clip check (no clip < 6 words, ≤ 110 clips);
self-score (script-writer §9) ≥ 36/48; every fact in `sources.md`; title.md with 5 titles (pick first; "What If You…?", ≤ 55
chars) + thumbnail A: Dave as the single face, 1–2 words that are the viewer's reaction, not the title ("TOO LOUD?",
"10 SECONDS"), our doodle style, never their mascot or look; plus idea B.
Read it out loud in your head once as the narrator; cut filler.
Final reply (short, one block per episode): folder, title, words, clips, character-voice %, mission + clock, lint, lowest
self-score row, unsure facts.
