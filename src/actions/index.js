export const WEATHER_FETCH = 'WEATHER_FETCH'
export const WEATHER_FETCH_SUCCEED = 'WEATHER_FETCH_SUCCEED'
export const WEATHER_FETCH_FAILED = 'WEATHER_FETCH_FAILED'

export const weatherUpdate = (data) => ({
  type: WEATHER_FETCH_SUCCEED,
  data
})

export const weatherFetch = (city) => ({
  type: WEATHER_FETCH,
  city
})
