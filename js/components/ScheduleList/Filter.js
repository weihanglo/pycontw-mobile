import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import Header from '../../common/PyHeader'
import {Text} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

Filter.propTypes = {
  headerBackgroundColor: PropTypes.string,
  onPressDone: PropTypes.func,
  style: ViewPropTypes.style
}

export default function Filter ({
  headerBackgroundColor,
  onPressReset,
  onPressDone,
  style,
  ...props
}) {
  const leftItem = (
    <TouchableOpacity onPress={onPressReset}>
      <Text style={styles.item}>Reset</Text>
    </TouchableOpacity>
  )
  const rightItem = (
    <TouchableOpacity onPress={onPressDone}>
      <Text style={styles.item}>Done</Text>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, style]}>
      <Header
        leftItem={leftItem}
        centerItem='Filter'
        rightItem={rightItem}
        titleColor={Colors.LIGHT_TEXT}
        style={{backgroundColor: headerBackgroundColor}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    color: Colors.LIGHT_TEXT
  }
})
