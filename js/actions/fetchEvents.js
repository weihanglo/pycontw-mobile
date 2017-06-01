import Api from '../api'

export const FETCH_EVENT_START = 'FETCH_EVENT_START'
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS'
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE'

export const FETCH_EVENTS_START = 'FETCH_EVENTS_START'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'

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

// Fetch all events
function fetchEventsStart () {
  return {
    type: FETCH_EVENTS_START
  }
}

function fetchEventsSuccess (events, event) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    events
  }
}

function fetchEventsFailure (error) {
  return {
    type: FETCH_EVENTS_FAILURE,
    error
  }
}

export function fetchEvents () {
  return dispatch => {
    dispatch(fetchEventsStart())
    return Api.getAllEvents()
      .then(res => dispatch(fetchEventsSuccess(res)))
      .catch(err => dispatch(fetchEventsFailure(err)))
  }
}
