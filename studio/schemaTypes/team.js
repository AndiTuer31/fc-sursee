export default {
  name: 'team',
  title: 'Aktive Teams',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Teamname',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'reihenfolge',
      title: 'Reihenfolge (1 = zuerst)',
      type: 'number',
    },
    {
      name: 'liga',
      title: 'Liga',
      type: 'string',
    },
    {
      name: 'teamfoto',
      title: 'Teamfoto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'matchcenter_id',
      title: 'Matchcenter Team-ID (al-la.ch)',
      type: 'string',
    },
    {
      name: 'spieler',
      title: 'Trainer, Staff & Spieler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'rolle',
              title: 'Rolle',
              type: 'string',
              options: {
                list: [
                  { title: 'Trainer & Staff', value: 'Trainer & Staff' },
                  { title: 'Spieler', value: 'Spieler' },
                ],
                layout: 'radio',
              },
              initialValue: 'Spieler',
              validation: Rule => Rule.required(),
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'nummer',
              title: 'Trikotnummer',
              type: 'number',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Torhüter', value: 'Torhüter' },
                  { title: 'Verteidiger', value: 'Verteidiger' },
                  { title: 'Mittelfeldspieler', value: 'Mittelfeldspieler' },
                  { title: 'Angreifer', value: 'Angreifer' },
                ],
              },
            },
            {
              name: 'funktion',
              title: 'Funktion (nur Trainer/Staff, z.B. "Cheftrainer")',
              type: 'string',
            },
            {
              name: 'foto',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              name: 'name',
              rolle: 'rolle',
              position: 'position',
              funktion: 'funktion',
              nummer: 'nummer',
              media: 'foto',
            },
            prepare({ name, rolle, position, funktion, nummer, media }) {
              const sub = rolle === 'Trainer & Staff'
                ? (funktion || rolle)
                : `#${nummer || '?'} · ${position || 'Spieler'}`
              return { title: name || 'Unbekannt', subtitle: sub, media }
            },
          },
        },
      ],
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
    select: { title: 'name', subtitle: 'liga', media: 'teamfoto' },
  },
}
