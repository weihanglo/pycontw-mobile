import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {addToFavorites} from '../actions/addToFavorites'
import {removeFromFavorites} from '../actions/removeFromFavorites'
import EventView from '../components/EventView'

const mapStateToProps = ({selectEvent, favoriteEvents}) => {
  const {eventId} = selectEvent
  return {
    ...selectEvent,
    checked: !!favoriteEvents[eventId]
  }
}

const mapDispatchToProps = dispatch => ({
  onAvatarPress: () => {
  },
  ...bindActionCreators({
    addToFavorites,
    removeFromFavorites
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
