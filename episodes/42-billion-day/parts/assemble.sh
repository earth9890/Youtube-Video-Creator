#!/bin/sh
# parts -> scenes.js (+ thumbnails/helpers.js = everything before the timing block)
cd "$(dirname "$0")"
cat 00-base.js 01-cast.js 02-props.js 1*.js > ../scenes.js
cat 00-base.js 01-cast.js 02-props.js > ../thumbnails/helpers.js
