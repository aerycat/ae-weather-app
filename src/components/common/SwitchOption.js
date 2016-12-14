/* 切换器组件 */
import React from 'react'
import {View, Text, Switch, StyleSheet} from 'react-native'
// 引入常量或工具
import {flatColor} from '../../utilities/styleTools'
// 定义组件样式
const styles = StyleSheet.create({
  wrap: {
    height: 48,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: flatColor.WHILE,
    flexDirection: 'row',
    borderBottomColor: flatColor.CLOUDS,
    borderBottomWidth: 1
  },
  label: {
    flex: 1,
    fontSize: 16,
    alignSelf: 'center',
    paddingLeft: 6,
    color: flatColor.WET_ASPHALT
  },
  switch: {
    alignSelf: 'center'
  }
})
// 创建组件
export default ({label, defaultValue, dispatchAction}) => (
  <View style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={defaultValue} style={styles.switch} onValueChange={(value) => {dispatchAction(value)}} />
  </View>
)