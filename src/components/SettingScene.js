/* 设置页面场景组件 */
import React, {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
// 引入通用控件组件
import Separator from './common/Separator'
import SwitchOption from './common/SwitchOption'
import TextOption from './common/TextOption'
import TextInputGroup from './common/TextInputGroup'
import SelectorGroup from './common/SelectorGroup'
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
    switch (this.props.routeQuery) {
      // 城市名称输入控件
      case 'CityName':
        return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
            <TextInputGroup 
              textInputProps={{
                onSubmitEditing: (event) => {
                  this._settingUpdate({HOMEPAGE_CITY_NAME: event.nativeEvent.text})
                  this._navigationPop()
                },
                autoFocus: false,
                placeholder: 'Enter a city name',
                defaultValue: this.props.settingState.HOMEPAGE_CITY_NAME
              }}
            />
            </View>
          </View>
        )
      // 天气单位选择控件
      case 'TemperatureUnit':
        return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <SelectorGroup 
              options={temperatureUnitOptions}
              defaultValue={this.props.settingState.TEMPERATURE_UNIT}
              pressAction={(value) => {
                this._settingUpdate({TEMPERATURE_UNIT: value})
                this._navigationPop()
              }}
            />
          </View>
        )
      // 默认选择界面
      default:
        return (
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
              this.props.settingState.USE_GEOLOCATION ? undefined :
                <TextOption 
                  label='Custom City'
                  defaultValue={this.props.settingState.HOMEPAGE_CITY_NAME}
                  dispatchAction={() => {this._navigationPush({key: 'Setting:CityName', title: 'Custom City'})}}
                />
            }
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
    }
  }
}
// 链接到store
SettingScene = connect(
  (state) => ({settingState: state.setting}),
  {
    settingUpdate: actions.settingUpdate
  }
)(SettingScene)

export default SettingScene




