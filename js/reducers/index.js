import {combineReducers} from 'redux'

import allSchedules from './allSchedules'
import favoriteEvents from './favoriteEvents'
import navState from './navState'
import selectDate from './selectDate'
import selectEvent from './selectEvent'
import tagMapping from './tagMapping'

const reducer = combineReducers({
  allSchedules,
  favoriteEvents,
  navState,
  selectDate,
  selectEvent,
  tagMapping
})

export default reducer
