# Episode 40: "What If You Drank 100 Energy Drinks?" (long form, ~8 min). What-if escalation engine (story-engine.md §3), counted in cans (1 -> 3 -> 4 -> 5 -> 100 -> "decaf, sugar-free" 100). Narrator: The Storyteller, calm, slightly-too-honest guide. Test dummy: Dave. Recurring voice: Dave's Brain, the tired librarian from ep38. One line from a calm doctor (the get-help line).
# cast: dave=22393bee,brain=7f7a5b5c,doc=a2e5e553
# Runner object: the hundred cans on Dave's kitchen table, ten rows of ten, each with a tiny "HIGH CAFFEINE CONTENT" label; a can counter ticks up and a stack of "reasons to stop" sticky notes grows beside it. Second runner: the library of Dave's brain, where adenosine = tired visitors who need a chair, caffeine = look-alikes who sit in the chairs and do nothing, and the tired ones queue in the corridor. The queue grows every chapter and sits down in the last scene.
# Planted line: the Brain's "I'm not out of energy. I'm out of day." (0:35) pays off in the last scene (the tiredness was there all along, waiting for a seat). "Long before can one hundred, the problem isn't even the caffeine" (0:25) pays off at the twist (the first ingredient: water).
# SAFETY: thought experiment, said aloud at 0:30 ("Dave is a drawing... please don't try this"). Everything past can one is "on paper". No lethal or harmful doses are stated; only health-body limits (EFSA 200 mg single dose, FDA/EFSA 400 mg a day, NHS 30 g sugar) and the totals of the premise (twenty times the day's guidance). Danger said plainly with the DAWN hospital figures; the doctor tells viewers to get medical help if they feel unwell. No brands named or drawn (plain cans). No "challenge" framing. Hyponatremia is explained calmly, never shown graphically.
# Sources: see sources.md (FDA "Spilling the Beans" 2024; EFSA caffeine opinion 2015; BfR Opinion 018/2019; healthdirect Australia; NZ HealthEd energy-drinks sheet; NHS "Sugar: the facts"; IFIC 2026; Institute of Medicine 2001 "Pharmacology of Caffeine"; Reichert, Deboer & Landolt 2022; Porkka-Heiskanen 1999; RCSB PDB-101; SAMHSA DAWN Report 2013; Harvard Nutrition Source; StatPearls Physiology, Blood Volume; Institute of Medicine 2005 water DRI; Noakes et al. 2001; Joo & Kim 2013; Cleveland Clinic water intoxication).
# Solid vs inference, as said in the script: the per-can caffeine and sugar, the limits, absorption, half-life, the litre studies, the warning-label rule, the hospital figures, the water and kidney numbers are published. "Tiredness is partly made from used-up energy" is our plain reading of adenosine as a breakdown product of ATP (said with "partly"); "the tiredness waits in the corridor" is our reading of how a receptor blocker works (caffeine does not remove adenosine); the hundred-can totals and the "can's worth at three in the morning" are our arithmetic (flagged in sources.md).
# Lint: script_lint.py --long: PASS, 0 fails, 1 warning (jokes in the last 15 %: "library flooded" and "first word on the list" at 87–90 % are the twist's punch, not new gags; the landing chapter itself is joke-free). 1,391 words, 79 clips (64 of them 12–30 words, none under 6), 17 joke beats (~2.1/min), 27 % sentences <= 5 words; character lines 127 words (9 %). Beats: 12, 1 AND, 6 BUT, 4 THEREFORE, 1 SO (92 % causal, 50 % BUT). Twist starts at 74 %. Runtime ~8.3 min at the measured 2.8 words/s plus gaps.
# engine: what-if
# want: Dave is tired and wants never to be tired again; his theory is that energy comes in cans, so a hundred cans means a hundred times the energy
# obstacle: caffeine adds no energy, it hides tiredness; and every can stacks up a new reason to stop (limits, heart, sleep, sugar), until even the water in the can is a danger
# stakes: Dave's heart, his night's sleep, his kidneys and the salt balance of his blood; and what tiredness really is
# question: what would happen if you drank a hundred energy drinks? (spoken ~0:20; answered at ~88 %: you'd never get near a hundred, and even a hundred cans of nothing but water would be dangerous)
# change: Dave carries the cans back to the fridge; the tiredness he was hiding was there all along, waiting for a seat, and he lets it sit down
# beat: AND Dave is tired; he lines up a hundred cans on the kitchen table: if one can gives you energy, a hundred should give a hundred times more
# beat: BUT he won't get near a hundred, so what stops him, and when? (the question, with a promise: can three, can five, and a last problem that isn't the caffeine); the Brain: "not out of energy, out of day"
# beat: THEREFORE can one: about eighty milligrams, absorbed within forty-five minutes; Dave feels the energy
# beat: BUT caffeine has no calories; the only fuel in the can is up to seven teaspoons of sugar, nearly the NHS day limit; "energy drink" is a name the food industry made up
# beat: THEREFORE what is it doing in his head? adenosine, a leftover of burnt brain fuel, builds up the longer you're awake: tiredness is partly made of used-up energy
# beat: BUT caffeine sits in adenosine's chairs without switching them on: it doesn't give energy, it hides tiredness; the tired ones queue in the corridor
# beat: THEREFORE cans three to five: past EFSA's two hundred milligram single dose; a litre at once gave some young adults palpitations, tremor, nausea, heart-rhythm changes; can five is the FDA's whole-day amount; a hundred warning labels
# beat: BUT the caffeine doesn't leave with the buzz: half-life about five hours; a can's worth still in him at three in the morning; tired and awake at the same time
# beat: THEREFORE said plainly: large amounts can be dangerous; about twenty thousand emergency visits in twenty eleven; the doctor: get help; the hundred, on paper: twenty times the day's caffeine, up to seven hundred teaspoons of sugar
# beat: BUT last hope: Dave goes caffeine-free and sugar-free
# beat: BUT the twist: the first ingredient is water; twenty-five litres, five times his blood; kidneys max out near a litre an hour; hyponatremia; the scariest ingredient was the first word on the list
# beat: SO the answer: you'd never get near a hundred; every can stacks a reason; Dave puts the cans back; the caffeine leaves the chairs and the tiredness that was there all along sits down
# Self-score (script-writer.md §9): spine 4, turns 4, hook 4, one idea 4, Joke Law 3, density 3, narrator 4, dummy 4, evidence 4, escalation 4, callback 4, rhythm 3 = 45/48

