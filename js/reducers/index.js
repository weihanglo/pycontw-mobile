import {combineReducers} from 'redux'

import scheduleByDate from './scheduleByDate'
import selectDate from './selectDate'

const reducers = combineReducers({
  scheduleByDate,
  selectDate
})

export default reducers
