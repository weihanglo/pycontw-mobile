import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  ViewPropTypes
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import * as Colors from '../../common/PyColors'

export default class extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    checked: PropTypes.bool,
    size: PropTypes.number,
    style: ViewPropTypes.style
  }

  static defaultProps = {
    onPress: null,
    checked: false,
    size: 60
  }

  state = {
    checked: false,
    rotateAnim: new Animated.Value(0)
  }

  componentWillReceiveProps ({checked}) {
    if (checked === this.state.checked) {
      return
    }

    this.setState((prevState, props) => {
      const toValue = prevState.checked ? 0 : 1
      const duration = 250
      Animated.timing(this.state.rotateAnim, {toValue, duration}).start()
      return {checked}
    })
  }

  render () {
    const {onPress, size, style, ...props} = this.props

    // Dynamic styling & animations
    const wrapperStyle = {width: size, height: size, borderRadius: size * 0.3}
    const transform = [{
      rotate: this.state.rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-45deg', '0deg']
      })
    }]
    const backgroundColor = this.state.rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.LIGHT_BACKGROUND, Colors.primary.LIGHT_BLUE]
    })
    const opacityClose = this.state.rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.container, style]}
        underlayColor={null}
        {...props}
      >
        <Animated.View style={[wrapperStyle, {backgroundColor}]}>
          <Animated.View
            style={[styles.icon, {transform, opacity: opacityClose}]}
          >
            <Icon name='close' size={size / 1.5} />
          </Animated.View>
          <Animated.View
            style={[styles.icon, {transform, opacity: this.state.rotateAnim}]}
          >
            <Icon name='check' size={size / 1.5} />
          </Animated.View>
        </Animated.View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
