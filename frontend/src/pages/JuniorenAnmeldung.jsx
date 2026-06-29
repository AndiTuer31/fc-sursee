import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

const SERVICE_ID  = 'service_8n1t8br'
const TEMPLATE_ID = 'template_afpaiuv'
const PUBLIC_KEY  = 'JUgNPNA5Zxd4sOIX4'

const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-fc-rot'
const labelClass = 'block text-sm font-semibold text-fc-dunkel mb-1'

export default function JuniorenAnmeldung() {
  usePageTitle('Junioren-Anmeldung', 'Melde dein Kind bei der Nachwuchsabteilung des FC Sursee an.')

  const formRef             = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [trainerInformiert, setTrainerInformiert] = useState('')
  const [bestaetigt, setBestaetigt]               = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!bestaetigt || !trainerInformiert || status === 'sending') return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
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
          <Link to="/nachwuchs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zurück zu Nachwuchs
          </Link>
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">Juniorenabteilung</p>
          <h1 className="text-4xl md:text-5xl font-black">Neuaufnahme Junioren</h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            Fülle das Formular vollständig aus. Dokumente (Passfoto, ID, AHV-Karte) bitte separat per E-Mail einsenden.
          </p>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-6">

          {status === 'success' ? (
            <div className="bg-white rounded-xl p-10 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#16a34a"/>
                  <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-black text-fc-dunkel mb-3">Anmeldung eingegangen!</h2>
              <p className="text-fc-text mb-6 leading-relaxed">
                Wir haben deine Anmeldung erhalten und melden uns in Kürze.
                <br /><br />
                <strong className="text-fc-dunkel">Wichtig:</strong> Bitte sende noch Passfoto, ID-Kopien und die AHV-Karte per E-Mail an{' '}
                <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline">info@fcsursee.ch</a>.
              </p>
              <Link to="/nachwuchs" className="inline-block bg-fc-rot text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity">
                Zurück zu Nachwuchs
              </Link>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

              {/* Angaben Spieler */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-lg font-black text-fc-dunkel">Angaben Spieler/in</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="vorname_spieler">Vorname *</label>
                    <input id="vorname_spieler" name="vorname_spieler" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="nachname_spieler">Nachname *</label>
                    <input id="nachname_spieler" name="nachname_spieler" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="geburtsdatum">Geburtsdatum *</label>
                    <input id="geburtsdatum" name="geburtsdatum" type="date" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="nationalitaet">Nationalität *</label>
                    <input id="nationalitaet" name="nationalitaet" type="text" required className={inputClass} placeholder="z.B. Schweiz" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="email_spieler">E-Mail Spieler/in</label>
                    <input id="email_spieler" name="email_spieler" type="email" className={inputClass} placeholder="optional" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="ahv_nummer">AHV-Nummer *</label>
                    <input id="ahv_nummer" name="ahv_nummer" type="text" required className={inputClass} placeholder="756.XXXX.XXXX.XX (auf Krankenkassenkarte)" />
                  </div>
                </div>
              </div>

              {/* Angaben Eltern */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-lg font-black text-fc-dunkel">Angaben Eltern/Erziehungsberechtigte</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="name_eltern">Vor- und Nachname *</label>
                    <input id="name_eltern" name="name_eltern" type="text" required className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="strasse">Strasse *</label>
                    <input id="strasse" name="strasse" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="plz">PLZ *</label>
                    <input id="plz" name="plz" type="text" required className={inputClass} placeholder="6210" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="ort">Ort *</label>
                    <input id="ort" name="ort" type="text" required className={inputClass} placeholder="Sursee" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="telefon">Telefon</label>
                    <input id="telefon" name="telefon" type="tel" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="mobil_eltern">Mobil *</label>
                    <input id="mobil_eltern" name="mobil_eltern" type="tel" required className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="email_eltern">E-Mail *</label>
                    <input id="email_eltern" name="email_eltern" type="email" required className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Trainer */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-lg font-black text-fc-dunkel">Trainer</h2>
                </div>
                <p className={labelClass}>Wurde der Trainer/die Trainerin des FC Sursee informiert? *</p>
                <input type="hidden" name="trainer_informiert" value={trainerInformiert} />
                <div className="flex gap-4 mt-2 mb-4">
                  {['Ja', 'Nein'].map(opt => (
                    <button
                      key={opt} type="button"
                      onClick={() => setTrainerInformiert(opt)}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                        trainerInformiert === opt
                          ? 'border-fc-rot bg-fc-rot text-white'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {trainerInformiert === 'Ja' && (
                  <div>
                    <label className={labelClass} htmlFor="trainer_name">Name des Trainers/der Trainerin</label>
                    <input id="trainer_name" name="trainer_name" type="text" className={inputClass} />
                  </div>
                )}
              </div>

              {/* Dokumente — per E-Mail */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" fill="#f59e0b"/>
                    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="font-bold text-amber-900 text-sm mb-1">Dokumente per E-Mail einsenden</p>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Bitte sende folgende Dokumente nach dem Absenden des Formulars per E-Mail an{' '}
                      <a href="mailto:info@fcsursee.ch" className="font-semibold underline">info@fcsursee.ch</a>:
                    </p>
                    <ul className="mt-2 space-y-1 text-amber-800 text-sm">
                      <li className="flex gap-2"><span className="text-amber-600">›</span> Passfoto (jpg/png)</li>
                      <li className="flex gap-2"><span className="text-amber-600">›</span> Kopie ID/Pass/Ausländerausweis (Vorderseite)</li>
                      <li className="flex gap-2"><span className="text-amber-600">›</span> Kopie ID/Ausländerausweis (Rückseite)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bestätigung */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-6 bg-fc-rot rounded-full block" />
                  <h2 className="text-lg font-black text-fc-dunkel">Bestätigung</h2>
                </div>
                <label className="flex gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="bestaetigung"
                    checked={bestaetigt}
                    onChange={e => setBestaetigt(e.target.checked)}
                    className="mt-1 shrink-0 accent-[#E31E26]"
                  />
                  <span className="text-sm text-fc-text leading-relaxed">
                    Ich bestätige, dass ich die{' '}
                    <a href="/verein" className="text-fc-rot hover:underline">Statuten, Philosophie, Leitbild</a>
                    {' '}und das Helferkonzept des FC Sursee gelesen und verstanden habe und diese akzeptiere. *
                  </span>
                </label>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                  Fehler beim Senden. Bitte versuche es erneut oder schreibe direkt an info@fcsursee.ch.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || !bestaetigt || !trainerInformiert}
                className="w-full bg-fc-rot text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
              >
                {status === 'sending' ? 'Wird gesendet…' : 'Anmeldung absenden'}
              </button>
              <p className="text-fc-text text-xs text-center pb-4">
                * Pflichtfelder — Wir kontaktieren dich nach Eingang der Anmeldung.
              </p>

            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
