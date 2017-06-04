import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as Colors from '../../common/PyColors'
import I18n from '../../i18n'

function open (url) {
  Linking.openURL(url)
    .catch(err => console.error('Linking.openURL error:', err))
}

export default function Footer () {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Icon.Button
          name='twitter'
          size={30}
          backgroundColor='#1DA1F2'
          color={Colors.LIGHT_TEXT}
          onPress={() => { open('https://twitter.com/pycontw') }}
        >
          {I18n.t('Follow us on Twitter')}
        </Icon.Button>
      </View>
      <View style={styles.item}>
        <Icon.Button
          name='facebook'
          size={30}
          backgroundColor='#3B5998'
          color={Colors.LIGHT_TEXT}
          onPress={() => { open('https://www.facebook.com/pycontw') }}
        >
          {I18n.t('Like us on Facebook')}
        </Icon.Button>
      </View>
      <View style={styles.item}>
        <Icon.Button
          name='github'
          size={30}
          backgroundColor={Colors.LIGHT_BACKGROUND}
          color={Colors.DARK_TEXT}
          onPress={() => { open('https://github.com/pycontw/pycontw2016') }}
        >
          {I18n.t('Find PyConTW on Github')}
        </Icon.Button>
      </View>
      <View style={styles.item}>
        <Icon.Button
          name='code-fork'
          size={30}
          backgroundColor={Colors.primary.ACCENT_GREEN}
          color={Colors.DARK_TEXT}
          onPress={() => { open('https://github.com/weihanglo/pycontw-mobile') }}
        >
          {I18n.t('Fork this app on Github')}
        </Icon.Button>
      </View>
      <View style={styles.item}>
        <Icon.Button
          name='paper-plane'
          size={30}
          backgroundColor={Colors.secondary.ACCENT_ORANGE}
          color={Colors.DARK_TEXT}
          onPress={() => { open('mailto:organizers@pycon.tw') }}
        >
          {I18n.t('Send us a mail')}
        </Icon.Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection:
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    margin: 8
  }
})
