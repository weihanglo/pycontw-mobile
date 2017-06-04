import {
  FETCH_EVENT_START,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE
} from '../actions/fetchEvent'

const initialState = {
  isFetching: false,
  eventId: null,
  error: null,
  event: null
}

export default function (state = initialState, {error, eventId, event, type}) {
  switch (type) {
    case FETCH_EVENT_START:
      return {
        eventId,
        isFetching: true
      }
    case FETCH_EVENT_SUCCESS:
      return {
        eventId,
        event,
        isFetching: false
      }
    case FETCH_EVENT_FAILURE:
      return {
        eventId,
        error,
        isFetching: false
      }
    default:
      return state
  }
}
