import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'

import {saveFavorites} from '../actions/saveFavorites'
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
  return {
    ...selectEvent,
    location,
    duration,
    favoriteEvents,
    dayIndex: dates.indexOf(selectDate),
    hhmmTime: begin.format('HH:mm')
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => { dispatch(NavigationActions.back()) },
  ...bindActionCreators({saveFavorites}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
