//
// Author: zyz
// Date: 2019-11-29 17:31:05
//

let helper = {
  host: '',
};

export const setToken = (token) => {
  helper.token = token;
};

export const setHost = (url) => {
  helper.host = url;
};

const getParamsStr = (params) => {
  let paramstr = '';
  let param = params || {};
  if (param) {
    let index = 0;
    for(let i in param) {
      if (index > 0) {
        paramstr += '&';
      }
      paramstr += i + '=' + encodeURI(param[i]);
      index+=1;
    }
  }
  if (paramstr.length > 0) {
    paramstr = '?' + paramstr;
  }
  return paramstr;
};

const request = (url, context, callback) => {
  const ispost = context && context.method === 'POST';
  // safari 兼容 headers
  // eslint-disable-next-line no-undef
  let myHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  // console.log("url: ", url)
  context.headers = myHeaders;
  // 在 url 后面加 token
  return new Promise(function(resolve, reject) {
    fetch(url, context)
      .then(response => {
        var status = response.status;
        if (status >= 200 && status <= 204) {
          // 请求成功
          return response.text();
        } else if (status >= 400 && status <= 400) {
          response.text().then((text)=>{
            var msg = JSON.parse(text).msg;
            if (callback) {
              callback(false, msg);
            }
          });
        } else {
          callback(false, status);
        }
        return null;
      })
      .then(body => {
        if (body) {
          var data = JSON.parse(body);
          resolve(data);
          if (callback) {
            callback(true, data);
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

// 返回 get 请求的加参数的 url 形式
const getUrl = (path, params, url) => {
  let ret = helper.host + path;
  if(url != null && url !== "") {
    ret = url + path;
  }
  let paramstr = getParamsStr(params);
  return ret + paramstr;
};

export function getRequest(path, params, callback, url) {
  const context = {
    method: 'GET'
  };
  return request(getUrl(path, params, url), context, callback);
}

export function postRequest(path, params, callback, url) {
  const context = {
    method: 'POST'
  };
  // if (params != null) {
  //   context.body = JSON.stringify(params);
  // }
  return request(getUrl(path, params, url), context, callback);
}
