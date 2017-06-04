import {
  FETCH_DATES_START,
  FETCH_DATES_SUCCESS,
  FETCH_DATES_FAILURE
} from '../actions/fetchDates'

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DATES_START:
      return {
        isFetching: true
      }
    case FETCH_DATES_SUCCESS:
      return {
        isFetching: false,
        dates: action.dates.sort((a, b) => new Date(a) - new Date(b))
      }
    case FETCH_DATES_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
