import {UPDATE_FILTER} from '../actions/updateFilter'

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.tags
    default:
      return state
  }
}
