import React from 'react'
import PropTypes from 'prop-types'
import {Image, StyleSheet, ScrollView, View, ViewPropTypes} from 'react-native'

import Avatar from '../../common/Avatar'
import {Heading1, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import SocialIcon from './SocialIcon'

SpeakerView.propTypes = {
  bio: PropTypes.string,
  email: PropTypes.string,
  facebookURL: PropTypes.string,
  githubId: PropTypes.string,
  name: PropTypes.string,
  photoURL: PropTypes.string,
  twitterId: PropTypes.string,
  style: ViewPropTypes.style
}

export default function SpeakerView ({
  bio,
  email,
  facebookURL,
  githubId,
  name,
  photoURL,
  twitterId,
  style,
  ...props
}) {
  // Determine if biography field should scroll
  const bioText = bio && bio.trim()
  let bioP = <Paragraph style={{textAlign: 'center'}}>{bioText}</Paragraph>
  const newlines = /(\n)/.exec(bioText)
  const newlineCountExceeded = newlines && newlines.lenght > 1
  if (bioText.length > 150 || newlineCountExceeded) {
    bioP = <ScrollView style={styles.bioWrapper}>{bioP}</ScrollView>
  }

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.photoWrapper}>
        <Avatar size={120} uri={photoURL} text={name} />
      </View>
      <Heading1 style={styles.name}>{name}</Heading1>
      <View style={styles.iconWrapper}>
        {!!email && <SocialIcon type='email' info={email} />}
        {!!facebookURL && <SocialIcon type='facebook' info={facebookURL} />}
        {!!twitterId && <SocialIcon type='twitter' info={twitterId} />}
        {!!githubId && <SocialIcon type='github' info={githubId} />}
      </View>
      <View style={styles.bioWrapper}>
        {bioP}
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
    width: '100%'
  }
})
