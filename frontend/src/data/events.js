// data/events.js — Beispieldaten bis Sanity eingebunden wird
// Struktur entspricht exakt dem Sanity-Schema "event"

export const EVENTS = [
  {
    id: 1,
    name: 'Hallenturnier FC Sursee 2026',
    datum: '2026-01-17',
    datumFormatiert: '17. Januar 2026',
    ort: 'Sporthalle Schlottermilch, Sursee',
    titelbild: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    beschreibung: 'Das traditionelle Hallenturnier des FC Sursee — für Juniorenteams aus der ganzen Region. Jetzt anmelden und dabei sein!',
    slug: 'hallenturnier-2026',
    in_navigation: true,
    programm: [
      { zeit: '08:00 Uhr', beschreibung: 'Türöffnung & Check-in' },
      { zeit: '09:00 Uhr', beschreibung: 'Gruppenspiele Junioren C/D' },
      { zeit: '12:00 Uhr', beschreibung: 'Mittagspause' },
      { zeit: '13:00 Uhr', beschreibung: 'Gruppenspiele Junioren A/B' },
      { zeit: '16:00 Uhr', beschreibung: 'Halbfinals' },
      { zeit: '17:30 Uhr', beschreibung: 'Finale & Rangverkündigung' },
    ],
    buttons: [
      { label: 'Jetzt anmelden', url: '#', typ: 'primär' },
      { label: 'Reglement (PDF)', url: '#', typ: 'sekundär' },
    ],
  },
  {
    id: 2,
    name: 'Grümpelturnier Sursee 2025',
    datum: '2025-08-23',
    datumFormatiert: '23. August 2025',
    ort: 'Stadion Schlottermilch, Sursee',
    titelbild: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
    beschreibung: 'Der gesellige Sommerhöhepunkt: Das Grümpelturnier bringt Teams aus Sursee und Umgebung zusammen. Spass, Sport und Gemeinschaft.',
    slug: 'gruempelturnier-2025',
    in_navigation: false,
    programm: [
      { zeit: '10:00 Uhr', beschreibung: 'Spielbeginn Gruppenphase' },
      { zeit: '15:00 Uhr', beschreibung: 'K.O.-Runde' },
      { zeit: '18:00 Uhr', beschreibung: 'Finale' },
      { zeit: '19:00 Uhr', beschreibung: 'Rangverkündigung & Barbetrieb' },
    ],
    buttons: [
      { label: 'Mehr Infos', url: '#', typ: 'sekundär' },
    ],
  },
  {
    id: 3,
    name: 'Saisonabschluss-Feier 2025',
    datum: '2025-06-07',
    datumFormatiert: '7. Juni 2025',
    ort: 'Klubhaus FC Sursee',
    titelbild: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    beschreibung: 'Gemeinsam auf die Saison 2024/25 zurückblicken: Ehrungen, Reden und ein gemütlicher Abend im Klubhaus.',
    slug: 'saisonabschluss-2025',
    in_navigation: false,
    programm: [],
    buttons: [],
  },
]
