import React from 'react'
import {StackNavigator} from 'react-navigation'

import ScheduleList from '../containers/ScheduleList'
import EventView from '../containers/EventView'
import SpeakerView from '../containers/SpeakerView'

import Header from '../containers/ScheduleHeader'

export default StackNavigator({
  ScheduleList: {
    screen: ScheduleList,
    navigationOptions: {
      title: 'Schedule',
      header: (headerProps) => <Header />
    }
  },
  Event: {
    screen: EventView,

    navigationOptions: {
      title: 'Schedule',
      header: (headerProps) => (
        <Header />
      )
    }
  },
  Speaker: {screen: SpeakerView}
}, {
  initialRouteName: 'ScheduleList'
})
