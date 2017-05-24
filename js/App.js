import {TabNavigator, TabBarBottom} from 'react-navigation'

import * as Colors from './common/PyColors'
import {About, Home, Schedule} from './screens'

const App = TabNavigator({
  Schedule: {screen: Schedule},
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
