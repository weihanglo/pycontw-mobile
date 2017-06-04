import Api from '../api'

export const FETCH_EVENT_START = 'FETCH_EVENT_START'
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS'
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE'

// Fetch single event
function fetchEventStart (eventId) {
  return {
    type: FETCH_EVENT_START,
    eventId
  }
}

function fetchEventSuccess (eventId, event) {
  return {
    type: FETCH_EVENT_SUCCESS,
    eventId,
    event
  }
}

function fetchEventFailure (eventId, error) {
  return {
    type: FETCH_EVENT_FAILURE,
    eventId,
    error
  }
}

export function fetchEvent (eventId) {
  return dispatch => {
    dispatch(fetchEventStart(eventId))
    return Api.getEvent(eventId)
      .then(res => dispatch(fetchEventSuccess(eventId, res)))
      .catch(err => dispatch(fetchEventFailure(eventId, err)))
  }
}
