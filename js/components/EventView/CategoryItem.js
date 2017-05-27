import React from 'react'
import PropTypes from 'prop-types'
import {
  Linking,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Text} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

CategoryItem.propTypes = {
  size: PropTypes.number,
  icon: PropTypes.string,
  tag: PropTypes.string,
  text: PropTypes.string,
  isLink: PropTypes.bool
}

function renderText (text, fontSize, onPress) {
  const style = {fontSize}
  if (onPress) {
    style.color = Colors.secondary.DARK_BLUE
  }
  const textNode = (
    <Text style={style} numberOfLines={1} ellipsizeMode='tail'>
      {text}
    </Text>
  )

  if (onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor={Colors.secondary.MIDDLE_BLUE}
        style={{borderRadius: 5, overflow: 'hidden'}}
      >
        <View>{textNode}</View>
      </TouchableHighlight>
    )
  }

  return textNode
}

function onPress (url) {
  Linking.openURL(url)
    .catch(err => console.error('Linking.openURL error:', err))
}

export default function CategoryItem ({size = 28, icon, tag, text, isLink}) {
  const dim = {width: size, height: size, borderRadius: size / 2}
  const fontSize = size / 8 * 5
  const color = Colors.primary.DARK_BLUE

  return (
    <View style={styles.tagItem}>
      <View style={[styles.tag, dim]}>
        {icon
          ? <Icon name={icon} size={fontSize} color={color} />
          : <Text style={{color, fontSize}}>{tag}</Text>
        }
      </View>
      <View style={styles.textWrapper}>
        {renderText(text, fontSize, isLink ? () => onPress(text) : null)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tagItem: {
    flexDirection: 'row',
    paddingVertical: 3
  },
  tag: {
    backgroundColor: Colors.secondary.LIGHT_BLUE,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    right: 0
  }
})
