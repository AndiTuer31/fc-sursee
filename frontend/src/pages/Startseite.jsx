import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TickerBand from '../components/TickerBand'
import NaechstesSpiel from '../components/NaechstesSpiel'
import NewsGrid from '../components/NewsGrid'
import Tabelle from '../components/Tabelle'
import SponsorenGrid from '../components/SponsorenGrid'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

function Trenner() {
  return (
    <div className="bg-fc-grau py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gray-300" />
      </div>
    </div>
  )
}

export default function Startseite() {
  usePageTitle('FC Sursee - Fussballverein Sursee', 'Offizieller Webauftritt des FC Sursee. News, Spielplan, Aktive, Nachwuchs und mehr.')

  return (
    <>
      <Navbar />
      <Hero />
      <TickerBand />
      <NaechstesSpiel />
      <NewsGrid />
      <Trenner />
      <Tabelle />
      <SponsorenGrid />
      <Footer />
    </>
  )
}
