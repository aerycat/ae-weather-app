/* store配置 */
import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState, enhancers) {
  return createStore(rootReducer, initialState, enhancers)
}
