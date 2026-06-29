export default {
  name: 'clubhaus',
  title: 'Clubhaus',
  type: 'document',
  fields: [
    {
      name: 'bilder',
      title: 'Bilder vom Clubhaus',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Fotos vom Clubhaus, Innen- und Aussenbereich',
    },
    {
      name: 'betreiber',
      title: 'Betreiber / Verantwortliche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'funktion', title: 'Funktion', type: 'string' },
            { name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } },
          ],
          preview: { select: { title: 'name', subtitle: 'funktion', media: 'foto' } },
        },
      ],
    },
    {
      name: 'beschreibung',
      title: 'Beschreibung / Text',
      type: 'text',
      rows: 5,
    },
    {
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten / Hinweise',
      type: 'text',
      rows: 3,
    },
    {
      name: 'kontaktName',
      title: 'Kontaktperson Name',
      type: 'string',
    },
    {
      name: 'kontaktTelefon',
      title: 'Telefon',
      type: 'string',
    },
    {
      name: 'kontaktEmail',
      title: 'E-Mail',
      type: 'string',
    },
    {
      name: 'adresse',
      title: 'Adresse',
      type: 'string',
    },
    {
      name: 'dokumente',
      title: 'Dokumente (z.B. Speisekarte)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titel', title: 'Titel', type: 'string' },
            { name: 'datei', title: 'Datei (PDF)', type: 'file' },
          ],
          preview: { select: { title: 'titel' } },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Clubhaus' }),
  },
}
