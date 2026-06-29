import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

const QUERY = `*[_type == "clubhaus"][0] {
  bilder, beschreibung, oeffnungszeiten,
  kontaktName, kontaktTelefon, kontaktEmail, adresse,
  "betreiber": betreiber[] { name, funktion, email, telefon, foto },
  "dokumente": dokumente[] {
    titel,
    "dateiUrl": datei.asset->url
  }
}`

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-fc-rot">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
function MailIcon({ className = "shrink-0 text-fc-rot" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-fc-rot">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}
function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-fc-rot shrink-0">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function Initialen({ name }) {
  const parts = (name || '').trim().split(' ')
  return <>{parts.map(p => p[0]).join('').slice(0, 2).toUpperCase()}</>
}

export default function Clubhaus() {
  usePageTitle('Clubhaus', 'Das Clubhaus des FC Sursee – Infos, Bilder und Kontakt.')

  const [data, setData] = useState(null)

  useEffect(() => {
    client.fetch(QUERY).then(setData).catch(() => {})
  }, [])

  const bilder = data?.bilder || []
  const ctaEmail = data?.kontaktEmail || data?.betreiber?.[0]?.email || 'info@fcsursee.ch'

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-3xl md:text-5xl font-black">Clubhaus</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Das Herzstück unseres Vereinslebens — Treffpunkt, Festsaal und gute Küche.
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10 md:space-y-12">

          {/* Bildergalerie */}
          {bilder.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                <h2 className="text-2xl font-black text-fc-dunkel">Bilder</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {bilder.map((bild, i) => {
                  const url = imageUrl(bild)
                  return url ? (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-200">
                      <img src={url} alt={`Clubhaus ${i + 1}`} loading="lazy"
                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Betreiber */}
          {data?.betreiber?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                <h2 className="text-2xl font-black text-fc-dunkel">Betreiber</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                {data.betreiber.map((person, i) => {
                  const foto = imageUrl(person.foto)
                  return (
                    <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-5">
                      {foto ? (
                        <img src={foto} alt={person.name} className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover object-top shrink-0" />
                      ) : (
                        <div className="w-28 h-28 md:w-32 md:h-32 bg-fc-rot rounded-xl flex items-center justify-center shrink-0">
                          <span className="text-white font-black text-xl"><Initialen name={person.name} /></span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-black text-fc-dunkel">{person.name}</p>
                        {person.funktion && <p className="text-fc-rot text-sm font-semibold mt-0.5">{person.funktion}</p>}
                        {person.telefon && (
                          <a href={`tel:${person.telefon.replace(/\s/g, '')}`}
                             className="flex items-center gap-2 text-xs text-gray-500 hover:text-fc-rot transition-colors mt-2">
                            <PhoneIcon />{person.telefon}
                          </a>
                        )}
                        {person.email && (
                          <a href={`mailto:${person.email}`}
                             className="flex items-center gap-2 text-xs text-gray-500 hover:text-fc-rot transition-colors mt-1">
                            <MailIcon className="shrink-0 text-fc-rot" />{person.email}
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Beschreibung + Kontakt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {data?.beschreibung && (
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-5 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Über das Clubhaus</h2>
                </div>
                <p className="text-fc-text leading-relaxed whitespace-pre-line">{data.beschreibung}</p>
                {data.oeffnungszeiten && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="font-bold text-fc-dunkel text-sm mb-2">Öffnungszeiten</p>
                    <p className="text-fc-text text-sm leading-relaxed whitespace-pre-line">{data.oeffnungszeiten}</p>
                  </div>
                )}
              </div>
            )}

            {(data?.kontaktName || data?.kontaktTelefon || data?.kontaktEmail || data?.adresse) && (
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-5 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Kontakt & Reservierung</h2>
                </div>
                <div className="space-y-3">
                  {data.kontaktName && (
                    <p className="font-semibold text-fc-dunkel">{data.kontaktName}</p>
                  )}
                  {data.kontaktTelefon && (
                    <a href={`tel:${data.kontaktTelefon.replace(/\s/g, '')}`}
                       className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-fc-rot transition-colors">
                      <PhoneIcon />{data.kontaktTelefon}
                    </a>
                  )}
                  {data.kontaktEmail && (
                    <a href={`mailto:${data.kontaktEmail}`}
                       className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-fc-rot transition-colors">
                      <MailIcon />{data.kontaktEmail}
                    </a>
                  )}
                  {data.adresse && (
                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                      <PinIcon /><span>{data.adresse}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!data && (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm col-span-2">
                <p className="text-fc-text">Inhalte werden bald im Sanity Studio erfasst.</p>
              </div>
            )}
          </div>

          {/* Dokumente */}
          {data?.dokumente?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                <h2 className="text-2xl font-black text-fc-dunkel">Dokumente</h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {data.dokumente.map((dok, i) => (
                  <a key={i} href={dok.dateiUrl} target="_blank" rel="noopener noreferrer"
                     className={`flex items-center justify-between px-5 py-4 hover:bg-fc-grau transition-colors group ${
                       i !== data.dokumente.length - 1 ? 'border-b border-gray-100' : ''
                     }`}>
                    <div className="flex items-center gap-4">
                      <DocIcon />
                      <p className="font-semibold text-fc-dunkel text-sm group-hover:text-fc-rot transition-colors">{dok.titel}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-fc-text shrink-0">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box — Reservierung */}
          <div className="bg-fc-dunkel rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">Reservierung & Anfragen</h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Das Clubhaus kann für Anlässe, Geburtstage und Vereinsfeste reserviert werden.
                Kontaktiert die Betreiber direkt für eine Anfrage.
              </p>
            </div>
            <a
              href={`mailto:${ctaEmail}`}
              className="bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity shrink-0 text-sm"
            >
              Jetzt anfragen →
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
