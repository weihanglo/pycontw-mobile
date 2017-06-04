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
        isFetching: true,
        error: null
      }
    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        schedule: action.schedule
      }
    case FETCH_SCHEDULE_FAILURE:
      return {
        isFetching: false,
        error: action.error,
        schedule: null
      }
    default:
      return state
  }
}