# chapter: A hundred cans
This is Dave. Dave has lined up a hundred cans of energy drink on his kitchen table, in ten neat rows of ten. //
Dave is tired. And Dave has a theory. If one can gives you energy, then a hundred cans should give you a hundred times more. // [J]
"A hundred cans. I am never going to be tired again." (@dave) //
So what would happen if you drank a hundred energy drinks? / The honest answer comes first. Dave will never get anywhere near a hundred. //
The interesting part is what stops him, and when. Every can adds a new reason, and the last one isn't the one you'd guess. //
By can three, he's past what Europe's food safety experts call fine in one go. / By can five, he has used up a whole day's worth of caffeine. /
And long before can one hundred, the problem isn't even the caffeine. //
Luckily, Dave is a drawing, so he can do all of this on paper. You are not a drawing, so please don't try this one. //
Somewhere behind Dave's eyes, a small, tired voice clears its throat. It's his brain. She's a librarian, and she has been on shift since seven this morning. /
"Dave, I'm not out of energy. I'm out of day." (@brain) // [J]

# chapter: Can one
Dave opens can number one. A typical small can holds two hundred and fifty millilitres, and usually about eighty milligrams of caffeine. /
That's roughly the same as a cup of instant coffee. Within about forty-five minutes, almost all of it has moved from his gut into his blood. /
"There it is. I can feel the energy kicking in." (@dave) //
Here's the thing. Caffeine has no calories. If energy means fuel, the kind your body can burn, the only fuel in that can is the sugar. /
And there's a lot of it. Some small cans carry up to seven teaspoons. / Britain's health service says adults should have no more than thirty grams of free sugars a day. /
One small can, and Dave has nearly finished his sugar for the whole day. It's ten past four. // [J]
And the name itself? America's Food and Drug Administration points out that the term energy drink was developed by the food industry. /
So energy drink isn't a science word. It's a marketing word. // [J]
But Dave definitely feels something. So if the caffeine isn't fuel, what is it doing inside his head? //

# chapter: The chairs
All day, while Dave's brain works, it burns through its main fuel molecule. One of the leftovers is a substance called adenosine. /
In animal brains, adenosine builds up the longer they stay awake. Scientists think it's one of the ways a brain keeps count of its shift. /
So tiredness is partly made from used-up energy. It's the wrapper left over from the day. // [J]
To be felt, adenosine has to slot into receptors on your brain cells. Think of them as chairs. The more chairs that fill, the sleepier you feel. /
Caffeine is shaped enough like adenosine to sit in the same chairs. But it doesn't switch anything on. / It just sits there, taking up the seat. // [J]
"Excuse me. That seat is for tiredness. And you're not even reading." (@brain) // [J]
So here's the turn. Caffeine doesn't give Dave energy. It hides his tiredness. //
And the adenosine doesn't leave. It waits in the corridor, / and every hour that Dave stays awake, a few more of them join the queue. /
"So I'm not less tired. I just can't see the queue?" (@dave) // [J]
"Correct, Dave. And it's getting longer by the hour." (@brain) //
He will meet that queue again later. For now, paper Dave reaches for can number two. And then three. // [J]

