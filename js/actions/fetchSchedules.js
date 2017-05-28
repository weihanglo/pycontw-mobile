import Api from '../api'

export const FETCH_SCHEDULES_START = 'FETCH_SCHEDULES_START'
export const FETCH_SCHEDULES_SUCCESS = 'FETCH_SCHEDULES_SUCCESS'
export const FETCH_SCHEDULES_FAILURE = 'FETCH_SCHEDULES_FAILURE'

function fetchSchedulesStart () {
  return {
    type: FETCH_SCHEDULES_START
  }
}

function fetchSchedulesSuccess (schedules) {
  return {
    type: FETCH_SCHEDULES_SUCCESS,
    schedules
  }
}

function fetchSchedulesFailure (date, error) {
  return {
    type: FETCH_SCHEDULES_FAILURE,
    error
  }
}

export function fetchSchedules () {
  return dispatch => {
    dispatch(fetchSchedulesStart())
    return Api.getAllSchedules()
      .then(schedules => dispatch(fetchSchedulesSuccess(schedules)))
      .catch(err => dispatch(fetchSchedulesFailure(err)))
  }
}
