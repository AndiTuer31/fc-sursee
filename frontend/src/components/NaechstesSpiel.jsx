import { useState, useEffect } from 'react'
import { client, imageUrl } from '../lib/sanity'

const heute = new Date().toISOString().split('T')[0]

const QUERY = `*[
  _type == "naechstesSpiel" &&
  (!defined(anzeigeVon) || anzeigeVon <= $heute) &&
  (!defined(anzeigeBis) || anzeigeBis >= $heute)
] | order(datumISO asc) {
  _id, datum, datumISO, uhrzeit, liga, heimteam, auswaertsteam, gastbild, ort, heimspiel, spielplan_url
}`

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

function LogoCircle({ src, name, label, akzent }) {
  return (
    <div className="flex flex-col items-center w-24">
      <div className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-full flex items-center justify-center mx-auto overflow-hidden bg-white shrink-0 ${
        akzent ? 'border-fc-rot' : 'border-gray-200'
      }`}>
        {src ? (
          <img src={src} alt={name} loading="lazy" className="w-12 h-12 md:w-16 md:h-16 object-contain p-1" />
        ) : (
          <span className="font-bold text-xs text-center leading-tight px-2 text-gray-500">{name}</span>
        )}
      </div>
      <p className="font-black text-sm text-fc-dunkel mt-2 leading-tight text-center">{name}</p>
      <p className="text-xs text-fc-text text-center">{label}</p>
    </div>
  )
}

function SpielCard({ spiel }) {
  const gastImg      = imageUrl(spiel.gastbild)
  const istAuswaerts = spiel.heimspiel === false

  const linksLogoSrc  = istAuswaerts ? gastImg    : '/logo.png'
  const rechtsLogoSrc = istAuswaerts ? '/logo.png' : gastImg
  const linksName     = istAuswaerts ? (spiel.heimteam || 'Gegner')         : (spiel.heimteam || 'FC Sursee')
  const rechtsName    = istAuswaerts ? (spiel.auswaertsteam || 'FC Sursee') : (spiel.auswaertsteam || 'Gegner')

  return (
    <div className={`rounded-2xl p-4 md:p-8 border shadow-sm ${
      istAuswaerts ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'
    }`}>
      {/* Desktop: 3 fixe Spalten damit Logos immer auf gleicher Position */}
      <div className="flex flex-col md:grid md:items-center gap-6" style={{ gridTemplateColumns: '200px 1fr 160px' }}>

        {/* Spalte 1: Spielinfo */}
        <div className="text-center md:text-left">
          {spiel.liga && (
            <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-3 tracking-widest uppercase bg-fc-rot text-white">
              {spiel.liga}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-fc-text text-sm justify-center md:justify-start mb-1">
            <CalendarIcon />
            <span className="font-semibold text-fc-dunkel">{spiel.datum}</span>
          </div>
          {spiel.uhrzeit && (
            <div className="flex items-center gap-1.5 text-fc-text text-sm justify-center md:justify-start mb-1">
              <ClockIcon />
              <span>{spiel.uhrzeit}</span>
            </div>
          )}
          {spiel.ort && (
            <div className="flex items-center gap-1.5 text-fc-text text-xs justify-center md:justify-start">
              <PinIcon />
              <span>{spiel.ort}</span>
            </div>
          )}
        </div>

        {/* Spalte 2: Logos — immer zentriert in gleicher Spalte */}
        <div className="flex items-start justify-center gap-4 md:gap-8">
          <LogoCircle src={linksLogoSrc}  name={linksName}  label="Heim" akzent={!istAuswaerts} />
          <div className="shrink-0 text-center mt-5 md:mt-6">
            <p className="text-2xl md:text-3xl font-black text-fc-dunkel">VS</p>
          </div>
          <LogoCircle src={rechtsLogoSrc} name={rechtsName} label="Gast" akzent={istAuswaerts} />
        </div>

        {/* Spalte 3: Button */}
        <div className="flex justify-center md:justify-end">
          {spiel.spielplan_url ? (
            <a
              href={spiel.spielplan_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-fc-rot text-fc-rot font-semibold px-5 py-2.5 rounded text-sm hover:bg-fc-rot hover:text-white transition-colors"
            >
              Zum Spielplan
            </a>
          ) : (
            <div />
          )}
        </div>

      </div>
    </div>
  )
}

export default function NaechstesSpiel() {
  const [spiele, setSpiele] = useState([])
  const [laden, setLaden]   = useState(true)

  useEffect(() => {
    client.fetch(QUERY, { heute })
      .then(data => { setSpiele(data || []); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  if (laden || spiele.length === 0) return null

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-fc-rot rounded-full block" />
          <h2 className="text-2xl font-black text-fc-dunkel">
            {spiele.length === 1 ? 'Nächstes Spiel' : 'Nächste Spiele'}
          </h2>
        </div>
        <div className="space-y-4">
          {spiele.map(spiel => <SpielCard key={spiel._id} spiel={spiel} />)}
        </div>
      </div>
    </section>
  )
}
