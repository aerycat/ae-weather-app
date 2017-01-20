export const weatherIcons = (code) => {
  switch (code.toString()) {
    case '0':
      return require('../assets/img/tornado.png')
    case '1':
      return require('../assets/img/day-storm-showers.png')
    case '2':
      return require('../assets/img/tornado.png')
    case '3':
      return require('../assets/img/showers.png')
    case '4':
      return require('../assets/img/showers.png')
    case '5':
      return require('../assets/img/rain-mix.png')
    case '6':
      return require('../assets/img/rain-mix.png')
    case '7':
      return require('../assets/img/rain-mix.png')
    case '8':
      return require('../assets/img/hail.png')
    case '9':
      return require('../assets/img/rain.png')
    case '10':
      return require('../assets/img/rain.png')
    case '11':
      return require('../assets/img/rain.png')
    case '12':
      return require('../assets/img/rain.png')
    case '13':
      return require('../assets/img/snow.png')
    case '14':
      return require('../assets/img/day-snow.png')
    case '15':
      return require('../assets/img/snow.png')
    case '16':
      return require('../assets/img/snow.png')
    case '17':
      return require('../assets/img/hail.png')
    case '18':
      return require('../assets/img/rain-mix.png')
    case '19':
      return require('../assets/img/dust.png')
    case '20':
      return require('../assets/img/fog.png')
    case '21':
      return require('../assets/img/cloudy-gusts.png')
    case '22':
      return require('../assets/img/dust.png')
    case '23':
      return require('../assets/img/cloudy-gusts.png')
    case '24':
      return require('../assets/img/cloudy-gusts.png')
    case '25':
      return require('../assets/img/snow.png')
    case '26':
      return require('../assets/img/cloudy.png')
    case '27':
      return require('../assets/img/night-cloudy.png')
    case '28':
      return require('../assets/img/day-cloudy.png')
    case '29':
      return require('../assets/img/night-cloudy.png')
    case '30':
      return require('../assets/img/day-cloudy.png')
    case '31':
      return require('../assets/img/night-clear.png')
    case '32':
      return require('../assets/img/day-sunny.png')
    case '33':
      return require('../assets/img/night-cloudy.png')
    case '34':
      return require('../assets/img/day-cloudy.png')
    case '35':
      return require('../assets/img/rain-mix.png')
    case '36':
      return require('../assets/img/hot.png')
    case '37':
      return require('../assets/img/day-storm-showers.png')
    case '38':
      return require('../assets/img/day-storm-showers.png')
    case '39':
      return require('../assets/img/day-storm-showers.png')
    case '40':
      return require('../assets/img/showers.png')
    case '41':
      return require('../assets/img/snow.png')
    case '42':
      return require('../assets/img/snow.png')
    case '43':
      return require('../assets/img/snow.png')
    case '44':
      return require('../assets/img/day-cloudy.png')
    case '45':
      return require('../assets/img/day-storm-showers.png')
    case '46':
      return require('../assets/img/snow.png')
    case '47':
      return require('../assets/img/day-storm-showers.png')
    case '3200':
      return require('../assets/img/flower.png')
    case '10000':
      return require('../assets/img/refresh.png')
    default:
      return require('../assets/img/flower.png')
  }
} 


export const temperatureUnitOptions = [
  {title: '℃', value: 'c'},
  {title: '℉', value: 'f'}
] 