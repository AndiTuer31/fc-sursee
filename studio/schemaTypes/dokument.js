export default {
  name: 'dokument',
  title: 'Vereinsdokumente',
  type: 'document',
  fields: [
    {
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'kategorie',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: ['Statuten', 'Konzepte', 'Protokolle', 'Zertifikate', 'Formulare', 'Sonstiges'],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'datei',
      title: 'Datei (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
    },
    {
      name: 'sichtbar',
      title: 'Öffentlich sichtbar?',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Kategorie + Reihenfolge',
      name: 'kategorieReihenfolge',
      by: [
        { field: 'kategorie', direction: 'asc' },
        { field: 'reihenfolge', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'titel', subtitle: 'kategorie' },
  },
}
