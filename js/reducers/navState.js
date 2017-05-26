import AppNavigator from '../navigators/AppNavigator'

export default function (state, action) {
  let nextState = AppNavigator.router.getStateForAction(action, state)

  return nextState || state
}
