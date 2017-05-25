import {combineReducers} from 'redux'

import favoriteEvents from './favoriteEvents'
import navState from './navState'
import scheduleByDate from './scheduleByDate'
import selectDate from './selectDate'

const reducers = combineReducers({
  favoriteEvents,
  navState,
  scheduleByDate,
  selectDate
})

export default reducers
