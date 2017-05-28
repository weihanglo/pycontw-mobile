import {
  FETCH_SCHEDULES_START,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_FAILURE
} from '../actions/fetchSchedules'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SCHEDULES_START:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case FETCH_SCHEDULES_SUCCESS:
      const dates = Object.keys(action.schedules)
        .sort((a, b) => (new Date(a) - new Date(b)))
      return {
        ...state,
        isFetching: false,
        error: null,
        dates,
        ...action.schedules
      }
    case FETCH_SCHEDULES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
