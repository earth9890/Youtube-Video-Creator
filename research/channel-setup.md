# Black Hole Life: channel-level SEO setup (draft, 2026-11-04)

Channel `UC5zU3o0zGseQ4HpG88sZ0RQ` (@BlackHoleLife). This is the same kind of setup as Tiny Tune Town's
(`~/.claude/skills/tiny-tune-town/references/package-upload.md`), changed for a not-made-for-kids science channel.
Everything below is a draft for the lead to apply in Studio. Playlist IDs stay `<TBD>` until the playlists exist.

## 0. Audit: the public state on 2026-11-04 (curl and yt-dlp, logged out)
- **48 public videos, 1,394 views in total, no Shorts tab.** The one-minute videos are horizontal long-form uploads.
- **Channel description: empty. Channel keywords: empty. Playlists: none** (the channel has no Playlists tab). Joined 3 Oct 2026.
- **Category: all 43 videos in `seo/live/*.info.json` are "People & Blogs"**, Studio's default, which is wrong for this
  content. Language: en. Fixed in the checklist step 3.
- Per-video SEO is already done (pass on 2026-10-22, `seo/SEO.md`): a search line first, then sources and chapters, about 15 tags ending in
  "black hole life". What's missing is the layer above the videos: no playlists, no About text, no keywords, no
  end screens or cards, and no "more like this" lines in the descriptions.
- The four content groups and how they are doing (views are too small to read much into; the channel is one month old):

