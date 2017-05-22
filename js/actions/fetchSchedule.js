import Api from '../api'

export const FETCH_SCHEDULE = 'FETCH_SCHEDULE'
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS'
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE'

function fetchScheduleSuccess (date, schedule) {
  return {
    type: FETCH_SCHEDULE_SUCCESS,
    date,
    schedule
  }
}

function fetchScheduleFailure (date, error) {
  return {
    type: FETCH_SCHEDULE_SUCCESS,
    date,
    error
  }
}

export function fetchSchedule (date) {
  return dispatch => (
    Api.getSchedule(date)
      .then(res => dispatch(fetchScheduleSuccess(date, res)))
      .catch(err => dispatch(fetchScheduleFailure(date, err)))
  )
}
