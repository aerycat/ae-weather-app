/* 设置页面场景组件 */
import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import TextInputGroup from '../components/common/TextInputGroup'
import * as actions from '../actions'

const SettingDefaultCity = ({navigator, settingUpdate, settingState}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <View style={{flexDirection: 'row'}}>
    <TextInputGroup 
      textInputProps={{
        onSubmitEditing (event) {
          settingUpdate({HOMEPAGE_CITY: event.nativeEvent.text})
          navigator.pop()
        },
        autoFocus: true,
        placeholder: 'Enter a city name',
        defaultValue: settingState.HOMEPAGE_CITY
      }}
    />
    </View>
  </View>
)

SettingDefaultCity = connect(
  (state) => ({settingState: state.setting}),
  {
    settingUpdate: actions.settingUpdate
  }
)(SettingDefaultCity)

export default SettingDefaultCity