import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import {Text, Heading4} from '../../common/PyText'
import Bookmark from '../../common/Bookmark'
import * as Colors from '../../common/PyColors'

Cell.propTypes = {
  beginTime: PropTypes.string,
  endTime: PropTypes.string,
  location: PropTypes.string,
  speakers: PropTypes.arrayOf(PropTypes.string),
  eventId: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  checked: PropTypes.bool,
  toggleCheck: PropTypes.func,
  style: ViewPropTypes.style
}

export default function Cell ({
    beginTime,
    endTime,
    eventId,
    checked,
    location,
    speakers,
    title,
    tags,
    toggleCheck,
    style,
    ...props
  }) {
  const locationStyle = {
    color: Colors.colorForLocation(location),
    fontWeight: 'bold'
  }

  return (
    <View style={[styles.container, style]} {...props}>
      <Heading4>{title}</Heading4>
      <View style={styles.infoWrapper}>
        <Text>
          {beginTime} - {endTime} @ <Text style={locationStyle}>{location}</Text>
        </Text>
        <Bookmark
          style={styles.bookmark}
          checked={checked}
          onPress={() => toggleCheck(eventId)}
        />
      </View>
      <View style={styles.tagWrapper}>
        {tags && tags.map(tag => {
          const style = {backgroundColor: Colors.colorForTag(tag)}
          return (
            <TouchableOpacity style={[styles.tag, style]} key={tag}>
              <Text style={{color: 'white'}}>{tag}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_BACKGROUND,
    backgroundColor: 'white'
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
    maxHeight: 30,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: 'center'
  }
})
