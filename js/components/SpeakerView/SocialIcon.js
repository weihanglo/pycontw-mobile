import React from 'react'
import PropTypes from 'prop-types'
import {Linking, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as Colors from '../../common/PyColors'

SocialIcon.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  openBrowser: PropTypes.func,
  color: PropTypes.string
}

function directOpen (url) {
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

function linkToSocial ({type, payload, openBrowser}) {
  let url
  switch (type) {
    case 'facebook':
      url = `https://fb.me/${payload}`
      break
    case 'twitter':
      url = `https://twitter.com/${payload}`
      break
    case 'github':
      url = `https://github.com/${payload}`
      break
    case 'website':
      url = payload
      break
    case 'email':
      directOpen(`mailto:${payload}`)
      return // return!!!!
    default: break
  }
  openBrowser(url)
}

export default function SocialIcon ({
  type,
  info,
  color = Colors.DARK_TEXT,
  openBrowser
}) {
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
    case 'website':
      name = 'home'
      break
    default: break
  }
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => linkToSocial({type, payload, openBrowser})}>
      <Icon size={25} name={name} color={color} />
    </TouchableOpacity>
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
