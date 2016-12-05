/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*
ios       Press Cmd+R to reload,
          Cmd+D or shake for dev menu
android  Double tap R on your keyboard to reload,
          Shake or press menu button for dev menu
*/
import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import flatColor from './utilities/flatColor'
/* redux relation */
import { applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import configureStore from './store/configureStore.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({/* options */}) :
  compose
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const store = configureStore({}, composeEnhancers(
  applyMiddleware(...middlewares)
))
sagaMiddleware.run(rootSaga)
/* redux relation end */
/* components */
import SystemTimer from './components/SystemTimer'
import TextInputRow from './containers/TextInputRow'
import WeatherView from './components/WeatherView'
/* components end */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  }
});

export default class aeWeatherApp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor={flatColor.GREEN_SEA} />
        <SystemTimer />
        <TextInputRow placeholder='Entry a city name' />
        <WeatherView />
      </View>
      </Provider>
    );
  }
}
