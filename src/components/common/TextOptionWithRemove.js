/* 文字项（带删除）组件 */
import React, {Component} from 'react'
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native'
// 引入通用控件组件
import Icon from 'react-native-vector-icons/Entypo'
// 引入常量或工具
import {flatColor} from '../../utilities/styleTools'
// 定义组件样式
const styles = StyleSheet.create({
  wrap: {
    height: 48,
    backgroundColor: flatColor.WHILE,
    flexDirection: 'row',
    borderBottomColor: flatColor.CLOUDS,
    borderBottomWidth: 1
  },
  label: {
    fontSize: 16,
    paddingLeft: 18,
    paddingRight: 6,
    color: flatColor.WET_ASPHALT
  },
  iconButton: {
    alignSelf: 'center', 
    fontSize: 20
  },
  touchRight: {
    flex: 1,
    justifyContent: 'center'
  },
  touchLeft: {
    width: 64,
    justifyContent: 'center',
    borderLeftColor: flatColor.CLOUDS,
    borderLeftWidth: 2
  }
})
// 创建组件
export default class TextOptionWithRemove extends Component {
  render () {
    return (
      <View style={styles.wrap}>
        <TouchableHighlight style={styles.touchRight} underlayColor={flatColor.TURQUOISE}>
          <Text style={styles.label}>{this.props.label}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.touchLeft} underlayColor={flatColor.WET_ASPHALT}>
          <Icon name='cross' style={styles.iconButton} color={flatColor.SILVER} />
        </TouchableHighlight>
      </View>
    )
  }
}
