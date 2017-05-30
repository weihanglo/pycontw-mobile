import React from 'react'
import {TabNavigator, TabBarBottom} from 'react-navigation'

import * as Colors from '../common/PyColors'
import About from './About'
import My from './My'
import Schedule from './Schedule'

const AppNavigator = TabNavigator({
  Schedule: {screen: Schedule},
  My: {screen: My},
  About: {screen: About}
}, {
  initialRouteName: 'Schedule',
  lazy: true,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    showIcon: true
  },
  tabBarComponent: props => {
    let backgroundColor = Colors.ULTRALIGHT_BACKGROUND
    let inactiveTintColor = 'hsl(0, 0%, 50%)'

    // HACK: hack to get tab index
    if (props.navigation.state.index === 2) { // eslint-disable-line
      backgroundColor = Colors.secondary.DARK_BLUE
      inactiveTintColor = 'white'
    }
    return (
      <TabBarBottom
        inactiveTintColor={inactiveTintColor}
        {...props}
        style={{ backgroundColor }}
      />
    )
  }
})

export default AppNavigator
