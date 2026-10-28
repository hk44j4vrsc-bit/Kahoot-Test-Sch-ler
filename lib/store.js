// Speicher für den Spielstand: Upstash Redis über die REST-Schnittstelle (ohne Zusatzpakete).
// Vercel setzt die Variablen automatisch, wenn Upstash Redis im Vercel-Marketplace verbunden wird.
// Ohne Variablen läuft ein Arbeitsspeicher-Ersatz (nur für lokale Tests geeignet).

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
export const hatSpeicher = Boolean(URL_ && TOKEN);

const mem = new Map();

function hash(k) {
  if (!mem.has(k)) mem.set(k, new Map());
  return mem.get(k);
}

function memBefehl([befehl, k, ...a]) {
  switch (befehl.toUpperCase()) {
    case "GET": return mem.has(k) ? mem.get(k) : null;
    case "SET": mem.set(k, String(a[0])); return "OK";
    case "DEL": { let n = 0; for (const key of [k, ...a]) if (mem.delete(key)) n++; return n; }
    case "EXPIRE": return 1;
    case "HGET": { const h = mem.get(k); return h && h.has(a[0]) ? h.get(a[0]) : null; }
    case "HSET": { const h = hash(k); let n = 0; for (let i = 0; i < a.length; i += 2) { if (!h.has(a[i])) n++; h.set(a[i], String(a[i + 1])); } return n; }
    case "HSETNX": { const h = hash(k); if (h.has(a[0])) return 0; h.set(a[0], String(a[1])); return 1; }
    case "HDEL": { const h = mem.get(k); let n = 0; if (h) for (const f of a) if (h.delete(f)) n++; return n; }
    case "HLEN": { const h = mem.get(k); return h ? h.size : 0; }
    case "HGETALL": { const h = mem.get(k); const out = []; if (h) for (const [f, v] of h) out.push(f, v); return out; }
    case "HINCRBY": { const h = hash(k); const v = Number(h.get(a[0]) || 0) + Number(a[1]); h.set(a[0], String(v)); return v; }
    default: throw new Error("Unbekannter Befehl " + befehl);
  }
}

export async function pipe(befehle) {
  if (!hatSpeicher) return befehle.map(memBefehl);
  const r = await fetch(URL_.replace(/\/$/, "") + "/pipeline", {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(befehle.map(b => b.map(String))),
  });
  if (!r.ok) throw new Error("Speicher antwortet nicht (" + r.status + ")");
  const d = await r.json();
  return d.map(x => {
    if (x.error) throw new Error(x.error);
    return x.result;
  });
}

export async function befehl(b) {
  return (await pipe([b]))[0];
}

export function alsObjekt(flach) {
  const o = {};
  for (let i = 0; i < (flach || []).length; i += 2) o[flach[i]] = flach[i + 1];
  return o;
}
