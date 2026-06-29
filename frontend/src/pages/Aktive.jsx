import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

// Reihenfolge für Positionen
const POSITIONS_ORDER = ['Trainer & Staff', 'Torhüter', 'Verteidiger', 'Mittelfeldspieler', 'Angreifer', 'Stürmer']

const POSITION_FARBE = {
  'Trainer & Staff':  'bg-fc-dunkel',
  'Torhüter':         'bg-yellow-500',
  'Verteidiger':      'bg-blue-600',
  'Mittelfeldspieler':'bg-fc-rot',
  'Angreifer':        'bg-green-600',
  'Stürmer':          'bg-green-600',
}

const QUERY = `*[_type == "team"] | order(reihenfolge asc) {
  _id, name, liga, matchcenter_id,
  teamfoto,
  "spieler": spieler[] {
    name, nummer, position, rolle, funktion,
    foto
  }
}`

// Spieler nach Rolle/Position sortieren
function sortierteSpieler(spieler) {
  if (!spieler) return []
  return [...spieler].sort((a, b) => {
    const gruppeA = a.rolle === 'Trainer & Staff' ? 'Trainer & Staff' : (a.position || 'Stürmer')
    const gruppeB = b.rolle === 'Trainer & Staff' ? 'Trainer & Staff' : (b.position || 'Stürmer')
    const iA = POSITIONS_ORDER.indexOf(gruppeA)
    const iB = POSITIONS_ORDER.indexOf(gruppeB)
    const ai = iA === -1 ? 99 : iA
    const bi = iB === -1 ? 99 : iB
    if (ai !== bi) return ai - bi
    return (a.nummer || 99) - (b.nummer || 99)
  })
}

// SVG Personen-Silhouette für kein Foto
function SpielerSilhouette() {
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none" className="text-gray-300">
      <circle cx="26" cy="16" r="12" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M4 58c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

// Spielerkarte
function SpielerCard({ spieler }) {
  const foto = imageUrl(spieler.foto)
  const istTrainer = spieler.rolle === 'Trainer & Staff'
  const label = istTrainer ? (spieler.funktion || 'Trainer & Staff') : spieler.position
  const farbe = POSITION_FARBE[label] || POSITION_FARBE[spieler.rolle] || 'bg-gray-400'

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm group">
      <div className="relative h-52 overflow-hidden bg-fc-grau">
        {foto ? (
          <img
            src={foto}
            alt={spieler.name}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-end justify-center pb-2">
            <SpielerSilhouette />
          </div>
        )}

        {/* Trikotnummer oben rechts */}
        {!istTrainer && spieler.nummer && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-fc-rot rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-black text-xs">{spieler.nummer}</span>
          </div>
        )}

        {/* Positions-/Rollen-Badge unten links */}
        {label && (
          <span className={`absolute bottom-2 left-2 ${farbe} text-white text-xs font-bold px-2 py-0.5 rounded`}>
            {label}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-fc-dunkel text-sm leading-tight">{spieler.name}</p>
      </div>
    </div>
  )
}

export default function Aktive() {
  usePageTitle('Aktive Mannschaften', 'Aktive Mannschaften des FC Sursee – Spieler, Kader und Resultate.')

  const [teams, setTeams]             = useState([])
  const [laden, setLaden]             = useState(true)
  const [aktivesTeam, setAktivesTeam] = useState(null)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => {
        setTeams(data)
        if (data.length > 0) setAktivesTeam(data[0]._id)
        setLaden(false)
      })
      .catch(() => setLaden(false))
  }, [])

  const team = teams.find(t => t._id === aktivesTeam)
  const sorted = team ? sortierteSpieler(team.spieler) : []

  // Trainer & Staff separat von Feldspielern
  const trainerStaff = sorted.filter(s => s.rolle === 'Trainer & Staff')
  const feldspieler  = sorted.filter(s => s.rolle !== 'Trainer & Staff')

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Aktive Mannschaften</h1>
        </div>
      </section>

      {/* Team Tabs */}
      {!laden && teams.length > 0 && (
        <div className="bg-white border-b border-gray-100 sticky top-[73px] z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex overflow-x-auto">
              {teams.map(t => (
                <button
                  key={t._id}
                  onClick={() => setAktivesTeam(t._id)}
                  className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    aktivesTeam === t._id
                      ? 'border-fc-rot text-fc-rot'
                      : 'border-transparent text-gray-500 hover:text-fc-dunkel'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="bg-fc-grau min-h-screen">

        {laden && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-3"><div className="h-3 bg-gray-200 rounded w-2/3" /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!laden && team && (
          <>
            {/* Team Hero */}
            <div className="relative bg-fc-dunkel">
              {imageUrl(team.teamfoto) ? (
                <img src={imageUrl(team.teamfoto)} alt={team.name} loading="lazy" className="w-full h-auto block" />
              ) : (
                <div className="w-full h-full bg-fc-dunkel" />
              )}
              <div className="absolute inset-0 bg-fc-dunkel/30" />
              <div className="absolute bottom-0 left-0 w-full">
                <div className="max-w-7xl mx-auto px-4 md:px-6 pb-4 md:pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-300 text-sm uppercase tracking-widest mb-1">{team.liga}</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">{team.name}</h2>
                    {trainerStaff.length > 0 && (
                      <p className="text-gray-300 text-sm mt-1">
                        {trainerStaff.map(t => `${t.funktion || 'Trainer'}: ${t.name}`).join(' · ')}
                      </p>
                    )}
                  </div>
                  {team.matchcenter_id && (
                    <a
                      href={`https://matchcenter.al-la.ch/?t=${team.matchcenter_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-fc-rot text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity shrink-0"
                    >
                      Spielplan →
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

              {/* Trainer & Staff */}
              {trainerStaff.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h3 className="text-xl font-black text-fc-dunkel">Trainer & Staff</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {trainerStaff.map((s, i) => <SpielerCard key={i} spieler={s} />)}
                  </div>
                </div>
              )}

              {/* Spieler (nach Positionen) */}
              {feldspieler.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h3 className="text-xl font-black text-fc-dunkel">Kader</h3>
                    <span className="text-fc-text text-sm">({feldspieler.length} Spieler)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {feldspieler.map((s, i) => <SpielerCard key={i} spieler={s} />)}
                  </div>
                </div>
              )}

              {/* Leer-State */}
              {sorted.length === 0 && (
                <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                  <p className="text-fc-text">Kaderdetails folgen in Kürze.</p>
                </div>
              )}

              {/* Spielplan Mobile */}
              {team.matchcenter_id && (
                <div className="md:hidden">
                  <a
                    href={`https://matchcenter.al-la.ch/?t=${team.matchcenter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-fc-rot text-white text-sm font-semibold px-5 py-3 rounded text-center hover:opacity-90"
                  >
                    Spielplan & Resultate →
                  </a>
                </div>
              )}

            </div>
          </>
        )}

        {!laden && teams.length === 0 && (
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <p className="text-fc-text">Teams werden bald erfasst.</p>
          </div>
        )}

      </main>

      <Footer />
    </>
  )
}
