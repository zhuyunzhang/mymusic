

import * as types from './actionTypes';
import * as api from '../network/Api';


//歌单列表
function setLoginGetTest(data) {
  return {
    type: types.USER.SET_LOGIN_GET_TEST,
    data,
  };
}
//setBannerList
//banner列表
function setBannerList(data) {
  return {
    type: types.USER.SET_BANNER_LIST,
    data,
  };
}
//setGetPlaylistdetail
function setGetPlaylistdetail(data) {
  return {
    type: types.USER.SET_PLAYLIST_DETAIL,
    data,
  };
}
//setGetMusicUrl
function setGetMusicUrl(data) {
  return {
    type: types.USER.SET_MUSIC_URL,
    data,
  };
}
export const GetBannerList = (params) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        setTimeout(() => dispatch(setBannerList(null)), 0);
        const data = await api.GetBannerList(params);
        setTimeout(() => dispatch(setBannerList(data)), 0);
      } catch (e) {
        console.log('GetBannerList is error: ' + e);
      }
    })();
  };
};
//GetPlaylist
//get测试接口
export const GetPlaylist = (params) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        setTimeout(() => dispatch(setLoginGetTest(null)), 0);
        const data = await api.GetPlaylist(params);
        setTimeout(() => dispatch(setLoginGetTest(data)), 0);
      } catch (e) {
        console.log('GetPlaylist is error: ' + e);
      }
    })();
  };
};
//GetPlaylistdetail
//歌单详情
// export const GetPlaylistdetail = (params,callback) => {
//   return (dispatch, getState) => {
//     return (async () => {
//       try {
//         setTimeout(() => dispatch(setGetPlaylistdetail(null)), 0);
//         const data = await api.GetPlaylistdetail(params,callback);
//         setTimeout(() => dispatch(setGetPlaylistdetail(data)), 0);
//       } catch (e) {
//         console.log('GetPlaylist is error: ' + e);
//       }
//     })();
//   };
// };

export const GetPlaylistdetail = ( params, callback) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        const data = await api.GetPlaylistdetail(params, callback);
      } catch (e) {
        console.log('GetPlaylistdetail is error: ' + e);
      }
    })();
  };
};

//GetMusicUrl
//歌曲url
export const GetMusicUrl = (params) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        setTimeout(() => dispatch(setGetMusicUrl(null)), 0);
        const data = await api.GetMusicUrl(params);
        setTimeout(() => dispatch(setGetMusicUrl(data)), 0);
      } catch (e) {
        console.log('GetPlaylist is error: ' + e);
      }
    })();
  };
};

