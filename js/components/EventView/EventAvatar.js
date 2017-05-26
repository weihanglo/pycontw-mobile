import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, ViewPropTypes} from 'react-native'

import {SmallText} from '../../common/PyText'
import Avatar from '../../common/Avatar'

EventAvatar.propTypes = {
  speakers: PropTypes.array,
  style: ViewPropTypes.style
}

export default function EventAvatar ({speakers, style, ...props}) {
  const randomAvatar = 'https://api.adorable.io/avatars/50/'
  return (
    <View style={[styles.container, style]} {...props}>
      {speakers.map((speaker, idx) => (
        <View key={speaker.name} style={styles.avatarWrapper}>
          <Avatar uri={`${randomAvatar}${speaker.name}`} />
          <View style={{width: `${100 / speakers.length}%`}}>
            <SmallText
              numberOfLines={speaker.name.length > 12 ? 3 : 2}
              style={styles.avatarText}>
              {speaker.name}
            </SmallText>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 3
  }
})
