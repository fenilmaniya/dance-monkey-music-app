export default (track) => {

  if (track.track_id) {
    return track.track_id;
  }

  if (track.iid) {
    return track.iid;
  }

  if (track.entity_id) {
    return track.entity_id;
  }

  return null;
}