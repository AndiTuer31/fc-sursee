import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, imageUrl } from '../lib/sanity'

const QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id, name, datum, ort, titelbild, beschreibung,
  programm[] { zeit, beschreibung },
  buttons[] { label, url, typ }
}`

export default function EventDetail() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [laden, setLaden] = useState(true)

  useEffect(() => {
    client.fetch(QUERY, { slug })
      .then(data => { setEvent(data); setLaden(false) })
      .catch(() => setLaden(false))
  }, [slug])

  if (laden) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-fc-grau flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-fc-rot border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-black text-fc-rot mb-4">404</p>
            <p className="text-fc-dunkel font-bold text-xl mb-6">Event nicht gefunden</p>
            <Link to="/events" className="bg-fc-rot text-white px-5 py-2.5 rounded font-semibold">
              Zurück zu Events
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const bild = imageUrl(event.titelbild, 1200)

  return (
    <>
      <Navbar />

      <div className="relative h-72 md:h-96 overflow-hidden">
        {bild ? (
          <img src={bild} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-fc-dunkel" />
        )}
        <div className="absolute inset-0 bg-fc-dunkel/60" />
        <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-6 pb-8">
          <span className="inline-block bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded mb-3">Event</span>
          <h1 className="text-3xl md:text-4xl font-black text-white">{event.name}</h1>
          <p className="text-gray-300 text-sm mt-2">&#128197; {event.datum} &middot; &#128205; {event.ort}</p>
        </div>
      </div>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-8">

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-fc-dunkel text-lg leading-relaxed">{event.beschreibung}</p>
            {event.buttons?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {event.buttons.map(btn => (
                  <a
                    key={btn.label}
                    href={btn.url}
                    className={`font-semibold px-5 py-2.5 rounded text-sm transition-opacity hover:opacity-90 ${
                      btn.typ === 'primär'
                        ? 'bg-fc-rot text-white'
                        : 'border-2 border-fc-rot text-fc-rot hover:bg-fc-rot hover:text-white transition-colors'
                    }`}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {event.programm?.length > 0 && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                <h2 className="text-xl font-black text-fc-dunkel">Programm</h2>
              </div>
              <div className="space-y-0">
                {event.programm.map((punkt, i) => (
                  <div key={i} className="flex gap-6 items-start py-3 border-b border-gray-100 last:border-0">
                    <span className="text-fc-rot font-bold text-sm w-20 shrink-0">{punkt.zeit}</span>
                    <span className="text-fc-dunkel text-sm">{punkt.beschreibung}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link to="/events" className="inline-block text-fc-rot font-semibold hover:underline text-sm">
            &larr; Zurück zu allen Events
          </Link>

        </div>
      </main>

      <Footer />
    </>
  )
}
