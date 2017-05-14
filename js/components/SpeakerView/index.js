import React from 'react'
import PropTypes from 'prop-types'
import {Image, View, StyleSheet, ScrollView} from 'react-native'

import {Heading1, Paragraph} from '../../common/PyText'
import SocialIcon from './SocialIcon'

SpeakerView.propTypes = {
  speaker: PropTypes.shape(),
  style: PropTypes.shape()
}

function getIcons ({email, facebook_profile_url, github_id, twitter_id}) {
  const icons = []
  /* eslint-disable */
  email && icons.push(<SocialIcon type='email' info={email} />)
  facebook_profile_url && icons.push(
    <SocialIcon type='facebook' info={facebook_profile_url} />
  )
  twitter_id && icons.push(<SocialIcon type='twitter' info={twitter_id} />)
  github_id && icons.push(<SocialIcon type='github' info={github_id} />)
  /* eslint-enable */
  return icons
}

export default function SpeakerView ({speaker, style, ...props}) {
  // Determine if biography field should scroll
  const bio = speaker.bio && speaker.bio.trim()
  let bioText = <Paragraph style={{textAlign: 'center'}}>{bio}</Paragraph>
  if (bio.length < 150 || /(\n)/.exec(bio).length > 1) {
    bioText = <ScrollView style={styles.bioWrapper}>{bioText}</ScrollView>
  }

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.photoWrapper}>
        <Image style={styles.photo} source={{uri: speaker.photo_url}} />
      </View>
      <Heading1 style={styles.name}>{speaker.speaker_name}</Heading1>
      <View style={styles.iconWrapper}>
        {getIcons(speaker)}
      </View>
      <View style={styles.bioWrapper}>
        {bioText}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center'
  },
  photoWrapper: {
    flex: 1,
    flexBasis: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover'
  },
  name: {
    textAlign: 'center'
  },
  iconWrapper: {
    paddingVertical: 8,
    flexDirection: 'row',
    width: 200
  },
  bioWrapper: {
    overflow: 'hidden',
    flex: 3,
    padding: 4,
    width: '100%',
    backgroundColor: 'hsl(0, 0%, 97%)'
  }
})
