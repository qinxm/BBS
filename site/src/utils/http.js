import axios from 'axios'
import qs from 'qs'
const win = window
/**
* @function request
* @param  {object} config {请求参数}
* @return {object} {description}
* @see {@link https://github.com/mzabriskie/axios}
*/
const httpRequest = (config) => {
  return axios.request(config)
}

const getCommonParam = ({token} = {}) => {
  let param = {
    randomStr: 36011535079133273
  }
  return param
}

export const request = ({url, data, method = 'get', params = {}, timeout = 60000}) => {
  let commonParam = getCommonParam()
  let allParams = Object.assign({}, commonParam, params)

  let config = {
    url: url,
    method,
    data,
    params: allParams,
    timeout
  }

  return httpRequest(config).then(res => {
    return new Promise((resolve, reject) => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
  }, res => {
    return new Promise((resolve, reject) => {
      // 请求失败后的公共处理
      if (!res.response) {
        // 服务器或者客户端网络异常
        res.response = {
          data: {
            msg: '网络异常'
          }
        }
      } else if (res.response.data.error) {
        res.response.data.msg = '服务器异常'
      }
      reject(res.response.data)
    })
  })
}

/**
* @function parseUrl
* @param  {string} url {要解析的串，空则使用location.href}
* @return {object} {{uri, hash, params}}
*/
export const parseUrl = (url) => {
  url = url || win.location.href
  const decoder = (v) => {
    return win.decodeURIComponent(v)
  }
  let parts = url.split('?')
  let uri = parts[0]
  let [query, hash] = parts[1] ? parts[1].split('#') : ['', '']
  let params = qs.parse(query, {decoder})

  return {uri, hash, params}
}

/**
* @function buildQuery
* @param  {object} params     {参数对象}
* @param  {string} url = null {初始url串，null则使用location.href, ''则只返回query串}
* @return {string} {url}
*/
export const buildQuery = (params, url = null) => {
  let argUrl = url
  const encoder = (v) => {
    return win.encodeURIComponent(v)
  }
  if (url == null) {
    url = win.location.href
  } else if (argUrl === '') {
    return qs.stringify(params, {encoder})
  }

  let urlObj = parseUrl(url)
  params = Object.assign(urlObj.params, params)
  let query = qs.stringify(params, {encoder})
  let newUrl = urlObj.uri
  if (query) {
    newUrl = newUrl + '?' + query
  }
  if (urlObj.hash) {
    newUrl = newUrl + '#' + urlObj.hash
  }
  return newUrl
}
