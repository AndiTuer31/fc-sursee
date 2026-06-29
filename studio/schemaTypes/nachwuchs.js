// Sortierreihenfolge: G (jüngste) → A (älteste)
const ALTERS_REIHENFOLGE = {
  'G-Junioren': 1,
  'F-Junioren': 2,
  'E-Junioren': 3,
  'D-Junioren': 4,
  'C-Junioren': 5,
  'B-Junioren': 6,
  'A-Junioren': 7,
}

export default {
  name: 'nachwuchs',
  title: 'Nachwuchs-Teams',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Teamname',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'alter',
      title: 'Alterskategorie',
      type: 'string',
      description:
        'Standardkategorien: G-Junioren, F-Junioren, E-Junioren, D-Junioren, C-Junioren, B-Junioren, A-Junioren. Für andere Kategorien beliebigen Text eingeben.',
      options: {
        list: [
          { title: 'G-Junioren (U7/U8)', value: 'G-Junioren' },
          { title: 'F-Junioren (U9/U10)', value: 'F-Junioren' },
          { title: 'E-Junioren (U11/U12)', value: 'E-Junioren' },
          { title: 'D-Junioren (U13/U14)', value: 'D-Junioren' },
          { title: 'C-Junioren (U15/U16)', value: 'C-Junioren' },
          { title: 'B-Junioren (U17/U18)', value: 'B-Junioren' },
          { title: 'A-Junioren (U19/U20)', value: 'A-Junioren' },
          { title: 'Andere (frei eingeben)', value: '__andere__' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'alter_custom',
      title: 'Eigene Alterskategorie (nur bei "Andere")',
      type: 'string',
      description: 'Nur ausfüllen wenn oben "Andere" gewählt wurde.',
      hidden: ({ parent }) => parent?.alter !== '__andere__',
    },
    {
      name: 'reihenfolge',
      title: 'Reihenfolge (1 = zuerst; wird für Standardkategorien automatisch gesetzt)',
      type: 'number',
    },
    {
      name: 'trainer',
      title: 'Trainer & Betreuer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'funktion',
              title: 'Funktion (z.B. "Cheftrainer", "Co-Trainer", "Betreuer")',
              type: 'string',
              initialValue: 'Trainer',
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'funktion' },
          },
        },
      ],
    },
    {
      name: 'teamfoto',
      title: 'Teamfoto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'matchcenter_url',
      title: 'Matchcenter URL (optional)',
      type: 'url',
      description: 'Link zum IFV/Matchcenter Spielplan für dieses Team',
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
    select: { title: 'name', subtitle: 'alter', media: 'teamfoto' },
  },
}
