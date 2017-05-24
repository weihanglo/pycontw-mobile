import React from 'react'
import {Platform} from 'react-native'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'remote-redux-devtools'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './App'

// Redux Store Configuration

const initialState = {
  selectDate: '2017-06-09'
}

const middlewares = [thunk]

const composeEnhancers = composeWithDevTools({
  name: `${Platform.OS} - ${new Date()}`,
  realtime: true
})(applyMiddleware(...middlewares))

const store = createStore(reducer, initialState, composeEnhancers)

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
