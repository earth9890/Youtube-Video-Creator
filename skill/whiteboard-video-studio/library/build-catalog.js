#!/usr/bin/env node
// ===================== library/build-catalog.js — asset index for agents (node, no deps) =====================
// node library/build-catalog.js  ->  catalog.json (one line per asset, read by scripts/lib.py and build.py `// @library auto`),
// INDEX.md (<= 6 KB overview), manifest.js (file list for index.html). A file that throws is logged and skipped.
// Not an asset file: build.py's `// @library` skips build-catalog.js and manifest.js.
// getBuiltinModule + argv (not require/__dirname): also runs when a parent package.json says "type": "module"
const fs = process.getBuiltinModule("fs"), path = process.getBuiltinModule("path"), vm = process.getBuiltinModule("vm");
const D = path.dirname(path.resolve(process.argv[1])), BASE = ["core", "people", "stylelab"], NOT_ASSETS = ["build-catalog", "manifest"];
const t0 = Date.now();
// same order as build.py: core, people, stylelab, then the rest sorted by file name
const rest = fs.readdirSync(D).filter((f) => f.endsWith(".js")).sort().map((f) => f.slice(0, -3)).filter((f) => !BASE.includes(f) && !NOT_ASSETS.includes(f));
const FILES = BASE.concat(rest);
// person option tables (pose/face/outfit/... values) -> which file added each key
const TABLES = ["CAST", "BODIES", "POSES", "POSE_LEGS", "LEGS", "FACES", "VISEMES", "OUTFITS", "HAIR", "ACC", "LOOKS"];

global.window = {};
const files = {}, broken = {}, owner = new Map(), defs = {}, tables = {};
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
for (const f of FILES) {
  const src = fs.readFileSync(path.join(D, f + ".js"), "utf8"), L0 = window.L || {};
  const before = (L0.ITEMS || []).slice(), cats = (L0.CATS || []).slice(), props = new Set(Object.keys(L0));
  const keys = Object.fromEntries(TABLES.map((t) => [t, new Set(Object.keys(L0[t] || {}))]));
  try {
    new vm.Script("(function(){" + src + "\n})()", { filename: f + ".js" }).runInThisContext({ timeout: 4000 }); // own scope, like require
  } catch (e) {
    if (f === "core") throw e;
    broken[f] = String(e.message || e).split("\n")[0].slice(0, 160);
    console.error(`skip ${f}.js: ${broken[f]}`);
    if (window.L) { window.L.ITEMS = before; window.L.CATS = cats; }
    continue;
  }
  const L = window.L, old = new Set(before);
  L.ITEMS.forEach((it) => old.has(it) || owner.set(it, f));
  Object.keys(L).forEach((k) => props.has(k) || (defs[k] = f));
  TABLES.forEach((t) => Object.keys(L[t] || {}).forEach((k) => keys[t].has(k) || ((tables[t] = tables[t] || {})[k] = f)));
  files[f] = { kb: +(src.length / 1024).toFixed(1), n: 0, src };
}
const L = window.L, names = new Set(L.ITEMS.map((i) => i.name));

