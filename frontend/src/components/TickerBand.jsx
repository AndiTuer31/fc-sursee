// TickerBand.jsx
import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

const heute = new Date().toISOString().split('T')[0]
const QUERY = `*[
  _type == "naechstesSpiel" &&
  (!defined(anzeigeVon) || anzeigeVon <= $heute) &&
  (!defined(anzeigeBis) || anzeigeBis >= $heute)
] | order(datumISO asc) [0] {
  datum, uhrzeit, heimteam, auswaertsteam, liga, ort
}`

function BallIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8"/>
      <path d="M12 2.5L14.5 8L12 10L9.5 8L12 2.5Z" fill="white"/>
      <path d="M20.5 8.5L16.5 9.5L14.5 8L15.5 3.5L20.5 8.5Z" fill="white"/>
      <path d="M21.5 16L17.5 14L16.5 9.5L20.5 8.5L21.5 16Z" fill="white"/>
      <path d="M14.5 21L13 17L16.5 14L20.5 15L14.5 21Z" fill="white"/>
      <path d="M9.5 21L8 15L11 13L13 17L9.5 21Z" fill="white"/>
      <path d="M3.5 16L6.5 14L8 15L6.5 21L3.5 16Z" fill="white"/>
      <path d="M2.5 8.5L6 9.5L6.5 14L3.5 16L2.5 8.5Z" fill="white"/>
      <path d="M8.5 3.5L9.5 8L6 9.5L2.5 8.5L8.5 3.5Z" fill="white"/>
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="13" height="15" viewBox="0 0 24 26" fill="none" className="shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
      <circle cx="12" cy="9" r="2.5" fill="#E31E26"/>
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="14" height="15" viewBox="0 0 24 26" fill="none" className="shrink-0">
      <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6L12 2z" fill="white"/>
    </svg>
  )
}
function TrophyIcon() {
  return (
    <svg width="14" height="15" viewBox="0 0 24 26" fill="none" className="shrink-0">
      <path d="M6 2h12v8a6 6 0 01-12 0V2z" fill="white"/>
      <path d="M4 2H2v4a4 4 0 004 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M20 2h2v4a4 4 0 01-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M9 16v3M15 16v3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="7" y="19" width="10" height="2.5" rx="1" fill="white"/>
    </svg>
  )
}
function Dot() {
  return <span className="text-white/30 mx-10 text-lg font-light select-none">·</span>
}

export default function TickerBand() {
  const [spiel, setSpiel] = useState(null)

  useEffect(() => {
    client.fetch(QUERY, { heute })
      .then(data => { if (data) setSpiel(data) })
      .catch(() => {})
  }, [])

  const uhrzeit = spiel?.uhrzeit?.replace(/\s*Uhr\s*$/i, '').trim()
  const naechstesSpielText = spiel
    ? `${spiel.heimteam || 'FC Sursee'} vs. ${spiel.auswaertsteam} — ${spiel.datum}${uhrzeit ? `, ${uhrzeit} Uhr` : ''}`
    : 'FC Sursee — Nächstes Spiel bald bekannt'

  const ortText  = spiel?.ort  || 'Stadion Schlottermilch, Sursee'
  const ligaText = spiel?.liga || '2. Liga Interregional'

  function Items() {
    return (
      <div className="flex items-center whitespace-nowrap">
        <BallIcon /><span className="ml-2.5 text-sm font-medium tracking-wide">{naechstesSpielText}</span>
        <Dot />
        <PinIcon /><span className="ml-2.5 text-sm font-medium tracking-wide">{ortText}</span>
        <Dot />
        <TrophyIcon /><span className="ml-2.5 text-sm font-medium tracking-wide">{ligaText} &mdash; Saison 2025/26</span>
        <Dot />
        <ShieldIcon /><span className="ml-2.5 text-sm font-medium tracking-wide">FC Sursee &mdash; Sorsii esch Sorsii</span>
        <span className="mx-10" />
      </div>
    )
  }

  return (
    <div className="bg-fc-rot text-white overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-ticker">
        <Items /><Items />
      </div>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 28s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}
