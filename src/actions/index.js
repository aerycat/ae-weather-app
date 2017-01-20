export const WEATHER_FETCH = 'WEATHER_FETCH'
export const WEATHER_REFETCH = 'WEATHER_REFETCH'
export const WEATHER_FETCH_SUCCEED = 'WEATHER_FETCH_SUCCEED'
export const WEATHER_FETCH_FAILED = 'WEATHER_FETCH_FAILED'
export const weatherFetch = (keyword) => ({
  type: WEATHER_FETCH,
  keyword
})
export const weatherRefetch = () => ({
  type: WEATHER_REFETCH
})
export const weatherFetchSucceed = (weatherData) => ({
  type: WEATHER_FETCH_SUCCEED,
  weatherData
})
export const weatherFetchFailed = (errorMsg) => ({
  type: WEATHER_FETCH_FAILED,
  errorMsg
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


