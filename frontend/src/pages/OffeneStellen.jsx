import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

const QUERY = `*[_type == "offeneStelle" && aktiv == true] | order(reihenfolge asc) {
  _id, titel, beschreibung, pensum
}`

const PENSUM_FARBE = {
  'Ehrenamt':   'bg-green-600',
  'Teilzeit':   'bg-blue-600',
  'Vollzeit':   'bg-fc-dunkel',
  'Freelance':  'bg-purple-600',
}

function BriefIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-fc-rot">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

export default function OffeneStellen() {
  usePageTitle('Offene Stellen', 'Offene Stellen beim FC Sursee – jetzt bewerben.')

  const [stellen, setStellen] = useState([])
  const [laden, setLaden]     = useState(true)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setStellen(data || []); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Offene Stellen</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Du willst dich im Verein engagieren und Verantwortung übernehmen? Dann bist du bei uns genau richtig!
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-8">

          {laden && (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-xl p-8 shadow-sm animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          )}

          {!laden && stellen.length > 0 && stellen.map(stelle => (
            <div key={stelle._id} className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-fc-rot">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-xl font-black text-fc-dunkel">{stelle.titel}</h2>
                {stelle.pensum && (
                  <span className={`shrink-0 text-xs font-bold text-white px-3 py-1 rounded ${PENSUM_FARBE[stelle.pensum] || 'bg-gray-500'}`}>
                    {stelle.pensum}
                  </span>
                )}
              </div>
              {stelle.beschreibung && (
                <p className="text-fc-text leading-relaxed whitespace-pre-line">{stelle.beschreibung}</p>
              )}
            </div>
          ))}

          {!laden && stellen.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <p className="text-fc-text text-lg font-semibold">Aktuell sind keine Stellen ausgeschrieben.</p>
              <p className="text-fc-text text-sm mt-2">Schau später wieder rein oder melde dich direkt beim Verein.</p>
            </div>
          )}

          {/* Kontakt-CTA */}
          <div className="bg-fc-dunkel rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-fc-rot/20 rounded-xl flex items-center justify-center shrink-0">
                <BriefIcon />
              </div>
              <div>
                <p className="font-black text-white">Interesse geweckt?</p>
                <p className="text-gray-400 text-sm">Melde dich bei einem Vorstandsmitglied oder per Mail.</p>
              </div>
            </div>
            <a
              href="mailto:info@fcsursee.ch"
              className="shrink-0 bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity md:ml-auto"
            >
              info@fcsursee.ch
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
