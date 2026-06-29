# FC Sursee Website — Vollständiger Projektverlauf

> Erstellt: 25. Juni 2026  
> Projekt: fcsursee.ch (React + Vite + Sanity CMS + Firebase Hosting)  
> Hosting: https://fc-sursee.web.app

---

## 🗂️ Projektübersicht

**Tech-Stack:**
- React 19 + Vite 8 (Rolldown Bundler)
- Tailwind CSS v3
- Sanity.io CMS (projectId: `ek289jzm`, dataset: `production`)
- Firebase Hosting
- Google Analytics 4 (ID: `G-ZP4BCCWQ1L`)

---

## 📋 Session 1 — Aufbau der Gesamtwebseite

### Erledigte Tasks (43 Tasks)

| # | Task | Status |
|---|------|--------|
| 1 | Git initialisieren + GitHub verbinden | ✅ |
| 2 | React + Vite Setup (frontend/) | ✅ |
| 3 | Tailwind CSS v3 einrichten | ✅ |
| 4 | Projekt verifizieren (npm run dev) | ✅ |
| 5 | Navbar.jsx bauen | ✅ |
| 6 | Hero.jsx bauen | ✅ |
| 7 | TickerBand.jsx bauen | ✅ |
| 8 | NaechstesSpiel.jsx bauen | ✅ |
| 9 | NewsGrid.jsx bauen | ✅ |
| 10 | Footer.jsx bauen | ✅ |
| 11 | SponsorenGrid.jsx bauen | ✅ |
| 12 | News-Seite (/news) | ✅ |
| 13 | Aktive-Seite (/aktive) | ✅ |
| 14 | Kontakt-Seite (/kontakt) | ✅ |
| 15 | Verein-Seite (/verein) | ✅ |
| 16 | Sponsoren-Seite (/sponsoren) | ✅ |
| 17 | Nachwuchs-Seite (/nachwuchs) | ✅ |
| 18 | Events-Seite (/events + /events/:slug) | ✅ |
| 19 | Club-222-Seite (/club-222) | ✅ |
| 20 | Hero: Saison entfernen, neue Zeilenstruktur | ✅ |
| 21 | NaechstesSpiel → mehrere Spiele, Gastbild, Heim/Auswärts | ✅ |
| 22 | News: Bilder verknüpfen + Autor in Vorschau | ✅ |
| 23 | Sponsoren: Benefits + Links | ✅ |
| 24 | Sanity: Zahlen-Kategorie in siteSettings | ✅ |
| 25 | Leitbild: Icon Nachwuchs Förderung fixen, Text gendern | ✅ |
| 26 | Aktive Teams: Teamfoto, Positionen, Trikotnummer, Sortierung | ✅ |
| 27 | Nachwuchs: Alterskategorien G-A, mehrere Trainer, Modal | ✅ |
| 28 | Diverses: Vorstand-Karten grösser, Favicon, PersonCards | ✅ |
| 36 | SEO: react-helmet-async auf allen Seiten | ✅ |
| 37 | imageUrl(): WebP + lazy loading | ✅ |
| 38 | PortableText: Listen + Links | ✅ |
| 39 | Google Analytics 4 (G-ZP4BCCWQ1L) | ✅ |
| 40 | Schriftart: Inter (Bebas Neue entfernt) | ✅ |
| 41 | NewsArtikel: Breadcrumb-Navigation | ✅ |
| 42 | Auswärtsspiel: grauer Hintergrund | ✅ |
| 43 | Aktive Spieler: Foto-Verknüpfung fixen | ✅ |

---

### Wichtige Entscheidungen (Session 1)

**Google Analytics:** GA4 Measurement ID `G-ZP4BCCWQ1L` in `index.html` gesetzt (3 Vorkommen).

**Schriftart:** Bebas Neue → vollständig auf Inter umgestellt.

**Hero-Text:** Outline-Effekt (`-webkit-text-stroke`) war wegen überlappender Linien unschön → Solid Weiss/Rot mit `text-shadow` für Lesbarkeit.

