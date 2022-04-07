import { useSelector } from 'react-redux';

const useAppAccessor = () => {

  const getApp = useSelector(state => {
    return state.app;
  });

  const getHome = useSelector(state => {
    return state.home;
  });

  const getCurrentTrack = useSelector(state => {
    return state.SRPA.currentPlayTrack
  });

  const getCurrentPlaylist = useSelector(state => {
    return state.SRPA.currentPlaylist
  });

  const getCurrentPlaylistDetails = useSelector(state => {
    return state.playlistDetails
  });
  
  const getPlayerQueue = useSelector(state => {
    return state.player.playerQueue
  });

  const getCurrentAlbum = useSelector(state => {
    return state.SRPA.currentAlbum
  });

  const getCurrentAlbumDetails = useSelector(state => {
    return state.albumDetails
  });

  const getCurrentArtist = useSelector(state => {
    return state.SRPA.currentArtist
  });

  const getCurrentArtistDetails = useSelector(state => {
    return state.artistDetails
  });

  return {
    getApp: () => getApp,
    getHome: () => getHome,
    getCurrentTrack: () => getCurrentTrack,
    getCurrentPlaylist: () => getCurrentPlaylist,
    getCurrentPlaylistDetails: () => getCurrentPlaylistDetails,
    getPlayerQueue: () => getPlayerQueue,
    getCurrentAlbum: () => getCurrentAlbum,
    getCurrentAlbumDetails: () => getCurrentAlbumDetails,
    getCurrentArtist: () => getCurrentArtist,
    getCurrentArtistDetails: () => getCurrentArtistDetails,
  }
}

export default useAppAccessor;