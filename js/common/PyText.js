import React from 'react'
import {StyleSheet, Text as RNText} from 'react-native'

import * as Colors from './PyColors'

export function Text ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, style]} {...props} />
}

export function Heading1 ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.h1, style]} {...props} />
}

export function Heading2 ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.h2, style]} {...props} />
}

export function Heading3 ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.h3, style]} {...props} />
}

export function Heading4 ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.h4, style]} {...props} />
}

export function Heading5 ({style, ...props}) { // eslint-disable-line
  return <RNText style={[styles.font, styles.h5, style]} {...props} />
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
    const fontSize = 28 - 2 * i
    const lineHeight = Math.round(fontSize * 1.375)
    const fontWeight = 'bold'
    styles[`${prefix}${i}`] = {fontSize, lineHeight, fontWeight, ...otherStyles}
  })
  return styles
}

const headingStyles = getHeadingStyles({prefix: 'h'})

const styles = StyleSheet.create({
  ...headingStyles,
  font: {
    color: Colors.DARK_TEXT
  },
  p: {
    fontSize: 15,
    lineHeight: 24
  },
  small: {
    fontSize: 12,
    lineHeight: 17
  }
})
