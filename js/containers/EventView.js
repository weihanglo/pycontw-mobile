import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'

import {saveFavorites} from '../actions/saveFavorites'
import EventView from '../components/EventView'

const mapStateToProps = (
  {selectedDate, selectEvent, favoriteEvents}, // store state
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
    dayIndex: ['2017-06-09', '2017-06-10', '2017-06-11'].indexOf(selectedDate),
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
