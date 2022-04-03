// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'f_playlists',
      columns: [
        { name: 'playlist_id', type: 'string' },
        { name: 'title', type: 'string', isOptional: true },
        { name: 'tracks', type: 'string' },
      ]
    }),
  ]
})
