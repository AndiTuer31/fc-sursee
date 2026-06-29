import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

const QUERY = `*[_type == "event"] | order(datum desc) {
  _id, name, "slug": slug.current, datum, ort, titelbild, beschreibung
}`

const heute = new Date().toISOString().split('T')[0]

function EventCard({ event }) {
  const istVergangen = event.datum < heute
  const bild = imageUrl(event.titelbild)
  return (
    <Link
      to={`/events/${event.slug}`}
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group ${istVergangen ? 'opacity-70' : ''}`}
    >
      <div className="relative h-52 overflow-hidden">
        {bild ? (
          <img src={bild} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-fc-dunkel/20" />
        <span className="absolute top-3 left-3 bg-fc-rot text-white text-xs font-bold px-2.5 py-1 rounded">Event</span>
        {istVergangen && (
          <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded">Vergangen</span>
        )}
      </div>
      <div className="p-5">
        <p className="text-fc-text text-xs mb-1">&#128197; {event.datum} &middot; {event.ort}</p>
        <h3 className="font-black text-fc-dunkel text-lg leading-snug group-hover:text-fc-rot transition-colors mb-2">{event.name}</h3>
        <p className="text-fc-text text-sm line-clamp-2">{event.beschreibung}</p>
        <p className="text-fc-rot text-sm font-semibold mt-3">Mehr erfahren &rarr;</p>
      </div>
    </Link>
  )
}

export default function Events() {
  usePageTitle('Events', 'Events und Veranstaltungen des FC Sursee.')

  const [events, setEvents] = useState([])
  const [laden, setLaden]   = useState(true)

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setEvents(data); setLaden(false) })
      .catch(() => setLaden(false))
  }, [])

  const bevorstehend = events.filter(e => e.datum >= heute)
  const vergangen    = events.filter(e => e.datum <  heute)

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Events</h1>
          <p className="text-gray-400 mt-3">Turniere, Feste und Vereinsanlässe rund um den FC Sursee.</p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10 md:space-y-14">

          {laden && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!laden && bevorstehend.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                <h2 className="text-2xl font-black text-fc-dunkel">Bevorstehende Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bevorstehend.map(e => <EventCard key={e._id} event={e} />)}
              </div>
            </div>
          )}

          {!laden && vergangen.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-gray-400 rounded-full block" />
                <h2 className="text-2xl font-black text-gray-500">Vergangene Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vergangen.map(e => <EventCard key={e._id} event={e} />)}
              </div>
            </div>
          )}

          {!laden && events.length === 0 && (
            <p className="text-fc-text text-center py-12">Noch keine Events erfasst.</p>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}