**Sponsoren-Gruppen umbenannt:**
- "Premium Partner" → Trikotsponsoren
- "Partner" → Stadionsponsoren
- Neu: Reisepartner, Hallenturniersponsoren, Ernährungspartner, Tankpartner

**Sanity Schemen erstellt:**
- `clubhaus.js` — Bilder, Betreiber, Beschreibung, Öffnungszeiten, Kontakt, Dokumente
- `offeneStelle.js` — Stellenbeschreibung, Pensum, aktiv, Dokumente
- `siteSettings.js` — Alle konfigurierbaren Inhalte (Hero-Bilder, CTAs, Zahlen, Matchcenter-URLs)

**Fairgate-Entscheidung:**
- Problem: Vater hat Bedenken wegen Verknüpfungen
- Lösung: **Option A** — Neue Website ersetzt Fairgate-Website; Fairgate bleibt nur für interne Mitgliedsverwaltung
- Nächster Schritt: Rico holt Fairgate-Login, prüft aktuellen Stand vor Vorstandspräsentation

**Kritische Bugs entdeckt und gefixt:**
1. Edit-Tool truncates Unicode-Dateien → immer Python `open(path, 'w', encoding='utf-8')` verwenden
2. Null-Bytes nach Python-Writes auf Windows-Mount → `raw.replace(b'\x00', b'')` verwenden
3. GROQ `{ asset-> }` Bug bei Teamfotos → bare field ohne Projection verwenden
4. Logo-Ausrichtung in SpielCard → CSS Grid `gridTemplateColumns: '200px 1fr 160px'` statt Flexbox

---

### Chat-Auszüge (Session 1)

**Rico:** "füge es selbst am richtigen ort ein" *(GA4 ID)*

**Rico:** "suche eine andere schrift, die besser ist als outline, nicht, dass die linien so überkreuzt sind. zudem finde ich die gestaltung der facts nun schön. schreibe es aber bitte in weiss anstatt rot. Zudem finde ich so wie das Teamfoto jetzt ist, gefällt es mir auch nicht. Ich finde es sollte schon das ganze drauf, aber es sollte nicht so einen dicken rand haben an der seite."

**Rico:** "überall umlaute ausgeschrieben. Negativ Beispiel Naechste Spiele. Logos in einer Linie ausgerichtet vertikal bei den nächsten spielen. Filter bei Vereinsführung. Möglichkeit um jobs anzuzeigen → offene stellen. Clubhaus unter Verein. Nicht stürmer sondern Angreifer. Ein bisschen länger bis es Bild im header wechselt + der übergang soll kürzer sein. Stelle sicher, dass wenn links auf seiten angeklickt werden, dass man dann zuoberst auf die seite gelangt. Sponsorengruppen: Trikotsponsoren / Stadionsponsoren / Reisepartner / Hallenturniersponsoren / Ernährungspartner / Tankpartner"

**Rico:** "wenn du die seite anschaust, bist du immer noch überzeugt, dass die gratisversion von sanity reicht?"  
**Claude:** Ja — FC Sursee bleibt klar unter den Free-Plan-Limits (3 User, 10GB Assets, 2 Datasets). Kein Upgrade nötig.

**Rico:** "Die links bei tabelle & Resultate sollen im sanity ebenfalls anpassbar sein. Offene stellen sollen unter Verein kommen. Zudem soll man bei den Stellen im Sanity ebenfalls noch Dokumente anfügen können. Die Bilder der Betreiber ein bisschen grösser angezeigt werden. Die bilder bei den nachwuchs teams werden nicht angezeigt."

---

## 📋 Session 2 — Mobile + Finishing

### Datum: 25. Juni 2026

---

### Änderungen dieser Session

**Rico:** "Offene Stellen aus Main-Navigation. Clubhausbesitzer Möglichkeit für Mails. Zudem direkt so eine schwarze box (ähnlich wie beim Nachwuchs bei Mach mit und den buttons. Button soll dann direkt auf den sanity email adresse verlinken). Bildkarussell ein bisschen schneller wechseln. + schaue, dass der Übergang noch ein bisschen cleaner ist. Plus das wichtigste, was mir besonders auffällt, ist dass die Seite überhaupt nicht mobile optimiert ist. Bitte gehe bei der Responsive Version nochmals stark drüber und schaue, dass alles schön und sinnvoll dargestellt wird."

