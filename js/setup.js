import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'remote-redux-devtools'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './App'

const middlewares = [thunk]
const composeEnhancers = composeWithDevTools({realtime: true})
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middlewares)
))

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default function () {
  return Root
}
