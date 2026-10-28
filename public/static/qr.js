// Kleiner QR-Code-Generator (Byte-Modus, Fehlerkorrektur M, Version 1 bis 6), ohne Abhängigkeiten.
(function () {
  const TAB = { 1: [16, 1, 10], 2: [28, 1, 16], 3: [44, 1, 26], 4: [32, 2, 18], 5: [43, 2, 24], 6: [27, 4, 16] };
  const ALIGN = { 1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34] };

  function mul(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z & 0xff;
  }
  function divisor(grad) {
    const r = new Array(grad - 1).fill(0).concat([1]);
    let root = 1;
    for (let i = 0; i < grad; i++) {
      for (let j = 0; j < grad; j++) {
        r[j] = mul(r[j], root);
        if (j + 1 < grad) r[j] ^= r[j + 1];
      }
      root = mul(root, 2);
    }
    return r;
  }
  function rest(daten, div) {
    const r = new Array(div.length).fill(0);
    for (const b of daten) {
      const f = b ^ r.shift();
      r.push(0);
      div.forEach((c, i) => { r[i] ^= mul(c, f); });
    }
    return r;
  }

  function matrix(text) {
    const daten = Array.from(new TextEncoder().encode(text));
    let v = 1;
    for (; v <= 6; v++) if (daten.length + 2 <= TAB[v][0] * TAB[v][1]) break;
    if (v > 6) throw new Error("Text zu lang");
    const [nD, nB, nE] = TAB[v];
    const kap = nD * nB;
    const bits = [0, 1, 0, 0];
    for (let i = 7; i >= 0; i--) bits.push((daten.length >>> i) & 1);
    for (const b of daten) for (let i = 7; i >= 0; i--) bits.push((b >>> i) & 1);
    for (let i = 0; i < 4 && bits.length < kap * 8; i++) bits.push(0);
    while (bits.length % 8) bits.push(0);
    const cw = [];
    for (let i = 0; i < bits.length; i += 8) cw.push(parseInt(bits.slice(i, i + 8).join(""), 2));
    for (let p = 0; cw.length < kap; p++) cw.push(p % 2 ? 0x11 : 0xec);
    const div = divisor(nE);
    const bl = [];
    for (let i = 0; i < nB; i++) bl.push(cw.slice(i * nD, (i + 1) * nD));
    const ec = bl.map(b => rest(b, div));
    const alle = [];
    for (let i = 0; i < nD; i++) bl.forEach(b => alle.push(b[i]));
    for (let i = 0; i < nE; i++) ec.forEach(e => alle.push(e[i]));

    const n = 17 + 4 * v;
    const mod = [], fkt = [];
    for (let y = 0; y < n; y++) { mod.push(new Array(n).fill(false)); fkt.push(new Array(n).fill(false)); }
    const setze = (x, y, d) => { mod[y][x] = d; fkt[y][x] = true; };
    for (let i = 0; i < n; i++) { setze(6, i, i % 2 === 0); setze(i, 6, i % 2 === 0); }
    for (const [cx, cy] of [[3, 3], [n - 4, 3], [3, n - 4]])
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx, y = cy + dy;
        if (x >= 0 && x < n && y >= 0 && y < n) { const d = Math.max(Math.abs(dx), Math.abs(dy)); setze(x, y, d !== 2 && d !== 4); }
      }
    const pos = ALIGN[v], L = pos.length;
    pos.forEach((ax, i) => pos.forEach((ay, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === L - 1) || (i === L - 1 && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setze(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    for (let i = 0; i < 9; i++) { fkt[i][8] = true; fkt[8][i] = true; }
    for (let i = 0; i < 8; i++) { fkt[8][n - 1 - i] = true; fkt[n - 1 - i][8] = true; }

    let k = 0;
    for (let rechts = n - 1; rechts >= 1; rechts -= 2) {
      if (rechts === 6) rechts = 5;
      for (let vert = 0; vert < n; vert++) for (let j = 0; j < 2; j++) {
        const x = rechts - j, hoch = ((rechts + 1) & 2) === 0, y = hoch ? n - 1 - vert : vert;
        if (!fkt[y][x] && k < alle.length * 8) { mod[y][x] = ((alle[k >>> 3] >>> (7 - (k & 7))) & 1) === 1; k++; }
      }
    }
    const masken = [
      (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x, y) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => (x * y) % 2 + (x * y) % 3 === 0,
      (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0, (x, y) => ((x + y) % 2 + (x * y) % 3) % 2 === 0,
    ];
    function mitMaske(m) {
      const g = mod.map(r => r.slice());
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!fkt[y][x] && masken[m](x, y)) g[y][x] = !g[y][x];
      let r = m;
      for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      const fb = ((m << 10) | r) ^ 0x5412;
      const bit = i => ((fb >>> i) & 1) === 1;
      for (let i = 0; i < 6; i++) g[i][8] = bit(i);
      g[7][8] = bit(6); g[8][8] = bit(7); g[8][7] = bit(8);
      for (let i = 9; i < 15; i++) g[8][14 - i] = bit(i);
      for (let i = 0; i < 8; i++) g[8][n - 1 - i] = bit(i);
      for (let i = 8; i < 15; i++) g[n - 15 + i][8] = bit(i);
      g[n - 8][8] = true;
      return g;
    }
    function strafe(g) {
      let s = 0;
      for (let t = 0; t < 2; t++) for (let a = 0; a < n; a++) {
        let lauf = 1;
        for (let b = 1; b < n; b++) {
          const p = t ? g[b][a] : g[a][b], q = t ? g[b - 1][a] : g[a][b - 1];
          if (p === q) lauf++; else { if (lauf >= 5) s += lauf - 2; lauf = 1; }
        }
        if (lauf >= 5) s += lauf - 2;
      }
      for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++)
        if (g[y][x] === g[y][x + 1] && g[y][x] === g[y + 1][x] && g[y][x] === g[y + 1][x + 1]) s += 3;
      return s;
    }
    let best = null, bestS = Infinity;
    for (let m = 0; m < 8; m++) { const g = mitMaske(m), s = strafe(g); if (s < bestS) { best = g; bestS = s; } }
    return best;
  }

  window.qrSvg = function (text, farbe) {
    const g = matrix(text), n = g.length, r = 4, s = n + 2 * r;
    let p = "";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (g[y][x]) p += `M${x + r},${y + r}h1v1h-1z`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" shape-rendering="crispEdges"><rect width="${s}" height="${s}" fill="#fff"/><path d="${p}" fill="${farbe || "#1B237A"}"/></svg>`;
  };
})();
