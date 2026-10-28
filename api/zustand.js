import { json, query, sicher } from "../lib/http.js";
import { zustandSpieler } from "../lib/spiel.js";

export default sicher(async (req, res) => {
  const q = query(req);
  json(res, await zustandSpieler(q.id || "", q.ver, q.ph));
});
