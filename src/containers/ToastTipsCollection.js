/* 弹出提示集合 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import * as actions from '../actions'
import ToastTips from '../components/common/ToastTips'

import LODASH from 'lodash'

// 创建组件
class ToastTipsCollection extends Component{
  constructor (props) {
    super(props)
    this.state = {systemMsgCache: []}
    this._removeToastTips = this._removeToastTips.bind(this)
  }
  // 删除系统提示
  _removeToastTips (mid) {
    let systemMsgCache = this.state.systemMsgCache.slice()
    this.setState({systemMsgCache: systemMsgCache.filter((sysmsg) => sysmsg.mid !== mid)})
  }
  // 接受新属性后处理
  componentWillReceiveProps (nextProps) {
    if (nextProps.systemMsg && LODASH.isArray(nextProps.systemMsg) && nextProps.systemMsg.length > 0) {
      const nextSystemMsg = nextProps.systemMsg
      const currentSystemMsg = this.state.systemMsgCache.slice()
      this.setState({systemMsgCache: LODASH.uniqBy([...currentSystemMsg, ...nextSystemMsg], 'mid')})
      this.props.systemMsgPullAll()
    }
  }
  render () {
    const {systemMsgCache: systemMsg} = this.state
    return systemMsg && systemMsg.length > 0 ? (
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 64, flex: 1, flexDirection: 'column', paddingHorizontal: 24,  zIndex: 800}}>
        {systemMsg.map((msg) => {
          return (
            <ToastTips {...{key: msg.mid, msg, removeSelf: this._removeToastTips}} />
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