import React from 'react'
import PropTypes from 'prop-types'
import {Platform, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import {fetchSchedules} from './actions/fetchSchedules'
import {fetchTagMapping} from './actions/fetchTagMapping'
import {loadFavorites} from './actions/loadFavorites'

import AppNavigator from './navigators/AppNavigator'

class App extends React.Component {
  static propTypes = {
    /* For React-Navigation integration. See their official doc for more. */
    dispatch: PropTypes.func,
    navState: PropTypes.object
  }

  componentDidMount () {
    const {dispatch} = this.props
    // Load all initial dadta
    dispatch(fetchSchedules())
    dispatch(fetchTagMapping())
    dispatch(loadFavorites())
    setTimeout(SplashScreen.hide, 3000) // Manually hide SplashScreen after 3s
  }

  render () {
    const {dispatch, navState} = this.props
    const navigation = addNavigationHelpers({dispatch, state: navState})

    StatusBar.setBarStyle('light-content')
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('hsla(0, 0%, 0%, 0.3)')
      StatusBar.setTranslucent(true)
    }

    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = ({navState}) => ({navState})

export default connect(mapStateToProps)(App)
