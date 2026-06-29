import { useSiteSettings } from '../lib/useSiteSettings'

export default function Tabelle() {
  const s = useSiteSettings()

  const TEAMS = [
    {
      label: '1. Mannschaft',
      liga: s.liga_name || '2. Liga Interregional',
      spielplan: s.matchcenter_1_url || 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=trr',
      tabelle:   s.tabelle_1_url   || 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=tab',
    },
    {
      label: '2. Mannschaft',
      liga: '3. Liga',
      spielplan: s.matchcenter_2_url || 'https://matchcenter.al-la.ch/default.aspx?oid=4&lng=1&v=380&t=31330&a=trr',
      tabelle:   s.tabelle_2_url   || 'https://matchcenter.al-la.ch/default.aspx?oid=4&lng=1&v=380&t=31330&a=tab',
    },
  ]

  return (
    <section className="bg-fc-grau py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-fc-rot rounded-full block" />
          <h2 className="text-2xl font-black text-fc-dunkel">Tabelle & Resultate</h2>
        </div>

        <div className="flex flex-col gap-5">
          {TEAMS.map(team => (
            <div
              key={team.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="FC Sursee" className="h-12 w-auto" />
                <div>
                  <p className="text-fc-dunkel font-black text-lg">{team.label}</p>
                  <p className="text-fc-text text-sm">{team.liga}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={team.spielplan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-fc-rot text-fc-rot font-semibold px-4 py-2 rounded hover:bg-fc-rot hover:text-white transition-colors text-sm text-center"
                >
                  Spielplan
                </a>
                <a
                  href={team.tabelle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-fc-rot text-white font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm text-center"
                >
                  Tabelle
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
