import React from 'react'
import PropTypes from 'prop-types'

import EventView from '../containers/EventView'

export default class extends React.Component {
  // TODO: tabbar icon
  static navigationOptions = {
  }

  static propTypes = {
    navigation: PropTypes.object
  }

  render () {
    const {params} = this.props.navigation.state
    return (
      <EventView {...params} />
    )
  }
}
