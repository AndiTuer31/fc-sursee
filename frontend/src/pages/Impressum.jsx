import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-1 h-5 bg-fc-rot rounded-full block shrink-0" />
        <h2 className="text-xl font-black text-fc-dunkel">{title}</h2>
      </div>
      <div className="text-fc-text leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function Impressum() {
  usePageTitle('Impressum & Datenschutz', 'Impressum und Datenschutzerklärung des FC Sursee gemäss Swiss DSG.')

  return (
    <>
      <Navbar />

      <section className="bg-fc-dunkel text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-fc-rot font-bold text-sm uppercase tracking-widest mb-2">FC Sursee</p>
          <h1 className="text-4xl md:text-5xl font-black">Impressum & Datenschutz</h1>
        </div>
      </section>

      <main className="bg-fc-grau min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">

            {/* ── IMPRESSUM ── */}
            <h1 className="text-3xl font-black text-fc-dunkel mb-8 pb-6 border-b border-gray-100">Impressum</h1>

            <Section title="Angaben zum Verein">
              <p><strong className="text-fc-dunkel">FC Sursee</strong></p>
              <p>Vereinsnummer: 2542<br />
                 Gegründet: 1. Juni 1920<br />
                 Rechtsform: Verein gemäss Art. 60 ff. ZGB</p>
              <p>Stadion Schlottermilch<br />
                 6210 Sursee<br />
                 Schweiz</p>
            </Section>

            <Section title="Kontakt">
              <p>
                Telefon: <a href="tel:0419215653" className="text-fc-rot hover:underline">041 921 56 53</a><br />
                E-Mail: <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline">info@fcsursee.ch</a><br />
                Web: <a href="https://www.fcsursee.ch" className="text-fc-rot hover:underline">www.fcsursee.ch</a>
              </p>
            </Section>

            <Section title="Verantwortlich für den Inhalt">
              <p>Der Vorstand des FC Sursee.<br />
                 Bei Fragen oder Anliegen zum Inhalt dieser Website wenden Sie sich bitte an <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline">info@fcsursee.ch</a>.</p>
            </Section>

            <Section title="Haftungsausschluss">
              <p>Der FC Sursee übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der auf dieser Website veröffentlichten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr.</p>
              <p>Für externe Links auf Webseiten Dritter übernehmen wir keine Verantwortung. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.</p>
            </Section>

            <Section title="Urheberrecht">
              <p>Die auf dieser Website veröffentlichten Texte, Fotos und Grafiken sind urheberrechtlich geschützt. Eine Vervielfältigung oder Verwendung dieser Materialien bedarf der ausdrücklichen schriftlichen Genehmigung des FC Sursee.</p>
            </Section>

            {/* ── DATENSCHUTZ ── */}
            <div className="mt-12 pt-8 border-t-2 border-gray-100">
              <h1 className="text-3xl font-black text-fc-dunkel mb-8">Datenschutzerklärung</h1>
            </div>

            <Section title="Grundsatz">
              <p>Der FC Sursee nimmt den Schutz Ihrer persönlichen Daten ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Ihren Personendaten umgehen — in Übereinstimmung mit dem schweizerischen Datenschutzgesetz (DSG, revidierte Fassung in Kraft seit 1. September 2023) sowie der europäischen Datenschutz-Grundverordnung (DSGVO), soweit anwendbar.</p>
            </Section>

            <Section title="Verantwortliche Stelle">
              <p><strong className="text-fc-dunkel">FC Sursee</strong><br />
                 Stadion Schlottermilch, 6210 Sursee<br />
                 E-Mail: <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline">info@fcsursee.ch</a></p>
            </Section>

            <Section title="Welche Daten wir erheben">
              <p>Wir erheben Personendaten nur, wenn Sie uns diese freiwillig mitteilen, z.B. bei:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Kontaktanfragen über das Kontaktformular oder per E-Mail</li>
                <li>Mitgliedsanträgen und Juniorenanmeldungen</li>
                <li>Anmeldungen zu Events oder Veranstaltungen</li>
                <li>Bewerbungen als Sponsor oder Gönner (Club 222)</li>
              </ul>
              <p>Bei der Nutzung der Website werden automatisch technische Daten erhoben (Serverlog-Dateien, IP-Adresse, Browsertyp, Zugriffszeit). Diese Daten dienen der Sicherheit und der Fehleranalyse und werden nicht mit Personendaten verknüpft.</p>
            </Section>

            <Section title="Zweck der Datenbearbeitung">
              <p>Ihre Daten werden ausschliesslich für folgende Zwecke verwendet:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bearbeitung Ihrer Anfragen und Kommunikation mit Ihnen</li>
                <li>Vereinsverwaltung und Mitgliederverwaltung</li>
                <li>Organisation von Trainings, Spielen und Events</li>
                <li>Erfüllung gesetzlicher Pflichten</li>
              </ul>
            </Section>

            <Section title="Weitergabe von Daten">
              <p>Wir geben Ihre Personendaten nicht an Dritte weiter, ausser es ist zur Erfüllung unserer Aufgaben notwendig (z.B. Weiterleitung von Spielerdaten an den Schweizerischen Fussballverband SFV oder Amateur Liga) oder Sie haben ausdrücklich zugestimmt.</p>
            </Section>

            <Section title="Formulare & Datenweitergabe">
              <p>Kontaktformulare auf dieser Website werden über den Dienst <strong className="text-fc-dunkel">Formspree</strong> (formspree.io) verarbeitet. Die eingegebenen Daten werden an Server in den USA übertragen. Formspree ist gemäss EU-US Data Privacy Framework zertifiziert. Es gelten die <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-fc-rot hover:underline">Datenschutzbestimmungen von Formspree</a>.</p>
            </Section>

            <Section title="Cookies">
              <p>Diese Website verwendet keine Marketing-Cookies und kein Tracking durch Drittanbieter. Es können technisch notwendige Cookies eingesetzt werden, die für den Betrieb der Website erforderlich sind. Diese Cookies enthalten keine personenbezogenen Daten.</p>
            </Section>

            <Section title="Hosting">
              <p>Diese Website wird über <strong className="text-fc-dunkel">Firebase Hosting</strong> (Google LLC) gehostet. Google kann dabei technische Verbindungsdaten verarbeiten. Es gelten die <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-fc-rot hover:underline">Datenschutzbestimmungen von Google / Firebase</a>.</p>
            </Section>

            <Section title="Aufbewahrungsdauer">
              <p>Ihre Personendaten werden nur so lange aufbewahrt, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Für Mitgliederdaten gilt eine Aufbewahrungsdauer von 10 Jahren nach Austritt aus dem Verein.</p>
            </Section>

            <Section title="Ihre Rechte">
              <p>Sie haben das Recht auf:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-fc-dunkel">Auskunft</strong> — Sie können jederzeit Auskunft über Ihre gespeicherten Daten verlangen</li>
                <li><strong className="text-fc-dunkel">Berichtigung</strong> — Unrichtige Daten können Sie korrigieren lassen</li>
                <li><strong className="text-fc-dunkel">Löschung</strong> — Sie können die Löschung Ihrer Daten verlangen, soweit keine gesetzlichen Pflichten entgegenstehen</li>
                <li><strong className="text-fc-dunkel">Einschränkung</strong> — Sie können die Einschränkung der Bearbeitung verlangen</li>
                <li><strong className="text-fc-dunkel">Widerspruch</strong> — Sie können der Bearbeitung Ihrer Daten widersprechen</li>
              </ul>
              <p>Richten Sie Ihre Anfrage an: <a href="mailto:info@fcsursee.ch" className="text-fc-rot hover:underline">info@fcsursee.ch</a></p>
            </Section>

            <Section title="Änderungen dieser Erklärung">
              <p>Der FC Sursee behält sich vor, diese Datenschutzerklärung jederzeit anzupassen. Es gilt jeweils die auf der Website veröffentlichte aktuelle Version.</p>
              <p className="text-sm text-gray-400">Stand: Juni 2025</p>
            </Section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
