// Spiellogik des Live-Quiz. Der Zustand liegt in Redis, damit alle Vercel-Funktionen denselben Stand sehen.
import { randomBytes } from "node:crypto";
import { pipe, befehl, alsObjekt, hatSpeicher } from "./store.js";
import DATEN from "./fragen.js";

const K = {
  zustand: "quiz:zustand",
  spieler: "quiz:spieler",   // id -> Name
  namen: "quiz:namen",       // name klein -> id
  punkte: "quiz:punkte",     // id -> Punkte
  serie: "quiz:serie",       // id -> richtige in Folge
  antworten: r => `quiz:antworten:${r}`, // id -> {wahl, ok, pkt}
};
const TTL = 60 * 60 * 24 * 2; // Daten verschwinden nach 2 Tagen von selbst
const PUNKTE_MAX = 1000;
const MAX_SPIELER = 100;
const ERSTER = Object.keys(DATEN)[0];
const satzVon = z => DATEN[z.satz] || DATEN[ERSTER];
const fragenVon = z => satzVon(z).fragen;

function neu(satz = ERSTER) {
  const d = DATEN[satz] || DATEN[ERSTER];
  return {
    phase: "lobby", qi: -1, start: 0, reihenfolge: [], runde: 0, ver: 1,
    satz: DATEN[satz] ? satz : ERSTER,
    sekunden: Number(d.sekunden_pro_frage) || 20,
    ordnung: d.fragen.map((_, i) => i),
  };
}

export async function lade() {
  const s = await befehl(["GET", K.zustand]);
  const z = s ? JSON.parse(s) : neu();
  if (!DATEN[z.satz]) z.satz = ERSTER;
  return z;
}

async function speichere(z, zusatz = []) {
  z.ver = (z.ver || 0) + 1;
  await pipe([["SET", K.zustand, JSON.stringify(z), "EX", TTL], ...zusatz]);
}

const frage = z => fragenVon(z)[z.ordnung[z.qi]];
const richtigIndex = z => z.reihenfolge.indexOf(0);
// Eine Frage kann eine eigene Zeit haben (z. B. 60 s für eine Rechnung), sonst gilt die Zeit aus der Lobby
const dauer = z => (z.qi >= 0 && frage(z)?.sekunden) || z.sekunden;
const restMs = (z, jetzt) => Math.max(0, z.start + dauer(z) * 1000 - jetzt);

export function effektivePhase(z, jetzt = Date.now()) {
  if (z.phase === "frage" && jetzt >= z.start + dauer(z) * 1000) return "aufloesung";
  return z.phase;
}

function mischen(a) {
  a = a.slice();
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}

function naechste(z) {
  z.qi += 1;
  if (z.qi >= fragenVon(z).length) { z.phase = "ende"; return; }
  const f = frage(z), fest = satzVon(z).feste_antworten;
  const idx = f.antworten.map((_, i) => i);
  // Bei Richtig/Falsch-Sätzen steht immer «Richtig» links, sonst wird gemischt
  z.reihenfolge = fest ? idx.sort((a, b) => fest.indexOf(f.antworten[a]) - fest.indexOf(f.antworten[b])) : mischen(idx);
  z.runde += 1;
  z.phase = "frage";
  z.start = Date.now() + 800; // kurze Vorlaufzeit
}

function rangliste(spieler, punkte, letzte) {
  return Object.entries(spieler)
    .map(([id, name]) => ({ id, name, punkte: Number(punkte[id] || 0), letzte: letzte[id] || 0 }))
    .sort((a, b) => b.punkte - a.punkte || a.name.localeCompare(b.name, "de"));
}

// ---------------- Lehrperson ----------------