// ---- render every asset once (with its demo) to measure it and record the assets it inlines ----
const UNIVERSAL = new Set(["s", "t", "flip", "rot", "parent", "look"]);
const svg0 = L.svg, person0 = L.person, stack = [], deps = {}, usesPerson = new Set();
L.svg = (n, o) => {
  if (typeof n !== "string") return svg0(n, o);
  if (stack.length) deps[stack[stack.length - 1]].add(n);
  stack.push(n); deps[n] = deps[n] || new Set();
  try { return svg0(n, o); } finally { stack.pop(); }
};
if (person0) L.person = (o) => { if (stack.length) usesPerson.add(stack[stack.length - 1]); return person0(o); };
const err0 = console.error; console.error = () => {};
const items = L.ITEMS.map((it) => {
  const src = it.fn.toString(), demo = Object.assign({}, it.defaults || {}, it.demo || {});
  let out = "";
  try { out = L.svg(it.name, demo); } catch (e) { out = "<!-- " + e.message + " -->"; }
  // option keys: demo/defaults + the names in the call's { … } + o.key reads in the asset function
  const opts = new Set(Object.keys(demo));
  const brace = /\{([^{}]*)\}/.exec(it.call || "");
  if (brace) brace[1].split(",").forEach((p) => { const m = /^\s*([A-Za-z_]\w*)/.exec(p); if (m) opts.add(m[1]); });
  for (const m of src.matchAll(/\bo\.([A-Za-z_]\w*)/g)) opts.add(m[1]);
  UNIVERSAL.forEach((k) => opts.delete(k));
  // known values per option: demo values, o.key === "v" comparisons, o.key || "v" defaults
  const vals = {};
  const addV = (k, v) => { if (typeof v === "string" && v.length < 24 && !UNIVERSAL.has(k)) (vals[k] = vals[k] || new Set()).add(v); };
  Object.entries(demo).forEach(([k, v]) => addV(k, v));
  for (const m of src.matchAll(/\bo\.(\w+)\s*(?:===?|!==?|\|\||\?\?)\s*["']([^"'\s]+)["']/g)) addV(m[1], m[2]);
  if (files[owner.get(it)]) files[owner.get(it)].n++;
  const e = { name: it.name, cat: it.cat };
  if (it.group) e.group = it.group;
  if (it.label && it.label !== it.name) e.label = it.label;
  if (it.tags && it.tags.length) e.tags = [...new Set(it.tags.map(String))];
  e.call = it.call; e.box = it.box; e.file = owner.get(it) || "?";
  if (opts.size) e.opts = [...opts];
  const vv = Object.fromEntries(Object.entries(vals).filter(([k]) => opts.has(k)).map(([k, s]) => [k, [...s]]));
  if (Object.keys(vv).length) e.vals = vv;
  const d = [...(deps[it.name] || [])].filter((n) => n !== it.name && names.has(n));
  if (d.length) e.deps = d;
  if (usesPerson.has(it.name) || it.selfScale) e.person = 1;
  e.kb = +(out.length / 1024).toFixed(1);
  if (out.includes("<!--")) e.err = 1; // L.svg turns a throw (or a missing inlined asset) into a comment
  return e;
});
console.error = err0;

