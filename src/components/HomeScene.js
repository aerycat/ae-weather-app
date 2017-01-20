/* 主页场景组件 */
import React, {Component}  from 'react'
import {View, StatusBar} from 'react-native'
// 引入通用控件组件
import SystemTimer from '../containers/SystemTimer'
import TextInputRow from '../containers/TextInputRow'
import WeatherView from '../containers/WeatherView'
import IconButton from './common/IconButton'
import ToastTipsCollection from './common/ToastTipsCollection'
import Swiper from 'react-native-swiper'
// 引入常量或工具
import {flatColor} from '../utilities/styleTools'
// 创建组件
class HomeScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperHeight: 0
    }
  }
  render () {
    const swiperComponent = this.state.swiperHeight > 0 ? (
      <Swiper height={this.state.swiperHeight} showsButtons={true} activeDotColor={flatColor.GREEN_SEA} showsButtons={false}>
        <WeatherView />
      </Swiper>
    ) : null
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
          {swiperComponent}
        </View>
        <IconButton 
          pressAction={() => {this.props.navigator.push({key: 'Setting'})}} 
          iconName='cog'
          iconStyle={{color: flatColor.CLOUDS}}
          thStyle={{position: 'absolute', top: 38, right: 10}}
        />
        <ToastTipsCollection />
      </View>
    )
  }
}

export default HomeScene

// <View style={{flex: 1, justifyContent: 'center', backgroundColor: flatColor.AMETHYST}}></View>
// <View style={{flex: 1, justifyContent: 'center', backgroundColor: flatColor.BELIZE_HOLE}}></View>
// <View style={{flex: 1, justifyContent: 'center', backgroundColor: flatColor.ORANGE}}></View>
