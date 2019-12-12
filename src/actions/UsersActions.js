

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
//setGetUserMusicDan
function setGetUserMusicDan(data) {
  return {
    type: types.USER.SET_USER_MUSIC_DAN,
    data,
  };
}
//setGetSongDetail
function setGetSongDetail(data) {
  return {
    type: types.USER.SET_SONG_DETAIL,
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
        await api.GetPlaylistdetail(params, callback);
      } catch (e) {
        console.log('GetPlaylistdetail is error: ' + e);
      }
    })();
  };
};
//GetCode
export const GetCode = ( params, callback) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
         await api.GetCode(params, callback);
      } catch (e) {
        console.log('GetCode is error: ' + e);
      }
    })();
  };
};
//
export const GetRegister = ( params, callback) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
         await api.GetRegister(params, callback);
      } catch (e) {
        console.log('GetRegister is error: ' + e);
      }
    })();
  };
};
//GetLogin
export const GetLogin = ( params, callback) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        await api.GetLogin(params, callback);
      } catch (e) {
        console.log('GetLogin is error: ' + e);
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
//获取用户歌单
//GetUserMusicDan
export const GetUserMusicDan = (params) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        setTimeout(() => dispatch(setGetUserMusicDan(null)), 0);
        const data = await api.GetUserMusicDan(params);
        setTimeout(() => dispatch(setGetUserMusicDan(data)), 0);
      } catch (e) {
        console.log('GetUserMusicDan is error: ' + e);
      }
    })();
  };
};
//获取歌曲详情
//GetSongDetail
export const GetSongDetail = (params) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        setTimeout(() => dispatch(setGetSongDetail(null)), 0);
        const data = await api.GetSongDetail(params);
        setTimeout(() => dispatch(setGetSongDetail(data)), 0);
      } catch (e) {
        console.log('GetUserMusicDan is error: ' + e);
      }
    })();
  };
};

