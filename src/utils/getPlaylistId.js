export default (playlist) => {

  if (playlist.playlist_id) {
    return playlist.playlist_id;
  }

  if (playlist.iid) {
    return playlist.iid;
  }

  if (playlist.entity_id) {
    return playlist.entity_id;
  }

  return null;
}