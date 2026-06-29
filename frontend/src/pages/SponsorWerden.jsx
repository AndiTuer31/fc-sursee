import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

const VORTEILE = [
  {
    titel: 'Logo-Präsenz',
    text: 'Dein Logo auf der Website, auf Matchday-Materialien und je nach Paket auf Trikots oder Banden.',
  },
  {
    titel: 'Reichweite',
    text: 'FC Sursee erreicht mit seinen Teams, Junioren und Events hunderte Personen aus der Region Luzern.',
  },
  {
    titel: 'Gemeinschaft',
    text: 'Du unterstützt lokalen Fussball und bist Teil einer über 100-jährigen Vereinsgeschichte.',
  },
  {
    titel: 'Sichtbarkeit',
    text: 'Dein Unternehmen wird auf unserer Sponsoren-Seite mit Logo und Link dauerhaft präsentiert.',
  },
]

export default function SponsorWerden() {
  usePageTitle('Sponsor werden', 'Werde Sponsor oder Partner des FC Sursee und unterstütze den Vereinsfussball.')

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Sponsor werden</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Unterstütze den FC Sursee und profitiere von regionaler Sichtbarkeit für dein Unternehmen.
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-6 space-y-8">

          {/* Vorteile */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-6 bg-fc-rot rounded-full block" />
              <h2 className="text-xl font-black text-fc-dunkel">Was du bekommst</h2>
            </div>
            <div className="space-y-5">
              {VORTEILE.map(v => (
                <div key={v.titel} className="flex gap-4">
                  <div className="w-2 h-2 bg-fc-rot rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-fc-dunkel text-sm">{v.titel}</p>
                    <p className="text-fc-text text-sm mt-0.5">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kontakt CTA */}
          <div className="bg-fc-dunkel rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-fc-rot rounded-full block" />
              <h2 className="text-xl font-black text-white">Interesse?</h2>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Melde dich einfach per E-Mail bei uns — wir stellen dir die aktuellen Sponsoring-Pakete
              vor und finden gemeinsam das passende Angebot für dein Unternehmen.
            </p>
            <a
              href="mailto:info@fcsursee.ch?subject=Sponsoring%20Anfrage%20FC%20Sursee"
              className="inline-flex items-center gap-2 bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.8"/>
                <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              info@fcsursee.ch
            </a>
            <p className="text-gray-500 text-xs mt-3">
              Oder ruf uns an: <a href="tel:0419215653" className="text-gray-400 hover:text-white">041 921 56 53</a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
