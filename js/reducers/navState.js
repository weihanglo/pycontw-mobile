import {NavigationActions} from 'react-navigation'

import AppNavigator from '../navigators/AppNavigator'

// const firstAction = AppNavigator.router.getActionForPathAndParams('Schedule')
// const initialNavState = AppNavigator.router.getStateForAction(firstAction)
//
export default function (state, action) {
  let nextState = AppNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
