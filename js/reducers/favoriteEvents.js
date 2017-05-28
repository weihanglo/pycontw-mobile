import {ADD_TO_FAVORITES} from '../actions/addToFavorites'
import {REMOVE_FROM_FAVORITES} from '../actions/removeFromFavorites'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {...state, [action.eventId]: true}
    case REMOVE_FROM_FAVORITES:
      const newState = {...state}
      delete newState[action.eventId]
      return newState
    default:
      return state
  }
}
