/* 输入框组件 */
import React, {Component} from 'react'
import {View, TextInput} from 'react-native'
// 引入通用控件组件
import IconButton from './IconButton'
// 引入常量或工具
import {flatColor} from '../../utilities/styleTools'
// 默认组件样式
const textInputDefalutProps = {
  style: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingLeft: 12, 
    paddingRight: 12
  },
  autoFocus: false,
  placeholderTextColor: flatColor.SILVER,
  placeholder: 'Enter something',
  underlineColorAndroid: 'rgba(0,0,0,0)'
}
// 创建组件
export default class TextInputGroup extends Component  {
  render () {
  let {textInputProps, bgColor} = this.props  
  textInputProps = Object.assign({}, textInputDefalutProps, textInputProps)
  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: bgColor || flatColor.WHILE}}>
      <TextInput {...textInputProps} ref='elmTextInput' />
      <IconButton 
        pressAction={() => {this.refs.elmTextInput && this.refs.elmTextInput.clear()}} 
        iconStyle={{fontSize: 20, color: flatColor.SILVER}}
        iconName='circle-with-cross'
        thStyle={{width: 48, height: 48}}
        underlayColor={flatColor.CLOUDS}
      />
    </View>
  )
  }
}