**Was umgesetzt wurde:**

#### 🗑️ Offene Stellen aus Navigation
- Entfernt aus `VEREIN_LINKS` in Navbar.jsx
- Weiterhin erreichbar als Tab unter `/verein`

#### ⚡ Karussell — CSS Crossfade
- Interval: 12s → **8s**
- Transition: Flash-Methode (opacity 0 → Bild wechseln → opacity 1) → **CSS Crossfade** (alle Bilder übereinandergelegt, sanfte 0.8s Opacity-Transition)
- State vereinfacht: `sichtbar`-State entfernt, nur noch `aktiv`-Index

#### 📧 Clubhaus Betreiber Email
- Neues `email` + `telefon` Feld im Sanity Schema (`clubhaus.js`)
- Anzeige in Betreiber-Karten mit Mail- und Telefon-Icon
- GROQ Query updated: `"betreiber": betreiber[] { name, funktion, email, telefon, foto }`

#### ⬛ Clubhaus CTA Box
```
┌─────────────────────────────────────────────────────┐
│  Reservierung & Anfragen                            │
│  Das Clubhaus kann für Anlässe...                   │
│                              [Jetzt anfragen →]     │
└─────────────────────────────────────────────────────┘
```
- Button verlinkt auf `mailto:{kontaktEmail}` aus Sanity
- Fallback auf `betreiber[0].email` oder `info@fcsursee.ch`

#### 📱 Mobile Responsive — Vollständiger Pass

**Hero:**
- H1: `text-5xl` → `text-4xl sm:text-5xl md:text-7xl`
- Stats-Spacing: `pr-10 pl-10` → `pr-5 pl-5 md:pr-10 md:pl-10`
- Stats-Zahlen: `text-4xl` → `text-2xl sm:text-3xl md:text-4xl`
- Section padding: `py-28` → `py-20 md:py-36`
- CTA-Buttons: `text-base` → `text-sm md:text-base`

**Verein — Tab-Navigation:**
- Problem: 4 Tabs ("Leitbild", "Vereinsführung", "Offene Stellen", "Dokumente") passen auf 360px-Screen nicht
- Fix: `overflow-x-auto scrollbar-none` + `whitespace-nowrap` auf Tab-Buttons
- Leitbild Box: `p-10` → `p-6 md:p-10`

**Aktive — Team-Hero:**
- Trainer-Info + Spielplan-Button: `flex items-end justify-between` → `flex flex-col sm:flex-row sm:items-end sm:justify-between`
- H2: `text-3xl` → `text-2xl sm:text-3xl`
- Spielplan-Button: war `hidden md:inline-block` → jetzt immer sichtbar

**Nachwuchs:**
- Intro-Stats: `text-4xl` → `text-2xl sm:text-4xl` für Zahlen
- Stats-Card: `p-5` → `p-2 sm:p-5`
- CTA Box: `p-10` → `p-6 md:p-10`

**Allgemein (alle Seiten):**
- `px-6` → `px-4 md:px-6` auf NaechstesSpiel, Events, Sponsoren, Kontakt, News, NewsGrid, Tabelle, Footer
- `py-16` → `py-12 md:py-16` auf Page-Headers
- SpielCard: `p-6 md:p-8` → `p-4 md:p-8`
- Footer: `py-14` → `py-10 md:py-14`

---

### Build-Ergebnis

```
✓ built in 25.06s
dist/assets/index-FRqzFNTj.js  517.07 kB │ gzip: 144.86 kB
```

Kein Fehler. Bereit für:
```bash
cd frontend && firebase deploy --only hosting
cd studio && npx sanity deploy
```

---

## 🏗️ Dateistruktur (Stand: 25.06.2026)

