import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'

import {addToFavorites} from '../actions/addToFavorites'
import {removeFromFavorites} from '../actions/removeFromFavorites'
import EventView from '../components/EventView'

const mapStateToProps = (
  {selectDate, selectEvent, favoriteEvents, allSchedules: {dates}}, // store state
  {navigation: {state: {params: {location, beginTime, endTime}}}} // ownProps
) => {
  // Calculate human-readable datetime
  // TODO: handle locale
  const begin = moment(beginTime, 'hh:mm')
  const end = moment(endTime, 'hh:mm')
  const duration = moment.duration(end.diff(begin)).humanize()
  const {eventId} = selectEvent
  return {
    ...selectEvent,
    location,
    duration,
    dayIndex: dates.indexOf(selectDate),
    hhmmTime: begin.format('HH:mm'),
    checked: !!favoriteEvents[eventId]
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => { dispatch(NavigationActions.back()) },
  ...bindActionCreators({
    addToFavorites,
    removeFromFavorites
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
