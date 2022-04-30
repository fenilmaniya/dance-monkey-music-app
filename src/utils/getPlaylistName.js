export default (playlist) => {

  if (playlist.name) {
    return playlist.name;
  }

  if (playlist.title) {
    return playlist.title;
  }

  if (playlist.ti) {
    return playlist.ti;
  }

  return null;
}