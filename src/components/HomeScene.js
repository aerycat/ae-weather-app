/* 主页场景组件 */
import React from 'react'
import {View, StatusBar} from 'react-native'
// 引入通用控件组件
import SystemTimer from '../containers/SystemTimer'
import TextInputRow from '../containers/TextInputRow'
import WeatherView from '../containers/WeatherView'
import IconButton from './common/IconButton'
import ToastTipsCollection from './common/ToastTipsCollection'
// 引入常量或工具
import {flatColor} from '../utilities/styleTools'
// 创建组件
export default ({navigator}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar style={{backgroundColor: flatColor.GREEN_SEA}} />
      <SystemTimer />
      <TextInputRow placeholder='Entry a city name' />
      <WeatherView />
      <IconButton 
        pressAction={() => {navigator.push({key: 'Setting'})}} 
        iconName='cog'
        iconStyle={{color: flatColor.CLOUDS}}
        thStyle={{position: 'absolute', top: 38, right: 10}}
      />
      <ToastTipsCollection />
    </View>
  )
}

// pressAction={() => {navigator.push({key: 'Setting'})}} 
