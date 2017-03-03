/* 初始化时的幕帘组件 */
import React, {Component} from 'react'
import {View, Image, Animated, Easing} from 'react-native'
import {flatColor} from '../../utilities/styleTools'
// 引入图片
const logoImage = require('../../assets/img/flower.png')

// 创建组件(动画效果可选)

// 不含动画
// export default () => (
//   <View style={{flex: 1, flexDirection: 'row', backgroundColor: flatColor.WHILE}}>
//     <View style={{flex: 1, alignSelf: 'center', flexDirection: 'column'}}>
//       <Image style={{width: 128, height: 128, alignSelf: 'center'}} source={logoImage} />
//     </View>
//   </View>
// )

// 包含动画
export default class InitializeCurtain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotateY: new Animated.Value(0)
    }
  }
  // 加载完成后计算动画效果
  componentDidMount() {
    Animated.timing(this.state.rotateY, {
      toValue: 1,
      duration: 600,
      easing: Easing.ease
    }).start()
  }
  render () {
    return (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: flatColor.WHILE}}>
        <View style={{flex: 1, alignSelf: 'center', flexDirection: 'column'}}>
          <Animated.Image style={{
            width: 128, 
            height: 128, 
            alignSelf: 'center',
            transform: [
              {rotateY: this.state.rotateY.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })}
            ]
          }} source={logoImage} />
        </View>
      </View>
    )
  }
}