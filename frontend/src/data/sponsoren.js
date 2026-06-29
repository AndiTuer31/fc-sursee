// data/sponsoren.js — Beispieldaten bis Sanity eingebunden wird
// Struktur entspricht exakt dem Sanity-Schema "sponsor"

export const SPONSOREN = [
  { id: 1,  name: 'Hauptsponsor AG',        website: '#', kategorie: 'Haupt',          logo: null },
  { id: 2,  name: 'Co-Sponsor 1 GmbH',      website: '#', kategorie: 'Co',             logo: null },
  { id: 3,  name: 'Co-Sponsor 2 AG',        website: '#', kategorie: 'Co',             logo: null },
  { id: 4,  name: 'Trikot-Partner AG',      website: '#', kategorie: 'Dress',          logo: null },
  { id: 5,  name: 'Stadion Partner',        website: '#', kategorie: 'Stadion',        logo: null },
  { id: 6,  name: 'Ausrüster Sport AG',     website: '#', kategorie: 'Ausrüster',      logo: null },
  { id: 7,  name: 'Reisebüro Sursee',       website: '#', kategorie: 'Reise',          logo: null },
  { id: 8,  name: 'Hallenturnier Sponsor',  website: '#', kategorie: 'Hallenturnier',  logo: null },
]

export const KATEGORIEN_REIHENFOLGE = [
  { key: 'Haupt',         label: 'Hauptsponsor',        beschreibung: 'Unser grösster Partner' },
  { key: 'Co',            label: 'Co-Sponsoren',         beschreibung: 'Langjährige Vereinspartner' },
  { key: 'Dress',         label: 'Trikotsponsor',        beschreibung: 'Partner auf unserem Trikot' },
  { key: 'Stadion',       label: 'Stadionpartner',       beschreibung: 'Partner im Schlottermilch' },
  { key: 'Ausrüster',     label: 'Ausrüster',            beschreibung: 'Sportausrüstung & Material' },
  { key: 'Reise',         label: 'Reisepartner',         beschreibung: 'Offizieller Reisepartner' },
  { key: 'Hallenturnier', label: 'Hallenturnier',        beschreibung: 'Partner des Hallenturniers' },
]
