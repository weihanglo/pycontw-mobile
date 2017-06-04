import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as Colors from '../common/PyColors'
import {SmallText} from '../common/PyText'
import ScheduleList from '../containers/MyScheduleList'
import EventView from '../containers/EventView'
import I18n from '../i18n'

const My = StackNavigator({
  MyScheduleList: {
    screen: ScheduleList
  },
  MyEvent: {
    screen: EventView
  }
}, {
  initialRouteName: 'MyScheduleList',
  headerMode: 'none'
})

My.navigationOptions = ({navigation: {state}}) => {
  const color = Colors.colorForRoute(state.routeName)
  return {
    tabBarIcon: ({focused, tintColor}) => ( // eslint-disable-line
      <Icon name='face' size={30} color={focused ? color : tintColor} />
    ),
    tabBarLabel: ({focused, tintColor}) => ( // eslint-disable-line
      <SmallText
        style={{textAlign: 'center', color: focused ? color : tintColor}}
        allowFontScaling={false}
      >
        {I18n.t('My PyCon')}
      </SmallText>
    )
  }
}

export default My
