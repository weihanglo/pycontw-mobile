import {combineReducers} from 'redux'

import favoriteEvents from './favoriteEvents'
import scheduleByDate from './scheduleByDate'
import selectDate from './selectDate'

const reducers = combineReducers({
  favoriteEvents,
  scheduleByDate,
  selectDate
})

export default reducers
