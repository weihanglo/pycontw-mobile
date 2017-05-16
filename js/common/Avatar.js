import React from 'react'
import PropTypes from 'prop-types'
import {View, Image} from 'react-native'

Avatar.propTypes = {
  size: PropTypes.number,
  uri: PropTypes.string.isRequired,
  style: PropTypes.shape()
}

export default function Avatar ({size = 50, uri, style, ...props}) {
  const styles = {
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      borderWidth: 1
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
