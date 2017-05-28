import React from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import {Heading4} from './PyText'

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const ItemWrapper = ({children}) => ( // eslint-disable-line
  <View style={styles.itemWrapper}>
    {children}
  </View>
)

export default class PyHeader extends React.Component {
  static propTypes = {
    leftItem: PropTypes.element,
    centerItem: PropTypes.node,
    rightItem: PropTypes.element,
    titleColor: PropTypes.string,
    style: ViewPropTypes.style
  }
  render () {
    const {
      leftItem,
      centerItem,
      rightItem,
      titleColor,
      style,
      ...props
    } = this.props

    let content = centerItem
    if (typeof centerItem === 'string') {
      content = (
        <Heading4 style={{color: titleColor}} numberOfLines={1}>
          {content}
        </Heading4>
      )
    }

    return (
      <View style={[styles.container, style]} {...props}>
        <View style={styles.leftItem}>
          <ItemWrapper>{leftItem}</ItemWrapper>
        </View>
        <View style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapper>{rightItem}</ItemWrapper>
        </View>
      </View>
    )
  }
}

PyHeader.BackButton = function ({...props}) {
  return (
    <TouchableOpacity>
      <FontAwesomeIcon {...props} name='angle-left' size={36} />
    </TouchableOpacity>
  )
}

PyHeader.ShareButton = function ({...props}) {
  const name = Platform.OS === 'ios' ? 'share-apple' : 'share-google'
  return (
    <TouchableOpacity>
      <EvilIcon {...props} name={name} size={36} />
    </TouchableOpacity>
  )
}

PyHeader.MapButton = function ({...props}) {
  return (
    <TouchableOpacity>
      <FontAwesomeIcon {...props} name='map' size={25} />
    </TouchableOpacity>
  )
}

PyHeader.FilterButton = function ({onPress, ...props}) { // eslint-disable-line
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcon {...props} name='filter-list' size={25} />
    </TouchableOpacity>
  )
}

const BUTTON_SIZE = 50

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BUTTON_SIZE + (Platform.OS === 'ios' ? 20 : 0),
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftItem: {
    flex: 3,
    alignItems: 'flex-start'
  },
  centerItem: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightItem: {
    flex: 3,
    alignItems: 'flex-end'
  },
  itemWrapper: {
    padding: 12
  }
})
