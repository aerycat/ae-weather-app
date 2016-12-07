import React, {Component} from 'react';
import {View, Text} from 'react-native';

import SystemTimer from './components/SystemTimer'
import TextInputRow from './containers/TextInputRow'
import WeatherView from './components/WeatherView'

export default [
  {
    title: 'Home',
    index: 0,
    content ({placeholder}) {
      return (
        <View>
          <SystemTimer />
          <TextInputRow {...{placeholder}} />
          <WeatherView />
        </View>
      )
    }
  }, {
    title: 'Setting',
    index: 1,
    content () {
      return (
        <View>
          <Text>test...</Text>
        </View>
      )
    }
  }
]