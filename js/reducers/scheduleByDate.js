import {
  FETCH_SCHEDULE_START,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE
} from '../actions/fetchSchedule'

export default function (state = {}, action) {
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
        error: null,
        [action.date]: {schedule: action.schedule}
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
