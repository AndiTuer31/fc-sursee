import { useState } from 'react'
import { Link } from 'react-router-dom'

const TEAMS_LINKS = [
  { label: 'Aktive',    to: '/aktive' },
  { label: 'Nachwuchs', to: '/nachwuchs' },
]

const VEREIN_LINKS = [
  { label: 'Über den Verein', to: '/verein' },
  { label: 'Clubhaus',        to: '/clubhaus' },
  { label: 'Plätze',          to: '/plaetze' },
]

const NAV_LINKS = [
  { label: 'Home',      to: '/' },
  { label: 'Verein',    to: '/verein' },
  { label: 'News',      to: '/news' },
  // 'Teams' ist ein Dropdown — separat gerendert
  { label: 'Events',    to: '/events' },
  { label: 'Sponsoren', to: '/sponsoren' },
  { label: 'Gönner',    to: '/club-222' },
  { label: 'Kontakt',   to: '/kontakt' },
]

// Chevron-Icon (weiss/grau, klein)
function ChevronDown({ className = '' }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [teamsOpen, setTeamsOpen] = useState(false)
  const [vereinOpen, setVereinOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="FC Sursee Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {/* Home */}
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors">
            Home
          </Link>

          {/* Verein Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors py-1">
              Verein
              <ChevronDown className="text-gray-400 group-hover:text-fc-rot transition-colors mt-0.5" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {VEREIN_LINKS.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-fc-grau hover:text-fc-rot transition-colors"
                >
                  {item.label === 'Plätze' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-fc-rot shrink-0">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                      <circle cx="12" cy="9" r="2.5" fill="white"/>
                    </svg>
                  ) : item.label === 'Clubhaus' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-fc-rot shrink-0">
                      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-fc-rot shrink-0">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="currentColor"/>
                    </svg>
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* News */}
          <Link to="/news" className="text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors">
            News
          </Link>

          {/* Teams Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors py-1">
              Teams
              <ChevronDown className="text-gray-400 group-hover:text-fc-rot transition-colors mt-0.5" />
            </button>
            {/* Dropdown Panel */}
            <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {TEAMS_LINKS.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-fc-grau hover:text-fc-rot transition-colors"
                >
                  {item.label === 'Aktive' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-fc-rot shrink-0">
                      <circle cx="12" cy="8" r="4" fill="currentColor"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-fc-rot shrink-0">
                      <circle cx="8" cy="8" r="3" fill="currentColor"/>
                      <circle cx="16" cy="8" r="3" fill="currentColor"/>
                      <path d="M2 20c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6" fill="currentColor"/>
                    </svg>
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Events */}
          <Link to="/events" className="text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors">
            Events
          </Link>
          {/* Sponsoren */}
          <Link to="/sponsoren" className="text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors">
            Sponsoren
          </Link>
          {/* Gönner */}
          <Link to="/club-222" className="text-sm font-medium text-gray-600 hover:text-fc-rot transition-colors">
            Gönner
          </Link>
          {/* Kontakt */}
          <Link
            to="/kontakt"
            className="text-sm font-semibold bg-fc-dunkel text-white px-4 py-2 rounded hover:bg-fc-rot transition-colors"
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <span className={`block w-6 h-0.5 bg-fc-dunkel transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-fc-dunkel transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-fc-dunkel transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-1 bg-white">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-fc-rot py-2.5 border-b border-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* Verein expandierbar */}
          <button
            className="flex items-center justify-between text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50"
            onClick={() => setVereinOpen(!vereinOpen)}
          >
            <span>Verein</span>
            <ChevronDown className={`text-gray-400 transition-transform ${vereinOpen ? 'rotate-180' : ''}`} />
          </button>
          {vereinOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-1">
              {VEREIN_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-500 hover:text-fc-rot py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/news"
            className="text-sm font-medium text-gray-700 hover:text-fc-rot py-2.5 border-b border-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>

          {/* Teams expandierbar */}
          <button
            className="flex items-center justify-between text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50"
            onClick={() => setTeamsOpen(!teamsOpen)}
          >
            <span>Teams</span>
            <ChevronDown className={`text-gray-400 transition-transform ${teamsOpen ? 'rotate-180' : ''}`} />
          </button>
          {teamsOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-1">
              {TEAMS_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-500 hover:text-fc-rot py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {[
            { label: 'Events',    to: '/events' },
            { label: 'Sponsoren', to: '/sponsoren' },
            { label: 'Gönner',    to: '/club-222' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-gray-700 hover:text-fc-rot py-2.5 border-b border-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/kontakt"
            className="mt-3 bg-fc-rot text-white text-sm font-semibold px-5 py-3 rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            Kontakt
          </Link>
        </div>
      )}
    </header>
  )
}
