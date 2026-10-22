# Script batch 46–75 (2026-10-22): 30 long-form scripts, scripts ONLY

The owner wants 30 ready-to-voice scripts for Black Hole Life (8–9 min each). **No voice, no visuals, no render, no upload,
no git.** "Full proof" = a script that passes lint, has every fact sourced with an exact quote, a real story spine, and a
self-score ≥ the bar below, so it can go straight to voicing once the owner approves it.

Read, in this order: `LONGFORM-BRIEF.md` (hard rules, sources format, script format, voice-safe markup, output) and
`NIGHT-BRIEF.md` (length 1,350–1,400 words, ≤ 85 clips, cast voices, the "forced to open" hook, safety, clip-count check).
Both apply in full. Model episodes: read `episodes/38-full-brain/script.md` fully, and the first 60 lines of
`episodes/33-why-humans-kiss/script.md` and `episodes/29-bystander-effect/script.md` for the non-"What If" shapes.

## Competitors: study, never copy
Zenn / Past Tense / stick-figure channels are where our *formats* come from (`What Did Ancient Humans Do…?`, `The X Effect`,
`Why Do/Can't You…?`, `What If…?`, named-story mysteries). Their catalogue and stats: `~/videos/research/channels/stats.txt`;
transcripts for structure study: `~/videos/research/ref/`. You may study their hook timing, section rhythm, open loops and
twist placement. **Never reuse their wording, jokes, order of facts or a topic they already made** (check stats.txt titles).
Re-voicing someone's script is their copyright and YouTube demonetises it as reused content.
Do NOT make any YouTube requests (yt-dlp, youtube.com): another job is using our quota and the IP was bot-flagged today.
Research with web search / fetch on primary and strong secondary sources (papers, universities, NASA/ESA, museums, NHS/WHO).

## Your 5 episodes
Your task names your 5 episodes (number, folder slug, working title, angle). The working title is a starting point; improve
it in `title.md` if a better one passes the rules. If research shows an angle is false or too thin, swap in the closest
better angle on the same topic and say why in your final reply. Don't pick a topic outside your list.

## Bar for "done" (every episode)
1. `script_lint.py script.md --long` PASS (from `~/.claude/skills/whiteboard-video-studio/scripts/`), clip check shows no clip < 6 words, ≤ 85 clips.
2. Story card + BUT/THEREFORE beat chain in the header (`references/story-engine.md`); title question asked aloud by ~0:20–0:30;
   twist at 70–85 %; callback landing; last line short.
3. Self-score (`script-writer.md` §9) ≥ 8/10 on every row you score; if a row is lower, rewrite before moving on.
4. `sources.md`: every number/claim in the script → exact quote + URL; "Checked and NOT used"; contested findings flagged in the script.
5. `title.md`: 5 titles (≤ 55 chars, pick first) + thumbnail idea A (clickbait scene, `thumbnail-designer.md` ★) and B.
6. Re-read the whole script out loud in your head once as Dave's narrator: cut every line that is only filler, check every joke
   passes the Joke Law (built from the fact), check numbers are words.

Write each episode completely (all 6 points) before starting the next. Final reply (short, one block per episode): folder,
chosen title, words, clips, lint, lowest self-score row, chapters, unsure facts.
