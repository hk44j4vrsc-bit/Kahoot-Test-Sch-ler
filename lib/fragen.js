// Fragensatz für das Live-Quiz (Abend 02, 06 Baukonstruktion). Aufruf: /host
// Normale Frage: die ERSTE Antwort ist die richtige, im Spiel wird gemischt.
// typ "reihenfolge": Antworten in richtiger Reihenfolge. typ "zuordnen": loesung = Kategorie pro Begriff.
export default {
 "baukonstruktion": {
  "titel": "Baukonstruktion kompakt · Abend 02",
  "sekunden_pro_frage": 20,
  "fragen": [
   {
    "thema": "Tragkonstruktion",
    "frage": "Welches Konstruktionselement ist «das Skelett» des Gebäudes?",
    "antworten": [
     "Tragkonstruktion",
     "Gebäudehülle",
     "Innenausbau",
     "Haustechnik"
    ],
    "erklaerung": "Die Tragkonstruktion sorgt für die Standsicherheit (Aufgabe 6.2)."
   },
   {
    "thema": "Tragkonstruktion",
    "frage": "Im Wohnzimmer im 1. OG steht ein schwerer Schrank. Wie gelangt sein Gewicht in den Boden? Bringt die Bauteile in die richtige Reihenfolge.",
    "typ": "reihenfolge",
    "antworten": [
     "Decke",
     "Wände und Stützen",
     "Fundament",
     "Baugrund"
    ],
    "sekunden": 40,
    "erklaerung": "Die Decke trägt den Schrank und gibt die Last an Wände und Stützen weiter. Diese leiten sie ins Fundament, das Fundament in den Baugrund."
   },
   {
    "thema": "Fundament",
    "frage": "Der Baugrund ist schlecht. Was braucht es zusätzlich zum Fundament?",
    "antworten": [
     "Pfählung",
     "Kerndämmung",
     "Hinterlüftung",
     "Dampfbremse"
    ],
    "erklaerung": "Spezieller Baugrund verlangt besondere Fundationen wie Pfählungen (Aufgabe 6.1)."
   },
   {
    "thema": "Fassaden",
    "frage": "Der Aussenputz liegt direkt auf der Dämmung. Welche Fassade ist das?",
    "antworten": [
     "Kompaktfassade",
     "Hinterlüftete Fassade",
     "Zweischalenmauerwerk",
     "Innengedämmte Fassade"
    ],
    "erklaerung": "Kompaktfassade: dünner Putz aussen, darum mechanisch verletzbar."
   },
   {
    "thema": "Fassaden",
    "frage": "Teurere Variante, aber sehr guter Witterungsschutz. Welche Fassade?",
    "antworten": [
     "Hinterlüftete Fassade",
     "Kompaktfassade",
     "Innengedämmte Fassade",
     "Zweischalenmauerwerk"
    ],
    "erklaerung": "Hinterlüftete Fassade: Luftschicht zwischen Dämmung und Bekleidung (Aufgabe 6.3.1 a)."
   },
   {
    "thema": "Fassaden",
    "frage": "Wann dämmt man eine Fassade von innen?",
    "antworten": [
     "Wenn eine historische Fassade erhalten bleibt",
     "Bei jedem Neubau",
     "Bei Flachdächern",
     "Wenn es möglichst günstig sein soll"
    ],
    "erklaerung": "Innendämmung nur in speziellen Fällen, heikel zu konstruieren."
   },
   {
    "thema": "Fassaden",
    "frage": "Beim Zweischalenmauerwerk liegt die Dämmung zwischen zwei Mauerschalen.",
    "antworten": [
     "Richtig",
     "Falsch"
    ],
    "feste_antworten": [
     "Richtig",
     "Falsch"
    ],
    "erklaerung": "Richtig. Man spricht von Kerndämmung: robust und speichert die Wärme gut."
   },
   {
    "thema": "Dächer",
    "frage": "Ab welcher Neigung spricht man von einem Steildach?",
    "antworten": [
     "ab 23°",
     "ab 5°",
     "ab 15°",
     "ab 45°"
    ],
    "erklaerung": "Flachdach 0–5°, flach geneigt 5–23°, Steildach 23–45°."
   },
   {
    "thema": "Dächer",
    "frage": "Wie heisst die untere, waagrechte Dachkante mit der Dachrinne?",
    "antworten": [
     "Traufe",
     "First",
     "Grat",
     "Ortgang"
    ],
    "erklaerung": "Traufe unten, First oben, Ortgang seitlich am Giebel."
   },
   {
    "thema": "Fenster",
    "frage": "Welcher Fensterrahmen ist die preiswerteste Variante?",
    "antworten": [
     "Kunststoff",
     "Holz",
     "Holz-Metall",
     "Metall"
    ],
    "erklaerung": "Kunststoff ist am günstigsten, braucht aber Metalleinlagen (Aufgabe 6.3.3 b)."
   },
   {
    "thema": "Fenster",
    "frage": "Welches Rahmenmaterial passt? Zieht jedes Material zur passenden Aussage.",
    "typ": "zuordnen",
    "kategorien": [
     "Holz",
     "Holz-Metall",
     "Metall",
     "Kunststoff"
    ],
    "antworten": [
     "Naturmaterial, muss regelmässig gestrichen werden",
     "innen Holz, aussen Metall",
     "brennt nicht",
     "am günstigsten"
    ],
    "loesung": [
     0,
     1,
     2,
     3
    ],
    "sekunden": 45,
    "einmal": true,
    "erklaerung": "Holz muss gepflegt werden, Holz-Metall ist innen Holz und aussen geschützt, Metall brennt nicht, Kunststoff ist am günstigsten (Aufgabe 6.3.3)."
   },
   {
    "thema": "Fenster",
    "frage": "Warum passieren mit Glas trotz Sicherheitsglas Unfälle?",
    "antworten": [
     "Ungeeignete Glasart oder falsche Halterung",
     "Glas ist zu dünn",
     "Zu viel Sonne",
     "Fehlende Storen"
    ],
    "erklaerung": "Aufgabe 6.3.3 c, siehe bfu-Broschüre «Glas in der Architektur»."
   },
   {
    "thema": "Schliessanlage",
    "frage": "Ein Schlüssel geht verloren. Welches System sperrt ihn sofort?",
    "antworten": [
     "Mechatronische Schliessanlage",
     "Mechanische Schliessanlage",
     "Einfaches Schloss",
     "Schliessplan"
    ],
    "erklaerung": "Mechatronisch: Fräsung plus Chip, der verlorene Schlüssel wird elektronisch gesperrt."
   },
   {
    "thema": "Schliessanlage",
    "frage": "Der Schliessplan ist offensichtlich nicht aktuell. Was tun?",
    "antworten": [
     "Beim Hersteller aktuellen Plan anfordern",
     "Neue Anlage bestellen",
     "Mieter befragen",
     "Schlüsseldienst rufen"
    ],
    "erklaerung": "Im Werk ist jede Änderung und Nachbestellung festgehalten (Aufgabe 6.3.4 c)."
   },
   {
    "thema": "Sonnenschutz",
    "frage": "Welcher Sonnenschutz ist ein starres System?",
    "antworten": [
     "Vordach",
     "Lamellenstoren",
     "Rollladen",
     "Knickarmstore"
    ],
    "erklaerung": "Starr: Vordach, Dachvorsprung, Umgang, Blenden (Aufgabe 6.3.5 b)."
   }
  ]
 }
};
