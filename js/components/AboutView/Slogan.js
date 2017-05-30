import React from 'react'
import PropTypes from 'prop-types'
import {Platform} from 'react-native'
import Svg, {LinearGradient, Text, Defs, Stop} from 'react-native-svg'

Slogan.propTypes = {
  fontSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default function Slogan ({fontSize = 32, width = 250, height = 50}) {
  return (
    <Svg width={width} height={height} viewbox='0 0 250 50'>
      <Defs>
        <LinearGradient id='grad' x1='0' y1='0' x2='250' y2='0'>
          <Stop offset='0' stopColor='#fbda61' stopOpacity='1' />
          <Stop offset='1' stopColor='#f75b1c' stopOpacity='1' />
        </LinearGradient>
      </Defs>
      <Text
        fontSize={fontSize}
        fontWeight='bold'
        fontFamily={Platform.OS === 'ios' ? 'Courier New' : 'monospace'}
        fontStyle='italic'
        fill='url(#grad)'
      >
        def future():
      </Text>
    </Svg>
  )
}
