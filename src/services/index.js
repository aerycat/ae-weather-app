const prefix = 'https://query.yahooapis.com/v1/public/yql?q='
const suffix = '&format=json'

const keywordParse = (keyword) => {
  let kwa = keyword.split(',')
  if (kwa.length !== 2) return keyword
  let lat = Number(kwa[0])
  let long = Number(kwa[1])
  if (isNaN(lat) || isNaN(long)) return keyword
  return `(${lat},${long})`
}

const apiWeather = (keyword, ...params) => {
  let paramsArr = [...params]
  if (!keyword || paramsArr.length <= 0) return
  keyword = keywordParse(keyword)
  let result = ''
  let paramsStr = paramsArr.join(',')
  let yql = `select ${paramsStr} from weather.forecast where woeid in (select woeid from geo.places(1) where text="${keyword}") and u="c"`
  try {
    result = encodeURI(yql)
  } catch (error) {
  }
  return result ? prefix + result + suffix : ''
}

export const api = {
  getWeather(keyword) {
    return fetch(apiWeather(keyword, ['location', 'item.condition']), { method: 'GET' })
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

const geoFetch = function (enableHighAccuracy = false) {
  let options =  enableHighAccuracy ? {timeout: 15000, maximumAge: 1000, enableHighAccuracy: true} : {timeout: 5000, maximumAge: 1000, enableHighAccuracy: false}
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

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