```
fc-sursee/
├── frontend/
│   ├── index.html                    # GA4: G-ZP4BCCWQ1L, lang="de"
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx                  # ScrollToTop + BrowserRouter
│   │   ├── App.jsx                   # Routes inkl. /clubhaus, /offene-stellen
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Dropdown: Verein, Teams
│   │   │   ├── Hero.jsx              # CSS Crossfade, 8s Interval
│   │   │   ├── NaechstesSpiel.jsx    # Mehrere Spiele, CSS Grid
│   │   │   ├── NewsGrid.jsx
│   │   │   ├── Tabelle.jsx           # URLs aus siteSettings
│   │   │   ├── Footer.jsx
│   │   │   └── TickerBand.jsx
│   │   ├── pages/
│   │   │   ├── Aktive.jsx            # Teamfoto, Positionen, Trikotnummer
│   │   │   ├── Nachwuchs.jsx         # G-A Kategorien, Modal
│   │   │   ├── Verein.jsx            # 4 Tabs: Leitbild/Führung/Stellen/Dokumente
│   │   │   ├── Clubhaus.jsx          # Betreiber mit Email, CTA Box
│   │   │   ├── OffeneStellen.jsx     # Standalone-Seite (noch zugänglich)
│   │   │   ├── Sponsoren.jsx         # 11 Kategorien
│   │   │   ├── Events.jsx
│   │   │   ├── News.jsx
│   │   │   ├── NewsArtikel.jsx       # PortableText, Breadcrumb
│   │   │   ├── Kontakt.jsx
│   │   │   └── Club222.jsx
│   │   └── lib/
│   │       ├── sanity.js             # Client + imageUrl()
│   │       ├── useSiteSettings.js    # Hook für siteSettings Singleton
│   │       └── usePageTitle.js       # document.title + meta description
└── studio/
    └── schemaTypes/
        ├── index.js
        ├── siteSettings.js           # Hero, CTAs, Zahlen, Matchcenter URLs
        ├── news.js
        ├── team.js                   # Angreifer (war: Stürmer)
        ├── nachwuchs.js
        ├── vorstand.js
        ├── sponsor.js                # 11 Kategorien
        ├── event.js
        ├── dokument.js
        ├── naechstesSpiel.js
        ├── clubhaus.js               # Betreiber mit email + telefon
        └── offeneStelle.js           # inkl. Dokumente-Feld
```

---

## 🔑 Technische Notizen

### Kritische Regeln (immer beachten)

1. **Unicode-Dateien** → immer Python `open(path, 'w', encoding='utf-8')` statt Edit-Tool
2. **Null-Bytes** → nach Python-Write: `raw.replace(b'\x00', b'')`
3. **GROQ Bilder** → nie `{ asset-> }` — bare field `teamfoto` verwenden
4. **Rolldown (Vite 8)** → strenger bei Encoding-Issues als Vite 5

### Sanity Free Plan — Status ✅
- 3 Admin-User → reicht für kleinen Verein
- 10 GB Assets → reicht für Bilder/Dokumente
- API-Calls unbegrenzt (CDN)
- Empfehlung: Kein Upgrade nötig

### Fairgate-Situation
- Fairgate = Swiss Club SaaS (Mitglieder, Finanzen, eigene CMS-Website)
- Problem: Doppelpflege, Board nicht informiert, eigene Website vorhanden
- **Entschied: Option A** — Neue Website gewinnt, Fairgate bleibt nur für interne Verwaltung
- Nächster Schritt: Rico holt Fairgate-Login vor Board-Präsentation

---

## 📌 Offene Punkte / Todo

- [ ] Firebase deploy nach letztem Build ausführen
- [ ] Sanity Studio deployen (für neues Betreiber-Email-Feld)
- [ ] Fairgate-Login erhalten, aktuellen Stand prüfen
- [ ] Vorstandspräsentation vorbereiten
- [ ] Mobile Testing auf echtem Gerät (bisher nur Desktop-Vorschau)
- [ ] `/offene-stellen` Route → evtl. Redirect zu `/verein?tab=Offene+Stellen`

---

*Protokoll generiert von Claude (Anthropic) — FC Sursee Website-Projekt 2026*
