import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'

import {SmallText} from '../../common/PyText'
import Avatar from '../../common/Avatar'

TalkAvatar.propTypes = {
  style: PropTypes.shape(),
  speakers: PropTypes.arrayOf(PropTypes.shape())
}

export default function TalkAvatar ({style, speakers, ...props}) {
  return (
    <View style={[styles.container, style]} {...props}>
      {speakers.map((speaker, idx) => (
        <View key={speaker.speaker_name} style={styles.avatarWrapper}>
          <Avatar
            uri={`https://api.adorable.io/avatars/50/${speaker.speaker_name}`}
          />
          <View style={{width: `${100 / speakers.length}%`}}>
            <SmallText
              numberOfLines={speaker.speaker_name.length > 12 ? 3 : 2}
              style={styles.avatarText}>
              {speaker.speaker_name}
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
