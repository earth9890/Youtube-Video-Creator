      // whiteboard-video-studio engine — hand-drawn stroke-on drawing + stick figure rig for HyperFrames.
      // Paste as the first thing in the composition <script> (defines tl, board, TL helpers).
      // Needs <g id="board" filter="url(#marker)"> in the SVG (see templates/index.head.html).
const NS = "http://www.w3.org/2000/svg";
      const INK = "#161616", RED = "#e0312b", GREEN = "#3f9e4a", LEAF = "#a8dca8", YEL = "#ffd23f", SKY = "#d9ecff", PINK = "#ffd9df";
      const GY = 860;
      const tl = gsap.timeline({ paused: true });
      const board = document.getElementById("board");
            // Retiming hook: m() maps design time -> final time. Identity by default.
      // To fit scenes to a voice track, set OLDA/NEWA anchor arrays and use the piecewise map (see references/edit-playbook.md).
      const m = (t) => t;
      const makeTL = (mf) => ({
        to: (t, v, p) => { const a = mf(p), e = mf(p + (v.duration || 0)); return tl.to(t, { ...v, duration: Math.max(0.001, e - a) }, a); },
        fromTo: (t, f, v, p) => { const a = mf(p), e = mf(p + (v.duration || 0)); return tl.fromTo(t, f, { ...v, duration: Math.max(0.001, e - a) }, a); },
        set: (t, v, p) => tl.set(t, v, mf(p)),
      });
      const TL = makeTL(m), IDTL = makeTL((t) => t);


      // ---------- deterministic hand-drawn helpers ----------
      let seed = 11;
      const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      const J = (a) => (rnd() - 0.5) * a;
      const f1 = (n) => n.toFixed(1);
      const el = (tag, attrs, parent) => {
        const e = document.createElementNS(NS, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        parent.appendChild(e);
        return e;
      };
      const poly = (pts, jit = 3) => pts.map((p, i) => `${i ? "L" : "M"}${f1(p[0] + J(jit))} ${f1(p[1] + J(jit))}`).join(" ");
      const line = (a, b) => {
        const mx = (a[0] + b[0]) / 2 + J(8), my = (a[1] + b[1]) / 2 + J(8);
        return `M${f1(a[0] + J(3))} ${f1(a[1] + J(3))} Q${f1(mx)} ${f1(my)} ${f1(b[0] + J(3))} ${f1(b[1] + J(3))}`;
      };
      const smooth = (pts) => {
        let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
          d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
        }
        return d;
      };
      const circ = (cx, cy, r, ry = r) => {
        const n = 16, a0 = rnd() * 6.28, pts = [];
        for (let i = 0; i <= n + 1; i++) {
          const a = a0 + (i / n) * Math.PI * 2 * 1.03, k = 1 + (rnd() - 0.5) * 0.05;
          pts.push([cx + Math.cos(a) * r * k, cy + Math.sin(a) * ry * k]);
        }
        return smooth(pts);
      };
      const rect = (x, y, w, h) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x - 3, y - 2]], 2.5);
      const rays = (cx, cy, r1, r2, n, a0 = 0, span = Math.PI * 2) => {
        let d = "";
        for (let i = 0; i < n; i++) {
          const a = a0 + (i / Math.max(1, n - (span < 6 ? 1 : 0))) * span;
          d += `M${f1(cx + Math.cos(a) * r1)} ${f1(cy + Math.sin(a) * r1)} L${f1(cx + Math.cos(a) * r2)} ${f1(cy + Math.sin(a) * r2)} `;
        }
        return d;
      };
      // heart-shaped leaf whose tip sits at (cx,cy), pointing toward the centre from direction `ang`
      const heart = (cx, cy, k, ang) => {
        const pts = [];
        for (let i = 0; i <= 28; i++) {
          const t = Math.PI + (i / 28) * Math.PI * 2;
          let x = 16 * Math.pow(Math.sin(t), 3) * k, y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t) - 17) * k * -1;
          y = (-(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) - 17) * k;
          const c = Math.cos(ang), s = Math.sin(ang);
          pts.push([cx + x * c - y * s, cy + x * s + y * c]);
        }
        return smooth(pts);
      };

      // ---------- scene + drawing (all times are absolute seconds) ----------
      function scene(start, end, opts = {}) {
        const g = el("g", {}, board);
        const S = { g, start, end };
        S.TL = opts.abs ? IDTL : TL;
        S.TL.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, start);
        S.TL.to(g, { opacity: 0, duration: 0.3, ease: "none" }, end - 0.3);
        // slow camera push-in
        S.TL.fromTo(g, { scale: 1 }, { scale: 1.045, svgOrigin: "960 540", duration: end - start, ease: "none" }, start);
        S.draw = (d, t, dur, o = {}) => {
          const p = el("path", {
            d, pathLength: 1, fill: "none", stroke: o.c || INK, "stroke-width": o.w || 7,
            "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "1 2",
          }, o.parent || g);
          S.TL.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: o.ease || "power1.inOut" }, t);
          if (o.fill) {
            p.setAttribute("fill", o.fill);
            p.style.fillOpacity = 0;
            S.TL.to(p, { fillOpacity: 1, duration: 0.3 }, t + dur * 0.8);
          }
          return p;
        };
        S.grp = (parent) => el("g", {}, parent || g);
        return S;
      }

      // stick figure: outer g translates, inner gi rotates, parts inside gi
      function fig(S, cx, gy, o = {}) {
        const s = o.s || 1, sit = !!o.sit;
        const g = el("g", {}, S.g), gi = el("g", {}, g);
        const hip = [cx, gy - (sit ? 10 : 130) * s], sh = [cx, hip[1] - 125 * s], hd = [cx, sh[1] - 45 * s], r = 42 * s;
        const pp = (base, pts) => poly([base, ...pts.map((p) => [base[0] + p[0] * s, base[1] + p[1] * s])], 2);
        const sw = 7 * Math.max(s, 0.85);
        const mk = (d) => el("path", { d, pathLength: 1, fill: "none", stroke: INK, "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "1 2", "stroke-dashoffset": 1 }, gi);
        const legsDef = sit ? [[[70, -5], [75, 128]], [[95, 10], [100, 128]]] : [[[-8, 62], [-35, 130]], [[8, 62], [35, 130]]];
        const P = {
          head: mk(circ(hd[0], hd[1], r)),
          body: mk(line([hd[0], hd[1] + r], hip)),
          armL: mk(pp(sh, o.armL || [[-28, 52], [-48, 100]])),
          armR: mk(pp(sh, o.armR || [[28, 52], [48, 100]])),
          legL: mk(pp(hip, o.legL || legsDef[0])),
          legR: mk(pp(hip, o.legR || legsDef[1])),
        };
        const F = { g, gi, P, s, cx, gy, sh, hip, hd };
        F.draw = (t, dur) => {
          const seq = [["head", 0.26], ["body", 0.18], ["armL", 0.14], ["armR", 0.14], ["legL", 0.14], ["legR", 0.14]];
          let tt = t;
          seq.forEach(([k, w]) => {
            S.TL.fromTo(P[k], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: w * dur, ease: "none" }, tt);
            tt += w * dur;
          });
        };
        // simple face: eyes + mouth ("smile" | "sad" | "flat"); dx shifts the look direction
        F.face = (t, kind = "smile", dx = 0) => {
          const e = (x) => S.draw(circ(hd[0] + (x + dx) * s, hd[1] - 6 * s, 4.5 * s), t, 0.12, { parent: gi, w: 5 * s, fill: INK });
          e(-15); e(15);
          const m = kind === "sad" ? [[-14, 24], [0, 14], [14, 24]] : kind === "flat" ? [[-12, 20], [12, 20]] : [[-14, 14], [0, 24], [14, 14]];
          S.draw(smooth(m.map((p) => [hd[0] + (p[0] + dx) * s, hd[1] + p[1] * s - 2 * s])), t + 0.1, 0.2, { parent: gi, w: 5 * s });
        };
        // walking leg sets
        const pair = (a, b) => [mk(pp(hip, a)), mk(pp(hip, b))];
        const WS = [pair([[8, 64], [-50, 124]], [[-4, 66], [34, 132]]), pair([[0, 66], [-10, 132]], [[0, 66], [10, 132]]), pair([[-4, 66], [34, 132]], [[8, 64], [-50, 124]])];
        WS.forEach((pr) => pr.forEach((p) => { p.setAttribute("stroke-dashoffset", 0); p.style.opacity = 0; }));
        const orig = [P.legL, P.legR];
        const showSet = (t, k) => {
          S.TL.set([...orig, ...WS.flat()], { opacity: 0 }, t);
          S.TL.set(k < 0 ? orig : WS[k], { opacity: 1 }, t);
        };
        F.walk = (t0, dur, props, stepLen = 0.2) => {
          S.TL.to(g, { ...props, duration: dur, ease: "none" }, t0);
          const n = Math.floor(dur / stepLen), seq = [0, 1, 2, 1];
          for (let i = 0; i < n; i++) showSet(t0 + i * stepLen, seq[i % 4]);
          showSet(t0 + dur, -1);
        };
        return F;
      }

      