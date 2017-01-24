/* 输入栏组件 */
import React from 'react'
import {ActivityIndicator, View, TextInput, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
// 引入通用控件组件
import TextInputGroup from '../components/common/TextInputGroup'
import IconButton from '../components/common/IconButton'
// 引入常量或工具
import { WEATHER_DEFAULT_ID } from '../utilities/constant.js'
import * as actions from '../actions'
import {flatColor} from '../utilities/styleTools'
// 定义组件样式
const styles = StyleSheet.create({
  componentWrap: {
    height: 48,
    overflow: 'hidden'
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eeeeee'
  },
  buttonViewStyle: {
    width: 64,
    height: 48,
    paddingTop: 13,
    backgroundColor: flatColor.SILVER
  }
})
// 创建组件
const TextInputRow = ({placeholder, geolocation, weatherKeywordUpdate, weatherFetch, geolocationFetch}) => {
  return (
    <View style={styles.componentWrap}>
      <View style={styles.rowStyle}>
        <TextInputGroup
          bgColor={flatColor.CLOUDS}
          textInputProps={{
            onSubmitEditing: (event) => {
              weatherKeywordUpdate(WEATHER_DEFAULT_ID, event.nativeEvent.text)
              weatherFetch(WEATHER_DEFAULT_ID)
            },
            placeholder,
            returnKeyType: 'search'
          }} 
        />
        {
          /* 地理信息按钮状态切换 */
          geolocation.status === 'loading' ? 
            <View style={styles.buttonViewStyle}>
              <ActivityIndicator color={flatColor.ASBESTOS} />
            </View>
            :
            <IconButton 
              pressAction={() => {geolocationFetch()}} 
              iconName='location'
              iconStyle={{color: flatColor.ASBESTOS}}
              thStyle={{backgroundColor: flatColor.SILVER, width: 64, height: 48}}
              underlayColor={flatColor.CLOUDS}
            />
        }
      </View>
    </View>
  )
}
// 链接到store
TextInputRow = connect(
  (state) => ({
    geolocation: state.geolocation
  }),
  {
    weatherKeywordUpdate: actions.weatherKeywordUpdate,
    weatherFetch: actions.weatherFetch,
    geolocationFetch: actions.geolocationFetch
  }
)(TextInputRow)

export default TextInputRow

