import React from 'react'
import PropTypes from 'prop-types'
import {Image, View, ViewPropTypes} from 'react-native'

import * as Colors from './PyColors'

Avatar.propTypes = {
  size: PropTypes.number,
  uri: PropTypes.string.isRequired,
  style: ViewPropTypes.style
}

export default function Avatar ({size = 50, uri, style, ...props}) {
  const styles = {
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: Colors.LIGHT_BACKGOURND
    },
    image: {
      width: size,
      height: size,
      resizeMode: 'cover'
    }
  }
  return (
    <View style={[styles.container, style]} {...props}>
      <Image style={styles.image} source={{uri}} />
    </View>
  )
}
