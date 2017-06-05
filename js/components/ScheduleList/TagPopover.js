import React from 'react'
import PropTypes from 'prop-types'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'

import {LargeText} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import categoryMapping from '../../i18n/categoryMapping'

export default class extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    point: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    onDone: PropTypes.func
  }

  state = {
    layout: null,
    didLayout: false
  }

  _timeout

  _onLayout = ({nativeEvent: {layout}}) => {
    if (!this.state.didLayout) {
      this.setState({layout, didLayout: true})
    }
  }

  _getNewLayout = () => {
    const {width, height} = Dimensions.get('window')
    const {tag, point: {x, y}} = this.props
    const {layout} = this.state

    const h = layout.height / 2
    const remain = width - layout.width - layout.x
    const w = 0 + Math.max(0, -remain)

    return {
      top: `${(y - h) / height * 100}%`,
      left: `${(x - w) / width * 100}%`,
      backgroundColor: Colors.colorForTag(tag)
    }
  }

  _getPreLayout = () => {
    const {width, height} = Dimensions.get('window')
    const {point: {x, y}} = this.props

    return {
      top: `${y / height * 100}%`,
      left: `${x / width * 100}%`,
      opacity: 0
    }
  }

  componentDidMount () {
    this._timeout = setTimeout(() => {
      this.props.onDone()
    }, 3000)
  }
  componentWillUnmount () {
    clearTimeout(this._timeout)
  }

  render () {
    const {tag, onDone} = this.props
    const style = this.state.layout
      ? this._getNewLayout()
      : this._getPreLayout()

    const description = categoryMapping[tag]
    const shadowProps = {
      shadowColor: 'hsl(0, 0%, 0%)',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.4,
      shadowRadius: 12
    }

    return (
      <View style={[styles.container, {backgroundColor: 'transparent'}]}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          focusedOpacity={1}
          onPress={onDone}
        />
        <View
          onLayout={this._onLayout}
          style={[styles.popover, style]}
          {...shadowProps}
        >
          <LargeText style={styles.text}>{description}</LargeText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popover: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    elevation: 2
  },
  text: {
    color: 'white'
  }
})
