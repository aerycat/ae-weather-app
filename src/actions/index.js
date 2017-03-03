/**************************************************************/
/* 天气相关 action */
/**************************************************************/
export const WEATHER_ADD = 'WEATHER_ADD'
export const WEATHER_REOMVE_MORE = 'WEATHER_REOMVE_MORE'
export const WEATHER_KEYWORD_UPDATE = 'WEATHER_KEYWORD_UPDATE'
export const WEATHER_FETCH = 'WEATHER_FETCH'
export const WEATHER_FETCH_ALL = 'WEATHER_FETCH_ALL'
export const WEATHER_FETCH_START = 'WEATHER_FETCH_START'
export const WEATHER_FETCH_SUCCEED = 'WEATHER_FETCH_SUCCEED'
export const WEATHER_FETCH_FAILED = 'WEATHER_FETCH_FAILED'
// 增加一个新的天气
export const weatherAdd = (keyword) => ({
  type: WEATHER_ADD,
  keyword
})
// 删除【首页】之外的天气项
export const weatherRemoveMore = () => ({
  type: WEATHER_REOMVE_MORE
})
// 获取天气
export const weatherFetch = (wid) => ({
  type: WEATHER_FETCH,
  wid
})
// 【首页】天气关键字更新
export const weatherKeywordUpdate = (wid, keyword) => ({
  type: WEATHER_KEYWORD_UPDATE,
  wid,
  keyword
})
// 全部天气项更新
export const weatherFetchAll = () => ({
  type: WEATHER_FETCH_ALL
})
// 天气更新开始
export const weatherFetchStart = (wid) => ({
  type: WEATHER_FETCH_START,
  wid
})
// 天气更新结束
export const weatherFetchSucceed = (wid, weatherData) => ({
  type: WEATHER_FETCH_SUCCEED,
  weatherData,
  wid
})
// 天气更新失败
export const weatherFetchFailed = (wid, errorMsg) => ({
  type: WEATHER_FETCH_FAILED,
  errorMsg,
  wid
})

/**************************************************************/
/* 地理坐标 action */
/**************************************************************/
export const GEOLOCATION_FETCH = 'GEOLOCATION_FETCH'
export const GEOLOCATION_FETCH_SUCCEED = 'GEOLOCATION_FETCH_SUCCEED'
export const GEOLOCATION_FETCH_FAILED = 'GEOLOCATION_FETCH_FAILED'
// 地理位置获取
export const geolocationFetch = () => ({
  type: GEOLOCATION_FETCH
})
// 地理位置获取成功
export const geolocationFetchSucceed = ({lat, long}) => ({
  type: GEOLOCATION_FETCH_SUCCEED,
  lat,
  long
})
// 地理位置获取失败
export const geolocationFetchFailed = (errorMsg) => ({
  type: GEOLOCATION_FETCH_FAILED,
  errorMsg
})

/**************************************************************/
/* 页面导航 action */
/**************************************************************/
export const NAVIGATION_PUSH = 'NAVIGATION_PUSH'
export const NAVIGATION_POP = 'NAVIGATION_POP'
// 进入下一个页面
export const navigationPush = (route) => ({
  type: NAVIGATION_PUSH,
  route
})
// 返回上一个页面
export const navigationPop = () => ({
  type: NAVIGATION_POP
})

/**************************************************************/
/* 系统设置 action */
/**************************************************************/
export const SETTING_UPDATE = 'SETTING_UPDATE'
// 设置更新
export const settingUpdate = (setting) => ({
  type: SETTING_UPDATE,
  setting
})

/**************************************************************/
/* 返回首页 action */
/**************************************************************/
export const REFRESH_HOME_SCENE = 'REFRESH_HOME_SCENE'
// 返回首页
export const refreshHomeScene = () => ({
  type: REFRESH_HOME_SCENE
})

/**************************************************************/
/* 系统提示 action */
/**************************************************************/
export const SYSTEM_MSG_PUSH = 'SYSTEM_MSG_PUSH'
export const SYSTEM_MSG_PULL = 'SYSTEM_MSG_PULL'
export const SYSTEM_MSG_PULL_ALL = 'SYSTEM_MSG_PULL_ALL'
// 插入系统提示
export const systemMsgPush = (sysmsg) => ({
  type: SYSTEM_MSG_PUSH,
  sysmsg: {mid: 'SYSTEM_MESSAGE', ...sysmsg}
}) 
// 拉取系统提示
export const systemMsgPull = (sysmsgID) => ({
  type: SYSTEM_MSG_PULL,
  sysmsgID
})
// 全部拉取系统提示
export const systemMsgPullAll = () => ({
  type: SYSTEM_MSG_PULL_ALL
}) 


