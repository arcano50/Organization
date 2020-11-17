import {applyMiddleware, compose, createStore} from 'redux'
import reducers from './redux/reducer/index'

import thunk from 'redux-thunk'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)|| compose;

export default createStore(reducers,
  composeEnhancers(applyMiddleware( thunk )))