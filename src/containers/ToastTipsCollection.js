/* 弹出提示集合 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import * as actions from '../actions'
import ToastTips from '../components/common/ToastTips'

import _LO from 'lodash'

// 创建组件
class ToastTipsCollection extends Component{
  constructor (props) {
    super(props)
    this.state = {systemMsgCache: []}
    this._removeToastTips = this._removeToastTips.bind(this)
  }
  _removeToastTips (mid) {
    let systemMsgCache = this.state.systemMsgCache.slice()
    this.setState({systemMsgCache: systemMsgCache.filter((sysmsg) => sysmsg.mid !== mid)})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.systemMsg && _LO.isArray(nextProps.systemMsg) && nextProps.systemMsg.length > 0) {
      const nextSystemMsg = nextProps.systemMsg
      const currentSystemMsg = this.state.systemMsgCache.slice()
      this.setState({systemMsgCache: _LO.uniqBy([...currentSystemMsg, ...nextSystemMsg], 'mid')})
      this.props.systemMsgPullAll()
    }
  }
  render () {
    const {systemMsgCache: systemMsg} = this.state
    const removeSelf = this._removeToastTips
    return systemMsg && systemMsg.length > 0 ? (
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 64, flex: 1, flexDirection: 'column', paddingHorizontal: 24,  zIndex: 800}}>
        {systemMsg.map((msg) => {
          return (
            <ToastTips {...{key: msg.mid, msg, removeSelf}} />
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
    systemMsgPullAll: actions.systemMsgPullAll
  }
)(ToastTipsCollection)


export default ToastTipsCollection