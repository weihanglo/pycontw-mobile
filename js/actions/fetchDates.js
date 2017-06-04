import Api from '../api'

export const FETCH_DATES_START = 'FETCH_DATES_START'
export const FETCH_DATES_SUCCESS = 'FETCH_DATES_SUCCESS'
export const FETCH_DATES_FAILURE = 'FETCH_DATES_FAILURE'

export function fetchDates () {
  return dispatch => {
    dispatch({type: FETCH_DATES_START})
    return Api.getDates()
      .then(dates => dispatch({type: FETCH_DATES_SUCCESS, dates}))
      .catch(error => dispatch({type: FETCH_DATES_FAILURE, error}))
  }
}
