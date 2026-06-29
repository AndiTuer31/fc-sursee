import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

const VORTEILE = [
  {
    titel: 'Logo-Praesenz',
    text: 'Ihr Logo auf der Website, auf Matchday-Materialien und je nach Paket auf Trikots oder Banden.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="8" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 17l4-4 3 3 4-5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    titel: 'Regionale Reichweite',
    text: 'FC Sursee erreicht mit seinen Teams, Junioren & Juniorinnen und Events hunderte Personen aus der Region Luzern.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titel: 'Gemeinschaft',
    text: 'Sie unterstützen lokalen Fussball und sind Teil einer über 100-jährigen Vereinsgeschichte.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    titel: 'Dauerpräsentanz auf der Website',
    text: 'Ihr Unternehmen wird auf unserer Sponsoren-Seite mit Logo und Link dauerhaft präsentiert.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const KATEGORIEN_REIHENFOLGE = [
  { key: 'Hauptsponsor',          label: 'Hauptsponsor',          beschreibung: 'Unser wichtigster Partner',       cols: 'grid-cols-1 max-w-sm',              logoH: 'h-20' },
  { key: 'Co-Sponsor',            label: 'Co-Sponsoren',          beschreibung: 'Starke Partner an unserer Seite', cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-14' },
  { key: 'Ausrüster',             label: 'Ausrüster',             beschreibung: 'Unser Ausrüster',                 cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-12' },
  { key: 'Trikotsponsoren',       label: 'Trikotsponsoren',       beschreibung: 'Auf unserem Trikot',              cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-12' },
  { key: 'Stadionsponsoren',      label: 'Stadionsponsoren',      beschreibung: 'Im Stadion präsent',              cols: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6', logoH: 'h-10' },
  { key: 'Reisepartner',          label: 'Reisepartner',          beschreibung: 'Unser Reisepartner',              cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-10' },
  { key: 'Hallenturniersponsoren',label: 'Hallenturniersponsoren',beschreibung: 'Partner unserer Hallenturniere',  cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-10' },
  { key: 'Ernährungspartner',     label: 'Ernährungspartner',     beschreibung: 'Unser Ernährungspartner',         cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-10' },
  { key: 'Tankpartner',           label: 'Tankpartner',           beschreibung: 'Unser Tankpartner',               cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-10' },
  { key: 'Medienpartner',         label: 'Medienpartner',         beschreibung: 'Unsere Medienpartner',            cols: 'grid-cols-2 md:grid-cols-4',        logoH: 'h-10' },
  { key: 'Gönner',                label: 'Gönner',                beschreibung: 'Treue Unterstützer',              cols: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6', logoH: 'h-8' },
]

const QUERY = `*[_type == "sponsor"] | order(reihenfolge asc) {
  _id, name, kategorie, logo, website
}`

function SponsorCard({ sponsor, logoH }) {
  const bild = imageUrl(sponsor.logo)
  return (
    <a
      href={sponsor.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-gray-100 rounded-xl px-6 py-5 flex items-center justify-center hover:border-fc-rot hover:shadow-sm transition-all group min-h-[100px]"
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

export default function Sponsoren() {
  usePageTitle('Sponsoren', 'Partner und Sponsoren des FC Sursee.')

  const [sponsoren, setSponsoren] = useState([])
  const [laden, setLaden]         = useState(true)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setSponsoren(data); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Unsere Sponsoren</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Ohne unsere Partner wäre vieles nicht möglich. Herzlichen Dank für die Unterstützung.
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-12">

          {/* Benefits */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-5 bg-fc-rot rounded-full block" />
              <h2 className="text-xl font-black text-fc-dunkel">Vorteile als Sponsor</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VORTEILE.map(v => (
                <div key={v.titel} className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <div className="w-10 h-10 bg-fc-rot/10 text-fc-rot rounded-lg flex items-center justify-center shrink-0">
                    {v.icon}
                  </div>
                  <p className="font-bold text-fc-dunkel text-sm">{v.titel}</p>
                  <p className="text-fc-text text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {laden && (
            <div className="space-y-8">
              {[1,2,3].map(i => <div key={i} className="h-32 animate-pulse bg-gray-200 rounded-xl" />)}
            </div>
          )}

          {!laden && KATEGORIEN_REIHENFOLGE.map(kat => {
            const liste = sponsoren.filter(s => s.kategorie === kat.key)
            if (liste.length === 0) return null
            return (
              <div key={kat.key}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-5 bg-fc-rot rounded-full block" />
                  <div>
                    <h2 className="text-xl font-black text-fc-dunkel">{kat.label}</h2>
                    <p className="text-fc-text text-sm">{kat.beschreibung}</p>
                  </div>
                </div>
                <div className={`grid gap-4 ${kat.cols}`}>
                  {liste.map(s => <SponsorCard key={s._id} sponsor={s} logoH={kat.logoH} />)}
                </div>
              </div>
            )
          })}

          {!laden && sponsoren.length === 0 && (
            <p className="text-fc-text text-center py-12">Sponsoren werden bald erfasst.</p>
          )}

          {/* CTA */}
          <div className="bg-fc-dunkel rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Werden Sie Sponsor</h3>
              <p className="text-gray-400 max-w-md">
                Unterstuetzen Sie den FC Sursee und profitieren Sie von attraktiven Gegenleistungen.
              </p>
            </div>
            <Link to="/sponsor-werden" className="bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity shrink-0">
              Jetzt Sponsor werden
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
