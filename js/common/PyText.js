import React from 'react'
import {StyleSheet, Text as RNText} from 'react-native'

import * as Colors from './PyColors'

export function Text ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, style]} {...props} />
}

export function Heading1 ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.h1, style]} {...props} />
}

export function Paragraph ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.p, style]} {...props} />
}

export function SmallText ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.small, style]} {...props} />
}

function getHeadingStyles ({prefix = 'heading', otherStyles}) {
  const styles = {}
  ;[1, 2, 3, 4, 5, 6].forEach(i => {
    const fontSize = 26 - 2 * Math.min(i, 4)
    const lineHeight = fontSize * 1.375
    const fontWeight = 'bold'
    styles[`${prefix}${i}`] = {fontSize, lineHeight, fontWeight, ...otherStyles}
  })
  return styles
}

const headingStyles = getHeadingStyles({prefix: 'h'})

const styles = StyleSheet.create({
  ...headingStyles,
  font: {
    color: Colors.LIGHT_TEXT
  },
  p: {
    fontSize: 15,
    lineHeight: 23
  },
  small: {
    fontSize: 12,
    lineHeight: 17
  }
})
