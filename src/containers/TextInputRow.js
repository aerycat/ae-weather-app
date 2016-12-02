import React from 'react';
import {TextInput} from 'react-native';
import { connect } from 'react-redux'

let TextInputRow = ({dispatch, triggerAction, placeholder, weather, customStyle}) => {
  let style = Object.assign({
    height: 46,
    paddingLeft: 12,
    paddingRight: 12,
  }, customStyle)
  let {channel: {location: {city: cityName}}} = weather
  return (
    <TextInput underlineColorAndroid='rgba(0,0,0,0)' {...{placeholder, style}} defaultValue={cityName} returnKeyType='search' onSubmitEditing={(event) => {
        dispatch(triggerAction(event.nativeEvent.text))
      }}
    />
  );
}

TextInputRow = connect((state) => ({
  weather: state.weather
}))(TextInputRow)

export default TextInputRow
