import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import * as Colors from './common/PyColors'
import {About, Event, Home, Schedule} from './screens'

const Stack = StackNavigator({
  Schedule: {screen: Schedule},
  Event: {screen: Event}
})
const App = TabNavigator({
  Schedule: {screen: Stack},
  Home: {screen: Home},
  About: {screen: About}
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: Colors.secondary.ACCENT_ORANGE,
    showIcon: true,
    style: {
      backgroundColor: Colors.ULTRALIGHT_BACKGROUND
    }
  }
})

export default App
