import { takeLatest } from 'redux-saga'
import { put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { api, geo } from '../services'

export function* getWeather() {
  try {
    const keyword = yield select((state) => (state.weather.keyword))
    // console.log(keyword)
    const weather = yield call(api.getWeather, keyword)
    yield put(actions.weatherFetchSucceed(weather))
  } catch (error) {
    yield put(actions.weatherFetchFailed('weather api error'))
  }
}

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

export function* watchGetWeather() {
  yield* takeLatest(actions.WEATHER_FETCH, getWeather)
}

export function* watchGetGeolocation() {
  yield* takeLatest(actions.GEOLOCATION_FETCH, getGeolocation)
}

export default function* root() {
  yield [
    fork(watchGetWeather),
    fork(watchGetGeolocation)
  ]
}