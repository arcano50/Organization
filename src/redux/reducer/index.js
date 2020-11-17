import { combineReducers } from 'redux'
import element from './element'
import tree from './tree'
import user from './user'

const reducers = combineReducers({
  element,
  tree,
  user
})

export default reducers