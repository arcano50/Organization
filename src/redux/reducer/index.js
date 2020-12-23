import { combineReducers } from 'redux'
import element from './element'
import modal from './modal'
import tree from './tree'
import user from './user'

const reducers = combineReducers({
  element,
  modal,
  tree,
  user
})

export default reducers