import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

function tabBarIcon ({tintColor}) { // eslint-disable-line
  return <Icon name='face' size={30} color={tintColor} />
}

export default class extends React.Component {
  static navigationOptions = {
    tabBarIcon
  }

  render () {
    return (
      <View />
    )
  }
}
