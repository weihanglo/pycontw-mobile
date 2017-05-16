import React from 'react'
import PropTypes from 'prop-types'
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native'

import * as Colors from './PyColors'
import {Heading4} from './PyText'

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

export default class PyHeader extends React.Component {
  static propTypes = {
    leftItem: PropTypes.element,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    rightItem: PropTypes.element,
    onPageChange: PropTypes.func,
    style: PropTypes.shape()
  }
  render () {
    const {
      leftItem,
      title,
      titleColor,
      rightItem,
      style,
      onPageChange,
      ...props
    } = this.props

    return (
      <View style={[styles.container, style]} {...props}>
        <View style={[styles.item, {marginRight: 'auto'}]}>
          {leftItem}
        </View>
        <Heading4 style={[styles.scenetitle, {color: titleColor}]}>
          {title}
        </Heading4>
        <View style={[styles.item, {marginLeft: 'auto'}]}>
          {rightItem}
        </View>
      </View>
    )
  }
}

PyHeader.BackButton = function ({...props}) {
  return (
    <TouchableOpacity {...props}>
      <FontAwesomeIcon {...props} name='angle-left' size={36} />
    </TouchableOpacity>
  )
}

PyHeader.ShareButton = function ({...props}) {
  const name = Platform.OS === 'ios' ? 'share-apple' : 'share-google'
  return (
    <TouchableOpacity {...props}>
      <EvilIcon {...props} name={name} size={36} />
    </TouchableOpacity>
  )
}

PyHeader.MapButton = function ({...props}) {
  return (
    <TouchableOpacity {...props}>
      <FontAwesomeIcon {...props} name='map' size={25} />
    </TouchableOpacity>
  )
}

PyHeader.FilterButton = function ({...props}) {
  return (
    <TouchableOpacity {...props}>
      <FontAwesomeIcon {...props} name='filter' size={25} />
    </TouchableOpacity>
  )
}

const BUTTON_SIZE = 44

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BUTTON_SIZE + 20,
    paddingTop: 20,
    backgroundColor: Colors.secondary.ACCENT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scenetitle: {
    color: Colors.secondary.BACKGROUND
  },
  item: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
