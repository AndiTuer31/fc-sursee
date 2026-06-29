import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

const PLAETZE = [
  {
    name: 'Stadion Schlottermilch',
    typ: 'Hauptstadion',
    adresse: 'Moosgasse, 6210 Sursee',
    beschreibung: 'Heimspielstätte der 1. Mannschaft — Naturrasen, 500 Sitzplätze, Klubhaus direkt angrenzend.',
    parkplatz: 'Parkplätze vorhanden direkt beim Stadion',
    mapsLink: 'https://maps.app.goo.gl/qXekvuysbdKinvk16',
    featured: true,
  },
  {
    name: 'Kunstrasen',
    typ: 'Kunstrasen',
    adresse: 'Klosterstrasse, 6210 Sursee',
    beschreibung: null,
    parkplatz: 'Kein Parkplatz vor Ort — Parkieren beim Stadion empfohlen',
    mapsLink: 'https://maps.app.goo.gl/qcoXeicLXrm8zpgg9',
    featured: false,
  },
  {
    name: 'Neufeld Platz',
    typ: 'Naturrasen',
    adresse: 'Badstrasse 19, 6210 Sursee',
    beschreibung: null,
    parkplatz: 'Parkplatz in der Nähe vorhanden',
    mapsLink: 'https://maps.app.goo.gl/hqtzS6YyugEL11vP8',
    featured: false,
  },
  {
    name: 'Neufeld Bödeli',
    typ: 'Naturrasen',
    adresse: 'Badstrasse 19, 6210 Sursee',
    beschreibung: null,
    parkplatz: 'Parkplatz in der Nähe vorhanden',
    mapsLink: 'https://maps.app.goo.gl/MYsAekSkuVT5SG5u9',
    featured: false,
  },
  {
    name: 'Allmend gross',
    typ: 'Naturrasen',
    adresse: 'Zollbachstrasse, 6210 Sursee',
    beschreibung: null,
    parkplatz: 'Kein Parkplatz vorhanden',
    mapsLink: 'https://maps.app.goo.gl/dpPJUZaLNiGfG7P89',
    featured: false,
  },
  {
    name: 'Allmend klein',
    typ: 'Naturrasen',
    adresse: 'Zollbachstrasse, 6210 Sursee',
    beschreibung: null,
    parkplatz: 'Kein Parkplatz vorhanden',
    mapsLink: 'https://maps.app.goo.gl/tmmeJJ7YVNwZX97B7',
    featured: false,
  },
  {
    name: 'Martinsgrund',
    typ: 'Naturrasen',
    adresse: 'St. Martinsweg 3, 6210 Sursee',
    beschreibung: null,
    parkplatz: 'Parkplatz in der Nähe vorhanden',
    mapsLink: 'https://maps.app.goo.gl/Diwg6JsEA41uVJALA',
    featured: false,
  },
]

const TYP_STYLE = {
  'Hauptstadion': { bg: 'bg-fc-rot',    text: 'text-white' },
  'Kunstrasen':   { bg: 'bg-blue-600',  text: 'text-white' },
  'Naturrasen':   { bg: 'bg-green-700', text: 'text-white' },
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

function CarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function MapsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M18 11.5C18 16 12 21 12 21S6 16 6 11.5a6 6 0 0112 0z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="11.5" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

export default function Plaetze() {
  usePageTitle('Plätze & Infrastruktur', 'Trainingsplätze und Infrastruktur des FC Sursee.')

  const hauptstadion = PLAETZE.find(p => p.featured)
  const restPlaetze  = PLAETZE.filter(p => !p.featured)

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-fc-rot/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Unsere Plätze</h1>
          <p className="text-gray-400 max-w-lg">
            {PLAETZE.length} Spielfelder in Sursee — hier trainieren und spielen unsere Teams.
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-10">

          {/* ── Hauptstadion (Featured) ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 bg-fc-rot rounded-full block" />
              <h2 className="text-xl font-black text-fc-dunkel">Heimspielstätte</h2>
            </div>
            <div className="bg-fc-dunkel rounded-2xl overflow-hidden">
              {/* Stadion-Foto */}
              <img
                src="/stadion-schlottermilch.jpg"
                alt="Stadion Schlottermilch"
                className="w-full h-56 md:h-72 object-cover object-center"
              />
              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                {/* Links — Info */}
                <div className="flex-1">
                  <span className="inline-block bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-widest">
                    {hauptstadion.typ}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{hauptstadion.name}</h3>
                  {hauptstadion.beschreibung && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{hauptstadion.beschreibung}</p>
                  )}
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-gray-400 text-sm">
                      <PinIcon />
                      <span>{hauptstadion.adresse}</span>
                    </div>
                    <p className="text-green-400 text-sm">{hauptstadion.parkplatz}</p>
                  </div>
                </div>
                {/* Rechts — Maps Button */}
                <div className="shrink-0 w-full md:w-auto self-end">
                  <a
                    href={hauptstadion.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-fc-dunkel text-sm font-semibold px-6 py-3 rounded-xl hover:bg-fc-rot hover:text-white transition-colors w-full md:w-auto"
                  >
                    <MapsIcon />
                    In Google Maps öffnen
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Weitere Plätze ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 bg-fc-rot rounded-full block" />
              <h2 className="text-xl font-black text-fc-dunkel">Weitere Trainingsplätze</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restPlaetze.map(platz => {
                const stil = TYP_STYLE[platz.typ] || TYP_STYLE['Naturrasen']
                const hatParkplatz = !platz.parkplatz.toLowerCase().startsWith('kein')
                return (
                  <div key={platz.name} className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black text-fc-dunkel text-lg leading-tight">{platz.name}</h3>
                      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded ${stil.bg} ${stil.text}`}>
                        {platz.typ}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-2 text-fc-text text-sm">
                        <PinIcon />
                        <span>{platz.adresse}</span>
                      </div>
                      <div className={`flex items-start gap-2 text-sm ${hatParkplatz ? 'text-green-700' : 'text-amber-600'}`}>
                        <CarIcon />
                        <span>{platz.parkplatz}</span>
                      </div>
                    </div>

                    {/* Maps Button */}
                    {platz.mapsLink ? (
                      <a
                        href={platz.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border border-gray-200 text-fc-dunkel text-sm font-semibold py-2 rounded-lg hover:border-fc-rot hover:text-fc-rot transition-colors"
                      >
                        <MapsIcon />
                        In Google Maps öffnen
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-2 border border-gray-100 text-gray-300 text-sm py-2 rounded-lg cursor-default">
                        <MapsIcon />
                        Link folgt
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
