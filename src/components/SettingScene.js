/* 设置页面场景组件 */
import React, {Component} from 'react'
import {View, ScrollView, TouchableHighlight, Text} from 'react-native'
import {connect} from 'react-redux'
// 引入通用控件组件
import Separator from './common/Separator'
import SwitchOption from './common/SwitchOption'
import TextOption from './common/TextOption'
import SelectorGroup from './common/SelectorGroup'
import ToastTipsCollection from './common/ToastTipsCollection'
// 设置子项
import SettingDefaultCity from './SettingDefaultCity'
import SettingTemperatureUnit from './SettingTemperatureUnit'
import SettingMoreCities from './SettingMoreCities'
// 引入常量或工具
import * as actions from '../actions'
import {flatColor} from '../utilities/styleTools'
import {temperatureUnitOptions} from '../utilities/weatherTools'
import {version as appVersion} from '../../package.json'

class SettingScene extends Component  {
  // 更新设置
  _settingUpdate (setting) {
    this.props.settingUpdate(setting)
  }
  // 导航到下一场景
  _navigationPush (route) {
    this.props.navigator && this.props.navigator.push(route)
  }
  // 导航到上一场景
  _navigationPop () {
    this.props.navigator && this.props.navigator.pop()
  }
  
  render () {
    let currentScene = null
    switch (this.props.routeQuery) {
      // 城市名称输入控件
      case 'DefaultCity':
        currentScene = (
          <SettingDefaultCity 
            defaultValue={this.props.settingState.HOMEPAGE_CITY} 
            submitAction={
              (event) => {
                this._settingUpdate({HOMEPAGE_CITY: event.nativeEvent.text})
                this._navigationPop()
              }
            }
          />
        )
        break
      // 天气单位选择控件
      case 'TemperatureUnit':
        currentScene = (
          <SettingTemperatureUnit 
            defaultValue={this.props.settingState.TEMPERATURE_UNIT}
            selectAction={
              (value) => {
                this._settingUpdate({TEMPERATURE_UNIT: value})
                this._navigationPop()
              }
            }
          />
        )
        break
      case 'MoreCities':
        currentScene = (
          <SettingMoreCities 
            moreCities={this.props.settingState.MORE_CITIES} 
            settingUpdate={this.props.settingUpdate}
            systemMsgPush={this.props.systemMsgPush}
          />
        )
        break
      // 默认选择界面
      default:
        currentScene = (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Separator label='Default City' />
            <SwitchOption 
              label='Use Geolocation' 
              defaultValue={this.props.settingState.USE_GEOLOCATION} 
              dispatchAction={(value) => {
                this._settingUpdate({USE_GEOLOCATION: value})
              }} 
            />
            {
              /* 自定义城市拦控件切换 */
              this.props.settingState.USE_GEOLOCATION ? null :
                <TextOption 
                  label='Custom City'
                  defaultValue={this.props.settingState.HOMEPAGE_CITY}
                  dispatchAction={() => {this._navigationPush({key: 'Setting:DefaultCity', title: 'Custom City'})}}
                />
            }
            <TextOption 
              label='More Cities' 
              defaultValue={this.props.settingState.MORE_CITIES && this.props.settingState.MORE_CITIES.length} 
              dispatchAction={() => {this._navigationPush({key: 'Setting:MoreCities', title: 'More Cities'})}}
            />
            <Separator />
            <TextOption 
              label='Temperature Unit'
              defaultValue={temperatureUnitOptions.find((option) => option.value === this.props.settingState.TEMPERATURE_UNIT).title}
              dispatchAction={() => {this._navigationPush({key: 'Setting:TemperatureUnit', title: 'Temperature Unit'})}}
            />
            <Separator />
            <TextOption label='Version' defaultValue={appVersion} />
            
          </View>
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
// 链接到store
SettingScene = connect(
  (state) => ({settingState: state.setting}),
  {
    settingUpdate: actions.settingUpdate,
    systemMsgPush: actions.systemMsgPush
  }
)(SettingScene)

export default SettingScene




