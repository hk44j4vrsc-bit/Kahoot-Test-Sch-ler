export async function leseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  let d = "";
  for await (const teil of req) {
    d += teil;
    if (d.length > 10000) break;
  }
  try { return JSON.parse(d || "{}"); } catch { return {}; }
}

export function query(req) {
  return Object.fromEntries(new URL(req.url, "http://x").searchParams);
}

export function json(res, obj, code = 200) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

// Fängt Fehler ab, damit die Seiten eine verständliche Meldung bekommen.
export function sicher(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      json(res, { fehler: String(e && e.message || e) }, 500);
    }
  };
}
