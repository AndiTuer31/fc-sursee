export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Eventname',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'datum',
      title: 'Datum',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'ort',
      title: 'Ort',
      type: 'string',
    },
    {
      name: 'titelbild',
      title: 'Titelbild',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
      rows: 4,
    },
    {
      name: 'in_navigation',
      title: 'In Navigation anzeigen?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'programm',
      title: 'Programm',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'zeit',         title: 'Zeit',         type: 'string' },
            { name: 'beschreibung', title: 'Beschreibung', type: 'string' },
          ],
          preview: {
            select: { title: 'zeit', subtitle: 'beschreibung' },
          },
        },
      ],
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url',   title: 'URL',   type: 'url' },
            {
              name: 'typ',
              title: 'Typ',
              type: 'string',
              options: { list: ['primär', 'sekundär'] },
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'typ' },
          },
        },
      ],
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
    select: { title: 'name', subtitle: 'datum', media: 'titelbild' },
  },
}
