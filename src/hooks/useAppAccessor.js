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

  return {
    getApp: () => getApp,
    getHome: () => getHome,
    getCurrentTrack: () => getCurrentTrack,
    getCurrentPlaylist: () => getCurrentPlaylist,
    getCurrentPlaylistDetails: () => getCurrentPlaylistDetails,
  }
}

export default useAppAccessor;