import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as Colors from '../../common/PyColors'
import {Text} from '../../common/PyText'

Cell.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  onPress: PropTypes.func
}

export default function Cell ({onPress, title, link}) {
  return (
    <TouchableHighlight onPress={() => onPress(link)}>
      <View style={styles.container}>
        <Text style={styles.text} key={title}>{title}</Text>
        <Icon
          style={styles.icon}
          name='angle-right'
          size={36} color={Colors.LIGHT_TEXT}
        />
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.DARK_BLUE
  },
  icon: {
    marginLeft: 'auto',
    paddingRight: 8
  },
  text: {
    fontSize: 18,
    padding: 8,
    color: Colors.LIGHT_TEXT
  }
})
