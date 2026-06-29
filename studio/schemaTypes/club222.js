export default {
  name: 'club222',
  title: 'Club 222 Mitglieder',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'typ',
      title: 'Mitgliedschaft',
      type: 'string',
      options: { list: ['einzel', 'ehepaar'] },
    },
    {
      name: 'eintrittsjahr',
      title: 'Eintrittsjahr',
      type: 'number',
    },
    {
      name: 'aktiv',
      title: 'Aktiv?',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'typ' },
  },
}
