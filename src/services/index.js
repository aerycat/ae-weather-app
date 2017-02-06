/* 资源与服务 */
import { 
  GEOLOCATION_FETCH_HA_TIMEOUT, 
  GEOLOCATION_FETCH_TIMEOUT, 
  GEOLOCATION_MAXIMUM_AGE 
} from '../utilities/constant.js'
const prefix = 'https://query.yahooapis.com/v1/public/yql?q='
const suffix = '&format=json'

// 搜索关键字解析
const keywordParse = (keyword) => {
  let kwa = keyword.split(',')
  if (kwa.length !== 2) return keyword
  let lat = Number(kwa[0])
  let long = Number(kwa[1])
  if (isNaN(lat) || isNaN(long)) return keyword
  return `(${lat},${long})`
}
// 天气api整合
const weatherApi = (keyword, unit) => {
  if (!keyword) return
  let result = ''
  keyword = keywordParse(keyword)
  unit = unit || 'c'
  let yql = `select location, item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${keyword}") and u="${unit}"`
  try {
    result = encodeURI(yql)
  } catch (error) {
  }
  return result ? prefix + result + suffix : ''
}
// api服务（远程资源）
export const api = {
  getWeather(keyword, unit) {
    return fetch(weatherApi(keyword, unit), {method: 'GET'})
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) throw Error(response.statusText)
        const {query: {results}} = json
        if (!results) {
          throw Error('no data')
        }
        return Object.assign({}, results)
      }).catch((error) => {
        throw Error(error)
      })
  }
}
// 获取地理信息
const geoFetch = function (enableHighAccuracy = false) {
  let options =  enableHighAccuracy ? {
    timeout: GEOLOCATION_FETCH_HA_TIMEOUT, 
    maximumAge: GEOLOCATION_MAXIMUM_AGE, 
    enableHighAccuracy: true
  } : {
    timeout: GEOLOCATION_FETCH_TIMEOUT, 
    maximumAge: GEOLOCATION_MAXIMUM_AGE, 
    enableHighAccuracy: false
  }
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}
// 地理信息服务
export const geo = {
  getGeolocation(enableHighAccuracy) {
    return geoFetch(enableHighAccuracy)
      .then((position) => {
        let {coords:{latitude: lat, longitude: long}} = position
        if (!lat || !long) throw Error('no data')
        return {lat, long}
      })
      .catch((error) => {
        throw Error(error)
      })
  }
}