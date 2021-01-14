import { combineReducers } from 'redux'
import ccg from './ccg'
import element from './element'
import modal from './modal'
import news from './news'
import tree from './tree'
import user from './user'

export default combineReducers({
  ccg,
  element,
  modal,
  news,
  tree,
  user
})