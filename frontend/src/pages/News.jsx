import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

const KATEGORIEN = ['Alle', 'Spielbericht', 'Transfer', 'Verein', 'Nachwuchs', 'Event']

const KATEGORIE_FARBE = {
  Spielbericht: 'bg-fc-rot',
  Transfer:     'bg-fc-dunkel',
  Verein:       'bg-gray-500',
  Nachwuchs:    'bg-green-600',
  Event:        'bg-blue-600',
}

// bild ohne asset-> damit _ref erhalten bleibt (noetig fuer imageUrl)
// gepinnt desc, dann datum desc: gepinnter Artikel kommt immer zuerst
const QUERY = `*[_type == "news"] | order(gepinnt desc, datum desc) {
  _id, titel, "slug": slug.current, datum, kategorie, autor, gepinnt, bild, zusammenfassung
}`

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

function FeaturedCard({ artikel }) {
  const bildUrl = imageUrl(artikel.bild)
  return (
    <Link
      to={`/news/${artikel.slug}`}
      className="group relative block bg-fc-dunkel rounded-2xl overflow-hidden shadow-lg mb-10"
    >
      {bildUrl ? (
        <img
          src={bildUrl}
          alt={artikel.titel}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-fc-rot/30 to-fc-dunkel" />
      )}
      <div className="relative z-10 p-8 md:p-12 min-h-[260px] flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded">
            <PinIcon /> Gepinnter Beitrag
          </span>
          {artikel.kategorie && (
            <span className={`${KATEGORIE_FARBE[artikel.kategorie] || 'bg-gray-500'} text-white text-xs font-bold px-2.5 py-1 rounded`}>
              {artikel.kategorie}
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3 group-hover:text-gray-200 transition-colors max-w-2xl">
          {artikel.titel}
        </h2>
        {artikel.zusammenfassung && (
          <p className="text-gray-300 text-sm mb-4 max-w-xl line-clamp-2">{artikel.zusammenfassung}</p>
        )}
        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <span>{artikel.datum}</span>
          {artikel.autor && <><span>·</span><span>{artikel.autor}</span></>}
          <span className="ml-auto text-white font-semibold group-hover:translate-x-1 transition-transform inline-block">
            Weiterlesen →
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArtikelCard({ artikel }) {
  const bildUrl = imageUrl(artikel.bild)
  return (
    <Link
      to={`/news/${artikel.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="relative overflow-hidden h-48">
        {bildUrl ? (
          <img
            src={bildUrl}
            alt={artikel.titel}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Kein Bild</span>
          </div>
        )}
        <span className={`absolute top-3 left-3 ${KATEGORIE_FARBE[artikel.kategorie] || 'bg-gray-500'} text-white text-xs font-bold px-2.5 py-1 rounded`}>
          {artikel.kategorie}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-fc-text text-xs">{artikel.datum}</p>
          {artikel.autor && <p className="text-fc-text text-xs">{artikel.autor}</p>}
        </div>
        <h3 className="font-bold text-fc-dunkel text-base leading-snug group-hover:text-fc-rot transition-colors">
          {artikel.titel}
        </h3>
      </div>
    </Link>
  )
}

export default function News() {
  usePageTitle('News', 'Aktuelle Neuigkeiten, Spielberichte und Vereinsinformationen vom FC Sursee.')

  const [news, setNews]                   = useState([])
  const [laden, setLaden]                 = useState(true)
  const [aktiverFilter, setAktiverFilter] = useState('Alle')

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setNews(data || []); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  const gepinnterArtikel = aktiverFilter === 'Alle' ? news.find(n => n.gepinnt) : null
  const gefilterteNews   = aktiverFilter === 'Alle'
    ? news.filter(n => !n.gepinnt)
    : news.filter(n => n.kategorie === aktiverFilter)

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">News</h1>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {KATEGORIEN.map(kat => (
              <button
                key={kat}
                onClick={() => setAktiverFilter(kat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  aktiverFilter === kat
                    ? 'bg-fc-rot text-white'
                    : 'bg-white text-gray-600 hover:border-fc-rot border border-gray-200'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Ladeanimation */}
          {laden && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!laden && (
            <>
              {/* Featured / gepinnter Artikel */}
              {gepinnterArtikel && <FeaturedCard artikel={gepinnterArtikel} />}

              {/* Artikel-Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gefilterteNews.map(artikel => (
                  <ArtikelCard key={artikel._id} artikel={artikel} />
                ))}
              </div>

              {gefilterteNews.length === 0 && !gepinnterArtikel && (
                <div className="text-center py-20">
                  <p className="text-fc-text text-lg">
                    {news.length === 0 ? 'Noch keine News erfasst.' : 'Keine News in dieser Kategorie.'}
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}
