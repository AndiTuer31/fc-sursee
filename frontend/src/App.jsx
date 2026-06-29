import './index.css'
import { Routes, Route } from 'react-router-dom'

import Startseite        from './pages/Startseite'
import News              from './pages/News'
import NewsArtikel       from './pages/NewsArtikel'
import Aktive            from './pages/Aktive'
import Nachwuchs         from './pages/Nachwuchs'
import Verein            from './pages/Verein'
import Clubhaus          from './pages/Clubhaus'
import OffeneStellen     from './pages/OffeneStellen'
import Sponsoren         from './pages/Sponsoren'
import SponsorWerden     from './pages/SponsorWerden'
import Events            from './pages/Events'
import EventDetail       from './pages/EventDetail'
import Club222           from './pages/Club222'
import JuniorenAnmeldung from './pages/JuniorenAnmeldung'
import MitgliedWerden    from './pages/MitgliedWerden'
import Plaetze           from './pages/Plaetze'
import Kontakt           from './pages/Kontakt'
import Impressum         from './pages/Impressum'
import NotFound          from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/"                    element={<Startseite />} />
      <Route path="/news"                element={<News />} />
      <Route path="/news/:slug"          element={<NewsArtikel />} />
      <Route path="/aktive"              element={<Aktive />} />
      <Route path="/nachwuchs"           element={<Nachwuchs />} />
      <Route path="/verein"              element={<Verein />} />
      <Route path="/clubhaus"            element={<Clubhaus />} />
      <Route path="/offene-stellen"      element={<OffeneStellen />} />
      <Route path="/sponsoren"           element={<Sponsoren />} />
      <Route path="/sponsor-werden"      element={<SponsorWerden />} />
      <Route path="/events"              element={<Events />} />
      <Route path="/events/:slug"        element={<EventDetail />} />
      <Route path="/club-222"            element={<Club222 />} />
      <Route path="/junioren-anmeldung"  element={<JuniorenAnmeldung />} />
      <Route path="/mitglied-werden"     element={<MitgliedWerden />} />
      <Route path="/plaetze"             element={<Plaetze />} />
      <Route path="/kontakt"             element={<Kontakt />} />
      <Route path="/impressum"           element={<Impressum />} />
      <Route path="*"                    element={<NotFound />} />
    </Routes>
  )
}
