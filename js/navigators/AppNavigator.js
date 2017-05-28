import React from 'react'
import {TabNavigator, TabBarBottom} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as Colors from '../common/PyColors'
import About from './About'
import My from './My'
import Schedule from './Schedule'

const AppNavigator = TabNavigator({
  Schedule: {screen: Schedule},
  My: {screen: My},
  About: {
    screen: About,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => ( // eslint-disable-line
        <Icon name='info-outline' size={30} color={tintColor} />
      )
    }
  }
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
    showIcon: true
  }
})

export default AppNavigator
