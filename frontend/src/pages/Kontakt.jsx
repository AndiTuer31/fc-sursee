import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

const SERVICE_ID  = 'service_lpqlr0g'
const TEMPLATE_ID = 'template_a9n2kp2'
const PUBLIC_KEY  = 'NKP5Qb5-cO2IreHRe'

const BETREFF_OPTIONEN = [
  'Allgemeine Anfrage',
  'Mitgliedschaft',
  'Sponsoring',
  'Clubhaus / Reservation',
  'Nachwuchs / Juniorenabteilung',
  'Medien & Presse',
  'Sonstiges',
]

export default function Kontakt() {
  usePageTitle('Kontakt', 'Kontakt zum FC Sursee – Adresse, E-Mail und Ansprechpartner.')

  const [form, setForm] = useState({
    from_name:  '',
    from_email: '',
    betreff:    '',
    nachricht:  '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.from_name || !form.from_email || !form.nachricht) return
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          betreff:    form.betreff || 'Allgemeine Anfrage',
          nachricht:  form.nachricht,
          reply_to:   form.from_email,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setForm({ from_name: '', from_email: '', betreff: '', nachricht: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Kontakt</h1>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Linke Spalte — Info */}
            <div className="flex flex-col gap-6">

              {/* Adresse */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Klubhaus & Stadion</h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-4">
                    <span className="text-fc-rot text-lg">&#128205;</span>
                    <div>
                      <p className="font-bold text-fc-dunkel">Adresse</p>
                      <p className="text-fc-text">Stadion Schlottermilch<br />6210 Sursee</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-fc-rot text-lg">&#128222;</span>
                    <div>
                      <p className="font-bold text-fc-dunkel">Telefon Klubhaus</p>
                      <a href="tel:0419215653" className="text-fc-rot hover:underline">041 921 56 53</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-fc-rot text-lg">&#9993;</span>
                    <div>
                      <p className="font-bold text-fc-dunkel">E-Mail</p>
                      <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline">info@fcsursee.ch</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-fc-rot text-lg">&#127760;</span>
                    <div>
                      <p className="font-bold text-fc-dunkel">Website</p>
                      <p className="text-fc-text">fcsursee.ch</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Social Media</h2>
                </div>
                <a
                  href="https://www.instagram.com/fcsursee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:border-pink-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    <img src="/instagram_farbig.png" alt="Instagram" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-fc-dunkel text-sm group-hover:text-pink-500 transition-colors">Instagram</p>
                    <p className="text-fc-text text-xs">@fcsursee</p>
                  </div>
                </a>
              </div>

              {/* Vereinsinfos */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Vereinsinfos</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Gegründet',     wert: '1. Juni 1920' },
                    { label: 'Vereinsnummer', wert: '2542' },
                    { label: 'Liga',          wert: '2. Liga interregional' },
                    { label: 'IBAN',          wert: 'CH14 0077 8010 3501 1330 8' },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-fc-text text-xs uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="font-semibold text-fc-dunkel">{item.wert}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Rechte Spalte — Formular + Karte */}
            <div className="flex flex-col gap-6">

              {/* Kontaktformular */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-xl font-black text-fc-dunkel">Nachricht senden</h2>
                </div>

                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-600">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-black text-fc-dunkel mb-2">Nachricht gesendet!</h3>
                    <p className="text-fc-text text-sm mb-6">Vielen Dank — wir melden uns so bald wie möglich.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm text-fc-rot font-semibold hover:underline"
                    >
                      Neue Nachricht senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-fc-dunkel uppercase tracking-wide mb-1.5">
                          Name <span className="text-fc-rot">*</span>
                        </label>
                        <input
                          type="text"
                          name="from_name"
                          value={form.from_name}
                          onChange={handleChange}
                          required
                          placeholder="Max Muster"
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-fc-dunkel focus:outline-none focus:border-fc-rot transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-fc-dunkel uppercase tracking-wide mb-1.5">
                          E-Mail <span className="text-fc-rot">*</span>
                        </label>
                        <input
                          type="email"
                          name="from_email"
                          value={form.from_email}
                          onChange={handleChange}
                          required
                          placeholder="max@beispiel.ch"
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-fc-dunkel focus:outline-none focus:border-fc-rot transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-fc-dunkel uppercase tracking-wide mb-1.5">
                        Betreff
                      </label>
                      <select
                        name="betreff"
                        value={form.betreff}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-fc-dunkel focus:outline-none focus:border-fc-rot transition-colors bg-white"
                      >
                        <option value="">Bitte auswählen…</option>
                        {BETREFF_OPTIONEN.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-fc-dunkel uppercase tracking-wide mb-1.5">
                        Nachricht <span className="text-fc-rot">*</span>
                      </label>
                      <textarea
                        name="nachricht"
                        value={form.nachricht}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Deine Nachricht an den FC Sursee…"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-fc-dunkel focus:outline-none focus:border-fc-rot transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                        Fehler beim Senden. Bitte versuche es erneut oder schreibe direkt an info@fcsursee.ch.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-fc-rot text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                    >
                      {status === 'sending' ? 'Wird gesendet…' : 'Nachricht senden →'}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      Felder mit <span className="text-fc-rot">*</span> sind Pflichtfelder.
                    </p>

                  </form>
                )}
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <iframe
                  title="Stadion Schlottermilch"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.4!2d8.1077!3d47.1723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4790219f0b0b0b0b%3A0x0!2sStadion+Schlottermilch%2C+Sursee!5e0!3m2!1sde!2sch!4v1234567890"
                  className="w-full"
                  style={{ height: '280px', border: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-5 border-t border-gray-100">
                  <p className="font-bold text-fc-dunkel text-sm mb-1">Stadion Schlottermilch</p>
                  <p className="text-fc-text text-sm">6210 Sursee</p>
                  <a
                    href="https://maps.google.com/?q=Stadion+Schlottermilch+Sursee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-fc-rot text-sm font-semibold hover:underline"
                  >
                    In Google Maps öffnen →
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