export async function aktion(was, wert, erwartet) {
  const z = await lade();
  const phase = effektivePhase(z);
  if (erwartet && erwartet !== phase) return; // Doppelklick oder veraltete Ansicht
  z.phase = phase;
  const loescheStand = [["DEL", K.punkte, K.serie]];

  if (was === "start" && (phase === "lobby" || phase === "ende")) {
    const zusatz = [];
    if (phase === "ende") {
      z.qi = -1;
      const sp = alsObjekt(await befehl(["HGETALL", K.spieler]));
      zusatz.push(...loescheStand);
      for (const id of Object.keys(sp)) zusatz.push(["HSET", K.punkte, id, 0]);
    }
    naechste(z);
    return speichere(z, zusatz);
  }
  if (was === "weiter") {
    if (phase === "frage") z.phase = "aufloesung";
    else if (phase === "aufloesung") z.phase = z.qi < fragenVon(z).length - 1 ? "rangliste" : "ende";
    else if (phase === "rangliste") naechste(z);
    else return;
    return speichere(z);
  }
  if (was === "beenden") { z.phase = "ende"; return speichere(z); }
  if (was === "lobby") {
    z.phase = "lobby"; z.qi = -1;
    const sp = alsObjekt(await befehl(["HGETALL", K.spieler]));
    return speichere(z, [...loescheStand, ...Object.keys(sp).map(id => ["HSET", K.punkte, id, 0])]);
  }
  if (was === "entfernen" && wert) {
    const name = await befehl(["HGET", K.spieler, wert]);
    const b = [["HDEL", K.spieler, wert], ["HDEL", K.punkte, wert], ["HDEL", K.serie, wert]];
    if (name) b.push(["HDEL", K.namen, name.toLowerCase()]);
    return speichere(z, b);
  }
  if (was === "alle_entfernen") {
    Object.assign(z, neu(z.satz), { runde: z.runde, ver: z.ver, sekunden: z.sekunden, ordnung: z.ordnung });
    return speichere(z, [["DEL", K.spieler, K.namen, K.punkte, K.serie]]);
  }
  if (was === "sekunden" && wert) {
    z.sekunden = Math.max(5, Math.min(120, parseInt(wert, 10) || 20));
    return speichere(z);
  }
  if (was === "satz" && DATEN[wert] && (phase === "lobby" || phase === "ende")) {
    if (wert === z.satz && phase === "lobby") return;
    Object.assign(z, neu(wert), { runde: z.runde, ver: z.ver });
    const sp = alsObjekt(await befehl(["HGETALL", K.spieler]));
    return speichere(z, [["DEL", K.punkte, K.serie], ...Object.keys(sp).map(id => ["HSET", K.punkte, id, 0])]);
  }
  if (was === "mischen" && phase === "lobby") {
    z.ordnung = mischen(z.ordnung);
    return speichere(z);
  }
}

export async function zustandHost() {
  const z = await lade();
  const jetzt = Date.now();
  let phase = effektivePhase(z, jetzt);
  const [spF, pkF, antF] = await pipe([
    ["HGETALL", K.spieler], ["HGETALL", K.punkte],
    ["HGETALL", K.antworten(z.runde)],
  ]);
  const spieler = alsObjekt(spF), punkte = alsObjekt(pkF), antw = alsObjekt(antF);
  const nSpieler = Object.keys(spieler).length;
  const beantwortet = Object.keys(antw).filter(id => id in spieler).length;

  // Alle haben geantwortet: Frage sofort auflösen
  if (phase === "frage" && nSpieler > 0 && beantwortet >= nSpieler) {
    z.phase = phase = "aufloesung";
    await speichere(z);
  }

  const out = {
    phase, titel: satzVon(z).titel, satz: z.satz,
    saetze: Object.entries(DATEN).map(([id, d]) => ({ id, titel: d.titel, anzahl: d.fragen.length })),
    sekunden: dauer(z), anzahl: fragenVon(z).length, qi: z.qi, runde: z.runde,
    spieler: Object.entries(spieler).map(([id, name]) => ({ id, name })),
  };
  if (["frage", "aufloesung", "rangliste"].includes(phase) && z.qi >= 0) {
    const f = frage(z);
    Object.assign(out, {
      thema: f.thema || "", frage: f.frage, bild: f.bild_svg || "",
      optionen: z.reihenfolge.map(k => f.antworten[k]),
      rest_ms: restMs(z, jetzt), beantwortet,
    });
    if (phase !== "frage") {
      const verteilung = z.reihenfolge.map(() => 0);
      for (const [id, a] of Object.entries(antw)) if (id in spieler) verteilung[JSON.parse(a).wahl]++;
      Object.assign(out, { richtig: richtigIndex(z), verteilung, erklaerung: f.erklaerung || "" });
    }
  }
  if (phase === "rangliste" || phase === "ende") {
    const letzte = {};
    for (const [id, a] of Object.entries(antw)) letzte[id] = JSON.parse(a).pkt;
    out.rangliste = rangliste(spieler, punkte, letzte);
  }
  return out;
}

// ---------------- Teilnehmende ----------------

