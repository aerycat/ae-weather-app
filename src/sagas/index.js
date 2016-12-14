/* 异步事件处理 */
import { takeLatest } from 'redux-saga'
import { race, put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { api, geo } from '../services'

// 延迟方法
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 获取天气
export function* getWeather() {
  try {
    const keyword = yield select((state) => (state.weather.keyword))
    const unit = yield select((state) => (state.setting.TEMPERATURE_UNIT))
    const {weatherData, timeout} = yield race({
      weatherData: call(api.getWeather, keyword, unit),
      timeout: call(delay, 10000)
    })
    if (weatherData) {
      yield put(actions.weatherFetchSucceed(weatherData))
    } else {
      yield put(actions.weatherFetchFailed('weather api error'))
    }
  } catch (error) {
    yield put(actions.weatherFetchFailed('weather api error'))
  }
}
// 获取地理信息
export function* getGeolocation() {
  try {
    // console.log('geolocation 1 start')
    const position = yield call(geo.getGeolocation, true)
    let {lat, long} = position
    // console.log('geolocation 1 done', position)
    yield put(actions.geolocationFetchSucceed(position))
    yield put(actions.weatherFetch(`${lat},${long}`))
  } catch (g1Error) {
    // console.log('geolocation 1 failed', g1Error)
    try {
      // console.log('geolocation 2 start')
      const position = yield call(geo.getGeolocation)
      let {lat, long} = position
      // console.log('geolocation 2 done', position)
      yield put(actions.geolocationFetchSucceed(position))
      yield put(actions.weatherFetch(`${lat},${long}`))
    } catch (g2Error) {
      // console.log('geolocation 2 failed', g2Error)
      yield put(actions.geolocationFetchFailed('geo error'))
    }
  }
}
// 刷新主页场景
export function* refreshHomeScene() {
  const {USE_GEOLOCATION: useGeolocation, HOMEPAGE_CITY_NAME: cityName} = yield select((state) => (state.setting))
  const routes = yield select((state) => (state.navigation.routes))
  const lastScene = routes[routes.length - 1]
  if (lastScene && lastScene.key === 'Home') {
    if (useGeolocation) {
      yield put(actions.geolocationFetch())
    } else {
      yield put(actions.weatherFetch(cityName))
    }
  }
}

// 监听事件
export function* watchGetWeather() {
  yield* takeLatest(actions.WEATHER_FETCH, getWeather)
}
export function* watchGetGeolocation() {
  yield* takeLatest(actions.GEOLOCATION_FETCH, getGeolocation)
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