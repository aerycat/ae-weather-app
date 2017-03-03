/* store配置 */
import {createStore} from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState, enhancers) {
  // 创建store
  const store = createStore(
    rootReducer,
    initialState,
    enhancers
  )
  // 热模块加载
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
