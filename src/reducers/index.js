import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import * as actions from '../actions'

const _stateInit = {
  weather: {
    status: '',
    keyword: '',
    errorMsg: '',
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
  },
  geolocation: {
    status: '', 
    lat: '', 
    long: '', 
    errorMsg: ''
  }
}

const weather = (state = _stateInit.weather, action) => {
  switch (action.type) {
    case actions.WEATHER_FETCH:
      return Object.assign({}, state, {status: 'loading', keyword: action.keyword, errorMsg: ''})
    case actions.WEATHER_FETCH_SUCCEED:
      return Object.assign({}, action.weatherData, {status: 'succeed', keyword: '', errorMsg: ''})
    case actions.WEATHER_FETCH_FAILED:
      return Object.assign({}, _stateInit.weather, {status: 'failed', keyword: '', errorMsg: action.errorMsg})
    default:
      return state
  }
}

const geolocation = (state = _stateInit.geolocation, action) => {
  switch (action.type) {
    case actions.GEOLOCATION_FETCH:
      return Object.assign({}, state, {status: 'loading', errorMsg: ''})
    case actions.GEOLOCATION_FETCH_SUCCEED:
      return Object.assign({}, {status: 'succeed', lat: action.lat.toString(), long: action.long.toString(), errorMsg: ''})
    case actions.GEOLOCATION_FETCH_FAILED:
      return Object.assign({}, _stateInit.geolocation, {status: 'failed', errorMsg: action.errorMsg})
    default:
      return state
  }
}

const reducers =  combineReducers({ weather, geolocation })

export default function root(state, action) {
  return reducers(state, action)
}