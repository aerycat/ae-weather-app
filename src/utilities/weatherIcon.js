// const weatherImageMap = {
//   '0': 'tornado',
//   '1': 'day-storm-showers',
//   '2': 'tornado',
//   '3': 'showers',
//   '4': 'showers',
//   '5': 'rain-mix',
//   '6': 'rain-mix',
//   '7': 'rain-mix',
//   '8': 'hail',
//   '9': 'rain',
//   '10': 'hail',
//   '11': 'rain',
//   '12': 'rain',
//   '13': 'snow',
//   '14': 'day-snow',
//   '15': 'snow',
//   '16': 'snow',
//   '17': 'hail',
//   '18': 'rain-mix',
//   '19': 'dust',
//   '20': 'fog',
//   '21': 'cloudy-gusts',
//   '22': 'dust',
//   '23': 'cloudy-gusts',
//   '24': 'cloudy-gusts',
//   '25': 'snow',
//   '26': 'cloudy',
//   '27': 'night-cloudy',
//   '28': 'day-cloudy',
//   '29': 'night-cloudy',
//   '30': 'day-cloudy',
//   '31': 'night-clear',
//   '32': 'day-sunny',
//   '33': 'night-cloudy',
//   '34': 'day-cloudy',
//   '35': 'rain-mix',
//   '36': 'hot',
//   '37': 'day-storm-showers',
//   '38': 'day-storm-showers',
//   '39': 'day-storm-showers',
//   '40': 'showers',
//   '41': 'snow',
//   '42': 'snow',
//   '43': 'snow',
//   '44': 'day-cloudy',
//   '45': 'day-storm-showers',
//   '46': 'snow',
//   '47': 'day-storm-showers',
//   '3200': 'unknow'
// }

export default (code) => {
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
      return require('../assets/img/unknow.png')
    default:
      return require('../assets/img/unknow.png')
  }
} 
