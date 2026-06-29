export default {
  name: 'naechstesSpiel',
  title: 'Spiele (Nächste Spiele)',
  type: 'document',
  fields: [
    {
      name: 'liga',
      title: 'Liga / Wettbewerb',
      type: 'string',
      description: 'z.B. "2. Liga Interregional" oder "Schweizer Cup"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'datumISO',
      title: 'Datum',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'datum',
      title: 'Datum (angezeigt)',
      type: 'string',
      description: 'z.B. "Sa, 28. Juni 2025" — wird so auf der Website angezeigt',
      validation: Rule => Rule.required(),
    },
    {
      name: 'uhrzeit',
      title: 'Uhrzeit',
      type: 'string',
      description: 'z.B. "17:00 Uhr"',
    },
    {
      name: 'heimspiel',
      title: 'Heimspiel?',
      type: 'boolean',
      initialValue: true,
      description: 'Deaktivieren wenn FC Sursee auswärts spielt',
    },
    {
      name: 'heimteam',
      title: 'Heimteam',
      type: 'string',
      initialValue: 'FC Sursee',
    },
    {
      name: 'auswaertsteam',
      title: 'Auswärtsteam / Gegner',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'gastbild',
      title: 'Logo / Bild des Gegners (optional)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'ort',
      title: 'Spielort',
      type: 'string',
      initialValue: 'Stadion Schlottermilch, Sursee',
    },
    {
      name: 'anzeigeVon',
      title: 'Anzeigen ab (Datum)',
      type: 'date',
      description: 'Spiel wird erst ab diesem Datum eingeblendet',
    },
    {
      name: 'anzeigeBis',
      title: 'Anzeigen bis (Datum)',
      type: 'date',
      description: 'Spiel verschwindet automatisch nach diesem Datum — normalerweise = Spieltag',
    },
    {
      name: 'spielplan_url',
      title: 'Link zum Spielplan',
      type: 'url',
      initialValue: 'https://matchcenter.al-la.ch/default.aspx?v=380&oid=4&lng=1&t=31329&a=trr',
    },
  ],
  orderings: [
    {
      title: 'Datum (nächste zuerst)',
      name: 'datumAsc',
      by: [{ field: 'datumISO', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'auswaertsteam',
      subtitle: 'datum',
      media: 'gastbild',
      heimspiel: 'heimspiel',
    },
    prepare({ title, subtitle, media, heimspiel }) {
      const prefix = heimspiel ? 'FC Sursee vs.' : 'bei'
      return { title: `${prefix} ${title}`, subtitle, media }
    },
  },
}
