# Episode 64: "Why Do Songs Get Stuck in Your Head?" (long form, ~8.5 min). Mission engine (story-engine.md §3) wrapped round a mystery: Dave has had eight seconds of a supermarket jingle looping in his head for three days and wants it evicted. Why do songs get stuck, why this one, and what actually gets one out?
# Narrator: The Storyteller, calm, slightly-too-honest guide. Test dummy: Dave (cast voice "dave"; petty trait: insists the tune is "not even good", then hums it). Dave's Brain (cast voice "brain", the tired librarian from ep 38) has two short lines.
# Runner object: Dave's head as a little tape player with a loop of tape. It evolves: a tape looping eight seconds with a counter reading three days (hook) -> a chart graph with a bouncy melody line, faster and arch-shaped with one big leap (Jakubowski) -> four doors into the tape room labelled EXPOSURE / MEMORY / MOOD / LOW ATTENTION (Williamson) -> a whole cassette rewound, still looping (the "finish the song" idea) -> the Zeigarnik label peeled off the cassette (twist) -> a wad of gum stuck in the player's mouth (gum) -> the tape winding down, a new loop starting (landing).
# Runner phrase: "the bouncy bit" (Dave's name for the tune: he cannot say its name, because it is a jingle and he would be humming it).
# Planted number: "three days" (hook ~0:08) -> paid off in the gum chapter (~6:30) by "a test that lasted three minutes".
# Contested, flagged in the script: the "unfinished business" (Zeigarnik) explanation for earworms (the 2025 meta-analysis finds no memory advantage for unfinished tasks; Hyman's own test of part-played songs found no extra earworms); gum is three small lab experiments (44, 18 and 36 students) with one song; the "listen to the whole song" remedy is a self-report finding, mechanism unknown.
# No real song lyrics are quoted and no song titles are used; tunes are described, not sung. Dave's jingle is invented.
# Sources: see sources.md (Jakubowski, Finkel, Stewart & Mullensiefen 2017; Williamson et al. 2012; Liikkanen 2012; Hyman et al. 2013 + BPS Research Digest; Byron & Fowles 2013 via Jakubowski; Williamson, Liikkanen, Jakubowski & Stewart 2014; Beaman, Powell & Rapley 2015; Ghibellini & Meier 2025 meta-analysis; MacLeod 2020).
#
# Chapters (est. at 2.8 words/s plus marked gaps, ~8:40 total): 0:00 Three days / 0:35 The song's fault? / 1:55 Not only the song / 4:10 Finishing the tune / 5:20 The test it fails / 6:30 Gum / 8:05 The next one
# Position of the beats (share of words): question ~0:20; the song's features 7-21 %; the situation 21-46 %; the cure idea (finish the song) 46-59 %; late reversal (the Zeigarnik effect does not replicate; Hyman's own partial-song test) 59-67 %; answer (a busy mouth; gum) 72-83 %; landing 89 %. The reversal lands a little earlier than the usual 70 % because the gum chapter needs room to earn the answer.
# Self-score (script-writer.md §9, rows rescaled to 0-10; lowest row 8): spine 9, turns 8, hook 8, one idea 8, Joke Law 8, density 8 (17 beats, ~2.1/min), narrator 9, dummy 8, evidence 9, escalation 8, callback 8, rhythm 8. Total 99/120 (= 39.6/48).
# Lint: script_lint.py --long: PASS, 0 fails, 1 warning (jokes tagged in the last 15 %: "a busy mouth" and "three minutes beats three days", the callback to the planted three days). 1,365 spoken words, 128 sentences (mean 10.7, 24 % <= 5 words), 17 joke beats. 79 clips, all 6-30 words, two cast voices (dave, brain; ~2 % of words).
# engine: mission
# want: Dave wants eight seconds of supermarket jingle out of his head before it costs him another meeting
# obstacle: he cannot think his way out (trying not to think of it brings it back), and every popular explanation he finds turns out to be a story rather than a finding
# stakes: Dave's sanity and his standing in the open-plan office; for the viewer, what a loop in their own head means, and what to do about it
# question: why do songs get stuck in your head? (spoken ~0:20; partial answers: the song's features ~2:00, the situation ~3:20; full answer, "a familiar, bouncy tune plus a head with spare capacity, and an inner voice that runs on your mouth", ~7:00 of ~8:30 = ~84 %)
# change: Dave stops fighting the loop; he chews gum, the loop fades, and when a new tune turns up he finds that most earworms are neutral or pleasant
# beat: AND Dave has had eight seconds of a supermarket jingle looping for three days; he calls it "the bouncy bit"
# beat: BUT he cannot think it out, and nobody can explain why this tune: why do songs get stuck in your head?
# beat: THEREFORE suspect one, the song itself: Jakubowski 2017, 3,000 people named earworms; hits and recent songs; compared with matched non-earworms: faster, a common arch shape, unusual leaps
# beat: BUT it is not only the tune: Williamson 2012 (exposure, memory, mood, low attention), Hyman 2013 (songs people know and like, old as often as new), Liikkanen (almost nine in ten at least weekly): it is ordinary
# beat: THEREFORE suspect two, unfinished business (Zeigarnik, via Hyman): play the whole song to close the loop; Williamson 2014: seeking out the tune is a popular, effective response; Dave plays it, it fades, then it is back
# beat: BUT the twist: the Zeigarnik memory effect does not hold up (2025 meta-analysis of thirty-eight studies: interrupted tasks are recalled about as often as finished ones), and Hyman's own test, playing only part of a song, did not raise the earworm rate
# beat: THEREFORE the resume urge survives (interrupted tasks are resumed about two-thirds of the time), but nobody has shown it for tunes; what the data support: familiar, recent, low-load, and an inner voice
# beat: THEREFORE Beaman, Powell & Rapley 2015: chewing gum reduces tunes in the head; finger tapping helps less; the inner voice uses articulatory planning; the test lasted three minutes
# beat: SO Dave chews gum; the bouncy bit fades; a new tune arrives; most earworms are neutral or pleasant

