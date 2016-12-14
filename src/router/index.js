/* 导航与路由控制 */ 
import React, {Component} from 'react'
import {NavigationExperimental} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import dismissKeyboard from 'dismissKeyboard'
// 引入场景
import HomeScene from '../components/HomeScene'
import SettingScene from '../components/SettingScene'
// 场景配置
const SceneConfigMap = {
  'Home': {
    noHeader: true,
    scene: HomeScene,
    title: 'Home'
  },
  'Setting': {
    scene: SettingScene,
    title: 'Setting'
  }
}
// 分解Key值
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
    let CurrentScene = SceneConfigMap['Home'].scene
    dismissKeyboard()
    if (sceneKey && SceneConfigMap[sceneKey]) CurrentScene = SceneConfigMap[sceneKey].scene
    return <CurrentScene  navigator={this._navigator} routeQuery={query}/>
  }
  // 渲染导航头部
  _renderHeader = (props) => {
    let {scene: {route: {key, title: customTitle}}} = props
    let {sceneKey} = parseKey(key)
    return key && SceneConfigMap[sceneKey] && SceneConfigMap[sceneKey].noHeader ? undefined : 
      <NavigationHeader
        renderTitleComponent={() => (
          customTitle || SceneConfigMap[sceneKey].title ? 
            <NavigationHeader.Title>
              {customTitle || SceneConfigMap[sceneKey].title}
            </NavigationHeader.Title>
            : undefined
        )}
        onNavigateBack={this._navigator.pop}
        {...props}
      />
  }
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
