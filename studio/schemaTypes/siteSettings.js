// Singleton — nur 1 Dokument, alles Konfigurierbare
export default {
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'titel',
      title: 'Interner Titel',
      type: 'string',
      initialValue: 'Website-Einstellungen',
      readOnly: true,
    },

    // ── Hero-Bilder ──
    {
      name: 'heroBilder',
      title: 'Hero-Bilder (Startseite Karussell)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'bild', title: 'Bild', type: 'image', options: { hotspot: true } },
          { name: 'alt',  title: 'Bildbeschreibung (für Barrierefreiheit)', type: 'string' },
        ],
        preview: { select: { title: 'alt', media: 'bild' } },
      }],
      description: 'Bilder für das automatische Karussell auf der Startseite. Wechselt alle 5 Sekunden. Fallback: headerbild.jpeg',
      group: 'hero',
    },

    // ── CTAs / Links ──
    { name: 'cta_mitglied_label', title: 'CTA: "Mitglied werden" — Label', type: 'string', initialValue: 'Mitglied werden', group: 'ctas' },
    { name: 'cta_mitglied_url',   title: 'CTA: "Mitglied werden" — URL',   type: 'string', initialValue: '/club-222',       group: 'ctas' },
    { name: 'cta_sponsor_label',  title: 'CTA: "Sponsor werden" — Label',  type: 'string', initialValue: 'Sponsor werden',  group: 'ctas' },
    { name: 'cta_sponsor_url',    title: 'CTA: "Sponsor werden" — URL',    type: 'string', initialValue: '/sponsor-werden', group: 'ctas' },
    { name: 'cta_nachwuchs_label',title: 'CTA: Nachwuchs Kontakt — Label', type: 'string', initialValue: 'Interesse? Kontakt aufnehmen →', group: 'ctas' },
    { name: 'cta_nachwuchs_url',  title: 'CTA: Nachwuchs Kontakt — URL',   type: 'string', initialValue: '/kontakt', group: 'ctas' },

    // ── Kontakt & Verein ──
    { name: 'adresse',       title: 'Adresse',       type: 'text',   rows: 3, initialValue: 'Stadion Schlottermilch\n6210 Sursee', group: 'kontakt' },
    { name: 'telefon',       title: 'Telefon',       type: 'string', initialValue: '041 921 56 53', group: 'kontakt' },
    { name: 'email',         title: 'E-Mail',        type: 'string', initialValue: 'info@fcsursee.ch', group: 'kontakt' },
    { name: 'instagram_url', title: 'Instagram URL', type: 'url',    initialValue: 'https://www.instagram.com/fcsursee', group: 'kontakt' },
    { name: 'iban',          title: 'IBAN',          type: 'string', group: 'kontakt' },
    { name: 'vereinsnummer', title: 'Vereinsnummer', type: 'string', initialValue: '2542', group: 'kontakt' },
    { name: 'gruendungsdatum', title: 'Gründungsdatum', type: 'string', initialValue: '1. Juni 1920', group: 'kontakt' },

    // ── Zahlen & Fakten ──
    { name: 'vereinsjahre',       title: 'Vereinsgeschichte (z.B. "104+ Jahre")', type: 'string', initialValue: '104+ Jahre', group: 'zahlen' },
    { name: 'anzahl_junioren',    title: 'Anzahl Junioren & Juniorinnen',         type: 'string', initialValue: '450+', group: 'zahlen' },
    { name: 'liga_name',          title: 'Liga-Name',                             type: 'string', initialValue: '2. Liga Interregional', group: 'zahlen' },
    { name: 'quality_club_jahre', title: 'Quality Club Zertifikat Jahre',         type: 'string', initialValue: '2024–2026', group: 'zahlen' },

    // ── Matchcenter ──
    { name: 'matchcenter_1_url', title: 'Matchcenter 1. Mannschaft URL', type: 'url', initialValue: 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=trr', group: 'matchcenter' },
    { name: 'matchcenter_2_url', title: 'Matchcenter 2. Mannschaft URL', type: 'url', initialValue: 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31330&a=trr', group: 'matchcenter' },
    { name: 'tabelle_1_url',     title: 'Tabelle 1. Mannschaft URL',     type: 'url', initialValue: 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=tab', group: 'matchcenter' },
    { name: 'tabelle_2_url',     title: 'Tabelle 2. Mannschaft URL',     type: 'url', initialValue: 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31330&a=tab', group: 'matchcenter' },
  ],
  groups: [
    { name: 'hero',        title: 'Hero-Bilder',    default: true },
    { name: 'ctas',        title: 'Links & CTAs' },
    { name: 'kontakt',     title: 'Kontakt & Verein' },
    { name: 'zahlen',      title: 'Zahlen & Fakten' },
    { name: 'matchcenter', title: 'Matchcenter URLs' },
  ],
}
