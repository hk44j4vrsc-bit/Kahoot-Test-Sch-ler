// Die Lehrpersonen-Ansicht ist mit einem PIN geschützt (Vercel-Umgebungsvariable LEHRER_PIN).
import { json } from "./http.js";

export function pinOk(req, res) {
  const soll = String(process.env.LEHRER_PIN || "").trim();
  if (!soll) {
    json(res, { fehler: "pin_fehlt" }, 503);
    return false;
  }
  const ist = String(req.headers["x-pin"] || "").trim();
  if (ist !== soll) {
    json(res, { fehler: "pin_falsch" }, 401);
    return false;
  }
  return true;
}
