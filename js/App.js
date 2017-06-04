import React from 'react'
import PropTypes from 'prop-types'
import {Platform, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'
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
  componentWillReceiveProps (nextProps) {
    const {dispatch, syncState: {isSyncing, domain, error}} = nextProps
    const {syncState} = this.props

    if (isSyncing === syncState.isSyncing &&
      domain === syncState.domain &&
      error === syncState.error) {
      return
    }

    if (error && domain === 'REMOTE') {
      // console.warn('syncing locally ...')
      dispatch(syncLocal())
    }

    const success = !isSyncing && typeof error === 'undefined'
    // local failure, enter the view without retry?
    const syncLocalFailure = !!error && domain === 'LOCAL'
    if (success || syncLocalFailure) {
      // console.warn('syncing success')
      // prefetch some data to store
      dispatch(fetchDates())
      dispatch(fetchTagMapping())
    }
  }

  componentDidMount () {
    SplashScreen.hide()

    // Load all initial dadta
    // console.warn('syncing remotely ...')
    this.props.dispatch(syncRemote())
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

const mapStateToProps = ({navState, syncState}) => ({navState, syncState})

export default connect(mapStateToProps)(App)