# cast: dave=22393bee,brain=7f7a5b5c
# chapter: Three days
This is Dave. Dave has had the same eight seconds of a supermarket jingle looping in his head for three days. // [J]
He calls it the bouncy bit, because he refuses to say its name, in case he starts humming it. He has started humming it anyway. // [J]
"I don't even like it. Why won't it just leave?" (@dave) //
So why do songs get stuck in your head? And what gets one out? //
The answer involves three thousand people naming their worst earworms, a famous idea that doesn't survive a test, and a stick of chewing gum. Let's start with the tune. //

# chapter: The song's fault?
The scientific name is involuntary musical imagery, and the popular name is earworm, from the German Ohrwurm. / A tune comes into your mind and repeats, without your say-so. //
In a study at Goldsmiths in London, three thousand people were asked which tunes got stuck. / Songs that had done better in the charts, and left them more recently, were named far more often. //
Then the researchers did something careful. / They took a hundred tunes that people named, and matched each with a tune nobody named, with the same popularity and style. //
A computer then scored all two hundred tunes on eighty-three melodic features. The computer reports no earworms. // [J]
The earworms came out faster. They had more common overall shapes, usually an arch, a rise and a fall. / And they were more likely to include unusual leaps. //
So: a familiar shape, a quick pace, and one oddly big jump. //
Dave looks at his bouncy bit. It's fast, it's an arch, and it has one huge leap in the middle. It has been engineered. // [J]
But that can't be the whole story. Millions of people hear fast, arched jingles every week, and most of them walk out of the shop fine. //

# chapter: Not only the song
In two thousand eleven, Victoria Williamson's team at Goldsmiths asked how earworms start, using radio listeners and an online survey. //
They found four kinds of starting circumstances. Exposure to the music. A memory trigger. / A particular mood. And low attention, when the mind has nothing much on. //
Dave's has all four. He heard the jingle on Tuesday, it reminded him of his nan, he was anxious, and he was in a queue. // [J]
Many earworms also turn up during repetitive movement, like walking or running. Dave's was waiting for him at the bus stop. // [J]
The popular belief is that only annoying songs get stuck. In two thousand twelve, Ira Hyman's team at Western Washington University found the opposite. / Songs people knew and liked became intrusive most often. The tune isn't punishing you. It's flattering you. // [J]
Old ones stuck as easily as new ones: songs from a sixties band were as likely as modern hits. And a new song needs few hearings. / One study found a tune was more likely to stick after six plays than after two. A supermarket plays it six times an hour. // [J]
In their experiments, a song that kept playing right after it ended was likely to return as an earworm within a day. / It tended to come back during easy, low-effort moments. //
People who play or listen to a lot of music get more of them, and the rate falls with age. / Dave owns a ukulele. This explains a great deal. // [J]
And it isn't rare. A survey of twelve and a half thousand Finnish internet users found that nearly nine in ten had an earworm at least once a week. //
So Dave isn't cursed. He's ordinary. The other nine in ten are, at this moment, either carrying a tune or about to. // [J]
Dave's Brain looks up from a very tall stack of books. / "You gave me eight seconds of material, Dave. I'm only using what I've got." (@brain) // [J]
Which leaves one question. How do you get a tune out? //

