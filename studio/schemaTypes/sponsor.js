export default {
  name: 'sponsor',
  title: 'Sponsoren',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'kategorie',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          'Hauptsponsor',
          'Co-Sponsor',
          'Ausrüster',
          'Trikotsponsoren',
          'Stadionsponsoren',
          'Reisepartner',
          'Hallenturniersponsoren',
          'Ernährungspartner',
          'Tankpartner',
          'Medienpartner',
          'Gönner',
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'reihenfolge',
      title: 'Reihenfolge innerhalb Kategorie',
      type: 'number',
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
    select: { title: 'name', subtitle: 'kategorie', media: 'logo' },
  },
}
