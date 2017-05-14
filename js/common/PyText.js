/* eslint-disable */

import React from 'react'
import {StyleSheet, Text as RNText} from 'react-native'
import PropTypes from 'prop-types'

import * as Colors from './PyColors'

export function Text ({style, ...props}) {
  return <RNText style={[styles.font, style]} {...props} />
}

export function Heading1 ({style, ...props}) {
  return <RNText style={[styles.font, styles.h1, style]} {...props} />
}

export function Paragraph ({style, ...props}) {
  return <RNText style={[styles.font, styles.p, style]} {...props} />
}

const styles = StyleSheet.create({
  font: {
    color: Colors.DARK_TEXT
  },
  h1: {
    fontSize: 24,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  p: {
    fontSize: 15,
    lineHeight: 23
  }
})