| Group | n | Median views | Best |
|---|---|---|---|
| What If (8 min, science and body) | 14 | 14 | Live on the Moon 140, Hibernate 87 |
| Psychology effects (8 min) | 6 | 25 | Why You Can't Tickle Yourself 291 |
| Ancient humans (8 min) | 2 | 37 | Ancient stars 52 |
| "You Are Not…" pep talks (1 min) | 15 | 6 | You Are Not Too Old 410 (the channel's best) |
| Older motivation clips (1 min) | 11 | 3 | Height 22 |

## 1. What the peers do (patterns only; no text copied)
Pulled from the public About and Playlists pages of Kurzgesagt, What If, Ridddle, Fireship, ThePrimeagen and ByteByteGo.
(Sciencephile's handle didn't resolve, so it was skipped.)
- **Keywords:** Kurzgesagt uses 13 one-word topics (about 100 characters). What If uses about 25, mostly quoted phrases
  that match searches ("what happens if", "what if scenario", "space documentary"). Ridddle and ByteByteGo use none.
  Keywords are a weak signal, so ours are short and accurate, with no stuffing.
- **About:** two or three sentences of promise and voice ("explaining things with optimistic nihilism"), then what an
  episode is. None of them list keywords.
- **Playlists are topic shelves, and they overlap:**
  - Kurzgesagt: "What if...", "Black Holes", "Human Stuff", "Our Best Stuff".
  - What If: 30 lists, each "<topic> | What If" (Your Body, The Sun, Falling Scenarios, Extreme Size).
  - Ridddle: around 20 topic lists (human body, space, survival, the past).
  One video sits in several lists, and there is always one "best of" or "all" list.
- **Titles:** the question people type comes first, with no channel-name suffix.
  - "What If…" and "What Happens If…" are the house formula on two of the peers.
  - Kurzgesagt uses statements with a hook.

## 2. Channel keywords (19, each ≤ 30 characters, 341 of 500 characters)
Paste into Studio → Settings → Channel → Basic info → Keywords, as one comma-separated line:
```
what if, what would happen if, what if science, science explained, space explained, black hole, stick figure animation, funny science, science animation, psychology explained, psychology facts, human body facts, brain facts, ancient humans, history explained, educational animation, self improvement, space, black hole life
```
"self improvement" covers the 26 one-minute pep talks. Drop it if those stop being made.

## 3. Channel description / About (687 characters; no AI, TTS or voice-tool mention)
```
What would happen if you fell into a black hole? If you never slept, or used 100% of your brain? Why can't you tickle yourself, and what did ancient humans do for fun?

Black Hole Life answers the strange questions with real science, hand-drawn and a little ridiculous. Each "What If" video drops Dave, our stick-figure everyman, into one wild scenario against the clock: space and the universe, the human body and brain, psychology, and history. Every number comes from a source listed in the description.

In between, one-minute pep talks ("You Are Not…") use psychology research to argue with the voice in your head.

Funny science explained with stick figures. New videos every week.
```
Studio → Customization → Basic info → Description. Links section: none for now. The channel has no other
sites, so a link would only clutter the header.

## 4. Upload defaults (Studio → Settings → Upload defaults)
| Field | Value | Why |
|---|---|---|
| Visibility | **Private** | Same as TTT. Nothing goes public before the owner's OK in chat, and the upload flow sets the final visibility. |
| Category | **Education** | The content is science, psychology and history explainers plus self-help. Education fits all four groups; Science & Technology fits only the What If and space videos. Kurzgesagt-type channels file under Education, and it is the category the YouTube Learning surfaces read. |
| Title / description language | **English** | |
| Licence | **Standard YouTube Licence** | Creative Commons would let anyone reupload the videos. |
| Comments | Allow all, but hold potentially inappropriate comments for review | Not made for kids, so comments are on. They drive the pinned-question habit. |
| Description (default footer) | below | Studio pre-fills it for manual uploads. The Chrome upload helper replaces the whole box, so the package template (§7) carries the same lines itself. |
| Tags | **empty, on purpose** | Every package already carries about 15 tags with "black hole life". Defaults would add duplicates, and a tag wall is not a ranking factor. |
| Audience (Advanced settings tab) | No, not made for kids | Required for end screens and cards. |
| Altered or synthetic content | leave to the owner | This is YouTube's own disclosure. Don't answer it for the owner. |

Default description footer:
```
▶ All Black Hole Life videos: https://www.youtube.com/playlist?list=PLN-K-zF7RNW0
▶ Subscribe: https://www.youtube.com/@BlackHoleLife?sub_confirmation=1

About Black Hole Life: funny "what if" science, psychology and history, hand-drawn with stick figures. Every number is sourced. New videos every week.
```

## 5. Playlists (5 themes + All; all Public; manual order, best first)
| Playlist | ID | Description "More" line |
|---|---|---|
| All Black Hole Life Videos | `PLN-K-zF7RNW0` | (always the second line) |
| What If? Science Scenarios Explained | `PLSMv6579_BbM` | `▶ More What If scenarios:` |
| Space & the Universe Explained | `PLQJ2ptKYaN5w` | `▶ More space videos:` |
| Weird Psychology Effects Explained | `PLayeD1kJzbZ4` | `▶ More psychology effects:` |
| Ancient Humans: How People Really Lived | `PLdoQ3DJyz3eg` | `▶ More ancient humans:` |
| One-Minute Pep Talks: You Are Not… | `PLI_paQ0Tng1Q` | `▶ More one-minute pep talks:` |

Playlist descriptions (paste into the playlist's description field):
- **All:** `Every Black Hole Life video, newest first: what if science, space, psychology and history explained with stick figures.`
- **What If:**
  ```
  What would happen if you never slept, fell into a black hole or shrank to the size of an ant? Funny what if science scenarios, one wild mission at a time, with every number sourced.
  ```
- **Space:**
  ```
  Space and the universe explained with stick figures: black holes, the Moon, living in space, the overview effect and the night sky. What if questions about the cosmos, answered with real astronomy.
  ```
- **Psychology:**
  ```
  Weird psychology effects explained: why you can't tickle yourself, the bystander effect, the Hawthorne effect, placebo buttons and more. The strange experiments behind how your brain really works.
  ```
- **Ancient:**
  ```
  What did ancient humans do for fun, for toothache, at night? History explained through everyday life thousands of years ago, from the oldest board game to the stars they saw.
  ```
- **Pep talks:**
  ```
  One-minute pep talks backed by psychology research: you are not lazy, not too old, not behind. Short stick-figure videos that argue with the voice in your head.
  ```

Membership (video IDs from the live channel; every video also goes in **All**). Keep the order as listed, best first:
- **What If (14):**
  - `QPeTnG9YhpY` Live on the Moon
  - `YXvg2z08IuU` Hibernate
  - `MRLSPaxzfvQ` Ant size
  - `cfOcu3uolrs` See thoughts
  - `slysCLVFYgA` 300g protein
  - `MZOm3s9ob1E` 100 energy drinks
  - `ELhubiuGdBc` $1 billion in a day
  - `Tc7_v11_gL0` Fall into a black hole
  - `WPJy9bXi5RY` 100% of your brain
  - `uN5ypWRpy_I` Never sleep
  - `zrPhhnK_N4c` Internet disappeared
  - `8BIPhnBh0iU` Never forgot
  - `gY9SOnwejEc` Talk to animals
  - `DJS4fF1068k` Moon disappeared
- **Space (5):**
  - `QPeTnG9YhpY` Live on the Moon
  - `LiTuGDyn8DM` Ancient stars
  - `Tc7_v11_gL0` Black hole
  - `C1vv8SBSMoU` Overview effect
  - `DJS4fF1068k` Moon disappeared
- **Psychology (6):**
  - `VDkQlN6fxRo` Tickle
  - `E6ZxhWGbdno` Kiss
  - `QuxfwQ9IiyU` Bystander
  - `f6tdDLZoYQQ` Placebo buttons
  - `C1vv8SBSMoU` Overview effect
  - `HQbdV9TDlw4` Hawthorne
- **Ancient (2):**
  - `LiTuGDyn8DM` Stars
  - `2ntf-K8jXKo` Fun
  - Episodes 51–55 (ancient sick, mirrors, cold, time, babies) fill it out when they publish.
- **Pep talks (26):**
  - The "You Are Not…" set:
    - `-MXrXcTd8us` Too old
    - `3hijnxP5SrY` Short
    - `mYDnI5kvcvU` Ugly
    - `1aPVnOKALxY` Weak
    - `2RODWPDyspA` Weird
    - `DjdFb-7PVGA` Behind
    - `Q9RDTNFrRbQ` Too dark
    - `KEuLhiZz95s` Unlucky
    - `b4zwJzP7kC4` Lazy
    - `O_lZbM8mlBE` Alone
    - `O-JCindIwvw` Too skinny
    - `SDhphGdlCj8` Failure
    - `FqCwTouJLbI` Bad at math
    - `LR4VGwb7oBI` Dumb
    - `G6jBADLtHeY` Boring
  - Then the older motivation clips:
    - `pg7fshAltSU` Height
    - `_2LUgvKUWKo` Lonely
    - `3Ap-cOHD7jk` Quit
    - `tI6s-w_4uIE` Attention
    - `H5lF3uG-8tw` Comparison
    - `1d5P2NVhQeA` Worries
    - `hbpM6VGX9hY` 2am habit
    - `AO5OvJl5k6A` Spotlight
    - `_l52TbOl7qQ` Procrastinate
    - `xSIvAgPyzr4` Discipline
    - `8qfxyMxD7GU` High standards

Upcoming episodes, by folder:

| Episodes | Theme |
|---|---|
| 43–49, 71–95 | What If; the space ones (71–75, 88–90) also go in Space |
| 51–55 | Ancient |
| 56–62 and 63–70 (effects, memory cases) | Psychology |

Add a sixth theme only when 5 or more videos would go in it. The likely one is "What If… Superpowers" once 76–95
(fly, X-ray vision, regrow limbs) are out.

## 6. Title template (checked against the best performers)
- **What If:** `What If You <did the thing>?`. Use the exact autocomplete wording (`seo/suggest.py`), ≤ 60 characters, no brand
  suffix. Moon 140 and Hibernate 87 views both follow it, at 36 and 31 characters.
- **Psychology and phenomena:** `Why You <can't / do X>` or `The <Name> Effect`. The plain-question form wins: "Why You Can't Tickle Yourself" (291 views)
  beats "The Hawthorne Effect" (3) and "The Overview Effect" (5). Default to the question. Use the effect name only when people
  search for it ("dunning kruger effect").
- **Ancient:** `What Did Ancient Humans <do / think about X>?`
- **Pep talks:** `You Are Not <label>. <Twist>.` ≤ 60 characters. "You Are Not Too Old. You're Just New at It." (410 views) is the best on the channel.
- **No `| Black Hole Life` suffix.** TTT's suffix works because parents search for the brand. Here the brand name gets no
  searches and would eat the 60-character budget. The channel name already shows under every title.

## 7. Description template and base tags (now in `whiteboard-video-studio/references/youtube-package.md`)
```
<Search line: the question in the words people type; the only line above "...more".>

<Dave story hook + 2–3 line summary.>

⏱ Chapters
0:00 …

Sources:
- …

<closing sting line from the script>

▶ More <theme>: https://www.youtube.com/playlist?list=<theme id>
▶ All Black Hole Life videos: https://www.youtube.com/playlist?list=PLN-K-zF7RNW0
▶ Subscribe: https://www.youtube.com/@BlackHoleLife?sub_confirmation=1

About Black Hole Life: funny "what if" science, psychology and history, hand-drawn with stick figures. Every number is sourced. New videos every week.

#<topic> #whatif #science
```
Base tags, every video (3, put last): `what if, science explained, black hole life`. Pep talks swap "what if" for
`psychology facts`. The other 10–12 tags stay video-specific, the searches from `seo/suggest.py`, as now.

## 8. Watch-next and channel page
- **End screen (every video, last 15–20 s):**
  - Element 1: "Best for viewer" video.
  - Element 2: the theme playlist.
  - Element 3: Subscribe, using the channel icon.
  - Leave the video's final ~15 s visually calm: the sting line plus empty board, so the elements don't cover a joke.
  - Fastest way to apply: build it once, then on each later video use Editor → End screen → **Import from video**.
- **Cards (long videos, 2 per video):**
  - Card 1 at about 30 %: a related video, if the script mentions its topic. Otherwise use the theme playlist.
  - Card 2 at about 75 %: the theme playlist.
  - Pep talks: 1 card at about 40 s to the closest long video. "You Are Not Too Old" → "What If You Never Forgot Anything?";
    "You Are Not Lazy" → "Why You Procrastinate". The custom teaser text says what the long video answers.
- **Channel page (Customization → Layout):**
  - Trailer for people who haven't subscribed: **`VDkQlN6fxRo` Why You Can't Tickle Yourself**. It is the best long video
    and shows the whole format in its first 30 s.
  - Featured video for returning subscribers: latest upload (Studio's default "For You" handles this).
  - Sections, in order:
    1. For You
    2. What If? Science Scenarios (playlist)
    3. Popular videos
    4. Weird Psychology Effects (playlist)
    5. Space & the Universe (playlist)
    6. One-Minute Pep Talks (playlist)
    7. Ancient Humans (playlist), added when it has 4 or more videos

## 9. Applied checklist (Studio only, in order)
1. Studio avatar → confirm **Black Hole Life** is the selected channel.
2. **Customization → Basic info:** paste the §3 description → Publish.
3. **Content → Videos:**
   1. Tick the select-all box, then "Select all 48".
   2. Choose Edit → **Category → Education** → Update videos.
   3. In the same bulk edit, set **Language → English** if it is empty.
4. **Settings → Channel → Basic info:** paste the §2 keywords → Save.
5. **Settings → Channel → Advanced settings:** confirm the audience is "No, set this channel as not made for kids".
6. **Settings → Upload defaults:** fill in the §4 table and footer. Leave the tags empty. Save.
7. **Content → Playlists → New playlist** six times, using the §5 names and descriptions, all Public. Copy each playlist ID from its URL
   (`list=…`) and send the IDs back so the `<TBD>` placeholders in this file and the skill template can be filled in.
8. **Content → Videos:** tick the members from §5 → Add to playlist → pick the playlist. Do it once per playlist; All = select-all.
   Then open each playlist → drag it into the §5 order (or sort by most popular).
9. Edit the upload-defaults footer and replace `PLN-K-zF7RNW0` with the real ID.
10. **End screen** on `VDkQlN6fxRo`, set up as in §8. Then import it on the other long videos, newest first. Use a separate
    "pep talk" end screen for the one-minute videos.
11. **Cards** on the 10 most-viewed videos first, as in §8.
12. **Customization → Layout:** trailer, then the sections from §8 → Publish.
13. *(Optional, can be done in batches)* Add the `▶ More / ▶ All / ▶ Subscribe` lines to the existing descriptions. Start with the
    top 10 by views; an upload agent can do it from `seo/desc/<id>.txt` once the playlist IDs exist.
14. Verify while logged out:
    - `curl -s https://www.youtube.com/@BlackHoleLife/playlists` shows 6 playlists;
    - `/about` shows the description.
