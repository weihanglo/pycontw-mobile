import {combineReducers} from 'redux'

import favoriteEvents from './favoriteEvents'
import navState from './navState'
import scheduleByDate from './scheduleByDate'
import selectDate from './selectDate'
import selectEvent from './selectEvent'

const reducer = combineReducers({
  favoriteEvents,
  navState,
  scheduleByDate,
  selectDate,
  selectEvent
})

export default reducer
