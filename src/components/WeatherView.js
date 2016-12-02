import React, { PropTypes } from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Entypo';
import weatherIcon from '../utilities/weatherIcon'
import flatColor from '../utilities/flatColor'

const styles = StyleSheet.create({
  componentWrap: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadImageView: {
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
  loadImage: {
    width: 64,
    height: 64,
    marginTop: 78,
    alignSelf: 'center',
  },
  weatherIconImage: {
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
  tips: {
    fontSize: 16,
    color: flatColor.ASBESTOS,
    alignSelf: 'center',
  },
  weatherCity: {
    fontSize: 20,
    color: flatColor.CONCRETE,
    marginBottom: 8,
    alignSelf: 'center',
  },
  weatherDescribe: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 10,
    color: flatColor.ASBESTOS,
  },
  weatherType: {
    fontSize: 32,
    color: flatColor.WET_ASPHALT,
  },
  weatherTemperature: {
    fontSize: 32,
    color: flatColor.GREEN_SEA,
  }
});

const WeatherView = ({weather}) => {
  let {
    status: istatus,
    channel: {
      location: {city: icity},
      item: {
        condition: {date: idate, temp: itemp, text: itext, code: icode}
      }
    }
  } = weather;
  let loadImageGif = require('../assets/img/loading.gif');
  let normalImage, loadImage, elmTips, elmWeatherCity, elmWeatherDescribe;
  if (istatus !== 'loading') normalImage = 
  <Image style={styles.weatherIconImage} source={weatherIcon(icode)} />
  if (istatus === 'loading') loadImage = 
  <View style={styles.loadImageView}>
    <Image style={styles.loadImage} source={loadImageGif} />
  </View>
  if (istatus === '') elmTips = 
  <Text style={styles.tips}>Please enter a city name above.</Text>
  if (istatus === 'loading') elmTips = 
  <Text style={styles.tips}>loading...</Text>
  if (istatus === 'failed') elmTips = 
  <Text style={styles.tips}>The city's weather information was not found.</Text>
  if (icity !== '')  elmWeatherCity = 
  <Text style={styles.weatherCity}>{icity}</Text>
  if (istatus === 'succeed')  elmWeatherDescribe = 
  <Text style={styles.weatherDescribe}>
    <Text style={styles.weatherType}>{itext}</Text>
    {' / '}
    <Text style={styles.weatherTemperature}>{itemp}</Text>
    ℃
  </Text>
  if (istatus === 'failed') elmTips = 
  <Text style={styles.tips}>The city's weather information was not found.</Text>
  
  return (
    <View style={styles.componentWrap}>
        {normalImage}
        {loadImage}
        {elmWeatherCity}
        {elmWeatherDescribe}
        {elmTips}
    </View> 
  )
}

WeatherView = connect(
  (state) => ({weather: state.weather})
)(WeatherView)

export default WeatherView
