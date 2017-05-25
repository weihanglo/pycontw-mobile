import React from 'react'
import {StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ScheduleList from '../containers/ScheduleList'
import Event from './Event'

function tabBarIcon ({tintColor}) { // eslint-disable-line
  return <Icon name='schedule' size={30} color={tintColor} />
}

class Schedule extends React.Component {
  static navigationOptions = {
    tabBarIcon
  }

  render () {
    return (
      <ScheduleList />
    )
  }
}

export default StackNavigator({
  ScheduleList: {screen: Schedule},
  Event: {screen: Event}
}, {
  initialRouteName: 'ScheduleList'
})
