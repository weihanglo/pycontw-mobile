import {
  FETCH_TAG_MAPPING_START,
  FETCH_TAG_MAPPING_SUCCESS,
  FETCH_TAG_MAPPING_FAILURE
} from '../actions/fetchTagMapping'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TAG_MAPPING_START:
      return state
    case FETCH_TAG_MAPPING_SUCCESS:
      return {
        ...action.tagMapping
      }
    case FETCH_TAG_MAPPING_FAILURE:
      return state
    default:
      return state
  }
}
