/* 设置页面场景组件 */
import React, {Component} from 'react'
import {View} from 'react-native'
// 引入通用控件组件
import ToastTipsCollection from '../containers/ToastTipsCollection'
// 设置子项
import SettingMainList from '../containers/SettingMainList'
import SettingDefaultCity from '../containers/SettingDefaultCity'
import SettingTemperatureUnit from '../containers/SettingTemperatureUnit'
import SettingMoreCities from '../containers/SettingMoreCities'

export default class SettingScene extends Component  {
  render () {
    let currentScene = null
    const {navigator} = this.props
    switch (this.props.routeQuery) {
      // 城市名称输入控件
      case 'DefaultCity':
        currentScene = (
          <SettingDefaultCity {...{navigator}} />
        )
        break
      // 天气单位选择控件
      case 'TemperatureUnit':
        currentScene = (
          <SettingTemperatureUnit {...{navigator}} />
        )
        break
      // 更多城市
      case 'MoreCities':
        currentScene = (
          <SettingMoreCities />
        )
        break
      // 默认选择界面
      default:
        currentScene = (
          <SettingMainList {...{navigator}} />
        )
        break
    }
    return (
      <View style={{flex: 1}}>
        {currentScene}
        <ToastTipsCollection />
      </View>
    )
  }
}




