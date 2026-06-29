import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client, imageUrl } from '../lib/sanity'

const KATEGORIE_FARBE = {
  Spielbericht: 'bg-fc-rot',
  Transfer:     'bg-fc-dunkel',
  Verein:       'bg-gray-500',
  Nachwuchs:    'bg-green-600',
  Event:        'bg-blue-600',
}

const QUERY = `*[_type == "news"] | order(gepinnt desc, datum desc) [0..2] {
  _id, titel, "slug": slug.current, datum, kategorie, autor, gepinnt, bild
}`

export default function NewsGrid() {
  const [news, setNews]   = useState([])
  const [laden, setLaden] = useState(true)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setNews(data || []); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  return (
    <section className="bg-fc-grau py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-fc-rot rounded-full block" />
            <h2 className="text-2xl font-black text-fc-dunkel">Aktuelles</h2>
          </div>
          <Link to="/news" className="text-sm font-semibold text-fc-rot hover:underline">
            Alle News
          </Link>
        </div>

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

        {!laden && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map(artikel => {
              const bild = imageUrl(artikel.bild)
              return (
                <Link
                  key={artikel._id}
                  to={`/news/${artikel.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative overflow-hidden h-48">
                    {bild ? (
                      <img
                        src={bild}
                        alt={artikel.titel}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    {artikel.gepinnt && (
                      <span className="absolute top-3 right-3 bg-fc-rot/90 text-white text-xs font-bold px-2 py-0.5 rounded">
                        Gepinnt
                      </span>
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
            })}
          </div>
        )}

        {!laden && news.length === 0 && (
          <p className="text-fc-text text-sm text-center py-8">Noch keine News erfasst.</p>
        )}

      </div>
    </section>
  )
}
