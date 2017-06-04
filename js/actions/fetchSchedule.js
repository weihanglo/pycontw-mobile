import Api from '../api'

export const FETCH_SCHEDULE_START = 'FETCH_SCHEDULE_START'
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS'
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE'

function nextFrame() {
  return new Promise(function(resolve, reject) {
    requestAnimationFrame(function() { resolve(); });
  });
}


function fetchScheduleStart () {
  return {
    type: FETCH_SCHEDULE_START
  }
}

function fetchScheduleSuccess (schedule) {
  return {
    type: FETCH_SCHEDULE_SUCCESS,
    schedule
  }
}

function fetchScheduleFailure (error) {
  return {
    type: FETCH_SCHEDULE_FAILURE,
    error
  }
}

export function fetchSchedule (date) {
  return dispatch => {
    nextFrame()
    dispatch(fetchScheduleStart())
    return Api.getSchedule(date)
      .then(schedule => dispatch(fetchScheduleSuccess(schedule)))
      .catch(err => dispatch(fetchScheduleFailure(err)))
  }
}
