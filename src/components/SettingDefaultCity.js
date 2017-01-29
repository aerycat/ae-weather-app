/* 设置页面场景组件 */
import React from 'react'
import {View} from 'react-native'

import TextInputGroup from './common/TextInputGroup'

export default ({defaultValue, submitAction}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <View style={{flexDirection: 'row'}}>
    <TextInputGroup 
      textInputProps={{
        onSubmitEditing: submitAction,
        autoFocus: true,
        placeholder: 'Enter a city name',
        defaultValue
      }}
    />
    </View>
  </View>
)