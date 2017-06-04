import Api from '../api'

export const FETCH_TAG_MAPPING_START = 'FETCH_TAG_MAPPING_START'
export const FETCH_TAG_MAPPING_SUCCESS = 'FETCH_TAG_MAPPING_SUCCESS'
export const FETCH_TAG_MAPPING_FAILURE = 'FETCH_TAG_MAPPING_FAILURE'

export function fetchTagMapping () {
  return dispatch => {
    dispatch({type: FETCH_TAG_MAPPING_START})
    return Api.getTagMapping()
      .then(tagMapping => dispatch({
        type: FETCH_TAG_MAPPING_SUCCESS,
        tagMapping
      }))
      .catch(error => dispatch({type: FETCH_TAG_MAPPING_FAILURE, error}))
  }
}
