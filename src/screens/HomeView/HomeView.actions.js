import { urls } from '../../constants';
import { apiGet, apiPost } from '../../dao';
import { encodeParamsForUrl } from '../../utils/url';
import {
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_RESPONSE,
  SEARCH_QUERY_ERROR,
  FETCH_DASHBOARD_REQUEST,
  FETCH_DASHBOARD_ERROR,
  FETCH_DASHBOARD_RESPONSE,
} from './HomeView.actionTypes';

const search_type = [
  'tracks',
  'album',
  'artist',
  'playlist'
]

export const searchWithQuery = (query) => {
  return async (dispatch, getState) => {
    if (!query) return;

    if (query.trim().length===0) return;

    dispatch({
      type: SEARCH_QUERY_REQUEST
    });

    const state = getState();
    const app = state.app;

    await apiGet({
      base: app.search_url,
      app,
      route: `${urls.auto_suggest}${query}`
    })
    .then(res => {
      if (res) {
        res.gr.map(item => {

          let type = item.ty.toLowerCase();

          if (type === 'track') {
            type += 's';
          }

          dispatch({
            type: SEARCH_QUERY_RESPONSE,
            payload : {
              [type]: item?.gd ?? [],
            }
          });
        });
      }
    })
    .catch(async err => {
      console.log(err);

      const searchArray = [];

      for (const type of search_type) {
        
        const searchItem = await apiGet({
          app,
          route: `${urls[`search_${type}`]}${query.trim()}`,
        })
        .then(res => {
          if (res) {
            console.log(type, res?.[type].length)
            dispatch({
              type: SEARCH_QUERY_RESPONSE,
              payload : {
                [type]: res?.[type] ?? [],
              }
            });
          }
        })
        .catch(err => {
          dispatch({
            type: SEARCH_QUERY_ERROR
          });
        });

        searchArray.push(searchItem);
      }

      return Promise.all(searchArray);
    });
  }
}

export const fetchDashboardData = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_DASHBOARD_REQUEST,
    });

    try {
      const state = getState();
      const app = state.app;
      const { dashboard } = state.home;
      
      const promiseArray = [];
      for (let i=(dashboard.smartFeedPage*4);i<((dashboard.smartFeedPage+1)*4);i++) {
        const smartFeedUrl = app.smart_feeds[i];
        if (!smartFeedUrl?.url) {
          dispatch({
            type: FETCH_DASHBOARD_ERROR,
          });
          return;
        };
        const params = {
          apiPath: smartFeedUrl.url,  
          index: Math.floor(Math.random() * 10),
          type: 'homeSec'
        }

        promiseArray.push(
          await apiPost({
            isOld: false,
            route: `apiv2?${encodeParamsForUrl(params)}`
          })
          .then(res => {

            if (res && res?.entities && res?.entities.length > 0) {
              return {
                ...res,
                type: res?.entities[0].entity_type,
                title: res?.entityDescription ?? res?.entities[0]?.name ?? ''
              };
            }

            return res;
          })
        );

        await Promise.all(promiseArray)
          .then(data => {
            dispatch({
              type: FETCH_DASHBOARD_RESPONSE,
              payload : {
                smart_feeds: [
                  ...dashboard.smart_feeds,
                  ...data.filter(item => (item.entities ?? []).length>0)
                ],
              }
            });
          });
      }

    } catch(err) {
      console.log(err);

      dispatch({
        type: FETCH_DASHBOARD_ERROR,
      });
    }
  }
}