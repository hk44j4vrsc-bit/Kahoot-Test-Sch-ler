import { json, sicher } from "../../lib/http.js";
import { pinOk } from "../../lib/pin.js";
import { zustandHost } from "../../lib/spiel.js";
import { hatSpeicher } from "../../lib/store.js";

export default sicher(async (req, res) => {
  if (!pinOk(req, res)) return;
  json(res, { ...(await zustandHost()), speicher: hatSpeicher });
});
