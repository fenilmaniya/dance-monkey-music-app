import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import appSchema from './model/schema'

import FPlaylist from './model/FPlaylist';

const adapter = new SQLiteAdapter({
    schema: appSchema, 
})

const database = new Database({
    adapter,
    modelClasses: [
      FPlaylist
    ],
    actionsEnabled: true
})

export default database;