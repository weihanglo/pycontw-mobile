import Api from '../api'

export const FETCH_TAG_MAPPING_START = 'FETCH_TAG_MAPPING_START'
export const FETCH_TAG_MAPPING_SUCCESS = 'FETCH_TAG_MAPPING_SUCCESS'
export const FETCH_TAG_MAPPING_FAILURE = 'FETCH_TAG_MAPPING_FAILURE'

function fetchTagMappingStart () {
  return {
    type: FETCH_TAG_MAPPING_START
  }
}

function fetchTagMappingSuccess (tagMapping) {
  return {
    type: FETCH_TAG_MAPPING_SUCCESS,
    tagMapping
  }
}

function fetchTagMappingFailure (error) {
  return {
    type: FETCH_TAG_MAPPING_FAILURE,
    error
  }
}

export function fetchTagMapping () {
  return dispatch => {
    dispatch(fetchTagMappingStart())
    return Api.getTagMapping()
      .then(res => dispatch(fetchTagMappingSuccess(res)))
      .catch(err => dispatch(fetchTagMappingFailure(err)))
  }
}

export function fetchEventRemote (eventId) {
  return dispatch => {
    dispatch(fetchEventStart(eventId))
    return Api.getEventRemote(eventId)
      .then(res => dispatch(fetchEventSuccess(eventId, res)))
      .catch(err => dispatch(fetchEventFailure(eventId, err)))
  }
}
