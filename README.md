# Live-Quiz «Bauliche Kenntnisse · Abend 01»

Kahoot-artiges Quiz fürs Klassenzimmer. Die Lehrperson zeigt die Fragen am Beamer, die Teilnehmenden spielen mit dem Handy mit (WLAN oder Mobilfunk).

- **Teilnehmende:** `https://<deine-adresse>.vercel.app`
- **Lehrperson:** `https://<deine-adresse>.vercel.app/host` (mit PIN geschützt)
- **Direkt mit dem Bauprozess-Quiz:** `https://<deine-adresse>.vercel.app/host?set=bauprozess`

## Einrichten auf Vercel (einmalig)

1. Auf [vercel.com](https://vercel.com) mit «Continue with GitHub» anmelden.
2. **Add New → Project** → dieses Repository auswählen → **Import**.
3. Vor dem Klick auf «Deploy» unter **Environment Variables** eintragen:
   - Name `LEHRER_PIN`, Wert: ein PIN deiner Wahl (z. B. 6 Ziffern). Mit diesem PIN öffnest du `/host`.
4. **Deploy** klicken.
5. Im Projekt auf **Storage** → **Upstash for Redis** (Marketplace) → Gratis-Plan wählen → mit dem Projekt verbinden. Vercel setzt die nötigen Variablen automatisch.
6. Unter **Deployments** beim obersten Eintrag «⋯» → **Redeploy**, damit der Speicher aktiv wird.

Fertig. `/host` öffnen, PIN eingeben, die Lobby zeigt Adresse und QR-Code für die Handys.

## Im Unterricht

- Leertaste oder Knopf unten rechts: Frage → Auflösung → Rangliste → nächste Frage.
- Eine Frage wird automatisch aufgelöst, wenn die Zeit abläuft oder alle geantwortet haben.
- Punkte: richtig = 500 bis 1000, je schneller, desto mehr.
- Namen in der Lobby anklicken = Person entfernen. «Alle entfernen» vor einer neuen Klasse.
- Spielstände werden nach 2 Tagen automatisch gelöscht.

## Fragensätze

Es gibt zwei Sätze: `abend1` (24 Fragen, Standard) und `bauprozess` (8 Fragen «Welche Phase?»). In der Lobby lässt sich der Satz im Feld «Fragen» wechseln, oder direkt über die Adresse `/host?set=bauprozess`.

## Fragen ändern

Die Fragen stehen in `lib/fragen.js`, je Satz ein Eintrag. Die **erste Antwort** jeder Frage ist die richtige, im Spiel wird gemischt. Nach dem Speichern auf GitHub veröffentlicht Vercel automatisch neu.

## Aufbau

- `public/index.html`: Ansicht Teilnehmende (Handy)
- `public/host.html`: Ansicht Lehrperson (Beamer)
- `api/`: Vercel-Funktionen (Node.js, ohne Zusatzpakete)
- `lib/`: Spiellogik, Speicher (Upstash Redis über REST), Fragen
- `public/static/`: Schriften, Stil, QR-Code-Generator

Nur `public/` ist öffentlich abrufbar. Die Fragen mit den Lösungen in `lib/` bleiben auf dem Server.
