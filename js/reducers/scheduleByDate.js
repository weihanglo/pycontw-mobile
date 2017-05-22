import {
  FETCH_SCHEDULE,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE
} from '../actions/fetchSchedule'

function schedule (state = {
  isFetching: false,
  error: null,
  schedule: []
}, action) {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        schedule: action.schedule
      }
    case FETCH_SCHEDULE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SCHEDULE:
    case FETCH_SCHEDULE_SUCCESS:
    case FETCH_SCHEDULE_FAILURE:
      return {
        ...state,
        [action.date]: schedule(state[action.date], action)
      }
    default:
      return state
  }
}
