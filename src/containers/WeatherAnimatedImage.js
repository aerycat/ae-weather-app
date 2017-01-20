/* 初始化时的幕帘组件 */
import React, {Component} from 'react'
import {Image, Animated, LayoutAnimation} from 'react-native'

// 创建组件
export default class WeatherAnimatedImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(0)
    }
    this._startAnimation = () => {
      this.state.scale.stopAnimation()
      this.state.scale.setValue(.8)
      Animated.spring(this.state.scale, {
        toValue: 1,
        friction: 3,
      }).start()
    }
  }
  componentWillMount () {
    this._startAnimation()
  }
  componentWillReceiveProps() {
    this._startAnimation()
  }
  render () {
    return (
      <Animated.Image style={{
        ...this.props.style,
        transform: [
          {scale: this.state.scale}
        ]
      }} 
      source={this.props.source}
    />
    )
  }
}
