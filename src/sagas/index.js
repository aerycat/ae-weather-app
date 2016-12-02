import { takeLatest } from 'redux-saga'
import { put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../services'

export function* getWeather() {
  try {
    const city = yield select((state) => (state.weather.channel.location.city))
    console.log(`start fetch: ${city}`)
    const weather = yield call(api.getWeather, city)
    console.log(weather)
    yield put(actions.weatherUpdate(weather))
  } catch (error) {
    yield put({ type: 'WEATHER_FETCH_FAILED', error });
  }
}

export function* watchGetWeather() {
  yield* takeLatest(actions.WEATHER_FETCH, getWeather)
}

export default function* root() {
  yield [
    fork(watchGetWeather)
  ]
}