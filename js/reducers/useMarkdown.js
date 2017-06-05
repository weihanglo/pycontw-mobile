import {PREFER_MARKDOWN} from '../actions/preferMarkdown'

export default function (state = true, action) {
  switch (action.type) {
    case PREFER_MARKDOWN:
      return action.preferred
    default:
      return state
  }
}
