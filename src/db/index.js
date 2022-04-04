import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './model/schema'

import FPlaylist from './model/FPlaylist';

const adapter = new SQLiteAdapter({
    schema: mySchema, 
})

const database = new Database({
    adapter,
    modelClasses: [
      FPlaylist
    ],
    actionsEnabled: true
})

export default database;