/* 设置页面场景组件 */
import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import ItemsEditGroup from '../components/common/ItemsEditGroup'
import {MORECITY_MAX} from '../utilities/constant'
// 引入常量或工具
import * as actions from '../actions'
import {flatColor} from '../utilities/styleTools'

// 设置更多城市
const SettingMoreCities = ({settingUpdate, settingState, systemMsgPush}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <ItemsEditGroup {...{
        itemsList: settingState.MORE_CITIES,
        settingUpdate,
        systemMsgPush,
        itemsLimit: MORECITY_MAX,
        tipText: 'You can add up to ' + MORECITY_MAX + ' cities',
        addButtonTitle:'ADD CITY'
      }}
    />
  </View>
)

SettingMoreCities = connect(
  (state) => ({settingState: state.setting}),
  {
    settingUpdate: actions.settingUpdate,
    systemMsgPush: actions.systemMsgPush
  }
)(SettingMoreCities)

export default SettingMoreCities