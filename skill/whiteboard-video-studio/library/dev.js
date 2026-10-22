// ===================== library/dev.js — developer & tech-news visuals: code, terminals, UIs, repos, architecture, hardware/AI, news cards =====================
// Built for dark (#17181d) AND paper backgrounds: every thing is a filled card/shape (no loose ink strokes on the bare background),
// dark windows carry a light rim. Code text uses the Mono font with colour tokens only (see TH below).
(function () {
const L = window.L, f1 = L.f1;
const sh = L.shape, fl = L.flat, rr = L.rrect, ci = L.circ, st = L.stroke, poly = L.poly, sm = L.smooth, G = L.g, T = L.text;
const cat = "dev";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
let _id = 0; const cid = (p) => `dv${p}${++_id}`;
const R = (name, label, group, tags, fn, meta = {}) => L.reg(cat, name, fn, Object.assign({ box: [-200, -200, 400, 400], label, group, tags: ["dev", "tech", ...tags],
  call: `L.put(S, "${name}", x, ${meta.stand ? "gy" : "y"}, { s: 1, t${meta.hint ? ", " + meta.hint : ""} })` }, meta));
const F = (d, [n, t], op) => fl(d, L.c(n, t || 0), op);                 // flat fill with [colour, tone]
const rect = (x, y, w, h) => L.rect(x, y, w, h);
const bar = (x, y, w, h, c = "gray", op = 1, tone = 0) => F(rr(x, y, w, h, h / 2), [c, tone], op); // a "text line" / pill without outline
const outl = (d, w = "prop", s = 1) => L.tag("path", { d, fill: "none", stroke: L.outline(), "stroke-width": L.lw(w, s), "stroke-linejoin": L.T.join, "stroke-linecap": L.T.cap });
const rim = (d, op = 0.2, w = 2) => L.tag("path", { d, fill: "none", stroke: L.c("white"), "stroke-opacity": op, "stroke-width": w });
const clipped = (inner, d) => { const id = cid("k"); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const at = (inner, x, y, k = 1, r = 0) => G(inner, `translate(${f1(x)} ${f1(y)})${r ? ` rotate(${r})` : ""}${k !== 1 ? ` scale(${k})` : ""}`);
const mono = (str, x, y, size, c = ["white", 0], o = {}) => L.tag("text", { x, y, "font-family": L.FONTS.Mono, style: "font-variant-ligatures:none;white-space:pre", "font-size": size, "font-weight": o.weight || 600, "text-anchor": o.anchor || "start", fill: L.c(c[0], c[1] || 0), opacity: o.op }, esc(str));
const heart = (cx, cy, k) => `M${cx} ${cy + 9 * k} C${cx - 14 * k} ${cy - 2 * k} ${cx - 12 * k} ${cy - 14 * k} ${cx - 5 * k} ${cy - 14 * k} C${cx - 1 * k} ${cy - 14 * k} ${cx} ${cy - 10 * k} ${cx} ${cy - 8 * k} C${cx} ${cy - 10 * k} ${cx + 1 * k} ${cy - 14 * k} ${cx + 5 * k} ${cy - 14 * k} C${cx + 12 * k} ${cy - 14 * k} ${cx + 14 * k} ${cy - 2 * k} ${cx} ${cy + 9 * k} Z`;
const bolt = (cx, cy, k = 1) => poly([[2, -12], [-8, 2], [-1, 2], [-4, 12], [8, -4], [1, -4]].map(([x, y]) => [cx + x * k, cy + y * k]), true);
const num = (n) => (n >= 1e6 ? f1(n / 1e6) + "M" : n >= 1e4 ? f1(n / 1e3) + "k" : n >= 1e3 ? f1(n / 1e3) + "k" : String(n));
const wrap = (s, n) => { const out = []; let cur = ""; String(s).split(/\s+/).forEach((w) => { if ((cur + " " + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }); if (cur) out.push(cur); return out; };

// ---------------------------------------------------------------- themes + tokenizer
const TH = {
  dark: { body: ["navy", 0], bar: ["navy", 2], gut: ["navy", 2], tx: ["white", 0], dim: ["gray", 0], kw: ["purple", 1], str: ["green", 1], num: ["orange", 1], fn: ["blue", 1], cm: ["gray", 0], ty: ["yellow", 0], pn: ["gray", 1], at: ["orange", 1], tag: ["red", 1], key: ["blue", 1], err: ["red", 1], ok: ["green", 1], warn: ["yellow", 0], rim: true, tintOp: 0.26, hlOp: 0.11, hl: ["white", 0] },
  light: { body: ["white", 0], bar: ["paper", 2], gut: ["paper", 0], tx: ["ink", 0], dim: ["gray", 2], kw: ["purple", 0], str: ["green", 2], num: ["orange", 2], fn: ["blue", 0], cm: ["gray", 2], ty: ["teal", 2], pn: ["gray", 2], at: ["orange", 2], tag: ["red", 2], key: ["blue", 2], err: ["red", 2], ok: ["green", 2], warn: ["orange", 2], rim: false, tintOp: 0.3, hlOp: 0.4, hl: ["yellow", 1] },
};
const KW = {
  js: "const let var function return if else for while do import from export default async await new class extends try catch finally throw switch case break continue typeof instanceof of in yield static void delete",
  py: "def class return if elif else for while import from as with try except finally raise lambda pass yield async await in not and or is del global assert",
  rs: "fn let mut pub use mod struct enum impl trait match if else for while loop return async await move ref where as const static unsafe crate self Self dyn type",
  go: "func package import var const type struct interface return if else for range switch case default go defer chan map select break continue fallthrough",
  sh: "if then else fi for do done while case esac function in export",
  sql: "select from where insert into values update set delete create table index join left right inner outer on group by order having limit as and or not null primary key references alter drop distinct union",
  css: "", html: "", json: "",
};
KW.ts = KW.js + " interface type enum implements readonly public private protected abstract declare namespace keyof";
const KWS = {}; Object.keys(KW).forEach((k) => (KWS[k] = new Set(KW[k].split(" ").filter(Boolean))));
const LITS = new Set("true false null undefined None True False nil NaN self this Some Ok Err".split(" "));
const CM = { js: "\\/\\/.*|\\/\\*.*?\\*\\/", py: "#.*", sh: "#.*", sql: "--.*", css: "\\/\\*.*?\\*\\/", html: "<!--.*?-->", json: "(?!)" };
CM.ts = CM.rs = CM.go = CM.js;
// line -> [[col, text, key]] where key is a TH colour key. A tiny regex lexer, good enough for 10 languages at video-frame sizes.
const tok = (line, lang) => {
  if (KWS[lang] === undefined) lang = "js";
  line = line.replace(/\t/g, "  ");
  const wordRe = /css|html|sh/.test(lang) ? "-{0,2}[A-Za-z_$@][\\w$-]*" : "[A-Za-z_$@][\\w$]*";
  const numRe = (lang === "css" ? "#[0-9a-fA-F]{3,8}\\b|" : "") + "\\d[\\d_]*(?:\\.\\d+)?(?:px|rem|em|vh|vw|%|ms|s)?";
  const re = new RegExp(`(${CM[lang]})|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)|(${numRe})|(${wordRe})|(\\s+)|([^])`, "g");
  const out = []; let m, first = true;
  const colon = line.indexOf(":");
  while ((m = re.exec(line))) {
    if (m[5]) continue;
    const s = m[0], nx = line[re.lastIndex], nx2 = line.slice(re.lastIndex).trimStart()[0];
    let k = "tx";
    if (m[1]) k = "cm";
    else if (m[2]) k = lang === "json" && nx2 === ":" ? "key" : "str";
    else if (m[3]) k = "num";
    else if (m[4]) {
      const w = lang === "sql" ? s.toLowerCase() : s, prev = line.slice(Math.max(0, m.index - 2), m.index);
      if (lang === "html") k = /<\/?$/.test(prev) ? "tag" : nx === "=" ? "at" : "tx";
      else if (lang === "css") k = nx2 === ":" && m.index < colon + 1 ? "key" : /\{\s*$/.test(line) ? "ty" : colon >= 0 && m.index > colon ? "str" : "tx";
      else if (lang === "sh") k = first ? "fn" : s[0] === "-" ? "at" : "tx";
      else if (KWS[lang].has(w)) k = "kw";
      else if (LITS.has(s)) k = "num";
      else if (nx === "(" || (nx === "!" && line[re.lastIndex + 1] === "(")) k = "fn";
      else if (/^[A-Z]/.test(s)) k = "ty";
      first = false;
    } else if (/[{}()[\];,.:<>=+\-*/&|!?]/.test(s)) k = "pn";
    const last = out[out.length - 1];
    if (last && last[2] === k && last[0] + last[1].length === m.index) last[1] += s; else out.push([m.index, s, k]);
  }
  return out;
};
// rows: [{ t, lang, sign, tint, hl, n, pre: [[text,key]] }] drawn from (0,0) down; w = band width. Returns markup.
const codeRows = (rows, o) => {
  const { size, theme, w, gw, sw } = o, Tm = TH[theme], cw = size * 0.6, lh = size * 1.55, out = [];
  rows.forEach((r, i) => {
    const y = i * lh, by = y + lh / 2 + size * 0.34;
    if (r.tint) out.push(F(rect(0, y, w, lh), [r.tint, 0], Tm.tintOp), F(rect(0, y, 5, lh), [r.tint, theme === "dark" ? 1 : 0]));
    if (r.hl) out.push(F(rect(0, y, w, lh), Tm.hl, Tm.hlOp), F(rect(0, y, 5, lh), ["yellow", 0]));
    if (o.nums !== false) out.push(mono(String(r.n ?? i + 1), gw - size * 0.55, by, size * 0.82, Tm.dim, { anchor: "end", op: 0.75, weight: 500 }));
    if (r.sign) out.push(mono(r.sign, gw + cw * 0.35, by, size, [r.sign === "+" ? "green" : "red", theme === "dark" ? 1 : 2], { weight: 700 }));
    const toks = r.pre ? r.pre.map(([s, k], j) => [r.pre.slice(0, j).reduce((a, p) => a + p[0].length, 0), s, k]) : tok(r.t, r.lang);
    if (!toks.length) return;
    out.push(L.tag("text", { y: by, "font-family": L.FONTS.Mono, style: "font-variant-ligatures:none;white-space:pre", "font-size": size, "font-weight": 500 },
      toks.map(([c, s, k]) => L.tag("tspan", { x: gw + sw + c * cw, fill: L.c(Tm[k][0], Tm[k][1]) }, esc(s))).join("")));
  });
  return out.join("");
};
// window frame, origin top-left. bar = title-bar height. Returns { under (shadow + body + bar), over (outline + rim) }.
const topRR = (w, h, r) => { r = Math.min(r * L.T.radius, w / 2, h / 2); return `M0 ${f1(h)} V${f1(r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(r)} 0 H${f1(w - r)} A${f1(r)} ${f1(r)} 0 0 1 ${f1(w)} ${f1(r)} V${f1(h)} Z`; };
const shell = (w, h, tb, theme, rad = 20) => {
  const Tm = TH[theme];
  return { under: F(rr(10, 14, w, h, rad), ["ink", 0], 0.18) + F(rr(0, 0, w, h, rad), Tm.body) + F(topRR(w, tb, rad), Tm.bar) + F(rect(0, tb - 2, w, 2), ["ink", 0], theme === "dark" ? 0.4 : 0.12),
    over: outl(rr(0, 0, w, h, rad)) + (Tm.rim ? rim(rr(3, 3, w - 6, h - 6, rad - 2), 0.22, 2.5) : "") };
};
const dots = (tb, x0 = 30) => [["red", x0], ["yellow", x0 + tb * 0.55], ["green", x0 + tb * 1.1]].map(([c, x]) => F(ci(x, tb / 2, tb * 0.17), [c, 0])).join("");
const LANGC = { js: "yellow", ts: "blue", py: "teal", rs: "orange", go: "sky", sh: "gray", json: "pink", html: "red", css: "purple", sql: "green" };
const centre = (inner, w, h) => G(inner, `translate(${f1(-w / 2)} ${f1(-h / 2)})`);

// ---------------------------------------------------------------- 1. code window
const DEMO_JS = ["import { serve } from \"runtime\";", "", "const app = async (req) => {", "  const name = req.query.name ?? \"world\";", "  return new Response(`Hello, ${name}!`);", "};", "", "serve(app, { port: 3000 }); // done"].join("\n");
const codeWin = (o) => {
  const lang = o.lang || "js", theme = o.theme || "dark", size = o.size || 26, Tm = TH[theme], cw = size * 0.6, lh = size * 1.55;
  const diff = !!o.diff, all = String(o.code ?? DEMO_JS).split("\n"), hl = new Set(o.hl || []);
  const rows = all.map((t, i) => { let sign = ""; if (diff && (t[0] === "+" || t[0] === "-")) { sign = t[0]; t = t.slice(1).replace(/^ /, ""); } return { t, lang, sign, tint: sign ? (sign === "+" ? "green" : "red") : (o.tints || {})[i + 1] || null, hl: hl.has(i + 1), pre: o.marks && /^(<{7}|={7}|>{7})/.test(t) ? [[t, "dim"]] : null }; });
  const nums = o.nums !== false, digits = String(all.length).length, gw = nums ? cw * Math.max(2, digits) + size * 1.15 : size * 0.7, sw = diff ? cw * 2.3 : 0;
  const tb = Math.round(size * 1.95), pad = Math.round(size * 0.65), maxc = Math.max(8, ...all.map((t) => (diff ? t.replace(/^[+-] ?/, "") : t).length));
  const w = Math.round(o.w || Math.max(size * 16, Math.min(gw + sw + maxc * cw + pad * 2, 1500))), h = Math.round(tb + pad * 1.1 + all.length * lh + pad * 0.6);
  const body = rows.slice(0, o.lines === undefined ? rows.length : o.lines);
  const sc = shell(w, h, tb, theme);
  let bar_ = dots(tb);
  const f = o.file, chipW = size * 1.9;
  if (f) {
    const tx = tb * 1.1 + 62, tw = Math.max(size * 5, f.length * size * 0.56 + size * 2.4);
    bar_ += L.tag("path", { d: topRR(tw, tb * 0.78, 10), transform: `translate(${f1(tx)} ${f1(tb * 0.22 + 1)})`, fill: L.c(Tm.body[0], Tm.body[1]) }) + F(ci(tx + size * 0.7, tb * 0.61, size * 0.2), [LANGC[lang] || "gray", 0]) + mono(f, tx + size * 1.15, tb * 0.61 + size * 0.2, size * 0.62, Tm.tx, { weight: 500 });
  } else if (o.title) bar_ += mono(o.title, w / 2, tb / 2 + size * 0.2, size * 0.62, Tm.dim, { anchor: "middle", weight: 500 });
  if (o.badge !== false) bar_ += F(rr(w - chipW - 22, tb * 0.24, chipW, tb * 0.52, tb * 0.2), [LANGC[lang] || "gray", 0]) + mono(lang.toUpperCase(), w - chipW / 2 - 22, tb * 0.24 + tb * 0.52 / 2 + size * 0.2, size * 0.58, ["ink", 0], { anchor: "middle", weight: 800 });
  const gutter = nums ? F(rect(0, tb, gw, h - tb), Tm.gut, theme === "dark" ? 0.55 : 0.7) : "";
  const inner = gutter + at(codeRows(body, { size, theme, w, gw, sw, nums }), 0, tb + pad * 0.8);
  LAST = { w, h };
  return centre(sc.under + bar_ + clipped(inner, rr(0, 0, w, h, 20)) + sc.over, w, h);
};
let LAST = { w: 0, h: 0 };
const codeBox = (w, h) => [-w / 2 - 24, -h / 2 - 14, w + 60, h + 60];
const RC = (name, label, group, tags, fn, meta = {}) => { fn(meta.demo || {}); R(name, label, group, tags, fn, Object.assign({ box: codeBox(LAST.w, LAST.h) }, meta)); }; // box from the demo's real size
RC("dev-code", "Code window (editor)", "Code & terminal", ["code", "editor", "programming", "snippet", "syntax", "ide", "developer", "javascript"], codeWin, {
  hint: 'code: "line1\\nline2", lang: "js|ts|py|rs|go|sh|json|html|css|sql", file: "app.js", hl: [3], lines: n, diff: false, w, size: 26, theme: "dark|light"',
  demo: { file: "server.js", hl: [4] } });
RC("dev-code-light", "Code window · light", "Code & terminal", ["code", "editor", "light", "paper", "snippet", "programming"], (o) => codeWin(Object.assign({ theme: "light" }, o)), {
  hint: 'code, lang, file, hl, lines', demo: { file: "server.js", hl: [4] } });
const PY = ["def greet(name: str) -> str:", "    \"\"\"Say hello.\"\"\"", "    return f\"Hello, {name}\"", "", "for user in [\"ada\", \"linus\"]:", "    print(greet(user))  # 2 calls"].join("\n");
RC("dev-code-python", "Code window · Python", "Code & terminal", ["code", "python", "snippet", "script", "programming"], (o) => codeWin(Object.assign({ lang: "py", code: PY, file: "main.py" }, o)), {
  hint: 'code, file, hl, lines', demo: { hl: [3] } });
const RS = ["fn main() {", "    let nums = vec![1, 2, 3];", "    let total: i32 = nums.iter().sum();", "    println!(\"sum = {}\", total);", "}"].join("\n");
RC("dev-code-rust", "Code window · Rust", "Code & terminal", ["code", "rust", "snippet", "systems", "programming"], (o) => codeWin(Object.assign({ lang: "rs", code: RS, file: "main.rs" }, o)), {
  hint: 'code, file, hl, lines', demo: {} });
const JSON_ = ["{", "  \"name\": \"stack-doodle\",", "  \"version\": \"2.0.0\",", "  \"private\": true,", "  \"engines\": { \"node\": \">=24\" }", "}"].join("\n");
RC("dev-code-json", "Code window · JSON config", "Code & terminal", ["json", "config", "package", "settings", "file"], (o) => codeWin(Object.assign({ lang: "json", code: JSON_, file: "package.json", w: 560 }, o)), {
  hint: 'code, file, hl', demo: { hl: [3] } });
const DIFF_ = ["  const user = await db.find(id);", "- if (user.role == \"admin\") {", "+ if (user?.role === \"admin\") {", "    grantAccess(user);", "  }"].join("\n");
RC("dev-code-diff", "Code window · diff (+/-)", "Code & terminal", ["diff", "patch", "fix", "change", "commit", "code review"], (o) => codeWin(Object.assign({ diff: true, code: DIFF_, file: "auth.ts", lang: "ts" }, o)), {
  hint: 'code: lines starting + / -, lang, file', demo: {} });
const SQL_ = ["SELECT name, COUNT(*) AS posts", "FROM users", "JOIN posts ON posts.user_id = users.id", "WHERE users.active = true", "GROUP BY name;"].join("\n");
RC("dev-code-sql", "Code window · SQL", "Code & terminal", ["sql", "query", "database", "select"], (o) => codeWin(Object.assign({ lang: "sql", code: SQL_, file: "report.sql" }, o)), {
  hint: 'code, file, hl', demo: {} });
const HTML_ = ["<main class=\"hero\">", "  <h1 id=\"title\">Hello</h1>", "  <a href=\"/docs\">Read the docs</a>", "</main>"].join("\n");
RC("dev-code-html", "Code window · HTML", "Code & terminal", ["html", "markup", "web", "page", "tags"], (o) => codeWin(Object.assign({ lang: "html", code: HTML_, file: "index.html" }, o)), {
  hint: 'code, file, hl', demo: {} });
const CSS_ = [".card {", "  display: grid;", "  gap: 16px;", "  color: #3a4a6e;", "  border-radius: 12px;", "}"].join("\n");
RC("dev-code-css", "Code window · CSS", "Code & terminal", ["css", "style", "web", "design"], (o) => codeWin(Object.assign({ lang: "css", code: CSS_, file: "style.css", w: 560 }, o)), {
  hint: 'code, file, hl', demo: {} });

// ---------------------------------------------------------------- 2. terminal
const termColour = (t, i, err) => /^(error|err |fatal|✗|Error|npm ERR|panic|!)/.test(t) || err.has(i) ? "err" : /^(warn|WARN|Warning|deprecated)/i.test(t) ? "warn" : /^(✓|ok\b|OK\b|success|done|added|Done)/.test(t) ? "ok" : "dim";
const termWin = (o) => {
  const theme = o.theme || "dark", size = o.size || 26, Tm = TH[theme], cw = size * 0.6, lh = size * 1.55;
  const lines = o.lines || ["$ npm install", "added 312 packages in 4s", "$ node server.js", "listening on :3000"], err = new Set(o.err || []);
  const tb = Math.round(size * 1.95), pad = Math.round(size * 0.7), maxc = Math.max(10, ...lines.map((l) => l.length + 1));
  const w = Math.round(o.w || Math.max(size * 16, Math.min(maxc * cw + pad * 2.2, 1500))), h = Math.round(tb + pad * 1.4 + lines.length * lh);
  const sc = shell(w, h, tb, theme), out = [];
  lines.forEach((l, i) => {
    const y = i * lh + lh / 2 + size * 0.34 + pad * 0.5, pm = /^([$%>#]) /.exec(l);
    if (pm) {
      out.push(mono(pm[1], pad, y, size, Tm.ok, { weight: 700 }));
      const toks = tok(l.slice(2), "sh");
      out.push(L.tag("text", { y, "font-family": L.FONTS.Mono, style: "font-variant-ligatures:none;white-space:pre", "font-size": size, "font-weight": 500 }, toks.map(([c, s, k]) => L.tag("tspan", { x: pad + (c + 2) * cw, fill: L.c(Tm[k][0], Tm[k][1]) }, esc(s))).join("")));
    } else {
      const k = termColour(l, i, err);
      if (k === "err" && /^(error|Error|npm ERR|fatal|!)/.test(l)) out.push(F(rect(0, i * lh + pad * 0.5, w, lh), ["red", 0], Tm.tintOp * 0.8), F(rect(0, i * lh + pad * 0.5, 5, lh), ["red", theme === "dark" ? 1 : 0]));
      out.push(L.tag("text", { x: pad, y, "font-family": L.FONTS.Mono, style: "font-variant-ligatures:none;white-space:pre", "font-size": size, "font-weight": 500, fill: L.c(Tm[k][0], Tm[k][1]) }, esc(l)));
    }
  });
  if (o.cursor !== false) { const li = lines.length - 1, last = lines[li], x = pad + (last.length + (/^[$%>#] /.test(last) ? 1 : 0)) * cw + cw * 0.2;out.push(F(rect(x, li * lh + pad * 0.5 + lh * 0.14, cw * 0.95, lh * 0.72), Tm.tx, 0.9)); }
  const inner = at(out.join(""), 0, tb + pad * 0.4);
  LAST = { w, h };
  return centre(sc.under + dots(tb) + mono(o.title || "terminal", w / 2, tb / 2 + size * 0.2, size * 0.62, Tm.dim, { anchor: "middle", weight: 500 }) + clipped(inner, rr(0, 0, w, h, 20)) + sc.over, w, h);
};
RC("dev-terminal", "Terminal window", "Code & terminal", ["terminal", "shell", "command line", "cli", "console", "bash"], termWin, {
  hint: 'lines: ["$ npm i", "output…"], err: [indexes], title, cursor: true, theme: "dark|light"', demo: {} });
RC("dev-terminal-error", "Terminal · build failed", "Code & terminal", ["terminal", "error", "build", "fail", "red", "crash"], (o) => termWin(Object.assign({ lines: ["$ npm run build", "compiling 128 modules...", "Error: cannot find module './config'", "  at build (src/main.js:42)", "✗ build failed in 2.1s"], err: [3] }, o)), {
  hint: 'lines, err', demo: {} });
RC("dev-terminal-light", "Terminal window · light", "Code & terminal", ["terminal", "shell", "light", "paper", "cli"], (o) => termWin(Object.assign({ theme: "light" }, o)), {
  hint: 'lines, err', demo: {} });

// ---------------------------------------------------------------- 3. browser, phone, chat
const panel = (x, y, w, h, c = "white", o = {}) => F(rr(x + 8, y + 12, w, h, o.r || 18), ["ink", 0], 0.16) + sh(rr(x, y, w, h, o.r || 18), c, { w: o.w || "prop", flat: true, tone: o.tone });
const chev = (x, y, d, c = ["gray", 1]) => L.tag("path", { d: `M${x - 5 * d} ${y - 9} L${x + 5 * d} ${y} L${x - 5 * d} ${y + 9}`, fill: "none", stroke: L.c(c[0], c[1]), "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" });
const lockIcon = (x, y, k = 1) => F(rr(x - 7 * k, y - 2 * k, 14 * k, 11 * k, 3), ["green", 1]) + L.tag("path", { d: `M${x - 4 * k} ${y - 2 * k} V${y - 6 * k} A${4 * k} ${4 * k} 0 0 1 ${x + 4 * k} ${y - 6 * k} V${y - 2 * k}`, fill: "none", stroke: L.c("green", 1), "stroke-width": 2.4 * k, "stroke-linecap": "round" });
// page layouts for the browser content slot: drawn in (0,0,w,h)
const pageArt = (kind, w, h, th) => {
  const dk = th === "dark", ink = dk ? ["white", 0] : ["ink", 0], sk = dk ? ["navy", 1] : ["gray", 1], out = [];
  const nav = () => out.push(F(ci(46, 38, 15), ["teal", 0]), bar(78, 31, 70, 14, ink[0], 0.8), bar(w - 340, 32, 56, 12, sk[0], 1, sk[1]), bar(w - 260, 32, 56, 12, sk[0], 1, sk[1]), bar(w - 180, 32, 56, 12, sk[0], 1, sk[1]), F(rr(w - 108, 22, 70, 32, 16), ["blue", 0]));
  if (kind === "hero") {
    nav();
    out.push(bar(60, h * 0.3, w * 0.4, 30, ink[0], 0.92), bar(60, h * 0.3 + 46, w * 0.31, 30, ink[0], 0.92), bar(60, h * 0.3 + 104, w * 0.36, 12, sk[0], 1, sk[1]), bar(60, h * 0.3 + 128, w * 0.28, 12, sk[0], 1, sk[1]), F(rr(60, h * 0.3 + 168, 150, 46, 23), ["blue", 0]), bar(84, h * 0.3 + 186, 100, 10, "white", 0.9), F(rr(224, h * 0.3 + 168, 120, 46, 23), sk));
    const ax = w * 0.58, ay = 92, aw = w * 0.36, ah = h - 150;
    out.push(clipped(F(rect(ax, ay, aw, ah), ["sky", 0]) + F(ci(ax + aw * 0.72, ay + ah * 0.25, ah * 0.12), ["yellow", 0]) + F(sm([[ax, ay + ah * 0.7], [ax + aw * 0.3, ay + ah * 0.45], [ax + aw * 0.6, ay + ah * 0.72], [ax + aw, ay + ah * 0.5], [ax + aw, ay + ah], [ax, ay + ah], [ax, ay + ah * 0.7]]), ["green", 0]) + F(sm([[ax, ay + ah * 0.88], [ax + aw * 0.4, ay + ah * 0.7], [ax + aw, ay + ah * 0.9], [ax + aw, ay + ah], [ax, ay + ah], [ax, ay + ah * 0.88]]), ["grass", 2]), rr(ax, ay, aw, ah, 24)), outl(rr(ax, ay, aw, ah, 24), "detail"));
  } else if (kind === "cards") {
    nav();
    const cw = (w - 120 - 40) / 3, ch = h - 150;
    [["orange", 0], ["teal", 1], ["purple", 2]].forEach(([c], i) => {
      const x = 60 + i * (cw + 20), y = 90;
      out.push(F(rr(x, y, cw, ch, 16), dk ? ["navy", 2] : ["paper", 0]), clipped(F(rect(x, y, cw, ch * 0.45), [c, 0]) + F(ci(x + cw / 2, y + ch * 0.22, 26), ["white", 0], 0.9), rr(x, y, cw, ch, 16)), outl(rr(x, y, cw, ch, 16), "detail"),
        bar(x + 16, y + ch * 0.55, cw * 0.7, 14, ink[0], 0.85), bar(x + 16, y + ch * 0.55 + 28, cw * 0.55, 10, sk[0], 1, sk[1]), bar(x + 16, y + ch * 0.55 + 46, cw * 0.62, 10, sk[0], 1, sk[1]), F(rr(x + 16, y + ch - 44, 60, 26, 13), [c, 0]));
    });
  } else if (kind === "docs") {
    const sw = w * 0.25;
    out.push(F(rect(0, 0, sw, h), dk ? ["navy", 2] : ["paper", 0]), F(rect(sw - 2, 0, 2, h), ["ink", 0], 0.12), F(ci(40, 38, 15), ["teal", 0]), bar(70, 31, 80, 14, ink[0], 0.8));
    [0, 1, 2, 3, 4, 5].forEach((i) => { if (i === 2) out.push(F(rr(14, 78 + i * 38 - 8, sw - 28, 30, 10), ["blue", 0], 0.18)); out.push(bar(34, 80 + i * 38, sw * (i % 3 ? 0.5 : 0.62), 12, i === 2 ? "blue" : sk[0], 1, i === 2 ? 0 : sk[1])); });
    const x = sw + 44;
    out.push(bar(x, 44, w * 0.34, 28, ink[0], 0.92), bar(x, 96, w * 0.55, 11, sk[0], 1, sk[1]), bar(x, 118, w * 0.5, 11, sk[0], 1, sk[1]), bar(x, 140, w * 0.42, 11, sk[0], 1, sk[1]));
    const cy = 176, cwid = w - x - 40;
    out.push(F(rr(x, cy, cwid, Math.min(130, h - cy - 90), 12), ["navy", 0]), bar(x + 22, cy + 22, cwid * 0.22, 11, "purple", 1, 1), bar(x + 22 + cwid * 0.25, cy + 22, cwid * 0.3, 11, "green", 1, 1), bar(x + 36, cy + 50, cwid * 0.4, 11, "blue", 1, 1), bar(x + 36 + cwid * 0.43, cy + 50, cwid * 0.16, 11, "orange", 1, 1), bar(x + 36, cy + 78, cwid * 0.26, 11, "white", 1), bar(x + 22, cy + 106, cwid * 0.1, 11, "gray", 1));
    const ty = cy + Math.min(130, h - cy - 90) + 26;
    out.push(bar(x, ty, w * 0.5, 11, sk[0], 1, sk[1]), bar(x, ty + 22, w * 0.44, 11, sk[0], 1, sk[1]));
  }
  return out.join("");
};
const browserWin = (o) => {
  const theme = o.theme || "light", Tm = TH[theme], w = o.w || 820, h = o.h || 560, tb = 56, ub = 62, tabs = o.tabs || ["Home"], act = o.active ?? 0;
  const sc = shell(w, h, tb + ub, theme, 22), rowC = theme === "dark" ? ["navy", 0] : ["white", 0], pill = theme === "dark" ? ["navy", 2] : ["paper", 1];
  const bg = F(rect(0, 0, w, tb), Tm.bar), tabsM = tabs.map((t, i) => {
    const x = 138 + i * 214, on = i === act, lab = t.length > 16 ? t.slice(0, 15) + "…" : t;
    return (on ? L.tag("path", { d: topRR(204, tb - 10, 12), transform: `translate(${x} 10)`, fill: L.c(rowC[0], rowC[1]) }) : F(rr(x + 203, 18, 2, 26, 1), ["gray", 1], 0.6)) + F(ci(x + 24, tb / 2 + 3, 8), [["blue", "orange", "green", "pink"][i % 4], 0], on ? 1 : 0.6) + T(lab, x + 42, tb / 2 + 10, { size: 21, anchor: "start", c: on ? (theme === "dark" ? "white" : "ink") : "gray" });
  }).join("");
  const row = F(rect(0, tb, w, ub), rowC) + chev(40, tb + ub / 2, -1) + chev(84, tb + ub / 2, 1, ["gray", 0]) + L.tag("path", { d: L.arc(132, tb + ub / 2, 10, -40, 250), fill: "none", stroke: L.c("gray", 1), "stroke-width": 4, "stroke-linecap": "round" }) +
    F(rr(166, tb + 11, w - 166 - 34, ub - 22, (ub - 22) / 2), pill) + lockIcon(196, tb + ub / 2 - 3) + mono(o.url || "stackdoodle.dev", 220, tb + ub / 2 + 7, 22, Tm.tx, { weight: 500 }) + F(ci(w - 54, tb + ub / 2, 4), ["gray", 1]) ;
  const cy = tb + ub, ch = h - cy, cb = F(rect(0, cy, w, ch), theme === "dark" ? ["navy", 0] : ["white", 0]);
  const content = (o.page && o.page !== "blank" ? pageArt(o.page, w, ch, theme) : "") + (o.inner || "");
  return centre(sc.under + clipped(bg + tabsM + row + cb, rr(0, 0, w, h, 22)) + clipped(at(content, 0, cy), rect(0, cy, w, ch)) + dots(tb, 30) + sc.over, w, h);
};
const bBox = (w, h) => [-w / 2 - 24, -h / 2 - 12, w + 60, h + 56];
R("dev-browser", "Browser window (blank slot)", "Browser & apps", ["browser", "window", "url", "website", "web", "tabs", "page"], browserWin, { box: bBox(820, 560), hint: 'url: "site.dev", tabs: ["Home", "Docs"], active: 0, page: "blank|hero|cards|docs", inner: "<svg markup in content coords>", w, h, theme', demo: { url: "stackdoodle.dev", tabs: ["Home", "New tab"] } });
R("dev-browser-hero", "Browser · landing page", "Browser & apps", ["browser", "website", "landing", "homepage", "hero", "web"], (o) => browserWin(Object.assign({ page: "hero", url: "launch.dev", tabs: ["Launch"] }, o)), { box: bBox(820, 560), hint: 'url, tabs, w, h', demo: {} });
R("dev-browser-cards", "Browser · card grid page", "Browser & apps", ["browser", "website", "cards", "store", "blog", "web"], (o) => browserWin(Object.assign({ page: "cards", url: "market.dev/new", tabs: ["Market", "Cart"] }, o)), { box: bBox(820, 560), hint: 'url, tabs, w, h', demo: {} });
R("dev-browser-docs", "Browser · docs page", "Browser & apps", ["browser", "documentation", "docs", "sidebar", "api", "reference", "web"], (o) => browserWin(Object.assign({ page: "docs", url: "docs.framework.dev/api", tabs: ["API reference"] }, o)), { box: bBox(820, 560), hint: 'url, tabs, w, h', demo: {} });

// phone
const phoneApp = (o) => {
  const dk = o.theme === "dark", screen = o.screen || "feed", W = 230, H = 450, sx = -W / 2 + 12, sy = -H / 2 + 14, sw = W - 24, shh = H - 28, out = [];
  const bgc = dk ? ["navy", 0] : ["white", 0], ink = dk ? "white" : "ink", sk = dk ? ["navy", 1] : ["gray", 1];
  out.push(F(rr(-W / 2 + 8, -H / 2 + 12, W, H, 38), ["ink", 0], 0.18), sh(rr(-W / 2, -H / 2, W, H, 38), "navy", { w: "prop", tone: 2 }));
  let s = F(rect(sx, sy, sw, shh), bgc);
  s += bar(sx + 20, sy + 14, 36, 8, ink, 0.7) + F(ci(sx + sw - 50, sy + 18, 4), [ink, 0], 0.7) + F(ci(sx + sw - 36, sy + 18, 4), [ink, 0], 0.7) + F(ci(sx + sw - 22, sy + 18, 4), [ink, 0], 0.7);
  s += F(rect(sx, sy + 40, sw, 52), dk ? ["navy", 2] : ["blue", 0]) + (o.title !== "" ? T(o.title || "Home", sx + sw / 2, sy + 76, { size: 26, c: "white" }) : "");
  const y0 = sy + 92;
  if (screen === "feed") {
    [0, 1].forEach((i) => {
      const y = y0 + 12 + i * 150;
      s += F(ci(sx + 34, y + 20, 15), [["orange", "teal"][i], 0]) + bar(sx + 58, y + 10, 70, 10, ink, 0.8) + bar(sx + 58, y + 26, 44, 8, sk[0], 1, sk[1]);
      s += F(rr(sx + 14, y + 44, sw - 28, 64, 12), [["sky", "yellow"][i], 0]) + F(sm([[sx + 14, y + 108], [sx + 60, y + 82], [sx + 110, y + 98], [sx + 150, y + 74], [sx + sw - 14, y + 96], [sx + sw - 14, y + 108], [sx + 14, y + 108]]), ["grass", 0]);
      s += sh(heart(sx + 30, y + 128, 0.8), "red", { w: "hair", flat: true }) + bar(sx + 56, y + 124, 38, 8, sk[0], 1, sk[1]);
    });
  } else if (screen === "list") {
    [0, 1, 2, 3, 4].forEach((i) => { const y = y0 + 16 + i * 56; s += F(rr(sx + 14, y, 36, 36, 10), [["pink", "teal", "orange", "purple", "green"][i], 0]) + bar(sx + 62, y + 6, sw - 100 - (i % 2) * 30, 11, ink, 0.8) + bar(sx + 62, y + 24, sw - 130, 8, sk[0], 1, sk[1]) + bar(sx + 14, y + 46, sw - 28, 1.5, sk[0], 0.5, sk[1]); });
  } else {
    s += T(o.value || "2.4M", sx + sw / 2, y0 + 80, { size: 62, c: ink }) + bar(sx + sw / 2 - 40, y0 + 98, 80, 9, sk[0], 1, sk[1]) + F(rr(sx + sw / 2 - 34, y0 + 116, 68, 26, 13), ["green", 0]) + T("+18%", sx + sw / 2, y0 + 136, { size: 18, c: "white" });
    const vals = [0.3, 0.45, 0.38, 0.6, 0.55, 0.8, 0.95];
    vals.forEach((v, i) => { s += F(rr(sx + 22 + i * 26, y0 + 300 - v * 130, 18, v * 130, 6), [i === 6 ? "orange" : "blue", 0]); });
    s += F(rect(sx + 18, y0 + 300, sw - 36, 2), sk);
  }
  s += F(rect(sx, sy + shh - 52, sw, 52), dk ? ["navy", 2] : ["paper", 2]) + [0, 1, 2].map((i) => F(ci(sx + sw * (0.2 + i * 0.3), sy + shh - 26, 9), [i === 0 ? "blue" : "gray", i === 0 ? 0 : 1])).join("");
  out.push(clipped(s, rr(sx, sy, sw, shh, 26)), F(rr(-26, -H / 2 + 22, 52, 12, 6), ["ink", 0], 0.9), outl(rr(sx, sy, sw, shh, 26), "detail"));
  return out.join("");
};
const pBox = [-150, -250, 320, 510];
R("dev-phone-app", "Phone · app feed", "Browser & apps", ["phone", "app", "mobile", "ios", "android", "social", "feed"], phoneApp, { box: pBox, hint: 'screen: "feed|list|stats", title, theme: "light|dark"', demo: { title: "Feed" } });
R("dev-phone-app-list", "Phone · app list", "Browser & apps", ["phone", "app", "mobile", "inbox", "list", "messages"], (o) => phoneApp(Object.assign({ screen: "list", title: "Inbox" }, o)), { box: pBox, hint: 'title, theme', demo: {} });
R("dev-phone-app-stats", "Phone · app stats", "Browser & apps", ["phone", "app", "mobile", "analytics", "growth", "downloads", "metrics"], (o) => phoneApp(Object.assign({ screen: "stats", title: "Users", theme: "dark" }, o)), { box: pBox, hint: 'value: "2.4M", title, theme', demo: {} });

// AI chat window
const chatWin = (o) => {
  const dk = (o.theme || "light") === "dark", Tm = TH[dk ? "dark" : "light"], w = o.w || 600, size = 22, lh = 30, maxc = Math.floor((w * 0.72) / (size * 0.55));
  const msgs = o.msgs || [{ r: "user", t: "Explain recursion in one line" }, { r: "ai", t: "A function that solves a problem by calling itself on a smaller version of the same problem." }, { r: "user", t: "Cute. Now do it in Rust?" }];
  const hdr = 66, pad = 22, gap = 16, lay = [];
  let y = hdr + pad;
  msgs.forEach((m) => { const ls = wrap(m.t, maxc), bw = Math.min(w * 0.76, Math.max(...ls.map((l) => l.length)) * size * 0.56 + 40), bh = ls.length * lh + 24; lay.push({ m, ls, bw, bh, y }); y += bh + gap; });
  if (o.typing) { lay.push({ typing: true, y, bw: 90, bh: 46 }); y += 46 + gap; }
  const inH = 74, h = Math.round(y + inH + 4), sc = shell(w, h, hdr, dk ? "dark" : "light", 24), out = [];
  out.push(F(ci(46, hdr / 2, 17), ["purple", 0]) + F(L.star(46, hdr / 2, 10, 4, 4), ["white", 0]) + T(o.title || "Assistant", 78, hdr / 2 + 9, { size: 26, anchor: "start", c: dk ? "white" : "ink" }) + F(ci(w - 40, hdr / 2, 5), ["green", 0]));
  lay.forEach((b) => {
    if (b.typing) { out.push(F(rr(pad + 4, b.y, b.bw, b.bh, 23), dk ? ["navy", 1] : ["paper", 2]), ...[0, 1, 2].map((i) => F(ci(pad + 4 + 28 + i * 18, b.y + 23, 6), ["gray", 0], 0.5 + i * 0.25))); return; }
    const user = b.m.r === "user", x = user ? w - pad - b.bw : pad + 4;
    out.push(sh(rr(x, b.y, b.bw, b.bh, 20), user ? "blue" : dk ? "navy" : "paper", { w: "detail", flat: true, tone: user ? 0 : dk ? 1 : 2 }));
    b.ls.forEach((l, i) => out.push(T(l, x + 20, b.y + 12 + lh * (i + 0.76), { size, anchor: "start", c: user ? "white" : dk ? "white" : "ink", weight: 600 })));
  });
  const iy = h - inH + 6;
  out.push(sh(rr(pad, iy, w - pad * 2, 52, 26), dk ? "navy" : "paper", { w: "detail", flat: true, tone: dk ? 2 : 1 }), bar(pad + 24, iy + 21, w * 0.34, 11, "gray", 1, dk ? 0 : 1), sh(ci(w - pad - 26, iy + 26, 19), "purple", { w: "detail", flat: true }), L.tag("path", { d: `M${w - pad - 26} ${iy + 35} V${iy + 18} M${w - pad - 33} ${iy + 25} L${w - pad - 26} ${iy + 17} L${w - pad - 19} ${iy + 25}`, fill: "none", stroke: L.c("white"), "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  LAST = { w, h };
  return centre(sc.under + clipped(F(rect(0, 0, w, h), dk ? ["navy", 0] : ["white", 0]) + out.join(""), rr(0, 0, w, h, 24)) + sc.over, w, h);
};
RC("dev-chat", "AI chat window", "Browser & apps", ["chat", "ai", "assistant", "chatbot", "llm", "conversation", "prompt", "messages"], chatWin, { hint: 'msgs: [{ r: "user"|"ai", t: "text" }], title, typing: true, theme: "light|dark", w', demo: {} });
RC("dev-chat-dark", "AI chat window · dark", "Browser & apps", ["chat", "ai", "assistant", "dark", "llm", "conversation"], (o) => chatWin(Object.assign({ theme: "dark", typing: true, msgs: [{ r: "user", t: "Why is my build failing?" }, { r: "ai", t: "Line 42 imports a file that no longer exists. Want me to fix it?" }] }, o)), { hint: 'msgs, title, typing, w', demo: {} });

R("dev-prompt-box", "Prompt input box", "Browser & apps", ["prompt", "input", "ai", "chat", "textbox", "search", "ask", "command"], (o) => {
  const w = o.w || 760, h = 156, x = -w / 2, y = -h / 2, txt = o.text ?? "Build me a todo app in Rust", out = [];
  out.push(panel(x, y, w, h, "white", { r: 36 }), T(txt, x + 40, y + 62, { size: 34, anchor: "start", c: "ink" }));
  const cx = x + 40 + Math.min(txt.length * 17.5, w - 220) + 8;
  out.push(F(rr(cx, y + 28, 5, 48, 2), ["blue", 0]));
  out.push(sh(ci(x + 52, y + h - 40, 20), "paper", { w: "detail", tone: 2, flat: true }), L.tag("path", { d: `M${x + 52} ${y + h - 50} V${y + h - 30} M${x + 42} ${y + h - 40} H${x + 62}`, fill: "none", stroke: L.c("gray", 2), "stroke-width": 4, "stroke-linecap": "round" }));
  ["Think", "Search"].forEach((c, i) => out.push(F(rr(x + 96 + i * 120, y + h - 60, 106, 40, 20), ["paper", 2]), T(c, x + 149 + i * 120, y + h - 32, { size: 22, c: "gray" })));
  out.push(sh(ci(x + w - 54, y + h - 42, 26), "purple", { w: "detail" }), L.tag("path", { d: `M${x + w - 54} ${y + h - 31} V${y + h - 53} M${x + w - 64} ${y + h - 43} L${x + w - 54} ${y + h - 54} L${x + w - 44} ${y + h - 43}`, fill: "none", stroke: L.c("white"), "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  return out.join("");
}, { box: [-420, -96, 860, 210], hint: 'text: "Build me a todo app", w', demo: {} });

// ---------------------------------------------------------------- 4. code-host & release furniture (generic: no real platform look-alikes)
const starIcon = (x, y, r, c = "yellow") => sh(L.star(x, y, r, r * 0.48, 5), c, { w: "hair", flat: true });
const forkIcon = (x, y, k = 1, c = "gray") => { const s = (d) => L.tag("path", { d, fill: "none", stroke: L.c(c, 1), "stroke-width": 3.4 * k, "stroke-linecap": "round", "stroke-linejoin": "round" }); return s(`M${x - 8 * k} ${y - 5 * k} v${5 * k} q0 ${6 * k} ${8 * k} ${6 * k} q${8 * k} 0 ${8 * k} ${-6 * k} v${-5 * k} M${x} ${y + 1 * k} V${y + 6 * k}`) + [[-8, -10], [8, -10], [0, 11]].map(([dx, dy]) => sh(ci(x + dx * k, y + dy * k, 4.6 * k), "white", { w: "hair", flat: true })).join(""); };
const dotC = (x, y, c, r = 9) => sh(ci(x, y, r), c, { w: "hair", flat: true });
const chip = (x, y, txt, c, o = {}) => { const size = o.size || 20, w = o.w || txt.length * size * 0.56 + 28, h = size * 1.7; return F(rr(x, y, w, h, h / 2), [c, o.tone || 0], o.op ?? 1) + T(txt, x + w / 2, y + h / 2 + size * 0.34, { size, c: o.tc || "white" }); };
const avatar = (x, y, ch, c, r = 20) => sh(ci(x, y, r), c, { w: "detail", flat: true }) + T(ch, x, y + r * 0.36, { size: r * 1.05, c: "white" });
const drop = (d, dx = 8, dy = 12) => L.tag("path", { d, transform: `translate(${dx} ${dy})`, fill: L.c("ink"), opacity: 0.18 });
const CB = (w, h) => [-w / 2 - 20, -h / 2 - 10, w + 56, h + 50];

R("dev-repo-card", "Repository card", "Repos & releases", ["repo", "repository", "github", "open source", "stars", "forks", "code host", "project"], (o) => {
  const w = 620, h = 270, x = -w / 2, y = -h / 2, nm = o.name || "acme/fastjs", out = [];
  out.push(panel(x, y, w, h, "white"), sh(rr(x + 28, y + 34, 28, 34, 6), "blue", { w: "detail" }), F(rr(x + 36, y + 46, 12, 4, 2), ["white", 0]), F(rr(x + 36, y + 56, 12, 4, 2), ["white", 0]));
  out.push(mono(nm, x + 74, y + 62, 32, ["blue", 0], { weight: 800 }), chip(x + w - 118, y + 34, "Public", "paper", { tone: 2, tc: "gray", size: 18, w: 84 }));
  wrap(o.desc || "A tiny, blazing-fast JSON toolkit for modern runtimes.", 42).slice(0, 2).forEach((l, i) => out.push(T(l, x + 30, y + 112 + i * 34, { size: 25, anchor: "start", c: "ink" })));
  (o.topics || ["json", "runtime"]).slice(0, 3).forEach((t, i) => out.push(chip(x + 30 + i * 112, y + 168, t, "blue", { op: 0.2, tc: "blue", size: 17, w: 98 })));
  const fy = y + h - 36, lc = o.langC || "yellow";
  out.push(dotC(x + 40, fy, lc, 10), T(o.lang || "JavaScript", x + 60, fy + 8, { size: 21, anchor: "start", c: "ink" }));
  out.push(starIcon(x + 238, fy - 1, 14), T(num(o.stars ?? 48200), x + 260, fy + 8, { size: 21, anchor: "start", c: "ink" }));
  out.push(forkIcon(x + 380, fy - 2, 1, "gray"), T(num(o.forks ?? 3100), x + 402, fy + 8, { size: 21, anchor: "start", c: "ink" }));
  return out.join("");
}, { box: CB(620, 270), hint: 'name: "owner/repo", desc, stars: 48200, forks: 3100, lang, langC: "yellow", topics: ["a","b"]', demo: {} });

const diffRows = (lines, lang) => lines.map((t) => { const s = t[0] === "+" || t[0] === "-" ? t[0] : ""; return { t: s ? t.slice(1).replace(/^ /, "") : t.replace(/^ /, ""), lang, sign: s, tint: s ? (s === "+" ? "green" : "red") : null }; });
R("dev-pr-diff", "Pull request + diff", "Repos & releases", ["pull request", "pr", "diff", "merge", "review", "code review", "change"], (o) => {
  const w = 700, size = 22, lines = o.lines || ["  if (!cache.has(key)) {", "- cache.set(key, load(key));", "+ cache.set(key, await load(key));", "+ log(\"miss\", key);", "  }"], h = 150 + 12 + lines.length * size * 1.55 + 12 + 22, x = -w / 2, y = -h / 2, out = [];
  const state = o.state || "merged", sc = { merged: ["purple", "Merged"], open: ["green", "Open"], closed: ["red", "Closed"] }[state] || ["purple", "Merged"];
  out.push(panel(x, y, w, h, "white"), sh(ci(x + 44, y + 52, 20), sc[0], { w: "detail" }));
  out.push(L.tag("path", { d: `M${x + 36} ${y + 44} v16 M${x + 36} ${y + 60} q0 -8 8 -8 h8 M${x + 52} ${y + 46} l8 6 l-8 6`, fill: "none", stroke: L.c("white"), "stroke-width": 3.4, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  out.push(T(o.title || "Fix race in scheduler", x + 82, y + 62, { size: 30, anchor: "start", c: "ink" }), T("#" + (o.num || 1423), x + w - 40, y + 62, { size: 26, anchor: "end", c: "gray" }));
  out.push(chip(x + 28, y + 96, sc[1], sc[0], { size: 19 }), T("+" + (o.add ?? 128), x + 140, y + 124, { size: 24, anchor: "start", c: "green" }), T("-" + (o.del ?? 34), x + 224, y + 124, { size: 24, anchor: "start", c: "red" }));
  [0, 1, 2, 3, 4].forEach((i) => out.push(F(rr(x + 312 + i * 22, y + 108, 17, 17, 4), [i < 4 ? "green" : "red", 0])));
  const by = y + 150, bh = h - 150 - 22, rows = diffRows(lines, "js");
  out.push(clipped(F(rect(x + 22, by, w - 44, bh), TH.dark.body) + at(codeRows(rows, { size, theme: "dark", w: w - 44, gw: 12, sw: size * 0.6 * 2.1, nums: false }), x + 22, by + 12), rr(x + 22, by, w - 44, bh, 14)), outl(rr(x + 22, by, w - 44, bh, 14), "detail"));
  return out.join("");
}, { box: CB(700, 400), hint: 'title, num, state: "merged|open|closed", add, del, lines: [" ctx", "- old", "+ new"]', demo: {} });

R("dev-commit-graph", "Commit graph (branch + merge)", "Repos & releases", ["git", "commit", "branch", "merge", "graph", "history", "version control", "log"], (o) => {
  const w = 640, rowH = 64, rows = 6, h = (rows - 1) * rowH + 76, x = -w / 2, y = -h / 2, out = [], lx = (l) => x + 52 + l * 54, ry = (r) => y + 38 + r * rowH;
  const msgs = o.msgs || ["merge feature/ai", "add model picker", "wire up streaming", "start feature branch", "fix typo in readme", "initial commit"];
  const hashes = ["e41b9d0", "9a07c3f", "5d2e81a", "b83f6c2", "01cd7e9", "7f2a4b6"];
  const E = [[0, 5, 0, 4, "blue"], [0, 4, 0, 3, "blue"], [0, 3, 0, 0, "blue"], [0, 3, 1, 2, "orange"], [1, 2, 1, 1, "orange"], [1, 1, 0, 0, "orange"]];
  out.push(panel(x, y, w, h, "white"));
  E.forEach(([la, ra, lb, rb, c]) => { const x1 = lx(la), y1 = ry(ra), x2 = lx(lb), y2 = ry(rb), ym = (y1 + y2) / 2; out.push(L.tag("path", { d: la === lb ? `M${x1} ${y1} L${x2} ${y2}` : `M${x1} ${y1} C${x1} ${ym} ${x2} ${ym} ${x2} ${y2}`, fill: "none", stroke: L.c(c, 0), "stroke-width": 7, "stroke-linecap": "round" })); });
  [[0, 0, "purple"], [1, 1, "orange"], [1, 2, "orange"], [0, 3, "blue"], [0, 4, "blue"], [0, 5, "blue"]].forEach(([l, r, c]) => out.push(sh(ci(lx(l), ry(r), r === 0 ? 17 : 13), "white", { w: "detail", flat: true }), F(ci(lx(l), ry(r), r === 0 ? 10 : 7), [c, 0])));
  msgs.slice(0, rows).forEach((m, i) => out.push(mono(hashes[i], x + 190, ry(i) + 7, 19, ["gray", 2], { weight: 600 }), T(m, x + 300, ry(i) + 9, { size: 23, anchor: "start", c: "ink" })));
  out.push(chip(x + w - 100, ry(0) - 17, o.branch || "main", "blue", { size: 17, w: 76 }));
  out.push(chip(x + w - 100, ry(1) - 17, o.feature || "feature", "orange", { size: 17, w: 76 }));
  return out.join("");
}, { box: CB(640, 396), hint: 'msgs: [6 commit messages], branch: "main", feature: "feature"', demo: {} });

R("dev-merge-conflict", "Merge conflict", "Repos & releases", ["merge conflict", "git", "conflict", "markers", "rebase", "error", "code"], (o) => {
  const code = o.code || ["function price(base) {", "<<<<<<< HEAD", "  return base * 1.2;", "=======", "  return base * 1.5;", ">>>>>>> feature/pricing", "}"].join("\n");
  const inner = codeWin({ code, lang: "js", file: o.file || "price.js", tints: { 2: "green", 3: "green", 5: "blue", 6: "blue" }, marks: true, badge: false, w: o.w });
  const w = LAST.w, h = LAST.h;
  const warn = at(sh(poly([[0, -26], [28, 22], [-28, 22]], true), "yellow", { w: "detail" }) + mono("!", 0, 14, 28, ["ink", 0], { anchor: "middle", weight: 800 }), 0, 0);
  return inner + at(F(rr(-4, 8, 220, 46, 23), ["ink", 0], 0.18) + sh(rr(-10, 0, 220, 46, 23), "red", { w: "detail" }) + T("CONFLICT", 108, 33, { size: 25, c: "white" }), w / 2 - 190, -h / 2 - 12) + at(warn, w / 2 - 190, -h / 2 + 10);
}, { box: [-420, -190, 860, 380], hint: 'code (with <<<<<<< ======= >>>>>>>), file', demo: {} });

R("dev-issue-card", "Issue card", "Repos & releases", ["issue", "bug report", "ticket", "github", "labels", "bug", "feature request"], (o) => {
  const w = 640, h = 230, x = -w / 2, y = -h / 2, out = [];
  out.push(panel(x, y, w, h, "white"), L.tag("path", { d: L.circ(x + 48, y + 56, 17), fill: "none", stroke: L.c("green", 0), "stroke-width": 5 }), F(ci(x + 48, y + 56, 6), ["green", 0]));
  wrap(o.title || "App crashes when the config file is empty", 29).slice(0, 2).forEach((l, i) => out.push(T(l, x + 84, y + 62 + i * 36, { size: 29, anchor: "start", c: "ink" })));
  out.push(T("#" + (o.num || 1832), x + w - 32, y + 40, { size: 22, anchor: "end", c: "gray" }));
  let lx = x + 30;
  (o.labels || [["bug", "red"], ["good first issue", "teal"], ["p1", "orange"]]).forEach(([t, c]) => { const cw = t.length * 11.5 + 30; out.push(chip(lx, y + 138, t, c, { size: 19, w: cw })); lx += cw + 10; });
  out.push(avatar(x + 40, y + h - 32, "A", "pink", 16), avatar(x + 66, y + h - 32, "L", "blue", 16));
  out.push(sh("M0 0 h30 a8 8 0 0 1 8 8 v12 a8 8 0 0 1 -8 8 h-14 l-9 8 v-8 h-7 a8 8 0 0 1 -8 -8 v-12 a8 8 0 0 1 8 -8 Z".replace(/^M0 0/, `M${x + w - 120} ${y + h - 48}`), "paper", { w: "hair", flat: true, tone: 2 }), T(String(o.comments ?? 12), x + w - 40, y + h - 28, { size: 22, anchor: "end", c: "gray" }));
  return out.join("");
}, { box: CB(640, 230), hint: 'title, num, labels: [["bug","red"]], comments', demo: {} });

R("dev-release-tag", "Release tag (v2.0)", "Repos & releases", ["release", "version", "tag", "v2", "launch", "semver", "new version", "ship"], (o) => {
  const c = o.c || "yellow", txt = o.v || "v2.0", light = ["blue", "purple", "red", "navy", "green", "teal"].includes(c), out = [];
  const body = L.smooth([[-170, 0], [-120, -70], [150, -70], [168, -52], [168, 52], [150, 70], [-120, 70], [-170, 0]]);
  out.push(drop(body), sh(body, c, { w: "prop" }), F(rr(-96, -58, 220, 11, 5), ["white", 0], 0.4));
  out.push(sh(ci(-118, 0, 13), "paper", { w: "detail", flat: true }), L.tag("path", { d: "M-118 0 C-160 -40 -190 -70 -150 -110", fill: "none", stroke: L.c("gold", 0), "stroke-width": 7, "stroke-linecap": "round" }));
  out.push(mono(txt, 20, 24, txt.length > 5 ? 64 : 84, [light ? "white" : "ink", 0], { anchor: "middle", weight: 800 }));
  [[170, -78, 16], [196, -40, 10], [-60, -100, 12]].forEach(([x, y, r]) => out.push(sh(L.star(x, y, r, r * 0.3, 4), "gold", { w: "hair", flat: true })));
  return out.join("");
}, { box: [-220, -130, 440, 250], hint: 'v: "v2.0", c: "yellow"', demo: {} });

R("dev-changelog", "Changelog / release notes", "Repos & releases", ["changelog", "release notes", "whats new", "update", "patch notes", "version", "breaking"], (o) => {
  const items = o.items || [["new", "Streaming responses"], ["new", "3x faster cold starts"], ["fix", "Memory leak in the cache"], ["break", "Node 20 support dropped"]], w = 560, h = 130 + items.length * 58, x = -w / 2, y = -h / 2, out = [];
  out.push(panel(x, y, w, h, "white"), chip(x + 28, y + 28, o.v || "v2.0", "yellow", { size: 26, tc: "ink", w: 92 }), T(o.title || "What's new", x + 140, y + 66, { size: 32, anchor: "start", c: "ink" }), F(rect(x + 28, y + 100, w - 56, 2), ["gray", 1], 0.7));
  items.forEach(([k, t], i) => {
    const cy = y + 150 + i * 58, ix = x + 52;
    if (k === "new") out.push(sh(ci(ix, cy, 17), "green", { w: "detail" }), L.tag("path", { d: `M${ix - 8} ${cy} h16 M${ix} ${cy - 8} v16`, stroke: L.c("white"), "stroke-width": 4.5, "stroke-linecap": "round" }));
    else if (k === "fix") out.push(sh(ci(ix, cy, 17), "orange", { w: "detail" }), L.tag("path", { d: `M${ix - 8} ${cy + 1} l6 6 l11 -13`, fill: "none", stroke: L.c("white"), "stroke-width": 4.5, "stroke-linecap": "round", "stroke-linejoin": "round" }));
    else out.push(sh(poly([[ix, cy - 19], [ix + 19, cy + 15], [ix - 19, cy + 15]], true), "red", { w: "detail" }), mono("!", ix, cy + 11, 20, ["white", 0], { anchor: "middle", weight: 800 }));
    out.push(T(t, x + 88, cy + 9, { size: 26, anchor: "start", c: "ink" }), T(k, x + w - 34, cy + 8, { size: 19, anchor: "end", c: "gray" }));
  });
  return out.join("");
}, { box: CB(560, 362), hint: 'v: "v2.0", title, items: [["new"|"fix"|"break", "text"]]', demo: {} });

// ---------------------------------------------------------------- 5. status furniture
R("dev-npm-install", "Package install progress", "Status & errors", ["npm", "install", "packages", "dependencies", "progress", "node_modules", "bloat", "download"], (o) => {
  const w = 680, h = 270, sc = shell(w, h, 52, "dark"), Tm = TH.dark, pct = o.pct ?? 0.72, cnt = o.count ?? 1284, out = [];
  out.push(mono("$", 30, 100, 28, Tm.ok, { weight: 700 }), mono(o.cmd || "npm install", 62, 100, 28, Tm.tx, { weight: 500 }));
  out.push(F(rr(30, 124, w - 60, 28, 14), ["navy", 2]), clipped(F(rect(30, 124, (w - 60) * pct, 28), ["green", 0]) + F(rect(30, 124, (w - 60) * pct, 10), ["white", 0], 0.25), rr(30, 124, w - 60, 28, 14)), mono(Math.round(pct * 100) + "%", w - 34, 175, 22, Tm.dim, { anchor: "end", weight: 600 }));
  out.push(mono("added " + cnt.toLocaleString("en-US") + " packages", 30, 208, 28, Tm.ok, { weight: 600 }), mono(o.note ?? "node_modules: 1.2 GB", 30, 244, 22, Tm.dim, { weight: 500 }));
  LAST = { w, h };
  return centre(sc.under + dots(52) + mono("terminal", w / 2, 33, 18, Tm.dim, { anchor: "middle", weight: 500 }) + clipped(out.join(""), rr(0, 0, w, h, 20)) + sc.over, w, h);
}, { box: codeBox(680, 270), hint: 'pct: 0.72, count: 1284, cmd: "npm install", note', demo: {} });

R("dev-error-toast", "Error toast", "Status & errors", ["error", "toast", "alert", "failed", "notification", "popup", "500", "red"], (o) => {
  const w = 600, h = 130, x = -w / 2, y = -h / 2, out = [];
  out.push(panel(x, y, w, h, "white"), clipped(F(rect(x, y, 14, h), ["red", 0]), rr(x, y, w, h, 18)), sh(ci(x + 64, y + h / 2, 28), "red", { w: "detail" }), L.tag("path", { d: `M${x + 54} ${y + h / 2 - 10} l20 20 M${x + 74} ${y + h / 2 - 10} l-20 20`, stroke: L.c("white"), "stroke-width": 6, "stroke-linecap": "round" }));
  out.push(T(o.title || "Something went wrong", x + 112, y + 54, { size: 30, anchor: "start", c: "ink" }), mono(o.msg || "500 Internal Server Error", x + 112, y + 94, 22, ["gray", 2], { weight: 500 }), L.tag("path", { d: `M${x + w - 44} ${y + 34} l16 16 M${x + w - 28} ${y + 34} l-16 16`, stroke: L.c("gray", 1), "stroke-width": 4, "stroke-linecap": "round" }));
  return out.join("");
}, { box: CB(600, 130), hint: 'title, msg', demo: {} });

R("dev-stack-trace", "Stack trace", "Status & errors", ["stack trace", "exception", "crash", "error", "traceback", "bug", "debug", "console"], (o) => {
  const size = 22, Tm = TH.dark, frames = o.frames || [["render", "app.js:88:14"], ["update", "core.js:204:9"], ["flush", "queue.js:31:5"], ["main", "index.js:12:3"]], hot = o.hot ?? 0;
  const rows = [{ pre: [["Uncaught TypeError: ", "err"], [o.msg || "x is undefined", "tx"]], tint: "red" }].concat(frames.map(([f, l], i) => ({ pre: [["  at ", "dim"], [f, "fn"], [" (" + l + ")", "dim"]], hl: i === hot })));
  const lh = size * 1.55, w = 740, h = 52 + 24 + rows.length * lh + 12, sc = shell(w, h, 52, "dark");
  LAST = { w, h };
  return centre(sc.under + dots(52) + mono("console", w / 2, 33, 18, Tm.dim, { anchor: "middle", weight: 500 }) + clipped(at(codeRows(rows, { size, theme: "dark", w, gw: 24, sw: 0, nums: false }), 0, 52 + 12), rr(0, 0, w, h, 20)) + sc.over, w, h);
}, { box: codeBox(740, 250), hint: 'msg, frames: [["fn","file:line"]], hot: 0', demo: {} });

R("dev-404", "404 page not found", "Status & errors", ["404", "not found", "error page", "missing", "broken link", "dead link", "web"], (o) => {
  const cx = 410, art = G(T("4", cx - 140, 215, { size: 190, c: "red" }) + T("4", cx + 140, 215, { size: 190, c: "red" }) +
    L.tag("path", { d: L.circ(cx, 150, 70, 76) + " " + L.circ(cx, 150, 40, 46), fill: L.c("red", 0), "fill-rule": "evenodd", stroke: L.outline("red"), "stroke-width": L.lw("detail") }) +
    F(ci(cx - 16, 140, 6), ["ink", 0]) + F(ci(cx + 16, 140, 6), ["ink", 0]) + L.tag("path", { d: L.arc(cx, 176, 14, 205, 335), fill: "none", stroke: L.c("ink"), "stroke-width": 4.5, "stroke-linecap": "round" }) +
    T(o.text || "Page not found", cx, 285, { size: 38, c: "ink" }) + bar(cx - 150, 310, 300, 12, "gray", 1, 1) + bar(cx - 110, 334, 220, 12, "gray", 1, 1) + F(rr(cx - 70, 362, 140, 42, 21), ["blue", 0]) + T("Go home", cx, 391, { size: 22, c: "white" }));
  return browserWin({ url: o.url || "stackdoodle.dev/oops", tabs: ["404"], inner: art, w: 820, h: 560 });
}, { box: bBox(820, 560), hint: 'text: "Page not found", url', demo: {} });

R("dev-loading-spinner", "Loading spinner", "Status & errors", ["loading", "spinner", "wait", "buffering", "progress", "loader", "pending"], (o) => {
  const c = o.c || "blue", out = [sh(ci(0, 0, 76), "white", { w: "prop" })];
  for (let i = 0; i < 12; i++) out.push(G(F(rr(-5.5, -52, 11, 24, 5.5), [c, i < 3 ? 2 : 0], 0.13 + (i / 11) * 0.87), `rotate(${i * 30})`));
  return out.join("") + (o.label ? T(o.label, 0, 122, { size: 28, c: "ink", halo: "white" }) : "");
}, { box: [-110, -100, 220, 210], hint: 'c: "blue", label: "Loading"', demo: {} });

const SEV = { critical: ["red", "CRITICAL"], high: ["orange", "HIGH"], medium: ["yellow", "MEDIUM"], low: ["green", "LOW"] };
R("dev-cve-badge", "CVE vulnerability badge", "Status & errors", ["cve", "vulnerability", "security", "exploit", "severity", "cvss", "zero day", "patch"], (o) => {
  const w = 600, h = 190, x = -w / 2, y = -h / 2, sv = SEV[o.sev || "critical"] || SEV.critical, out = [];
  const dk = sv[0] === "yellow" ? "ink" : "white";
  out.push(panel(x, y, w, h, "white"), sh(ci(x + 98, y + h / 2, 62), sv[0], { w: "prop" }), T(String(o.score ?? 9.8), x + 98, y + h / 2 + 22, { size: 62, c: dk }));
  out.push(mono(o.id || "CVE-2026-31337", x + 190, y + 78, 33, ["ink", 0], { weight: 800 }), chip(x + 190, y + 102, sv[1], sv[0], { size: 24, tc: dk, w: 164 }), T(o.note ?? "Remote code execution", x + 190, y + 166, { size: 21, anchor: "start", c: "gray" }));
  return out.join("");
}, { box: CB(600, 190), hint: 'id: "CVE-2026-31337", sev: "critical|high|medium|low", score: 9.8, note', demo: {} });

const shieldPath = (k = 1) => L.smooth([[0, -118], [88, -84], [88, -10], [60, 62], [0, 118], [-60, 62], [-88, -10], [-88, -84], [0, -118]].map(([x, y]) => [x * k, y * k]));
const lockArt = (x, y, k, body = "gold") => {
  const sd = `M${-26 * k} ${-6 * k} V${-26 * k} A${26 * k} ${26 * k} 0 0 1 ${26 * k} ${-26 * k} V${-6 * k}`;
  return at(L.tag("path", { d: sd, fill: "none", stroke: L.outline(), "stroke-width": L.lw("prop") + 14 * k, "stroke-linecap": "round" }) + L.tag("path", { d: sd, fill: "none", stroke: L.c("gray", 1), "stroke-width": 14 * k, "stroke-linecap": "round" }) +
    sh(rr(-44 * k, -8 * k, 88 * k, 66 * k, 14), body, { w: "prop" }) + F(ci(0, 20 * k, 9 * k), ["ink", 0]) + F(rr(-3.5 * k, 22 * k, 7 * k, 18 * k, 3), ["ink", 0]), x, y);
};
R("dev-shield-lock", "Shield with padlock", "Status & errors", ["shield", "lock", "security", "secure", "padlock", "encryption", "safe", "protected", "https"], (o) => {
  const c = o.c || "blue";
  return drop(shieldPath(1)) + sh(shieldPath(1), c, { w: "prop" }) + F(shieldPath(0.8), ["white", 0], 0.2) + lockArt(0, 6, 1);
}, { box: [-120, -140, 250, 290], hint: 'c: "blue"', demo: {} });
R("dev-shield-broken", "Cracked shield", "Status & errors", ["shield", "breach", "hacked", "vulnerable", "security hole", "crack", "broken", "leak"], () => {
  const crack = "M10 -118 L-8 -78 L22 -52 L-14 -14 L18 18 L-6 54 L8 90 L0 118";
  return drop(shieldPath(1)) + sh(shieldPath(1), "red", { w: "prop" }) + F(shieldPath(0.8), ["white", 0], 0.16) +
    L.tag("path", { d: crack, fill: "none", stroke: L.c("ink"), "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }) + L.tag("path", { d: crack, fill: "none", stroke: L.c("cream"), "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" });
}, { box: [-120, -140, 250, 290], demo: {} });

// bug creature (standing, origin = ground centre)
R("dev-bug", "Software bug (cute creature)", "Status & errors", ["bug", "insect", "glitch", "defect", "creature", "ladybug", "debug", "error", "mascot"], (o) => {
  const out = [L.shadow(0, 0, 190)], mood = o.mood || "smug";
  [-1, 1].forEach((sd) => [-74, -48, -22].forEach((yy, i) => out.push(L.tag("path", { d: `M${sd * 54} ${yy} Q${sd * (102 + i * 8)} ${yy - 12} ${sd * (96 + i * 12)} -2`, fill: "none", stroke: L.c("ink"), "stroke-width": 9, "stroke-linecap": "round" }))));
  out.push(sh(L.circ(0, -72, 70, 56), "red", { w: "prop" }), L.tag("path", { d: "M0 -126 V-18", fill: "none", stroke: L.outline(), "stroke-width": L.lw("detail"), "stroke-linecap": "round" }));
  [[-34, -92, 11], [34, -92, 11], [-40, -52, 9], [40, -52, 9], [-12, -34, 6], [12, -34, 6]].forEach(([x, y, r]) => out.push(F(ci(x, y, r), ["ink", 0])));
  out.push(F(L.circ(-30, -104, 14, 8), ["white", 0], 0.35));
  [-1, 1].forEach((sd) => out.push(L.tag("path", { d: `M${sd * 18} -162 Q${sd * 34} -198 ${sd * 56} -190`, fill: "none", stroke: L.c("ink"), "stroke-width": 6, "stroke-linecap": "round" }), sh(ci(sd * 58, -190, 8), "red", { w: "hair", flat: true })));
  out.push(sh(L.circ(0, -138, 40, 31), "ink", { w: "detail", tone: 1 }));
  [-1, 1].forEach((sd) => out.push(sh(ci(sd * 16, -146, 14), "white", { w: "hair", flat: true }), F(ci(sd * 16 + (mood === "scared" ? 0 : sd * 3), -144, 6), ["ink", 0])));
  out.push(L.tag("path", { d: mood === "scared" ? L.arc(0, -112, 12, 200, 340) : L.arc(0, -134, 14, 20, 160), fill: "none", stroke: L.c("white"), "stroke-width": 4, "stroke-linecap": "round" }));
  return out.join("");
}, { box: [-140, -210, 280, 230], stand: true, hint: 'mood: "smug|scared"', demo: {} });

R("dev-rubber-duck", "Rubber duck debugger", "Status & errors", ["rubber duck", "debugging", "duck", "explain", "talk to the duck", "bath toy", "programmer"], (o) => {
  const out = [L.shadow(0, 0, 200)];
  out.push(sh(sm([[-96, -70], [-80, -34], [-34, -8], [30, -6], [86, -26], [112, -64], [136, -96], [100, -84], [96, -112], [64, -118], [22, -100], [-40, -108], [-86, -100], [-96, -70]]), "yellow", { w: "prop" }));
  out.push(sh(L.circ(54, -150, 44), "yellow", { w: "prop" }), sh(sm([[90, -150], [128, -156], [132, -142], [96, -134]]), "orange", { w: "detail" }));
  out.push(sh(sm([[-56, -64], [-20, -90], [30, -78], [14, -40], [-30, -38], [-56, -64]]), "yellow", { w: "detail", tone: 2 }));
  out.push(F(ci(66, -160, 6), ["ink", 0]), F(ci(68, -162, 2), ["white", 0]), F(L.circ(50, -138, 8, 5), ["pink", 0], 0.8));
  out.push(L.tag("path", { d: L.circ(66, -160, 15), fill: L.c("glass", 1), "fill-opacity": 0.35, stroke: L.c("ink"), "stroke-width": 3.4 }), L.tag("path", { d: "M51 -160 H36 M81 -160 H92", stroke: L.c("ink"), "stroke-width": 3.4, "stroke-linecap": "round" }));
  const b = (o.bubble ?? "{ }");
  if (b) out.push(sh(poly([[-34, -168], [4, -142], [-14, -186]], true), "white", { w: "hair", flat: true }), sh(L.circ(-70, -196, 58, 44), "white", { w: "detail", flat: true }), mono(b, -70, -184, 40, ["ink", 0], { anchor: "middle", weight: 800 }));
  return out.join("");
}, { box: [-170, -270, 340, 290], stand: true, hint: 'bubble: "{ }"', demo: {} });

// ---------------------------------------------------------------- 6. architecture diagrams (centre origin, drawn to sit on dark or paper)
const pipe = (d, c = "gray", w = 7, tone = 1) => L.tag("path", { d, fill: "none", stroke: L.outline(), "stroke-width": L.lw("detail") * 2 + w, "stroke-linecap": "round", "stroke-linejoin": "round" }) + L.tag("path", { d, fill: "none", stroke: L.c(c, tone), "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" });
const arrowHead = (x, y, ang, c = "gray", k = 1) => at(sh(poly([[0, 0], [-22 * k, -14 * k], [-22 * k, 14 * k]], true), c, { w: "detail", tone: 1 }), x, y, 1, ang);
const led = (x, y, c, r = 5) => F(ci(x, y, r + 2), ["ink", 0], 0.6) + F(ci(x, y, r), [c, 0]);
const STAT = { ok: ["green", "yellow"], warn: ["yellow", "orange"], down: ["red", "red"] };
const serverArt = (o = {}, k = 1) => {
  const st_ = STAT[o.status || "ok"], out = [];
  [0, 1, 2].forEach((i) => { const y = -92 + i * 66;
    out.push(sh(rr(-100, y, 200, 58, 12), "gray", { w: "prop" }), F(rr(-86, y + 12, 70, 6, 3), ["ink", 0], 0.35), F(rr(-86, y + 26, 70, 6, 3), ["ink", 0], 0.35), F(rr(-86, y + 40, 70, 6, 3), ["ink", 0], 0.35), led(62, y + 29, i === 1 ? st_[1] : st_[0]), led(82, y + 29, st_[0]), F(rr(-100, y + 4, 200, 10, 5), ["white", 0], 0.28)); });
  return k === 1 ? out.join("") : G(out.join(""), `scale(${k})`);
};
R("dev-server", "Server rack", "Architecture", ["server", "rack", "backend", "hosting", "machine", "node", "infrastructure", "data center"], (o) => serverArt(o), { box: [-130, -120, 250, 250], hint: 'status: "ok|warn|down"', demo: {} });
R("dev-server-down", "Server rack · down", "Architecture", ["server", "outage", "down", "offline", "crash", "red", "incident"], (o) => serverArt(Object.assign({ status: "down" }, o)), { box: [-130, -120, 250, 250], hint: '', demo: {} });

const dbArt = (c = "blue", label = "", k = 1) => {
  const out = [], rx = 92, ry = 28;
  out.push(sh(`M${-rx} -72 V76 A${rx} ${ry} 0 0 0 ${rx} 76 V-72 Z`, c, { w: "prop" }));
  [-12, 36].forEach((y) => out.push(L.tag("path", { d: `M${-rx} ${y} A${rx} ${ry} 0 0 0 ${rx} ${y}`, fill: "none", stroke: L.outline(), "stroke-width": L.lw("detail") })));
  out.push(sh(L.circ(0, -72, rx, ry), c, { w: "prop", tone: 1, flat: true }), F(L.circ(-18, -76, 44, 10), ["white", 0], 0.35));
  if (label) out.push(mono(label, 0, 18, 30, ["white", 0], { anchor: "middle", weight: 800 }));
  return k === 1 ? out.join("") : G(out.join(""), `scale(${k})`);
};
R("dev-database", "Database (cylinder)", "Architecture", ["database", "db", "sql", "storage", "data", "postgres", "table", "cylinder", "backend"], (o) => dbArt(o.c || "blue", o.label || ""), { box: [-120, -130, 250, 250], hint: 'c: "blue", label: "SQL"', demo: {} });
R("dev-database-stack", "Databases (primary + replicas)", "Architecture", ["database", "replica", "primary", "scaling", "sharding", "cluster", "backup"], (o) => G(dbArt("blue", "", 0.62), "translate(-120 20)") + G(dbArt("teal", "", 0.62), "translate(0 20)") + G(dbArt("teal", "", 0.62), "translate(120 20)") + pipe("M-120 -48 V-76 H120 V-48", "gray", 6) + arrowHead(120, -46, 90) + arrowHead(0, -46, 90) + F(rr(-70, -100, 140, 40, 20), ["yellow", 0]) + T("writes", 0, -72, { size: 24, c: "ink" }), { box: [-210, -130, 420, 250], hint: '', demo: {} });

R("dev-cache", "Cache (fast memory)", "Architecture", ["cache", "redis", "memory", "fast", "speed", "in-memory", "lookup", "performance"], (o) => {
  const out = [];
  [-1, 1].forEach((sd) => [-40, 0, 40].forEach((y) => out.push(sh(rr(sd * 92 - 14, y - 7, 28, 14, 5), "gray", { w: "hair" }))));
  out.push(sh(rr(-80, -80, 160, 160, 28), "yellow", { w: "prop" }), F(rr(-62, -66, 124, 16, 8), ["white", 0], 0.5), sh(bolt(0, 4, 5), "orange", { w: "prop" }));
  if (o.label !== "") out.push(F(rr(-54, 92, 108, 36, 18), ["ink", 0], 0.9), T(o.label || "cache", 0, 119, { size: 24, c: "white" }));
  return out.join("");
}, { box: [-150, -100, 300, 250], hint: 'label: "cache"', demo: {} });

const envelope = (x, y, c) => sh(rr(x - 28, y - 20, 56, 40, 8), c, { w: "detail" }) + L.tag("path", { d: `M${x - 26} ${y - 16} L${x} ${y + 4} L${x + 26} ${y - 16}`, fill: "none", stroke: L.outline(), "stroke-width": L.lw("hair") });
R("dev-queue", "Message queue", "Architecture", ["queue", "message", "pipeline", "kafka", "events", "stream", "worker", "async", "broker"], (o) => {
  const out = [sh(rr(-210, -56, 420, 112, 56), "gray", { w: "prop", tone: 1, flat: true }), F(rr(-190, -46, 380, 18, 9), ["white", 0], 0.5)];
  ["blue", "orange", "green", "pink"].forEach((c, i) => out.push(envelope(-150 + i * 90, 6, c)));
  out.push(arrowHead(226, 0, 0, "gray", 1.6), pipe("M-250 0 H-218", "gray", 8), arrowHead(-212, 0, 0, "gray", 1.4));
  if (o.label !== "") out.push(F(rr(-60, 70, 120, 38, 19), ["ink", 0], 0.9), T(o.label || "queue", 0, 98, { size: 24, c: "white" }));
  return out.join("");
}, { box: [-270, -80, 540, 200], hint: 'label: "queue"', demo: {} });

const containerArt = (c, x, y, k = 1, label = "") => at(sh(rr(-110, -62, 220, 124, 8), c, { w: "prop" }) + [-84, -62, -40, -18, 4, 26, 48, 70, 92].map((xx) => F(rr(xx, -50, 8, 100, 3), ["ink", 0], 0.22)).join("") + F(rr(-110, -62, 220, 14, 6), ["white", 0], 0.35) +
  [60, 76].map((xx) => F(rr(xx - 4, -34, 5, 68, 2), ["white", 0], 0.8)).join("") + F(rr(-96, -40, 90, 40, 6), ["paper", 0]) + (label ? mono(label, -51, -12, 24, ["ink", 0], { anchor: "middle", weight: 800 }) : ""), x, y, k);
R("dev-container", "Container (box)", "Architecture", ["container", "docker", "box", "package", "deploy", "image", "shipping", "devops"], (o) => containerArt(o.c || "teal", 0, 0, 1, o.label ?? "app"), { box: [-140, -90, 280, 180], hint: 'c: "teal", label: "app"', demo: {} });
R("dev-container-stack", "Containers (stack)", "Architecture", ["container", "containers", "stack", "microservices", "deploy", "ship", "devops", "pile"], () => containerArt("orange", -96, 56, 0.8, "api") + containerArt("blue", 96, 56, 0.8, "web") + containerArt("teal", -96, -52, 0.8, "db") + containerArt("purple", 96, -52, 0.8, "ai"), { box: [-210, -130, 420, 250], hint: '', demo: {} });

R("dev-cluster", "Cluster of nodes", "Architecture", ["cluster", "nodes", "kubernetes", "fleet", "scaling", "orchestration", "servers", "replicas"], (o) => {
  const out = [sh(rr(-200, -120, 400, 240, 28), "paper", { w: "prop", tone: 2, flat: true })], P = [[-120, -50], [0, -50], [120, -50], [-120, 40], [0, 40], [120, 40]];
  out.push(L.tag("path", { d: rr(-200, -120, 400, 240, 28), fill: "none", stroke: L.outline(), "stroke-width": L.lw("detail"), "stroke-dasharray": "14 10" }));
  [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5], [0, 4], [2, 4]].forEach(([a, b]) => out.push(L.tag("path", { d: L.line(P[a], P[b]), stroke: L.c("gray", 0), "stroke-width": 4, "stroke-linecap": "round" })));
  P.forEach(([x, y], i) => out.push(sh(rr(x - 36, y - 28, 72, 56, 12), i === 4 ? "orange" : "blue", { w: "detail" }), led(x - 14, y + 12, "green", 4), led(x + 4, y + 12, "green", 4), F(rr(x - 22, y - 14, 44, 6, 3), ["white", 0], 0.8)));
  out.push(F(rr(-60, 130, 120, 38, 19), ["ink", 0], 0.9), T(o.label || "cluster", 0, 158, { size: 24, c: "white" }));
  return out.join("");
}, { box: [-230, -140, 460, 330], hint: 'label: "cluster"', demo: {} });

R("dev-cloud-region", "Cloud region", "Architecture", ["cloud", "region", "aws", "availability zone", "hosting", "data center", "us-east", "provider"], (o) => {
  const cloud = L.smooth([[-150, 46], [-170, 4], [-130, -26], [-96, -30], [-64, -82], [-4, -96], [46, -74], [64, -50], [112, -44], [158, -6], [140, 46], [-150, 46]]);
  const out = [drop(cloud, 8, 12), sh(cloud, "white", { w: "prop" })];
  [-70, 0, 70].forEach((x) => out.push(sh(rr(x - 26, -34, 52, 62, 10), "blue", { w: "detail" }), F(rr(x - 16, -22, 32, 5, 2), ["white", 0], 0.8), F(rr(x - 16, -10, 32, 5, 2), ["white", 0], 0.8), led(x, 14, "green", 4)));
  out.push(at(sh("M0 0 C-6 -14 -22 -28 -22 -44 A22 22 0 1 1 22 -44 C22 -28 6 -14 0 0 Z", "red", { w: "detail" }) + F(ci(0, -44, 8), ["white", 0]), 150, -34));
  out.push(F(rr(-80, 62, 160, 42, 21), ["yellow", 0]), mono(o.label || "us-east-1", 0, 92, 26, ["ink", 0], { anchor: "middle", weight: 800 }));
  return out.join("");
}, { box: [-200, -150, 400, 290], hint: 'label: "us-east-1"', demo: {} });

const bigArrow = (x, y, w, dir, c) => { const h = 30, hd = 50; return at(sh(poly([[-w / 2, -h], [w / 2 - hd, -h], [w / 2 - hd, -h - 24], [w / 2, 0], [w / 2 - hd, h + 24], [w / 2 - hd, h], [-w / 2, h]], true), c, { w: "prop" }), x, y, 1, dir < 0 ? 180 : 0); };
R("dev-api-arrow", "API request / response", "Architecture", ["api", "request", "response", "http", "rest", "get", "endpoint", "call", "200 ok"], (o) => {
  const rq = o.req || "GET /users", rs = o.res || "200 OK";
  return bigArrow(0, -48, 420, 1, "blue") + mono(rq, -34, -38, 30, ["white", 0], { anchor: "middle", weight: 800 }) + bigArrow(0, 52, 420, -1, "green") + mono(rs, 34, 62, 30, ["white", 0], { anchor: "middle", weight: 800 });
}, { box: [-230, -120, 460, 240], hint: 'req: "GET /users", res: "200 OK"', demo: {} });

const laptopArt = (k = 1) => G(sh(rr(-84, -62, 168, 112, 12), "navy", { w: "prop" }) + F(rr(-72, -50, 144, 88, 6), ["navy", 1]) + bar(-60, -38, 50, 8, "purple", 1, 1) + bar(-60, -22, 80, 8, "green", 1, 1) + bar(-52, -6, 60, 8, "blue", 1, 1) + bar(-60, 10, 40, 8, "orange", 1, 1) +
  sh(poly([[-104, 52], [104, 52], [92, 70], [-92, 70]], true), "gray", { w: "prop" }) + F(rr(-22, 56, 44, 6, 3), ["ink", 0], 0.3), `scale(${k})`);
R("dev-client-server", "Client ↔ server diagram", "Architecture", ["client", "server", "request", "response", "frontend", "backend", "network", "how the web works", "diagram"], (o) => {
  const out = [at(laptopArt(1), -230, 0), at(serverArt({}, 0.8), 230, 0)];
  out.push(pipe("M-110 -28 H110", "blue", 7, 0), arrowHead(122, -28, 0, "blue", 1), pipe("M110 36 H-110", "green", 7, 0), arrowHead(-122, 36, 180, "green", 1));
  out.push(F(rr(-62, -66, 124, 32, 16), ["blue", 0]), T(o.req || "request", 0, -42, { size: 22, c: "white" }), F(rr(-70, 52, 140, 32, 16), ["green", 0]), T(o.res || "response", 0, 76, { size: 22, c: "white" }));
  return out.join("");
}, { box: [-340, -110, 680, 220], hint: 'req: "request", res: "response"', demo: {} });

R("dev-cdn-globe", "CDN globe (edge nodes)", "Architecture", ["cdn", "globe", "edge", "network", "global", "latency", "internet", "worldwide", "cloudflare-style"], (o) => {
  const out = [], N = 7;
  const nodes = Array.from({ length: N }, (_, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2; return [Math.cos(a) * 168, Math.sin(a) * 150]; });
  nodes.forEach(([x, y]) => out.push(pipe(L.line([x * 0.55, y * 0.55], [x, y]), "gray", 4, 1)));
  out.push(sh(ci(0, 0, 96), "water", { w: "prop" }));
  out.push(clipped(F(sm([[-70, -40], [-40, -66], [-6, -52], [-14, -20], [-48, -6], [-70, -40]]), ["grass", 0]) + F(sm([[12, -30], [48, -62], [80, -30], [60, 6], [34, 40], [18, 16], [12, -30]]), ["grass", 0]) + F(sm([[-44, 26], [-16, 20], [-6, 60], [-30, 82], [-50, 56], [-44, 26]]), ["grass", 0]) +
    [[96, 30], [58, 96], [20, 96]].map(([rx, ry]) => L.tag("path", { d: L.circ(0, 0, rx, 96), fill: "none", stroke: L.c("white"), "stroke-opacity": 0.35, "stroke-width": 2 })).join("") + F(L.circ(-32, -40, 40, 22), ["white", 0], 0.28), L.circ(0, 0, 96)), outl(L.circ(0, 0, 96)));
  nodes.forEach(([x, y]) => out.push(sh(ci(x, y, 17), "yellow", { w: "detail" }), F(ci(x, y, 7), ["orange", 0])));
  return out.join("");
}, { box: [-210, -190, 420, 380], hint: '', demo: {} });

R("dev-load-balancer", "Load balancer", "Architecture", ["load balancer", "traffic", "scale", "proxy", "nginx-style", "distribute", "requests", "fan out"], (o) => {
  const out = [], ys = [-100, 0, 100], hx = -30;
  ys.forEach((y) => out.push(pipe(`M${hx + 40} 0 C${hx + 100} 0 ${hx + 90} ${y} 150 ${y}`, "gray", 6, 1), arrowHead(166, y, 0, "gray", 1)));
  out.push(pipe(`M-250 0 H${hx - 44}`, "gray", 8, 1), arrowHead(hx - 40, 0, 0, "gray", 1.3));
  out.push(sh(ci(hx, 0, 54), "orange", { w: "prop" }), L.tag("path", { d: `M${hx - 26} 0 H${hx - 4} M${hx - 4} 0 L${hx + 22} -20 M${hx - 4} 0 H${hx + 22} M${hx - 4} 0 L${hx + 22} 20`, fill: "none", stroke: L.c("white"), "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  ys.forEach((y) => out.push(sh(rr(176, y - 32, 100, 64, 12), "gray", { w: "detail" }), F(rr(188, y - 18, 40, 6, 3), ["ink", 0], 0.35), F(rr(188, y - 4, 40, 6, 3), ["ink", 0], 0.35), led(254, y, "green", 5)));
  ["blue", "pink", "green"].forEach((c, i) => out.push(sh(rr(-250 + i * 50, -50, 34, 26, 8), c, { w: "detail" })));
  return out.join("");
}, { box: [-300, -150, 600, 300], hint: '', demo: {} });

const glyph = (kind, x, y, c) => {
  const w = "white", S = (d, k = 4.5) => L.tag("path", { d, fill: "none", stroke: L.c(w), "stroke-width": k, "stroke-linecap": "round", "stroke-linejoin": "round" });
  const t = (d) => at(d, x, y);
  if (kind === "user") return t(F(ci(0, -9, 9), [w, 0]) + F("M-17 17 Q-17 2 0 2 Q17 2 17 17 Z", [w, 0]));
  if (kind === "key") return t(S("M-6 0 H18 M12 0 V9 M18 0 V7") + L.tag("path", { d: L.circ(-10, 0, 9), fill: "none", stroke: L.c(w), "stroke-width": 5 }));
  if (kind === "card") return t(F(rr(-18, -12, 36, 24, 5), [w, 0]) + F(rect(-18, -5, 36, 6), [c, 0]));
  if (kind === "box") return t(F(poly([[0, -18], [18, -9], [0, 0], [-18, -9]], true), [w, 0]) + F(poly([[-18, -5], [-2, 4], [-2, 20], [-18, 11]], true), [w, 0], 0.8) + F(poly([[18, -5], [2, 4], [2, 20], [18, 11]], true), [w, 0], 0.6));
  if (kind === "bell") return t(F("M-15 10 Q-12 6 -12 -2 Q-12 -14 0 -16 Q12 -14 12 -2 Q12 6 15 10 Z", [w, 0]) + F(ci(0, 15, 4), [w, 0]));
  if (kind === "db") return t(F("M-14 -12 V12 A14 6 0 0 0 14 12 V-12 Z", [w, 0], 0.8) + F(L.circ(0, -12, 14, 6), [w, 0]));
  if (kind === "mail") return t(F(rr(-18, -12, 36, 24, 5), [w, 0]) + L.tag("path", { d: "M-14 -8 L0 3 L14 -8", fill: "none", stroke: L.c(c), "stroke-width": 3, "stroke-linecap": "round" }));
  return t(F(ci(0, 0, 10), [w, 0]));
};
R("dev-microservices", "Microservices web", "Architecture", ["microservices", "services", "gateway", "mesh", "distributed", "architecture", "api gateway", "spaghetti"], (o) => {
  const kinds = [["user", "green"], ["key", "purple"], ["card", "orange"], ["box", "teal"], ["bell", "pink"], ["db", "blue"]], out = [], P = kinds.map((_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return [Math.cos(a) * 190, Math.sin(a) * 150]; });
  P.forEach(([x, y]) => out.push(pipe(L.line([0, 0], [x, y]), "gray", 5, 1)));
  [[0, 1], [2, 3], [3, 4], [5, 0], [1, 2]].forEach(([a, b]) => out.push(pipe(L.line(P[a], P[b]), "gray", 3, 0)));
  out.push(sh(ci(0, 0, 50), "yellow", { w: "prop" }), L.tag("path", { d: "M-20 0 H20 M0 -20 V20 M-14 -14 L14 14 M14 -14 L-14 14", stroke: L.c("ink"), "stroke-width": 5, "stroke-linecap": "round" }));
  P.forEach(([x, y], i) => out.push(sh(rr(x - 40, y - 40, 80, 80, 20), kinds[i][1], { w: "prop" }), glyph(kinds[i][0], x, y, kinds[i][1])));
  return out.join("");
}, { box: [-270, -210, 540, 420], hint: '', demo: {} });

// ---------------------------------------------------------------- 7. hardware + AI
R("dev-cpu-chip", "CPU chip", "Hardware & AI", ["cpu", "chip", "processor", "silicon", "hardware", "semiconductor", "die", "soc"], (o) => {
  const out = [], n = 7;
  for (let i = 0; i < n; i++) { const p = -66 + i * 22; [[p, -112, 12, 26], [p, 86, 12, 26], [-99, p - 6, 26, 12], [99, p - 6, 26, 12]].forEach(([x, y, w, h]) => out.push(sh(rr(x - w / 2, y, w, h, 3), "gold", { w: "hair", flat: true }))); }
  out.push(sh(rr(-92, -92, 184, 184, 22), "navy", { w: "prop", tone: 1 }), rim(rr(-88, -88, 176, 176, 20), 0.28, 2.5));
  out.push(sh(rr(-52, -52, 104, 104, 12), "gray", { w: "detail" }), F(rr(-44, -44, 88, 14, 7), ["white", 0], 0.5));
  [[-30, -14], [-30, 8]].forEach(([x, y]) => out.push(L.tag("path", { d: `M${x} ${y} h${22 + (y > 0 ? 18 : 0)} l10 -10 h14`, fill: "none", stroke: L.c("ink"), "stroke-width": 3, opacity: 0.45 })));
  out.push(mono(o.label ?? "CPU", 0, 38, 30, ["ink", 0], { anchor: "middle", weight: 800 }), sh(poly([[-92, -66], [-66, -92], [-92, -92]], true), "gold", { w: "hair", flat: true }));
  return out.join("");
}, { box: [-140, -140, 280, 280], hint: 'label: "CPU"', demo: {} });

R("dev-gpu-card", "GPU graphics card", "Hardware & AI", ["gpu", "graphics card", "nvidia-style", "ai chip", "training", "hardware", "fans", "compute"], (o) => {
  const out = [], fan = (cx) => {
    let s = sh(ci(cx, 0, 52), "ink", { w: "detail", tone: 1 }) + F(ci(cx, 0, 44), ["gray", 2]);
    for (let i = 0; i < 7; i++) { const a = (i / 7) * 360; s += G(F(sm([[0, -4], [16, -22], [30, -34], [14, -40], [-4, -22], [0, -4]]), ["gray", 1]), `translate(${cx} 0) rotate(${a})`); }
    return s + sh(ci(cx, 0, 11), "gray", { w: "hair", tone: 0 });
  };
  out.push(sh(rr(-200, 62, 320, 22, 4), "gold", { w: "hair", flat: true }), ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => F(rect(-196 + i * 22, 66, 4, 18), ["ink", 0], 0.45)));
  out.push(sh(rr(-230, -78, 30, 130, 4), "gray", { w: "detail" }), sh(rr(-204, -68, 380, 132, 18), "navy", { w: "prop", tone: 1 }), rim(rr(-200, -64, 372, 124, 16), 0.26, 2.5));
  out.push(fan(-110), fan(30), F(rr(98, -50, 66, 8, 4), [o.c || "green", 0]), F(rr(98, -32, 66, 8, 4), [o.c || "green", 0], 0.6), F(rr(-150, 40, 280, 10, 5), [o.c || "green", 0]));
  out.push(sh(rr(168, -48, 22, 20, 4), "gray", { w: "hair", flat: true }), sh(rr(168, -18, 22, 20, 4), "gray", { w: "hair", flat: true }));
  return out.join("");
}, { box: [-260, -110, 520, 220], hint: 'c: "green" (accent)', demo: {} });

R("dev-ram-stick", "RAM stick", "Hardware & AI", ["ram", "memory", "dimm", "hardware", "gigabytes", "vram", "upgrade", "modules"], (o) => {
  const out = [sh(rr(-200, -46, 400, 98, 8), "green", { w: "prop" })];
  for (let i = 0; i < 18; i++) out.push(F(rr(-186 + i * 21, 52, 12, 14, 2), ["gold", 0]));
  out.push(sh(rr(-200, 52, 400, 6, 0), "gold", { w: "hair", flat: true }));
  [0, 1, 2, 3, 4, 5].forEach((i) => { const x = -170 + i * 62; out.push(sh(rr(x, -34, 52, 44, 5), "ink", { w: "hair", tone: 1 }), F(ci(x + 9, -25, 3), ["white", 0], 0.6)); });
  out.push(F(rr(-176, 22, 100, 20, 4), ["paper", 0]), mono(o.label ?? "32 GB", -126, 38, 18, ["ink", 0], { anchor: "middle", weight: 800 }), F(rr(160, -40, 30, 8, 4), ["white", 0], 0.35));
  return out.join("");
}, { box: [-230, -80, 460, 170], hint: 'label: "32 GB"', demo: {} });

R("dev-datacenter-row", "Data-center row", "Hardware & AI", ["data center", "datacenter", "servers", "racks", "hosting", "cloud", "infrastructure", "gpu cluster", "farm"], (o) => {
  const out = [L.shadow(0, 0, 560), F(rr(-290, 0, 580, 10, 5), ["gray", 1], 0.6)];
  for (let i = 0; i < 5; i++) {
    const x = -250 + i * 108;
    out.push(sh(rr(x - 42, -230, 84, 232, 8), "navy", { w: "prop", tone: 1 }), rim(rr(x - 38, -226, 76, 224, 6), 0.22, 2));
    for (let r = 0; r < 7; r++) { const y = -216 + r * 30; out.push(F(rr(x - 32, y, 64, 22, 4), ["navy", 2]), led(x + 20, y + 11, (i + r) % 5 === 0 ? "orange" : "green", 3.5), F(rr(x - 26, y + 8, 28, 5, 2), ["gray", 0], 0.55)); }
  }
  return out.join("");
}, { box: [-310, -250, 620, 275], stand: true, hint: '', demo: {} });

R("dev-token-stream", "Token stream (text → tokens)", "Hardware & AI", ["tokens", "tokenizer", "llm", "text", "ai", "prompt", "words", "subword", "context"], (o) => {
  const toks = o.tokens || ["The", " quick", " brown", " fox", " jump", "s", " over"], cols = ["blue", "orange", "green", "pink", "purple", "teal"], size = 34, out = [];
  let x = 0, y = 0; const items = [];
  toks.forEach((t, i) => { const w = Math.max(t.length, 2) * size * 0.62 + 30; if (x + w > 760) { x = 0; y += 92; } items.push([x, y, w, t, i]); x += w + 12; });
  const maxW = Math.max(...items.map(([x0, , w]) => x0 + w)), ox = -maxW / 2, oy = -y / 2 - 28;
  items.forEach(([x0, y0, w, t, i]) => { const c = cols[i % cols.length]; out.push(sh(rr(ox + x0, oy + y0, w, 56, 14), c, { w: "detail", flat: true, tone: 1 }), mono(t.replace(/^ /, "·"), ox + x0 + w / 2, oy + y0 + 38, size, ["ink", 0], { anchor: "middle", weight: 800 }), mono(String((o.ids || [])[i] ?? 400 + ((i * 7919) % 9000)), ox + x0 + w / 2, oy + y0 + 78, 17, ["gray", 1], { anchor: "middle", weight: 600 })); });
  return out.join("");
}, { box: [-420, -150, 840, 300], hint: 'tokens: ["The", " quick", …], ids', demo: {} });

R("dev-neural-net", "Neural network", "Hardware & AI", ["neural network", "ai", "machine learning", "layers", "nodes", "deep learning", "model", "neurons", "weights"], (o) => {
  const layers = o.layers || [3, 5, 5, 2], cols = ["blue", "purple", "purple", "green"], out = [], X = (i) => -210 + i * (420 / (layers.length - 1)), Y = (n, j) => (j - (n - 1) / 2) * 62;
  const r = L.rng(11);
  for (let i = 0; i < layers.length - 1; i++) for (let a = 0; a < layers[i]; a++) for (let b = 0; b < layers[i + 1]; b++) { const hot = (a + b + i) % 4 === 0; out.push(L.tag("path", { d: L.line([X(i), Y(layers[i], a)], [X(i + 1), Y(layers[i + 1], b)]), stroke: L.c(hot ? "yellow" : "gray", hot ? 0 : 1), "stroke-width": hot ? 3.4 : 2, opacity: hot ? 0.95 : 0.55 })); }
  layers.forEach((n, i) => { for (let j = 0; j < n; j++) out.push(sh(ci(X(i), Y(n, j), 20), cols[Math.min(i, cols.length - 1)], { w: "detail" }), F(ci(X(i) - 6, Y(n, j) - 6, 5), ["white", 0], 0.5)); });
  return out.join("");
}, { box: [-260, -190, 520, 380], hint: 'layers: [3,5,5,2]', demo: {} });

R("dev-context-meter", "Context window meter", "Hardware & AI", ["context window", "tokens", "limit", "memory", "llm", "usage", "meter", "gauge", "full"], (o) => {
  const lim = o.limit || 200000, used = o.used ?? 128000, p = Math.min(1, used / lim), w = 640, h = 200, x = -w / 2, y = -h / 2, c = p > 0.9 ? "red" : p > 0.7 ? "orange" : "green", out = [];
  out.push(panel(x, y, w, h, "white"), T(o.title || "Context window", x + 36, y + 56, { size: 30, anchor: "start", c: "ink" }), T(Math.round(p * 100) + "%", x + w - 36, y + 56, { size: 32, anchor: "end", c: c }));
  out.push(sh(rr(x + 36, y + 80, w - 72, 44, 22), "paper", { w: "detail", flat: true, tone: 2 }), clipped(F(rect(x + 36, y + 80, (w - 72) * p, 44), [c, 0]) + F(rect(x + 36, y + 80, (w - 72) * p, 14), ["white", 0], 0.3), rr(x + 36, y + 80, w - 72, 44, 22)), outl(rr(x + 36, y + 80, w - 72, 44, 22), "detail"));
  [0.25, 0.5, 0.75].forEach((k) => out.push(F(rect(x + 36 + (w - 72) * k - 1.5, y + 128, 3, 10), ["gray", 1])));
  out.push(mono(`${num(used)} / ${num(lim)} tokens`, x + 36, y + 170, 24, ["gray", 2], { weight: 700 }));
  return out.join("");
}, { box: CB(640, 200), hint: 'used: 128000, limit: 200000, title', demo: {} });
R("dev-context-meter-full", "Context window · almost full", "Hardware & AI", ["context window", "tokens", "limit", "full", "overflow", "red", "truncated"], (o) => L.inline("dev-context-meter", Object.assign({ used: 193000, title: "Context window" }, o)), { box: CB(640, 200), hint: 'used, limit', demo: {} });

R("dev-benchmark-bars", "Benchmark bars", "Hardware & AI", ["benchmark", "chart", "bars", "score", "comparison", "eval", "leaderboard", "model comparison", "results"], (o) => {
  const items = o.items || [["Model A", 62], ["Model B", 71], ["Ours", 88], ["Model D", 55]], mx = o.max || 100, hl = o.hl ?? items.reduce((b, it, i, a) => (it[1] > a[b][1] ? i : b), 0);
  const w = 680, rowH = 70, h = 110 + items.length * rowH, x = -w / 2, y = -h / 2, bx = x + 190, bw = w - 190 - 100, out = [];
  out.push(panel(x, y, w, h, "white"), T(o.title || "Benchmark score", x + 36, y + 56, { size: 30, anchor: "start", c: "ink" }));
  items.forEach(([l, v], i) => {
    const yy = y + 92 + i * rowH, on = i === hl, bwid = bw * Math.min(1, v / mx);
    out.push(T(l, x + 36, yy + 40, { size: 26, anchor: "start", c: "ink" }), sh(rr(bx, yy + 10, bw, 40, 12), "paper", { w: "hair", flat: true, tone: 2 }), sh(rr(bx, yy + 10, Math.max(bwid, 24), 40, 12), on ? "orange" : "blue", { w: "detail", tone: on ? 0 : 1, flat: true }), F(rr(bx + 6, yy + 14, Math.max(bwid, 24) - 12, 9, 4), ["white", 0], 0.35), mono(String(v), x + w - 36, yy + 40, 28, [on ? "orange" : "gray", on ? 2 : 2], { anchor: "end", weight: 800 }));
    if (on) out.push(starIcon(bx + Math.max(bwid, 24) + 22, yy + 30, 13, "yellow"));
  });
  return out.join("");
}, { box: CB(680, 390), hint: 'items: [["Model A", 62], ["Ours", 88]], hl: index (default best), max: 100, title', demo: {} });

R("dev-leaderboard", "Leaderboard", "Hardware & AI", ["leaderboard", "ranking", "top", "rank", "arena", "winners", "scores", "podium", "first place"], (o) => {
  const rows = o.rows || [["Orion-7B", 1287], ["Atlas-70B", 1264], ["Nimbus-3", 1251], ["Comet-Mini", 1199]], w = 640, rowH = 68, h = 100 + rows.length * rowH, x = -w / 2, y = -h / 2, out = [], med = ["gold", "gray", "orange"];
  out.push(panel(x, y, w, h, "white"), T(o.title || "Leaderboard", x + 36, y + 56, { size: 32, anchor: "start", c: "ink" }));
  rows.forEach(([n, v], i) => {
    const yy = y + 84 + i * rowH;
    if (i === 0) out.push(F(rr(x + 16, yy, w - 32, rowH - 8, 16), ["yellow", 1], 0.45));
    out.push(i < 3 ? sh(ci(x + 62, yy + 30, 22), med[i], { w: "detail", tone: i === 2 ? 2 : 0 }) : F(ci(x + 62, yy + 30, 22), ["paper", 2]), T(String(i + 1), x + 62, yy + 40, { size: 28, c: i < 3 ? "ink" : "gray" }), T(n, x + 108, yy + 40, { size: 30, anchor: "start", c: "ink" }), mono(String(v), x + w - 40, yy + 38, 28, ["gray", 2], { anchor: "end", weight: 800 }));
  });
  return out.join("");
}, { box: CB(640, 372), hint: 'rows: [["name", score]], title', demo: {} });

R("dev-agent-robot", "AI agent robot at a laptop", "Hardware & AI", ["agent", "robot", "ai agent", "bot", "assistant", "automation", "coding agent", "laptop", "autonomous"], (o) => {
  const out = [L.shadow(0, 0, 360)];
  // robot behind the desk: body, neck, head, arms down to the keys
  out.push(sh(rr(-58, -282, 116, 160, 36), "white", { w: "prop" }), F(rr(-44, -272, 40, 14, 7), ["white", 0], 0.9), sh(rr(-16, -306, 32, 30, 8), "gray", { w: "detail" }));
  out.push(sh(rr(-52, -398, 104, 94, 34), "white", { w: "prop" }), sh(rr(-40, -386, 80, 62, 24), "navy", { w: "detail" }), F(ci(-18, -354, 9), ["teal", 1]), F(ci(18, -354, 9), ["teal", 1]), L.tag("path", { d: L.arc(0, -354, 18, 25, 155), fill: "none", stroke: L.c("teal", 1), "stroke-width": 4.5, "stroke-linecap": "round" }));
  out.push(L.tag("path", { d: "M0 -398 V-424", fill: "none", stroke: L.outline(), "stroke-width": L.lw("detail"), "stroke-linecap": "round" }), sh(ci(0, -428, 9), "orange", { w: "hair", flat: true }), sh(rr(-62, -364, 12, 28, 6), "teal", { w: "hair", flat: true }), sh(rr(50, -364, 12, 28, 6), "teal", { w: "hair", flat: true }));
  [-1, 1].forEach((sd) => { const d = `M${sd * 58} -252 Q${sd * 112} -196 ${sd * 70} -100`; out.push(L.tag("path", { d, fill: "none", stroke: L.outline(), "stroke-width": L.lw("char") + 8, "stroke-linecap": "round" }), L.tag("path", { d, fill: "none", stroke: L.c("white", 2), "stroke-width": 9, "stroke-linecap": "round" })); });
  // desk + laptop facing the viewer
  out.push(sh(rr(-130, -84, 260, 18, 6), "wood", { w: "prop" }), sh(rr(-112, -66, 16, 66, 4), "wood", { w: "detail", tone: 2 }), sh(rr(96, -66, 16, 66, 4), "wood", { w: "detail", tone: 2 }));
  out.push(sh(rr(-88, -190, 176, 106, 10), "navy", { w: "prop" }), F(rr(-76, -178, 152, 82, 5), ["navy", 1]), bar(-64, -168, 52, 8, "purple", 1, 1), bar(-64, -152, 88, 8, "green", 1, 1), bar(-54, -136, 68, 8, "blue", 1, 1), bar(-64, -120, 42, 8, "orange", 1, 1), L.tag("path", { d: "M40 -128 l9 9 l18 -22", fill: "none", stroke: L.c("green", 1), "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  out.push(sh(poly([[-106, -84], [106, -84], [96, -72], [-96, -72]], true), "gray", { w: "detail" }));
  return out.join("");
}, { box: [-190, -450, 380, 470], stand: true, hint: '', demo: {} });

R("dev-model-card", "AI model card", "Hardware & AI", ["model", "ai model", "llm", "parameters", "context length", "model card", "spec", "release", "open weights"], (o) => {
  const w = 620, h = 320, x = -w / 2, y = -h / 2, out = [];
  out.push(panel(x, y, w, h, "white"), sh(ci(x + 62, y + 62, 32), "purple", { w: "detail" }), sh(L.star(x + 62, y + 62, 17, 6, 4), "white", { w: "hair", flat: true }), mono(o.name || "Orion-7B", x + 112, y + 74, 40, ["ink", 0], { weight: 800 }));
  (o.tags || ["open weights", "chat"]).slice(0, 3).forEach((t, i) => out.push(chip(x + 36 + i * 160, y + 118, t, "purple", { op: 0.18, tc: "purple", size: 20, w: 144 })));
  [["parameters", o.params || "7B", "orange"], ["context", o.context || "128k", "teal"]].forEach(([k, v, c], i) => { const tx = x + 36 + i * 286; out.push(sh(rr(tx, y + 176, 262, 114, 22), c, { w: "detail", tone: 0, flat: true }), F(rr(tx + 10, y + 184, 242, 14, 7), ["white", 0], 0.3), mono(v, tx + 131, y + 248, 58, ["white", 0], { anchor: "middle", weight: 800 }), T(k, tx + 131, y + 280, { size: 22, c: "white" })); });
  return out.join("");
}, { box: CB(620, 320), hint: 'name: "Orion-7B", params: "7B", context: "128k", tags: ["open weights"]', demo: {} });

// ---------------------------------------------------------------- 8. people & mood (the existing cast, via L.inline)
const person = (o) => L.inline("person", o);
const confetti = (n, w, h, seed = 5) => { const r = L.rng(seed), cols = ["red", "yellow", "blue", "green", "pink", "orange", "teal"]; return Array.from({ length: n }, (_, i) => { const x = (r() - 0.5) * w, y = -r() * h; if (Math.abs(x) < 80 && y < -230 && y > -330) return ""; return G(F(rr(-6, -3, 12, 6, 2), [cols[i % cols.length], 0]), `translate(${f1(x)} ${f1(y)}) rotate(${f1(r() * 360)})`); }).join(""); };
const DEV = { style: "man01", outfit: "hoodie", outfitC: "purple" };
R("dev-dev-at-desk", "Developer at a laptop", "People & mood", ["developer", "programmer", "coding", "laptop", "hoodie", "engineer", "desk", "remote work", "typing"], (o) => {
  const duck = o.duck === false ? "" : at(L.inline("dev-rubber-duck", { bubble: "" }), -112, -112, 0.2);
  return L.inline("type-laptop", Object.assign({}, DEV, { face: "smile", acc: ["headphones"], accC: "gray" }, o)) + duck;
}, { box: [-190, -440, 380, 460], stand: true, hint: 'style: "man01", outfitC: "purple", face: "determined|happy|tired|shocked|smug", duck: true', demo: {} });

R("dev-10x-dev", "10x developer (cape)", "People & mood", ["10x developer", "rockstar", "senior", "hero", "genius", "ninja", "superhero", "programmer", "cape"], (o) => {
  const base = Object.assign({}, DEV, { body: "muscular", face: "smug", pose: "hips", acc: ["glasses"], hair: "spiky" }, o), A = L.anchors(base), s = A.s;
  const cape = F(sm([[-34 * s, A.sh[1]], [34 * s, A.sh[1]], [118 * s, A.hip[1] + 40 * s], [96 * s, A.hip[1] + 110 * s], [40 * s, A.hip[1] + 90 * s], [0, A.hip[1] + 116 * s], [-40 * s, A.hip[1] + 90 * s], [-96 * s, A.hip[1] + 110 * s], [-118 * s, A.hip[1] + 40 * s], [-34 * s, A.sh[1]]]), ["red", 0]);
  const badge = at(sh(L.star(0, 0, 40, 28, 10), "yellow", { w: "detail" }) + mono("10x", 0, 11, 28, ["ink", 0], { anchor: "middle", weight: 800 }), 0, A.sh[1] + 62 * s);
  const bolts = [[-150, -250, 1.2], [160, -200, 1]].map(([x, y, k]) => sh(bolt(x, y, 2.2 * k), "yellow", { w: "hair", flat: true })).join("");
  return L.shadow(0, 0, 160) + cape + person(base) + badge + bolts;
}, { box: [-200, -440, 400, 460], stand: true, hint: 'face, outfitC, body: "muscular"', demo: {} });

R("dev-on-call-pager", "On-call pager at 3 a.m.", "People & mood", ["on call", "pager", "incident", "3am", "oncall", "sre", "alert", "pagerduty-style", "night", "outage"], (o) => {
  const base = { style: "man01", outfit: "pyjamas", outfitC: "blue", face: "tired", pose: "hold", hair: "messy", look: 0 }, A = L.anchors(base), h = [(A.hands[0][0] + A.hands[1][0]) / 2, (A.hands[0][1] + A.hands[1][1]) / 2];
  const pager = at(sh(rr(-30, -20, 60, 40, 8), "gray", { w: "detail" }) + F(rr(-22, -13, 44, 18, 4), ["navy", 0]) + mono("!!", 0, 2, 17, ["red", 1], { anchor: "middle", weight: 800 }) + F(ci(-14, 12, 3.5), ["red", 0]) + F(ci(0, 12, 3.5), ["gray", 2]), h[0], h[1] - 4);
  const arcs = [-1, 1].map((sd) => [1, 2].map((k) => L.tag("path", { d: sd < 0 ? L.arc(h[0], h[1] - 4, 36 + k * 16, 150, 210) : L.arc(h[0], h[1] - 4, 36 + k * 16, -30, 30), fill: "none", stroke: L.c("red", 0), "stroke-width": 7 - k * 1.5, "stroke-linecap": "round" })).join("")).join("");
  const moon = at(sh("M0 -34 A34 34 0 1 0 28 22 A26 26 0 1 1 0 -34 Z", "cream", { w: "detail" }), -150, -360), stars = [[-100, -400, 7], [-180, -300, 5], [150, -380, 6]].map(([x, y, r]) => sh(L.star(x, y, r, r * 0.35, 4), "yellow", { w: "hair", flat: true })).join("");
  const clock = at(sh(rr(-62, -24, 124, 48, 12), "ink", { w: "detail" }) + mono(o.time || "03:12", 0, 11, 32, ["red", 1], { anchor: "middle", weight: 800 }), 140, -330);
  return moon + stars + clock + person(base) + arcs + pager;
}, { box: [-220, -440, 440, 460], stand: true, hint: 'time: "03:12"', demo: {} });

R("dev-burnout", "Burned-out developer", "People & mood", ["burnout", "tired", "overworked", "coffee", "exhausted", "deadline", "crunch", "stress", "developer"], (o) => {
  const mug = (x, y, c) => at(sh(rr(-16, -26, 32, 28, 6), c, { w: "hair" }) + L.tag("path", { d: "M16 -20 q14 2 0 14", fill: "none", stroke: L.outline(), "stroke-width": L.lw("hair") }), x, y);
  const cups = mug(-120, -112, "white") + mug(-100, -112, "orange") + mug(-110, -138, "teal") + mug(-132, -138, "pink") + mug(-118, -164, "white");
  const batt = at(sh(rr(-34, -18, 62, 36, 8), "white", { w: "detail" }) + sh(rr(28, -8, 8, 16, 3), "gray", { w: "hair", flat: true }) + F(rr(-28, -12, 12, 24, 4), ["red", 0]), 120, -400);
  const smoke = [[-24, -392, 15], [-4, -420, 11], [-34, -438, 8]].map(([x, y, r]) => F(ci(x, y, r), ["gray", 1], 0.8)).join("");
  return L.inline("type-laptop", Object.assign({}, DEV, { outfitC: "gray", face: "tired", acc: [] }, o)) + cups + batt + smoke;
}, { box: [-190, -500, 380, 520], stand: true, hint: 'face: "tired|sleepy|sad"', demo: {} });

R("dev-celebrate-ship", "Celebrate: shipped!", "People & mood", ["ship it", "launch", "release", "celebrate", "success", "deploy", "rocket", "startup", "shipped", "party"], (o) => {
  const rocket = at(sh(sm([[0, -78], [22, -44], [22, 28], [-22, 28], [-22, -44], [0, -78]]), "white", { w: "prop" }) + sh(poly([[0, -78], [18, -52], [-18, -52]], true), "red", { w: "detail" }) + sh(ci(0, -20, 11), "sky", { w: "detail" }) + sh(poly([[-22, 4], [-44, 40], [-22, 28]], true), "red", { w: "detail" }) + sh(poly([[22, 4], [44, 40], [22, 28]], true), "red", { w: "detail" }) +
    sh(sm([[-14, 30], [0, 92], [14, 30], [-14, 30]]), "orange", { w: "detail" }) + F(sm([[-7, 30], [0, 62], [7, 30], [-7, 30]]), ["yellow", 0]), 150, -330, 1.25, 18);
  const trail = L.tag("path", { d: "M100 -230 Q80 -190 60 -150", fill: "none", stroke: L.c("white"), "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": "2 14", opacity: 0.9 });
  const flag = at(sh(rr(-92, -24, 184, 48, 24), "yellow", { w: "detail" }) + T(o.text || "SHIPPED!", 0, 12, { size: 34, c: "ink" }), -90, -440);
  return person(Object.assign({}, DEV, { pose: "armsUp", face: "laugh", hair: "short" }, o)) + at(confetti(26, 360, 380, 9), 0, -20) + trail + rocket + flag;
}, { box: [-230, -490, 460, 510], stand: true, hint: 'text: "SHIPPED!", face, outfitC', demo: {} });

// ---------------------------------------------------------------- 9. news furniture (our own look: no TV-channel or platform imitation)
R("dev-breaking-card", "Breaking news card", "News cards", ["breaking", "news", "headline", "lower third", "alert", "just in", "announcement", "banner"], (o) => {
  const w = 980, h = 170, x = -w / 2, y = -h / 2, tw = 280, k = 34, out = [];
  const head = wrap(o.text || "New JavaScript runtime ships 3x faster startup", 25).slice(0, 2);
  const L1 = poly([[x + k, y], [x + tw, y], [x + tw - k, y + h], [x, y + h]], true), R1 = poly([[x + tw - 8, y + 10], [x + w, y + 10], [x + w - k, y + h - 10], [x + tw - 8 - k, y + h - 10]], true);
  out.push(drop(R1, 8, 12), sh(R1, "white", { w: "prop", flat: true }), F(poly([[x + tw - 8 - k + 8, y + h - 10], [x + w - k, y + h - 10], [x + w - k - 8, y + h - 24], [x + tw - 8 - k + 26, y + h - 24]], true), ["yellow", 0]));
  out.push(sh(L1, "red", { w: "prop" }), T(o.tag || "BREAKING", x + tw / 2 - 2, y + h / 2 + 14, { size: 40, c: "white" }));
  head.forEach((l, i) => out.push(T(l, x + tw + 24, y + (head.length === 1 ? h / 2 + 12 : 76 + i * 50) - 6, { size: head.length === 1 ? 50 : 44, anchor: "start", c: "ink" })));
  return out.join("");
}, { box: [-510, -100, 1020, 200], hint: 'tag: "BREAKING", text: "headline"', demo: {} });

R("dev-post-card", "Social post card", "News cards", ["post", "tweet", "social media", "reaction", "hot take", "viral", "thread", "comment", "likes"], (o) => {
  const w = 640, lines = wrap(o.text || "just migrated our whole stack to the new runtime. nothing broke. i am suspicious.", 36).slice(0, 5), h = 190 + lines.length * 40, x = -w / 2, y = -h / 2, out = [];
  out.push(panel(x, y, w, h, "white"), avatar(x + 62, y + 66, (o.name || "Ada")[0], o.c || "purple", 32), T(o.name || "Ada", x + 112, y + 60, { size: 30, anchor: "start", c: "ink" }), T((o.handle || "@ada_codes") + " · 2h", x + 112, y + 94, { size: 22, anchor: "start", c: "gray" }));
  lines.forEach((l, i) => out.push(T(l, x + 36, y + 150 + i * 40, { size: 29, anchor: "start", c: "ink" })));
  const ay = y + h - 40, act = [["comment", o.replies ?? 482], ["repost", o.reposts ?? 2100], ["like", o.likes ?? 12400]];
  act.forEach(([k, n], i) => {
    const ax = x + 50 + i * 190;
    if (k === "comment") out.push(sh(rr(ax - 14, ay - 14, 28, 22, 8), "gray", { w: "hair", flat: true, tone: 1 }), sh(poly([[ax - 6, ay + 6], [ax - 6, ay + 16], [ax + 4, ay + 6]], true), "gray", { w: "hair", flat: true, tone: 1 }));
    else if (k === "repost") out.push(L.tag("path", { d: `M${ax - 12} ${ay + 6} V${ay - 4} q0 -8 8 -8 h14 m-6 -6 l6 6 l-6 6 M${ax + 12} ${ay - 6} V${ay + 4} q0 8 -8 8 h-14 m6 6 l-6 -6 l6 -6`, fill: "none", stroke: L.c("gray", 0), "stroke-width": 3.4, "stroke-linecap": "round", "stroke-linejoin": "round" }));
    else out.push(sh(heart(ax, ay - 2, 1.2), "red", { w: "hair", flat: true }));
    out.push(T(num(n), ax + 26, ay + 8, { size: 22, anchor: "start", c: k === "like" ? "red" : "gray" }));
  });
  return out.join("");
}, { box: CB(640, 330), hint: 'name: "Ada", handle: "@ada_codes", text, likes: 12400, reposts, replies, c: "purple"', demo: {} });

R("dev-headline-card", "Article headline card", "News cards", ["headline", "article", "news", "story", "blog", "link preview", "press", "report"], (o) => {
  const w = 660, h = 400, x = -w / 2, y = -h / 2, c = o.c || "blue", out = [], head = wrap(o.title || "Popular framework drops support for old browsers", 30).slice(0, 3);
  out.push(panel(x, y, w, h, "white"), clipped(F(rect(x, y, w, 170), [c, 0]) + F(sm([[x, y + 170], [x + 130, y + 90], [x + 260, y + 130], [x + 400, y + 60], [x + w, y + 120], [x + w, y + 170], [x, y + 170]]), [c, 2], 0.8) + F(ci(x + w - 110, y + 60, 34), ["yellow", 0]) + sh(bolt(x + 130, y + 80, 4.4), "yellow", { w: "hair", flat: true }), rr(x, y, w, h, 18)), outl(rr(x, y, w, h, 18)));
  out.push( chip(x + 30, y + 196, o.source || "Dev Daily", "orange", { size: 20 }), T(o.date || "Oct 22", x + w - 30, y + 224, { size: 22, anchor: "end", c: "gray" }));
  head.forEach((l, i) => out.push(T(l, x + 30, y + 296 + i * 44 - (head.length < 3 ? 14 : 0), { size: 38, anchor: "start", c: "ink" })));
  return out.join("");
}, { box: CB(660, 400), hint: 'title, source: "Dev Daily", date, c: "blue"', demo: {} });

R("dev-forum-thread", "Forum thread (comments)", "News cards", ["forum", "comments", "thread", "discussion", "reddit-style", "hacker news-style", "replies", "debate", "drama"], (o) => {
  const rows = o.rows || [["ada", "this is the end of the old way", 1280, 0], ["linus", "works fine on my machine", 642, 1], ["grace", "did anyone read the changelog?", 311, 1], ["alan", "rewriting it in rust", 97, 0]], w = 700, rh = 100, h = 110 + rows.length * rh, x = -w / 2, y = -h / 2, out = [], cols = ["purple", "orange", "teal", "pink", "blue"];
  out.push(panel(x, y, w, h, "white"), T(o.title || "Is this a good idea?", x + 34, y + 62, { size: 34, anchor: "start", c: "ink" }), F(rect(x + 30, y + 86, w - 60, 2), ["gray", 1], 0.7));
  rows.forEach(([n, t, v, lv], i) => {
    const yy = y + 108 + i * rh, ix = x + 34 + lv * 50;
    if (lv) out.push(F(rect(x + 52, yy - 6, 3, rh - 10), ["gray", 1]));
    out.push(avatar(ix + 24, yy + 30, n[0].toUpperCase(), cols[i % cols.length], 22), T(n, ix + 60, yy + 22, { size: 21, anchor: "start", c: "gray" }), T(t, ix + 60, yy + 58, { size: 27, anchor: "start", c: "ink" }));
    out.push(sh(poly([[x + w - 62, yy + 36], [x + w - 48, yy + 36], [x + w - 55, yy + 24]], true), "orange", { w: "hair", flat: true }), T(num(v), x + w - 36, yy + 56, { size: 21, anchor: "end", c: "gray" }));
  });
  return out.join("");
}, { box: CB(700, 510), hint: 'title, rows: [["name", "text", votes, indent 0|1]]', demo: {} });

const flame = (x, y, k, c = "orange") => at(sh(sm([[0, -64], [20, -30], [24, 6], [0, 20], [-24, 6], [-18, -26], [0, -64]]), c, { w: "detail" }) + F(sm([[0, -30], [10, -8], [0, 10], [-10, -6], [0, -30]]), ["yellow", 0]), x, y, k);
R("dev-money-burn", "Cloud bill on fire", "News cards", ["cloud bill", "burning money", "cost", "aws bill", "expensive", "budget", "invoice", "fire", "overspend", "finops"], (o) => {
  const out = [], inv = G(drop(rr(-120, -150, 240, 300, 14), 8, 10) + sh(rr(-120, -150, 240, 300, 14), "white", { w: "prop" }) + T(o.title || "Cloud bill", 0, -100, { size: 34, c: "ink" }) + F(rect(-90, -80, 180, 2), ["gray", 1]) + [0, 1, 2].map((i) => bar(-90, -52 + i * 28, 110 - i * 14, 10, "gray", 1, 1) + mono("$" + [812, 1290, 3405][i], 90, -44 + i * 28, 20, ["gray", 2], { anchor: "end", weight: 700 })).join("") +
    F(rr(-100, 52, 200, 66, 12), ["red", 0], 0.16) + mono(o.amount || "$48,213", 0, 102, 42, ["red", 2], { anchor: "middle", weight: 800 }), "translate(0 -34) rotate(-5)");
  out.push(inv, flame(-100, 150, 1.1), flame(100, 152, 1, "red"), flame(0, 156, 1.3), flame(-50, 158, 0.8, "red"), flame(52, 160, 0.85));
  [[-200, -110, -24], [210, -60, 18], [170, -170, 30]].forEach(([x, y, r]) => out.push(at(sh(rr(-36, -20, 72, 40, 6), "green", { w: "detail" }) + F(ci(0, 0, 11), ["white", 0], 0.8) + mono("$", 0, 8, 20, ["green", 2], { anchor: "middle", weight: 800 }), x, y, 1, r)));
  return out.join("");
}, { box: [-260, -200, 520, 400], hint: 'amount: "$48,213", title', demo: {} });

const stock = (dir) => (o) => {
  const up = (o.dir || dir) === "up", c = up ? "green" : "red", pts = up ? [[-70, 54], [-28, 6], [-4, 30], [52, -40]] : [[-70, -40], [-28, 8], [-4, -16], [52, 54]], out = [];
  out.push(drop(rr(-110, -110, 220, 220, 44)), sh(rr(-110, -110, 220, 220, 44), c, { w: "prop" }), F(rr(-92, -100, 184, 22, 11), ["white", 0], 0.3));
  out.push(L.tag("path", { d: L.poly(pts), fill: "none", stroke: L.c("white"), "stroke-width": 16, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  const [ex, ey] = pts[3], ang = Math.atan2(ey - pts[2][1], ex - pts[2][0]) * 180 / Math.PI;
  out.push(at(F(poly([[24, 0], [-14, -26], [-14, 26]], true), ["white", 0]), ex, ey, 1, ang));
  if (o.pct !== "") out.push(F(rr(-76, 84, 152, 54, 27), ["ink", 0]), T(o.pct || (up ? "+24%" : "-37%"), 0, 124, { size: 40, c: up ? "green" : "red", halo: "ink", haloW: 0.02 }));
  return out.join("");
};
R("dev-stock-up", "Stock arrow · up", "News cards", ["stock", "up", "growth", "rally", "gain", "profit", "increase", "chart", "green", "valuation"], stock("up"), { box: [-140, -140, 280, 300], hint: 'pct: "+24%"', demo: {} });
R("dev-stock-down", "Stock arrow · down", "News cards", ["stock", "down", "crash", "drop", "loss", "decline", "layoffs", "red", "sell-off", "chart"], stock("down"), { box: [-140, -140, 280, 300], hint: 'pct: "-37%"', demo: {} });

// ---------------------------------------------------------------- 10. icons
const tile = (c, inner) => drop(rr(-100, -100, 200, 200, 44)) + sh(rr(-100, -100, 200, 200, 44), c, { w: "prop" }) + F(rr(-84, -90, 168, 22, 11), ["white", 0], 0.3) + inner;
const wst = (d, w = 16, c = "white") => L.tag("path", { d, fill: "none", stroke: L.c(c), "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" });
R("dev-code-icon", "Code icon  </>", "Icons", ["code", "icon", "brackets", "programming", "html", "dev", "tag", "tile"], (o) => tile(o.c || "blue", wst("M-30 -34 L-66 0 L-30 34") + wst("M30 -34 L66 0 L30 34") + wst("M12 -50 L-12 50")), { box: [-130, -130, 260, 260], hint: 'c: "blue"', demo: {} });
R("dev-git-icon", "Git branch icon", "Icons", ["git", "branch", "icon", "version control", "fork", "merge", "source control", "tile"], (o) => tile(o.c || "orange", wst("M-34 -56 V40", 12) + wst("M-34 6 Q-34 -30 30 -30", 12) + [[-34, -56], [-34, 46], [32, -30]].map(([x, y]) => sh(ci(x, y, 17), "white", { w: "detail", flat: true })).join("")), { box: [-130, -130, 260, 260], hint: 'c: "orange"', demo: {} });
R("dev-ai-sparkle", "AI sparkles", "Icons", ["ai", "sparkle", "magic", "generative", "llm", "assistant", "new feature", "stars"], () =>
  sh(L.star(-10, 6, 94, 28, 4), "purple", { w: "prop" }) + F(L.star(-26, -12, 40, 12, 4), ["white", 0], 0.35) + sh(L.star(76, -70, 44, 13, 4), "pink", { w: "detail" }) + sh(L.star(66, 70, 30, 9, 4), "yellow", { w: "detail" }) + sh(L.star(-92, -78, 22, 7, 4), "teal", { w: "hair" }), { box: [-130, -140, 260, 270], hint: '', demo: {} });
R("dev-open-source", "Open source heart", "Icons", ["open source", "oss", "heart", "community", "contribute", "free software", "love", "license"], () =>
  drop(heart(0, 0, 8.6)) + sh(heart(0, 0, 8.6), "red", { w: "prop" }) + F(heart(-14, -10, 5), ["white", 0], 0.22) + wst("M-26 -24 L-50 -4 L-26 16", 12) + wst("M26 -24 L50 -4 L26 16", 12) + wst("M8 -34 L-8 28", 12), { box: [-130, -145, 260, 275], hint: "", demo: {} });

})();
