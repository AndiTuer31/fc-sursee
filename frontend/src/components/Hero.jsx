import { useState, useEffect } from 'react'
import { useSiteSettings } from '../lib/useSiteSettings'
import { imageUrl } from '../lib/sanity'

export default function Hero() {
  const s = useSiteSettings()
  const [aktiv, setAktiv] = useState(0)

  // null = Sanity noch nicht geladen → kein Fallback-Bild anzeigen
  const bilder = s.heroBilder === null
    ? []
    : s.heroBilder.length > 0
      ? s.heroBilder.map(b => ({ url: imageUrl(b.bild), alt: b.alt || 'FC Sursee' })).filter(b => b.url)
      : []

  useEffect(() => {
    if (bilder.length <= 1) return
    const t = setInterval(() => setAktiv(i => (i + 1) % bilder.length), 8000)
    return () => clearInterval(t)
  }, [bilder.length])

  const STATS = [
    { zahl: s.vereinsjahre,    label: 'Jahre Geschichte' },
    { zahl: s.liga_name,       label: 'Aktuelle Liga' },
    { zahl: s.anzahl_junioren, label: 'Junioren & Juniorinnen' },
  ]

  const shadowStyle = { textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)' }

  return (
    <section className="relative bg-fc-dunkel text-white overflow-hidden">
      {/* Karussell-Bilder — CSS Crossfade */}
      <div className="absolute inset-0">
        {bilder.map((bild, i) => (
          <img
            key={i}
            src={bild.url}
            alt={bild.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === aktiv ? 0.75 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: i === aktiv ? 1 : 0,
            }}
          />
        ))}
        {/* Gradient fuer Lesbarkeit */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)' }} />
      </div>

      {/* Wasserzeichen */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[20rem] font-black text-white opacity-[0.03] leading-none">1920</span>
      </div>

      {/* Inhalt */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-36">
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="bg-fc-rot text-white text-xs font-bold px-3 py-1 rounded tracking-widest uppercase">
            Sorsii esch Sorsii
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-5 max-w-3xl" style={shadowStyle}>
          Unser Klub.<br />
          <span className="text-fc-rot">Unsere Stadt.</span>
        </h1>

        <p className="text-gray-200 text-base sm:text-lg mb-8 max-w-xl" style={shadowStyle}>
          Der FC Sursee steht fuer Leidenschaft, Gemeinschaft und Fussball &mdash;
          seit 1920 im Herzen der Region.
        </p>

        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          <a href="/news" className="bg-fc-rot text-white font-semibold px-5 py-3 rounded hover:opacity-90 transition-opacity text-sm md:text-base">
            Aktuelles
          </a>
          <a href={s.cta_mitglied_url} className="border border-white/40 text-white font-semibold px-5 py-3 rounded hover:bg-white hover:text-fc-dunkel transition-colors text-sm md:text-base">
            {s.cta_mitglied_label}
          </a>
          <a href={s.cta_sponsor_url} className="border border-white/40 text-white font-semibold px-5 py-3 rounded hover:bg-white hover:text-fc-dunkel transition-colors text-sm md:text-base">
            {s.cta_sponsor_label}
          </a>
        </div>

        {/* Stats */}
        <div className="border-t border-white/20 pt-6 flex flex-wrap gap-y-5">
          {STATS.filter(st => st.zahl).map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 pr-6 md:pr-10 ${i > 0 ? 'pl-6 md:pl-10 border-l border-white/20' : ''}`}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-none" style={shadowStyle}>{stat.zahl}</span>
              {stat.label && (
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest leading-tight">{stat.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Karussell-Punkte */}
      {bilder.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bilder.map((_, i) => (
            <button
              key={i}
              onClick={() => setAktiv(i)}
              className={`rounded-full transition-all duration-300 ${
                i === aktiv ? 'w-6 h-2 bg-fc-rot' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Bild ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
