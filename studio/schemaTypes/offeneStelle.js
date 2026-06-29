export default {
  name: 'offeneStelle',
  title: 'Offene Stellen',
  type: 'document',
  fields: [
    {
      name: 'titel',
      title: 'Stellentitel',
      type: 'string',
      description: 'z.B. "Platzwart/in" oder "Leiter/in Marketing"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
      rows: 5,
    },
    {
      name: 'pensum',
      title: 'Pensum / Art',
      type: 'string',
      options: {
        list: ['Ehrenamt', 'Teilzeit', 'Vollzeit', 'Freelance'],
      },
    },
    {
      name: 'dokumente',
      title: 'Dokumente (z.B. Stellenbeschreibung, PDF)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titel', title: 'Bezeichnung', type: 'string' },
            { name: 'datei', title: 'Datei (PDF)', type: 'file' },
          ],
          preview: { select: { title: 'titel' } },
        },
      ],
    },
    {
      name: 'aktiv',
      title: 'Stelle ist offen',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'reihenfolgeAsc',
      by: [{ field: 'reihenfolge', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'titel', subtitle: 'pensum' },
  },
}
