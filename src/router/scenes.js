import HomeScene from '../components/HomeScene'
import SettingScene from '../components/SettingScene'

// 场景配置
export default {
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