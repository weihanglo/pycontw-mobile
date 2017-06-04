import {
  FETCH_DATES_START,
  FETCH_DATES_SUCCESS,
  FETCH_DATES_FAILURE
} from '../actions/fetchDates'

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DATES_START:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case FETCH_DATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dates: action.dates.sort((a, b) => new Date(a) - new Date(b)),
        error: null
      }
    case FETCH_DATES_FAILURE:
      return {
        ...state,
        isFetching: false,
        dates: null,
        error: action.error
      }
    default:
      return state
  }
}
