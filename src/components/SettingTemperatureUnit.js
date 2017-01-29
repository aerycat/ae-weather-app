/* 设置页面场景组件 */
import React from 'react'
import {View} from 'react-native'

import SelectorGroup from './common/SelectorGroup'

import {temperatureUnitOptions} from '../utilities/weatherTools'

export default ({defaultValue, selectAction}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <SelectorGroup 
      options={temperatureUnitOptions}
      defaultValue={defaultValue}
      pressAction={selectAction}
    />
  </View>
)