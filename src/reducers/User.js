//
// Author: leafsoar
// Date: 2017-07-25 18:39:56
//

import * as types from '../actions/actionTypes';

const initialState = {
  single: null,
  banner:null,
  palydetail:null,
  murl:null,
  mdan:null,
  dsong:null,
};
export default function user(state = initialState, action = {}) {
  //SET_SONG_DETAIL
  switch(action.type) {
    case types.USER.SET_LOGIN_GET_TEST:
      return { ...state, single: action.data }
    case types.USER.SET_BANNER_LIST:
      return { ...state, banner: action.data }
    case types.USER.SET_PLAYLIST_DETAIL:
      return { ...state, palydetail: action.data }
    case types.USER.SET_MUSIC_URL:
      return { ...state, murl: action.data }
    case types.USER.SET_USER_MUSIC_DAN:
      return { ...state, mdan: action.data }
    case types.USER.SET_SONG_DETAIL:
      return { ...state, dsong: action.data }
    default:
      return state;
  }
}
