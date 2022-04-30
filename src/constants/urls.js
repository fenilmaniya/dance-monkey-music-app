const smart_feeds = [
  {
    key: 'romance',
    url: 'http://apiv2-internal.gaana.com/home/smartfeed/626',
  },
  {
    key: 'top_serched_artists',
    url: 'http://apiv2-internal.gaana.com/home/smartfeed/604',
  },
  {
    key: 'just_arrived',
    url: 'http://apiv2-internal.gaana.com/home/smartfeed/603',
  },
  {
    key: 'top_playlists',
    url: 'http://apiv2-internal.gaana.com/home/smartfeed/596',
  },
  {
    key: 'retro_music_playlist',
    url: 'http://apiv2-internal.gaana.com/home/smartfeed/274',
  },
]

export default {
  search_tracks: 'index.php?type=search&subtype=search_song&content_filter=2&key=',
  search_playlist: 'index.php?type=search&subtype=search_playlist&content_filter=2&key=',
  search_album: 'index.php?type=search&subtype=search_album&content_filter=2&key=',
  search_artist: 'index.php?type=search&subtype=search_artist&content_filter=2&key=',
  getTrack: 'getURLV1.php?',
  playlist_details: 'index.php?type=playlist&subtype=playlist_detail&playlist_id=',
  album_details: 'apiv2?type=albumDetail&seokey=',
  artist_details: 'apiv2?language=&order=0&sortBy=popularity&type=artistDetailNew&seokey=',
  similar_songs: 'apiv2?type=songSimilar&id=',
  song_details: 'apiv2?type=songDetail&seokey=',
  auto_suggest: 'gaanasearch-api/mobilesuggest/autosuggest-lite-vltr-ro?geoLocation=IN&content_filter=2&include=allItems&isRegSrch=0&webVersion=mix&rType=web&usrLang=Hindi,English,Punjabi,Gujarati&query=',
  smart_feeds
}