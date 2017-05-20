import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native'

import {Text, Heading4} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

Cell.propTypes = {
  beginTime: PropTypes.string,
  endTime: PropTypes.string,
  location: PropTypes.string,
  speakers: PropTypes.arrayOf(PropTypes.string),
  detailId: PropTypes.string,
  title: PropTypes.string,
  // TODO: handle this
  // type: PropTypes.string
  tags: PropTypes.arrayOf(PropTypes.string),
  checked: PropTypes.bool,
  style: PropTypes.object
}

export default function Cell ({
    beginTime,
    endTime,
    location,
    speakers,
    detailId,
    title,
    tags,
    checked,
    style,
    ...props
  }) {
  const locationColor = {color: Colors.colorForLocation(location)}
  return (
    <View style={[styles.container, style]} {...props}>
      <Heading4 style={styles.title}>{title}</Heading4>
      <Text>
        {beginTime} - {endTime} @ <Text style={locationColor}>{location}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_BACKGROUND
  },
  title: {
    // marginRight: '20%',
    paddingBottom: 8,
    textAlign: 'justify'
  }
})
