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
      })
  }
}