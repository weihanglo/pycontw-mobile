import React from 'react'
import PropTypes from 'prop-types'
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  WebView as RNWebView,
  ViewPropTypes
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as Colors from './PyColors'
import Logo from './PyLogo'
import Header from './PyHeader'
import {LargeText} from './PyText'
import I18n from '../i18n'

function openInBrowser (url) {
  Linking.openURL(url)
    .catch(err => console.error('Linking.openURL error:', err))
}
WebView.propTypes = {
  source: PropTypes.object.isRequired,
  headerProps: PropTypes.object,
  onDone: PropTypes.func.isRequired,
  style: ViewPropTypes.style
}

export default function WebView ({
  source,
  onDone,
  headerProps,
  style,
  ...props
}) {
  const leftItem = (
    <TouchableOpacity onPress={onDone}>
      <LargeText style={styles.leftItem}>{I18n.t('Done')}</LargeText>
    </TouchableOpacity>
  )

  const centerItem = (
    <View style={styles.centerItem}>
      <Logo color={Colors.LIGHT_TEXT} />
    </View>
  )

  const rightItem = (
    <TouchableOpacity onPress={() => openInBrowser(source.uri)}>
      <Icon
        name={Platform.OS === 'ios' ? 'safari' : 'chrome'}
        size={30}
        color={Colors.LIGHT_TEXT}
      />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, style]}>
      <Header
        leftItem={leftItem}
        centerItem={centerItem}
        rightItem={rightItem}
        style={{backgroundColor: Colors.primary.MIDDLE_BLUE}}
        isModal
        {...headerProps}
      />
      <RNWebView source={source} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  leftItem: {
    color: Colors.LIGHT_TEXT
  },
  centerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
