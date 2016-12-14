/* 选择器组件 */
import React from 'react'
import {View, TouchableHighlight, Text} from 'react-native'
// 引入通用控件组件
import Icon from 'react-native-vector-icons/Entypo'
// 引入常量或工具
import {flatColor} from '../../utilities/styleTools'
// 创建组件
export default ({options, defaultValue, pressAction}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
        { /* 循环列表 */
          options.map((option, index) => (
          <TouchableHighlight 
            key={index}
            style={{borderBottomColor: flatColor.CLOUDS, borderBottomWidth: 1}}
            underlayColor={flatColor.TURQUOISE}
            onPress={() => {
              pressAction(option.value)
            }} 
          >
            <View style={{flexDirection: 'row', height: 48, backgroundColor: flatColor.WHILE}}>
              <Text style={{flex: 1, fontSize: 16, paddingLeft: 16, color: flatColor.WET_ASPHALT, alignSelf: 'center'}}> {option.title} </Text>
              {option.value === defaultValue ? <Icon name='check' style={{fontSize: 20, alignSelf: 'center', paddingRight: 16}} color={flatColor.TURQUOISE} /> : undefined}
            </View>
          </TouchableHighlight>
        ))}
    </View>
  )
}


