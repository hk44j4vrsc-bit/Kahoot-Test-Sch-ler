import { json, leseBody, sicher } from "../lib/http.js";
import { beitreten } from "../lib/spiel.js";

export default sicher(async (req, res) => {
  if (req.method !== "POST") return json(res, { fehler: "POST erwartet" }, 405);
  const d = await leseBody(req);
  const r = await beitreten(d.name);
  json(res, r, r.fehler ? 400 : 200);
});
