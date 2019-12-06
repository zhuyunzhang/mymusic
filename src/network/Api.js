

import * as helper from './helper';

var head_url = 'http://47.111.112.100:8606';
// token
export function setToken(token) {
  helper.setToken(token);
}

// 是这 host
export function setHost() {
  helper.setHost(head_url);
}

//热门歌单信息
export function GetBannerList(params) {
  return helper.getRequest(`/banner`, params);
}

//热门歌单信息
export function GetPlaylist(params) {
  return helper.getRequest(`/top/playlist`, params);
}
//热门歌单信息
export function GetPlaylistdetail(params,callback) {
  return helper.postRequest(`/playlist/detail`, params,callback);
}

//获取音乐url
export function GetMusicUrl(params) {
  return helper.getRequest(`/song/url`, params);
}
