import React from 'react'
import PropTypes from 'prop-types'
import {Image, StyleSheet, ScrollView, View, ViewPropTypes} from 'react-native'

import {Heading1, Paragraph} from '../../common/PyText'
import SocialIcon from './SocialIcon'

SpeakerView.propTypes = {
  speaker: PropTypes.shape(),
  style: ViewPropTypes.style
}

function getIcons ({email, facebookURL, githubId, twitterId}) {
  const icons = []
  email && icons.push(<SocialIcon type='email' info={email} />)
  facebookURL && icons.push(<SocialIcon type='facebook' info={facebookURL} />)
  twitterId && icons.push(<SocialIcon type='twitter' info={twitterId} />)
  githubId && icons.push(<SocialIcon type='github' info={githubId} />)
  return icons
}

export default function SpeakerView ({speaker, style, ...props}) {
  // Determine if biography field should scroll
  // const bio = speaker.bio && speaker.bio.trim()
  // let bioText = <Paragraph style={{textAlign: 'center'}}>{bio}</Paragraph>
  // if (bio.length < 150 || /(\n)/.exec(bio).length > 1) {
  //   bioText = <ScrollView style={styles.bioWrapper}>{bioText}</ScrollView>
  // }
  console.warn(JSON.stringify(props, null, 2));
  return (
    <View style={[styles.container, style]} {...props}>
      {/* <View style={styles.photoWrapper}>
        <Image style={styles.photo} source={{uri: speaker.photo_url}} />
      </View>
      <Heading1 style={styles.name}>{speaker.speaker_name}</Heading1>
      <View style={styles.iconWrapper}>
        {getIcons(speaker)}
      </View>
      <View style={styles.bioWrapper}>
        {bioText}
      </View> */}
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
