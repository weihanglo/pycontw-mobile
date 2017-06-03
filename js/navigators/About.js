import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as Colors from '../common/PyColors'
import {SmallText} from '../common/PyText'
import AboutView from '../components/AboutView'

const About = StackNavigator({
  AboutView: {
    screen: AboutView
  }
}, {
  initialRouteName: 'AboutView',
  headerMode: 'none'
})

About.navigationOptions = ({navigation: {state}}) => {
  const color = Colors.colorForRoute(state.routeName)
  return {
    tabBarIcon: ({focused, tintColor}) => ( // eslint-disable-line
      <Icon name='info-outline' size={30} color={focused ? color : tintColor} />
    ),
    tabBarLabel: ({focused, tintColor}) => ( // eslint-disable-line
      <SmallText
        style={{textAlign: 'center', color: focused ? color : tintColor}}
        allowFontScaling={false}
      >
        {state.routeName}
      </SmallText>
    )
  }
}

About.tabBarOptions = {
  style: {
    backgroundColor: 'blue'
  }
}

export default About
