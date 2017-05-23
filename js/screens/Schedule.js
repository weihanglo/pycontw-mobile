import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ScheduleList from '../containers/ScheduleList'

function tabBarIcon ({tintColor}) { // eslint-disable-line
  return <Icon name='schedule' size={30} color={tintColor} />
}

export default class extends React.Component {
  static navigationOptions = {
    tabBarIcon
  }

  render () {
    return (
      <ScheduleList />
    )
  }
}
