import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class MyTabBarIcon extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    count: PropTypes.number,
    size: PropTypes.number
  }

  state = {
    animValue: new Animated.Value(0)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.count < this.props.count) {
      if (Platform.OS === 'ios') {
        this._bounceIOS()
      } else {
        this._shakeAndroid()
      }
    }
  }

  _bounceIOS () {
    const {timing} = Animated
    Animated.sequence([
      timing(this.state.animValue, {
        toValue: 1,
        easing: Easing.exp,
        duration: 250
      }),
      timing(this.state.animValue, {
        toValue: 0,
        easing: Easing.bounce,
        duration: 200
      })
    ]).start()
  }

  _shakeAndroid () {
    const {timing} = Animated
    Animated.sequence([
      timing(this.state.animValue, {
        toValue: 1,
        easing: Easing.bounce,
        duration: 100
      }),
      timing(this.state.animValue, {
        toValue: -1,
        easing: Easing.bounce,
        duration: 100
      }),
      timing(this.state.animValue, {
        toValue: 1,
        easing: Easing.bounce,
        duration: 100
      }),
      timing(this.state.animValue, {
        toValue: -1,
        easing: Easing.bounce,
        duration: 100
      }),
      timing(this.state.animValue, {
        toValue: 0,
        easing: Easing.bounce,
        duration: 200
      })
    ]).start()
  }

  _transformInterpolate () {
    if (Platform.OS === 'ios') {
      return [{
        translateY: this.state.animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -12]
        })
      }]
    }

    return [{
      translateX: this.state.animValue.interpolate({
        inputRange: [-1, 1],
        outputRange: [-4, 4]
      })
    }]
  }

  render () {
    const {color, count, size} = this.props

    const shadowProps = {
      shadowColor: 'hsl(0, 0%, 0%)',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 15
    }

    const transform = this._transformInterpolate()

    return (
      <View>
        <Icon name='face' size={size} color={color} />
        {count > 0 && (
          <Animated.View style={[styles.badge, {transform, ...shadowProps}]}>
            <Icon name='heart' size={22} color='red' />
            <Text style={styles.text} allowFontScaling={false}>
              {count}
            </Text>
          </Animated.View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 0,
    right: -8,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 10,
    top: 4
  }
})

const mapStateToProps = ({favoriteEvents}) => ({
  count: Object.keys(favoriteEvents).length
})

export default connect(mapStateToProps)(MyTabBarIcon)