# chapter: Cans three to five
Cans two and three take paper Dave to two hundred and forty milligrams of caffeine, in about an hour. /
Europe's food safety authority says single doses of up to about two hundred milligrams don't raise safety concerns for healthy adults. Dave is already past it. //
Can four makes a whole litre. In studies where healthy young adults drank about a litre of energy drink at once, /
some got a pounding heart, shortness of breath, shaky muscles and bad nausea. Some studies even found changes in the electrical pattern of their heartbeat. /
"Why is my hand doing that? I didn't ask it to." (@dave) // [J]
Can five brings him to four hundred milligrams. That's the amount the Food and Drug Administration says is not generally linked to negative effects, for most adults. /
That's meant to cover a whole day. Dave has managed it in one afternoon. // [J]
In Europe, drinks like these with more than a hundred and fifty milligrams of caffeine per litre have to carry a warning: high caffeine content. /
So Dave's kitchen table holds a hundred little warnings, and he has drunk five of them. // [J]
The Food and Drug Administration lists what too much caffeine can do. / A faster heart rate, palpitations, high blood pressure, anxiety, jitters, an upset stomach, nausea, headaches, and trouble sleeping. /
And the caffeine doesn't leave when the buzz does. In healthy adults, the body takes about five hours to clear half of it, and sometimes much longer. /
So if Dave stopped at five cans at five o'clock, there would still be about a can's worth inside him at three in the morning. /
Europe's food safety authority says even a hundred milligrams close to bedtime can affect sleep in some adults. /
Dave wanted to stop being tired. Instead, he gets to be tired and awake at the same time. // [J]

# chapter: The hundred, on paper
So let's be plain about this part. Large amounts of caffeine can be dangerous, and people have ended up in hospital. /
In twenty eleven, American emergency departments saw more than twenty thousand visits involving energy drinks, roughly double the number four years earlier. /
The report noted that large amounts of caffeine can cause a fast heartbeat, and even seizures, severe enough to need emergency care. //
"If caffeine ever leaves you with a racing heart, chest pain, or feeling really unwell, please get medical help straight away." (@doc) //
And all one hundred cans? On paper, that's twenty times the caffeine the Food and Drug Administration cites for a whole day, in one sitting. /
Plus up to seven hundred teaspoons of sugar. That's about three months of Britain's daily sugar limit, gone before dinner. // [J]

# chapter: The first ingredient
"Fine. Then I'll have a hundred with no caffeine and no sugar." (@dave) //
All right. Take out the caffeine. Take out the sugar. Take out everything that makes it an energy drink. / So what's left inside the can? //
The first ingredient on the label. Harvard's public health school puts it plainly: after water, sugar is the main ingredient in energy drinks. /
An energy drink is mostly water. And a hundred cans is twenty-five litres, about five times all the blood in Dave's body. //
Here's the part nobody thinks about. Your kidneys have a speed limit. / Even working flat out, healthy kidneys can only get rid of roughly seven hundred millilitres to a litre of water an hour. /
Twenty-five litres would keep Dave's kidneys working flat out for more than a whole day. / Dave would see a lot of his bathroom. // [J]
Drink far faster than your kidneys can keep up, and the extra water stays inside you. It dilutes the salt in your blood. Doctors call it hyponatremia. /
Water moves into your cells, and they swell. In the brain, which is boxed in by the skull, that can be very dangerous. //
"Dave, I am a librarian. I do not want the library flooded." (@brain) // [J]
So even with no caffeine and no sugar, a hundred cans in one go would still be dangerous. /
The scariest ingredient was never hidden in the small print. It was the very first word on the list. // [J]

# chapter: Waiting for a seat
So what would happen if you drank a hundred energy drinks? You would never get anywhere near a hundred. /
Every can stacks up another reason to stop. The caffeine limit, the heart, the sleep, the sugar, and finally the water itself. //
Off the paper, Dave only ever opened one can. He carries the other ninety-nine back to the fridge. /
Around eleven, most of the caffeine has drifted out of the chairs. / And the tiredness that's been waiting in the corridor all evening walks in and sits down. //
"Finally. Quiet, please. The library is closing now." (@brain) //
(slow) Dave lined up a hundred cans so he would never be tired again. / But the tiredness was there all along. //
(slow) It was just waiting for a seat.
