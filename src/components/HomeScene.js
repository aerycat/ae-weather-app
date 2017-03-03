/* 主页场景组件 */
import React, {Component}  from 'react'
import {View, StatusBar} from 'react-native'
// 引入通用控件组件
import SystemTimer from '../containers/SystemTimer'
import TextInputRow from '../containers/TextInputRow'
import WeatherViewSwiper from '../containers/WeatherViewSwiper'
import IconButton from './common/IconButton'

// 引入常量或工具
import {flatColor} from '../utilities/styleTools'
// 创建组件
class HomeScene extends Component {
  constructor(props) {
    super(props)
    // 获取高度后才会渲染天气项
    this.state = {
      swiperHeight: 0
    }
  }
  render () {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <StatusBar style={{backgroundColor: flatColor.GREEN_SEA}} />
        <SystemTimer />
        <TextInputRow placeholder='Entry a city name' />
        <View style={{flex: 1, flexDirection: 'row'}} onLayout={
          (e) => {
            const {x, y, width, height} = e.nativeEvent.layout
            this.setState({swiperHeight: height})
          }
        }>
          {
            this.state.swiperHeight > 0 ? 
            (<WeatherViewSwiper swiperHeight={this.state.swiperHeight}/>)
            : null
          }
        </View>
        <IconButton 
          pressAction={() => {this.props.navigator.push({key: 'Setting'})}} 
          iconName='cog'
          iconStyle={{color: flatColor.CLOUDS}}
          thStyle={{position: 'absolute', top: 38, right: 10}}
        />
      </View>
    )
  }
}

export default HomeScene
