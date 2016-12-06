const prefix = 'https://query.yahooapis.com/v1/public/yql?q='
const suffix = '&format=json'

const apiWeather = (city, ...params) => {
  let paramsArr = [...params]
  if (city && paramsArr.length <= 0) return
  let result = ''
  let paramsStr = paramsArr.join(',')
  let yql = `select ${paramsStr} from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u="c"`
  try {
    result = encodeURI(yql)
  } catch (error) {
  }
  return result ? prefix + result + suffix : ''
}

export const api = {
  getWeather(city) {
    return fetch(apiWeather(city, ['location', 'item.condition']), { method: 'GET' })
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