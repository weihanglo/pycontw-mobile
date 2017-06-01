import {
  SAVE_FAVORITES_SUCCESS,
  SAVE_FAVORITES_FAILURE
} from '../actions/saveFavorites'
import {
  LOAD_FAVORITES_SUCCESS,
  LOAD_FAVORITES_FAILURE
} from '../actions/loadFavorites'

// TODO: handle presist failure
export default function (state = {}, action) {
  switch (action.type) {
    case LOAD_FAVORITES_SUCCESS:
      return action.eventIds
    case SAVE_FAVORITES_SUCCESS:
      return action.eventIds
    case SAVE_FAVORITES_FAILURE:
    case LOAD_FAVORITES_FAILURE:
    default:
      return state
  }
}
