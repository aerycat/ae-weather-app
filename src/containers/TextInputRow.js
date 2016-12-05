import React from 'react';
import {View, TextInput, Text, Image, StyleSheet} from 'react-native';
import flatColor from '../utilities/flatColor.js';
import { connect } from 'react-redux';
import * as actions from '../actions'
import Icon from 'react-native-vector-icons/Entypo';
// location

const styles = StyleSheet.create({
  componentWrap: {
    height: 46,
    overflow: 'hidden',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
  },
  textInputStyle: {
    flex: 1,
    height: 46,
    paddingLeft: 12,
    paddingRight: 12,
  },
  buttonStyle: {
    width: 64,
    height: 46,
    paddingTop: 10,
    textAlign: 'center',
    color: flatColor.ASBESTOS,
    backgroundColor: flatColor.SILVER,
  },
  buttonViewStyle: {
    width: 64,
    height: 46,
    paddingTop: 10,
    backgroundColor: flatColor.SILVER,
  },
  loadImage: {
    paddingTop: 11,
    width: 24,
    height: 24,
    alignSelf: 'center',
  }
});

let TextInputRow = ({dispatch, placeholder, weather, geolocation}) => {
  const loadImageGif = require('../assets/img/geoLoading.gif');
  const {channel: {location: {city: cityName}}} = weather
  const getGeoWeather = () => {
    dispatch(actions.geolocationFetch())
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let {coords:{latitude: lat, longitude: long}} = position
        dispatch(actions.geolocationFetchSucceed(`(${lat},${long})`))
        dispatch(actions.weatherFetch(`(${lat},${long})`))
      },
      (error) => {
        console.log(error)
        dispatch(actions.geolocationFetchFailed('geo error'))
      },
      {enableHighAccuracy: true, timeout: 60000, maximumAge: 1000}
    )
  }
  let geoButton, geoStatus
  if (geolocation.status !== 'loading') geoButton = 
  <Text style={styles.buttonStyle} onPress={getGeoWeather}><Icon name="location" style={{fontSize: 24}} color={flatColor.ASBESTOS} /></Text>
  if (geolocation.status === 'loading') geoStatus = 
  <View style={styles.buttonViewStyle}><Image style={styles.loadImage} source={loadImageGif} /></View>
  return (
    <View style={styles.componentWrap}>
      <View style={styles.rowStyle}>
        <TextInput placeholder={placeholder}  underlineColorAndroid='rgba(0,0,0,0)' style={styles.textInputStyle} defaultValue={cityName} returnKeyType='search' onSubmitEditing={(event) => {
            dispatch(actions.weatherFetch(event.nativeEvent.text))
          }}
        />
        {geoButton}
        {geoStatus}
      </View>
    </View>
  );
}

TextInputRow = connect((state) => ({
  weather: state.weather,
  geolocation: state.geolocation
}))(TextInputRow)

export default TextInputRow

