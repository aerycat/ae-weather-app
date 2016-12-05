import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import * as actions from '../actions'

const _stateInit = {
  weather: {
    status: '',
    channel: {
      location: {
        city: '',
        country: '',
        region: ''
      },
      item: {
        condition: {
          code: '',
          date: '',
          temp: '',
          text: ''
        }
      }
    }
  }
}

const weather = (state = _stateInit.weather, action) => {
  switch (action.type) {
    case actions.WEATHER_FETCH:
      return merge({}, _stateInit.weather, {status: 'loading', channel: {location: {city: action.city}}})
    case actions.WEATHER_FETCH_SUCCEED:
      return Object.assign({}, action.data, {status: 'succeed'})
    case actions.WEATHER_FETCH_FAILED:
      return Object.assign({}, _stateInit.weather, {status: 'failed'})
    default:
      return state
  }
}

const geolocation = (state = {status: '', data: '', error: ''}, action) => {
  switch (action.type) {
    case actions.GEOLOCATION_FETCH:
      return Object.assign({}, state, {status: 'loading', error: ''})
    case actions.GEOLOCATION_FETCH_SUCCEED:
      return Object.assign({}, {status: 'succeed', data: action.data, error: ''})
    case actions.GEOLOCATION_FETCH_FAILED:
      return Object.assign({}, state, {status: 'failed', error: action.error})
    default:
      return state
  }
}

const reducers =  combineReducers({ weather, geolocation })

export default function root(state, action) {
  return reducers(state, action)
}