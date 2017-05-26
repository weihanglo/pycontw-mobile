import {
  FETCH_SCHEDULE_START,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE
} from '../actions/fetchSchedule'

const initialState = {
  isFetching: false,
  error: null,
  schedule: []
}

function schedule (state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEDULE_START:
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
    case FETCH_SCHEDULE_START:
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