// ---- file-level deps (bundling safety net): L.* helpers defined by another file, asset names passed to
// L.inline/L.svg (exact, or a pattern for `sky-${k}` / "sky-" + k), person option values (pose: "run"), inlined assets ----
const nameFile = Object.fromEntries(items.map((i) => [i.name, i.file]));
const valFile = {};
Object.values(tables).forEach((m) => Object.entries(m).forEach(([k, f]) => (valFile[k] = valFile[k] || f)));
const PERSON_KEYS = /\b(?:style|body|pose|legs|face|mouth|outfit|hair|acc)\s*:\s*(\[[^\]]*\]|["'][\w-]+["'])/g;
for (const f of Object.keys(files)) {
  const src = files[f].src, need = new Set();
  if (!BASE.includes(f)) {
    for (const m of src.matchAll(/\bL\.([A-Za-z_$][\w$]*)/g)) if (defs[m[1]]) need.add(defs[m[1]]);
    for (const m of src.matchAll(/\bL\.(?:inline|svg)\(\s*(["'`])(.*?)\1/g)) { // (L.put strings in meta.call are docs, not calls)
      const a = m[2];
      if (nameFile[a]) { need.add(nameFile[a]); continue; }
      const segs = a.split(/\$\{[^}]*\}|["'`]\s*\+.*/); // dynamic name: match the fixed parts in order
      if ((segs.length > 1 || a.endsWith("-")) && segs[0].length > 2) { const re = new RegExp("^" + segs.map((x) => x.replace(/[.*+?^$()|[\]\\]/g, "\\$&")).join(".*")); items.forEach((i) => re.test(i.name) && need.add(i.file)); }
    }
    for (const m of src.matchAll(PERSON_KEYS)) for (const v of m[1].matchAll(/["']([\w-]+)["']/g)) if (valFile[v[1]]) need.add(valFile[v[1]]);
    items.filter((i) => i.file === f).forEach((i) => (i.deps || []).forEach((n) => need.add(nameFile[n])));
    BASE.forEach((b) => need.delete(b)); need.delete(f); need.delete(undefined);
  }
  files[f].deps = [...need].sort();
  delete files[f].src;
}

// ---- write (tmp + rename: other agents may read while we write) ----
const write = (name, text) => { const p = path.join(D, name), tmp = `${p}.${process.pid}.tmp`; fs.writeFileSync(tmp, text); fs.renameSync(tmp, p); };
const cat = {
  // t0 = start time (ms): lib.py rebuilds the catalog when a library file is newer
  v: 1, t0, built: new Date().toISOString(), n: items.length, files, broken, colors: Object.keys(L.BASE),
  defs: Object.fromEntries(Object.entries(defs).filter(([, f]) => !BASE.includes(f))),
  tables: Object.fromEntries(Object.entries(tables).map(([t, m]) => [t, m])),
};
const head = JSON.stringify(cat);
write("catalog.json", head.slice(0, -1) + ',"items":[\n' + items.map((i) => JSON.stringify(i)).join(",\n") + "\n]}\n");
write("manifest.js", "// generated by build-catalog.js: every library category file, for index.html (a missing file is skipped)\nwindow.LIB_FILES = " + JSON.stringify(rest.filter((f) => !broken[f])) + ";\n");

// ---- INDEX.md (<= 6 KB) ----
const byCat = {};
items.forEach((i) => { const c = (byCat[i.cat] = byCat[i.cat] || { n: 0, files: new Set(), groups: {} }); c.n++; c.files.add(i.file); c.groups[i.group || "-"] = (c.groups[i.group || "-"] || 0) + 1; });
const pre = {};
items.forEach((i) => { const p = i.name.includes("-") ? i.name.split("-")[0] + "-" : i.name.replace(/\d+$/, "NN"); pre[p] = (pre[p] || 0) + 1; });
const prefixes = Object.entries(pre).sort((a, b) => b[1] - a[1]);
const CLI = "python3 ~/.claude/skills/whiteboard-video-studio/scripts/lib.py";
const md = (np) => `# Asset library index
Generated by \`node library/build-catalog.js\` (${cat.built.slice(0, 16)}Z): ${items.length} assets, ${Object.keys(byCat).length} categories, ${Object.keys(files).length} files.${Object.keys(broken).length ? ` Skipped (throws): ${Object.keys(broken).join(", ")}.` : ""}
**Never read library/*.js to find an asset.** Search with the CLI; it prints the exact call.

## Search and use
\`\`\`sh
${CLI} find car driver        # ranked: name | cat/group | tags | exact call  (--cat C, -n 10, --json)
${CLI} show <name>            # call, options + allowed values, box/origin, KB, file, deps
${CLI} cats | groups <cat> | names <prefix>
${CLI} check scenes.js        # unknown names / person options -> did-you-mean, exit 1
\`\`\`
In scenes.js put \`// @library auto\` (build.py bundles only the files your names need; \`// @library auto,sky\` forces extra files).

## Conventions
- \`L.put(S, name, x, y, { s, t, flip, rot, ...opts })\`; \`t\` = fade in on that word (\`W(clip, word)\`).
- Origins: standing things (people, trees, houses, furniture, vehicles, animals) = feet/bottom centre on the ground (\`gy\`);
  floating things (props, icons, effects) = centre; backgrounds/scenes/rooms = top-left, place at \`0, 0\` (1920x1080).
- Time of day: outdoor \`*-day | *-sunset | *-night\` or \`{ time }\`; rooms \`room-*-light | room-*-dark\`.
- People: \`L.put(S, "person", x, gy, { style: "man01", body, skin, hair, outfit, acc: [...], face, pose })\`;
  cast tiles \`man01…man10\`, \`girl01…girl10\`; \`pose-*\`, \`face-*\`, \`outfit-*\`, \`hair-*\`, \`acc-*\` tiles show the option values.
- Name prefixes: ${prefixes.slice(0, np).map(([p, n]) => `\`${p}\` ${n}`).join(" · ")}

## Categories (assets) · groups
${Object.entries(byCat).map(([c, v]) => `- **${c}** (${v.n}; ${[...v.files].join(", ")})${v.groups["-"] === v.n ? "" : ": " + Object.entries(v.groups).map(([g, n]) => `${g} ${n}`).join(" · ")}`).join("\n")}
`;
let np = 40, text = md(np);
while (Buffer.byteLength(text) > 6000 && np > 5) text = md((np -= 5));
write("INDEX.md", text);
console.log(`catalog: ${items.length} assets from ${Object.keys(files).length} files${Object.keys(broken).length ? `, skipped ${Object.keys(broken).join(",")}` : ""}, ${items.filter((i) => i.err).length} render errors, ${Date.now() - t0} ms`);
