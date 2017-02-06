/* reducers */
import {combineReducers} from 'redux'
import {NavigationExperimental} from 'react-native'
import {WEATHER_DEFAULT_ID, MORECITY_MAX} from '../utilities/constant.js'
import uuidV4 from 'uuid/v4'
import * as actions from '../actions'
import _LO from 'lodash'
// 引用NavigationExperimental中的方法
const {StateUtils: NavigationStateUtils} = NavigationExperimental
// 初始化状态
const _weather = {
  wid: '',
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
}
const _state = {
  weathers: [{..._weather, wid: WEATHER_DEFAULT_ID}],
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
    HOMEPAGE_CITY: 'Shenzhen',
    MORE_CITIES: [],
    TEMPERATURE_UNIT: 'c',
    USE_GEOLOCATION: false
  },
  systemMsg: []
}
// 天气reducer
const weather = (state, action) => {
  switch (action.type) {
    case actions.WEATHER_ADD:
      return {...state, wid: uuidV4().slice(0,18), keyword: action.keyword}
    case actions.WEATHER_FETCH:
      return {...state, status: 'ready', errorMsg: ''}
    case actions.WEATHER_KEYWORD_UPDATE:
      return {...state, keyword: action.keyword}
    case actions.WEATHER_FETCH_ALL:
      return {...state, status: 'ready', errorMsg: ''}
    case actions.WEATHER_FETCH_START:
      return {...state, status: 'loading', errorMsg: ''}
    case actions.WEATHER_FETCH_SUCCEED:
      return {...state, ...action.weatherData, status: 'succeed', keyword: state.keyword, errorMsg: ''}
    case actions.WEATHER_FETCH_FAILED:
      return {...state, status: 'failed', keyword: state.keyword, errorMsg: action.errorMsg}
    default:
      return state
  }
}
const weathers = (state = _state.weathers, action) => {
  switch (action.type) {
    case actions.WEATHER_ADD:
      return state.length > MORECITY_MAX + 1 ? state : [...state, weather(_weather, action)]
    case actions.WEATHER_REOMVE_MORE:
      return _LO.filter(state, ['wid', WEATHER_DEFAULT_ID])
    case actions.WEATHER_KEYWORD_UPDATE:
      return _LO.map(state, (item) => item.wid === action.wid ? weather(item, action) : item)
    case actions.WEATHER_FETCH:
      return _LO.map(state, (item) => item.wid === action.wid ? weather(item, action) : item)
    case actions.WEATHER_FETCH_ALL:
      return _LO.map(state, (item) => weather(item, action))
    case actions.WEATHER_FETCH_START:
      return _LO.map(state, (item) => item.wid === action.wid ? weather(item, action) : item)
    case actions.WEATHER_FETCH_SUCCEED:
      return _LO.map(state, (item) => item.wid === action.wid ? weather(item, action) : item)
    case actions.WEATHER_FETCH_FAILED:
      return _LO.map(state, (item) => item.wid === action.wid ? weather(item, action) : item)
    default:
      return state
  }
}
// 地理信息reducer
const geolocation = (state = _state.geolocation, action) => {
  switch (action.type) {
    case actions.GEOLOCATION_FETCH:
      return {...state, status: 'loading', errorMsg: ''}
    case actions.GEOLOCATION_FETCH_SUCCEED:
      return {status: 'succeed', lat: action.lat.toString(), long: action.long.toString(), errorMsg: ''}
    case actions.GEOLOCATION_FETCH_FAILED:
      return {..._state.geolocation, status: 'failed', errorMsg: action.errorMsg}
    default:
      return state
  }
}
// 导航reducer
const navigation = (state = _state.navigation, action) => {
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
const setting = (state = _state.setting, action) => {
  switch (action.type) {
    case actions.SETTING_UPDATE:
      return  {...state, ...action.setting}
    default:
      return state
  }
}
// 系统消息
const systemMsg = (state = _state.systemMsg, action) => {
  switch (action.type) {
    case actions.SYSTEM_MSG_PUSH:
      return  _LO.uniqBy([action.sysmsg, ...state], 'mid')
    case actions.SYSTEM_MSG_PULL:
      return  state.filter((sysmsg) => sysmsg.mid !== action.sysmsgID)
    case actions.SYSTEM_MSG_PULL_ALL:
      return  []
    default:
      return state
  }
}

const reducers =  combineReducers({ weathers, geolocation, navigation, setting, systemMsg })

export default function root(state, action) {
  return reducers(state, action)
}