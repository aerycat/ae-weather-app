/* 弹出提示 */
import React, {Component} from 'react'
import {View, Text, Animated} from 'react-native'
import {flatColor} from '../../utilities/styleTools'

const _timeout = 3000

// 创建组件
class ToastTips extends Component{
  constructor(props) {
    super(props)
    this.state = {
      spinValue: new Animated.Value(0)
    }
    // 相同mid的系统消息该次动画不删除信息
    this._toastTipsAnimation = this._toastTipsAnimation.bind(this)
  }
  // 弹出提示动画参数
  _toastTipsAnimation = (mid, timeout) => {
    this.state.spinValue.stopAnimation()
    this.state.spinValue.setValue(0)
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: timeout || _timeout
      } 
    ).start(() => {
      this.props.removeSelf(mid)
    })
  }
  // 组件装载
  componentWillMount () {
    let {msg: {mid, timeout}} = this.props
    this._toastTipsAnimation(mid, timeout)
  }
  render () {
    // 透明度阶段值
    const opacity = this.state.spinValue.interpolate({
      inputRange: [0, .3, .9, 1],
      outputRange: [0, 1, 1, 0]
    })
    // 位置阶段值
    const translateY = this.state.spinValue.interpolate({
      inputRange: [0, .1, .9, 1],
      outputRange: [20, 0, 0, 20]
    })
    return this.props.msg && this.props.msg.message ? (
      <Animated.View style={{opacity, transform: [{translateY}]}}>
        <View style={{alignSelf: 'center', backgroundColor: flatColor.BLACK, opacity: .75, paddingVertical: 6, paddingHorizontal: 12, marginTop: 4}} >
          <Text style={{color: flatColor.WHILE, textAlign: 'center'}}>{this.props.msg.message}</Text>
        </View>
      </Animated.View>
    ) : null
  }
}

export default ToastTips