#!/bin/sh
# parts -> scenes.js (+ thumbnails/helpers.js = everything before the timing block)
cd "$(dirname "$0")"
cat 00-base.js 01-world.js 02-moon.js 03-props.js 09-timing.js 1*.js > ../scenes.js
cat 00-base.js 01-world.js 02-moon.js 03-props.js > ../thumbnails/helpers.js
