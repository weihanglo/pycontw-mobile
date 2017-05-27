import React from 'react'
import {TabNavigator, TabBarBottom} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as Colors from '../common/PyColors'
import About from './About'
import Home from './Home'
import Schedule from './Schedule'

const AppNavigator = TabNavigator({
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => ( // eslint-disable-line
        <Icon name='schedule' size={30} color={tintColor} />
      )
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => ( // eslint-disable-line
        <Icon name='face' size={30} color={tintColor} />
      )
    }
  },
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
