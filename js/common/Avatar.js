import React from 'react'
import PropTypes from 'prop-types'
import {Image, Text, View, ViewPropTypes} from 'react-native'

Avatar.propTypes = {
  size: PropTypes.number,
  uri: PropTypes.string,
  text: PropTypes.string,
  style: ViewPropTypes.style
}

export default function Avatar ({size = 50, uri, text, style, ...props}) {
  const code = text &&
    (text.charCodeAt(0) * 10 + text.charCodeAt(text.length - 1)) % 255
  const backgroundColor = `hsl(${code}, 50%, 50%)`
  const firstChar = text && text.charAt(0).toUpperCase()
  const styles = {
    container: {
      width: size,
      height: size,
      backgroundColor,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      borderRadius: size / 2,
      width: size,
      height: size,
      resizeMode: 'cover'
    },
    text: {
      position: 'absolute',
      fontSize: size * 0.6
    }
  }

  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={styles.text}>{firstChar}</Text>
      <Image style={styles.image} source={{uri}} />
    </View>
  )
}
