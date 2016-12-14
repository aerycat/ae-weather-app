/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 *  ios       Press Cmd+R to reload,
 *            Cmd+D or shake for dev menu
 *  android  Double tap R on your keyboard to reload,
 *            Shake or press menu button for dev menu
**/
import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'

/* redux relation */
// redux配置
import { applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import configureStore from './store/configureStore.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({/* options */}) :
  compose
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const store = configureStore({}, composeEnhancers(
  applyMiddleware(...middlewares),
  autoRehydrate()
))
sagaMiddleware.run(rootSaga)
/* redux relation end */

// 引入actions
import * as actions from './actions'
// 初始化时显示界面
import InitializeCurtain from './components/common/InitializeCurtain'
// 引入路由
import NavRootContainer from './router'

export default class aeWeatherApp extends Component {
  state = {
    initializeComplete: false
  }
  componentWillMount () {
    persistStore(store, {storage: AsyncStorage, whitelist: ['setting']}, () => {
      this.setState({initializeComplete: true})
      store.dispatch(actions.refreshHomeScene())
    })
  }
  render() {
    return (
      <Provider store={store}>
        {
          this.state.initializeComplete ? <NavRootContainer /> : <InitializeCurtain />
        }
      </Provider>
    )
  }
}
