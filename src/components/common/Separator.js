/* 分割器组件 */
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
// 引入常量或工具
import {flatColor} from '../../utilities/styleTools'
// 定义组件样式
const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'column',
    borderBottomColor: flatColor.CLOUDS,
    borderBottomWidth: 1
  },
  label: {
    height: 18,
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    color: flatColor.CONCRETE
  },
  empty: {
    height: 12,
  }
})
// 创建组件
export default ({label}) => (
  <View style={styles.wrap}>
    <Text style={styles.empty}></Text>
    {label ? <Text style={styles.label}>{label}</Text> : undefined}
  </View>
)