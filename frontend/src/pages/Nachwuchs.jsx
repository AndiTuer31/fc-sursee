import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { useSiteSettings } from '../lib/useSiteSettings'
import { usePageTitle } from '../lib/usePageTitle'

// Reihenfolge G (jüngste) -> A (älteste)
const ALTERS_REIHENFOLGE = ['G-Junioren', 'F-Junioren', 'E-Junioren', 'D-Junioren', 'C-Junioren', 'B-Junioren', 'A-Junioren']

const QUERY = `*[_type == "nachwuchs"] | order(reihenfolge asc) {
  _id, name, alter, alter_custom, reihenfolge,
  "trainer": trainer[] { name, funktion },
  teamfoto,
  matchcenter_url
}`

// Alterslabel aufloesen (__andere__ -> alter_custom)
function altersLabel(team) {
  if (!team.alter) return null
  if (team.alter === '__andere__') return team.alter_custom || 'Andere'
  return team.alter
}

// Sortierung: G->A, dann unbekannte ans Ende
function sortiereTeams(teams) {
  return [...teams].sort((a, b) => {
    const labelA = altersLabel(a) || ''
    const labelB = altersLabel(b) || ''
    const iA = ALTERS_REIHENFOLGE.indexOf(labelA)
    const iB = ALTERS_REIHENFOLGE.indexOf(labelB)
    if (iA !== iB) {
      return (iA === -1 ? 99 : iA) - (iB === -1 ? 99 : iB)
    }
    return (a.reihenfolge || 99) - (b.reihenfolge || 99)
  })
}

// SVG Fussballfeld fuer Teams ohne Foto
function TeamPlaceholder() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-gray-300">
      <rect x="4" y="12" width="56" height="40" rx="2" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M32 12v40M4 32h56" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="22" width="10" height="20" stroke="currentColor" strokeWidth="2" rx="0"/>
      <rect x="50" y="22" width="10" height="20" stroke="currentColor" strokeWidth="2" rx="0"/>
    </svg>
  )
}

