import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

const OPTIONEN = [
  {
    nr: '01',
    titel: 'Als Junior beitreten',
    beschreibung: 'Von der G-Jugend bis zu den A-Junioren — melde dein Kind jetzt online an. Unsere Trainer begleiten jeden Spieler sportlich und menschlich.',
    cta: 'Zur Anmeldung',
    href: '/junioren-anmeldung',
    extern: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="3.5" fill="white"/>
        <path d="M2 20c0-3.9 3.1-7 7-7h4c3.9 0 7 3.1 7 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <circle cx="17" cy="8" r="2.5" fill="white" opacity="0.6"/>
        <path d="M21 19c0-2.8-1.8-5.2-4.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6"/>
      </svg>
    ),
  },
  {
    nr: '02',
    titel: 'Trainer werden',
    beschreibung: 'Du liebst Fussball und willst Jugendliche begleiten und fördern? Melde dich bei uns — wir freuen uns über jede Verstärkung im Trainerteam.',
    cta: 'E-Mail schreiben',
    href: 'mailto:info@fcsursee.ch?subject=Trainer%20werden%20beim%20FC%20Sursee',
    extern: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="7" r="3.5" fill="white"/>
        <path d="M2 20c0-3.9 3.1-7 7-7h3" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M16 12l5 5m0 0l-5 5m5-5H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    nr: '03',
    titel: 'Club 222',
    beschreibung: 'Werde Gönnermitglied für CHF 222 im Jahr. Freier Eintritt zu allen Heimspielen, CHF 50 Cash-Back bei Werbung und direkte Vereinsnähe.',
    cta: 'Mehr erfahren',
    href: '/club-222',
    extern: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6L12 2z" fill="white"/>
      </svg>
    ),
  },
  {
    nr: '04',
    titel: 'Donatorenverein',
    beschreibung: 'Der eigenständige Donatorenverein des FC Sursee unterstützt den Verein finanziell und ideell. Alle Infos auf der offiziellen Website.',
    cta: 'Zur Website',
    href: 'https://www.donatorenfcsursee.ch/',
    extern: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="white"/>
      </svg>
    ),
  },
]

export default function MitgliedWerden() {
  usePageTitle('Mitglied werden', 'Werde Mitglied beim FC Sursee.')

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-fc-dunkel text-white py-16 relative overflow-hidden">
        {/* Hintergrund-Akzent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-fc-rot/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-fc-rot/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Zurück-Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zurück zur Startseite
          </Link>

          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-3">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Teil des FC Sursee werden</h1>
          <p className="text-gray-400 max-w-lg leading-relaxed">
            Es gibt viele Wege, Teil unserer Gemeinschaft zu sein.
            Wähle die Option, die zu dir passt.
          </p>
        </div>
      </section>

      {/* Cards */}
      <main className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPTIONEN.map(opt => (
              <a
                key={opt.titel}
                href={opt.href}
                {...(opt.extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group block bg-fc-grau rounded-2xl p-8 hover:bg-fc-dunkel transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-fc-rot rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {opt.icon}
                  </div>
                  {/* Nummer */}
                  <span className="text-5xl font-black text-gray-200 group-hover:text-white/10 transition-colors leading-none select-none">
                    {opt.nr}
                  </span>
                </div>

                <h2 className="text-xl font-black text-fc-dunkel group-hover:text-white mb-3 transition-colors">
                  {opt.titel}
                </h2>
                <p className="text-fc-text group-hover:text-gray-400 text-sm leading-relaxed mb-6 transition-colors">
                  {opt.beschreibung}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-fc-rot group-hover:text-white font-semibold text-sm transition-colors">
                  <span>{opt.cta}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Footer-Hinweis */}
          <p className="text-center text-fc-text text-sm mt-10">
            Fragen? Schreib uns:{' '}
            <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline font-medium">
              info@fcsursee.ch
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
