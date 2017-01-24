/* 设置页面场景组件 */
import React, {Component} from 'react'
import {View, ScrollView, TouchableHighlight, Text} from 'react-native'
import {connect} from 'react-redux'
// 引入通用控件组件
import Separator from './common/Separator'
import SwitchOption from './common/SwitchOption'
import TextOption from './common/TextOption'
import TextOptionWithRemove from './common/TextOptionWithRemove'
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
                  this._settingUpdate({HOMEPAGE_CITY: event.nativeEvent.text})
                  this._navigationPop()
                },
                autoFocus: false,
                placeholder: 'Enter a city name',
                defaultValue: this.props.settingState.HOMEPAGE_CITY
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
      case 'MoreCities':
        return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                style={{
                  flex: 1,
                  height: 32,
                  marginVertical: 12,
                  marginHorizontal: 12,
                  justifyContent: 'center',
                  backgroundColor: flatColor.WHILE
                }}
                underlayColor={flatColor.TURQUOISE}
              >
                <Text 
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    color: flatColor.WET_ASPHALT
                  }}
                >
                  Add City
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  let mcList = this.refs.mcList
                  
                  if (!mcList || !mcList.props.children.length) return
                  let moreCities = []
                  mcList.props.children.forEach((component) => {
                    if (component.props.label) moreCities.push(component.props.label)
                  })
                  this._settingUpdate({MORE_CITIES: moreCities})
                }}
                style={{
                  flex: 1,
                  height: 30,
                  marginVertical: 12,
                  marginHorizontal: 12,
                  justifyContent: 'center',
                  backgroundColor: flatColor.WHILE
                }}
                underlayColor={flatColor.TURQUOISE}
              >
                <Text 
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    color: flatColor.WET_ASPHALT
                  }}
                >
                  Save
                </Text>
              </TouchableHighlight>
            </View>
            <ScrollView ref='mcList'>
              {
                (this.props.settingState.MORE_CITIES.length > 0 ? this.props.settingState.MORE_CITIES : ['New York', 'Tokyo']).map((city, index) => (
                  <TextOptionWithRemove key={index} label={city} />
                ))
              }
            </ScrollView>
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
              this.props.settingState.USE_GEOLOCATION ? null :
                <TextOption 
                  label='Custom City'
                  defaultValue={this.props.settingState.HOMEPAGE_CITY}
                  dispatchAction={() => {this._navigationPush({key: 'Setting:CityName', title: 'Custom City'})}}
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




