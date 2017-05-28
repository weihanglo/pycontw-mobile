import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {fetchSchedules} from '../actions/fetchSchedules'
import {fetchEvent} from '../actions/fetchEvent'
import {fetchTagMapping} from '../actions/fetchTagMapping'
import ScheduleList from '../components/ScheduleList'

const mapStateToProps = ({
  allSchedules,
  favoriteEvents,
  selectDate,
  tagMapping
}) => ({
  error: allSchedules.error,
  favoriteEvents,
  isFetching: allSchedules.isFetching,
  schedule: allSchedules[selectDate],
  tagMapping
})

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchTagMapping())
    dispatch(fetchSchedules())
  },
  onCellPress: (eventId, location, duration) => {
    dispatch(fetchEvent(eventId))
    dispatch(NavigationActions.navigate({
      routeName: 'Event',
      params: {location, duration}
    }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
