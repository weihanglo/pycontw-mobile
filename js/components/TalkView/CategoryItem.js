import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import {Text} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

CategoryItem.propTypes = {
  size: PropTypes.number,
  icon: PropTypes.string,
  tag: PropTypes.string,
  text: PropTypes.string
}

export default function CategoryItem ({size = 28, icon, tag, text}) {
  const dim = {
    width: size,
    height: size,
    borderRadius: size / 2
  }
  const fontSize = size / 8 * 5
  const color = Colors.primary.BACKGROUND
  return (
    <View style={styles.tagItem}>
      <View style={[styles.tag, dim]}>
        {icon
          ? <Icon name={icon} size={fontSize} color={color} />
          : <Text style={{color, fontSize}}>{tag}</Text>
        }
      </View>
      <View style={styles.text}>
        <Text style={{fontSize}}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tagItem: {
    flexDirection: 'row',
    paddingVertical: 3
  },
  tag: {
    backgroundColor: Colors.secondary.FOREGROUND,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
