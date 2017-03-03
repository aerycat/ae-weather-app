/* 文字项组件 */
import React from 'react'
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native'
// 引入通用控件组件
import Icon from 'react-native-vector-icons/Entypo'
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
    paddingLeft: 6,
    paddingRight: 6,
    alignSelf: 'center',
    color: flatColor.WET_ASPHALT
  },
  value: {
    width: 100,
    fontSize: 16,
    paddingRight: 6,
    textAlign: 'right',
    alignSelf: 'center',
    color: flatColor.CONCRETE
  }
})
// 创建组件
export default ({label, defaultValue, dispatchAction}) => (
  <TouchableHighlight onPress={dispatchAction} underlayColor={flatColor.TURQUOISE}>
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {defaultValue}
      </Text>
        {dispatchAction ? <Icon name='chevron-right' style={{alignSelf: 'center', fontSize: 16}} color={flatColor.SILVER} /> : null}
    </View>
  </TouchableHighlight>
)