import React, { PropTypes } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import flatColor from '../utilities/flatColor.js'
import moment from 'moment'

const styles = StyleSheet.create({
  componentWrap: {
    height: 180,
    backgroundColor: flatColor.GREEN_SEA,
  },
  currentDate: {
    fontSize: 20,
    fontWeight: '600',
    color: flatColor.SILVER,
    marginTop: 60,
    marginLeft: 12,
  },
  currentTime: {
    fontSize: 60,
    fontWeight: '400',
    color: flatColor.CLOUDS,
    marginLeft: 12,
    marginBottom: 8,
  }
});

export default class SystemTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentDate: '', currentTime: ''};
  }
  tick() {
    let [currentDate, currentTime] = moment().format('YYYY/MM/DD*HH:mm:ss').split('*')
    this.setState(() => ({
      currentDate,
      currentTime
    }));
  }
  componentDidMount() {
    this.tick();
    this.interval = setInterval(() => this.tick(), 1000);
  }
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
    );
  }
}

SystemTimer.propTypes = {
  componentStyle: PropTypes.object
}