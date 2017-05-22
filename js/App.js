import React from 'react'
import {View, StyleSheet} from 'react-native'

import ScheduleList from './containers/ScheduleList'

export default class extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <ScheduleList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