export async function beitreten(rohName) {
  const name = String(rohName || "").replace(/\s+/g, " ").trim().slice(0, 20);
  if (!name) return { fehler: "Bitte gib einen Namen ein." };
  // Auf Vercel ohne Speicher würde der Name sofort wieder vergessen
  if (!hatSpeicher && process.env.VERCEL) return { fehler: "Das Quiz ist noch nicht fertig eingerichtet (Speicher fehlt). Bitte der Lehrperson melden." };
  if (Number(await befehl(["HLEN", K.spieler])) >= MAX_SPIELER) return { fehler: "Das Spiel ist voll." };
  const id = randomBytes(9).toString("base64url");
  let versuch = name;
  for (let k = 2; k < 60; k++) {
    const [ok] = await pipe([["HSETNX", K.namen, versuch.toLowerCase(), id]]);
    if (Number(ok) === 1) {
      await pipe([
        ["HSET", K.spieler, id, versuch], ["HSET", K.punkte, id, 0],
        ["EXPIRE", K.spieler, TTL], ["EXPIRE", K.namen, TTL], ["EXPIRE", K.punkte, TTL],
      ]);
      return { id, name: versuch };
    }
    versuch = `${name} ${k}`;
  }
  return { fehler: "Bitte wähle einen anderen Namen." };
}

export async function antworten(id, qi, wahl) {
  const z = await lade();
  if (effektivePhase(z) !== "frage" || qi !== z.qi) return false;
  if (!Number.isInteger(wahl) || wahl < 0 || wahl >= z.reihenfolge.length) return false;
  const name = await befehl(["HGET", K.spieler, String(id)]);
  if (!name) return false;
  const vergangen = Math.max(0, Date.now() - z.start) / 1000;
  const ok = wahl === richtigIndex(z);
  const pkt = ok ? Math.round(PUNKTE_MAX * (1 - Math.min(1, vergangen / dauer(z)) / 2)) : 0;
  const [neuGesetzt] = await pipe([["HSETNX", K.antworten(z.runde), id, JSON.stringify({ wahl, ok, pkt })]]);
  if (Number(neuGesetzt) !== 1) return false;
  await pipe([
    ["EXPIRE", K.antworten(z.runde), TTL],
    ["HINCRBY", K.punkte, id, pkt],
    ok ? ["HINCRBY", K.serie, id, 1] : ["HSET", K.serie, id, 0],
    ["EXPIRE", K.serie, TTL],
  ]);
  return true;
}

// ver/ph: was das Handy schon kennt. Ist nichts neu, kommt eine kurze Antwort (spart Datenbank-Abfragen).
export async function zustandSpieler(id, ver, ph) {
  const z = await lade();
  const jetzt = Date.now();
  const phase = effektivePhase(z, jetzt);
  if (id && String(z.ver) === String(ver) && ph === phase) return { gleich: true };

  const [name, antw, pkt] = await pipe([
    ["HGET", K.spieler, id || "-"], ["HGET", K.antworten(z.runde), id || "-"], ["HGET", K.punkte, id || "-"],
  ]);
  if (!name) return { phase: "unbekannt" };
  const a = antw ? JSON.parse(antw) : null;
  const out = {
    phase, ver: z.ver, name, punkte: Number(pkt || 0), titel: satzVon(z).titel,
    anzahl: fragenVon(z).length, qi: z.qi, runde: z.runde,
  };
  if (["frage", "aufloesung", "rangliste"].includes(phase) && z.qi >= 0) {
    const f = frage(z);
    Object.assign(out, {
      frage: f.frage, optionen: z.reihenfolge.map(k => f.antworten[k]),
      rest_ms: restMs(z, jetzt), sekunden: dauer(z), beantwortet: Boolean(a),
    });
  }
  if (phase !== "frage" && phase !== "lobby") {
    const [pkF, serie] = await pipe([["HGETALL", K.punkte], ["HGET", K.serie, id]]);
    const alle = Object.values(alsObjekt(pkF)).map(Number);
    const meine = Number(pkt || 0);
    Object.assign(out, {
      rang: alle.filter(p => p > meine).length + 1, von: alle.length,
      serie: Number(serie || 0),
    });
    if (phase !== "ende") {
      Object.assign(out, {
        richtig: richtigIndex(z), ok: Boolean(a && a.ok), pkt: a ? a.pkt : 0,
        gewaehlt: a ? a.wahl : null,
      });
    }
  }
  return out;
}
