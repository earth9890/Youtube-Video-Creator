# Thumbnails: Half as Interesting + OverSimplified

Group `hai-oversimplified`. Tiles: HAI 24 (12 top, 6 bottom, 6 latest), OverSimplified (OS) 24 (OS latest #22 and #23 are the same videos as bottom #13 and #16). Labels: `data/thumb-labels-hai-oversimplified.json`. Pixel numbers come from `metrics.tsv` (HAI n=576 scored, OS n=30 scored). Colours were sampled from the full-size images.

**Read these two channels differently:**
- **HAI** has 576 scored uploads and a real outlier tail: 31 uploads ≥ x3, max x11.5. Its top-vs-bottom gap is about the *idea*.
- **OS** has only 30 scored uploads and a narrow perf range: 0 uploads ≥ x3, max x2.6, only 1 ≥ x2. The big variance is in **absolute views** (2.4 M to 105 M, 44×). That variance follows the topic and the position in a series much more than the drawing. Part 1 always beats its own Part 2 and its recap, because those are its neighbours.

---

## 1. Channel style fingerprint

### Half as Interesting
- **Palette:** caption yellow **#F7B516**, caption box plum-black **#1A0023** (also #200A1F), and an orange frame **#F5962A → #F7B815** (a gradient border about 25 px wide at 1280). The scenes use mid-saturation flat vector art (channel sat 0.53, colorful 37.5) and almost no pure white (white share 0.031).
- **Background:** a full-bleed flat-vector scene or top-down view. In 4/24 tiles it is a satellite photo or map (#4, #20, #22, plus #18 halftone). There is never an empty backdrop. One single object carries the frame.
- **Characters:** essentially none. 1/12 top (#6, and only a white line profile). The latest tiles use a gold-suited emoji-head host once (#23).
- **Text treatment:** condensed, heavy, all-caps grotesque (Bebas/Knockout feel) in yellow #F7B516 on a plum #1A0023 box. **One box per line**, ragged edges, padding about 0.25 em, **no outline**. Line cap height is about 8.5 % of frame height and line pitch about 12 % (metric text_h median 0.131). An inverted variant puts plum text on a yellow band (#11, #12, #22). White text on plum appears for short labels (#3, #4, #6, #7).
- **Position:** bottom-left quadrant in 9/12 top (#2, #3, #5, #7, #8, #10, #11, #12, plus #6 bottom band). The box hugs the left or bottom edge and spans 35–75 % of the width.
- **Logo:** plum circle (about 150 px at 1280) with a yellow isometric "H", top-right. Older tiles use a grey outline H with no circle (#3, #4, #6, #7).
- **Grid:** object centre or right, caption box bottom-left, logo top-right. A three-element layout is typical (median `elements` 3 in top tiles vs 5 in bottom).
- **Evolution, old → latest:**
  - Orange frame border: 6/12 top → 0/6 latest.
  - Maps or satellite views: 1/12 top → 5/6 latest.
  - Red pointer arrows: 2/12 → 4/6.
  - Question-mark captions: 1/12 → 3/6.
  - The plum box survives (5/6 latest).
  - Median views per 96-upload block fell from 1.7 M (oldest) to 470 K (newest), and perf stayed around x1.0. The newer map-and-arrow style has not produced an outlier yet: the 6 latest tiles run x1.0–1.3.

**Why the 6-word median still works.** Word count does not predict anything on HAI:
- Top quartile median: 7 words. Bottom quartile: 6.
- text_area: 0.147 vs 0.157. Lum: 0.521 vs 0.521.
- Hit rate (≥ x3): 6.5 % for ≤ 4 words vs 4.3 % for ≥ 10 words. That is noise-level.

Three reasons the text costs nothing:
1. **Most of the "words" are props, not copy.** In 5/12 top tiles the OCR count is inflated by in-world text that reads as a picture: card digits (#1, 17 words), seat price tags (#8, 32 words), departure board (#12, 19), coordinates (#9), airport signs (#11). The actual headline is 1–7 words (median 3.5 top vs 4.5 bottom).
2. **The caption box is a fixed, pre-learned slot.** It is the same yellow-on-plum box in the same corner on 12/12 top tiles, so a returning viewer reads it like a subtitle, not a paragraph.
3. **The words carry the wrongness the image can't.** See §3: the hits use forbidden or danger words.

### OverSimplified
- **Palette:**
  - Navy ocean **#0F0E3A / #0C0A39** under satellite-textured countries, recoloured as faction blocks: red **#CF2545 / #E5303A** vs blue **#4E5DA6**.
  - Skin cream **#FFEEDC / #F8F0E6**, outlines black.
  - Latest titles are teal **#0EFCC8** (HANNIBAL) or yellow **#F5D90A** (Punic War).
- **Background:** a dark world map in 7/12 top (#1, #2, #4, #5, #6, #8, #12). Otherwise a painted location (palace, bar, Alps).
- **Character design:**
  - Big round cream heads with a black outline about 4 px at 1280.
  - Generic people have dot eyes plus thick black V-brows (anger) or no brows (blank).
  - **Famous people keep a semi-realistic pencil-shaded face on the round cartoon head**: Churchill, Stalin, Lincoln, Washington, Robespierre, Nicholas II, Capone.
  - Bodies are simple suits or uniforms with identity props (bow tie, cigar, moustache, armband, tricorne, crown).
  - Heads are cropped by the left and right frame edges, at 55–75 % of frame height.
- **Text treatment:**
  - Rounded hand-lettered sans in white #FFFFFF with a black outline about 10–12 % of letter height and a soft drop shadow.
  - Title at the top centre, cap height 9–16 % of frame height.
  - The "OverSimplified" wordmark sits centre-bottom at about 12 % height on 10/12 top tiles.
  - Part number "1" at bottom-left, about 20 % height.
  - On the highest-view videos the topic is a giant word at 25–35 % height (WW2 #1, WW2 #4, WW1 #8, HITLER #12).
- **Grid:** "bookends", with two rival leaders at the left and right edges facing inward and the map, object or territory between them (6/12 top).
- **Evolution:**
  - **Early:** plain white title, satellite map, two heads.
  - **Latest:** coloured titles (teal/yellow), painted stormy battlefields, crowds, gritted-teeth rage faces (#19), arrows (#20 "WAR").
  - Clutter rises: median elements 5 top → 7 latest. The edges metric is 0.266 for the top quartile vs 0.296 for the bottom.

---

## 2. Top vs bottom

### HAI (12 top vs 6 bottom)

| Signal | Top | Bottom |
|---|---|---|
| Caption in yellow/plum box | **12/12** | 3/6 (#14, #15, #18) |
| Forbidden / danger / mistake word in caption (ILLEGAL, NUKE, DEATH, FRAUD, DIDN'T WORK, PROBLEM, TERRIBLE MISTAKE) | **8/12** (#2, #3, #5, #6, #7, #8, #9, #11) | 1/6 (#14 "RUIN") |
| Character or figure in frame | **1/12** (#6 outline only) | 4/6 (#14, #15, #16, #18) |
| Caption complements the title (adds an angle) | 7/12 | 2/6 (and both of those are flops for other reasons: jargon #15, promo #17) |
| Glance = 2 (obvious at 160 px) | 5/12 | **0/6** |
| Median elements | 3 | 5 |
| Promo / meta video (podcast, new channel) | 0/12 | 2/6 (#13 x0.1, #17 x0.3) |

**Channel-wide check (576 uploads):**
- Thumbnails whose OCR contains ILLEGAL / NUKE / NUCLEAR / SECRET / DEATH / FRAUD / MISTAKE / WRONG / PROBLEM / BANNED / CRIME / DIDN'T hit ≥ x3 in **12/61 (20 %)**. All others hit in **19/515 (3.7 %)**. That is **5.3× the hit rate**.
- **Question marks do not help:** 2/48 hits (4 %) vs 5.5 % baseline.
- **Digits in the text do not help:** 8/182 hits (4.4 %) vs 5.8 %.
- Pixel stats between quartiles are flat (lum, contrast and sat all within 0.01). The style is locked, so only the idea varies.

### OverSimplified (12 top vs 6 bottom)

| Signal | Top | Bottom |
|---|---|---|
| A **recognisable famous face** (semi-realistic caricature, or a photo) | **11/12** (all but #4) | 1/6 (#18) |
| Only generic blank or unknown heads | 0/12 | 4/6 (#13, #14, #16, #17) |
| **Asymmetric emotion**: one calm, smug or blank face against one angry or nervous face | **7/12** (#1, #2, #6, #9, #10, #11, #12) | 1/6 (#17) |
| Everyone wears the same angry V-brow | 1/12 (#7) | **3/6** (#14, #15, #16) |
| Dark navy map background | **7/12** | 1/6 (#18) |
| Bookend face-off composition | 6/12 | 2/6 (#14, #17). On its own this is **not** the differentiator. |
| Part 1 / standalone | 11/12 | 3/6. The other 3 are Part 2 (#16, #18) or RECAP (#13). |
| Glance = 2 | 9/12 | 2/6 |
| Median words (metrics, quartiles) | 3 | 5 |

**Pixel deltas (top quartile vs bottom quartile):**
- **Black share 0.203 vs 0.065.** This is the navy map.
- Lum 0.431 vs 0.499 (darker).
- Contrast 0.330 vs 0.279.
- Text height 0.173 vs 0.219: the flops have *bigger* text, such as RECAP stamps.
- Colorful 32.7 vs 29.9.

**Emotion and staging, the core OS finding.** Anger is the house default. It appears in both hits and flops, so anger alone carries nothing. What separates them:
1. **Contrast between the two faces.**
   - Calm Washington vs glaring redcoat (#6).
   - Blank king vs smug Robespierre with a guillotine between them (#9).
   - Smug Henry vs six furious wives (#10).
   - Smug, squinting Churchill vs a blank-eyed dictator (#1).
   - The emotional gap tells you who is about to lose. In the flops, everyone is equally angry (#14, #15, #16), so there is no story.
2. **Identity at a glance.** Football War (#14, x0.5) is the closest tile to our own style: two bald round heads with V-brows. It flopped despite a wrong-thing hook (a banana on a football), because nobody knows who the two heads are. The same blank head works when a prop names it: the Hitler moustache in #1/#12/#18 and the Stalin moustache in #2.
3. **A third thing between the rivals that raises the stakes:** missiles plus mushroom clouds (#2), the guillotine (#9), a beer glass (#7), a flag (#1, #6). The flops put a joke object there (banana #14, smiling bucket #15) or nothing at all (#16).
4. **Sequels and recaps that reuse art get punished.** #13/#22 RECAP is the *same image* as #24 with "RECAP" stamped on it, and it scored x0.1 (2.4 M vs 37 M).

---

## 3. Curiosity mechanics

**HAI: each top tile plants one question that the title does not answer.**

| # | Thumbnail plants | Title says | Wrongness trigger |
|---|---|---|---|
| 1 x11.5 | "my card digits mean something?" | How to Decode Credit Card Numbers | hidden code in a familiar object (the viewer owns one) |
| 2 x7.6 | "why did *this* fail?" | US Army's Universal Camouflage: A Terrible Mistake | expensive mistake |
| 3 x7.1 | "a photo of the Eiffel Tower is illegal?" | …at Night are Illegal | forbidden act |
| 5 x5.4 | "a nuke, on a normal highway?" | How the US Transports Its Nuclear Weapons | danger in the wrong place (among ordinary cars) |
| 6 x5.2 | "there's a plan for her death?" | Secret Protocol for When the Queen Dies | forbidden topic + secret |
| 7 x5.1 | "a name can be illegal?" | Why It's Illegal to be Named Brfxx… | forbidden + crossed out |
| 8 x4.7 | "why is one seat $116?" | Why Almost Every Airline Has Sued This Website | odd one out (1 orange among 30 blue) + "FRAUD?" |
| 9 x4.6 | "why is everything aimed at this house?" | Glitch That Kept Sending the FBI to a Kansas Farm | weird number (38°N, -97°W) + converging threat |
| 10 x4.5 | "a witness in a *mail truck*?" | Witness Protection 100 % Success | thing in the wrong place |
| 11 x4.2 | "a sandwich ruined an airline?" | $250,000 Unlimited Flight Pass | absurd cause → big loss |
| 12 x4.1 | "18 years in an airport?" | Man Stuck in Paris Airport | weird number + mundane schedule (SHOWER 07:15) |

Patterns:
- **Thumbnail ≠ title in 7/12 top tiles.** Even the 5 "repeat" tiles compress the title into a noun phrase that leads with the wrongness word ("ILLEGAL PHOTOS", "QUEEN DEATH PROTOCOL").
- Bottom repeats name the topic without stakes: "THE FIRST EVER HIGH FIVE", "THE MESSAGE EARTH BROADCAST FOR ALIENS".

**OS: the question is "who wins / who loses?"** It is asked by two famous rivals with unequal emotions. Every OS title is just "<Topic> - OverSimplified", so the thumbnail adds **people and stakes** (who, and what is between them), not information. Wrongness triggers:
- danger about to happen (guillotine #9, missiles #2, rifles vs crowd #11);
- forbidden or innocent juxtaposition (cartoon Hitler next to a real baby photo, #12);
- panic on a real face (googly eyes and a sweat drop on a photo, #8).

---

## 4. Space / science specifically

The niche has few direct examples here, but the devices transfer.
- **"Inside something":**
  - HAI #6 draws a white line profile of a head on near-black #0D0A1C, with the secret object, under a glowing glass dome, *inside* the outline. That is a direct template for "inside your brain / inside a black hole / inside a star".
  - #5 shows the inside by cutting the container open from above (an open trailer revealing the missile).
- **"Huge":**
  - HAI #4 uses one thin cyan #40C8D8 line running across a whole continent.
  - #20 outlines a pit in red with "119 YEARS".
  - OS makes things huge by giving the title word 25–35 % of the frame height (WW2) and by **tiny crowds next to giant heads** (#11 rifle line vs Tsar's head; #21 a giant face in the sky over a tiny army crossing the Alps).
- **"Dark":** OS's navy #0F0E3A field with bright red and blue territories gives the hit tiles black share 0.20, against 0.07 for the flops. Dark plus one saturated block reads as global stakes. HAI #3 and #6 put one glowing object (warm #ECA023 tower, pale-cyan dome) on near-black.
- **"Infinite / everything points here":** HAI #9 sends about 20 orange #E8642A lines from every edge converging on one small house. That is a ready visual for gravity wells or "everything falls in".
- **Science flops:**
  - #15 (x0.2) is a labelled anatomy diagram with a jargon headline ("PARASYMPATHETIC GENERALIZATION", glance 0).
  - #16 (x0.3) is a busy sci-fi scene with an alien, a human, a planet, a molecule and binary: 6 elements, white text with no box, and a caption that repeats the title.
  - Space and body topics died here exactly when they looked like a textbook or a poster.

---

## 5. Rules

1. **Put one forbidden, danger or mistake word in the caption:** ILLEGAL, BANNED, DEADLY, SECRET, DIDN'T WORK, MISTAKE, FRAUD. *Evidence: 8/12 HAI top vs 1/6 bottom. Channel-wide hit rate 20 % vs 3.7 % (12/61 vs 19/515).* Build: Mali text in the caption box.
2. **One caption box, same slot every time:** yellow #F7B516 Mali caps on plum #1A0023, one box per line, bottom-left, line pitch 12 % of height, 2–7 words. *Evidence: 12/12 HAI top vs 3/6 bottom use the box; headline median 3.5 words.*
3. **The words may be many if they are props.** Card digits, price tags, a schedule board, coordinates: draw them as part of the object, smaller than the caption. *Evidence: 5/12 HAI top get their high word counts from in-world text; channel-wide, ≥ 10 words performs no worse than average (median perf 1.09).*
4. **The object is the hero. Use 3 elements total:** object + caption + logo. *Evidence: median elements 3 top vs 5 bottom; glance-2 in 5/12 top vs 0/6 bottom.* If a stick figure appears, it reacts to the object and stays under 30 % of the height. *Evidence: HAI figures 1/12 top vs 4/6 bottom.*
5. **The caption says the angle, not the title.** *Evidence: 7/12 HAI top complement the title. Bottom repeats such as #14, #16 and #18 flop.*
6. **Odd one out beats a question mark.** Draw a grid of identical items (circles, seats, planets) with one in a different colour, plus a red arrow. *Evidence: HAI #8 x4.7. Question-mark captions hit 4 % vs 5.5 % baseline.*
7. **Two rivals means unequal emotions:** one calm, smug or blank, the other angry, nervous or sweating. Never give both the same brows. *Evidence: OS 7/12 top asymmetric vs 1/6 bottom; all-angry 1/12 top vs 3/6 bottom.* Build: our round white heads with dot eyes; the smug face gets half-closed lids and a one-sided smile, the angry one thick V-brows, the nervous one a blue #3BA0E8 sweat drop.
8. **Every face needs an identity prop readable at 160 px:** a hat, moustache, uniform colour, flag or crown. *Evidence: a recognisable figure in 11/12 OS top vs 1/6 bottom. Generic Football War #14 got x0.5.*
9. **Put a stakes object between the rivals:** a weapon, a doom device or a prize. Never a joke mascot. *Evidence: missiles #2, guillotine #9, flag #1/#6 in the top tiles; banana #14 and bucket-with-face #15 in the flops.*
10. **Bookends:** two figures cropped by the left and right edges, heads 55–75 % of height, facing inward, with the centre third left for the stakes. *Evidence: 6/12 OS top.* This rule is a frame, not a hook (2/6 bottom use it too).
11. **For a big topic, use a dark field with one saturated block:** navy #0F0E3A plus one red #CF2545 or blue #4E5DA6 region. *Evidence: 7/12 OS top vs 1/6 bottom; black share 0.203 vs 0.065.*
12. **For a famous topic, show one giant word** (25–35 % height, white, black outline 12 %) **with fewer words overall.** *Evidence: OS #1, #4, #8, #12 at 25–35 %; quartile median words 3 top vs 5 bottom.*
13. **Use an arrow only to point at the wrong thing**, never as decoration. *Evidence: HAI top 2/12 use arrows (#5, #8), both pointing at the anomaly. Latest 4/6 add arrows and haven't broken x1.3.*
14. **Never make a sequel or recap thumbnail by re-stamping old art.** Give part 2 a new face-off or a new danger. *Evidence: OS #13 = #24 art + "RECAP" scored x0.1; parts 2 #16 and #18 scored x0.6–0.7.*
15. **No meta thumbnails** (announcements, new channels, "do not click"). *Evidence: HAI #13 x0.1, #17 x0.3; the 2 such uploads have median x0.18.*

---

## 6. Recipes (1920×1080)

### R1 "There's a ___ in here" (from HAI #5, x5.4)
- **Background:** flat #4A4A4E. Three horizontal lane bands, separated by white #F2F2F2 dashed lines (dash 60 px, gap 40 px, stroke 8 px) at y = 300 and y = 620.
- **Decoy row:** 6 identical ordinary containers in muted colours (#2B2B2E, #6B6B70, #2F4A7A, #DADADA), each 260×130 px rounded rect, black 6 px outline, spread across the top and bottom lanes.
- **Hero container:** centred at (960, 460), 900×260 px, yellow #F6B01D, with its top cut open. Inside sits the forbidden thing at about 55 % of the container's width. Niche example: a black disc #0A0A0A, 180 px, with an orange #F28C28 ring 20 px wide = "a black hole".
- **Caption:** "THERE'S A BLACK HOLE IN HERE", two lines, Mali Bold caps, yellow #F7B516.
  - Each line sits on its own plum #1A0023 box.
  - Box 1 at x 90–1150, y 690–830. Box 2 at x 90–650, y 830–970.
  - Cap height 95 px.
- **Arrow:** red #E0262B curved arrow, 14 px stroke, from (1250, 940) curling up to the container's edge at (1240, 640).
- **Logo:** channel logo in a 230 px circle at top-right (1690, 170).
- **Character:** none. If you must, add a tiny stick driver (head 70 px) in a decoy car, neutral.

### R2 "Secret inside the head" (from HAI #6, x5.2)
- **Background:** flat #0D0A1C, with an orange #F5962A frame 36 px on all sides.
- **Head:** a stick-figure head drawn as a line only (white #FFFFFF, 12 px stroke): a big round head of 620 px diameter centred at (1100, 430), with a short neck line going down to the frame bottom. No face features; profile facing right.
- **Inside the head:** a glass dome, 200×300 px, pale cyan #7FD3F0 at 85 % opacity with a white highlight stripe. Inside the dome, one small object at 120 px, e.g. a glowing yellow #FFE45C neuron/star or a ticking clock.
- **Caption:** one plum #1A0023 band from x 36 to 1700, y 820–980. Inside it, white #FFFFFF Mali caps with a 110 px cap height: "BRAIN DEATH PROTOCOL", or another 3-word label containing a forbidden word.
- **Logo:** top-right, grey outline style.
- **Element count:** 3 (head, dome, caption).

### R3 Rival bookends on a dark map (from OS #1, x2.6, and #2, x1.9)
- **Background:** navy #0F0E3A. A simplified flat world or region map in muted green #3F6B45 and sand #CDBB8A. One faction region in saturated red #CF2545 and the other in blue #4E5DA6, each about 20 % of the frame.
- **Left figure:** stick figure with a big white round head (#FFFFFF, black 8 px outline). Head diameter 560 px, centred at (300, 470), cropped by the left edge by about 60 px. Body is a dark suit #2A2A2E down to the bottom edge.
  - Identity props: a bow tie and a cigar, or a space-agency cap.
  - Expression: **smug**. Half-closed lids (two flat 50 px arcs), a one-sided smirk, eyes on the viewer.
- **Right figure:** same head size at (1640, 500), cropped by the right edge.
  - Identity props: an olive #5E5A2E uniform with a red star badge, or an ushanka.
  - Expression: **angry**. 22 px thick black V-brows over 26 px dot eyes, mouth a flat 60 px line, eyes on the left rival.
  - Add one blue #3BA0E8 sweat drop (90 px) if you want "about to lose" instead of "about to attack".
- **Centre stakes:** two rockets (white #F4F4F4 with black bands, 380 px long) angled toward each other from the top corners, plus 3 small mushroom clouds (#C0392B / #E67E22, 90 px) on the map. Or a single object, such as a Moon at 220 px on the centre line.
- **Text:**
  - Title "THE SPACE RACE" across the top: white #FFFFFF Mali Bold, cap height 140 px, black outline 16 px (about 12 %), soft drop shadow (#000, 40 %, offset 6 px).
  - Giant part number "1" at bottom-left (x 40, y 1040 baseline), white, 220 px, same outline.
- **Do not** give both figures V-brows.

---

## 7. Don'ts (what the flops do)
- **Announcement or meta tiles** (HAI #13 podcast x0.1, #17 "DO NOT CLICK ON THIS" x0.3).
- **A jargon headline over a labelled diagram** (#15 "PARASYMPATHETIC GENERALIZATION", x0.2, glance 0).
- **A sci-fi poster with 6 props and an un-boxed white caption** that repeats the title (#16, x0.3).
- **An image that contradicts the text:** "POLAR BEARS" drawn as a black silhouette (#14, x0.2).
- **A low-stakes "first ever" label** with no wrongness (#18 high five, x0.3).
- **Generic blank heads, all wearing the same angry brows** (OS #14, #15, #16, x0.5–0.6).
- **A joke mascot as the centre object** instead of a stakes object (banana #14, smiling bucket #15).
- **Re-stamping old art for recaps or sequels** (OS #13 RECAP, x0.1).
- **Oversized secondary text** (OS flops have text_h 0.219 vs 0.173).
- **Piling crowds and clutter into the frame** (OS latest median 7 elements, edges 0.296 in the bottom quartile).
