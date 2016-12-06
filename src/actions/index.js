export const WEATHER_FETCH = 'WEATHER_FETCH'
export const WEATHER_FETCH_SUCCEED = 'WEATHER_FETCH_SUCCEED'
export const WEATHER_FETCH_FAILED = 'WEATHER_FETCH_FAILED'

export const weatherFetch = (city) => ({
  type: WEATHER_FETCH,
  city
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

export const geolocationFetchSucceed = (geoData) => ({
  type: GEOLOCATION_FETCH_SUCCEED,
  geoData
})

export const geolocationFetchFailed = (errorMsg) => ({
  type: GEOLOCATION_FETCH_FAILED,
  errorMsg
})


