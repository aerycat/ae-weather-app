/* store配置 */
import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState, enhancers) {
  // return createStore(rootReducer, initialState, enhancers)
  const store = createStore(
    rootReducer,
    initialState,
    enhancers
  )
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
