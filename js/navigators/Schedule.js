import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as Colors from '../common/PyColors'
import {SmallText} from '../common/PyText'
import ScheduleList from '../containers/ScheduleList'
import EventView from '../containers/EventView'

const Schedule = StackNavigator({
  ScheduleList: {
    screen: ScheduleList
  },
  Event: {
    screen: EventView
  }
}, {
  initialRouteName: 'ScheduleList',
  headerMode: 'none'
})

Schedule.navigationOptions = ({navigation: {state}}) => {
  const color = Colors.colorForRoute(state.routeName)
  return {
    tabBarIcon: ({focused, tintColor}) => ( // eslint-disable-line
      <Icon
        name='schedule'
        size={30}
        color={focused ? color : tintColor}
      />
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

export default Schedule
