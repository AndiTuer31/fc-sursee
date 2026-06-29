const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'Verein',      href: '/verein' },
  { label: 'News',        href: '/news' },
  { label: 'Aktive',      href: '/aktive' },
  { label: 'Nachwuchs',   href: '/nachwuchs' },
  { label: 'Events',      href: '/events' },
  { label: 'Sponsoren',   href: '/sponsoren' },
  { label: 'Gönner',      href: '/club-222' },
  { label: 'Kontakt',     href: '/kontakt' },
]

const VEREIN_LINKS = [
  { label: 'Leitbild',         href: '/verein?tab=Leitbild' },
  { label: 'Vereinsführung',   href: '/verein?tab=Vereinsführung' },
  { label: 'Statuten & Dokumente', href: '/verein?tab=Dokumente' },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-fc-dunkel text-white">
      <div className="h-1 bg-fc-rot" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & Kontakt */}
          <div className="md:col-span-1">
            <img src="/FC_Sursee_logo_transparent_clean.png" alt="FC Sursee" className="h-16 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              FC Sursee<br />
              Stadion Schlottermilch<br />
              6210 Sursee<br /><br />
              <a href="tel:0419215653" className="hover:text-fc-rot transition-colors">041 921 56 53</a><br />
              <a href="mailto:info@fcsursee.ch" className="hover:text-fc-rot transition-colors">info@fcsursee.ch</a>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verein */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Verein</h4>
            <ul className="space-y-2">
              {VEREIN_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Folge uns</h4>
            <div className="flex gap-3 mb-8">
              <a href="https://www.instagram.com/fcsursee" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                 aria-label="FC Sursee auf Instagram">
                <InstagramIcon />
              </a>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Spielplan</h4>
            <a href="https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=trr"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 text-sm hover:text-white transition-colors block mb-2">
              Amateur Liga Match Center →
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} FC Sursee — Vereinsnummer 2542</p>
          <div className="flex items-center gap-4">
            <a href="/impressum" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Impressum & Datenschutz</a>
            <span className="text-gray-700 text-xs">Gegründet 1. Juni 1920 · Sorsii esch Sorsii</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
