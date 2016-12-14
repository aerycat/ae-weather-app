/* 系统时间组件 */
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {flatColor} from '../utilities/styleTools'
import moment from 'moment'
// 定义组件样式
const styles = StyleSheet.create({
  componentWrap: {
    position: 'relative',
    height: 180,
    backgroundColor: flatColor.GREEN_SEA
  },
  currentDate: {
    fontSize: 20,
    fontWeight: '600',
    color: flatColor.SILVER,
    marginTop: 60,
    marginLeft: 12
  },
  currentTime: {
    fontSize: 60,
    fontWeight: '400',
    color: flatColor.CLOUDS,
    marginLeft: 12,
    marginBottom: 8
  },
});
// 创建组件
export default class SystemTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentDate: '', currentTime: ''};
  }
  // 时间刷新方法
  _tick() {
    let [currentDate, currentTime] = moment().format('YYYY/MM/DD*HH:mm:ss').split('*')
    this.setState(() => ({
      currentDate,
      currentTime
    }));
  }
  // 组件装载完成后开始计时
  componentDidMount() {
    this._tick();
    this.interval = setInterval(() => this._tick(), 1000);
  }
  // 渲染视图
  render() {
    return (
      <View style={styles.componentWrap}>
        <Text style={styles.currentDate}>
          {this.state.currentDate}
        </Text>
        <Text style={styles.currentTime}>
          {this.state.currentTime}
        </Text>
      </View>
    )
  }
}
