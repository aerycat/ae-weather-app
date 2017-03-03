/* 天气信息显示组件 */
import React from 'react'
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import WeatherAnimatedImage from './WeatherAnimatedImage'
// 引入常量或工具
import {temperatureUnitOptions} from '../utilities/weatherTools'
import * as actions from '../actions'
import {flatColor} from '../utilities/styleTools'

// 引入加载状态图片
const loadImageGif = require('../assets/img/loading.gif')

// 定义组件样式
const styles = StyleSheet.create({
  componentWrap: {
    flex: 1,
    backgroundColor: flatColor.WHILE,
    paddingTop: 20
  },
  loadImageView: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  loadImage: {
    width: 64,
    height: 64,
    alignSelf: 'center'
  },
  weatherIconImage: {
    width: 220,
    height: 220,
    alignSelf: 'center'
  },
  tips: {
    fontSize: 16,
    color: flatColor.ASBESTOS,
    alignSelf: 'center',
    paddingTop: 20
  },
  keyword: {
    fontSize: 20,
    color: flatColor.CONCRETE,
    paddingTop: 10,
    alignSelf: 'center'
  },
  weatherDescribe: {
    fontSize: 32,
    alignSelf: 'center',
    paddingTop: 10,
    color: flatColor.ASBESTOS
  },
  weatherType: {
    fontSize: 32,
    color: flatColor.WET_ASPHALT
  },
  weatherTemperature: {
    fontSize: 32,
    color: flatColor.GREEN_SEA
  }
});

// 创建组件
const WeatherView = ({weatherState, temperatureUnitValue, weatherFetch}) => {
  // 解构天气状态数据
  const {
    wid: iwid,
    status: istatus,
    keyword: ikeyword,
    channel: {
      location: {city: icity},
      item: {
        condition: {date: idate, temp: itemp, text: itext, code: icode}
      }
    }
  } = weatherState
  // 天气单位
  const temperatureUnit = temperatureUnitOptions.find((option) => option.value === temperatureUnitValue)
  const temperatureUnitTitle = temperatureUnit ? temperatureUnit.title : ''
  // 定义内部视图组件
  let normalImageView, loadImageView, elmTipsView, elmKeywordView, elmWeatherDescribeView;
  // 天气图片视图
  let weatherCode = ''
  switch (istatus) {
    case 'succeed':
      weatherCode = icode
      break;
    case 'failed':
      weatherCode = '10000'
      break;
    default:
      weatherCode = '3200'
      break;
  }
  // imgage视图状态处理
  normalImageView = istatus === 'loading' ? 
  (
    <View style={styles.loadImageView}>
      <Image 
        style={styles.loadImage} 
        source={loadImageGif}
      />
    </View>
  ) : (
    <TouchableOpacity 
      style={styles.weatherIconImage}
      onPress={() => {weatherFetch(iwid)}}>
      <WeatherAnimatedImage 
        style={{
          width: 220,
          height: 220,
          alignSelf: 'center'
        }} 
        wid={iwid}
        status={istatus}
        weatherCode={weatherCode} 
      />
    </TouchableOpacity>
  )
  // 提示信息视图
  let elmTipsText = ''
  switch (istatus) {
    case 'loading':
      elmTipsText = 'loading...'
      break;
    case 'failed':
      elmTipsText = 'City\'s weather information was not found'
      break;
    case 'succeed':
      elmTipsText = ''
      break;
    default:
      elmTipsText = 'Please enter a city name above'
      break;
  }
  // 提示视图
  elmTipsView = <Text style={styles.tips}>{elmTipsText}</Text>
  // 城市信息视图
  elmKeywordView = icity !== '' ? 
  <Text style={styles.keyword}>{icity}</Text>
  : null
  // 天气描述视图
  elmWeatherDescribeView = istatus === 'succeed' ?
  <Text style={styles.weatherDescribe}>
    <Text style={styles.weatherType}>{itext}</Text>
    {' / '}
    <Text style={styles.weatherTemperature}>{itemp}</Text>
    {temperatureUnitTitle}
  </Text>
  : null
  // 渲染视图
  return (
    <View style={styles.componentWrap}>
      {normalImageView}
      {elmKeywordView}
      {elmWeatherDescribeView}
      {elmTipsView}
    </View> 
  )
}
export default WeatherView