// Vollbild-Modal
function TeamModal({ team, onClose }) {
  const bild = imageUrl(team.teamfoto)
  const label = altersLabel(team)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Grosses Bild */}
        <div className="relative h-64 md:h-96 overflow-hidden bg-fc-dunkel">
          {bild ? (
            <img src={bild} alt={team.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TeamPlaceholder />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-fc-dunkel/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-12">
            {label && (
              <span className="inline-block bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-widest">
                {label}
              </span>
            )}
            <h3 className="text-3xl font-black text-white">{team.name}</h3>
          </div>
          {/* Schliessen-Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            aria-label="Schliessen"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Inhaltsbereich */}
        <div className="p-8">
          {/* Trainer */}
          {team.trainer && team.trainer.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-fc-rot uppercase tracking-widest mb-3">Trainer & Betreuung</p>
              <div className="flex flex-wrap gap-3">
                {team.trainer.map((t, i) => (
                  <div key={i} className="bg-fc-grau rounded-lg px-4 py-2">
                    <p className="font-bold text-fc-dunkel text-sm">{t.name}</p>
                    {t.funktion && <p className="text-fc-text text-xs">{t.funktion}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matchcenter Link */}
          {team.matchcenter_url && (
            <a
              href={team.matchcenter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-fc-rot text-white font-semibold px-5 py-2.5 rounded text-sm hover:opacity-90 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 3h6v6M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Spielplan & Tabelle
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Nachwuchs() {
  usePageTitle('Nachwuchs', 'Nachwuchsabteilung des FC Sursee – Junioren von G bis A, Anmeldung und Trainer.')

  const s = useSiteSettings()
  const [rawTeams, setRawTeams]   = useState([])
  const [laden, setLaden]         = useState(true)
  const [filter, setFilter]       = useState('Alle')
  const [ausgewaehlt, setAusgewaehlt] = useState(null)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setRawTeams(data); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  const teams = sortiereTeams(rawTeams)

  // Filter-Optionen in korrekter Reihenfolge
  const vorhandeneAlter = ALTERS_REIHENFOLGE.filter(a => teams.some(t => altersLabel(t) === a))
  const andereAlter = teams
    .map(t => altersLabel(t))
    .filter(a => a && !ALTERS_REIHENFOLGE.includes(a))
    .filter((v, i, arr) => arr.indexOf(v) === i)
  const filterOptionen = ['Alle', ...vorhandeneAlter, ...andereAlter]

  const gefilterteTeams = filter === 'Alle'
    ? teams
    : teams.filter(t => altersLabel(t) === filter)

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Nachwuchs</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Uber {s.anzahl_junioren} Junioren & Juniorinnen in 7 Altersstufen.
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Intro */}
          <div className="bg-fc-dunkel rounded-2xl p-5 md:p-12 mb-10 md:mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fc-rot/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded mb-4 tracking-widest uppercase">
                  Juniorenabteilung
                </span>
                <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                  Fussball fur jedes Alter — von 5 bis 20 Jahren
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Der FC Sursee legt grossen Wert auf die Forderung von Junioren & Juniorinnen.
                  Engagierte Trainer begleiten unsere Nachwuchsteams sportlich und menschlich.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-5 text-center">
                  <p className="text-2xl sm:text-4xl font-black text-fc-rot mb-1">{s.anzahl_junioren}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Junioren &<br/>Juniorinnen</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-5 text-center">
                  <p className="text-2xl sm:text-4xl font-black text-fc-rot mb-1">7</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Altersstufen</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-5 text-center">
                  <p className="text-xs sm:text-lg font-black text-fc-rot mb-1">Quality Club</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">{s.quality_club_jahre}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          {!laden && filterOptionen.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {filterOptionen.map(stufe => (
                <button
                  key={stufe}
                  onClick={() => setFilter(stufe)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    filter === stufe
                      ? 'bg-fc-rot text-white'
                      : 'bg-white text-gray-600 hover:border-fc-rot border border-gray-200'
                  }`}
                >
                  {stufe}
                </button>
              ))}
            </div>
          )}

          {/* Teams Grid */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1 h-6 bg-fc-rot rounded-full block" />
            <h2 className="text-2xl font-black text-fc-dunkel">Unsere Teams</h2>
          </div>

          {laden && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!laden && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gefilterteTeams.map(team => {
                const bild = imageUrl(team.teamfoto)
                const label = altersLabel(team)
                return (
                  <button
                    key={team._id}
                    onClick={() => setAusgewaehlt(team)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm group text-left hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden bg-fc-grau">
                      {bild ? (
                        <img src={bild} alt={team.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <TeamPlaceholder />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-fc-dunkel/20 group-hover:bg-fc-dunkel/5 transition-colors" />
                      {label && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-fc-rot text-white text-xs font-bold px-2.5 py-1 rounded">{label}</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white text-fc-dunkel text-xs font-bold px-2 py-1 rounded">Details</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-fc-dunkel text-lg">{team.name}</h3>
                      {team.trainer && team.trainer.length > 0 && (
                        <p className="text-fc-text text-sm mt-1">
                          {team.trainer.map(t => t.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {!laden && gefilterteTeams.length === 0 && (
            <p className="text-fc-text text-center py-12">Keine Teams erfasst.</p>
          )}

          {/* CTA */}
          <div className="mt-10 md:mt-12 bg-fc-dunkel rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Mach mit!</h3>
              <p className="text-gray-400 max-w-md">
                Dein Kind mochte Fussball spielen? Melde dich direkt online an oder nimm Kontakt mit uns auf.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="/junioren-anmeldung" className="bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity text-center">
                Jetzt anmelden
              </a>
              <a href={s.cta_nachwuchs_url} className="border border-white/30 text-white font-semibold px-6 py-3 rounded hover:bg-white/10 transition-colors text-center">
                Kontakt aufnehmen
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Vollbild Modal */}
      {ausgewaehlt && (
        <TeamModal team={ausgewaehlt} onClose={() => setAusgewaehlt(null)} />
      )}

      <Footer />
    </>
  )
}
