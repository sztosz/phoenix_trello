import { combineReducers } from 'redux'
import { routerReducers } from 'react-router-redux'
import session from './session'

export default combineReducers({
  routing: routerReducers,
  session: session
})
