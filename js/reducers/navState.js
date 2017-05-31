import AppNavigator from '../navigators/AppNavigator'

export default function (state, action) {
  if (action.type.startsWith('Navigation/')) {
    // const {routeName, params} = action
    const {routeName} = action
    const {routes, index} = state
    const currentTab = routes[index]
    const lastScreen = currentTab.routes[currentTab.routes.length - 1]
    // Maybe we should compare params deeply
    if (lastScreen.routeName === routeName /* &&
      lastScreen.params === params */) {
      return state
    }
  }
  return AppNavigator.router.getStateForAction(action, state) || state
}
