import {combineReducers} from 'redux'

import allDates from './allDates'
import favoriteEvents from './favoriteEvents'
import filter from './filter'
import navState from './navState'
import schedule from './schedule'
import selectedDate from './selectedDate'
import selectEvent from './selectEvent'
import syncState from './syncState'
import tagMapping from './tagMapping'

const reducer = combineReducers({
  allDates,
  favoriteEvents,
  filter,
  navState,
  schedule,
  selectedDate,
  selectEvent,
  syncState,
  tagMapping
})

export default reducer
