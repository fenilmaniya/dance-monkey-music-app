import { appBaseUrlsRef, appSecretsRef } from '../../dao/dao.helper';
import {
  SET_APP_SECRET
} from '../../application/app.actionTypes';

export const fetchConstants = () => {
  return dispatch => {
    const base_url = appBaseUrlsRef()
      .get()
      .then(snap => {
        if (snap.exists) {
          return snap.data();
        }
        return null;
      });

    const secret = appSecretsRef()
      .get()
      .then(snap => {
        if (snap.exists) {
          return snap.data();
        }

        return null;
      });

    return Promise.all([base_url, secret])
      .then(res => {
        dispatch({
          type: SET_APP_SECRET,
          payload: {
            old_base_url: res[0].old_base,
            api_secret: res[1].api_secret
          }
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}