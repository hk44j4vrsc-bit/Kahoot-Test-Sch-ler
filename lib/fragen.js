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
    "thema": "Fassaden",
    "frage": "Jede Fassade hat Tragwerk, Dämmung und Witterungsschutz, aber anders gelöst. Wer schützt jeweils vor Regen und Wind?",
    "typ": "zuordnen",
    "kategorien": [
     "Kompaktfassade",
     "Zweischalenmauerwerk",
     "Hinterlüftete Fassade",
     "Innengedämmte Fassade"
    ],
    "antworten": [
     "dünner Putz direkt auf der Dämmung",
     "äussere Mauerschale (Sichtmauerwerk)",
     "Bekleidung mit Luftschicht dahinter",
     "die tragende Aussenwand selbst"
    ],
    "loesung": [
     0,
     1,
     2,
     3
    ],
    "sekunden": 45,
    "einmal": true,
    "erklaerung": "Kompakt: Putz auf Dämmung. Zweischalen: äussere Mauerschale. Hinterlüftet: Bekleidung, die Luftschicht trocknet ab. Innengedämmt: die Mauer aussen bleibt sichtbar und schützt selbst."
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
    "frage": "Dachbegriffe: Zieht jeden Begriff zur passenden Nummer auf der Skizze.",
    "bild_svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"270 240 960 690\"><polygon points=\"320,575 320,750 535,872 535,727 415,527\" fill=\"#fff\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"535,727 535,872 718,768 718,595\" fill=\"#E4ECF1\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"718,625 718,768 955,903 955,757\" fill=\"#fff\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"955,757 955,903 1170,780 1170,635\" fill=\"#E4ECF1\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"406,693 406,798 449,822 449,717\" fill=\"#F0C4BE\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"815,706 815,775 856,797 856,728\" fill=\"#E4ECF1\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"879,743 879,812 920,834 920,765\" fill=\"#E4ECF1\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"434,458 555,263 718,357 480,482\" fill=\"#F0C4BE\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"415,527 718,357 718,595 535,727\" fill=\"#F0C4BE\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"718,357 955,495 955,757 718,625\" fill=\"#F0C4BE\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"955,495 1195,620 955,757\" fill=\"#D9606F\" stroke=\"#1B237A\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polyline points=\"294,588 718,357\" fill=\"none\" stroke=\"#1B237A\" stroke-width=\"3\"/><polyline points=\"294,588 415,527\" fill=\"none\" stroke=\"#1B237A\" stroke-width=\"3\"/><circle cx=\"807\" cy=\"409\" r=\"27\" fill=\"#1B237A\" stroke=\"#fff\" stroke-width=\"4\"/><text x=\"807\" y=\"420\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-weight=\"700\" font-size=\"32\" fill=\"#fff\">1</text><circle cx=\"835\" cy=\"688\" r=\"27\" fill=\"#1B237A\" stroke=\"#fff\" stroke-width=\"4\"/><text x=\"835\" y=\"699\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-weight=\"700\" font-size=\"32\" fill=\"#fff\">2</text><circle cx=\"348\" cy=\"563\" r=\"27\" fill=\"#1B237A\" stroke=\"#fff\" stroke-width=\"4\"/><text x=\"348\" y=\"574\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-weight=\"700\" font-size=\"32\" fill=\"#fff\">3</text><circle cx=\"955\" cy=\"626\" r=\"27\" fill=\"#1B237A\" stroke=\"#fff\" stroke-width=\"4\"/><text x=\"955\" y=\"637\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-weight=\"700\" font-size=\"32\" fill=\"#fff\">4</text><circle cx=\"718\" cy=\"475\" r=\"27\" fill=\"#1B237A\" stroke=\"#fff\" stroke-width=\"4\"/><text x=\"718\" y=\"486\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-weight=\"700\" font-size=\"32\" fill=\"#fff\">5</text></svg>",
    "typ": "zuordnen",
    "kategorien": [
     "First",
     "Traufe",
     "Ortgang",
     "Grat",
     "Kehle"
    ],
    "antworten": [
     "Punkt 1",
     "Punkt 2",
     "Punkt 3",
     "Punkt 4",
     "Punkt 5"
    ],
    "loesung": [
     0,
     1,
     2,
     3,
     4
    ],
    "sekunden": 45,
    "einmal": true,
    "erklaerung": "First oben, Traufe unten mit Rinne, Ortgang seitlich am Giebel, Grat aussen, Kehle innen."
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
    "frage": "Welches Rahmenmaterial passt? Ordnet jedes Material der passenden Aussage zu.",
    "typ": "zuordnen",
    "kategorien": [
     "Holz",
     "Holz-Metall",
     "Metall",
     "Kunststoff"
    ],
    "antworten": [
     "nachwachsender, einheimischer Rohstoff",
     "kaum Unterhalt, das Holz ist optimal geschützt",
     "nicht brennbar, sehr feine Profile möglich",
     "braucht Metalleinlagen für die Stabilität"
    ],
    "loesung": [
     0,
     1,
     2,
     3
    ],
    "sekunden": 45,
    "einmal": true,
    "erklaerung": "Holz wächst nach, bei Holz-Metall schützt die Metallschale das Holz, Metall brennt nicht und erlaubt feine Profile, Kunststoff braucht Metalleinlagen (Aufgabe 6.3.3)."
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
    "frage": "Welche Schliessanlage ist das? Ordnet jedes System der passenden Aussage zu.",
    "typ": "zuordnen",
    "kategorien": [
     "mechanisch",
     "mechatronisch",
     "elektronisch"
    ],
    "antworten": [
     "Schlüssel verloren: Zylinder müssen ersetzt werden",
     "Schlüssel mit Chip: ein verlorener Schlüssel wird sofort gesperrt",
     "Badge statt Schlüssel: Zutritt wird gesteuert und aufgezeichnet"
    ],
    "loesung": [
     0,
     1,
     2
    ],
    "sekunden": 45,
    "einmal": true,
    "erklaerung": "Mechanisch: Zylinder ersetzen. Mechatronisch: Fräsung plus Chip, sofort sperrbar. Elektronisch: Zutritt steuern und aufzeichnen."
   },
   {
    "thema": "Schliessanlage",
    "frage": "Bei einem geschützten Profil kann jeder Schlüsseldienst ohne Ausweis einen Nachschlüssel machen.",
    "antworten": [
     "Falsch",
     "Richtig"
    ],
    "feste_antworten": [
     "Richtig",
     "Falsch"
    ],
    "erklaerung": "Falsch. Nachschlüssel gibt es nur mit Sicherungskarte und Ausweis."
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
   },
   {
    "thema": "Sonnenschutz",
    "frage": "Arten von Sonnenschutz: Ordnet jede Art der passenden Aussage zu.",
    "typ": "zuordnen",
    "kategorien": [
     "Fensterladen",
     "Rollladen",
     "Lamellenstoren",
     "Stoffstoren",
     "innen"
    ],
    "antworten": [
     "aus Holz, Metall oder Kunststoff, seitlich aufklappbar",
     "guter Einbruchschutz",
     "Licht regulierbar",
     "z. B. Markise oder Senkrechtstore",
     "weniger wirksam als aussen"
    ],
    "loesung": [
     0,
     1,
     2,
     3,
     4
    ],
    "sekunden": 45,
    "einmal": true,
    "erklaerung": "Fensterladen klappt auf, Rollladen schützt vor Einbruch, Lamellenstoren regulieren das Licht, Stoffstoren sind Markisen oder Senkrechtstoren. Innen liegender Sonnenschutz ist weniger wirksam."
   }
  ]
 }
};
