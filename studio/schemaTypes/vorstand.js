export default {
  name: 'vorstand',
  title: 'Personen (Vereinsführung)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'rolle',
      title: 'Rolle / Amt',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'z.B. "Präsident" oder "Verantwortlicher Schiedsrichter"',
    },
    {
      name: 'gruppe',
      title: 'Gruppe',
      type: 'string',
      options: {
        list: [
          { title: 'Vorstand',          value: 'Vorstand' },
          { title: 'Funktionäre',       value: 'Funktionäre' },
          { title: 'Sportkommission',   value: 'Sportkommission' },
          { title: 'Koordinatoren',     value: 'Koordinatoren' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'beschreibung',
      title: 'Zusatz / Zuständigkeit (optional)',
      type: 'string',
      description: 'z.B. "Junioren A/B/C, Team Sempachersee, Senioren/Veteranen"',
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'telefon',
      title: 'Telefon (optional)',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-Mail (optional)',
      type: 'string',
    },
    {
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Niedrigere Zahl = weiter oben',
    },
  ],
  orderings: [
    {
      title: 'Gruppe + Reihenfolge',
      name: 'gruppeReihenfolge',
      by: [
        { field: 'gruppe',      direction: 'asc' },
        { field: 'reihenfolge', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'rolle', media: 'foto' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media }
    },
  },
}
