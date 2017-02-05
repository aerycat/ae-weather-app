/* 异步事件处理 */
import { takeLatest } from 'redux-saga'
import { race, put, call, fork, select, take } from 'redux-saga/effects'
import { WEATHER_DEFAULT_ID, WEATHER_FETCH_TIMEOUT } from '../utilities/constant'
import * as actions from '../actions'
import { api, geo } from '../services'

// 延迟方法
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 获取天气
export function* getWeatherSchedule() {
  const weathers = yield select((state) => (state.weathers))
  const {TEMPERATURE_UNIT: unit} = yield select((state) => state.setting)
  const total = weathers.length
  let index = 0
  while (index < total) {
    const {wid, keyword, status} = weathers[index]
    if (status === 'ready' && wid) yield getWeather(wid, keyword, unit)
    index++
  }
}
export function* getWeather(wid, keyword, unit) {
  try {
    yield put(actions.weatherFetchStart(wid))
    const {weatherData, timeout} = yield race({
      weatherData: call(api.getWeather, keyword, unit),
      timeout: call(delay, WEATHER_FETCH_TIMEOUT)
    })
    if (weatherData) {
      yield put(actions.weatherFetchSucceed(wid, weatherData))
    } else {
      yield put(actions.weatherFetchFailed(wid, 'No data'))
      yield put(actions.systemMsgPush({mid: 'WEATHER_LOG', message: timeout ? 'server timeout' : 'No data'}))
    }
  } catch (error) {
    yield put(actions.weatherFetchFailed(wid, 'Unable to get weather data'))
    yield put(actions.systemMsgPush({mid: 'WEATHER_LOG', message: 'Unable to get weather data'}))
  }
}
// 获取地理信息
export function* getGeolocation(autoWeatherFetch = false) {
  try {
    const position = yield call(geo.getGeolocation, true)
    let {lat, long} = position
    yield put(actions.geolocationFetchSucceed(position))
    yield put(actions.weatherKeywordUpdate(WEATHER_DEFAULT_ID, `${lat},${long}`))
    if (autoWeatherFetch) yield put(actions.weatherFetch(WEATHER_DEFAULT_ID))
  } catch (g1Error) {
    try {
      yield put(actions.systemMsgPush({mid: 'GEO_LOG', message: 'Switch to low-precision GEO information query'})) 
      const position = yield call(geo.getGeolocation)
      let {lat, long} = position
      yield put(actions.geolocationFetchSucceed(position))
      yield put(actions.weatherKeywordUpdate(WEATHER_DEFAULT_ID, `${lat},${long}`))
      if (autoWeatherFetch) yield put(actions.weatherFetch(WEATHER_DEFAULT_ID))
    } catch (g2Error) {
      yield put(actions.geolocationFetchFailed('Unable to get location data'))
      yield put(actions.systemMsgPush({mid: 'GEO_LOG', message: 'Unable to get location data'}))
    }
  }
}
// 刷新主页场景
export function* refreshHomeScene(dispatch) {
  const {USE_GEOLOCATION: useGeolocation, HOMEPAGE_CITY: cityName, MORE_CITIES: moreCities} = yield select((state) => (state.setting))
  const routes = yield select((state) => (state.navigation.routes))
  const lastScene = routes[routes.length - 1]
  if (lastScene && lastScene.key === 'Home') {
    yield put(actions.weatherKeywordUpdate(WEATHER_DEFAULT_ID, cityName))
    yield put(actions.weatherRemoveMore())
    let index = 0
    const total = moreCities.length
    while (index < total) {
      yield put(actions.weatherAdd(moreCities[index]))
      index++
    }
    if (useGeolocation) yield put(actions.geolocationFetch())
    yield put(actions.weatherFetchAll())
  }
}
// 监听事件
export function* watchGetWeather() {
  yield* takeLatest([actions.WEATHER_FETCH, actions.WEATHER_FETCH_ALL], getWeatherSchedule)
}
export function* watchGetGeolocation() {
  yield* takeLatest(actions.GEOLOCATION_FETCH, getGeolocation, true)
}
export function* watchHomeScene () {
  yield* takeLatest([actions.NAVIGATION_POP, actions.REFRESH_HOME_SCENE], refreshHomeScene)
}

export default function* root() {
  yield [
    fork(watchGetWeather),
    fork(watchGetGeolocation),
    fork(watchHomeScene)
  ]
}