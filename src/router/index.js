/* 导航与路由控制 */ 
import React, {Component} from 'react'
import {NavigationExperimental} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../actions'
import dismissKeyboard from 'dismissKeyboard'
// 引入场景列表
import Scenes from './scenes'

// 分解路由query
const parseKey = (keyStr) => {
  let [sceneKey, query] = keyStr.split(':')
  return {sceneKey, query}
}
// 引入导航组件
const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader
} = NavigationExperimental
// 创建组件
class NavRootContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this._navigator = {
      push: props.navPush,
      pop: props.navPop
    }
  }
  // 渲染场景
  _renderScene = (props) => {
    let {scene: {route: {key}}} = props
    let {sceneKey, query} = parseKey(key)
    // 默认路由到首页场景
    let CurrentScene = Scenes['Home'].scene
    // 降下键盘
    dismissKeyboard()
    if (sceneKey && Scenes[sceneKey]) CurrentScene = Scenes[sceneKey].scene
    return <CurrentScene  navigator={this._navigator} routeQuery={query}/>
  }
  // 渲染导航头部
  _renderHeader = (props) => {
    let {scene: {route: {key, title: customTitle}}} = props
    let {sceneKey} = parseKey(key)
    return key && Scenes[sceneKey] && Scenes[sceneKey].noHeader ? null : 
      <NavigationHeader
        renderTitleComponent={() => (
          customTitle || Scenes[sceneKey].title ? 
            <NavigationHeader.Title>
              {customTitle || Scenes[sceneKey].title}
            </NavigationHeader.Title>
            : null
        )}
        onNavigateBack={this._navigator.pop}
        {...props}
      />
  }
  // 渲染导航卡堆栈
  render() {
    return (
      <NavigationCardStack
        direction='horizontal' 
        navigationState={this.props.navigationState}
        renderScene={this._renderScene} 
        renderHeader={this._renderHeader}
      />
    )
  }
}
// 链接到store
NavRootContainer = connect(
  (state) => ({navigationState: state.navigation}),
  {
    navPush: (route) => actions.navigationPush(route),
    navPop: () => actions.navigationPop()
  }
)(NavRootContainer)

export default NavRootContainer
