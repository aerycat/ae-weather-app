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

export const GEOLOCATION_FETCH = 'GEOLOCATION_FETCH'
export const GEOLOCATION_FETCH_SUCCEED = 'GEOLOCATION_FETCH_SUCCEED'
export const GEOLOCATION_FETCH_FAILED = 'GEOLOCATION_FETCH_FAILED'

export const geolocationFetchSucceed = (data) => ({
  type: GEOLOCATION_FETCH_SUCCEED,
  data
})

export const geolocationFetchFailed = (error) => ({
  type: GEOLOCATION_FETCH_FAILED,
  error
})

export const geolocationFetch = () => ({
  type: GEOLOCATION_FETCH
})

