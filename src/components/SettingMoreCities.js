/* 设置页面场景组件 */
import React from 'react'
import {View, } from 'react-native'

import ItemsEditGroup from './common/ItemsEditGroup'
// 引入常量或工具
import {flatColor} from '../utilities/styleTools'


export default ({moreCities, settingUpdate, systemMsgPush}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <ItemsEditGroup 
      itemsList={moreCities} 
      settingUpdate={settingUpdate}
      systemMsgPush={systemMsgPush}
      tipText='You can add up to 4 cities'
      addButtonTitle='ADD CITY'
    />
  </View>
)