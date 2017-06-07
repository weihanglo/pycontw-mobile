import React from 'react'
import PropTypes from 'prop-types'
import {AppState, BackHandler, Platform, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {addNavigationHelpers, NavigationActions} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import {syncLocal, syncRemote} from './actions/syncData'
import {fetchDates} from './actions/fetchDates'
import {fetchTagMapping} from './actions/fetchTagMapping'

import AppNavigator from './navigators/AppNavigator'

class App extends React.Component {
  static propTypes = {
    /* For React-Navigation integration. See official doc for more. */
    dispatch: PropTypes.func,
    syncState: PropTypes.object,
    navState: PropTypes.object
  }

  _appState = ''

  componentWillReceiveProps (nextProps) {
    const {dispatch, syncState: {isSyncing, domain, error}} = nextProps
    const {syncState} = this.props

    if (isSyncing === syncState.isSyncing &&
      domain === syncState.domain &&
      error === syncState.error) {
      return
    }

    const success = !isSyncing && typeof error === 'undefined'
    const syncLocalFailure = !!error && domain === 'LOCAL'
    if (success || syncLocalFailure) {
      // prefetch some data to store
      SplashScreen.hide()
      dispatch(fetchDates())
      dispatch(fetchTagMapping())
    }
  }

  componentDidMount () {
    // Handle App state changes
    AppState.addEventListener('change', this._onChangeAppState)

    // Handle Hardware Back Button
    BackHandler.addEventListener('hardwareBackPress',
      this._onPressHardwareBack
    )

    // Load all initial data
    this.props.dispatch(syncLocal())
    this.props.dispatch(syncRemote())
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._onChangeAppState)
    BackHandler.removeEventListener('hardwareBackPress')
  }

  _onPressHardwareBack = () => {
    const {dispatch, navState} = this.props

    // If StackNavigator in each tab push to another screen, back to previous.
    const currentIndex = navState.routes[navState.index].index
    if (currentIndex > 0) {
      dispatch(NavigationActions.back())
      return true
    }

    if (currentIndex === 0 && navState.index > 0) {
      dispatch(NavigationActions.navigate({routeName: 'Schedule'}))
      return true
    }

    return false
  }

  _onChangeAppState = nextAppState => {
    if (this._appState.match(/inactive|background/) &&
      nextAppState === 'active') {
      this.props.dispatch(syncRemote())
    }
    this._appState = nextAppState
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

const mapStateToProps = ({
  navState,
  syncState,
  modalState
}) => ({navState, syncState, modalState})

export default connect(mapStateToProps)(App)
