/* 天气信息显示组件 */
import React, {Component}  from 'react'
import {connect} from 'react-redux'
import WeatherView from '../containers/WeatherView'
import Swiper from 'react-native-swiper'
// 引入常量或工具
import * as actions from '../actions'
import {flatColor} from '../utilities/styleTools'
import {WEATHER_DEFAULT_ID} from '../utilities/constant'

class WeatherViewSwiper extends Component {
  componentDidUpdate (prevProps, prevState) {
    const weatherDefault = prevProps.weathersState && prevProps.weathersState.find((weather) => weather.wid === WEATHER_DEFAULT_ID)
    if (weatherDefault && weatherDefault.status === 'loading') {
      const {index} = this.refs.swiper.state
      if (index > 0) this.refs.swiper.scrollBy && this.refs.swiper.scrollBy(-index)
    }
  }
  render () {
    const {swiperHeight, weathersState, settingState, weatherFetch} = this.props
    const temperatureUnitValue = settingState.TEMPERATURE_UNIT
    return (
      <Swiper 
        height={swiperHeight} 
        showsButtons={true} 
        activeDotColor={flatColor.GREEN_SEA} 
        showsButtons={false}
        ref={'swiper'}
      >
        {weathersState.map((weather) => (
          <WeatherView {...{key: weather.wid, weatherState: weather, temperatureUnitValue, weatherFetch}}/>
        ))}
      </Swiper>
    )
  }
}

WeatherViewSwiper = connect(
  (state) => ({
    weathersState: state.weathers,
    settingState: state.setting
  }),
  {
    weatherFetch: actions.weatherFetch
  }
)(WeatherViewSwiper)

export default WeatherViewSwiper
