import { useState, useEffect } from 'react'
import { client } from './sanity'

const QUERY = `*[_type == "siteSettings"][0] {
  cta_mitglied_label, cta_mitglied_url,
  cta_sponsor_label, cta_sponsor_url,
  cta_nachwuchs_label, cta_nachwuchs_url,
  adresse, telefon, email, instagram_url, iban, vereinsnummer, gruendungsdatum,
  matchcenter_1_url, matchcenter_2_url, tabelle_1_url, tabelle_2_url,
  vereinsjahre, anzahl_junioren, liga_name, quality_club_jahre,
  "heroBilder": heroBilder[] { alt, bild }
}`

const DEFAULTS = {
  cta_mitglied_label:  'Mitglied werden',
  cta_mitglied_url:    '/club-222',
  cta_sponsor_label:   'Sponsor werden',
  cta_sponsor_url:     '/sponsor-werden',
  cta_nachwuchs_label: 'Interesse? Kontakt aufnehmen →',
  cta_nachwuchs_url:   '/kontakt',
  adresse:             'Stadion Schlottermilch\n6210 Sursee',
  telefon:             '041 921 56 53',
  email:               'info@fcsursee.ch',
  instagram_url:       'https://www.instagram.com/fcsursee',
  iban:                'CH14 0077 8010 3501 1330 8',
  vereinsnummer:       '2542',
  gruendungsdatum:     '1. Juni 1920',
  matchcenter_1_url:   'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=trr',
  matchcenter_2_url:   'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31330&a=trr',
  tabelle_1_url:       'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=tab',
  tabelle_2_url:       'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31330&a=tab',
  vereinsjahre:        '104+ Jahre',
  anzahl_junioren:     '450+',
  liga_name:           '2. Liga Interregional',
  quality_club_jahre:  '2024–2026',
  heroBilder:          [],
}

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULTS)
  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { if (data) setSettings({ ...DEFAULTS, ...data }) })
      .catch(() => {})
  }, [])
  return settings
}
