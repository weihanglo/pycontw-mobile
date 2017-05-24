import Api from '../api'

export const FETCH_SCHEDULE_START = 'FETCH_SCHEDULE_START'
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS'
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE'

function fetchScheduleStart (date) {
  return {
    type: FETCH_SCHEDULE_START,
    date
  }
}

function fetchScheduleSuccess (date, schedule) {
  return {
    type: FETCH_SCHEDULE_SUCCESS,
    date,
    schedule
  }
}

function fetchScheduleFailure (date, error) {
  return {
    type: FETCH_SCHEDULE_FAILURE,
    date,
    error
  }
}

export function fetchSchedule (date) {
  return dispatch => {
    dispatch(fetchScheduleStart(date))
    return Api.getSchedule(date)
      .then(res => dispatch(fetchScheduleSuccess(date, res)))
      .catch(err => dispatch(fetchScheduleFailure(date, err)))
  }
}

export function fetchScheduleRemote (date) {
  return dispatch => {
    dispatch(fetchScheduleStart(date))
    return Api.getScheduleRemote(date)
      .then(res => dispatch(fetchScheduleSuccess(date, res)))
      .catch(err => dispatch(fetchScheduleFailure(date, err)))
  }
}
