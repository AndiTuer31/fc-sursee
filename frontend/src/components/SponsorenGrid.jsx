import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client, imageUrl } from '../lib/sanity'

const QUERY = `*[_type == "sponsor" && (kategorie == "Hauptsponsor" || kategorie == "Co-Sponsor")] | order(reihenfolge asc) {
  _id, name, kategorie, logo, website
}`

function SponsorCard({ sponsor, logoH }) {
  const bild = imageUrl(sponsor.logo)
  return (
    <a
      href={sponsor.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-gray-100 rounded-xl px-6 py-5 flex items-center justify-center hover:border-fc-rot hover:shadow-sm transition-all group"
    >
      {bild ? (
        <img
          src={bild}
          alt={sponsor.name}
          className={`${logoH} w-auto object-contain grayscale group-hover:grayscale-0 transition-all`}
        />
      ) : (
        <span className="text-gray-400 font-bold text-sm tracking-wide text-center">{sponsor.name}</span>
      )}
    </a>
  )
}

export default function SponsorenGrid() {
  const [sponsoren, setSponsoren] = useState([])
  const [laden, setLaden]         = useState(true)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setSponsoren(data); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  const haupt = sponsoren.filter(s => s.kategorie === 'Hauptsponsor')
  const co    = sponsoren.filter(s => s.kategorie === 'Co-Sponsor')

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-10">
          <span className="w-1 h-6 bg-fc-rot rounded-full block" />
          <h2 className="text-2xl font-black text-fc-dunkel">Unsere Sponsoren</h2>
        </div>

        {laden && <div className="h-24 animate-pulse bg-gray-100 rounded-xl" />}

        {!laden && haupt.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Hauptsponsor</p>
            <div className="grid grid-cols-1 max-w-xs">
              {haupt.map(s => <SponsorCard key={s._id} sponsor={s} logoH="h-20" />)}
            </div>
          </div>
        )}

        {!laden && co.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Co-Sponsoren</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {co.map(s => <SponsorCard key={s._id} sponsor={s} logoH="h-12" />)}
            </div>
          </div>
        )}

        {!laden && sponsoren.length === 0 && (
          <p className="text-fc-text text-sm text-center py-8">Sponsoren werden bald erfasst.</p>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-fc-text text-sm">Interesse an einer Partnerschaft mit dem FC Sursee?</p>
          <div className="flex gap-3">
            <Link to="/sponsoren" className="border border-fc-rot text-fc-rot text-sm font-semibold px-5 py-2.5 rounded hover:bg-fc-rot hover:text-white transition-colors shrink-0">
              Alle Sponsoren →
            </Link>
            <Link to="/kontakt" className="bg-fc-rot text-white text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity shrink-0">
              Sponsor werden
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
