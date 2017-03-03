/* 设置页面场景组件 */
import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import Separator from '../components/common/Separator'
import SwitchOption from '../components/common/SwitchOption'
import TextOption from '../components/common/TextOption'
import * as actions from '../actions'
import {temperatureUnitOptions} from '../utilities/weatherTools'
import {version as appVersion} from '../../package.json'

// 设置一级列表
const SettingMainList = ({navigator, settingState, settingUpdate}) => (
  <View style={{ flex: 1, flexDirection: 'column' }}>
    <Separator label='Default City' />
    <SwitchOption {...{
        label: 'Use Geolocation',
        defaultValue: settingState.USE_GEOLOCATION,
        dispatchAction (value) {
          settingUpdate({USE_GEOLOCATION: value})
        }
      }}
    />
    {
      /* 自定义城市拦控件切换 */
      settingState.USE_GEOLOCATION ? null :
        <TextOption
          label='Custom City'
          defaultValue={settingState.HOMEPAGE_CITY}
          dispatchAction={() => { navigator.push({ key: 'Setting:DefaultCity', title: 'Custom City' }) }}
        />
    }
    <Separator />
    <TextOption
      label='More Cities'
      defaultValue={settingState.MORE_CITIES && settingState.MORE_CITIES.length}
      dispatchAction={() => { navigator.push({ key: 'Setting:MoreCities', title: 'More Cities' }) }}
    />
    <Separator />
    <TextOption
      label='Temperature Unit'
      defaultValue={temperatureUnitOptions.find((option) => option.value === settingState.TEMPERATURE_UNIT).title}
      dispatchAction={() => { navigator.push({ key: 'Setting:TemperatureUnit', title: 'Temperature Unit' }) }}
    />
    <Separator />
    <TextOption label='Version' defaultValue={appVersion} />
  </View>
)

// 链接到store
SettingMainList = connect(
  (state) => ({settingState: state.setting}),
  {
    settingUpdate: actions.settingUpdate
  }
)(SettingMainList)

export default SettingMainList

/**/