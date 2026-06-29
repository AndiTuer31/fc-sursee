import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { useSiteSettings } from '../lib/useSiteSettings'
import { usePageTitle } from '../lib/usePageTitle'

const PERSONEN_QUERY = `*[_type == "vorstand"] | order(gruppe asc, reihenfolge asc) {
  _id, name, rolle, gruppe, beschreibung, foto, telefon, email
}`
const STELLEN_QUERY = `*[_type == "offeneStelle" && aktiv == true] | order(reihenfolge asc) {
  _id, titel, beschreibung, pensum,
  "dokumente": dokumente[] { titel, "dateiUrl": datei.asset->url }
}`
const DOKUMENTE_QUERY = `*[_type == "dokument" && sichtbar == true] | order(kategorie asc, reihenfolge asc) {
  _id, titel, kategorie, "dateiUrl": datei.asset->url
}`

const GRUPPEN_REIHENFOLGE = ['Vorstand', 'Funktionäre', 'Sportkommission', 'Koordinatoren']

const KATEGORIE_FARBE = {
  Statuten:    'bg-fc-rot',
  Konzepte:    'bg-fc-dunkel',
  Protokolle:  'bg-gray-500',
  Zertifikate: 'bg-green-600',
  Formulare:   'bg-blue-600',
  Sonstiges:   'bg-gray-400',
}

