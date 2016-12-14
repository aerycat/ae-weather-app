/* 图标按钮组件 */
import React from 'react'
import {TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import {flatColor} from '../../utilities/styleTools'

// 创建组件
export default ({pressAction, iconName, iconStyle, thStyle, underlayColor}) => {
  // 整合样式与属性
  iconStyle = Object.assign({flex: 1, alignSelf: 'center', textAlign: 'center', fontSize: 24, color: flatColor.CLOUDS}, iconStyle)
  thStyle = Object.assign({flexDirection: 'row', height: 48, width: 48}, thStyle)
  underlayColor = underlayColor || flatColor.TURQUOISE
  iconName = iconName || 'emoji-happy'

  return (
    <TouchableHighlight style={thStyle} onPress={pressAction} underlayColor={underlayColor}>
      <Icon name={iconName} style={iconStyle} color={iconStyle.color} />
    </TouchableHighlight>
  )
}