import {combineReducers} from 'redux'

import allSchedules from './allSchedules'
import favoriteEvents from './favoriteEvents'
import navState from './navState'
import selectDate from './selectDate'
import selectEvent from './selectEvent'

const reducer = combineReducers({
  allSchedules,
  favoriteEvents,
  navState,
  selectDate,
  selectEvent
})

export default reducer
