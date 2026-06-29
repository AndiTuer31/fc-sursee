// data/news.js — Beispieldaten bis Sanity eingebunden wird
// Struktur entspricht exakt dem Sanity-Schema "news"

export const NEWS = [
  {
    id: 1,
    kategorie: 'Spielbericht',
    titel: 'Starker Auftritt: FC Sursee gewinnt Derby gegen FC Sempach',
    datum: '15. Juni 2025',
    bild: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
    slug: 'starker-auftritt-derby-sempach',
    text: 'Ein packender Abend im Stadion Schlottermilch: Der FC Sursee setzte sich im Lokalderby gegen den FC Sempach mit 3:1 durch. Besonders in der zweiten Halbzeit dominierte die Heimmannschaft das Geschehen und belohnte sich mit einem verdienten Sieg.',
  },
  {
    id: 2,
    kategorie: 'Transfer',
    titel: 'Neuzugang: Marco Müller verstärkt die 1. Mannschaft',
    datum: '10. Juni 2025',
    bild: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
    slug: 'neuzugang-marco-mueller',
    text: 'Der FC Sursee freut sich, den Transfer von Marco Müller bekanntzugeben. Der 24-jährige Mittelfeldspieler wechselt vom FC Willisau und bringt wertvolle Erfahrung aus der 2. Liga interregional mit.',
  },
  {
    id: 3,
    kategorie: 'Event',
    titel: 'Hallenturnier 2026 — Jetzt Anmelden und dabei sein!',
    datum: '5. Juni 2025',
    bild: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    slug: 'hallenturnier-2026-anmeldung',
    text: 'Das traditionelle FC Sursee Hallenturnier findet auch 2026 wieder statt. Anmeldungen für Teams aus der Region sind ab sofort möglich. Die Plätze sind begrenzt — sicher dir jetzt deinen Startplatz.',
  },
  {
    id: 4,
    kategorie: 'Verein',
    titel: 'Generalversammlung 2025 — Rückblick und Ausblick',
    datum: '28. Mai 2025',
    bild: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    slug: 'generalversammlung-2025',
    text: 'Die diesjährige Generalversammlung des FC Sursee fand im Klubhaus statt. Der Vorstand präsentierte einen erfolgreichen Abschluss der Saison 2024/25 und gab einen Ausblick auf die kommenden Projekte.',
  },
  {
    id: 5,
    kategorie: 'Jugend',
    titel: 'Unsere U15 gewinnt den Zentralschweizer Cup',
    datum: '20. Mai 2025',
    bild: 'https://images.unsplash.com/photo-1551958219-acbc595d8a8e?w=800&q=80',
    slug: 'u15-gewinnt-zentralschweizer-cup',
    text: 'Grosser Erfolg für den Nachwuchs: Die U15 des FC Sursee hat den Zentralschweizer Cup gewonnen. Nach einem spannenden Finale setzten sich die Jungs verdient durch — ein toller Erfolg für das gesamte Juniorenprogramm.',
  },
  {
    id: 6,
    kategorie: 'Spielbericht',
    titel: 'Auswärtssieg in Luzern — 2:0 gegen FC Littau',
    datum: '12. Mai 2025',
    bild: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    slug: 'auswaertssieg-luzern-littau',
    text: 'Auch auswärts zeigt der FC Sursee eine starke Leistung. Gegen den FC Littau gewann die 1. Mannschaft verdient mit 2:0 und festigte damit ihre Position in der oberen Tabellenhälfte der 2. Liga interregional.',
  },
]

export const KATEGORIEN = ['Alle', 'Spielbericht', 'Transfer', 'Verein', 'Jugend', 'Event']
