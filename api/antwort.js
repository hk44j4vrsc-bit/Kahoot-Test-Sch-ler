import { json, leseBody, sicher } from "../lib/http.js";
import { antworten } from "../lib/spiel.js";

export default sicher(async (req, res) => {
  if (req.method !== "POST") return json(res, { fehler: "POST erwartet" }, 405);
  const d = await leseBody(req);
  json(res, { ok: await antworten(d.id, d.qi, d.wahl) });
});
