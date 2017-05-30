import React from 'react'
import PropTypes from 'prop-types'
import Svg, {Line, Defs, LinearGradient, Stop} from 'react-native-svg'

GradientLine.propTypes = {
  length: PropTypes.number,
  fromColor: PropTypes.string,
  toColor: PropTypes.string
}

export default function GradientLine ({
  length = 100,
  fromColor = '#00ff96',
  toColor = '#1697e5'
}) {
  return (
    <Svg height='2' width={length} viewbox='0 0 100 100'>
      <Defs>
        <LinearGradient id='grad' x1='0' y1='0' x2='250' y2='0'>
          <Stop offset='0' stopColor={fromColor} stopOpacity='1' />
          <Stop offset='1' stopColor={toColor} stopOpacity='1' />
        </LinearGradient>
      </Defs>
      <Line
        x1='0'
        y1='0'
        x2={length}
        y2='2'
        stroke='url(#grad)'
        strokeWidth='2'
      />
    </Svg>
  )
}
