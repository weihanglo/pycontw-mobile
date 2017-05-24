import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, ViewPropTypes} from 'react-native'

import {Text, Heading4} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Bookmark from './Bookmark'

Cell.propTypes = {
  beginTime: PropTypes.string,
  endTime: PropTypes.string,
  location: PropTypes.string,
  speakers: PropTypes.arrayOf(PropTypes.string),
  detailId: PropTypes.string,
  title: PropTypes.string,
  // TODO: handle this prop
  // type: PropTypes.string
  tags: PropTypes.arrayOf(PropTypes.string),
  checked: PropTypes.bool,
  style: ViewPropTypes.style
}

export default function Cell ({
    beginTime,
    endTime,
    detailId,
    checked,
    location,
    speakers,
    title,
    tags,
    style,
    ...props
  }) {
  const locationColor = {color: Colors.colorForLocation(location)}

  return (
    <View style={[styles.container, style]} {...props}>
      <Heading4>{title}</Heading4>
      <View style={styles.infoWrapper}>
        <Text>
          {beginTime} - {endTime} @ <Text style={locationColor}>{location}</Text>
        </Text>
        <Bookmark style={styles.bookmark} size={30} checked={checked} />
      </View>
      <View style={styles.tagWrapper}>
        {tags && tags.map(tag => {
          // TODO: map tag (category) to correspondent color
          const style = {backgroundColor: 'green'}
          return (
            <View style={[styles.tag, style]} key={tag}>
              <Text style={{color: Colors.LIGHT_TEXT}}>{tag}</Text>
            </View>
          )
        })}
      </View>
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
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bookmark: {
    padding: 10
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: -3
  },
  tag: {
    margin: 3,
    maxHeight: 25,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: 'center'
  }
})
