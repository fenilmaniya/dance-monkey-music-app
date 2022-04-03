// model/FPlaylist.js
import { Model } from '@nozbe/watermelondb'
import { field, json } from "@nozbe/watermelondb/decorators";

const sanitizer = json => json;

export default class FPlaylist extends Model {
  static table = 'f_playlists'

  @field('playlist_id') playlist_id
  @field('title') title
  @json('tracks', sanitizer) tracks
}
