// This presentational + container component
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ViewPropTypes
} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import * as Colors from './PyColors'
import {Heading1} from './PyText'
import Header from './PyHeader'
import I18n from '../i18n'

Py404.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  headerColor: PropTypes.string,
  mainContent: PropTypes.node,
  goBack: PropTypes.func,
  style: ViewPropTypes.style
}

function Py404 ({
  title = 'Error',
  titleColor = Colors.LIGHT_TEXT,
  headerColor = Colors.primary.DARK_BLUE,
  mainContent = I18n.t('Oops!\n\nNot Found :('),
  goBack,
  style,
  ...props
}) {
  let content = mainContent
  if (typeof content === 'string') {
    content = <Heading1 style={{textAlign: 'center'}}>{mainContent}</Heading1>
  }
  const leftItem = <Header.BackButton onPress={goBack} color={titleColor} />
  return (
    <View style={[styles.container, style]}>
      <Header
        titleColor={titleColor}
        leftItem={leftItem}
        centerItem={title}
        style={{backgroundColor: headerColor}}
      />
      <View style={styles.inner}>
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// react-redux part --------------------

const mapDispatchToProps = dispatch => ({
  goBack: () => { dispatch(NavigationActions.back()) }
})

export default connect(null, mapDispatchToProps)(Py404)
