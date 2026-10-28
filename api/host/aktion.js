import { json, leseBody, sicher } from "../../lib/http.js";
import { pinOk } from "../../lib/pin.js";
import { aktion } from "../../lib/spiel.js";

export default sicher(async (req, res) => {
  if (req.method !== "POST") return json(res, { fehler: "POST erwartet" }, 405);
  if (!pinOk(req, res)) return;
  const d = await leseBody(req);
  await aktion(d.aktion, d.wert, d.phase);
  json(res, { ok: true });
});
