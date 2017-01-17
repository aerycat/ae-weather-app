/* 弹出提示集合 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import * as actions from '../../actions'
import ToastTips from './ToastTips'

// 创建组件
class ToastTipsCollection extends Component{
  render () {
    let {systemMsg, systemMsgPull} = this.props
    return systemMsg && systemMsg.length > 0 ? (
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 64, flex: 1, flexDirection: 'column', paddingHorizontal: 24,  zIndex: 800}}>
        {systemMsg.map((item) => {
          const sysmsg = Object.assign({}, item)
          return (
            <ToastTips {...{key: sysmsg.mid, sysmsg, systemMsgPull}} />
          )
        })}
      </View>
    ) : null
  }
}

ToastTipsCollection = connect(
  (state) => ({
    systemMsg: state.systemMsg
  }),
  {
    systemMsgPull: actions.systemMsgPull
  }
)(ToastTipsCollection)


export default ToastTipsCollection