const LEITBILD = [
  {
    titel: 'Einheit & Verantwortung',
    text: 'Wir stehen füreinander ein — auf dem Platz und daneben. Jedes Mitglied trägt Verantwortung für den Verein und die Gemeinschaft.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titel: 'Tradition & Heimat',
    text: 'Seit 1920 sind wir verwurzelt in Sursee. Unsere Geschichte ist unser Fundament — wir pflegen sie mit Stolz und blicken gleichzeitig nach vorne.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titel: 'Vielfalt',
    text: 'Unsere Stärke liegt in unserer Vielfalt. Unterschiedliche Hintergründe, Kulturen und Generationen machen den FC Sursee zu dem, was er ist.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 21v-4a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M21.5 21v-2.5a3 3 0 00-2-2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="4.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2.5 21v-2.5a3 3 0 012-2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titel: 'Nachwuchsförderung',
    text: 'Die Förderung von Junioren & Juniorinnen ist unser wichtigstes Anliegen. Wir investieren in die Jugend — sportlich und menschlich.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 20v-1a5 5 0 015-5h4a5 5 0 015 5v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 9l2-3 2 3M19 6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const TABS = ['Leitbild', 'Vereinsführung', 'Offene Stellen', 'Dokumente']

function Initialen({ name }) {
  const parts = name.trim().split(' ')
  return <>{parts.map(p => p[0]).join('').slice(0, 2).toUpperCase()}</>
}

function PersonCard({ person }) {
  const foto = imageUrl(person.foto)
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center text-center gap-4">
      <div className="shrink-0">
        {foto ? (
          <img src={foto} alt={person.name} className="w-36 h-36 md:w-40 md:h-40 rounded-xl object-cover object-top" />
        ) : (
          <div className="w-36 h-36 md:w-40 md:h-40 bg-fc-rot rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-3xl"><Initialen name={person.name} /></span>
          </div>
        )}
      </div>
      <div className="min-w-0 w-full">
        <p className="font-black text-fc-dunkel text-base leading-tight">{person.name}</p>
        <p className="text-fc-rot text-sm font-semibold mt-1">{person.rolle}</p>
        {person.beschreibung && (
          <p className="text-fc-text text-xs mt-2 leading-snug">{person.beschreibung}</p>
        )}
        <div className="mt-3 space-y-1">
          {person.telefon && (
            <a href={`tel:${person.telefon.replace(/\s/g, '')}`}
               className="flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-fc-rot transition-colors">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {person.telefon}
            </a>
          )}
          {person.email && (
            <a href={`mailto:${person.email}`}
               className="flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-fc-rot transition-colors">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {person.email}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Verein() {
  usePageTitle('Über den Verein', 'Der FC Sursee – Vereinsgeschichte, Leitbild, Statuten und Vereinsführung.')

  const s = useSiteSettings()
  const [searchParams] = useSearchParams()
  const initialTab = TABS.includes(searchParams.get('tab')) ? searchParams.get('tab') : 'Leitbild'
  const [aktiverTab, setAktiverTab] = useState(initialTab)
  const [personen, setPersonen]     = useState([])
  const [dokumente, setDokumente]   = useState([])
  const [stellen, setStellen]         = useState([])
  const [gruppenFilter, setGruppenFilter] = useState(null)

  useEffect(() => {
    client.fetch(PERSONEN_QUERY).then(setPersonen).catch(() => {})
    client.fetch(DOKUMENTE_QUERY).then(setDokumente).catch(() => {})
    client.fetch(STELLEN_QUERY).then(setStellen).catch(() => {})
  }, [])

  const gruppiertPersonen = GRUPPEN_REIHENFOLGE.reduce((acc, gruppe) => {
    const liste = personen.filter(p => p.gruppe === gruppe)
    if (liste.length) acc[gruppe] = liste
    return acc
  }, {})

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Über den Verein</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Gegründet am 1. Juni 1920 — über 100 Jahre Fussball, Gemeinschaft und Leidenschaft in Sursee.
          </p>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto scrollbar-none">
          <div className="flex min-w-max md:min-w-0">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setAktiverTab(tab)}
                className={`px-4 md:px-5 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  aktiverTab === tab ? 'border-fc-rot text-fc-rot' : 'border-transparent text-gray-500 hover:text-fc-dunkel'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">

          {aktiverTab === 'Leitbild' && (
            <div className="space-y-10">
              <div className="bg-fc-dunkel rounded-2xl p-6 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-fc-rot/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-block bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded mb-4 tracking-widest uppercase">Seit 1920</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    Über 100 Jahre Fussball, Gemeinschaft & Leidenschaft
                  </h2>
                  <p className="text-gray-400 max-w-2xl leading-relaxed">
                    Der FC Sursee wurde am <span className="text-white font-semibold">1. Juni 1920</span> gegründet.
                    Was als kleiner Dorfverein begann, hat sich zu einem der bekanntesten Fussballclubs
                    der Region Luzern entwickelt — mit über <span className="text-white font-semibold">{s.anzahl_junioren} Junioren & Juniorinnen</span> und
                    mehreren Aktivmannschaften.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-start sm:items-center gap-4">
                <img src="/quality-club.png" alt={`Quality Club ${s.quality_club_jahre}`} className="h-16 w-auto shrink-0 object-contain" />
                <div>
                  <p className="font-black text-fc-dunkel">Swiss Football Quality Club {s.quality_club_jahre}</p>
                  <p className="text-fc-text text-sm mt-0.5">Qualitätszertifikat des Schweizerischen Fussballverbands für vorbildliche Nachwuchsförderung und Vereinsentwicklung.</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-2xl font-black text-fc-dunkel">Unsere Werte</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {LEITBILD.map(punkt => (
                    <div key={punkt.titel} className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-fc-rot">
                      <div className="text-fc-rot mb-4">{punkt.icon}</div>
                      <h3 className="text-xl font-black text-fc-dunkel mb-3">{punkt.titel}</h3>
                      <p className="text-fc-text leading-relaxed">{punkt.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {aktiverTab === 'Vereinsführung' && (
            <div className="space-y-8">
              {/* Filter-Buttons */}
              {personen.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setGruppenFilter(null)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      gruppenFilter === null ? 'bg-fc-rot text-white' : 'bg-white text-gray-500 hover:text-fc-dunkel border border-gray-200'
                    }`}
                  >
                    Alle
                  </button>
                  {GRUPPEN_REIHENFOLGE.filter(g => personen.some(p => p.gruppe === g)).map(g => (
                    <button
                      key={g}
                      onClick={() => setGruppenFilter(g)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        gruppenFilter === g ? 'bg-fc-rot text-white' : 'bg-white text-gray-500 hover:text-fc-dunkel border border-gray-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}

              {personen.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                  <p className="text-fc-text">Personen werden im Sanity Studio erfasst.</p>
                </div>
              ) : gruppenFilter ? (
                /* Gefilterte Ansicht: nur eine Gruppe */
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h2 className="text-xl font-black text-fc-dunkel">{gruppenFilter}</h2>
                    <span className="text-fc-text text-sm">({personen.filter(p => p.gruppe === gruppenFilter).length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {personen.filter(p => p.gruppe === gruppenFilter).map(person => <PersonCard key={person._id} person={person} />)}
                  </div>
                </div>
              ) : (
                /* Alle Gruppen */
                Object.entries(gruppiertPersonen).map(([gruppe, liste]) => (
                  <div key={gruppe}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                      <h2 className="text-xl font-black text-fc-dunkel">{gruppe}</h2>
                      <span className="text-fc-text text-sm">({liste.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {liste.map(person => <PersonCard key={person._id} person={person} />)}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}


          {aktiverTab === 'Offene Stellen' && (
            <div className="space-y-6">
              {stellen.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                  <p className="text-fc-text text-lg font-semibold">Aktuell sind keine Stellen ausgeschrieben.</p>
                  <p className="text-fc-text text-sm mt-2">Melde dich direkt beim Verein.</p>
                </div>
              ) : stellen.map(stelle => (
                <div key={stelle._id} className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-fc-rot">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-xl font-black text-fc-dunkel">{stelle.titel}</h2>
                    {stelle.pensum && (
                      <span className="shrink-0 text-xs font-bold text-white px-3 py-1 rounded bg-fc-dunkel">
                        {stelle.pensum}
                      </span>
                    )}
                  </div>
                  {stelle.beschreibung && (
                    <p className="text-fc-text leading-relaxed whitespace-pre-line mb-4">{stelle.beschreibung}</p>
                  )}
                  {stelle.dokumente?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {stelle.dokumente.map((dok, i) => (
                        <a key={i} href={dok.dateiUrl} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-3 text-sm text-fc-rot hover:underline font-semibold">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                                  stroke="currentColor" strokeWidth="1.8"/>
                            <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                          {dok.titel}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="bg-fc-dunkel rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div>
                  <p className="font-black text-white">Interesse geweckt?</p>
                  <p className="text-gray-400 text-sm">Melde dich bei einem Vorstandsmitglied oder per Mail.</p>
                </div>
                <a href="mailto:info@fcsursee.ch"
                   className="shrink-0 bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity md:ml-auto">
                  info@fcsursee.ch
                </a>
              </div>
            </div>
          )}

          {aktiverTab === 'Dokumente' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                <h2 className="text-2xl font-black text-fc-dunkel">Vereinsdokumente</h2>
              </div>
              {dokumente.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {dokumente.map((dok, i) => (
                    <a key={dok._id} href={dok.dateiUrl} target="_blank" rel="noopener noreferrer"
                       className={`flex items-center justify-between px-6 py-4 hover:bg-fc-grau transition-colors group ${
                         i !== dokumente.length - 1 ? 'border-b border-gray-100' : ''
                       }`}>
                      <div className="flex items-center gap-4">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-fc-rot shrink-0">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                        <div>
                          <p className="font-semibold text-fc-dunkel text-sm group-hover:text-fc-rot transition-colors">{dok.titel}</p>
                          <span className={`inline-block ${KATEGORIE_FARBE[dok.kategorie] || 'bg-gray-400'} text-white text-xs px-2 py-0.5 rounded mt-1`}>
                            {dok.kategorie}
                          </span>
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-fc-text shrink-0">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                  <p className="text-fc-text">Dokumente werden bald via Sanity Studio erfasst.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
