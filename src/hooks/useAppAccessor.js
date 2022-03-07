import { useSelector } from 'react-redux';

const useAppAccessor = () => {

  const getApp = useSelector(state => {
    return state.app;
  });

  const getHome = useSelector(state => {
    return state.home;
  });

  return {
    getApp: () => getApp,
    getHome: () => getHome,
  }
}

export default useAppAccessor;