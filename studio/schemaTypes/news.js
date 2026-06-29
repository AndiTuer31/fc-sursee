export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titel' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'datum',
      title: 'Datum',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'gepinnt',
      title: 'Oben anpinnen (Featured)',
      type: 'boolean',
      initialValue: false,
      description: 'Gepinnter Artikel erscheint als grosser Featured-Beitrag ganz oben auf der News-Seite.',
    },
    {
      name: 'kategorie',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: ['Spielbericht', 'Transfer', 'Verein', 'Nachwuchs', 'Event'],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'bild',
      title: 'Titelbild',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'zusammenfassung',
      title: 'Zusammenfassung (Vorschautext)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'inhalt',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'bilder',
      title: 'Bildergalerie (optional)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Zusätzliche Bilder werden als Galerie am Ende des Artikels angezeigt (mit Lightbox).',
    },
    {
      name: 'autor',
      title: 'Autor',
      type: 'string',
    },
  ],
  orderings: [
    {
      title: 'Datum (neueste zuerst)',
      name: 'datumDesc',
      by: [{ field: 'datum', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'titel', subtitle: 'datum', media: 'bild' },
  },
}
