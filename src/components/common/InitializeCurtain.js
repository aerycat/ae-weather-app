/* 初始化时的幕帘组件 */
import React from 'react'
import {View, Image} from 'react-native'
import {flatColor} from '../../utilities/styleTools'
// 引入图片
const logoImage = require('../../assets/img/unknow.png')
// 创建组件
export default () => (
  <View style={{flex: 1, flexDirection: 'row', backgroundColor: flatColor.WHILE}}>
    <View style={{flex: 1, alignSelf: 'center', flexDirection: 'column'}}>
      <Image style={{width: 128, height: 128, alignSelf: 'center'}} source={logoImage} />
    </View>
  </View>
)