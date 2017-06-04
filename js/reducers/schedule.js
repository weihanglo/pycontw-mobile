import {
  FETCH_SCHEDULE_START,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE
} from '../actions/fetchSchedule'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SCHEDULE_START:
      return {
        isFetching: true
      }
    case FETCH_SCHEDULE_SUCCESS:
      return {
        isFetching: false,
        schedule: action.schedule
      }
    case FETCH_SCHEDULE_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
