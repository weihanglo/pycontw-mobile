import {SELECT_DATE} from '../actions/selectDate'

export default function (state = '2017-06-09', action) {
  switch (action.type) {
    case SELECT_DATE:
      return action.date || state
    default:
      return state
  }
}