# chapter: Finishing the tune
Hyman's team had a theory, and it's one you've probably heard. It's called the Zeigarnik effect. //
The story goes that a psychologist noticed a waiter who remembered unpaid orders perfectly, and forgot them the moment they were paid. / The psychologist Bluma Zeigarnik tested it in nineteen twenty-seven. //
The idea: an unfinished task nags at your memory until you finish it. / So an unfinished tune should nag too. And the cure is simple. Play the whole song, and close the loop. //
There's some support for the cure itself. / When researchers sorted over a thousand reports of how people react to earworms, one of the most popular and effective responses was to seek out the tune. / Another was musical or verbal distraction. //
First, Dave tries the obvious thing. He sits down and tries not to think about the bouncy bit. He lasts eleven seconds. // [J]
So he plays the whole jingle, all the way to the end. //
It works for exactly two hours. Then the bouncy bit is back, and now it has company: the ending. // [J]
Which is a problem for the theory. //

# chapter: The test it fails
In twenty twenty-five, the psychologists Romain Ghibellini and Beat Meier at the University of Bern pulled together the evidence on the Zeigarnik effect. They found thirty-eight studies. //
The memory advantage for unfinished tasks largely vanished. Interrupted and finished tasks were recalled about equally often, a ratio of point nine nine. A coin toss. // [J]
The authors suggest the original result may belong to its time, when people treated experimenters as figures of great authority. //
And Hyman's own earworm experiments didn't back the idea up either. / When students heard only part of a song instead of the whole track, they were no more likely to get an earworm. //
So the popular explanation does not explain. The cure may still work, but not for the reason on the packet. //
One piece of the old idea does survive. / People resumed an interrupted task about two-thirds of the time, a pull to go back. Whether it applies to tunes is untested. //
What the evidence does support is plainer. Familiar. Recent. A mind with room to spare. And one more ingredient. //

# chapter: Gum
In two thousand fifteen, Philip Beaman's team at the University of Reading tried something different. / They suspected that hearing a tune in your head leans on the same machinery you use to speak. //
Earlier work had shown that chewing gum interferes with remembering words, and with scanning a familiar melody in your head. //
So forty-four students heard the chorus of a pop song twice, then were asked not to think about it for three minutes. / Of all the things done to students in the name of science, that one is cruel. // [J]
They did it twice, once chewing gum and once not. Chewing reduced the number of times the tune came back, wanted or not. / //
In two more experiments, gum affected the experience of hearing the tune, not only thinking about it, and tapping your fingers helped less than chewing did. //
The idea: your inner voice runs partly on your mouth's planning system. Chew, and you jam the line. //
So the cure has a reason after all. Not unfinished business, but a busy mouth. // [J]
It was three small experiments with one song, and a lab tune is not a three-day jingle. / But a test that lasted three minutes beats three days. // [J]
Here's the honest toolkit. Gum is the only remedy tested in a lab. / Playing the whole tune, or something else, was popular and effective in people's reports. / And a puzzle that's too hard is the wrong tool. Dave buys gum. //

# chapter: The next one
Dave chews through the whole afternoon. The bouncy bit begins to fade, and for the first time in three days, he hears the office. //
Hyman's team had also found that challenging puzzles, like a hard sudoku, raised the rate of earworms rather than cutting it. / So Dave skips the sudoku, and the crossword, and anything with a deadline. //
By evening, a different tune arrives. Dave notices it, and doesn't panic. //
Most earworms, after all, are not a problem. / In that study of over a thousand reports, many were neutral or pleasant, and passive acceptance and enjoyment were among the most common responses. //
For a small number of people, an earworm is distressing, and that deserves real help, not gum. For most, it's a passing tune. //
It isn't the bouncy bit. Dave checks twice. //
(slow) He lets this one play, and hums quietly, and chews.
