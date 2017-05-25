import {TabNavigator, TabBarBottom} from 'react-navigation'

import * as Colors from '../common/PyColors'
import About from './About'
import Home from './Home'
import Schedule from './Schedule'

const AppNavigator = TabNavigator({
  Schedule: {screen: Schedule},
  Home: {screen: Home},
  About: {screen: About}
}, {
  initialRouteName: 'Schedule',
  lazy: true,
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

export default AppNavigator
