export const WEATHER_ADD = 'WEATHER_ADD'
export const WEATHER_REOMVE_MORE = 'WEATHER_REOMVE_MORE'
export const WEATHER_KEYWORD_UPDATE = 'WEATHER_KEYWORD_UPDATE'
export const WEATHER_FETCH = 'WEATHER_FETCH'
export const WEATHER_FETCH_ALL = 'WEATHER_FETCH_ALL'
export const WEATHER_FETCH_START = 'WEATHER_FETCH_START'
export const WEATHER_FETCH_SUCCEED = 'WEATHER_FETCH_SUCCEED'
export const WEATHER_FETCH_FAILED = 'WEATHER_FETCH_FAILED'
export const weatherAdd = (keyword) => ({
  type: WEATHER_ADD,
  keyword
})
export const weatherRemoveMore = () => ({
  type: WEATHER_REOMVE_MORE
})
export const weatherFetch = (wid) => ({
  type: WEATHER_FETCH,
  wid
})
export const weatherKeywordUpdate = (wid, keyword) => ({
  type: WEATHER_KEYWORD_UPDATE,
  wid,
  keyword
})
export const weatherFetchAll = () => ({
  type: WEATHER_FETCH_ALL
})
export const weatherFetchStart = (wid) => ({
  type: WEATHER_FETCH_START,
  wid
})
export const weatherFetchSucceed = (wid, weatherData) => ({
  type: WEATHER_FETCH_SUCCEED,
  weatherData,
  wid
})
export const weatherFetchFailed = (wid, errorMsg) => ({
  type: WEATHER_FETCH_FAILED,
  errorMsg,
  wid
})

export const GEOLOCATION_FETCH = 'GEOLOCATION_FETCH'
export const GEOLOCATION_FETCH_SUCCEED = 'GEOLOCATION_FETCH_SUCCEED'
export const GEOLOCATION_FETCH_FAILED = 'GEOLOCATION_FETCH_FAILED'
export const geolocationFetch = () => ({
  type: GEOLOCATION_FETCH
})
export const geolocationFetchSucceed = ({lat, long}) => ({
  type: GEOLOCATION_FETCH_SUCCEED,
  lat,
  long
})
export const geolocationFetchFailed = (errorMsg) => ({
  type: GEOLOCATION_FETCH_FAILED,
  errorMsg
})

export const NAVIGATION_PUSH = 'NAVIGATION_PUSH'
export const NAVIGATION_POP = 'NAVIGATION_POP'
export const navigationPush = (route) => ({
  type: NAVIGATION_PUSH,
  route
})
export const navigationPop = () => ({
  type: NAVIGATION_POP
})
export const SETTING_UPDATE = 'SETTING_UPDATE'
export const settingUpdate = (setting) => ({
  type: SETTING_UPDATE,
  setting
})

export const REFRESH_HOME_SCENE = 'REFRESH_HOME_SCENE'
export const refreshHomeScene = () => ({
  type: REFRESH_HOME_SCENE
})

export const SYSTEM_MSG_PUSH = 'SYSTEM_MSG_PUSH'
export const SYSTEM_MSG_PULL = 'SYSTEM_MSG_PULL'

export const systemMsgPush = (sysmsg) => ({
  type: SYSTEM_MSG_PUSH,
  sysmsg: {mid: 'SYSTEM_MESSAGE', ...sysmsg}
}) 

export const systemMsgPull = (sysmsgID) => ({
  type: SYSTEM_MSG_PULL,
  sysmsgID
}) 


