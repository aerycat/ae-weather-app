/* 设置页面场景组件 */
import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import SelectorGroup from '../components/common/SelectorGroup'
import * as actions from '../actions'

import {temperatureUnitOptions} from '../utilities/weatherTools'

const SettingTemperatureUnit = ({navigator, settingUpdate, settingState}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <SelectorGroup 
      options={temperatureUnitOptions}
      defaultValue={settingState.TEMPERATURE_UNIT}
      pressAction={(value) => {
        settingUpdate({TEMPERATURE_UNIT: value})
        navigator.pop()
      }}
    />
  </View>
)

SettingTemperatureUnit = connect(
  (state) => ({settingState: state.setting}),
  {
    settingUpdate: actions.settingUpdate
  }
)(SettingTemperatureUnit)

export default SettingTemperatureUnit