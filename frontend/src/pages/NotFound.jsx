import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-fc-grau flex flex-col items-center justify-center px-6 text-center">

      {/* VAR Screen Animation */}
      <div className="relative mb-8">
        <div className="w-32 h-24 bg-fc-dunkel rounded-xl flex items-center justify-center border-4 border-gray-700 shadow-2xl">
          <div className="text-center">
            <span className="text-white font-black text-3xl block leading-none">4</span>
            <span className="text-fc-rot font-black text-3xl block leading-none">0</span>
            <span className="text-white font-black text-3xl block leading-none">4</span>
          </div>
        </div>
        {/* Blinkende Ecken — VAR-Style */}
        <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-fc-rot" />
        <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-fc-rot" />
        <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-fc-rot" />
        <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-fc-rot" />
      </div>

      {/* VAR-Badge */}
      <div className="inline-flex items-center gap-2 bg-fc-rot text-white text-xs font-black px-4 py-2 rounded mb-6 tracking-widest uppercase">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="white" strokeWidth="2"/>
          <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        VAR — Überprüfung läuft
      </div>

      <h1 className="text-5xl md:text-6xl font-black text-fc-dunkel mb-2">
        Seite nicht gefunden
      </h1>

      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md mt-6 mb-8 border-l-4 border-fc-rot">
        <p className="text-fc-text leading-relaxed mb-2">
          Nach <span className="font-bold text-fc-dunkel">4 Minuten und 22 Sekunden</span> VAR-Überprüfung lautet der Entscheid:
        </p>
        <p className="text-xl font-black text-fc-rot mt-3">
          "Diese Seite existiert nicht."
        </p>
        <p className="text-fc-text text-sm mt-3 italic">
          — Die ursprüngliche Entscheidung wurde bestätigt. Kein Offside.
        </p>
      </div>

      {/* Schiedsrichter-Zeichnung */}
      <div className="text-8xl mb-6" role="img" aria-label="Schiedsrichter">
        🟥
      </div>

      <p className="text-fc-text mb-8 max-w-sm">
        Die URL existiert nicht — oder wurde vom Schiedsrichter abgepfiffen.
        Kein Einspruch möglich.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/" className="bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity">
          Zurück zur Startseite
        </Link>
        <Link to="/news" className="border-2 border-fc-dunkel text-fc-dunkel font-semibold px-6 py-3 rounded hover:bg-fc-dunkel hover:text-white transition-colors">
          Zu den News
        </Link>
      </div>

      <p className="text-gray-300 text-xs mt-12 font-mono">
        ERROR 404 · FC SURSEE · SORSII ESCH SORSII
      </p>
    </div>
  )
}
