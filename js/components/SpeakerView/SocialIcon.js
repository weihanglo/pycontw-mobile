import React from 'react'
import PropTypes from 'prop-types'
import {Linking, StyleSheet, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

SocialIcon.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  color: PropTypes.string
}

function linkToSocial ({type, payload}) {
  let url
  switch (type) {
    case 'facebook':
      url = `https://fb.me/${payload}`
      break
    case 'twitter':
      url = `https://twitter.com/${payload}`
      break
    case 'email':
      url = `mailto:${payload}`
      break
    case 'github':
      url = `https://github.com/${payload}`
      break
    default: break
  }
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.warn('Cannot handle url: ' + url)
        return
      }
      Linking.openURL(url)
    })
    .catch(err => console.error('An error occurred', err))
}

export default function SocialIcon ({type, info, color}) {
  let name
  let payload = info
  switch (type) {
    case 'facebook':
      name = 'facebook-official'
      payload = info.substring(info.lastIndexOf('/') + 1, info.length)
      break
    case 'twitter':
      name = 'twitter'
      break
    case 'email':
      name = 'paper-plane'
      break
    case 'github':
      name = 'github'
      break
    default: break
  }
  return (
    <TouchableHighlight
      style={styles.icon}
      underlayColor='#dddddd'
      onPress={() => linkToSocial({type, payload})}>
      <Icon size={25} name={name} color={color} />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
