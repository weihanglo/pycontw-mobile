import React from 'react'
import PropTypes from 'prop-types'
import {Platform, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'

import AppNavigator from './navigators/AppNavigator'

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navState: PropTypes.object.isRequired
}

function App ({dispatch, navState}) {
  const navigation = addNavigationHelpers({dispatch, state: navState})
  StatusBar.setBarStyle('light-content')
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('hsla(0, 0%, 0%, 0.3)')
    StatusBar.setTranslucent(true)
  }
  return <AppNavigator navigation={navigation} />
}

const mapStateToProps = ({navState}) => ({navState})

export default connect(mapStateToProps)(App)
