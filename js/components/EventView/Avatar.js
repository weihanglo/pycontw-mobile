import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import {SmallText} from '../../common/PyText'
import Avatar from '../../common/Avatar'

EventAvatar.propTypes = {
  speakers: PropTypes.array,
  showSpeaker: PropTypes.func,
  style: ViewPropTypes.style
}

export default function EventAvatar ({speakers, style, showSpeaker, ...props}) {
  return (
    <View style={[styles.container, style]} {...props}>
      {speakers.map((speaker, idx) => (
        <TouchableOpacity
          onPress={() => showSpeaker(speaker.name)}
          style={{flex: 1}}
          key={speaker.name}
        >
          <View style={styles.avatarWrapper}>
            <Avatar size={100} uri={speaker.photoURL} text={speaker.name} />
            <View>
              <SmallText
                numberOfLines={speaker.name.length > 12 ? 3 : 2}
                style={styles.avatarText}>
                {speaker.name}
              </SmallText>
            </View>
          </View>
        </TouchableOpacity>
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
    paddingTop: 3,
    textDecorationLine: 'underline'
  }
})
