/* reducers */
import { combineReducers } from 'redux'
import { NavigationExperimental } from 'react-native'
import * as actions from '../actions'
// 引用NavigationExperimental中的方法
const {StateUtils: NavigationStateUtils} = NavigationExperimental
// 初始化状态
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
  },
  navigation: {
    index: 0,
    routes: [{key: 'Home'}]
  },
  setting: {
    HOMEPAGE_CITY_NAME: '',
    TEMPERATURE_UNIT: 'c',
    USE_GEOLOCATION: true
  }
}
// 天气reducer
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
// 地理信息reducer
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
// 导航reducer
const navigation = (state = _stateInit.navigation, action) => {
  switch (action.type) {
    case actions.NAVIGATION_PUSH:
      return  NavigationStateUtils.push(state, action.route)
    case actions.NAVIGATION_POP:
      return  NavigationStateUtils.pop(state)
    default:
      return state
  }
}
// 设置reducer
const setting = (state = _stateInit.setting, action) => {
  switch (action.type) {
    case actions.SETTING_UPDATE:
      return  Object.assign({}, state, action.setting)
    default:
      return state
  }
}

const reducers =  combineReducers({ weather, geolocation, navigation, setting })

export default function root(state, action) {
  return reducers(state, action)
}