import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client } from '../lib/sanity'
import { usePageTitle } from '../lib/usePageTitle'

const SERVICE_ID  = 'service_8n1t8br'
const TEMPLATE_ID = 'template_h7sxoop'
const PUBLIC_KEY  = 'JUgNPNA5Zxd4sOIX4'

const MITGLIEDER_QUERY = `*[_type == "club222" && aktiv == true] | order(name asc) { _id, name }`

const VORTEILE = [
  { icon: '\u{1F3AB}', titel: 'Freier Eintritt',    text: 'Kostenloser Eintritt zu allen Meisterschaftsspielen im Stadion Schlottermilch.' },
  { icon: '\u{1F4B0}', titel: 'CHF 50.– Cash-Back', text: 'Wenn du ein neues Mitglied aquirierst, erhältst du CHF 50.– zurück.' },
  { icon: '\u{1F91D}', titel: 'Teil der Familie',    text: 'Als Gönnermitglied bist du Teil der FC Sursee Familie und unterstützt deinen Verein direkt.' },
  { icon: '\u{1F4E3}', titel: 'Exklusive Infos',     text: 'Erhalte frühzeitig News und Infos zu Vereinsanlässen.' },
]

const TABS = ['Club 222', 'Donatorenverein']

export default function Club222() {
  usePageTitle('Club 222', 'Club 222 – das Gönnerprogramm des FC Sursee. Unterstütze deinen Verein.')

  const [aktiverTab, setAktiverTab] = useState('Club 222')
  const [typ, setTyp]               = useState('einzel')
  const [mitglieder, setMitglieder] = useState([])
  const [status, setStatus]         = useState('idle') // idle | sending | success | error

  useEffect(() => {
    client.fetch(MITGLIEDER_QUERY).then(setMitglieder).catch(() => {})
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const data     = new FormData(e.target)
    const name     = data.get('name')
    const email    = data.get('email')
    const mitglied = typ === 'einzel' ? 'Einzelperson CHF 222' : 'Ehepaar CHF 333'
    const msg      = data.get('nachricht') || '–'
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        betreff:   `Neue Gönner-Anmeldung: ${name} (${mitglied})`,
        nachricht: `NEUE GÖNNER-ANMELDUNG — CLUB 222\n\nName: ${name}\nE-Mail: ${email}\nMitgliedschaft: ${mitglied}\n\nNachricht:\n${msg}`,
        reply_to:  email,
      }, PUBLIC_KEY)
      setStatus('success')
      e.target.reset()
      setTyp('einzel')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Gönnermitglied werden</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Unterstütze den FC Sursee als Gönnermitglied und profitiere von exklusiven Vorteilen.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setAktiverTab(tab)}
              className={`px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                aktiverTab === tab
                  ? 'border-fc-rot text-fc-rot'
                  : 'border-transparent text-gray-500 hover:text-fc-dunkel'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">

          {aktiverTab === 'Club 222' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h2 className="text-xl font-black text-fc-dunkel">Mitgliedschaft</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-fc-rot rounded-xl p-6 text-center">
                      <p className="text-fc-text text-sm mb-2">Einzelperson</p>
                      <p className="text-4xl font-black text-fc-rot">222</p>
                      <p className="text-fc-text text-sm">CHF / Jahr</p>
                    </div>
                    <div className="border-2 border-fc-dunkel rounded-xl p-6 text-center">
                      <p className="text-fc-text text-sm mb-2">Ehepaar</p>
                      <p className="text-4xl font-black text-fc-dunkel">333</p>
                      <p className="text-fc-text text-sm">CHF / Jahr</p>
                    </div>
                  </div>
                  <p className="text-fc-text text-xs mt-4 text-center">
                    Nur für Privatpersonen — Firmen über die regulären Sponsoren.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h2 className="text-xl font-black text-fc-dunkel">Deine Vorteile</h2>
                  </div>
                  <div className="space-y-4">
                    {VORTEILE.map(v => (
                      <div key={v.titel} className="flex gap-4">
                        <span className="text-2xl shrink-0">{v.icon}</span>
                        <div>
                          <p className="font-bold text-fc-dunkel text-sm">{v.titel}</p>
                          <p className="text-fc-text text-sm">{v.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h2 className="text-xl font-black text-fc-dunkel">Unsere Gönnermitglieder</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mitglieder.length > 0
                      ? mitglieder.map(m => (
                          <span key={m._id} className="bg-fc-grau text-fc-dunkel text-sm px-3 py-1 rounded-full font-medium">
                            {m.name}
                          </span>
                        ))
                      : <p className="text-fc-text text-sm">Mitglieder werden bald erfasst.</p>
                    }
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl p-8 shadow-sm sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                    <h2 className="text-xl font-black text-fc-dunkel">Jetzt anmelden</h2>
                  </div>

                  {status === 'success' ? (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#16a34a"/>
                          <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="font-bold text-fc-dunkel text-lg mb-2">Vielen Dank!</p>
                      <p className="text-fc-text text-sm mb-4">Wir melden uns in Kürze bei dir.</p>
                      <button onClick={() => setStatus('idle')} className="text-sm text-fc-rot font-semibold hover:underline">
                        Neue Anmeldung
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-fc-dunkel mb-1" htmlFor="name">Name *</label>
                        <input
                          id="name" name="name" type="text" required
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-fc-rot"
                          placeholder="Vorname Nachname"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-fc-dunkel mb-1" htmlFor="email">E-Mail *</label>
                        <input
                          id="email" name="email" type="email" required
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-fc-rot"
                          placeholder="name@beispiel.ch"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-fc-dunkel mb-2">Mitgliedschaft</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['einzel', 'ehepaar'].map(t => (
                            <button
                              key={t} type="button"
                              onClick={() => setTyp(t)}
                              className={`py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
                                typ === t ? 'border-fc-rot bg-fc-rot text-white' : 'border-gray-200 text-gray-600'
                              }`}
                            >
                              {t === 'einzel' ? 'Einzelperson · CHF 222' : 'Ehepaar · CHF 333'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-fc-dunkel mb-1" htmlFor="nachricht">Nachricht (optional)</label>
                        <textarea
                          id="nachricht" name="nachricht" rows={3}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-fc-rot resize-none"
                          placeholder="Fragen oder Bemerkungen..."
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                          Fehler beim Senden. Bitte versuche es erneut oder schreibe an info@fcsursee.ch.
                        </p>
                      )}

                      <button
                        type="submit" disabled={status === 'sending'}
                        className="w-full bg-fc-rot text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                      >
                        {status === 'sending' ? 'Wird gesendet…' : 'Anmeldung absenden'}
                      </button>
                      <p className="text-fc-text text-xs text-center">
                        Kein automatischer Einzug — wir kontaktieren dich für die Zahlungsdetails.
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          )}

          {aktiverTab === 'Donatorenverein' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Donatorenverein FC Sursee</h2>
                </div>
                <p className="text-fc-text leading-relaxed mb-6">
                  Neben dem Club 222 gibt es den eigenständigen <strong className="text-fc-dunkel">Donatorenverein des FC Sursee</strong>.
                  Weitere Informationen, Mitgliedschaft und Kontakt findest du direkt auf der offiziellen Website.
                </p>
                <a
                  href="https://www.donatorenfcsursee.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity"
                >
                  Zur Donatorenverein-Website →
                </a>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}
